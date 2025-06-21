'use strict';

const db = require('../models');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    let products = await queryInterface.select(db.product, 'products', ['id']);

    for (let product of products) {
      let remaining_stock = product.stock;

      const product_option_amount = Math.floor(Math.random() * 6) + 1;
      let product_options = [
        {
          name: 'Default',
          price: product.price,
          product_id: product.id,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Size S',
          price: product.price + product.price * 0.05,
          product_id: product.id,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Size M',
          price: product.price + product.price * 0.1,
          product_id: product.id,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Size L',
          price: product.price + product.price * 0.15,
          product_id: product.id,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Color Red',
          price: product.price + product.price * 0.05,
          product_id: product.id,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Color Blue',
          price: product.price + product.price * 0.5,
          product_id: product.id,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Color Green',
          price: product.price + product.price * 0.5,
          product_id: product.id,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ];

      let inserting_product_options = [];
      // console.log('total stock:', remaining_stock);

      const default_stock = Math.floor(Math.random() * remaining_stock * 0.5) + 1;
      remaining_stock -= default_stock;
      // console.log('default stock:', default_stock);

      product_options[0].stock = default_stock;
      inserting_product_options.push(product_options[0]);
      product_options = product_options.filter((_, index) => index !== 0);

      for (let i = 1; i < product_option_amount - 1; i++) {
        if (remaining_stock <= 0) break;
        const stock = Math.floor(Math.random() * remaining_stock) + 1;

        const random_product_option_index = Math.floor(Math.random() * product_options.length);
        // console.log(product_options[random_product_option_index].name, 'stock:', stock);
        remaining_stock -= stock;
        product_options[random_product_option_index].stock = stock;
        inserting_product_options.push(product_options[random_product_option_index]);
        product_options = product_options.filter((_, index) => index !== random_product_option_index);
      }

      if (remaining_stock > 0) {
        const random_product_option_index = Math.floor(Math.random() * product_options.length);
        product_options[random_product_option_index].stock = remaining_stock;
        inserting_product_options.push(product_options[random_product_option_index]);
        // console.log('last stock:', remaining_stock);
      }
      await queryInterface.bulkInsert('product_options', inserting_product_options, {});
    }
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
