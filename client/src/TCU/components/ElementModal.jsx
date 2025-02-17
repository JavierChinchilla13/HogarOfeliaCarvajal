import { useState } from "react";
import PropTypes from "prop-types";
import Input from "./shared/Input";
import Button from "./shared/Button";
import { createPost, uploadImage } from "../utils/profileService";
import { useForm } from "../../hooks/useForm";

const ElementModal = ({ isOpen, onClose, title, style }) => {
  const { formState, onInputChange } = useForm({
    name: "",
    lastname: "",
    description: "",
    age: "",
  });

  const [state, setState] = useState(true);
  const [profileType, setProfileType] = useState("personal");
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);

  const handleSubmit = async () => {
    // Validación de los campos
    if (!formState.name || !formState.description) {
      alert("Todos los campos son requeridos.");
      return;
    }

    const age = formState.age ? parseInt(formState.age, 10) : null;
    if (formState.age && isNaN(age)) {
      alert("La edad debe ser un número válido.");
      return;
    }

    setLoading(true);

    try {
      let imageUrl = "";
      if (image) {
        const formData = new FormData();
        formData.append("image", image);
        const { data } = await uploadImage(formData);
        imageUrl = data.image.src;
      }

      const { name, lastname, description } = formState;
      const newProfile = {
        name,
        lastname,
        age,
        description,
        type: profileType,
        state,
        image: imageUrl,
      };

      console.log("Enviando perfil:", newProfile); // 🔹 Para depuración
      await createPost(newProfile);
      onClose();
    } catch (error) {
      console.error("Error creando perfil:", error);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-50 z-[1000] flex justify-center items-center ${style}`}
    >
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full grid">
        <h2 className="text-xl font-semibold mb-4">{title}</h2>

        <label>Nombre</label>
        <Input
          text={formState.name}
          handleText={onInputChange}
          placeHolder="Nombre"
          nameRef="name"
        />

        <label>Apellido</label>
        <Input
          text={formState.lastname}
          handleText={onInputChange}
          placeHolder="Apellido"
          nameRef="lastname"
        />

        <label>Edad</label>
        <Input
          text={formState.age}
          handleText={onInputChange}
          placeHolder="Edad"
          nameRef="age"
        />

        <label>Descripción</label>
        <Input
          text={formState.description}
          handleText={onInputChange}
          placeHolder="Descripción"
          nameRef="description"
        />

        <label>Estado</label>
        <select
          value={state.toString()}
          onChange={(e) => setState(e.target.value === "true")}
          className="py-2 px-3 rounded-xl border-2 border-blue-300 mb-4"
        >
          <option value="true">Activo</option>
          <option value="false">Inactivo</option>
        </select>

        <label>Tipo</label>
        <select
          value={profileType}
          onChange={(e) => setProfileType(e.target.value)}
          className="py-2 px-3 rounded-xl border-2 border-blue-300 mb-4"
        >
          <option value="personal">Personal</option>
        </select>

        <label>Imagen</label>
        <input
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
          className="mb-4"
        />

        <div className="flex justify-end space-x-2 mt-4">
          <Button onClickFunc={onClose} extraStyle="bg-gray-300">
            Cancelar
          </Button>
          <Button
            onClickFunc={handleSubmit}
            extraStyle="bg-emerald-400"
            disabled={loading}
          >
            {loading ? "Guardando..." : "Guardar"}
          </Button>
        </div>
      </div>
    </div>
  );
};

ElementModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  style: PropTypes.string,
};

export default ElementModal;
