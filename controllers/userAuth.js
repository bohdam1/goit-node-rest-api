const {User} = require("../schemas/userSchema")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require('dotenv').config();


const register = async (req, res) => {
    const {  email, password } = req.body
    const user = await User.findOne ({email})
    if (user) {
        return res.status(409).json({
            message: `${email} is already registered`, 
        });
    }
    const  hashpassword = await bcrypt.hash(password,10)

    const newUser = await User.create({...req.body,password:hashpassword})
    res.status(201).json(newUser)
}

const login = async (req, res) => {
 const { email, password } = req.body
 
 const user = await User.findOne ({email})
 if (!user) {
    return res.status(401).json({
         message: "email or  password invilded", 
    });
 }   
 const passwordCompaired = await bcrypt.compare(password,user.password)
 if (!passwordCompaired) {
    return res.status(401).json({
         message: "email or  password invilded", 
    });
 }   
 const token = jwt.sign({id: user._id},process.env.SECRET_KEY,{expiresIn: "24h"})

 res.json({token})

}

module.exports = {
    register,
    login,
   
}