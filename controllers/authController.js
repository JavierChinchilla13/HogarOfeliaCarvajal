const User = require("../models/User");
const Token = require("../models/Token");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");
const {
  attachCookiesToResponse,
  createTokenUser,
  sendVerificationEmail,
  sendResetPasswordEmail,
  createHash,
} = require("../utils");
const crypto = require("crypto");
const { exit } = require("process");

const register = async (req, res) => {
  const { email, name, password } = req.body;

  const emailAlreadyExists = await User.findOne({ email });
  if (emailAlreadyExists) {
    throw new CustomError.BadRequestError("Email already exists");
  }
  const verificationToken = crypto.randomBytes(40).toString("hex");

  const user = await User.create({
    name,
    email,
    password,
    verificationToken,
  });
  const origin = "https://hogarofeliacarvajal.onrender.com";
  // const origin = "http://localhost:5000";
  const origin2 = req.get("origin");
  const protocol = req.protocol;
  const host = req.get("host");
  const forwardedHost = req.get("x-forwarded-host");
  const forwardedProtocol = req.get("x-forwarded-proto");

  // console.log(req);

  await sendVerificationEmail({
    name: user.name,
    email: user.email,
    verificationToken: user.verificationToken,
    origin,
  });

  // send verification token back only while testing in postman!!!
  res.status(StatusCodes.CREATED).json({
    msg: "¡Éxito! Por favor, revisa tu correo electrónico para verificar tu cuenta.",
  });
};

const verifyEmail = async (req, res) => {
  const { verificationToken, email } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    throw new CustomError.UnauthenticatedError("Verification Failed");
  }

  if (user.verificationToken !== verificationToken) {
    throw new CustomError.UnauthenticatedError("Verification Failed");
  }

  user.isVerified = true;
  user.verified = Date.now();
  user.verificationToken = "";

  await user.save();

  res.status(StatusCodes.OK).json({ msg: "Email verified" });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new CustomError.BadRequestError("Please provide email and password");
  }
  const user = await User.findOne({ email });

  if (!user) {
    throw new CustomError.UnauthenticatedError("Invalid Credentials");
  }
  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new CustomError.UnauthenticatedError("Invalid Credentials");
  }

  if (!user.isVerified) {
    throw new CustomError.UnauthenticatedError("Please verify your email");
  }

  const tokenUser = createTokenUser(user);

  // create refresh token
  let refreshToken = "";

  // check for existing token
  const existingToken = await Token.findOne({ user: user._id });

  if (existingToken) {
    const { isValid } = existingToken;
    if (!isValid) {
      throw new CustomError.UnauthenticatedError("Invalid Credentials");
    }
    refreshToken = existingToken.refreshToken;
    attachCookiesToResponse({ res, user: tokenUser, refreshToken });
    res.status(StatusCodes.OK).json({ user: tokenUser });
    return;
  }

  refreshToken = crypto.randomBytes(40).toString("hex");
  const userAgent = req.headers["user-agent"];
  const ip = req.ip;
  const userToken = { refreshToken, ip, userAgent, user: user._id };

  await Token.create(userToken);

  attachCookiesToResponse({ res, user: tokenUser, refreshToken });

  res.status(StatusCodes.OK).json({ user: tokenUser });
};

const logout = async (req, res) => {
  await Token.findOneAndDelete({ user: req.user.userId });

  res.cookie("accessToken", "logout", {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  res.cookie("refreshToken", "logout", {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  res.status(StatusCodes.OK).json({ msg: "user logged out!" });
};

const forgotPassword = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    throw new CustomError.BadRequestError("Please provide valid email");
  }

  const user = await User.findOne({ email });

  if (user) {
    const passwordToken = crypto.randomBytes(70).toString("hex");
    //send email
    const origin = "https://hogarofeliacarvajal.onrender.com";
    // const origin = "http://localhost:5000";

    await sendResetPasswordEmail({
      name: user.name,
      email: user.email,
      token: passwordToken,
      origin,
    });

    const tenMinutes = 1000 * 60 * 10;
    const passwordTokenExpirationDate = new Date(Date.now() + tenMinutes);

    user.passwordToken = createHash(passwordToken);
    user.passwordTokenExpirationDate = passwordTokenExpirationDate;
    await user.save();
  }

  res.status(StatusCodes.OK).json({
    msg: "Por favor, revisa tu correo electrónico para encontrar el enlace de restablecimiento de contraseña.",
  });
};

const resetPassword = async (req, res) => {
  const { token, email, password } = req.body;

  // Verificar que se proporcionen todos los valores requeridos
  if (!token || !email || !password) {
    throw new CustomError.BadRequestError(
      "Por favor, proporciona todos los valores."
    );
  }

  // Buscar al usuario por correo electrónico
  const user = await User.findOne({ email });

  if (user) {
    const currentDate = new Date();

    // Verificar que el token sea válido y no haya expirado
    if (
      user.passwordToken === createHash(token) &&
      user.passwordTokenExpirationDate > currentDate
    ) {
      // Actualizar la contraseña y reiniciar el token y su fecha de expiración
      user.password = password;
      user.passwordToken = null;
      user.passwordTokenExpirationDate = null;
      await user.save();
    }
  }

  res.send("Contraseña restablecida correctamente.");
};

module.exports = {
  register,
  login,
  logout,
  verifyEmail,
  forgotPassword,
  resetPassword,
};
