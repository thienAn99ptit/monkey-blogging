import { onAuthStateChanged } from "firebase/auth";
import { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { createContext } from "react";
import { auth } from "../firebase/firebase-config";

const AuthContext = createContext();

function AuthProvider(props) {
const [userInfor, setUserInfor] = useState({});
  const value = { userInfor, setUserInfor };
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUserInfor(user);
    });
  }, []);
  return <AuthContext.Provider value={value} {...props}></AuthContext.Provider>;
}

function useAuth() {
  const context = useContext(AuthContext);
  if (typeof context === "undefined")
    throw new Error("useAuth must be used within AuhProvide");
  return context;
}

export { AuthProvider, useAuth };
