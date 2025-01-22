const Contact = require("../models/Contact");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../errors");

const createContact = async (req, res) => {
  console.log(req.body);
  const contact = await Contact.create(req.body);
  res.status(StatusCodes.CREATED).json({
    contact: {
      name: contact.name,
      info: contact.info,
    },
  });
};

const deleteContact = async (req, res) => {
  const {
    params: { id: contactId },
  } = req;

  const contact = await Contact.findByIdAndRemove({
    _id: contactId,
  });
  if (!contact) {
    throw new NotFoundError(`No Contact with id ${contactId}`);
  }
  res.status(StatusCodes.OK).send();
};

const getAllContacts = async (req, res) => {
  const Contacts = await Contact.find({});
  res.status(StatusCodes.OK).json({ Contacts });
};

const updateContact = async (req, res) => {
  const {
    body: { name, info },
    params: { id: contactId },
  } = req;

  if (name === "" || info === "") {
    throw new BadRequestError("Name or Info fields cannot be empty");
  }
  const contact = await Contact.findByIdAndUpdate(
    { _id: contactId },
    req.body,
    { new: true, runValidators: true }
  );
  if (!contact) {
    throw new NotFoundError(`No Contact with id ${contactId}`);
  }
  res.status(StatusCodes.CREATED).json({
    contact: {
      name: contact.name,
      info: contact.info,
    },
  });
};

const getContact = async (req, res) => {
  const {
    params: { id: contactId },
  } = req;

  const contact = await Contact.findOne({
    _id: contactId,
  });
  if (!contact) {
    throw new NotFoundError(`No Contact with id ${contactId}`);
  }
  res.status(StatusCodes.OK).json({ contact });
};

module.exports = {
  createContact,
  deleteContact,
  getAllContacts,
  updateContact,
  getContact,
};
