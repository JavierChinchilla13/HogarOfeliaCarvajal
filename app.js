require("dotenv").config();
require("express-async-errors");
// express

const express = require("express");
const app = express();

// rest of the packages
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
const rateLimiter = require("express-rate-limit");
const helmet = require("helmet");
const xss = require("xss-clean");
const cors = require("cors");
const mongoSanitize = require("express-mongo-sanitize");

// Configuración de Cloudinary
const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

// database
const connectDB = require("./db/connect");

//  routers
const authRouter = require("./routes/authRoutes");
const userRouter = require("./routes/userRoutes");
const profileRouter = require("./routes/profileRoutes");
const contactRouter = require("./routes/contactRoutes");
const postRouter = require("./routes/postRoutes");

// middleware
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

// Configuración de seguridad
app.set("trust proxy", 1); // Para proxies como Heroku
app.use(express.json()); // Parsear JSON
app.use(cookieParser(process.env.JWT_SECRET)); // Cookies firmadas
app.use(fileUpload({ useTempFiles: true })); // Subida de archivos
app.use(morgan("tiny")); // Logger de solicitudes HTTP

//Configuracion helmet
app.use(helmet());

app.use(xss()); // Protección contra XSS
app.use(cors());
app.use(mongoSanitize());

app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET));

// Rutas de API
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/profile", profileRouter);
app.use("/api/v1/contacts", contactRouter);
app.use("/api/v1/posts", postRouter);

// Ruta para SPA (Single Page Application)
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "client/dist", "index.html"));
});

// Middleware de errores
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

// Inicialización del servidor
const port = process.env.PORT || 5000;
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
