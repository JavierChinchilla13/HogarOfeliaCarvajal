import { useEffect, useState } from "react";
import Axios from "axios";
import AboutUsCard from "./AboutUsCard";
import { DeleteAboutUsModal } from "./DeleteAboutUsModal";
import { EditAboutUsModal } from "./EditAboutUsModal";
import PropTypes from "prop-types";
import axios from "axios";
import { updatePost, uploadImage } from "../../utils/AboutUsService";

const AboutUsList = ({ informaciones, setInformaciones }) => {
  const [loading, setLoading] = useState(true); // Estado de carga
  const [error, setError] = useState(""); // Estado de error
  const [infoToDelete, setInfoToDelete] = useState(null); // Info seleccionada para eliminar
  const [infoToEdit, setInfoToEdit] = useState(null); // Info seleccionada para editar

  // Función para cargar datos de la API
  const fetchInformaciones = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await Axios.get("/api/v1/posts"); // Endpoint de la API
      if (response.data && response.data.Posts) {
        setInformaciones(response.data.Posts); // Actualiza el estado con los datos de la API
      }
    } catch (err) {
      setError("Error al cargar los datos: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  // Cargar datos al montar el componente
  useEffect(() => {
    fetchInformaciones();
  }, []);

  // Función para abrir el modal de eliminar
  const handleOpenDeleteModal = (info) => {
    setInfoToDelete(info);
  };

  const handleDelete = async () => {
    const infoID = infoToDelete?._id;

    try {
      await axios.delete(`/api/v1/posts/${infoID}`);

      // Actualiza el estado eliminando el elemento
      setInformaciones((prev) => prev.filter((info) => info._id !== infoID));

      setInfoToDelete(null); // Cierra el modal de eliminación
    } catch (err) {
      console.error("Error al eliminar la información:", err);
    }
  };

  // Función para abrir el modal de edición
  const handleOpenEditModal = (info) => setInfoToEdit(info);

  // Guardar los cambios de edición
  const handleEditSave = async (editedInfo) => {
    try {
      let imageUrl = "";
      if (editedInfo.imageLoaded) {
        const formData = new FormData();
        formData.append("image", editedInfo.image);
        const { data } = await uploadImage(formData);
        imageUrl = data.image.src;
      }

      const newInfoData = {
        name: editedInfo.name,
        description: editedInfo.description,
        image: editedInfo.imageLoaded ? imageUrl : editedInfo.image,
      };

      await updatePost(editedInfo._id, newInfoData);

      // Actualiza directamente el estado con la información editada
      setInformaciones((prev) =>
        prev.map((info) =>
          info._id === editedInfo._id ? { ...info, ...newInfoData } : info
        )
      );

      setInfoToEdit(null); // Cierra el modal de edición
    } catch (err) {
      console.error("Error al guardar los cambios de edición:", err);
    }
  };

  return (
    <div>
      {/* Lista de tarjetas */}
      <div className="container mx-auto py-6">
        {loading ? (
          <p className="text-gray-500">Cargando información...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : informaciones.length > 0 ? (
          <div className="flex flex-wrap gap-4 w-full mb-4">
            {informaciones.map((info) => (
              <AboutUsCard
                key={info._id}
                title={info.name}
                description={info.description}
                image={info.image}
                onDelete={() => handleOpenDeleteModal(info)}
                onEdit={() => handleOpenEditModal(info)}
              />
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No hay información para mostrar.</p>
        )}
      </div>

      {/* Modales */}
      {infoToDelete && (
        <DeleteAboutUsModal
          info={infoToDelete}
          onClose={() => setInfoToDelete(null)}
          onConfirm={handleDelete}
        />
      )}
      {infoToEdit && (
        <EditAboutUsModal
          infoToEdit={infoToEdit} // Ahora coincide con lo esperado en el modal
          onClose={() => setInfoToEdit(null)}
          onSave={handleEditSave}
        />
      )}
    </div>
  );
};

AboutUsList.propTypes = {
  informaciones: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired, // Identificador único
      name: PropTypes.string.isRequired, // Nombre del post
      description: PropTypes.string, // Descripción del post
      image: PropTypes.string, // URL de la imagen (puede ser opcional)
    })
  ).isRequired, // La lista es obligatoria
  setInformaciones: PropTypes.func.isRequired, // Función para actualizar la lista
  onEdit: PropTypes.func, // Función para editar
  onDelete: PropTypes.func, // Función para eliminar
};

export default AboutUsList;
