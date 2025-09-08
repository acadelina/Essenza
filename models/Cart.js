const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const User = require("./User");
const Product = require("./Product");

const Cart = sequelize.define("carts", {
    userUsername: { type: DataTypes.INTEGER,field: "usr", defaultValue: 1 },
    id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true,autoIncrement: true },
},
    {
        tableName: "carts",
        timestamps: false,
        freezeTableName: true,
        underscored: true
    });


User.hasOne(Cart);
Cart.belongsTo(User);

module.exports = Cart;
