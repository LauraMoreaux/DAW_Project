import { collection, getDocs, query, where } from "@firebase/firestore";
import firestore from "../../firebase";
import { useEffect, useRef, useState } from "react";

const useProfiles = () => {
  const ref = collection(firestore, "users");
  const [mentors, setMentor] = useState([]);
  const effectRun = useRef(false);

  const getMentors = async () => {
    const q = query(ref, where("mentor", "==", true));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      setMentor((oldArray) => [...oldArray, doc.data()]);
    });
  };

  useEffect(() => {
    if (effectRun.current === false) {
      getMentors();
    }
    return () => (effectRun.current = true);
  }, []);

  return { mentors };
};

export default useProfiles;
