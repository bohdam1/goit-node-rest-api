const express = require('express');
const authenticate = require("../middlewares/athenticate.js")
const upload = require("../middlewares/upload.js");
const changePasswordValidationSchema = require("../middlewares/secondPaswoerd.js")

const { 
    register,
    login,
    updateAvatar,
    changePassword, 
    deleteAccount 
} = require("../controllers/userAuth")
const validateBody = require('../middlewares/validateBody.js')
const {userLoginSchema,userValidationSchema} = require('../schemas/userSchema.js');
const UserRoutes = express.Router();


UserRoutes.post("/register",validateBody(userValidationSchema),register )
UserRoutes.post("/login",validateBody(userLoginSchema),login )
UserRoutes.patch("/avatars",authenticate,upload.single("avatar"),updateAvatar)
UserRoutes.patch("/password", authenticate,  changePassword);
UserRoutes.delete("/account", authenticate, deleteAccount);


module.exports = UserRoutes