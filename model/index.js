const fs = require("fs/promises");
const path = require("path");
const dbFolder = path.join(process.cwd(), "db", "contacts.json");

const listContacts = async () => {
  try {
    const data = await fs.readFile(dbFolder);
    const parsed = await JSON.parse(data);
    return parsed;
  } catch (e) {
    return e;
  }
};

const getContactById = async (id) => {
  try {
    const data = await fs.readFile(dbFolder);
    const parsed = await JSON.parse(data);
    const contact = await parsed.find((el) => el.id === id);
    if (!contact) return null;
    return contact;
  } catch (e) {
    return e;
  }
};
const addContact = async (contact) => {
  try {
    const data = await fs.readFile(dbFolder);
    const parsed = await JSON.parse(data);
    const contacts = [...parsed, contact];
    const json = await JSON.stringify(contacts, null, 2);
    await fs.writeFile(dbFolder, json);
  } catch (e) {
    return e;
  }
};

const removeContact = async (id) => {
  try {
    const data = await fs.readFile(dbFolder);
    const parsed = await JSON.parse(data);
    const contacts = await parsed.filter((elem) => elem.id !== id);
    if (contacts.length === parsed.length) return false;

    const json = await JSON.stringify(contacts, null, 2);
    await fs.writeFile(dbFolder, json);
    return true;
  } catch (e) {
    return e;
  }
};
const updateContact = async (id, body) => {
  try {
    const { name, email, phone } = body;
    const data = await fs.readFile(dbFolder);
    const parsed = await JSON.parse(data);
    let contact;
    const contacts = await parsed.map((el) => {
      if (el.id === id) {
        contact = el;
        if (name) contact.name = name;
        if (email) contact.email = email;
        if (phone) contact.phone = phone;
        return contact;
      }
      return el;
    });
    const json = await JSON.stringify(contacts, null, 2);
    await fs.writeFile(dbFolder, json);
    return contact;
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
