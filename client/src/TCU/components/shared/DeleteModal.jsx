import PropTypes from "prop-types";

export const DeleteModal = ({ profile, onClose, onConfirm }) => {
  if (!profile) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4">¿Estás seguro de eliminar?</h2>
        <p className="mb-4">"{profile.name}"</p>
        <div className="flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="bg-gray-500 text-white font-bold py-2 px-4 rounded"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
};

DeleteModal.propTypes = {
  profile: PropTypes.object,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
};
