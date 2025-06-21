'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    let settings = [
      {
        key: 'policies', value: JSON.stringify([
          {
            image_url: "http://localhost:3001/api/v1/file/assest/policy_1.webp",
            title: "Tư Vấn Miễn Phí",
            content: "Nhận tư vấn từ chuyên gia 24/7"
          }, {
            image_url: "http://localhost:3001/api/v1/file/assest/policy_2.webp",
            title: "Hỗ Trợ Lắp Đặt",
            content: "Lắp đặt miễn phí tại TP.HCM"
          }, {
            image_url: "http://localhost:3001/api/v1/file/assest/policy_3.png",
            title: "Bảo Hành Chính Hãng",
            content: "Sản Phẩm, Phụ Kiện Chất Lượng Cao"
          }, {
            image_url: "http://localhost:3001/api/v1/file/assest/policy_4.webp",
            title: "Thanh Toán An Toàn",
            content: "Chính sách hậu mãi uy tín"
          }
        ])
      },
      {
        key: 'promotions', value: JSON.stringify([
          {
            image_url: "http://localhost:3001/api/v1/file/assest/promotion1.png",
            link: '/search/q?category_id=-1'
          },
          {
            image_url: "http://localhost:3001/api/v1/file/assest/promotion2.png",
            link: '/search/q?category_id=-1'
          },
          {
            image_url: "http://localhost:3001/api/v1/file/assest/promotion3.png",
            link: '/search/q?category_id=-1'
          },
        ])
      },
    ];

    await queryInterface.bulkInsert('settings', settings.map(setting => ({
      ...setting,
      createdAt: new Date(),
      updatedAt: new Date()
    })), {});
  },

  async down(queryInterface, Sequelize) {
  }
};
