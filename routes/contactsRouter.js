const express = require("express");
const {
  getAllTask,
  getOneTask,
  deleteTask,
  createTask,
  updateTask,
  updateFavorites
} = require("../controllers/contactsControllers");
const athenticate = require("../middlewares/athenticate");


const contactsRouter = express.Router();
contactsRouter.get("/",athenticate, getAllTask);
contactsRouter.get("/:id",athenticate,getOneTask );
contactsRouter.delete("/:id",athenticate, deleteTask);
contactsRouter.post("/",athenticate, createTask);
contactsRouter.put("/:id",athenticate, updateTask);
contactsRouter.patch("/:id/done",athenticate, updateFavorites);

module.exports = contactsRouter;
