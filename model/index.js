const fs = require("fs/promises");
const path = require("path");
const pathContacts = path.join(__dirname, "contacts.json");

const listContacts = async () => {
  try {
    const allContacts = await fs.readFile(pathContacts);
    const parsedContacts = await JSON.parse(allContacts);
    return parsedContacts;
  } catch (e) {
    return e;
  }
};

const getContactById = async (contactId) => {
  try {
    const allContacts = await fs.readFile(pathContacts);
    const parsedContacts = await JSON.parse(allContacts);
    const findContact = await parsedContacts.find((el) => el.id === contactId);
    if (!findContact) {
      return null;
    } else {
      return findContact;
    }
  } catch (e) {
    return e;
  }
};
const addContact = async (newContact) => {
  try {
    const allContacts = await fs.readFile(pathContacts);
    const parsedContacts = await JSON.parse(allContacts);
    const addNewContact = [...parsedContacts, newContact];
    const contactsString = await JSON.stringify(addNewContact, null, 2);
    await fs.writeFile(pathContacts, contactsString);
  } catch (e) {
    return e;
  }
};

const removeContact = async (contactId) => {
  try {
    const allContacts = await fs.readFile(pathContacts);
    const parsedContacts = await JSON.parse(allContacts);
    const deletedContact = parsedContacts.filter(
      (elem) => elem.id !== contactId
    );
    if (deletedContact.length === parsedContacts.length) {
      return false;
    }
    const contactsString = await JSON.stringify(deletedContact, null, 2);
    await fs.writeFile(pathContacts, contactsString);
    return true;
  } catch (e) {
    return e;
  }
};

const updateContact = async (contactId, body) => {
  try {
    const { name, email, phone } = body;
    const allContacts = await fs.readFile(pathContacts);
    const parsedContacts = await JSON.parse(allContacts);
    let findContact;
    const updatedContacts = await parsedContacts.map((elem) => {
      if (elem.id === contactId) {
        findContact = elem;
        if (name) {
          findContact.name = name;
        }
        if (email) {
          findContact.email = email;
        }
        if (phone) {
          findContact.phone = phone;
        }
        return findContact;
      }
      return elem;
    });
    const contactsString = await JSON.stringify(updatedContacts, null, 2);
    await fs.writeFile(pathContacts, contactsString);
    return findContact;
  } catch (e) {
    return e;
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
