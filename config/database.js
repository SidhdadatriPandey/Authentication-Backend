const mongoose=require("mongoose");

require("dotenv").config();

const connect=()=>{
    mongoose.connect(process.env.MONGODB_URL,{
        useNewUrlParser:true,
        useUnifiedTopology:true,
    })
    .then(console.log("DB Connected Successfully"))
    .catch((error)=>{
        console.log("DB fasing connection issue");
        console.log(error);
        process.exit(1);
    })
}

module.exports=connect;