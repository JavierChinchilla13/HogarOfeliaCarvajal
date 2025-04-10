import PropTypes from "prop-types";
import { useState } from "react";
import { useForm } from "../../../hooks/useForm";

export const EditModal = ({ profile, onClose, onSave }) => {
  // Asegurar que profile siempre tiene un valor válido
  const defaultProfile = {
    name: "",
    lastname: "",
    description: "",
    type: "",
    state: true,
    image: null,
  };

  const safeProfile = profile || defaultProfile;

  // Hooks deben ir siempre al inicio
  const { formState, onInputChange } = useForm({
    name: safeProfile.name,
    lastname: safeProfile.lastname,
    description: safeProfile.description,
    type: safeProfile.type,
  });

  const [imageFile, setImageFile] = useState(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [state, setState] = useState(safeProfile.state);

  // Manejo de cambio de imagen
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    setImageLoaded(true);
  };

  // Validación y envío del formulario
  const handleSubmit = () => {
    console.log("[Debug] Valores al iniciar submit:", {
      formState,
      imageFile,
      safeProfile,
      state,
    });

    if (formState.name.trim().length < 3) {
      alert("El nombre debe tener al menos 2 caracteres.");
      return;
    }

    const updatedProfile = {
      _id: safeProfile._id,
      name: formState.name,
      lastname: formState.lastname,
      description: formState.description,
      age: formState.age || 0,
      price: formState.price || 0,
      type: formState.type, // <-- Punto crítico
      image: imageFile || safeProfile.image,
      imageLoaded,
      state,
    };

    console.log("[Debug] Perfil a guardar:", updatedProfile);
    console.log("[Debug] Tipo de imageFile:", typeof imageFile);
    console.log("[Debug] Tipo de safeProfile.image:", typeof safeProfile.image);

    onSave(updatedProfile);
  };

  // Si profile es null, solo muestra un mensaje (sin afectar los hooks)
  if (!profile) {
    return (
      <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
        <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
          <h2 className="text-2xl font-bold mb-4">Error</h2>
          <p>No se encontró el perfil.</p>
          <button
            type="button"
            onClick={onClose}
            className="bg-gray-500 text-white font-bold py-2 px-4 rounded mt-4"
          >
            Cerrar
          </button>
        </div>
      </div>
    );
  }

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
              minLength={3}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Apellido</label>
            <input
              type="text"
              name="lastname"
              value={formState.lastname}
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
            <label className="block text-gray-700">Estado</label>
            <select
              value={state}
              onChange={(e) => setState(e.target.value === "true")}
              className="py-2 px-3 rounded-xl border-2 border-blue-300"
            >
              <option value="true">Activo</option>
              <option value="false">Inactivo</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Puesto</label>
            <input
              name="type"
              value={formState.type || ""}
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
  profile: PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string,
    lastname: PropTypes.string,
    description: PropTypes.string,
    age: PropTypes.number,
    price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    type: PropTypes.string,
    state: PropTypes.bool,
    image: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  }),
  onClose: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
};
