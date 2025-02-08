// import { useContext, useState } from "react";
import Header from "../components/Header";
// import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import ContactList from "../components/shared/ContactList";
import Footer from "../components/Footer";
// import MailIcon from "../../assets/mail.png";
// import WhatsAppIcon from "../../assets/whatsapp.png";
// import InstagramIcon from "../../assets/instagram.png";
// import { AuthContext } from "../../auth/context/AuthContext";

// const center = [9.9357769, -84.1106032]; // Coordenadas de Sabana, Multicentro Sabana

const Contact = () => {
  // const { authState } = useContext(AuthContext);

  return (
    <div className="flex flex-col min-h-screen pt-[150px]">
      <Header />

      <div className="flex-grow flex flex-col items-center z-5">
        {/* Sección de contacto */}
        <div className="w-full flex flex-col md:flex-row justify-center items-start p-8 space-y-4 md:space-y-0 md:space-x-8">
          {/* Información de contacto y dirección */}
          <div className="flex flex-col items-start space-y-2">
            <h2 className="text-3xl font-bold text-gray-800">Contacto</h2>

            <ContactList />

            <div className="flex flex-row justify-center items-center space-x-8">
              {/* Correo */}
              {/* <div className="flex flex-col items-center space-y-2">
                <a
                  href="mailto:newclinics.info@gmail.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-14 h-14 bg-white-500 rounded-full shadow hover:bg-blue-600 transition"
                >
                  <img src={MailIcon} alt="Email" className="w-14 h-14" />
                </a>
              </div> */}

              {/* Teléfono */}
              {/* <div className="flex flex-col items-center space-y-2">
                <a
                  href="https://wa.me/50661226703"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-14 h-14 bg-white-500 rounded-full shadow hover:bg-green-600 transition"
                >
                  <img
                    src={WhatsAppIcon}
                    alt="WhatsApp"
                    className="w-14 h-14"
                  />
                </a>
              </div> */}

              {/* Instagram */}
              {/* <div className="flex flex-col items-center space-y-2">
                <a
                  href="https://www.instagram.com/newclinic.cr/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-14 h-14 bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 rounded-full shadow hover:opacity-50 transition"
                >
                  <img
                    src={InstagramIcon}
                    alt="Instagram"
                    className="w-14 h-14"
                  />
                </a>
              </div> */}
            </div>
          </div>

          {/* Mapa con iframe de Google */}
          <div className="w-full md:w-1/2 h-64">
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

          {/* Imagen de contacto */}
          {/*   */}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Contact;
