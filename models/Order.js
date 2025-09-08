const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Order = sequelize.define('orders', {
    user: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    cart: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    price: DataTypes.FLOAT,
    status: DataTypes.STRING
}, {
    tableName: 'orders',
        timestamps: false
});

module.exports = Order;
