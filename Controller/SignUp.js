const { UserModel } = require("../../Model/UserSignupmodel");

const SignUp = async (req, res) => {
    try {
        const { username, password, phoneNumber, emailaddress } = req.body;

        if (username && password && emailaddress && phoneNumber) {
            const user = new UserModel({ username, emailaddress, password, phoneNumber });
            const dbResponse = await user.save();

            res.status(201).json({
                data: dbResponse,
                success: true,
                error: false
            });
        } else {
            res.status(400).json({
                message: "Missing required fields",
                success: false,
                error: true
            });
        }
    } catch (err) {
        res.json({
            message: err.message || err,
            success: false,
            error: true
        });
    }
};

module.exports = SignUp;