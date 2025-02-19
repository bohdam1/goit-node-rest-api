const {User} = require("../schemas/userSchema")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const gravatar = require("gravatar");
require('dotenv').config();
const path = require("path");
const fs = require('fs/promises');
const avatarsDir = path.join(__dirname ,"../","public","avatars");

const register = async (req, res) => {
    const {  email, password } = req.body
    const user = await User.findOne ({email})
    if (user) {
        return res.status(409).json({
            message: `${email} вже зареєстрований`, 
        });
    }
    const  hashpassword = await bcrypt.hash(password,10)
    const avatarURL = gravatar.url(email)
    const newUser = await User.create({...req.body,password:hashpassword,avatarURL})
    res.status(201).json(newUser)
}

const login = async (req, res) => {
 const { email, password } = req.body
 
 const user = await User.findOne ({email})
 if (!user) {
    return res.status(401).json({
         message: "Пошта або пароль невірні ", 
    });
 }   
 const passwordCompaired = await bcrypt.compare(password,user.password)
 if (!passwordCompaired) {
    return res.status(401).json({
         message: "Пошта або пароль невірні", 
    });
 }   
 const token = jwt.sign({id: user._id},process.env.SECRET_KEY,{expiresIn: "30d"})

 res.json({token,user})

}

const updateAvatar= async (req, res) => {
    const {_id} = req.user;
    const {path:tempUpload,originalname} = req.file
    const filename = `${_id}_${originalname}`;
    const resultUpload = path.join(avatarsDir,filename);
    await fs.rename(tempUpload, resultUpload);
    const avatarURL = path.join("avatars",filename)
    await User.findByIdAndUpdate(_id, {avatarURL});
    res.json({avatarURL})

}
const changePassword = async (req, res) => {
    try {
      const { userId, currentPassword, newPassword } = req.body;
  
      // Перевірка наявності користувача
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: "Користувача не знайдено" });
      }
  
      // Перевірка поточного пароля
      const isMatch = await bcrypt.compare(currentPassword, user.password);
      if (!isMatch) {
        return res.status(401).json({ message: "Неправильний поточний пароль" });
      }
  
      // Оновлення пароля
      user.password = await bcrypt.hash(newPassword, 10);
  
      // Переконайтеся, що всі обов'язкові поля збережені
      if (!user.avatarURL) {
        user.avatarURL = "default-avatar-url"; // Додайте значення за замовчуванням, якщо його немає
      }
  
      await user.save();
  
      res.status(200).json({ message: "Пароль успішно змінено" });
    } catch (error) {
      console.error("Помилка при зміні пароля:", error);
      res.status(500).json({ message: "Щось пішло не так, спробуйте пізніше" });
    }
  };
  
// Контролер для видалення акаунта
const deleteAccount = async (req, res) => {
  try {
    const { userId } = req.body;

    // Перевірка наявності userId
    if (!userId) {
      return res.status(400).json({ message: "ID користувача обов'язковий" });
    }

    // Видаляємо користувача з бази даних
    const user = await User.findByIdAndDelete(userId);

    if (!user) {
      return res.status(404).json({ message: "Користувача не знайдено" });
    }

    res.status(200).json({ message: "Акаунт успішно видалено" });
  } catch (error) {
    console.error("Помилка при видаленні акаунта:", error);
    res.status(500).json({ message: "Щось пішло не так, спробуйте пізніше" });
  }
};




module.exports = {
    register,
    login,
    updateAvatar,
    changePassword,
    deleteAccount,
   
}