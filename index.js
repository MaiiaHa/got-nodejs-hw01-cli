// const yargs = require("yargs");
// const { hideBin } = require("yargs/helpers");
const { program } = require("commander");

const contacts = require("./contacts");

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case "list":
      const allContacts = await contacts.listContacts();
      return console.table(allContacts);

    case "get":
      const oneContact = await contacts.getContactById(id);
      return console.table(oneContact);

    case "add":
      const newContact = await contacts.addContact({ name, email, phone });
      return console.table(newContact);

    case "remove":
      const removeContact = await contacts.removeContact(id);
      return console.table(removeContact);

    case "updateById":
      const updateContact = await contacts.updateContact(id, {
        name,
        email,
        phone,
      });
      return console.table(updateContact);

    default:
      return console.log("Unknown action");
  }
};

program
  .option("-a, --action, <type>", "choose action")
  .option("-i, --id, <type>", "user id")
  .option("-n, --name, <type>", "user name")
  .option("-e, --email, <type>", "user email")
  .option("-p, --phone, <type>", "user phone");

program.parse();

const option = program.opts();
invokeAction(option);

// ===== yargs
// const arr = hideBin(process.argv);
// const { argv } = yargs(arr);
// invokeAction(argv);
// =====
// invokeAction({ action: "list" });
// invokeAction({ action: "get", id: "qdggE76Jtbfd9eWJHrssH" });
// invokeAction({
//   action: "add",
//   name: "Lisa",
//   email: "lisalisa@mail.com",
//   phone: "(0800)111-11-11",
// });
// invokeAction({
//   action: "updateById",
//   id: "qdggE76Jtbfd9eWJHrssH",
//   name: "Lisa Cudrow",
//   email: "lisalisa@mail.com",
//   phone: "(0800)111-11-11",
// });
// invokeAction({ action: "remove", id: "v1ICby9aE9LnwqpD77YKL" });
