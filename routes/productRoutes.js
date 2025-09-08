const express = require("express");
const {
    createProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct
} = require("../controllers/productController");

const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const isAdmin = require("../middleware/isAdmin");
router.post("/",authMiddleware,isAdmin, createProduct);


router.get("/", getProducts);//.
router.get("/:id", getProductById);//.


router.put("/:id",authMiddleware,isAdmin, updateProduct);//*
router.delete("/:id",authMiddleware,isAdmin, deleteProduct);//*

module.exports = router;
