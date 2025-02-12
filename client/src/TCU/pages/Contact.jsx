import Header from "../components/Header";
import "leaflet/dist/leaflet.css";
import ContactList from "../components/shared/ContactList";
import Footer from "../components/Footer";
import img from "../../../src/assets/ImgContact.jpg";

const Contact = () => {
  return (
    <div className="flex flex-col min-h-screen pt-[150px]">
      <Header />

      <div className="flex-grow flex flex-col items-center z-5">
        {/* Sección de contacto */}
        <div className="w-full max-w-6xl p-8">
          {/* Título de la sección */}
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            Contacto
          </h2>

          {/* Contenedor de información de contacto e imagen */}
          <div className="flex flex-col md:flex-row items-start space-y-8 md:space-y-0 md:space-x-8 mb-8">
            {/* Información de contacto */}
            <div className="flex-1">
              <ContactList />
            </div>

            {/* Imagen del lugar */}
            <div className="flex-1">
              <img
                src={img} // Reemplaza con la ruta de tu imagen
                alt="Imagen del lugar"
                className="w-full h-auto rounded-lg shadow-md"
              />
            </div>
          </div>

          {/* Mapa con iframe de Google */}
          <div className="w-full h-96 rounded-lg overflow-hidden shadow-md">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15725.053795780512!2d-84.0830182!3d9.9016261!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8fa0e31ba39c5c97%3A0x1a665d6f0fbc06d0!2sNursing%20home%20Ofelia%20Naranjo%20Carvajal!5e0!3m2!1ses-419!2scr!4v1732404705181!5m2!1ses-419!2scr"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Contact;
