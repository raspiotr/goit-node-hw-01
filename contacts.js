const fs = require("fs").promises;
const path = require("path");
const { nanoid } = require("nanoid");
require("colors");

const contactsPath = path.join(__dirname, "db", "contacts.json");

async function listContacts() {
  const contacts = await fs.readFile(contactsPath);
  const parsedContacts = JSON.parse(contacts);
  console.log("Contacts list:".yellow);
  console.table(parsedContacts);
}

async function getContactById(contactId) {
  const contacts = await fs.readFile(contactsPath);
  const parsedContacts = JSON.parse(contacts);
  const selectedContact =
    parsedContacts.find((contact) => contact.id === contactId) || null;
  console.log(`Selected contact (with ID: ${contactId}):`.blue);
  console.table(selectedContact);
}

async function removeContact(contactId) {
  const contacts = await fs.readFile(contactsPath);
  const parsedContacts = JSON.parse(contacts);
  const updatedContacts = parsedContacts.filter(
    (contact) => contact.id !== contactId
  );
  console.log(
    `Updated contact list (removed contact with ID: ${contactId}):`.red
  );
  console.table(updatedContacts);
  await fs.writeFile(contactsPath, JSON.stringify(updatedContacts, null, 1));
}

async function addContact(name, email, phone) {
  const contacts = await fs.readFile(contactsPath);
  const parsedContacts = JSON.parse(contacts);
  const newContact = { id: nanoid(), name, email, phone };
  console.log(`Updated contact list (with new contact: ${name}):`.green);
  const updatedContacts = [...parsedContacts, newContact];
  console.table(updatedContacts);
  await fs.writeFile(contactsPath, JSON.stringify(updatedContacts, null, 1));
}

module.exports = { listContacts, getContactById, removeContact, addContact };
