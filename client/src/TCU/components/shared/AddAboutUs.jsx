import PropTypes from "prop-types";
import { useState } from "react";
import { useForm } from "../../../hooks/useForm";
import Input from "./Input";

import { uploadImage, createPost } from "../../utils/AboutUsService";

export const AddAboutUs = ({ onClose, isOpen, onSave }) => {
  const { formState, onInputChange } = useForm({
    name: "",
    description: "",
  });

  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);

  const handleSubmit = async () => {
    if (!formState.name || !formState.description) {
      alert("Por favor, complete todos los campos.");
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

      const { name, description } = formState;

      const newInfo = {
        name,
        description,
        image: imageUrl,
      };

      await createPost(newInfo); // Llama al servicio para guardar en el backend

      // Actualiza la lista en el componente padre
      onSave(newInfo);
      onClose();
      window.location.reload();
    } catch (error) {
      console.error("Error al guardar la información:", error);
      alert("No se pudo guardar la información. Por favor, intenta más tarde.");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4">Añadir Información</h2>
        <form>
          <div className="mb-4">
            <label className="block text-gray-700">Nombre</label>
            <Input
              text={formState.name}
              handleText={onInputChange}
              placeHolder="Nombre"
              nameRef="name"
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Descripción</label>
            <Input
              text={formState.description}
              handleText={onInputChange}
              placeHolder="Descripción"
              nameRef="description"
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Imagen</label>
            <input
              type="file"
              onChange={(e) => setImage(e.target.files[0])}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 text-white font-bold py-2 px-4 rounded"
            >
              Cancelar
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              disabled={loading}
              className={`py-2 px-4 rounded font-bold text-white ${
                loading ? "bg-gray-400" : "bg-green-500 hover:bg-green-600"
              }`}
            >
              {loading ? "Cargando..." : "Guardar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

AddAboutUs.propTypes = {
  onClose: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
};

export default AddAboutUs;
