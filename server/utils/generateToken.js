const jwt = require("jsonwebtoken");

const generateAccessToken = async (payload) => {
    const accessToken = await jwt.sign(payload, process.env.JWT_ACCESS_TOKEN_SECRET, { expiresIn: "300s" });
    return accessToken;
};

const generateRefreshToken = async (payload) => {
    const refreshToken = await jwt.sign(payload, process.env.JWT_REFRESH_TOKEN_SECRET, { expiresIn: "7d" });
    return refreshToken;
};

module.exports = { generateAccessToken, generateRefreshToken };
