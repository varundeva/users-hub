const bcrypt = require("bcrypt");

const { generateAccessToken, generateRefreshToken } = require("../utils/generateToken");
const { hashPassword } = require("../utils/hashPassword");

const db = require("../models");
const { User } = db;

const userRegister = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const isUserAvailable = await User.findOne({ where: { email } });

        if (isUserAvailable) return res.send("Email already exists");

        const hashedPassword = await hashPassword(password);

        if (hashPassword) {
            const data = await User.create({
                name,
                email,
                password: hashedPassword,
            });
            res.send(data);
        } else {
            res.send("Password Hash Failed");
        }
    } catch (error) {
        console.error(error.message);
        res.send(error.message);
    }
};

const userLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ where: { email } });

        if (!user) return res.send("Account Doesn't Exist");

        const isValidPassword = await bcrypt.compareSync(password, user.password);

        if (!isValidPassword) return res.send("Email or Password Error");

        const accessToken = await generateAccessToken({ email: user.email });
        const refreshToken = await generateRefreshToken({ email: user.email });

        res.cookie("accessToken", accessToken, {
            secure: true,
            httpOnly: true,
            expires: new Date(Date.now() + 300000),
        });
        res.cookie("refreshToken", refreshToken, {
            secure: true,
            httpOnly: true,
            expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        });
        res.send({ message: "Logged In", userEmail: user.email, userName: user.name });
    } catch (error) {
        console.error(error.message);
        res.send(error.message);
    }
};

module.exports = { userRegister, userLogin };
