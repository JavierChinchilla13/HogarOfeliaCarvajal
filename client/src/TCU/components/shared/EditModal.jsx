import PropTypes from "prop-types";
import { useState } from "react";
import { useForm } from "../../../hooks/useForm";

export const EditModal = ({ profile, onClose, onSave }) => {
  // const [editedProfile, setEditedProfile] = useState({ ...profile });

  const { formState, onInputChange } = useForm({
    name: profile ? profile.name : "",
    description: profile ? profile.description : "",
    price: profile ? profile.price : "",
  });

  const [imageFile, setImageFile] = useState(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [state, setState] = useState(true);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    setImageLoaded(true);
  };

  const handleSubmit = () => {
    const updatedProfile = {
      _id: profile._id,
      name: formState.name,
      description: formState.description,
      price: formState.price,
      image: imageFile === null ? profile.image : imageFile,
      imageLoaded,
      state,
    };

    onSave(updatedProfile);
  };

  if (!profile) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4">Editar</h2>
        <form>
          <div className="mb-4">
            <label className="block text-gray-700">Nombre</label>
            <input
              type="text"
              name="name"
              value={formState.name}
              onChange={onInputChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Descripción</label>
            <textarea
              name="description"
              value={formState.description}
              onChange={onInputChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Imagen (Archivo)</label>
            <input
              type="file"
              onChange={handleImageChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Precio</label>
            <input
              type="text"
              name="price"
              value={formState.price}
              onChange={onInputChange}
              className="w-full p-2 border rounded"
              min="0"
              step="any"
            />
          </div>

          <select
            value={state}
            onChange={(e) => setState(e.target.value === "true")}
            className="py-2 px-3 rounded-xl border-2 border-blue-300 mb-4"
          >
            <option value="true">Activo</option>
            <option value="false">Inactivo</option>
          </select>

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
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
            >
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

EditModal.propTypes = {
  profile: PropTypes.object,
  onClose: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
};
