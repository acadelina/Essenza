const express = require("express");
const {
    createOrder,
    getOrders,
    getOrderById,
    updateOrder,
    getOrdersByUser
} = require("../controllers/orderController");

const router = express.Router();

router.post("/", createOrder);//.


router.get("/", getOrders);//.
router.get("/:id", getOrderById);
router.get("/user/:username", getOrdersByUser);//.


router.put("/:cart", updateOrder);//.


module.exports = router;
