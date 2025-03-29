'use strict';

const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
dotenv.config();

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        const adminHashPassword = bcrypt.hashSync(process.env.ADMIN_PASSWORD, process.env.SALT);
        const adminfirst_name = process.env.ADMIN_FIRST_NAME;
        const adminlast_name = process.env.ADMIN_LAST_NAME;
        const adminEmail = process.env.ADMIN_EMAIL;
        const adminPhone = process.env.ADMIN_PHONE;
        const adminBirth = process.env.ADMIN_BIRTH;

        await queryInterface.bulkInsert('Users', [{
            email: adminEmail,
            hashed_password: adminHashPassword,
            first_name: adminfirst_name,
            last_name: adminlast_name,
            role: 'SUPER_ADMIN',
            phone: adminPhone,
            birth: new Date(adminBirth),
            address: 'Đây là địa chỉ admin',
            image_url: "http://localhost:3001/api/v1/file/image/avatar.jpeg",
            createdAt: new Date(),
            updatedAt: new Date(),
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
