import { FaEdit, FaTrash } from "react-icons/fa";
import PropTypes from "prop-types";
import { useContext } from "react";
import { AuthContext } from "../../../auth/context/AuthContext";

const AboutUsCard = ({ title, description, image, onEdit, onDelete }) => {
  const { authState } = useContext(AuthContext);

  return (
    <div className="   w-full flex flex-col">
      <div className="mb-6 p-4 w-full flex flex-col md:flex-row">
        {/* Texto a la izquierda */}
        <div className="flex-1 pr-0 md:pr-4 pt-2">
          <h3 className="font-bold text-3xl text-gray-800 mb-2">
            {title || "Sin título"}
          </h3>
          <p className="text-gray-600 text-lg text-justify">
            {description || "Sin descripción"}
          </p>
        </div>

        {/* Imagen aún más grande */}
        <div className="w-full md:w-1/2 h-80 bg-gray-50 rounded-lg overflow-hidden mt-4 md:mt-0">
          {image ? (
            <img
              src={image}
              alt="Imagen"
              className="w-full h-full object-contain bg-gray-50" // Usa "object-contain" para mantener proporciones
            />
          ) : (
            <div className="flex items-center justify-center h-full text-gray-500">
              Sin imagen
            </div>
          )}
        </div>
      </div>

      {/* Botones debajo */}
      {authState?.logged && (
        <div className="mt-4 flex justify-end space-x-2">
          <button
            onClick={onEdit}
            className="bg-yellow-500 hover:bg-yellow-600 text-white p-2 rounded-full shadow-md"
            aria-label="Editar"
          >
            <FaEdit />
          </button>
          <button
            onClick={onDelete}
            className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-full shadow-md"
            aria-label="Eliminar"
          >
            <FaTrash />
          </button>
        </div>
      )}
    </div>
  );
};

AboutUsCard.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
};

export default AboutUsCard;
