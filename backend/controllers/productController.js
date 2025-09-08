const { Product, ProductVariant } = require("../models");

exports.createProduct = async (req, res) => {
    try{
        const {brand, name, price, stock, description, notes} = req.body;
        const product=Product.create({brand,name,price,stock,description,notes});
        res.status(201).json(product);
    }catch(err){
        res.status(500).json({ error: err.message });
    }
}

exports.updateProduct = async (req, res) => {
    try{
        const product= await Product.findByPk(req.params.id);
        if(!product) return res.status(404).json({ msg: "Product not found" });

        const {brand, name, price, stock, description, notes} = req.body;
        await product.update({brand,name,price,stock,description,notes});
        res.json(product);
    }
    catch (err){
        res.status(500).json({ error: err.message });
    }
}

exports.deleteProduct = async (req, res) => {
    try{
        const product=await Product.findByPk(req.params.id);
        if(!product) return res.status(404).json({ msg: "Product not found" });

        await product.destroy();
        res.json({msg: "Product deleted successfully"});
    }catch(err){
        res.status(500).json({ error: err.message });
    }
}

exports.getProducts = async (req, res) => {
    try {
        const products = await Product.findAll({
            include: [
                {
                    model: ProductVariant,
                    as: "variants",
                    attributes: ["price"],
                }
            ]
        });
        console.log(products)


        const productsWithMinPrice = products.map(prod => {
            const prices = prod.variants.map(v => v.price);
            const minPrice = prices.length > 0 ? Math.min(...prices) : 0;
            return {
                id: prod.id,
                name: prod.name,
                brand: prod.brand,
                image: prod.image,
                minPrice,
                stock: prod.stock,
                notes:prod.notes,
                sex:prod.sex,

            };
        });

        res.json(productsWithMinPrice);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: err.message });
    }
};

exports.getProductById = async (req, res) => {
    try {
        const product = await Product.findByPk(req.params.id, {
            include: [
                {
                    model: ProductVariant,
                    as: "variants",
                    attributes: ["id", "volume", "price", "stock"],
                    order: [["price", "ASC"]]
                }
            ]
        });

        if (!product) return res.status(404).json({ msg: "Product not found" });

        res.json(product);
    } catch (err) {
        console.error("Error fetching product:", err);
        res.status(500).json({ error: err.message });
    }
};
