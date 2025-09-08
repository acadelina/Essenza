const express = require("express");
const {
    createCart,
    getCartItems,
    addItem,
    removeItem,
    linkCartToUser
} = require("../controllers/cartController");

const router = express.Router();

router.post("/", createCart);//.
router.post("/add", addItem);//.
router.post("/link", linkCartToUser);//.


router.get("/:id_user", getCartItems);//.

router.delete("/", removeItem);//.


module.exports = router;
