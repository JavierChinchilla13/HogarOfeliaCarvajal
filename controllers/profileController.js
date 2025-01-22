const Profile = require("../models/Profile");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../errors");

const createProfile = async (req, res) => {
  const profile = await Profile.create(req.body);
  res.status(StatusCodes.CREATED).json({ profile });
};

const deleteProfile = async (req, res) => {
  const {
    params: { id: profileId },
  } = req;

  const profile = await Profile.findByIdAndRemove({
    _id: profileId,
  });
  if (!profile) {
    throw new NotFoundError(`No profile with id ${profileId}`);
  }
  res.status(StatusCodes.OK).send();
};

const getAllProfiles = async (req, res) => {
  const profiles = await Profile.find({});
  res.status(StatusCodes.OK).json({ profiles });
};

const updateProfile = async (req, res) => {
  const {
    body: { name, description, price, state },
    params: { id: profileId },
  } = req;

  console.log("backend");
  console.log(req.body);

  if (name === "" || description === "" || state === "") {
    throw new BadRequestError("Name or Description fields cannot be empty");
  }
  const profile = await Profile.findByIdAndUpdate(
    { _id: profileId },
    req.body,
    { new: true, runValidators: true }
  );
  if (!profile) {
    throw new NotFoundError(`No profile with id ${profileId}`);
  }
  res.status(StatusCodes.OK).json({ profile });
};

const getProfile = async (req, res) => {
  const {
    params: { id: profileId },
  } = req;

  const profile = await Profile.findOne({
    _id: profileId,
  });
  if (!profile) {
    throw new NotFoundError(`No profile with id ${profileId}`);
  }
  res.status(StatusCodes.OK).json({ profile });
};

module.exports = {
  createProfile,
  deleteProfile,
  getAllProfiles,
  updateProfile,
  getProfile,
};
