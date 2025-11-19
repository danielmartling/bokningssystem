// src/db/config.js

const { Sequelize, DataTypes } = require('sequelize');

const { types } = require('pg');
types.setTypeParser(1082, val => val);


const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: 'postgres',
        logging: false
    });

module.exports = sequelize;