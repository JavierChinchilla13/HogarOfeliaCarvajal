import Header from "../components/Header";
import { useContext, useEffect, useState } from "react";
import Input from "../components/shared/Input";
import { ElementsGrid } from "../components/shared/ElementsGrid";
import ElementModal from "../components/ElementModal";
import { AuthContext } from "../../auth/context/AuthContext";
import axios from "axios";
import Footer from "../components/Footer";
import Founder from "../components//shared/FounderCard";
import PersonalHeader from "../components/shared/PersonalHeader";

const Personal = () => {
  const { authState } = useContext(AuthContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [profilesList, setProfilesList] = useState([]);
  const [elementModalAnimationStyle, setElementModalAnimationStyle] = useState(
    "animate__animated animate__fadeIn"
  );

  const getProfileList = () => {
    axios
      .get("/api/v1/profile/")
      .then(({ data }) => {
        console.log("API Response:", data);

        if (!data || !Array.isArray(data.profiles)) {
          console.error(
            "Error: La API no devolvió una lista válida de perfiles"
          );
          setProfilesList([]);
          return;
        }

        console.log("Perfiles recibidos:", data.profiles);
        setProfilesList(data.profiles);
      })
      .catch((error) => {
        console.error("Error al obtener los perfiles:", error);
        setProfilesList([]);
      });
  };

  useEffect(() => {
    getProfileList();
  }, []);

  const onCloseAddModal = () => {
    console.log("Actualizando lista después de agregar perfil...");
    getProfileList();
    setElementModalAnimationStyle("animate__animated animate__fadeOut");
    setTimeout(() => {
      setElementModalAnimationStyle("animate__animated animate__fadeIn");
      setIsModalOpen(!isModalOpen);
    }, 500);
  };

  const onCloseModal = () => {
    console.log("Cerrando modal y refrescando datos...");
    getProfileList();
    setElementModalAnimationStyle("animate__animated animate__fadeOut");
    setTimeout(() => {
      setElementModalAnimationStyle("animate__animated animate__fadeIn");
    }, 500);
  };

  return (
    <div className="bg-gray-50 flex flex-col min-h-screen pt-[150px]">
      <Header />

      <div className="flex-grow container mx-auto px-6 py-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Personal
        </h2>

        {/* Input de búsqueda */}
        <div className="flex justify-center mb-6">
          <Input
            text={searchTerm}
            handleText={(newText) => setSearchTerm(newText.target.value)}
            placeHolder="Buscar por nombre..."
            extraStyle="w-[350px] shadow-sm"
          />
        </div>

        <PersonalHeader />

        {/* Botón para agregar perfil */}
        {authState?.logged && (
          <div className="flex justify-center my-6">
            <button
              className="rounded-md bg-yellow-400 py-2 px-6 text-lg transition-all shadow-md hover:shadow-lg text-gray-800 hover:text-white hover:bg-yellow-500"
              onClick={() => setIsModalOpen(!isModalOpen)}
            >
              + Añadir nuevo perfil
            </button>
          </div>
        )}

        {/* Modal */}
        <ElementModal
          title="Añadir Perfil"
          isOpen={isModalOpen}
          onClose={onCloseAddModal}
          type="perfil"
          style={elementModalAnimationStyle}
        />

        {/* Grid de Perfiles */}
        <div className="mt-10">
          {profilesList.length > 0 ? (
            <ElementsGrid
              data={profilesList}
              searchTerm={searchTerm}
              onCloseDeleteModal={onCloseModal}
              onCloseEditModal={onCloseModal}
            />
          ) : (
            <p className="text-center text-gray-500 text-lg mt-6">
              No hay perfiles disponibles.
            </p>
          )}
        </div>
        {/* Foto de FUndadora */}
        <Founder />
      </div>

      <Footer className="mt-auto" />
    </div>
  );
};

export default Personal;
