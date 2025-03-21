import axios from "axios";
import { createContext, useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);

  const saveUser = (user) => {
    setUser(user);
  };

  const removeUser = () => {
    setUser(null);
  };

  const fetchUser = async () => {
    try {
      const { data } = await axios.get("/api/v1/users/showMe");
      saveUser(data.user);
    } catch (error) {
      console.log(error);
      removeUser();
    }
    setIsLoading(false);
  };

  const logoutUser = async () => {
    try {
      await axios.delete("/api/v1/auth/logout");
      removeUser();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <AppContext.Provider
      value={{
        isLoading,
        saveUser,
        user,
        logoutUser,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// Hook personalizado para usar el contexto global
export const useGlobalContext = () => {
  return useContext(AppContext);
};

AppProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { AppProvider };
