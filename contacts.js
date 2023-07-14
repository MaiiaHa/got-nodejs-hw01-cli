const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");
const contactsPath = path.join(__dirname, "/db/contacts.json");

async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    console.log(error.message);
  }
}

async function getContactById(id) {
  // for yargs use
  // const contactId = String(id);
  try {
    const contacts = await listContacts();
    const result = contacts.find((item) => item.id === id);
    return result || null;
  } catch (error) {
    console.log(error.message);
  }
}

async function addContact({ name, email, phone }) {
  try {
    const contacts = await listContacts();

    const newContact = { id: nanoid(), name, email, phone };
    contacts.push(newContact);

    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return newContact;
  } catch (error) {
    console.log(error.message);
  }
}

async function removeContact(id) {
  try {
    const contacts = await listContacts();

    const index = contacts.findIndex((item) => item.id === id);
    if (index === -1) {
      return null;
    }
    const [result] = contacts.splice(index, 1);

    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return result;
  } catch (error) {
    console.log(error.message);
  }
}
async function updateContact(id, data) {
  try {
    const contacts = await listContacts();

    const index = contacts.findIndex((item) => item.id === id);
    if (index === -1) {
      return null;
    }

    contacts[index] = { contactId, ...data };

    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return contacts[index];
  } catch (error) {
    console.log(error.message);
  }
}

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
};
