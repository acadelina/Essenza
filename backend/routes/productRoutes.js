const express = require("express");
const {
    createProduct,
    getProducts,
    getProductById,
    deleteProduct,
    deleteVariant, updateBestDeals
} = require("../controllers/productController");

const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const isAdmin = require("../middleware/isAdmin");
router.post("/",authMiddleware,isAdmin, createProduct);


router.get("/", getProducts);//.
router.get("/:id", getProductById);//.

router.put("/best-deals",authMiddleware,isAdmin, updateBestDeals);

router.delete("/:id",authMiddleware,isAdmin, deleteProduct);//.
router.delete("/:id/variants/:variantId", authMiddleware, isAdmin, deleteVariant);//.

module.exports = router;
