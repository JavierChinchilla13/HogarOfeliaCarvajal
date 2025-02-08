import { Link, useNavigate } from "react-router-dom";
import Button from "../../TCU/components/shared/Button";
import Input from "../../TCU/components/shared/Input";
import { useState, useContext } from "react";
import logo from "../../assets/logo.png"; // Ruta al logo
import { toast } from "react-toastify";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
  // Accedemos al contexto de autenticación para usar la función `login`
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  // Estilos CSS para los elementos del formulario
  const containerStyles = "flex flex-col items-center h-42";
  const textBoxStyles = "w-4/6 mt-4";
  const buttonStyles = "mt-6 mb-6 bg-[#44DECE]";

  // Estados locales del componente
  const [email, setEmail] = useState(""); // Almacena el email ingresado
  const [password, setPassword] = useState(""); // Almacena la contraseña ingresada
  const [errorMessage, setErrorMessage] = useState(""); // Almacena mensajes de error para mostrar al usuario

  /**
   * Maneja el envío del formulario de inicio de sesión.
   * Valida los datos ingresados, envía la solicitud de inicio de sesión al servidor
   * y actualiza el contexto de autenticación en caso de éxito.
   *
   * @param {Event} event - El evento de envío del formulario
   */
  const onSubmit = async (event) => {
    event.preventDefault(); // Previene el comportamiento por defecto del formulario

    // Validación inicial: Verifica si email y contraseña están presentes
    if (!email || !password) {
      toast.error("Es necesario el email y contraseña");
      setErrorMessage(
        "Es necesario el email y contraseña." // Muestra un mensaje genérico si no hay detalles
      ); // Muestra un mensaje de error
      return;
    }

    const user = { email, password }; // Construye el objeto con las credenciales

    try {
      const url = "/api/v1/auth/login"; // URL de la API para login

      // Enviamos una solicitud POST con las credenciales del usuario
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Especificamos el tipo de contenido
        },
        body: JSON.stringify(user), // Convertimos las credenciales a JSON
      });

      if (response.ok) {
        // Si la solicitud es exitosa
        login(email); // Actualiza el contexto con los datos del usuario
        navigate("/"); // Redirige a la página principal
        setEmail(""); // Limpia el campo de email
        setPassword(""); // Limpia el campo de contraseña
        setErrorMessage(""); // Limpia cualquier mensaje de error previo
      } else {
        // Si ocurre un error (credenciales inválidas, etc.)
        const errorData = await response.json(); // Obtiene detalles del error
        setErrorMessage(
          errorData.message || "Correo o contraseña incorrectos." // Muestra un mensaje genérico si no hay detalles
        );
      }
    } catch (error) {
      // Manejo de errores generales
      console.error("Error en la solicitud:", error); // Loguea el error en consola
      setErrorMessage(
        "Ocurrió un error durante el proceso. Intenta nuevamente."
      );
    }
  };

  return (
    <div
      className="w-screen h-screen flex items-center justify-center 
      bg-[#B0DEE9] "
    >
      {/* Contenedor principal del formulario */}
      <div className="w-full max-w-[600px] p-8 shadow-2xl rounded-lg shadow-emerald-400 bg-white">
        {/* Sección del logo */}
        <div className="flex items-center">
          <Link to="../../newClinic/pages/AboutUs">
            <img
              src={logo}
              alt="Logo de New Clinic" // Texto alternativo para accesibilidad
              className="hover:scale-105 transition-all w-3/4 max-w-[440px] mt-4 ml-16"
            />
          </Link>
        </div>

        {/* Formulario de inicio de sesión */}
        <form onSubmit={onSubmit} className={containerStyles}>
          {/* Campo de email */}
          <Input
            text={email}
            nameRef="email"
            handleText={(e) => setEmail(e.target.value.toLowerCase())} // Convierte a minúsculas automáticamente
            placeHolder="Email"
            extraStyle={textBoxStyles}
          />
          {/* Campo de contraseña */}
          <Input
            text={password}
            nameRef="password"
            handleText={(e) => setPassword(e.target.value)} // Almacena el valor ingresado
            type="password" // Campo de tipo contraseña
            placeHolder="Contraseña"
            extraStyle={textBoxStyles}
          />

          {/* Mensaje de error, si existe */}
          {errorMessage && (
            <p className="text-red-500 text-sm mt-2">{errorMessage}</p>
          )}

          {/* Botón para enviar el formulario */}
          <Button type="submit" extraStyle={buttonStyles}>
            {"Iniciar sesión como colaborador"}
          </Button>

          {/* Enlace para recuperar contraseña */}
          <p>
            <Link
              to="../forgot-password"
              className="text-blue-400 hover:text-blue-600 ml-2 cursor-pointer"
            >
              ¿Has olvidado tu contraseña?
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
