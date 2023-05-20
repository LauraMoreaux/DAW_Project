import React, { useEffect, useState } from "react";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "@firebase/firestore";
import firestore from "../firebase";

export const AuthContext = React.createContext(null);

const initialState = {
  loggedUser: null,
  isLoggedUserMentor: false,
  loggedUserTech: [],
  isLoginPending: true,
  loginError: null,
};

export const ContextProvider = (props) => {
  const [state, setState] = useState(initialState);

  const setLoginPending = (isLoginPending) =>
    setState((prevState) => ({ ...prevState, isLoginPending }));
  const setLoginSuccess = (loggedUser) => {
    setState((prevState) => ({ ...prevState, loggedUser }));
  };
  const setLoginError = (loginError) =>
    setState((prevState) => ({ ...prevState, loginError }));
  const setLoggedUsedProfile = (isLoggedUserMentor) => {
    setState((prevState) => ({ ...prevState, isLoggedUserMentor }));
  };
  const setLoggedUsedTech = (loggedUserTech) => {
    setState((prevState) => ({ ...prevState, loggedUserTech }));
  };

  async function checkLoggedUser() {
    const userIDStoraged = JSON.parse(localStorage.getItem("userID"));
    const docRef = doc(firestore, "users", userIDStoraged);
    if (userIDStoraged) {
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const { email: emailBBDD, mentor, tecnologies } = docSnap.data();
        setLoginSuccess(emailBBDD);
        setLoggedUsedProfile(mentor);
        if (tecnologies) setLoggedUsedTech(tecnologies);
      } else {
        localStorage.removeItem("userID");
      }
    }
  }
  useEffect(() => {
    checkLoggedUser()
      .then(() => setLoginPending(false))
      .catch(() => setLoginPending(false));
  }, []);

  const login = (email, password) => {
    setLoginPending(true);
    setLoginSuccess(null);
    setLoginError(null);

    fetchLogin(email, password, (error) => {
      setLoginPending(false);
      if (!error) {
        setLoginSuccess(email);
        checkLoggedUser();
      } else {
        setLoginError(error);
      }
    });
  };

  const logout = () => {
    setLoginPending(false);
    setLoginSuccess(null);
    setLoginError(null);
    setLoggedUsedTech([]);
    setLoggedUsedProfile(false);
    localStorage.removeItem("userID");
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
      localStorage.setItem("userID", JSON.stringify(doc.id));
      return callback(null);
    } else {
      return callback(new Error("Prueba con otro email o contraseña"));
    }
  });
  return callback(new Error("Prueba con otro email o contraseña"));
};
