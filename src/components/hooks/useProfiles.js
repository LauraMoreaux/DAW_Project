import { collection, getDocs, query, where } from "@firebase/firestore";
import firestore from "../../firebase";
import { useEffect, useRef, useState, useContext } from "react";
import { AuthContext } from "../../context/auth-context";

const useProfiles = () => {
  const ref = collection(firestore, "users");
  const { state } = useContext(AuthContext);
  const { isLoggedUserMentor, loggedUserTech } = state;
  const [profiles, setProfiles] = useState([]);
  const effectRun = useRef(false);
  let querySnapshot;
  const queryAllProfiles = query(
    ref,
    where("mentor", "==", !isLoggedUserMentor)
  );
  const queryTechnologies = query(
    ref,
    where("mentor", "==", !isLoggedUserMentor),
    where(
      "tecnologies",
      loggedUserTech.length > 0 ? "array-contains-any" : "",
      loggedUserTech
    )
  );

  const getProfiles = async () => {
    if (loggedUserTech.length > 0) {
      querySnapshot = await getDocs(queryTechnologies);
    } else {
      querySnapshot = await getDocs(queryAllProfiles);
    }
    querySnapshot.forEach((doc) => {
      setProfiles((oldArray) => [...oldArray, doc.data()]);
    });
  };

  useEffect(() => {
    if (effectRun.current === false) {
      getProfiles();
    }
    return () => (effectRun.current = true);
  }, []);

  console.log(profiles);

  return { profiles };
};

export default useProfiles;
