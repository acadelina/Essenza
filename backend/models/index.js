const Product = require("./Product");
const ProductVariant = require("./ProductVariant");

Product.hasMany(ProductVariant, {
    foreignKey: "product_id",
    as: "variants"
});

ProductVariant.belongsTo(Product, {
    foreignKey: "product_id",
    as: "product"
});

module.exports = { Product, ProductVariant };
