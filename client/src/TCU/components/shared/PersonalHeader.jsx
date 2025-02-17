import foto from "../../../assets/PersonalImagen.jpeg";

const PersonalHeader = () => {
  return (
    <div className="relative w-full h-64 flex items-center justify-center bg-gray-200 shadow-md rounded-lg overflow-hidden">
      <img
        src={foto}
        alt="Equipo del Hogar de Estar Ofelia Carvajal"
        className="absolute inset-0 w-full h-full object-cover opacity-50"
      />
      <div className="relative z-10 text-center px-4">
        <h2 className="text-2xl font-bold text-white drop-shadow-md">
          &ldquo;Dedicación, calidez y compromiso: nuestro equipo trabaja cada
          día con amor para brindar bienestar, compañía y cuidado a nuestros
          adultos mayores en el Hogar de Estar Ofelia Carvajal.&rdquo;
        </h2>
      </div>
    </div>
  );
};

export default PersonalHeader;
