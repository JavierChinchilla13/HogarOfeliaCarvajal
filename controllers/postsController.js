const Post = require("../models/Post");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../errors");

const createPost = async (req, res) => {
  console.log(req.body);
  const post = await Post.create(req.body);
  res.status(StatusCodes.CREATED).json({
    post: {
      name: post.name,
      subtitle: post.subtitle,
      description: post.description,
      image: post.image,
    },
  });
};

const deletePost = async (req, res) => {
  const {
    params: { id: postId },
  } = req;

  const post = await Post.findByIdAndRemove({
    _id: postId,
  });
  if (!post) {
    throw new NotFoundError(`No Post with id ${postId}`);
  }
  res.status(StatusCodes.OK).send();
};

const getAllPosts = async (req, res) => {
  const Posts = await Post.find({});
  res.status(StatusCodes.OK).json({ Posts });
};

const updatePost = async (req, res) => {
  const {
    body: { name, subtitle, description },
    params: { id: PostId },
  } = req;

  if (name === "" || subtitle === "" || description === "") {
    throw new BadRequestError("Name or Description fields cannot be empty");
  }
  const post = await Post.findByIdAndUpdate({ _id: PostId }, req.body, {
    new: true,
    runValidators: true,
  });
  if (!Post) {
    throw new NotFoundError(`No Post with id ${PostId}`);
  }
  res.status(StatusCodes.CREATED).json({
    post: {
      name: post.name,
      subtitle: post.subtitle,
      description: post.description,
      image: post.image,
    },
  });
};

const getPost = async (req, res) => {
  const {
    params: { id: postId },
  } = req;

  const post = await Post.findOne({
    _id: postId,
  });
  if (!post) {
    throw new NotFoundError(`No Post with id ${postId}`);
  }
  res.status(StatusCodes.OK).json({ post });
};

module.exports = {
  createPost,
  deletePost,
  getAllPosts,
  updatePost,
  getPost,
};
