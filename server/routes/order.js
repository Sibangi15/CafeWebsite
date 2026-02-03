const express = require('express');
const router = express.Router();
var fetchuser = require('../middleware/fetchuser');
const Order = require('../modules/Order');
const Menu = require('../modules/MenuItem');
const { body, validationResult } = require('express-validator');

//ROUTE 1: gat all orders (user)
router.get('/fetchorder/user', fetchuser, async (req, res) => {
    try {
        const order = await Order.find({ user: req.user.id });
        res.json(order)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error");
    }
})

//ROUTE 2: gat all orders (admin)
router.get('/fetchorders', fetchuser, async (req, res) => {
    try {
        if (req.user.role !== 'admin') {
            return res.status(403).send("Access denied");
        }
        const order = await Order.find();
        res.json(order)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error");
    }
})

//ROUTE 3: add new orders (user)
router.post('/addorder', fetchuser, [
    body('items', 'Items must be an array').isArray({ min: 1 }),
    body('items.*.menuItem', 'Invalid menu item').isMongoId(),
    body('items.*.quantity', 'Quantity must be >= 1').isInt({ min: 1 })
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) { return res.status(400).json({ errors: errors.array() }); }

        const { items } = req.body;

        const menuIds = items.map(i => i.menuItem);
        const menus = await Menu.find({ _id: { $in: menuIds } });

        let totalPrice = 0;

        const orderItems = items.map(item => {
            const menu = menus.find(m => m.id === item.menuItem);
            if (!menu) throw new Error('Menu item not found');

            totalPrice += menu.price * item.quantity;

            return {
                menuItem: menu._id,
                quantity: item.quantity,
                price: menu.price
            };
        });

        const order = new Order({ user: req.user.id, items: orderItems, totalPrice })
        const saveOrder = await order.save();
        res.json(saveOrder)

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error");
    }
})

//ROUTE 4: update status of an order (admin)
router.put('/updatestatus/:id', fetchuser, async (req, res) => {
    const { status } = req.body;
    try {
        if (req.user.role !== 'admin') {
            return res.status(403).send("Access denied");
        }

        const allowedStatus = ['pending', 'preparing', 'delivered'];
        if (!allowedStatus.includes(status)) {
            return res.status(400).send("Invalid status");
        }

        let order = await Order.findById(req.params.id);
        if (!order) { return res.status(404).send("Not Found"); }

        order.status = status;
        await order.save();

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error");
    }
})

module.exports = router