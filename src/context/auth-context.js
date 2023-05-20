import React, { useState } from "react";
import { collection, getDocs, query, where } from "@firebase/firestore";
import firestore from "../firebase";

export const AuthContext = React.createContext(null);

const initialState = {
  loggedUser: null,
  isLoginPending: false,
  loginError: null,
};

export const ContextProvider = (props) => {
  const [state, setState] = useState(initialState);

  const setLoginPending = (isLoginPending) => setState({ isLoginPending });
  const setLoginSuccess = (loggedUser) => setState({ loggedUser });
  const setLoginError = (loginError) => setState({ loginError });

  const login = (email, password) => {
    setLoginPending(true);
    setLoginSuccess(null);
    setLoginError(null);

    fetchLogin(email, password, (error) => {
      setLoginPending(false);
      if (!error) {
        setLoginSuccess(email);
      } else {
        setLoginError(error);
      }
    });
  };

  const logout = () => {
    setLoginPending(false);
    setLoginSuccess(null);
    setLoginError(null);
  };
  return (
    <AuthContext.Provider
      value={{
        state,
        login,
        logout,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

const fetchLogin = async (email, password, callback) => {
  const ref = collection(firestore, "users");
  const q = query(ref, where("email", "==", email));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    if (doc.data().password === password) {
      return callback(null);
    } else {
      return callback(new Error("Prueba con otro email o contraseña"));
    }
  });
};
