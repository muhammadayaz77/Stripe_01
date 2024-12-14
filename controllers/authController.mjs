import userModel from "../models/userModel.mjs";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'



export const register = async(req,res)=>{
  try{
    let {fullname,email,password} = req.body;
    let userExist = await userModel.findOne({email});
    if(userExist) return res.json({
      message : "user already exists",
      success : false
    })
    let hash = await bcrypt.hash(password,10);
    let user = await userModel.create({
      fullname,
      email,
      password : hash
    })
    let token = jwt.sign({email,userId:user._id},process.env.SECRET_KEY);
    res.status(200).json({
      token,
      user,
      message : 'user created',
      success : true
    })
  }catch(err){
    return res.status(200).json({
      message : err.message,
      success : false
    })
  }
}
export const login = async(req,res)=>{
  try{
    let {email,password} = req.body;
    let user = await userModel.findOne({email});
    if(!user){
      return res.status(401).json({
        message : 'user not found',
        success : false
      })
    }
    let checkPassword = await bcrypt.compare(password,user.password);
    if(!checkPassword) return res.status(401).json({
      message : 'password is incorrect',
      success : false
    })
    let token = jwt.sign({email,userId:user._id},process.env.SECRET_KEY);
    res.status(200).json({
      token,
      user,
      message : 'user login',
      success : true
    })
  }catch(err){
    return res.status(200).json({
      message : err.message,
      success : false
    })
  }
}