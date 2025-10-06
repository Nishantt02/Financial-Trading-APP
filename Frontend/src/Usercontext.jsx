// src/context/UserContext.jsx
import { createContext, useState, useEffect } from "react";
import API from "./Api.js";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); // stores user info
  const [wallet, setWallet] = useState(100000);

  const fetchUser = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const res = await API.get("/transaction/portfolio", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser({ token }); // store token or more user info
      setWallet(res.data.wallet || 100000);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, wallet, setWallet, fetchUser }}>
      {children}
    </UserContext.Provider>
  );
};
