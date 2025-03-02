import img1 from "../../../assets/img1.png";
import img4 from "../../../assets/img4.png";

export const Requirements = () => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-8">
      {/* Título principal */}
      <h2 className="text-2xl font-bold text-center mb-6 text-teal-600">
        Requisitos de Ingreso
      </h2>
      <p className="text-center mb-8">
        Aquí podrá encontrar los requisitos para poder ingresar al hogar.
      </p>

      {/* Lista de requisitos */}
      <div className="space-y-4">
        {/* Requisito 1 */}
        <div className="flex items-center">
          <div
            className="w-16 h-16 rounded-lg border-2 border-gray-200 mr-4 flex items-center justify-center"
            style={{ backgroundColor: "#B0DEE9" }}
          >
            <img src={img1} alt="Requisito 1" className="w-12 h-12" />
          </div>
          <div>
            <h3 className="text-xl font-semibold">Requisito 1</h3>
            <p>Edad mínima: 65 años o más.</p>
          </div>
        </div>

        {/* Requisito 2 */}
        <div className="flex items-center">
          <div
            className="w-16 h-16 rounded-lg border-2 border-gray-200 mr-4 flex items-center justify-center"
            style={{ backgroundColor: "#B0DEE9" }}
          >
            <img src={img4} alt="Requisito 3" className="w-12 h-12" />
          </div>
          <div>
            <h3 className="text-xl font-semibold">Requisito 2</h3>
            <p>No tener enfermedades infecciosas ni contagiosas.</p>
          </div>
        </div>
      </div>

      {/* Botón de WhatsApp */}
      <div className="text-center mt-8">
        <p className="mb-4">
          Para más información, envíanos un mensaje para darte mayor detalle de
          los requisitos.
        </p>
        <a
          href="https://api.whatsapp.com/send?phone=50670518445&text=Me%20gustaría%20saber%20más%20sobre%20los%20requisitos%20de%20ingreso.%20Agradezco%20su%20atención%20y%20quedo%20a%20la%20espera%20de%20su%20respuesta."
          target="_blank"
          rel="noopener noreferrer"
          className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 inline-block"
        >
          Enviar Mensaje
        </a>
      </div>
    </div>
  );
};
