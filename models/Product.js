const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const ProductVariant=require("./ProductVariant");

const Product = sequelize.define("products", {
    name: { type: DataTypes.STRING, allowNull: false },
    brand: { type: DataTypes.STRING, allowNull: false },
    sex:{type:DataTypes.STRING, allowNull: false},
    description: { type: DataTypes.TEXT },
    stock: { type: DataTypes.INTEGER, defaultValue: 0 },
    notes: {type: DataTypes.TEXT},
    id: {type:DataTypes.INTEGER, allowNull: false,primaryKey: true,autoIncrement: true,},
    image:{type: DataTypes.STRING, allowNull: false},
},
{
    timestamps: false
});



module.exports = Product;
