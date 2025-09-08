const dotenv = require("dotenv");
const express = require("express");

const cors = require("cors");
const sequelize = require("./config/db");

const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
const cartRoutes = require("./routes/cartRoutes");
const orderRoutes = require("./routes/orderRoutes");

dotenv.config();
const app = express();


app.use(cors());
app.use(express.json());


app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/carts", cartRoutes);
app.use("/api/orders", orderRoutes);

app.get("/", (req, res) => res.send("ESSENZA API running"));


sequelize.sync().then(() => {
    console.log("Database connected");
    app.listen(process.env.PORT || 3000, () => {
        console.log(`Server running on http://localhost:${process.env.PORT || 3000}`);
    });
});
