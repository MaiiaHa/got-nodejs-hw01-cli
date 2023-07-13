const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");
const contactsPath = path.join(__dirname, "/db/contacts.json");

async function listContacts() {
  const data = await fs.readFile(contactsPath, "utf-8");
  return JSON.parse(data);
}

async function getContactById(id) {
  // for yargs use
  // const contactId = String(id);

  const contacts = await listContacts();
  const result = contacts.find((item) => item.id === id);
  return result || null;
}

async function addContact({ name, email, phone }) {
  const contacts = await listContacts();

  const newContact = { id: nanoid(), name, email, phone };
  contacts.push(newContact);

  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContact;
}

async function removeContact(id) {
  const contacts = await listContacts();

  const index = contacts.findIndex((item) => item.id === id);
  if (index === -1) {
    return null;
  }
  const [result] = contacts.splice(index, 1);

  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return result;
}
async function updateContact(id, data) {
  const contacts = await listContacts();

  const index = contacts.findIndex((item) => item.id === id);
  if (index === -1) {
    return null;
  }

  contacts[index] = { contactId, ...data };

  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return contacts[index];
}

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
};
