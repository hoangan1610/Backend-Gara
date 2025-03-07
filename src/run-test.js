const { sequelize } = require('./models'); // Đường dẫn đến models của bạn
const seeder = require('./seeders/20241008040142-seed-products'); // Đường dẫn đến file seeder

(async () => {
    try {
        await sequelize.authenticate(); // Kết nối với cơ sở dữ liệu
        console.log('Connection has been established successfully.');

        // Thực thi seeder
        await seeder.up(sequelize.getQueryInterface(), sequelize);
        console.log('Seeder ran successfully!');

        // Đóng kết nối sau khi chạy xong
        await sequelize.close();
    } catch (error) {
        console.error('Error occurred:', error);
    }
})();
