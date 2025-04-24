
import { OrderItemService, OrderService, PaymentService, ProductOptionService, ProductService } from "../services";
import jwt from "jsonwebtoken";
import db from "../models";
import moment from "moment";
import { account_roles, order_status, payment_method_codes } from "../constants/constants";
import EmailService from "../services/email.service";
import order_queue from "./queues/order_queue";
// order.controller.js
import { sendNotificationToUser } from "../server";// Đường dẫn tùy thuộc vào cấu trúc dự án của bạn

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
    this.orderService = new OrderService();
    this.productService = new ProductService();
    this.productOptionService = new ProductOptionService();
  }

    

  // Phương thức kiểm tra xem user đã mua sản phẩm có id = productId chưa
  hasPurchasedProduct = async (req, res) => {
    try {
      const user = await this.getUserByToken(req, res);
      if (!user) return res.status(401).json({ message: "Unauthorized" });
      
      const { productId } = req.params;
      // Lấy tất cả các đơn hàng của user, bao gồm cả các order_item
      const orders = await db.order.findAll({
        where: { user_id: user.id },
        include: [{ model: db.order_item }]
      });
      
      // Lọc ra các đơn hàng có chứa sản phẩm với productId 
      // và đơn hàng đã về trạng thái "finished"
      const matchingOrders = orders.filter(order => 
        order.status === "FINISHED" &&
        order.order_items.some(item => item.product_id == productId)
      );
      
      if (matchingOrders.length > 0) {
        const orderIds = matchingOrders.map(order => order.id);
        return res.status(200).json({ hasPurchased: true, orderIds });
      } else {
        return res.status(200).json({ hasPurchased: false });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  };
  
  
  

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
      const data = await new OrderService().getAll({ where: { user_id: user.id }, include: [{ model: db.order_item, include: [{ model: db.product, as: "product", include: [db.product_option] }] }] });
      return res.status(200).json(data);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Internal server error", error: error.message });
    }
  }

  getOrderDetailsByUser = async (req, res) => {
    try {
        const user = await this.getUserByToken(req, res);
        if (!user) return res.status(204).send();
        const { orderId } = req.params;
        const order = await new OrderService().getOne({
            where: { id: orderId, user_id: user.id },
            include: [{ model: db.order_item, include: [{model: db.product, as: "product",include: [db.product_option]}]}]
        });
        if (!order) {
          return res.status(404).json({ message: "Không tìm thấy đơn hàng" });
        }      
        return res.status(200).json(order); 
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error", error: error.message });
    }
  };

  cancelOrder = async (req, res) => {
    try {
      const user = await this.getUserByToken(req, res);
      if (!user) return res.status(401).json({ message: "Không xác thực được người dùng." });
  
      const { orderId } = req.params;
  
      const order = await new OrderService().getOne({
        where: { id: orderId, user_id: user.id }
      });
  
      if (!order) {
        return res.status(404).json({ message: "Không tìm thấy đơn hàng." });
      }
  
      if (order.status === 'CANCELLED') {
        return res.status(400).json({ message: "Đơn hàng đã được hủy trước đó." });
      }
  
      const updatedOrder = await new OrderService().update({
        id: orderId,
        status: 'CANCELLED'
      });
  
      return res.status(200).json({
        message: "Đơn hàng đã được hủy thành công.",
        order: updatedOrder
      });
  
    } catch (error) {
      console.error("Lỗi khi hủy đơn hàng:", error);
      return res.status(500).json({
        message: "Đã xảy ra lỗi khi hủy đơn hàng.",
        error: error.message
      });
    }
  };  

  requestCancelOrder = async (req, res) => {
    try {
      const user = await this.getUserByToken(req, res);
      if (!user) {
        return res.status(401).json({ message: "Không xác thực được người dùng." });
      }
  
      const { orderId, reason } = req.body;
  
      const cancelReasons = [
        "Không nhận được kiện hàng",
        "Không còn nhu cầu",
        "Sản phẩm không khớp với mô tả",
        "Kiện hàng hoặc sản phẩm bị hư hỏng",
        "Sản phẩm bị lỗi hoặc không hoạt động",
        "Gửi sai sản phẩm"
      ];
  
      if (!cancelReasons.includes(reason)) {
        return res.status(400).json({ message: "Lý do hủy đơn hàng không hợp lệ." });
      }
  
      const order = await new OrderService().getOne({
        where: { id: orderId, user_id: user.id }
      });
  
      if (!order) {
        return res.status(404).json({ message: "Không tìm thấy đơn hàng." });
      }
  
      if (order.status === 'CANCELLED') {
        return res.status(400).json({ message: "Đơn hàng đã được hủy trước đó." });
      }
  
      // Kiểm tra thời gian tạo đơn hàng và trạng thái đơn hàng
      const createdAt = new Date(order.createdAt);
      const now = new Date();
      const timeDifference = (now - createdAt) / (1000 * 60); // Thời gian chênh lệch tính bằng phút

      // Kiểm tra nếu đơn hàng không phải 'PREPARING' và cũng chưa quá 30 phút
      if (order.status !== 'PREPARING' && timeDifference <= 30) {
        return res.status(400).json({
          message: "Chỉ có thể gửi yêu cầu hủy khi đơn hàng đang được chuẩn bị hoặc đã quá 30 phút kể từ khi tạo đơn hàng."
        });
      }

      if (order.cancel_request_status === 'PENDING') {
        return res.status(400).json({ message: "Bạn đã gửi yêu cầu hủy đơn này trước đó." });
      }

      const updatedOrder = await new OrderService().update({
        id: orderId,
        cancel_reason: reason,
        cancel_request_status: 'PENDING'
      });
  
      return res.status(200).json({
        message: "Yêu cầu hủy đơn hàng đã được gửi thành công.",
        order: updatedOrder
      });
  
    } catch (error) {
      console.error("Lỗi khi gửi yêu cầu hủy đơn hàng:", error);
      return res.status(500).json({
        message: "Đã xảy ra lỗi khi gửi yêu cầu hủy đơn hàng.",
        error: error.message
      });
    }
  };
    

  getMonthlyCashflowStatsByUser = async (req, res) => {
    try {
      const user = await this.getUserByToken(req, res);
      if (!user) return res.status(204).send();
  
      const year = parseInt(req.query.year) || new Date().getFullYear();
  
      const results = await this.orderService.getMonthlyCashflowStatsByUser(user.id, year);
      if (!results) return res.status(500).json({ message: "Lỗi khi lấy dữ liệu thống kê" });

      // Khởi tạo mảng dữ liệu 12 tháng với 3 trạng thái mặc định
      const data = Array.from({ length: 12 }, (_, i) => ({
        month: i + 1,
        PENDING: 0,
        DELIVERING: 0,
        FINISHED: 0
      }));
  
      // Gán kết quả vào mảng data
      results.forEach(item => {
        const monthIndex = parseInt(item.month) - 1;
        const status = item.status;
        data[monthIndex][status] = parseFloat(item.total);
      });
  
      return res.status(200).json({
        message: `Thống kê dòng tiền năm ${year}`,
        data
      });
    } catch (error) {
      console.error('Lỗi khi thống kê dòng tiền:', error);
      return res.status(500).json({
        message: "Lỗi server khi thống kê dòng tiền",
        error: error.message
      });
    }
  };
  
  async getUserByToken(req, res) {
    // ... hiện tại bạn có thể dùng req.user nếu middleware authenticateToken đã gắn
    return req.user;
  }

  createOrder = async (req, res) => {
    const maxRetries = 3;

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      const transaction = await db.sequelize.transaction({
        isolationLevel: db.Sequelize.Transaction.ISOLATION_LEVELS.READ_COMMITTED,
      });

      try {
        // 1) Tăng timeout lock để tránh deadlock
        await db.sequelize.query(
          "SET innodb_lock_wait_timeout = 50",
          { transaction }
        );

        // 2) Destructure payload
        const {
          items: order_items,
          info,
          bank_code,
          payment_method,
          shipping_address
        } = req.body;

        if (!Array.isArray(order_items) || order_items.length === 0) {
          await transaction.rollback();
          return res.status(400).json({ message: "No items provided" });
        }

        // 3) Lấy user từ token (authenticateToken phải đặt trước route này)
        const user = await this.getUserByToken(req, res);
        if (!user) {
          await transaction.rollback();
          return res.status(401).json({ message: "Unauthorized" });
        }

        // 4) Chuẩn bị danh sách IDs để query stock
        const productIds       = order_items.map(i => i.product.id).filter(Boolean);
        const productOptionIds = order_items.map(i => i.product_option?.id).filter(Boolean);

        // 5) Fetch các bản ghi Product & ProductOption trong transaction
        const Product       = db.product;         // sửa theo đúng key trong models/index.js
        const ProductOption = db.product_option;  // sửa theo đúng key trong models/index.js
        const products       = await Product.findAll({ where: { id: productIds }, transaction });
        const productOptions = await ProductOption.findAll({ where: { id: productOptionIds }, transaction });

        const productMap = new Map(products.map(p => [p.id, p]));
        const optionMap  = new Map(productOptions.map(o => [o.id, o]));

        // 6) Kiểm tra tồn kho
        const outOfStock = [];
        for (let item of order_items) {
          const prod = productMap.get(item.product.id);
          const opt  = optionMap.get(item.product_option?.id);
          if (!prod || !opt || prod.stock < item.quantity || opt.stock < item.quantity) {
            outOfStock.push({
              product:   prod?.name   || 'Unknown',
              option:    opt?.name    || 'Unknown',
              requested: item.quantity,
              available: {
                product: prod?.stock ?? 0,
                option:  opt?.stock  ?? 0
              }
            });
          }
        }
        if (outOfStock.length) {
          await transaction.rollback();
          return res.status(400).json({
            message: "Some items are out of stock",
            code: 404,
            outOfStockItems: outOfStock
          });
        }

        // 7) Tạo hoặc tìm Order với trạng thái EMPTY
        const Order = db.order; // sửa theo đúng key trong models/index.js
        let [order] = await Order.findOrCreate({
          where: { user_id: user.id, status: order_status.EMPTY },
          defaults: {
            user_id:  user.id,
            status:   order_status.EMPTY,
            currency: 'VND'
          },
          transaction
        });

        // 8) Tạo order_items với bulkCreate
        const OrderItem = db.order_item; // sửa theo đúng key
        const bulkData = order_items.map(item => ({
          order_id:          order.id,
          product_id:        item.product.id,
          product_option_id: item.product_option?.id || null,
          quantity:          item.quantity,
          price:             item.product_option?.price ?? item.product.price,
          currency:          'VND',
          createdAt:         new Date(),
          updatedAt:         new Date()
        }));
        await OrderItem.bulkCreate(bulkData, { transaction });

        // 9) Cập nhật stock tuần tự
        for (let item of order_items) {
          const prod = productMap.get(item.product.id);
          const opt  = optionMap.get(item.product_option?.id);
          prod.stock -= item.quantity;
          opt.stock  -= item.quantity;
          await prod.save({ transaction });
          await opt.save({ transaction });
        }

        // 10) Tính tổng tiền và cập nhật order
        const totalAmount = order_items.reduce((sum, item) => {
          const price = item.product_option?.price ?? item.product.price;
          return sum + price * item.quantity;
        }, 0);

        order.info           = { ...order.info, ...info, shipping_address };
        order.payment_method = payment_method;
        order.total_amount   = totalAmount;
        if (payment_method === "COD") {
          order.status = order_status.PENDING;
        } else {
          order.status            = order_status.PROCESSING;
          order.payment_bank_code = bank_code;
        }
        await order.save({ transaction });

        // 11) Commit transaction
        await transaction.commit();

        // 12) Tạo bản ghi Notification trong DB
        const Notification = db.Notification;  // đúng key trong models/index.js
        const notif = await Notification.create({
          userId:  user.id,
          message: "Đơn hàng của bạn đã được tạo thành công",
          orderId: order.id.toString()
        });

        // 13) Gửi realtime tới client qua Socket.IO
        sendNotificationToUser(
          String(user.id),
          {
            id:        notif.id,
            message:   notif.message,
            orderId:   notif.orderId,
            timestamp: notif.timestamp
          }
        );

        // 14) Trả về client
        return res.status(201).json({
          success: true,
          message: "Order created successfully",
          order
        });

      } catch (error) {
        // Rollback và retry nếu deadlock
        await transaction.rollback();
        if (error.parent?.errno === 1205 && attempt < maxRetries) {
          console.warn(`Lock wait timeout, retry ${attempt}/${maxRetries}`);
          continue;
        }
        console.error("Error in createOrder:", error);
        return res.status(500).json({ message: "Internal Server Error" });
      }
    }
  }
  
  
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