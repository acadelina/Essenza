const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.register = async (req, res) => {
    try {
        const { username, mail, password } = req.body;
        const existingUser = await User.findOne({ where: { username } });
        if (existingUser) {
            return res.status(400).json({ msg: "Username already exists" });
        }


        const existingMail = await User.findOne({ where: { mail } });
        if (existingMail) {
            return res.status(400).json({ msg: "Mail already registered" });
        }

        const hashed = await bcrypt.hash(password, 10);
        const user = await User.create({ username, mail, password: hashed });
        res.json(user);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { mail, password } = req.body;
        const user = await User.findOne({ where: { mail } });
        if (!user) return res.status(404).json({ msg: "User not found" });

        const match = await bcrypt.compare(password, user.password);
        if (!match) return res.status(401).json({ msg: "Wrong password" });

        const token = jwt.sign({ username: user.username, role: user.role,mail:user.mail }, process.env.JWT_SECRET, { expiresIn: "1d" });
        res.json({ token });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
