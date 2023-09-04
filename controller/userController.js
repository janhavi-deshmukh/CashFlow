const userModel=require("../models/userModel");


const loginController=async(req,res)=>{
    try{
       const {email,password}=req.body;
       const user= await userModel.findOne({email,password});
       if(!user){
        return res.status(404).send("user not found");
       }
       return res.status(200).json({
        success:true,
        user,
       });
    }catch(error){
        res.status(400).json({
            success:false,
            error,
        })
    }
};


const registerContoller=async(req,res)=>{
    try{
       const newUser=new userModel(req.body);
       await newUser.save();
       res.status(200).json({
        success:true,
        newUser,
       })
    }catch(err){
        res.status.json({
            success:false,
            error,
        })
    }
};

module.exports={loginController,registerContoller};