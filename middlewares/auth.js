// auth, isStudent , isAdmin

const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.auth =(req, res, next) => {
    try {
        console.log("cookie",req.cookies.Sidcookie3);
        //extract jwt token
        const token = req.cookies.Sidcookie3 || req.body.Sidcookie3;

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Token missing",
            })
        }

        //verify the token
        try {
            const payload =jwt.verify(token, process.env.JWT_SECRET);
            console.log(payload);
            req.user = payload;
        } catch (error) {
            return res.status(401).json({
                success: false,
                message: 'token is invalid',
            })
        }
        next();
    } catch (error) {
        return res.status(401).json({
            success:false,
            message:"Somthing went wrong while varifying token",
        })
    }
}

exports.isStudent=(req,res,next)=>{
    try{
        if(req.user.role!="Student"){
            return res.status(401).json({
                success:false,
                message:"This is a protected route for student",
            });
        }
        next();
    }catch(err){
        return res.status(500).json({
            success:false,
            message:'User role is not matching',
        })
    }
}

exports.isAdmin=(req,res,next)=>{
    try{
        if(req.user.role!="Admin"){
            return res.status(401).json({
                success:false,
                message:"This is a protected route for Admin",
            });
        }
        next();
    }catch(err){
        return res.status(500).json({
            success:false,
            message:'User role is not matching',
        })
    }
}