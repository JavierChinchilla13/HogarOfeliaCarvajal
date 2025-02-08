import { useState, useEffect } from "react";
import Axios from "axios";
import { FaEdit, FaTrash, FaSave, FaTimes } from "react-icons/fa";
import { AuthContext } from "../../../auth/context/AuthContext";
import { useContext } from "react";
import Button from "./Button";
import Input from "./Input";

const ContactList = () => {
  const { authState } = useContext(AuthContext);

  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingContact, setEditingContact] = useState(null); // Contacto en edición
  const [updatedInfo, setUpdatedInfo] = useState(""); // Información actualizada
  const [updatedName, setUpdatedName] = useState(""); // Nombre actualizado
  const [successMessage, setSuccessMessage] = useState(""); // Mensaje de éxito

  const [newContactName, setNewContactName] = useState(""); // Nombre del nuevo contacto
  const [newContactInfo, setNewContactInfo] = useState(""); // Información del nuevo contacto
  const [showModal, setShowModal] = useState(false); // Estado para mostrar la modal

  // Cargar los contactos al montar el componente
  useEffect(() => {
    Axios.get("api/v1/contacts")
      .then((response) => {
        setContacts(response.data.Contacts);
        setLoading(false);
      })
      .catch((err) => {
        // Combina ambos casos para incluir el mensaje más completo
        setError(
          "Error al cargar los contactos: " + (err.message || "desconocido")
        );
        setLoading(false);
      });
  }, []);

  // Manejar la edición de un contacto
  const handleEdit = (contact) => {
    setEditingContact(contact); // Configura el contacto a editar
    setUpdatedInfo(contact.info); // Inicializa el campo con la información actual
    setUpdatedName(contact.name); // Inicializa el campo nombre con el nombre actual
  };

  // Guardar la información editada
  const handleSave = async () => {
    if (!updatedName.trim() || !updatedInfo.trim()) {
      alert("El nombre y la información no pueden estar vacíos.");
      return;
    }

    try {
      const url = `/api/v1/contacts/${editingContact._id}`;
      const response = await Axios.patch(url, {
        name: updatedName,
        info: updatedInfo,
      });

      setContacts((prevContacts) =>
        prevContacts.map((contact) =>
          contact._id === editingContact._id
            ? {
                ...contact,
                name: response.data.contact.name,
                info: response.data.contact.info,
              }
            : contact
        )
      );

      setSuccessMessage(`${editingContact.name} actualizado correctamente`);
      setEditingContact(null);
      setUpdatedName("");
      setUpdatedInfo("");
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (err) {
      console.error(err);
      alert("Error al actualizar el contacto.");
    }
  };

  // Eliminar un contacto
  const handleDelete = async (contactId) => {
    try {
      const url = `/api/v1/contacts/${contactId}`;
      await Axios.delete(url);
      setContacts(contacts.filter((contact) => contact._id !== contactId));
      alert("Contacto eliminado correctamente.");
    } catch (err) {
      console.error(err);
      alert("Error al eliminar el contacto.");
    }
  };

  // Agregar un nuevo contacto
  const handleAddContact = async () => {
    if (!newContactName.trim() || !newContactInfo.trim()) {
      alert("El nombre y la información no pueden estar vacíos.");
      return;
    }

    try {
      await Axios.post("/api/v1/contacts", {
        name: newContactName,
        info: newContactInfo,
      });

      // Recargar la página para traer los nuevos datos
      window.location.reload();
    } catch (err) {
      console.error(err);
      alert("Error al agregar el contacto.");
    }
  };

  // Mostrar la modal para agregar contacto
  const openModal = () => {
    setShowModal(true);
  };

  // Cerrar la modal
  const closeModal = () => {
    setShowModal(false);
  };

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  if (loading) {
    return <p>Cargando...</p>;
  }

  return (
    <div className="font-sans overflow-x-auto">
      {/* Mostrar el mensaje de éxito */}
      {successMessage && (
        <div className="bg-green-500 text-white p-2 rounded mb-4">
          {successMessage}
        </div>
      )}

      {authState?.logged ? (
        <div className="mb-6">
          <Button onClickFunc={openModal} ligthVariant={true}>
            Añadir más información
          </Button>
        </div>
      ) : null}

      {/* Modal para agregar contacto con labels en los inputs */}
      {showModal && (
        <div className="fixed inset-0 p-4 flex justify-center items-center w-full h-full z-[1000] overflow-auto font-sans">
          <div className="w-full max-w-lg bg-white shadow-lg rounded-md p-8 relative">
            {/* Botón para cerrar la modal */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-3.5 cursor-pointer shrink-0 fill-gray-800 hover:fill-red-500 float-right"
              onClick={closeModal}
              viewBox="0 0 320.591 320.591"
            >
              <path
                d="M30.391 318.583a30.37 30.37 0 0 1-21.56-7.288c-11.774-11.844-11.774-30.973 0-42.817L266.643 10.665c12.246-11.459 31.462-10.822 42.921 1.424 10.362 11.074 10.966 28.095 1.414 39.875L51.647 311.295a30.366 30.366 00 1-21.256 7.288z"
                data-original="#000000"
              ></path>
              <path
                d="M287.9 318.583a30.37 30.37 0 0 1-21.257-8.806L8.83 51.963C-2.078 39.225-.595 20.055 12.143 9.146c11.369-9.736 28.136-9.736 39.504 0l259.331 257.813c12.243 11.462 12.876 30.679 1.414 42.922-.456.487-.927.958-1.414 1.414a30.368 30.368 0 0 1-23.078 7.288z"
                data-original="#000000"
              ></path>
            </svg>
            <div className="my-8 text-center">
              <h4 className="text-2xl text-gray-800 font-bold">
                Añadir Información
              </h4>
              <p className="text-sm text-gray-500 mt-2">
                Agrega más información.
              </p>

              <div className="mt-4 text-left">
                <label
                  htmlFor="name"
                  className="block text-sm font-semibold text-gray-700"
                >
                  Nombre
                </label>
                <Input
                  text={newContactName}
                  handleText={(e) => setNewContactName(e.target.value)}
                  placeHolder="Ej: Ubicación, Teléfono"
                  nameRef="name"
                  customClass="w-full"
                />
              </div>

              <div className="mt-4 text-left">
                <label
                  htmlFor="info"
                  className="block text-sm font-semibold text-gray-700"
                >
                  Información
                </label>
                <Input
                  text={newContactInfo}
                  handleText={(e) => setNewContactInfo(e.target.value)}
                  placeHolder="Ej: 88888888, San José"
                  nameRef="info"
                  customClass="w-full"
                />
              </div>
            </div>
            <button
              type="button"
              onClick={handleAddContact}
              className="px-5 py-2.5 w-full rounded-md text-white text-sm outline-none bg-blue-600 hover:bg-blue-700 mt-4"
            >
              Añadir
            </button>
          </div>
        </div>
      )}

      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-100 whitespace-nowrap">
          <tr>
            <th className="px-4 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Nombre
            </th>
            <th className="px-4 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Información
            </th>
            {authState?.logged ? (
              <th className="px-4 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Acciones
              </th>
            ) : null}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {contacts?.map((contact) => (
            <tr key={contact._id}>
              <td className="px-4 py-4">
                {editingContact?._id === contact._id ? (
                  <input
                    type="text"
                    value={updatedName}
                    onChange={(e) => setUpdatedName(e.target.value)}
                    className="w-full border border-gray-300 p-2 rounded-md"
                  />
                ) : (
                  contact.name
                )}
              </td>
              <td className="px-4 py-4">
                {editingContact?._id === contact._id ? (
                  <input
                    type="text"
                    value={updatedInfo}
                    onChange={(e) => setUpdatedInfo(e.target.value)}
                    className="w-full border border-gray-300 p-2 rounded-md"
                  />
                ) : (
                  contact.info
                )}
              </td>
              {authState?.logged ? (
                <td className="px-4 py-4 text-center">
                  {editingContact?._id === contact._id ? (
                    <div className="flex space-x-2 justify-center">
                      <button
                        onClick={handleSave}
                        className="bg-blue-600 text-white p-2 rounded-md"
                      >
                        <FaSave className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => setEditingContact(null)}
                        className="bg-gray-300 text-gray-700 p-2 rounded-md"
                      >
                        <FaTimes className="h-5 w-5" />
                      </button>
                    </div>
                  ) : (
                    <div className="flex space-x-2 justify-center">
                      <button
                        onClick={() => handleEdit(contact)}
                        className="bg-yellow-500 text-white p-2 rounded-md"
                      >
                        <FaEdit className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => handleDelete(contact._id)}
                        className="bg-red-600 text-white p-2 rounded-md"
                      >
                        <FaTrash className="h-5 w-5" />
                      </button>
                    </div>
                  )}
                </td>
              ) : null}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ContactList;
