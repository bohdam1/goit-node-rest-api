
const { listContacts,getContactById,removeContact,addContact,} = require('../services/contactsServices');
const Contact = require("../schemas/contacts")


const getAllContacts = async (req, res, next) => {
  const contacts = await Contact.find({})
  if (contacts) {
    res.status(200).json( contacts )

  } else {
    res.status(404).json({ status: "Not Found" })

  }
};


const getOneContact = async (req, res) => {
    
  const id = req.params.id;
  const contact =  await Contact.findOne({ _id: id });
  if (contact) {
    res.json(contact);
  } else {
    res.status(404).json({ message: 'Контакт не знайдений' });
  }
    
};

const deleteContact = async (req, res) => {
  const id = req.params.id;
  const contactdelete = await Contact.findByIdAndDelete({ _id: id }); 

    if (contactdelete) {
      res.json({ message: 'Контакт успішно видалено', contactdelete });
    } else {
      res.status(404).json({ message: 'Контакт не знайдений' });
    }
  
};


const createContact = async (req, res) => {
    const { name, email, phone,favorite } = req.body;  
    const NewContact = await Contact.create({ name, email, phone,favorite });
    
    if (NewContact) {
      res.json({ message: 'Контакт успішно ствоерно', NewContact });
    } else {
      res.status(404).json({ message: 'Помилка при створенні контакту' });
    }
    
  };
  const updateContact = async (req, res) => {
    const { id } = req.params;
  
    try {
    
      const updatedContact = await Contact.findByIdAndUpdate(id, req.body, { new: true });
      if (!updatedContact) {
        return res.status(404).json({ message: "Contact not found" });
      }
      res.status(200).json(updatedContact);
    } catch (err) {
     
      res.status(500).json({ message: "An error occurred while updating the contact" });
    }
  };
  
  
  const updateFavorites = async (req, res) => {
    const { id } = req.params;
  
    try {
    
      const updatedContact = await Contact.findByIdAndUpdate(id, req.body, { new: true });
      if (!updatedContact) {
        return res.status(404).json({ message: "Contact not found" });
      }
      res.status(200).json(updatedContact);
    } catch (err) {
     
      res.status(500).json({ message: "An error occurred while updating the contact" });
    }
  }

module.exports = {
    getAllContacts,
    getOneContact,
    deleteContact,
    createContact,
    updateContact,
    updateFavorites
};