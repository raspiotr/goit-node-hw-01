const fs = require("fs").promises;
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "db", "contacts.json");

async function listContacts() {
  const contacts = await fs.readFile(contactsPath);
  const parsedContacts = JSON.parse(contacts);
  console.log("Contacts list");
  console.table(parsedContacts);
  return parsedContacts;
}

async function getContactById(contactId) {
  const contacts = await fs.readFile(contactsPath);
  const parsedContacts = JSON.parse(contacts);
  const selectedContact =
    parsedContacts.find((contact) => contact.id === contactId) || null;
  console.log(`Selected contact (with ID: ${contactId})`);
  console.table(selectedContact);
  return selectedContact;
}

async function removeContact(contactId) {
  const contacts = await fs.readFile(contactsPath);
  const parsedContacts = JSON.parse(contacts);
  const updatedContacts = parsedContacts.filter(
    (contact) => contact.id !== contactId
  );
  console.log(`Updated contact list (removed contact with ID: ${contactId})`);
  console.table(updatedContacts);
  await fs.writeFile(contactsPath, JSON.stringify(updatedContacts, null, 1));
  return updatedContacts;
}

async function addContact(name, email, phone) {
  const contacts = await fs.readFile(contactsPath);
  const parsedContacts = JSON.parse(contacts);
  const newContact = { id: nanoid(), name, email, phone };
  console.log(`Updated contact list (with new contact: ${name})`);
  const updatedContacts = [...parsedContacts, newContact];
  console.table(updatedContacts);
  await fs.writeFile(contactsPath, JSON.stringify(updatedContacts, null, 1));
  return newContact;
}

module.exports = { listContacts, getContactById, removeContact, addContact };
