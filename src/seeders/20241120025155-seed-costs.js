'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    let products = await queryInterface.sequelize.query(
      'SELECT id,price, stock FROM products;'
    );

    // products: [[], metatdata]
    let costs = products[0].map((product) => {
      return {
        total_cost: product.price * product.stock * 0.8,
        product_id: product.id,
        cost_type: 'PURCHASE',
        description: 'Purchase for product ' + product.name,
        createdAt: new Date(),
        updatedAt: new Date()
      };
    });

    await queryInterface.bulkInsert('costs', costs, {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
