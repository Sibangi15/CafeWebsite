const express = require('express');
const router = express.Router();
var fetchuser = require('../middleware/fetchuser');
const Menu = require('../modules/MenuItem');
const { body, validationResult } = require('express-validator');

//ROUTE 1: get Menu (user)
router.get('/fetchmenu', fetchuser, async (req, res) => {
    try {
        const menu = await Menu.find();
        res.json(menu)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error");
    }
})

//ROUTE 2: add new Menu (admin)
router.post('/addmenu', fetchuser, [
    body('name', 'Enter valid name').isLength({ min: 3 }),
    body('description', 'Description must be atleast 5 characters').isLength({ min: 5 }),
    body('price', 'Add the price here').isNumeric(),
    body('category', 'which category is it').isLength({ min: 3 }),
    body('image', 'URL of the image').isURL()
], async (req, res) => {
    try {
        if (req.user.role !== 'admin') {
            return res.status(403).send("Access denied");
        }
        const { name, description, price, category, image } = req.body;

        const errors = validationResult(req);
        if (!errors.isEmpty()) { return res.status(400).json({ errors: errors.array() }); }

        const menu = new Menu({ name, description, price, category, image, user: req.user.id })
        //if (menu) { return res.status(400).json({ error: "Sorry this menu already exists" }) }
        const saveMenu = await menu.save();
        res.json(saveMenu)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error");
    }
})

//ROUTE 3: update Menu (admin)
router.put('/updatemenu/:id', fetchuser, async (req, res) => {
    const { name, description, price, category, image } = req.body;
    try {
        if (req.user.role !== 'admin') {
            return res.status(403).send("Access denied");
        }
        const newMenu = {};
        if (name) { newMenu.name = name; }
        if (description) { newMenu.description = description; }
        if (price) { newMenu.price = price; }
        if (category) { newMenu.category = category; }
        if (image) { newMenu.image = image; }

        let menu = await Menu.findById(req.params.id);
        if (!menu) { return res.status(404).send("Not Found"); }

        // if (menu.user.toString() !== req.user.id) {
        //     return res.status(401).send("Not Allowed");
        // }

        menu = await Menu.findByIdAndUpdate(req.params.id, { $set: newMenu }, { new: true })
        res.json({ menu });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error");
    }
})

//ROUTE 4: delete Menu (admin)
router.delete('/deletemenu/:id', fetchuser, async (req, res) => {
    try {
        if (req.user.role !== 'admin') {
            return res.status(403).send("Access denied");
        }
        let menu = await Menu.findById(req.params.id);
        if (!menu) { return res.status(404).send("Not Found"); }

        // if (menu.user.toString() !== req.user.id) {
        //     return res.status(401).send("Not Allowed");
        // }

        menu = await Menu.findByIdAndDelete(req.params.id)
        res.json({ "Success": "Menu has been deleted", menu: menu });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error");
    }
})

module.exports = router