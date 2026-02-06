const jwt = require("jsonwebtoken");
const JWT_SECRET = "heythere";

const fetchuser = (req, res, next) => {
    const token = req.header("auth-token");

    if (!token) {
        return res.status(401).send("Access denied. No token provided.");
    }

    try {
        const data = jwt.verify(token, JWT_SECRET);
        req.user = data.user; // { id }
        next();
    } catch (error) {
        return res.status(401).send("Invalid token");
    }
};

module.exports = fetchuser;


