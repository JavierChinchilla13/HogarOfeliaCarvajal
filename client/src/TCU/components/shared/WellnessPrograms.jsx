import terapiaImg from "../../../assets/terapia.jpg";
import psicologiaImg from "../../../assets/psicologia.jpg";
import nutricionImg from "../../../assets/nutricion.jpg";
import espiritualImg from "../../../assets/espiritual.jpg";
import medicoImg from "../../../assets/medico.jpg";

const wellnessPrograms = [
  { title: "Terapia ocupacional motora fina", image: terapiaImg },
  { title: "Soporte psicológico con psicóloga", image: psicologiaImg },
  { title: "Soporte nutricional", image: nutricionImg },
  { title: "Soporte espiritual", image: espiritualImg },
  { title: "Consultorio médico con enfermera y médico", image: medicoImg },
];

const WellnessPrograms = () => {
  return (
    <div className="bg-white shadow-lg rounded-2xl p-6 mt-10 max-w-4x2 mx-auto">
      <h2 className="text-3xl font-bold text-center text-teal-600 mb-6">
        Programas de Bienestar y Calidad de Vida
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {wellnessPrograms.map((program, index) => (
          <div
            key={index}
            className="overflow-hidden  hover:shadow-lg transition-shadow duration-300 flex flex-col items-center bg-gray-100 rounded-lg"
          >
            <img
              src={program.image}
              alt={program.title}
              className="w-full h-40 object-cover rounded-t-lg"
            />
            <div className="p-4 text-center">
              <h3 className="text-lg font-semibold text-gray-700">
                {program.title}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WellnessPrograms;
