const express = require('express');
const { 
    register,
    login,
} = require("../controllers/userAuth")
const validateBody = require('../middlewares/validateBody.js')
const {userLoginSchema,userValidationSchema} = require('../schemas/userSchema.js');
const UserRoutes = express.Router();


UserRoutes.post("/register",validateBody(userValidationSchema),register )
UserRoutes.post("/login",validateBody(userLoginSchema),login )

module.exports = UserRoutes