const fs = require("fs/promises");
const path = require("path");
const Contact = require("../schemas/contacts");

async function listContacts() {
  try {
    const data = await Contact.find(); 
    
    return data;
  } catch (error) {
    console.error("Error reading contacts file:", error.message);
    return [];
  }
}


async function getContactById(contactId) {
  const contacts = await listContacts();
  const result = contacts.find((contact) => contact.id === contactId);
  return result || null;
}

async function removeContact(contactId) {
  
}

async function addContact(name, email, phone) {
  const contacts = await listContacts();
  
  const newContact = {
    id: Date.now().toString(), // Можете замінити на `uuid.v4()` для унікального ID
    name,
    email,
    phone,
  };

  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContact;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
