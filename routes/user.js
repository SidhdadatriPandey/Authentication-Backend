const express=require("express");
const router=express.Router();

const {signup,login}=require('../Controllers/Auth');
const {auth,isStudent,isAdmin}=require('../middlewares/auth');

router.post('/login',login);
router.post('/signup',signup);

//testing protected route for single middleware
router.post("/test",auth,(req,res)=>{
    res.json({
        success:true,
        message:'Welcome to the Protected route for tests',
    });
});

//Protected route
router.get('/student',auth,isStudent,(req,res)=>{
    res.json({
        success:true,
        message:"Welcome to protected route for student",
    });
});

router.get("/admin",auth,isAdmin,(req,res)=>{
    res.json({
        success:true,
        message:"Welcome to protected route for Admin",
    });
});

module.exports=router;