

const Task = require("../schemas/taskSchems")


const getAllTask = async (req, res, next) => {
  const {_id:owner} = req.user
  const task = await Task.find({owner})
  if (task) {
    res.status(200).json( task )

  } else {
    res.status(404).json({ status: "Not Found" })

  }
};


const getOneTask = async (req, res) => {
    
  const id = req.params.id;
  const task =  await Task.findOne({ _id: id });
  if (task) {
    res.json(task);
  } else {
    res.status(404).json({ message: 'Контакт не знайдений' });
  }
    
};

const deleteTask = async (req, res) => {
  const id = req.params.id;
  const tasktdelete = await Task.findByIdAndDelete({ _id: id }); 

    if (tasktdelete) {
      res.json({ message: 'Контакт успішно видалено', tasktdelete });
    } else {
      res.status(404).json({ message: 'Контакт не знайдений' });
    }
  
};


const createTask = async (req, res) => {
    const {_id:owner} = req.user
    const { taskName, description, endTime,timeToSpend } = req.body;  
    const NewTask = await Task.create({ taskName, description, endTime,timeToSpend,owner });
    
    if (NewTask) {
      res.json(NewTask);
    } else {
      res.status(404).json({ message: 'Помилка при створенні контакту' });
    }
    
  };
  const updateTask = async (req, res) => {
    const { id } = req.params;
  
    try {
    
      const updatedTask = await Task.findByIdAndUpdate(id, req.body, { new: true });
      if (!updatedTask) {
        return res.status(404).json({ message: "Contact not found" });
      }
      res.status(200).json(updatedTask);
    } catch (err) {
     
      res.status(500).json({ message: "An error occurred while updating the contact" });
    }
  };
  
  
  const updateFavorites = async (req, res) => {
    const { id } = req.params;
  
    try {
      // Оновлюємо поле `done` на true
      const updatedTask = await Task.findByIdAndUpdate(
        id,
        { done: true }, // Оновлення тільки поля `done`
        { new: true } // Повертаємо оновлений документ
      );
  
      // Якщо завдання не знайдено
      if (!updatedTask) {
        return res.status(404).json({ message: "Task not found" });
      }
  
      // Повертаємо оновлене завдання
      res.status(200).json(updatedTask);
    } catch (err) {
      // Обробка помилки
      res.status(500).json({ message: "An error occurred while updating the task" });
    }
  };
  

module.exports = {
    getAllTask,
    getOneTask,
    deleteTask,
    createTask,
    updateTask,
    updateFavorites
};