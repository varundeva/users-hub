const bcrypt = require("bcrypt");

const hashPassword = async (password, saltRounds = 10) => {
    try {
        // Generate a salt
        const salt = await bcrypt.genSalt(saltRounds);
        // Hash password
        return await bcrypt.hashSync(password, salt);
    } catch (error) {
        // Return null if error
        console.log(error);
        return null;
    }
};

module.exports = { hashPassword };
