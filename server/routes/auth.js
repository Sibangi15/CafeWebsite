const express = require('express');
const User = require('../modules/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');

const JWT_SECRET = 'heythere';

// ROUTE 1: Create user
router.post(
    '/createuser',
    [
        body('name', 'Enter a valid name').isLength({ min: 3 }),
        body('email', 'Enter a valid email').isEmail(),
        body('password', 'Password must be atleast 5 characters').isLength({ min: 5 })
    ],
    async (req, res) => {
        let success = false;

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success, errors: errors.array() });
        }

        try {
            let user = await User.findOne({ email: req.body.email });
            if (user) {
                return res
                    .status(400)
                    .json({ success, error: "User with this email already exists" });
            }

            const salt = await bcrypt.genSalt(10);
            const secPass = await bcrypt.hash(req.body.password, salt);

            user = await User.create({
                name: req.body.name,
                email: req.body.email,
                password: secPass,
                role: 'user'
            });

            const data = {
                user: { id: user.id }
            };

            const authtoken = jwt.sign(data, JWT_SECRET);
            success = true;

            res.json({ success, authtoken });
        } catch (error) {
            console.error("CREATE USER ERROR:", error);
            res.status(500).json({ success: false, error: "Internal Server Error" });
        }
    }
);

// ROUTE 2: Login
router.post(
    '/login',
    [
        body('email', 'Enter a valid email').isEmail(),
        body('password', 'Password cannot be blank').exists()
    ],
    async (req, res) => {
        let success = false;

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success, errors: errors.array() });
        }

        const { email, password } = req.body;

        try {
            let user = await User.findOne({ email });
            if (!user) {
                return res
                    .status(400)
                    .json({ success, error: "Please login with correct credentials" });
            }

            const passwordCompare = await bcrypt.compare(password, user.password);
            if (!passwordCompare) {
                return res
                    .status(400)
                    .json({ success, error: "Please login with correct credentials" });
            }

            const data = {
                user: { id: user.id }
            };

            const authtoken = jwt.sign(data, JWT_SECRET);
            success = true;

            res.json({ success, authtoken });
        } catch (error) {
            console.error("LOGIN ERROR:", error);
            res.status(500).json({ success: false, error: "Internal Server Error" });
        }
    }
);

// ROUTE 3: Get logged-in user
router.post('/getuser', fetchuser, async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId).select('-password');
        res.json(user);
    } catch (error) {
        console.error("GET USER ERROR:", error);
        res.status(500).send("Internal server error");
    }
});

module.exports = router;
