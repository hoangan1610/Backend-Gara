import { Sequelize } from 'sequelize';
import db from '../models';
const fs = require('fs');
const path = require('path');
const process = require('process');

require('dotenv').config();

const sequelize = new Sequelize(process.env.DB_NAME || 'db', process.env.DB_USER || 'root', process.env.DB_PASSWORD || '123456@', {
    host: 'localhost',
    dialect: 'mysql',
    port: process.env.DB_PORT || 3306,
    logging: false
});

let connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

export const sequelizeSync = async () => {
    try {
        const mysql = require('mysql2');
        require('dotenv').config();

        // Tạo kết nối MySQL
        const connection = mysql.createConnection({
            host: 'localhost',
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD
        });

        // Sử dụng Promise để đảm bảo các truy vấn hoàn thành đúng thứ tự
        const dropDatabase = () => {
            return new Promise((resolve, reject) => {
                connection.query('DROP DATABASE IF EXISTS ' + process.env.DB_NAME, (err, results) => {
                    if (err) {
                        return reject('Error dropping database: ' + err);
                    }
                    console.log('Database dropped successfully.');
                    resolve(results);
                });
            });
        };

        const createDatabase = () => {
            return new Promise((resolve, reject) => {
                connection.query('CREATE DATABASE ' + process.env.DB_NAME, (err, results) => {
                    if (err) {
                        return reject('Error creating database: ' + err);
                    }
                    console.log('Database created successfully.');
                    resolve(results);
                });
            });
        };

        // Đảm bảo các truy vấn hoàn thành trước khi tiếp tục
        await dropDatabase();
        await createDatabase();

        // Đóng kết nối
        connection.end();

        // Đồng bộ hóa các models với Sequelize
        await db.sequelize.sync({ force: true });
        console.log('All models were synchronized successfully.');
    } catch (error) {
        console.error('Unable to sync models:', error);
    }
};


export const seedData = async () => {
    try {
        const seeders = fs.readdirSync(path.join(__dirname, '../seeders'));
        for (let seeder of seeders) {
            await require(path.join(__dirname, '../seeders', seeder)).up(db.sequelize.getQueryInterface(), Sequelize);
        }
        console.log('Seed data successfully.');

    } catch (error) {
        console.error('Unable to seed data:', error);
    }
}

export default connectDB;