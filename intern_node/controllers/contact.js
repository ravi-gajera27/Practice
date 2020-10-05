const Contact = require("../models/contact");

exports.getContacts = (req, res) => {
  Contact.find()
    .then((contacts) => {
      res.json({ statusCode: 200, contacts: contacts });
    })
    .catch((err) => {
      res.json({ statusCode: 500, message: "internal server error" });
    });
};

exports.addContact = (req, res) => {
  const user = req.body;
  const contact = new Contact({
    uname: user.uname,
    mobileNo: user.mobileNo,
  });
  console.log(contact);
  contact
    .save()
    .then((result) => {
      res.json({ statusCode: 200, message: "Contact successfully saved" });
    })
    .catch((err) => {
      res.json({
        statusCode: 500,
        message: "internal server error",
        contact: result,
      });
    });
};

exports.updateContact = (req, res, next) => {
  const contactId = req.params.id;
  console.log(contactId);
  const user = req.body;
  Contact.findByIdAndUpdate(contactId, user, { new: true })
    .then((result) => {
      res.json({
        statusCode: 200,
        message: "Contact updated successfully",
        contact: result,
      });
    })
    .catch((err) => {
      res.json({ statusCode: 500, message: "internal server error" });
    });
};

exports.deleteContact = (req, res) => {
  const contactId = req.params.id;
  Contact.findByIdAndRemove(contactId)
    .then((result) => {
      res.json({ statusCode: 200, message: "Contact deleted successfully" });
    })
    .catch((err) => {
      res.json({ statusCode: 500, message: "internal server error" });
    });
};
