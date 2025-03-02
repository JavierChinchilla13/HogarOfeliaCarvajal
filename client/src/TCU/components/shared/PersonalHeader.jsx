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
          &ldquo;Contamos con calificados profesionales, competentes licenciados
          (as) y doctores (as). Ponemos a su servicio; médico, enfermera,
          nutricionista, psicóloga y fisioterapeutas, para brindarle atención
          individual o interdisciplinaria pues conforman un completo equipo de
          salud para el abordaje integral de toda su familia.&rdquo;
        </h2>
      </div>
    </div>
  );
};

export default PersonalHeader;
