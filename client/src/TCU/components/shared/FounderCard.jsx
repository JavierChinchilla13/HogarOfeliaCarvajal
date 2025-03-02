import Founder from "../../../assets/founder.png";

const FounderCard = () => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center text-center max-w-md mx-auto">
      <div className="relative w-72 h-96 mb-6">
        <img
          src={Founder} // Usando la imagen importada
          alt="Fundadora Clara Amelia Acuña Sánchez"
          className="rounded-xl w-full h-full object-cover"
        />
      </div>
      <h2 className="text-2xl font-bold text-gray-800">
        Clara Amelia Acuña Sánchez
      </h2>
      <p className="text-gray-600 text-lg">Fundadora</p>
      <p className="text-gray-500 text-base mt-3">
        Fundado el 17 de abril de 1982
      </p>
    </div>
  );
};

export default FounderCard;
