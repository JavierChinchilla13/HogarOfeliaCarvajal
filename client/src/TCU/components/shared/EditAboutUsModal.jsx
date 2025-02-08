import PropTypes from "prop-types";
import { useState } from "react";
import { useForm } from "../../../hooks/useForm";

export const EditAboutUsModal = ({ onClose, onSave, infoToEdit }) => {
  
  const { formState, onInputChange} = useForm({
    name: infoToEdit ? infoToEdit.name : '',
    description: infoToEdit ? infoToEdit.description : '',
    })

  const [imageFile, setImageFile] = useState(null);
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file); 
    setImageLoaded(true);
  };

  const handleSubmit = () => {
    const updatedInfo = {
      _id: infoToEdit?._id,
      name: formState.name,
      description: formState.description,
      image: imageFile === null ? infoToEdit.image : imageFile, // Mantener imagen actual si no se cambia
      imageLoaded, // Agregar el estado de imagen cargada
    };

    onSave(updatedInfo);
  };

  
  if (!infoToEdit) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4">Editar Información</h2>
        <form>
          <div className="mb-4">
            <label className="block text-gray-700">Título</label>
            <input
              type="text"
              name="name"
              value={formState.name}
              onChange={onInputChange}
              className="w-full p-2 border rounded"
              placeholder="Escribe el título"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Descripción</label>
            <textarea
              name="description"
              value={formState.description}
              onChange={onInputChange}
              className="w-full p-2 border rounded"
              placeholder="Escribe la descripción"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Imagen</label>
            <input
              type="file"
              onChange={handleImageChange}
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

EditAboutUsModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  infoToEdit: PropTypes.object,
};
