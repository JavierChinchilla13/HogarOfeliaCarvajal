import baile from "../../../assets/Baile.jpeg";
import granja from "../../../assets/Granja.png";
import karaoke from "../../../assets/Karaoke.jpg";

const RecreationalActivities = () => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
      {/* Título */}
      <h2 className="text-3xl font-bold text-teal-600 mb-6 text-center">
        Actividades Recreativas para Nuestros Adultos Mayores
      </h2>

      {/* Descripción */}
      <p className="text-gray-600 text-lg text-center mb-8">
        En nuestro hogar, promovemos actividades que fomentan la alegría, la
        salud y la convivencia entre nuestros residentes. ¡Cada día es una nueva
        oportunidad para sonreír y aprender!
      </p>

      {/* Lista de actividades */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Actividad 1: Karaoke */}
        <div className="bg-gray-50 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            Karaoke Musical
          </h3>
          <p className="text-gray-600">
            Sesiones de karaoke donde nuestros residentes disfrutan de sus
            canciones favoritas, fomentando la memoria y la diversión.
          </p>
        </div>

        {/* Actividad 2: Ejercicio y baile */}
        <div className="bg-gray-50 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            Ejercicio y Baile Terapéutico
          </h3>
          <p className="text-gray-600">
            Clases suaves de ejercicio y baile para mantener la movilidad, el
            equilibrio y el buen humor.
          </p>
        </div>

        {/* Actividad 3: Talleres manuales */}
        <div className="bg-gray-50 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            Talleres de Manualidades
          </h3>
          <p className="text-gray-600">
            Actividades que mejoran las destrezas y habilidades manuales, la
            creatividad y la motricidad fina.
          </p>
        </div>

        {/* Actividad 4: Jardinería */}
        <div className="bg-gray-50 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            Jardinería y Cuidado de Plantas
          </h3>
          <p className="text-gray-600">
            Nuestros residentes participan en el cuidado de la huerta y el
            vivero, conectándose con la naturaleza y disfrutando de sus
            beneficios terapéuticos. Además de apreciar nuestra granja.
          </p>
        </div>
      </div>

      {/* Espacio para agregar fotos */}
      <div className="mt-8">
        <h3 className="text-2xl font-bold text-gray-800 mb-4 text-center">
          Momentos de Alegría en Imágenes
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Imagen de Karaoke */}
          <div className="h-40 rounded-lg overflow-hidden">
            <img
              src={karaoke}
              alt="Karaoke"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Imagen de Baile */}
          <div className="h-40 rounded-lg overflow-hidden">
            <img
              src={baile}
              alt="Baile"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Imagen de Jardinería */}
          <div className="h-40 rounded-lg overflow-hidden">
            <img
              src={granja}
              alt="Jardinería"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecreationalActivities;
