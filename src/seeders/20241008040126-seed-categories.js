'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Categories', [{
      name: 'Màn hình Android', //1
      description: 'Màn hình android ô tô',
      path: 'search/q?category_id=1',
      image_url: 'https://autohungdung.com/wp-content/uploads/2023/01/33502699.jpg',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: "Phim cách nhiệt", //2
      description: "Phim cách nhiệt ô tô",
      path: "search/q?category_id=2",
      image_url: "https://auto365.vn/uploads/images/service/dan-phim-3m/audit-11-03/cong-dung-cua-phim-cach-nhiet.jpg",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: "Bọc ghế da", //3
      description: "Bọc ghế da ô tô",
      path: "search/q?category_id=3",
      image_url: "https://auto1998.vn/wp-content/uploads/2023/02/boc-ghe-da-o-to-819x1024.jpg",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: "Camera hành trình", //4
      description: "Camera hành trình ô tô",
      path: "search/q?category_id=4",
      image_url: "https://cdn.tgdd.vn/hoi-dap/1292812/camera-hanh-trinh-la-gi-vi-sao-nen-lap-camera-hanh-trinh%20(1).jpg",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: "Cách âm", //5
      description: "Cách âm xe hơi",
      path: "search/q?category_id=5",
      image_url: "https://tpcar.vn/wp-content/uploads/2022/12/cach-am-chong-on-ford-territory-1.jpg",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: "Body kit", //6
      description: "Body kit ô tô",
      path: "search/q?category_id=6",
      image_url: "https://orokingauto.com/wp-content/uploads/2023/05/body-kit-honda-civic-2017-2021-type-r-5.jpg",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: "Nước hoa cho xe", //7
      description: "Nước hoa cho xe",
      path: "search/q?category_id=7",
      image_url: "https://mrchailo.com/wp-content/uploads/2024/02/nuoc-hoa-o-to-2.jpg",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: "Phủ ceramic", //8
      description: "Phủ ceramic ô tô",
      path: "search/q?category_id=8",
      image_url: "https://product.hstatic.net/200000317829/product/12_19c68963761c4da3bca8fa094cb51a3a_1024x1024.jpg",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: "Cốp xe", //9
      description: "Cốp xe ô tô",
      path: "search/q?category_id=9",
      image_url: "https://cdn.chungauto.vn/uploads/cop-dien-mitsubishi-xpander/cop-dien-perfect-car-chungauto.jpg",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: "Độ đèn ô tô", //10
      description: "search/q?category_id=10",
      path: "do-den-o-to",
      image_url: "https://product.hstatic.net/200000317829/product/1_3f9c29aebf1f4007b30a2669a4c47de7_master.jpg",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    ], {});
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
