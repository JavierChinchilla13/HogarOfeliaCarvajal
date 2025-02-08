import { useState } from "react";
import PropTypes from "prop-types";

export const ContactCard = ({ productName, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    details: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const sendEmail = () => {
    const subject = `Solicitud de información sobre: ${productName}`;
    const body = `
      Producto: ${productName}%0A
      Nombre: ${encodeURIComponent(formData.name)}%0A
      Teléfono: ${encodeURIComponent(formData.phone)}%0A
      Email: ${encodeURIComponent(formData.email)}%0A
      Detalles: ${encodeURIComponent(formData.details)}`;
    const mailtoLink = `mailto:newclinics.info@gmail.com?subject=${encodeURIComponent(
      subject
    )}&body=${body}`;
    window.location.href = mailtoLink;
  };

  const handleSubmitEmail = (e) => {
    e.preventDefault();
    sendEmail();
    onClose();
  };

  const handleSubmitWhatsApp = (e) => {
    e.preventDefault();
    const message = `Hola, estoy interesado en el producto: ${productName}%0A
      Mi nombre es: ${encodeURIComponent(formData.name)}%0A
      Detalles: ${encodeURIComponent(formData.details)}%0A%0A
      Mi email es: ${encodeURIComponent(formData.email)}`;
    const whatsappUrl = `https://api.whatsapp.com/send?phone=50661226703&text=${message}`;
    window.open(whatsappUrl, "_blank");
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4">Contacto</h2>
        <p className="text-gray-700 mb-4">{`Estás consultando sobre: ${productName}`}</p>
        <form>
          <div className="mb-4">
            <label className="block text-gray-700">Nombre:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Celular:</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Correo:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Detalles:</label>
            <textarea
              name="details"
              value={formData.details}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
              rows="4"
              required
            />
          </div>
          <div className="flex justify-between">
            <button
              onClick={handleSubmitEmail}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
            >
              Enviar por correo
            </button>
            <button
              onClick={handleSubmitWhatsApp}
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
            >
              Enviar por WhatsApp
            </button>
          </div>
        </form>
        <button
          onClick={onClose}
          className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded mt-4"
        >
          Cerrar
        </button>
      </div>
    </div>
  );
};

ContactCard.propTypes = {
  onClose: PropTypes.func.isRequired,
  productName: PropTypes.string.isRequired,
};
