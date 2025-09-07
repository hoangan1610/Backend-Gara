'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const order_status = ['PENDING', 'DELIVERING', 'FINISHED'];

    // Hàm để lấy ngày ngẫu nhiên trong 2 tháng vừa qua
    function getRandomDateWithinLastTwoMonths() {
      const now = new Date();
      const twoMonthsAgo = new Date();
      twoMonthsAgo.setMonth(now.getMonth() - 2);

      const randomTimestamp = Math.random() * (now.getTime() - twoMonthsAgo.getTime()) + twoMonthsAgo.getTime();
      return new Date(randomTimestamp);
    }

    function getRandomInt(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    let users = await queryInterface.sequelize.query(
      `SELECT id, role FROM users`,
      { type: Sequelize.QueryTypes.SELECT }
    );


    let product_options = await queryInterface.sequelize.query(
      `SELECT p.id, po.id as option_id, po.price, po.stock as po_stock
       FROM products p 
       JOIN product_options po ON po.product_id = p.id`,
      { type: Sequelize.QueryTypes.SELECT }
    );
    for (let product of product_options) {
      // Thêm đơn hàng
      let createdAt = getRandomDateWithinLastTwoMonths();
      let updatedAt = createdAt;

      let curr_p = await queryInterface.sequelize.query(
        `SELECT stock FROM products WHERE id = ${product.id}`,
        { type: Sequelize.QueryTypes.SELECT }
      );

      let p_stock = curr_p[0].stock;
      let po_stock = product.po_stock;
      let null_user = !(getRandomInt(0, 100) > 70);
      let user = null_user ? users[getRandomInt(0, users.length - 1)] : null;

      while (user && user.role !== 'USER') {
        user = users[getRandomInt(0, users.length - 1)];
      }

      let user_id = user ? user.id : null;
      let statusChance = getRandomInt(0, 100);
      let status = statusChance > 90 ? order_status[0] : statusChance > 70 ? order_status[1] : order_status[2];

      if (po_stock > 0) {
        let result = await queryInterface.bulkInsert('orders', [
          {
            user_id,
            status,
            currency: 'VND',
            discount: 0,
            total_amount: 0,
            createdAt: createdAt,
            updatedAt: updatedAt,
          },
        ]);

        // Lấy ID cuối cùng được chèn
        let [lastInserted] = await queryInterface.sequelize.query('SELECT LAST_INSERT_ID() as id');
        let order_id = lastInserted[0].id;

        let max = po_stock > 5 ? 5 : po_stock;
        let order_item_quantity = getRandomInt(1, max);
        await queryInterface.bulkInsert('order_items', [
          {
            order_id: order_id,
            product_id: product.id,
            product_option_id: product.option_id,
            quantity: order_item_quantity,
            price: product.price,
            currency: 'VND',
            createdAt: createdAt,
            updatedAt: updatedAt,
          }
        ], {});

        await queryInterface.bulkUpdate('products',
          {
            stock: p_stock - order_item_quantity
          },
          {
            id: product.id
          });
        await queryInterface.bulkUpdate('product_options',
          {
            stock: po_stock - order_item_quantity
          },
          {
            id: product.option_id
          });
        // Cập nhật tổng tiền
        await queryInterface.bulkUpdate('orders',
          {
            total_amount: product.price * order_item_quantity,
            payment_method: 'cod'
          },
          {
            id: order_id
          });
        console.log('Order created, id:', order_id);
      }
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('order_items', null, {});
    await queryInterface.bulkDelete('orders', null, {});
  }
};
