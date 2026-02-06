const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const isAdmin = require("../middleware/isAdmin");
const Menu = require('../modules/MenuItem');
const { body, validationResult } = require('express-validator');

// ROUTE 1: Get Menu (PUBLIC)
router.get('/', async (req, res) => {
    try {
        const menu = await Menu.find();
        res.json(menu);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error");
    }
});

// ROUTE 2: Add Menu Item (ADMIN)
router.post('/', fetchuser, isAdmin, [
    body('name', 'Enter valid name').isLength({ min: 3 }),
    body('description', 'Description must be at least 5 characters').isLength({ min: 5 }),
    body('price', 'Price must be a number').isNumeric(),
    body('category', 'Category is required').isLength({ min: 3 }),
    body('image', 'Image must be a valid URL').isURL()
],
    async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const { name, description, price, category, image } = req.body;

            const menu = new Menu({
                name,
                description,
                price,
                category,
                image
            });

            const savedMenu = await menu.save();
            res.json(savedMenu);

        } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal server error");
        }
    }
);

// ROUTE 3: Update Menu (ADMIN)
router.put('/:id', fetchuser, isAdmin, async (req, res) => {
    try {
        const { name, description, price, category, image } = req.body;

        const newMenu = {};
        if (name) newMenu.name = name;
        if (description) newMenu.description = description;
        if (price !== undefined) newMenu.price = price;
        if (category) newMenu.category = category;
        if (image) newMenu.image = image;

        let menu = await Menu.findById(req.params.id);
        if (!menu) {
            return res.status(404).send("Menu item not found");
        }

        menu = await Menu.findByIdAndUpdate(
            req.params.id,
            { $set: newMenu },
            { new: true }
        );

        res.json(menu);

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error");
    }
});

// ROUTE 4: Delete Menu (ADMIN)
router.delete('/:id', fetchuser, isAdmin, async (req, res) => {
    try {
        let menu = await Menu.findById(req.params.id);
        if (!menu) {
            return res.status(404).send("Menu item not found");
        }

        await Menu.findByIdAndDelete(req.params.id);

        res.json({ success: true, message: "Menu item deleted" });

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error");
    }
});

module.exports = router;
