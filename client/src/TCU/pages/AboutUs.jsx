import { useState, useContext } from "react";
import { AuthContext } from "../../auth/context/AuthContext"; // Importación del contexto de autenticación
import Header from "../components/Header";
import AboutUsList from "../components/shared/AboutUsList";
import AddAboutUs from "../components/shared/AddAboutUs"; // Modal para añadir información
import logo from "../../assets/logo.png"; // Ruta al logo
import Footer from "../components/Footer";
import { Requirements } from "../components/shared/Requirements";
import WellnessPrograms from "../components/shared/WellnessPrograms";
import RecreationalActivities from "../components/shared/RecreationalActivities";

const AboutUs = () => {
  const { authState } = useContext(AuthContext); // Obtiene el estado de autenticación
  const [informaciones, setInformaciones] = useState([]); // Estado para la lista de información
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado para el modal

  // Función para abrir el modal
  const handleOpenModal = () => setIsModalOpen(true);

  // Función para cerrar el modal
  const handleCloseModal = () => setIsModalOpen(false);

  // Función para guardar nueva información
  const handleSaveInfo = (newInfo) => {
    setInformaciones((prev) => [...prev, newInfo]); // Agrega el nuevo post al estado actual
  };

  return (
    <div className="bg-gray-50 flex flex-col min-h-screen pt-[150px]">
      {/* Header */}
      <Header />

      {/* Contenido principal */}
      <main className="flex-grow container mx-auto px-6 py-12">
        {/* Logo y título */}
        <div className="flex flex-col items-center justify-between mb-10">
          {/* Contenedor del logo */}
          <div className="flex flex-col items-center mb-4">
            <img src={logo} alt="TCU" className="h-24 md:h-28 mb-4 mx-auto" />
            <h1 className="text-4xl font-bold text-gray-800 text-center">
              Nuestro Hogar
            </h1>
          </div>

          {/* Botón solo para usuarios autenticados */}
          {authState?.logged && (
            <div className="mt-4">
              <button
                onClick={handleOpenModal}
                className="bg-teal-600 hover:bg-teal-700 text-white py-2 px-4 rounded-lg shadow-lg transition duration-300"
              >
                Añadir Información
              </button>
            </div>
          )}
        </div>

        {/* Subtítulo */}
        <p className="text-xl font-bold text-blue-300 mb-6">
          Somos una institución de bienestar social cuyo objetivo es brindar la
          mejor cobertura posible a las necesidades básicas de la persona adulta
          mayor de escasos recursos económicos. Velamos por una vejez digna.
        </p>

        {/* Requisitos de Ingreso */}
        <div className="mb-10">
          {" "}
          {/* Agregamos un margen inferior */}
          <Requirements />
        </div>

        {/* Programas de Bienestar */}
        <div className="mb-10">
          {" "}
          {/* Agregamos un margen inferior */}
          <WellnessPrograms />
        </div>

        {/* Actividades Recreativas */}
        <div className="mb-10">
          {" "}
          {/* Agregamos un margen inferior */}
          <RecreationalActivities />
        </div>

        {/* Lista de información */}
        <AboutUsList
          informaciones={informaciones}
          setInformaciones={setInformaciones}
        />

        {/* Modal para añadir información */}
        <AddAboutUs
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onSave={handleSaveInfo}
        />
      </main>

      <Footer />
    </div>
  );
};

export default AboutUs;
