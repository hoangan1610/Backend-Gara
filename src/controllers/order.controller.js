
import { OrderItemService, OrderService, PaymentService, ProductOptionService, ProductService } from "../services";
import jwt from "jsonwebtoken";
import db from "../models";
import moment from "moment";
import { account_roles, order_status, payment_method_codes } from "../constants/constants";
import EmailService from "../services/email.service";
import order_queue from "./queues/order_queue";
const { Op } = require('sequelize');

require("dotenv").config();
const role_author_number = {
  [account_roles.NO_ROLE]: 0,
  [account_roles.USER]: 1,
  [account_roles.EMPLOYEE]: 1,
  [account_roles.ADMIN]: 2,
  [account_roles.SUPER_ADMIN]: 3,
}
const canCreate = (req_role) => role_author_number[req_role] >= role_author_number[account_roles.ADMIN];
const canRead = (req_role) => role_author_number[req_role] >= role_author_number[account_roles.NO_ROLE];
const canUpdate = (req_role) => role_author_number[req_role] >= role_author_number[account_roles.ADMIN];
const canDelete = (req_role) => role_author_number[req_role] >= role_author_number[account_roles.ADMIN];

export default class OrderController {
  constructor() {
    this.queue = order_queue;
  }

  getWeeklyOrders = async (req, res) => {
    try {
      let start = new Date();
      start.setHours(0, 0, 0, 0);
      let end = new Date();
      end.setHours(23, 59, 59, 999);
      let day = 24 * 60 * 60 * 1000;
      let data = await new OrderService().getAll({
        where: {
          createdAt: {
            [Op.gte]: start - 6 * day,
            [Op.lt]: end
          }
        },
        include: [db.payment],
        attributes: ['total_amount', 'createdAt', 'user_id']
      });

      let groupedData = data.reduce((acc, order) => {

        let dateKey = new Date(order.createdAt).toISOString().split('T')[0];

        if (!acc[dateKey]) {
          acc[dateKey] = [];
        }

        acc[dateKey].push(order);
        return acc;
      }, {});

      return res.status(200).json(groupedData);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  getMonthlyRevenue = async (req, res) => {
    try {
      let start = new Date(req.query.year, req.query.month - 1, 1);
      let end = new Date(req.query.year, req.query.month, 0);

      let data = await new OrderService().getAll({
        where: {
          createdAt: {
            [Op.gte]: start,
            [Op.lt]: end
          }
        },
        include: [db.payment],
        attributes: ['total_amount', 'createdAt', 'user_id']
      });

      let groupedData = data.reduce((acc, order) => {

        let dateKey = new Date(order.createdAt).toISOString().split('T')[0];

        if (!acc[dateKey]) {
          acc[dateKey] = [];
        }

        acc[dateKey].push(order);
        return acc;
      }, {});

      return res.status(200).json(groupedData);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  getYearlyRevenue = async (req, res) => {
    try {
      let start = new Date(req.query.year, 0, 1);
      let end = new Date(req.query.year, 12, 0);

      let data = await new OrderService().getAll({
        where: {
          createdAt: {
            [Op.gte]: start,
            [Op.lt]: end
          }
        },
        include: [db.payment],
        attributes: ['total_amount', 'createdAt', 'user_id']
      });

      let groupedData = data.reduce((acc, order) => {

        let dateKey = new Date(order.createdAt).toISOString().split('T')[0].slice(0, 7);

        if (!acc[dateKey]) {
          acc[dateKey] = [];
        }

        acc[dateKey].push(order);
        return acc;
      }, {});

      return res.status(200).json(groupedData);
    }
    catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  getRevenue = async (req, res) => {
    let { start, end } = req.query;

    if (!start || !end) {
      return res.status(400).json({ message: "Missing required parameters" });
    }

    if (!moment(start, 'YYYY-MM-DD', true).isValid() || !moment(end, 'YYYY-MM-DD', true).isValid()) {
      return res.status(400).json({ message: "Invalid date format, correct format is: YYYY-MM-DD" });
    }

    try {
      let data = await new OrderService().getAll({
        where: {
          createdAt: {
            [Op.gte]: start,
            [Op.lt]: end
          }
        },
        include: [db.payment],
        attributes: ['total_amount', 'createdAt', 'user_id']
      });

      let groupedData = data.reduce((acc, order) => {

        let dateKey = new Date(order.createdAt).toISOString().split('T')[0];

        if (!acc[dateKey]) {
          acc[dateKey] = [];
        }

        acc[dateKey].push(order);
        return acc;
      }, {});

      return res.status(200).json(groupedData);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  sortObject = (obj) => {
    let sorted = {};
    let str = [];
    let key;
    for (key in obj) {
      if (obj.hasOwnProperty(key)) {
        str.push(encodeURIComponent(key));
      }
    }
    str.sort();
    for (key = 0; key < str.length; key++) {
      sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(/%20/g, "+");
    }
    return sorted;
  };

  handleCheckStock = async (req, res) => {
    this.queue.add(async () => {
      try {
        const { order_items } = req.body;


        const productIds = order_items.map(item => item.product.id);
        const productOptionIds = order_items.map(item => item.product_option.id);

        const products = await new ProductService().getAll({ where: { id: productIds } });
        const productOptions = await new ProductOptionService().getAll({ where: { id: productOptionIds } });


        const productMap = new Map(products.map(product => [product.id, product]));
        const productOptionMap = new Map(productOptions.map(option => [option.id, option]));


        const outOfStockItems = [];


        for (let item of order_items) {
          const product = productMap.get(item.product.id);
          const productOption = productOptionMap.get(item.product_option.id);

          if (!product || !productOption || product.stock < item.quantity || productOption.stock < item.quantity) {
            outOfStockItems.push({
              productId: item.product.id,
              productOptionId: item.product_option.id,
              requestedQuantity: item.quantity,
              availableStock: {
                product: product ? product.stock : 0,
                productOption: productOption ? productOption.stock : 0,
              },
            });
          }
        }


        if (outOfStockItems.length > 0) {
          return res.status(400).json({
            code: '01',
            message: 'Some products are out of stock',
            outOfStockItems,
          });
        }


        return res.status(200).json({
          code: '00',
          message: 'All products are in stock'
        });
      } catch (error) {
        console.error(error);
        return res.status(500).json({
          code: '99',
          message: 'Internal server error while checking stock'
        });
      }
    });
    this.queue.process();
  };

  createVNPayPaymentUrl = async (req, res) => {
    const { amount, bankCode, locale = 'vn', order_id } = req.body;

    process.env.TZ = 'Asia/Ho_Chi_Minh';
    const date = new Date();
    const createDate = moment(date).format('YYYYMMDDHHmmss');

    const ipAddr = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

    const tmnCode = process.env.vnp_TmnCode;
    const secretKey = process.env.vnp_HashSecret;
    let vnpUrl = process.env.vnp_Url;
    const returnUrl = process.env.vnp_ReturnUrl;

    const currCode = 'VND';
    let vnp_Params = {
      vnp_Version: '2.1.0',
      vnp_Command: 'pay',
      vnp_TmnCode: tmnCode,
      vnp_Locale: locale,
      vnp_CurrCode: currCode,
      vnp_TxnRef: order_id,
      vnp_OrderInfo: `Thanh toan cho ma GD: ${order_id}`,
      vnp_OrderType: 'other',
      vnp_Amount: amount * 100,
      vnp_ReturnUrl: returnUrl,
      vnp_IpAddr: ipAddr,
      vnp_CreateDate: createDate
    };

    if (bankCode) {
      vnp_Params['vnp_BankCode'] = bankCode;
    }

    vnp_Params = this.sortObject(vnp_Params);

    const querystring = require('qs');
    const signData = querystring.stringify(vnp_Params, { encode: false });
    const crypto = require("crypto");
    const hmac = crypto.createHmac("sha512", secretKey);
    const signed = hmac.update(Buffer.from(signData, 'utf-8')).digest("hex");

    vnp_Params['vnp_SecureHash'] = signed;
    vnpUrl += '?' + querystring.stringify(vnp_Params, { encode: false });

    return res.status(200).json({ code: '00', paymentUrl: vnpUrl });
  };


  confirmVNPayPayment = async (req, res) => {
    this.queue.add(async () => {
      try {
        let vnp_Params = req.body;
        let secureHash = vnp_Params['vnp_SecureHash'];
        delete vnp_Params['vnp_SecureHash'];
        delete vnp_Params['vnp_SecureHashType'];


        vnp_Params = this.sortObject(vnp_Params);

        let tmnCode = process.env.vnp_TmnCode;
        let secretKey = process.env.vnp_HashSecret;
        let querystring = require('qs');
        let signData = querystring.stringify(vnp_Params, { encode: false });
        let crypto = require("crypto");
        let hmac = crypto.createHmac("sha512", secretKey);
        let signed = hmac.update(Buffer.from(signData, 'utf-8')).digest("hex");


        if (secureHash === signed) {
          let order_id = vnp_Params['vnp_TxnRef'];
          let rspCode = vnp_Params['vnp_ResponseCode'];
          let amount = vnp_Params['vnp_Amount'] / 100;
          let bankCode = vnp_Params['vnp_BankCode'];
          let orderInfo = vnp_Params['vnp_OrderInfo'];
          let transaction_id = vnp_Params['vnp_TransactionNo'];
          let transaction_time = moment(vnp_Params['vnp_PayDate'], 'YYYYMMDDHHmmss').toDate();

          const transaction = await db.sequelize.transaction();
          try {
            const payment = await new PaymentService().create({
              order_id,
              method: 'vnpay',
              status: rspCode === '00' ? 'success' : 'failed',
              bankCode,
              amount,
              currency: 'VND',
              transaction_id,
              decription: orderInfo,
              transaction_info: orderInfo,
              transaction_status: rspCode,
              transaction_time,
              transaction_data: vnp_Params
            }, { transaction });

            const order = await new OrderService().getOne({
              where: { id: order_id },
              include: [{
                model: db.order_item,
                include: [db.product, db.product_option]
              }],
              transaction
            });
            if (!order) throw new Error('Order not found');

            const updatedData = {
              id: order.id,
              status: rspCode === '00' ? order_status.PENDING : 'PAYMENT_FAILED',
            };
            await new OrderService().update(updatedData, { transaction });

            for (let item of order.order_items) {
              const product = await db.product.findOne({
                where: { id: item.product.id },
                transaction,
              });

              const productOption = await db.product_option.findOne({
                where: { id: item.product_option.id },
                transaction,
              });

              if (product.stock >= item.quantity && productOption.stock >= item.quantity) {
                await product.update(
                  { stock: product.stock - item.quantity },
                  { transaction }
                );

                await productOption.update(
                  { stock: productOption.stock - item.quantity },
                  { transaction }
                );
              } else {
                throw new Error('Product out of stock');
              }
            }

            await new EmailService().sendSuccessVNPAYPaymentOrderEmail({ order, email: order.info.email });
            await transaction.commit();
            return res.status(200).json({ order });
          } catch (error) {
            console.log(error);
            await transaction.rollback();
            return res.status(500).json({
              code: '99',
              message: 'Internal server error while processing payment',
              details: error.message
            });
          }
        } else {
          return res.status(400).json({ code: '97', message: 'Fail checksum' });
        }
      } catch (err) {
        console.log(err);
        return res.status(500).json({
          code: '99',
          message: 'Internal server error while processing payment',
          details: err.message
        });
      }
    });
    this.queue.process();
  };


  getUserByToken = async (req, res) => {
    try {
      let authorization = req.headers.authorization;

      let token = authorization.split(' ')[1];
      if (!token) {
        return null;
      }
      const decoded = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY,
        async (err, data) => {
          if (err) {
            return null;
          }
          return data;
        });

      const user = decoded ? await db.user.findOne({ where: { id: decoded.id } }) : null;

      return user || null;
    } catch (error) {
      return null;
    }
  }

  getAllByUser = async (req, res) => {
    try {
      const user = await this.getUserByToken(req, res);
      if (!user)
        return res.status(204).send();
      const data = await new OrderService().getAll({ where: { userId: user.id }, include: [{ model: db.order_item, include: [{ model: db.product, include: [db.product_option] }] }] });
      return res.status(200).json(data);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  createOrder = async (req, res) => {
    this.queue.add(async () => {
      const transaction = await db.sequelize.transaction();
      try {
        const { order_items, info, bank_code, payment_method } = req.body;
        const user = await this.getUserByToken(req, res);


        const productIds = order_items.map(item => item.product.id);
        const productOptionIds = order_items.map(item => item.product_option.id);

        const products = await new ProductService().getAll({ where: { id: productIds }, transaction });
        const productOptions = await new ProductOptionService().getAll({ where: { id: productOptionIds }, transaction });

        const productMap = new Map(products.map(product => [product.id, product]));
        const productOptionMap = new Map(productOptions.map(option => [option.id, option]));


        const outOfStockItems = [];
        for (let item of order_items) {
          const product = productMap.get(item.product.id);
          const productOption = productOptionMap.get(item.product_option.id);

          if (!product || !productOption || product.stock < item.quantity || productOption.stock < item.quantity) {
            outOfStockItems.push({
              product_name: item.product.name,
              product_option_name: item.product_option.name,
              requestedQuantity: item.quantity,
              availableStock: {
                product: product ? product.stock : 0,
                productOption: productOption ? productOption.stock : 0,
              },
            });
          }
        }


        if (outOfStockItems.length > 0) {
          transaction.rollback();
          return res.status(400).json({
            message: 'Some products are out of stock',
            code: 404,
            outOfStockItems,
          });
        }


        let [order, created] = await new OrderService().findOrCreate({
          where: { user_id: user?.id || null, status: order_status.EMPTY },
          defaults: {
            user_id: user?.id || null,
            status: order_status.EMPTY,
            currency: 'VND',
          },
          transaction
        });


        let calculatedTotalAmount = 0;
        for (let item of order_items) {
          const product_option = productOptionMap.get(item.product_option.id);
          calculatedTotalAmount += product_option.price * item.quantity;
        }

        order.total_amount = calculatedTotalAmount;
        order.payment_method = payment_method;
        order.bank_code = bank_code;
        order.info = info;
        order.status = order_status.PENDING;
        await order.save({ transaction });


        for (let item of order_items) {
          const product = productMap.get(item.product.id);
          const productOption = productOptionMap.get(item.product_option.id);

          await new OrderItemService().create({
            order_id: order.id,
            product_id: product.id,
            product_option_id: productOption.id,
            quantity: item.quantity,
            price: productOption.price,
            currency: 'VND'
          }, { transaction });
        }

        await transaction.commit();
        order = await new OrderService().getOne({ where: { id: order.id }, include: [{ model: db.order_item, include: [{ model: db.product, include: [db.product_option] }, { model: db.product_option }] }] });






        return res.status(201).json({ order });
      } catch (error) {
        await transaction.rollback();
        console.log(error);
        return res.status(500).json({ message: 'Internal server error' });
      }
    });
    this.queue.process();
  };

  getEmptyOrder = async (req, res) => {
    const transaction = await db.sequelize.transaction();
    try {
      const user = await this.getUserByToken(req, res);
      if (!user) {
        return res.status(404).send();
      }

      const [order, _] = await new OrderService().findOrCreate({
        where: { user_id: user.id, status: order_status.EMPTY },
        defaults: { user_id: user.id, status: order_status.EMPTY },
        include: [{
          model: db.order_item,
          as: "order_items",
          include: [{
            model: db.product,
            include: [db.product_option]
          }],
        }],
        attributes: ['id', 'total_amount', 'status'],
        transaction
      });

      await transaction.commit();

      console.log(order)

      return res.status(200).json(order);
    } catch (error) {
      await transaction.rollback();
      console.log("Error in getEmptyOrder:", error);
      return res.status(500).json({
        message: "Internal server error",
        error: error.message,
      });
    }
  };


  getById = async (req, res) => {
    try {
      const data = await new OrderService().getOne({ where: { id: req.params.id } });
      if (!data) {
        return res.status(404).json({ message: "Not found" });
      }
      return res.status(200).json(data);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  addOrderItem = async (req, res) => {
    try {
      const user = await this.getUserByToken(req, res);
      if (!user) {
        return res.status(204).send();
      }

      const order_item = await new OrderItemService().create({ order_id: req.params.id, product_id: req.body.product.id, quantity: req.body.quantity });
      const data = await new OrderService().getOne({ where: { id: req.params.id }, include: [{ model: db.order_item, include: [{ model: db.product, include: [db.product_option] }] }] });

      return res.status(200).json(data);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  updateOrderItem = async (req, res) => {
    try {
      const user = await this.getUserByToken(req, res);
      if (!user) {
        return res.status(204).send();
      }

      const order = await new OrderService().getOne({
        where: { id: req.params.id },
        include: [{ model: db.order_item, include: [{ model: db.product, include: [db.product_option] }] }]
      });
      if (!order) {
        return res.status(404).json({ message: "Not found" });
      }

      const order_item = order.order_items.find(item => item.product.id === req.body.order_item.product.id);
      const new_order_item = await new OrderItemService().update({
        quantity: req.body.quantity
      })

      return res.status(200).json(data);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  async getAll(req, res) {
    try {
      if (!canRead(req.user?.role || account_roles.NO_ROLE)) {
        return res.status(403).json({ message: "You don't have permission to read" });
      }
      const data = await new OrderService().getAll({
        include: [
          {
            model: db.order_item,
            include: [db.product, db.product_option]
          },
          {
            model: db.payment
          },
          {
            model: db.user,
            as: "user"
          }
        ]
      });
      return res.status(200).json({ orders: data });

    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  async getOne(req, res) {
    try {
      const data = await new OrderService().getOne({ where: { id: req.params.id } });
      if (!data) {
        return res.status(404).json({ message: "Not found" });
      }
      return res.status(200).json({ order: data });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  async create(req, res) {
    try {
      if (!canCreate(req.user?.role || account_roles.NO_ROLE)) {
        return res.status(403).json({ message: "You don't have permission to create this order" });
      }
      const data = await new OrderService().create(req.body);
      return res.status(201).json({ order: data, message: "Create successfully" });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  async update(req, res) {
    try {
      const target_order = await new OrderService().getOne({ where: { id: req.params.id } });
      if (!target_order) {
        return res.status(404).json({ message: "Not found" });
      }
      if (!canUpdate(req.user?.role || account_roles.NO_ROLE)) {
        return res.status(403).json({ message: "You don't have permission to edit this order" });
      }
      let data = await new OrderService().update(req.body);
      return res.status(200).json({ order: data, message: "Update successfully" });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  async delete(req, res) {
    try {
      if (!canDelete(req.user?.role || account_roles.NO_ROLE)) {
        return res.status(403).json({ message: "You don't have permission to delete this order" });
      }
      await new OrderService().delete({ where: { id: req.params.id } });
      return res.status(204).json();
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
}