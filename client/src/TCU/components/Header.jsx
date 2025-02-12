import { Link, NavLink, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import Logo from "../components/shared/Logo";
import { AuthContext } from "../../auth/context/AuthContext";

const Header = () => {
  const navigate = useNavigate();
  const { authState, logout } = useContext(AuthContext);

  const [menuOpen, setMenuOpen] = useState(false);

  const onLogoutLogin = () => {
    if (authState?.logged) {
      logout(); // Limpia la sesión
      navigate("/"); // Redirige al inicio o la página de login
    } else {
      navigate("/auth/login"); // Redirige al login si no está logueado
    }
  };

  return (
    <header
      className="fixed top-0 left-0 w-full z-50 bg-[#B0DEE9] drop-shadow-md flex justify-between items-center text-black py-4 px-8 md:px-11"
      style={{ height: "150px" }}
    >
      {/* Logo */}
      <Link to="/" onClick={() => setMenuOpen(false)}>
        <Logo extraStyle="cursor-pointer hover:scale-105 transition-all w-[180px]" />
      </Link>

      {/* Menú principal (versión escritorio) */}
      <ul className="hidden xl:flex items-center gap-12 font-semibold text-base">
        <NavLink to="/personal" onClick={() => setMenuOpen(false)}>
          <li className="p-3 text-base hover:bg-blue-600 hover:text-white rounded-md transition-all cursor-pointer">
            Personal
          </li>
        </NavLink>
        <NavLink to="/" onClick={() => setMenuOpen(false)}>
          <li className="p-3 text-base hover:bg-blue-600 hover:text-white rounded-md transition-all cursor-pointer">
            Sobre nosotros
          </li>
        </NavLink>
        <NavLink to="/contact" onClick={() => setMenuOpen(false)}>
          <li className="p-3 text-base hover:bg-blue-600 hover:text-white rounded-md transition-all cursor-pointer">
            Contáctanos
          </li>
        </NavLink>
        {authState?.logged && (
          <NavLink to="/admin/addUser" onClick={() => setMenuOpen(false)}>
            <li className="p-3 text-base hover:bg-blue-600 hover:text-white rounded-md transition-all cursor-pointer">
              Agregar colaborador
            </li>
          </NavLink>
        )}
      </ul>

      {/* Botón de login/logout */}
      <label
        className={`p-3 text-base ${
          authState?.logged ? "hover:bg-red-500" : "hover:bg-blue-600"
        } hover:text-white rounded-md transition-all cursor-pointer hidden xl:flex`}
        onClick={onLogoutLogin}
      >
        {authState?.logged ? "Cerrar sesión" : "Iniciar sesión"}
      </label>

      {/* Icono del menú móvil */}
      <i
        className="bx bx-menu xl:hidden block text-5xl cursor-pointer"
        onClick={() => {
          setMenuOpen(!menuOpen);
          console.log("Estado de menuOpen:", menuOpen); // Depuración
        }}
      ></i>

      {/* Menú móvil */}
      {menuOpen && (
        <div
          className={`fixed top-[150px] left-0 w-full bg-white flex flex-col 
          items-center gap-6 font-semibold text-lg z-[1000] border-b-2 border-gray-300`}
          style={{ transition: "transform 0.3s ease, opacity 0.3s ease" }}
        >
          <NavLink to="/personal" onClick={() => setMenuOpen(false)}>
            <li className="list-none w-screen text-center p-4 hover:bg-blue-600 hover:text-white rounded-md transition-all cursor-pointer">
              Personal
            </li>
          </NavLink>
          <NavLink to="/" onClick={() => setMenuOpen(false)}>
            <li className="list-none w-screen text-center p-4 hover:bg-blue-600 hover:text-white rounded-md transition-all cursor-pointer">
              Sobre nosotros
            </li>
          </NavLink>

          <NavLink to="/contact" onClick={() => setMenuOpen(false)}>
            <li className="list-none w-screen text-center p-4 hover:bg-blue-600 hover:text-white rounded-md transition-all cursor-pointer">
              Contáctanos
            </li>
          </NavLink>
          {authState?.logged && (
            <NavLink to="/admin/addUser" onClick={() => setMenuOpen(false)}>
              <li className="list-none w-screen text-center p-4 hover:bg-blue-600 hover:text-white rounded-md transition-all cursor-pointer">
                Agregar colaborador
              </li>
            </NavLink>
          )}
          <li
            className={
              !authState?.logged
                ? `list-none w-screen text-center 
      p-4 hover:bg-[#B0DEE9] hover:text-white
      rounded-md transition-all cursor-pointer`
                : `list-none w-screen text-center 
      p-4 hover:bg-red-500 hover:text-white
      rounded-md transition-all cursor-pointer`
            }
            onClick={() => {
              setMenuOpen(!menuOpen);
              onLogoutLogin();
            }}
          >
            {authState?.logged ? "Cerrar sesión" : "Iniciar sesión"}
          </li>
        </div>
      )}
    </header>
  );
};

export default Header;
