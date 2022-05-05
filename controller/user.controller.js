const bcrypt = require("bcrypt");
const db = require("../models");
const { User } = db;

const hashPassword = async (password, saltRounds = 10) => {
    try {
        // Generate a salt
        const salt = await bcrypt.genSalt(saltRounds);
        // Hash password
        return await bcrypt.hashSync(password, salt);
    } catch (error) {
        console.log(error);
    }
    // Return null if error
    return null;
};

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

        res.send({ message: "Logged In", userEmail: user.email, userName: user.name });
    } catch (error) {
        console.error(error.message);
        res.send(error.message);
    }
};

module.exports = { userRegister, userLogin };
