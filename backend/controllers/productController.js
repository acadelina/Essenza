const { Product, ProductVariant } = require("../models");
const sequelize = require("../config/db");

exports.createProduct = async (req, res) => {
    const { product, variants } = req.body;

    try {
        const result = await sequelize.transaction(async (t) => {
            let existingProduct = await Product.findOne({
                where: {
                    brand: product.brand,
                    name: product.name
                },
                transaction: t
            });

            if (!existingProduct) {

                const newProduct = await Product.create(product, { transaction: t });

                const variantsWithProductId = variants.map((v) => ({
                    ...v,
                    product_id: newProduct.id,
                }));

                await ProductVariant.bulkCreate(variantsWithProductId, { transaction: t });

                return { product: newProduct, created: true };
            } else {

                const existingVariants = await ProductVariant.findAll({
                    where: { product_id: existingProduct.id },
                    transaction: t
                });


                const existingVolumes = existingVariants.map(v => v.volume);

                console.log(existingVolumes);
                const newVariants = variants.filter(
                    (v) => !existingVolumes.includes(Number(v.volume))
                );
                console.log(newVariants)

                if (newVariants.length > 0) {
                    const variantsWithProductId = newVariants.map((v) => ({
                        ...v,
                        product_id: existingProduct.id,
                    }));

                    await ProductVariant.bulkCreate(variantsWithProductId, { transaction: t });
                }

                return { product: existingProduct, created: false };
            }
        });

        return res.status(201).json({
            message: result.created
                ? "Product created"
                : "Product already exists, new variants added",
            product: result.product,
        });

    } catch (error) {
        console.error("error:", error);
        return res.status(500).json({ error: "Can't create product" });
    }
};

exports.deleteVariant = async (req, res) => {
    try {
        const { id, variantId } = req.params;

        const product = await Product.findByPk(id);
        if (!product) {
            return res.status(404).json({ msg: "Product not found" });
        }

        const variant = await ProductVariant.findOne({
            where: { id: variantId, product_id: id },
        });

        if (!variant) {
            return res.status(404).json({ msg: "Variant not found" });
        }

        await variant.destroy();
        return res.json({ msg: "Variant deleted successfully" });
    } catch (err) {
        console.error(err)
        res.status(500).json({ error: err.message });
    }
};

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
        await ProductVariant.destroy({ where: { product_id: product.id } });
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
