const express = require("express");
const router = express.Router();
const { authenticateUser } = require("../middleware/authentication");

const {
  createProfile,
  deleteProfile,
  getAllProfiles,
  updateProfile,
  getProfile,
} = require("../controllers/profileController");

const { uploadProfileImage } = require("../controllers/uploadsController");

router.route("/").post(authenticateUser, createProfile).get(getAllProfiles);

router.route("/uploads").post(authenticateUser, uploadProfileImage);

router
  .route("/:id")
  .get(getProfile)
  .delete(authenticateUser, deleteProfile)
  .patch(authenticateUser, updateProfile);

module.exports = router;
