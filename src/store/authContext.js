import { useState, useEffect, createContext } from "react";
import axios from "axios";

const AuthContext = createContext({
  userId: null,
  login: () => {},
  logout: () => {},
});

export const AuthContextProvider = (props) => {
  const [userId, setUserId] = useState(null);

  const login = (userId) => {
    setUserId(userId);
  };
  const logout = () => {
    axios
      .post("/api/logout")
      .then((res) => setUserId(null))
      .catch((err) => console.log(err))
  };
  const contextValue = {
    userId,
    login,
    logout,
  };
  useEffect(() => {
    axios
      .get("/api/user")
      .then((res) => setUserId(res.data.userId))
      .catch((err) => console.log(err))
  }, []);
  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
