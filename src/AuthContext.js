import { createContext, useState } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Initially no user is logged in

  const login = (userData) => {
    setUser(userData); // Set the logged-in user data
  };

  const logout = () => {
    setUser(null); // Clear the user data on logout
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider }; // Correct export statement
