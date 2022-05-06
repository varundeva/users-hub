const jwt = require("jsonwebtoken");

const generateAccessToken = async (payload) => {
    const accessToken = await jwt.sign(payload, process.env.JWT_ACCESS_TOKEN_SECRET, { expiresIn: "300s" });
    return accessToken;
};

module.exports = { generateAccessToken };
