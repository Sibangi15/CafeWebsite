const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const isAdmin = require("../middleware/isAdmin");

const Order = require("../modules/Order");
const Menu = require("../modules/MenuItem");
const User = require("../modules/User");

// GET admin dashboard stats
router.get("/stats", fetchuser, isAdmin, async (req, res) => {
    try {
        const totalOrders = await Order.countDocuments();
        const totalMenuItems = await Menu.countDocuments();
        const totalUsers = await User.countDocuments();

        res.json({
            totalOrders,
            totalMenuItems,
            totalUsers
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error");
    }
});

module.exports = router;
