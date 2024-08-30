const bcrypt = require("bcrypt");
const User = require('../Models/User');
const jwt = require('jsonwebtoken'); // Import jwt

exports.signup = async (req, res) => {
    try {
        //get data
        const { name, email, password, role } = req.body;
        //check if user already exist
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "user already exists"
            });
        }

        //secure password
        let hashedPassword;
        try {
            hashedPassword = await bcrypt.hash(password, 10);
        } catch (err) {
            return res.status(500).json({
                success: false,
                message: "Error in hashing password",
            })
        }

        //create user
        const user = await User.create({
            name, email, password: hashedPassword, role
        });

        return res.status(200).json({
            success: true,
            message: "user created successfully"
        })
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "user can not be registered, please try again later"
        })
    }

}

exports.login = async (req, res) => {
    try {
        // Data fetch
        const { email, password } = req.body;

        // Validation on email and password
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Please fill all the details carefully",
            });
        }

        // Check for registered user
        const user = await User.findOne({ email });

        // If not a registered user
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "User is not registered",
            });
        }

        // Verify password and generate a JWT token
        const isMatch = await bcrypt.compare(password, user.password);

        if (isMatch) {
            // Password matches
            const payload = {
                email: user.email,
                id: user._id,
                role: user.role,
            };

            const token = jwt.sign(payload, process.env.JWT_SECRET, {
                expiresIn: "2h",
            });

            // Set token in user object and remove password
            // let user=user.toObject();
            user.token = token;
            user.password = undefined;

            const options = {
                expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days
                httpOnly: true,
            };

            res.cookie("Sidcookie3", token, options).status(200).json({
                success: true,
                token,
                user,
                message: "User logged in successfully"
            });

        } else {
            // Password does not match
            return res.status(403).json({
                success: false,
                message: "Password Incorrect",
            });
        }
    } catch (error) {
        console.error(error); // Use console.error for error logging
        return res.status(500).json({
            success: false,
            message: "Login failure",
        });
    }
};
