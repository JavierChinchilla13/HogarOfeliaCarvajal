import PropTypes from "prop-types";
import { FaEdit, FaTrash } from "react-icons/fa";
import { AuthContext } from "../../../auth/context/AuthContext";
import { useContext } from "react";

const ItemCard = ({
  name,
  lastname,
  image,
  type,
  state,
  onViewDetails,
  onEdit,
  onDelete,
}) => {
  const { authState } = useContext(AuthContext);
  return (
    <div className="w-full max-w-md rounded-lg overflow-hidden shadow-lg bg-white relative z-0">
      <img className="w-full h-64 object-cover" src={image} alt={name} />
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-xl">
            {name} {lastname}
          </h3>
          {authState?.logged && (
            <div className="flex space-x-2">
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
        <p className="text-gray-600">{type}</p>
        {authState?.logged && (
          <p
            className={
              state ? `text-green-600 font-bold` : `text-red-600 font-bold`
            }
          >
            {state ? `Estado: Activo` : `Estado: Inactivo`}
          </p>
        )}
      </div>
      <div className="px-6 pt-4 pb-2 flex justify-end">
        <button
          onClick={onViewDetails}
          className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded"
        >
          Ver detalles
        </button>
      </div>
    </div>
  );
};

ItemCard.propTypes = {
  name: PropTypes.string.isRequired,
  lastname: PropTypes.string,
  age: PropTypes.number,
  image: PropTypes.string,
  type: PropTypes.string,
  state: PropTypes.bool,
  onViewDetails: PropTypes.func,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
};

export default ItemCard;
