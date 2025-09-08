
const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Product=require("./Product");

const ProductVariant = sequelize.define("products_variants", {
        stock: { type: DataTypes.INTEGER, defaultValue: 0 },
        product_id: {type: DataTypes.INTEGER,allowNull: false},
        id: {type:DataTypes.INTEGER, allowNull: false,primaryKey: true,autoIncrement: true,},
        volume:{type: DataTypes.INTEGER, allowNull: false},
        price: { type: DataTypes.FLOAT, allowNull: false },
    },
    {
        timestamps: false
    });


module.exports = ProductVariant;