const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const ProfileSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Porfavor ingrese un nombre"],
    maxlength: 50,
    minlength: 3,
  },
  lastname: {
    type: String,
    required: [true, "Porfavor ingrese un apellido"],
    maxlength: 50,
    minlength: 3,
  },
  age: {
    type: Number,
    maxlength: 3,
  },
  description: {
    type: String,
    maxlength: [1000, "La descripcion tiene un maximo de 1000 caracteres"],
  },
  type: {
    type: String,
    enum: {
      values: ["personal", "residente"],
      message: "{VALOR} no es soportado",
    },
  },
  state: {
    type: Boolean,
    default: false,
  },
  image: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Profile", ProfileSchema);
