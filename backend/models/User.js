const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const User = sequelize.define("users", {
    username: { type: DataTypes.STRING, allowNull: false, unique: true ,primaryKey: true },
    mail: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
    role: { type: DataTypes.STRING, defaultValue: "customer" }
},
    {
        timestamps: false,
        id:false
    });

module.exports = User;