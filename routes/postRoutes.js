const express = require("express");
const router = express.Router();
const { authenticateUser } = require("../middleware/authentication");

const {
  createPost,
  deletePost,
  getAllPosts,
  updatePost,
  getPost,
} = require("../controllers/postsController");

const { uploadImage } = require("../controllers/uploadsController");

router.route("/").post(authenticateUser, createPost).get(getAllPosts);

router.route("/uploads").post(authenticateUser, uploadImage);

router
  .route("/:id")
  .get(getPost)
  .delete(authenticateUser, deletePost)
  .patch(authenticateUser, updatePost);

module.exports = router;
