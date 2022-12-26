import { collection, query, where, getDocs } from "firebase/firestore";
import { useState } from "react";
import { db } from "../firebase/firebase-config";
async function useFirebaseData(colName, { name, value }) {
  const [values, setValues] = useState([]);
  let result = [];
  const q = query(collection(db, colName), where(name, "==", value));

  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    result.push({
      id: doc.id,
      ...doc.data(),
    });
    // doc.data() is never undefined for query doc snapshots
    console.log(doc.id, " => ", doc.data());
  });
  setValues(result);
  return { values, setValues };
}

export default useFirebaseData;
