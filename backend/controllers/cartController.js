const db = require("../config/db");
const Cart = require("../models/Cart");

exports.createCart = async (req, res) => {
    const { user_id } = req.body;
    console.log('user_id:', user_id);
    console.log('typeof user_id:', typeof user_id);

    if (!user_id) {
        return res.status(400).json({ error: "user_id is required" });
    }

    try {
        const query = "INSERT INTO carts (usr) \n" +
            "VALUES ($1) \n" +
            "ON CONFLICT (usr) DO UPDATE SET usr = EXCLUDED.usr\n" +
            "RETURNING id;\n";
        const result = await db.query(query, {
            bind: [user_id],
            type: db.QueryTypes.INSERT
        });

        const cartId = result[0][0].id;
        res.json({cartId} || { message: "Cart already exists" });
    } catch (err) {
        console.error('Full error:', err);
        res.status(500).json({ error: err.message });
    }
};

exports.addItem = async (req, res) => {
    const { id_cart, id_product, volume, quantity } = req.body;

    try {

        const variant = await db.query(
            `SELECT id, stock FROM products_variants WHERE product_id = :id_product AND volume = :volume`,
            {
                replacements: { id_product, volume },
                type: db.QueryTypes.SELECT
            }
        );
        console.log(variant);

        if (!variant.length) {
            return res.status(404).json({ error: "Variant not found" });
        }

        if (variant[0].stock < quantity) {
            return res.status(400).json({ error: "Not enough stock" });
        }


        const result = await db.query(
            `INSERT INTO carts_products (id_cart, id_variant, quantity)
             VALUES (:id_cart, :id_variant, :quantity)
             ON CONFLICT (id_cart, id_variant)
             DO UPDATE SET quantity = carts_products.quantity + EXCLUDED.quantity
             RETURNING *`,
            {
                replacements: { id_cart, id_variant: variant[0].id, quantity },
                type: db.QueryTypes.INSERT
            }
        );

        res.json(result[0]);
    } catch (err) {
        console.error(err)
        res.status(500).json({ error: err.message });
    }
};



exports.getCartItems = async (req, res) => {

    const id_user  = req.params.id_user;
    console.log(id_user);
    try {
        const cart =await Cart.findOne({
            where:{usr:id_user},
        })
        console.log(cart)
        if (!cart) {
            return res.json({ items: [] });
        }
        const result = await db.query(
            `SELECT  ci.quantity, p.name, p.brand, pv.price, pv.volume,p.image,p.id,pv.id as var
       FROM carts_products ci
       JOIN products_variants pv ON ci.id_variant = pv.id
       join products p on p.id=pv.product_id
       WHERE ci.id_cart = :cart_id`,
            {
                replacements: {cart_id:cart.id}
            }

        );
        res.json(result[0]);
    } catch (err) {
        console.error(err)
        res.status(500).json({ error: err.message });
    }
};


exports.updateCart = async (req, res) => {
    const { id } = req.params;
    const { user } = req.body;
    console.log(id,user);
    try {
        const result = await db.query(
            "UPDATE carts SET usr = :user WHERE id = :id RETURNING *",
            {
                replacements: {id:id,user:user}
            }
        );
        res.json(result);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
};


exports.removeItem = async (req, res) => {
    const { id_var,id_user } = req.body;
    try {
        const cart =await Cart.findOne({
            where:{usr:id_user},
        })
        console.log(cart.id)
        await db.query(`DELETE FROM carts_products WHERE id_variant = :idvar AND id_cart= :idcart`, {replacements: {idvar:id_var,idcart:cart.id}});
        res.json({ message: "Item removed" });
    } catch (err) {
        console.error(err)
        res.status(500).json({ error: err.message });
    }
};

exports.linkCartToUser = async (req, res) => {
    const { sessionId, username } = req.body;

    try {

        const [cart] = await db.query(
            "SELECT * FROM carts WHERE usr = :sessionId",
            { replacements: { sessionId }, type: db.QueryTypes.SELECT }
        );

        let result;
        if (cart) {

            [result] = await db.query(
                "UPDATE carts SET usr = :username WHERE id = :id RETURNING *",
                { replacements: { username, id: cart.id }, type: db.QueryTypes.UPDATE }
            );
        } else {

            const [cart2] = await db.query(
                "SELECT * FROM carts WHERE usr = :username",
                { replacements: { username }, type: db.QueryTypes.SELECT }
            );
            if(!cart2) {
                [result] = await db.query(
                    "INSERT INTO carts (usr) VALUES (:username) RETURNING *",
                    { replacements: { username }, type: db.QueryTypes.INSERT }
                );
            }
            else{
                result=cart2;
            }

        }

        res.json(result);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
};
