import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import jwtDecode from "jwt-decode";

const AuthContext = createContext();
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = localStorage.getItem("instagram-mern-user");
    if (user) {
      const userObj = JSON.parse(user);
      const { token } = userObj;
      // decode the token
      const decoded = jwtDecode(token);

      setUser(JSON.parse(user));
      setLoading(false);
    } else {
      setLoading(false);
      setUser(null);
    }
  }, []);
  const login = async (email, password) => {
    try {
      const { data } = await axios({
        // url: `${process.env.API_URL}/api/v1/user/login`,
        url: `http://localhost:5000/api/v1/user/login`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        data: { email, password },
      });
      console.log(data);
      localStorage.setItem("instagram-mern-user", JSON.stringify(data));
      setUser(data);
    } catch (error) {
      console.log(error);
    }
  };
  const signUp = async (email, password, username, fullname) => {};
  const logout = async () => {
    setUser(null);
    localStorage.removeItem("instagram-mern-user");
  };
  return (
    <AuthContext.Provider value={{ user, login, logout, signUp }}>
      {loading || children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within a AuthProvider");
  }
  return context;
};

export { useAuth, AuthProvider };
