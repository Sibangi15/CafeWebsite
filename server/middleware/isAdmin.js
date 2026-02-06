const User = require("../modules/User");

const isAdmin = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id);

        if (!user || user.role !== "admin") {
            return res.status(403).send("Admin access required");
        }

        next();
    } catch (error) {
        res.status(500).send("Internal server error");
    }
};

module.exports = isAdmin;
