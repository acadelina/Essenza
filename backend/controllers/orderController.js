const Order=require('../models/Order');
const sequelize = require("../config/db");
const ProductVariant=require('../models/ProductVariant');
const db = require("../config/db");
const Cart=require('../models/Cart');


exports.createOrder = async (req, res) => {
    const t = await sequelize.transaction();
    try {
        const { user, cart, price, status } = req.body;
        console.log(user,cart,price,status);


        const order = await Order.create(
            { user, cart, price, status },
            { transaction: t }
        );


        const [cartItems] = await sequelize.query(
            `SELECT ci.quantity, p.name, p.brand, pv.price, pv.volume, p.image, p.id, pv.id as var
       FROM carts_products ci
                JOIN products_variants pv ON ci.id_variant = pv.id
                JOIN products p on p.id = pv.product_id
       WHERE ci.id_cart = :cart_id`,
            {
                replacements: { cart_id: cart },
                transaction: t,
            }
        );

        if (!cartItems.length) {
            throw new Error("Cart is empty");
        }

        for (const item of cartItems) {
            const variant = await ProductVariant.findByPk(item.var, {
                transaction: t,
            });

            if (!variant) {
                throw new Error(`Variant ${item.var} not found`);
            }

            if (variant.stock < item.quantity) {
                throw new Error(
                    `Not enough stock for variant ${item.name} ${item.volume}ml. Available: ${variant.stock}`
                );
            }

            variant.stock -= item.quantity;
            await variant.save({ transaction: t });
        }


        await Cart.destroy({ where: { id: cart }, transaction: t });

        await t.commit();

        res.status(201).json(order);
    } catch (err) {

        await t.rollback();
        console.error(err);
        res.status(500).json({ error: err.message });
    }
};


exports.updateOrder = async (req, res) => {
    try {
        const { user, cart } = req.params;
        const order = await Order.findOne({ where: { user, cart } });
        if (!order) return res.status(404).json({ msg: "Order not found" });

        const { total, status } = req.body;
        await order.update({ total, status });
        res.json(order);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


exports.getOrders = async (req, res) => {
    try{
        const orders= await Order.findAll();
        res.json(orders);
    }catch(err){
        res.status(500).json({ error: err.message });
    }
}

exports.getOrderById = async (req, res) => {
    try {
        const { user, cart } = req.params;
        const order = await Order.findOne({ where: { user, cart } });
        if (!order) return res.status(404).json({ msg: "Order not found" });
        res.json(order);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getOrdersByUser = async (req, res) => {
    try {
        const { username } = req.params;

        const orders = await Order.findAll({
            where: { user: username },

        });

        if (!orders.length) {
            return res.json([]);
        }

        const ordersWithItems = await Promise.all(
            orders.map(async (order) => {
                const items = await db.query(
                    `SELECT cp.id_cart,cp.quantity, pv.volume, pv.price, p.name, p.brand, p.image
           FROM carts_products cp
           JOIN products_variants pv ON cp.id_variant = pv.id
           JOIN products p ON p.id = pv.product_id
           WHERE cp.id_cart = :cart_id`,
                    {
                        replacements: { cart_id: order.cart },
                        type: db.QueryTypes.SELECT,
                    }
                );

                return {
                    id: order.cart,
                    status: order.status,
                    total: order.price,
                    items,
                };
            })
        );

        res.json(ordersWithItems);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
};
