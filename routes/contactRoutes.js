const express = require("express");
const router = express.Router();
const { authenticateUser } = require("../middleware/authentication");

const {
  createContact,
  deleteContact,
  getAllContacts,
  updateContact,
  getContact,
} = require("../controllers/contactsController");

router.route("/").post(authenticateUser, createContact).get(getAllContacts);

router
  .route("/:id")
  .get(getContact)
  .delete(authenticateUser, deleteContact)
  .patch(authenticateUser, updateContact);

module.exports = router;
