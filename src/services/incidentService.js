import { 
  collection, addDoc, updateDoc, deleteDoc, doc, 
  query, where, onSnapshot, getDocs 
} from "firebase/firestore";

import { db } from "../firebase/config";

// ADD NEW INCIDENT
export async function addIncident(data) {
  return await addDoc(collection(db, "incidents"), {
    ...data,
    verified: false,          // default value
    timestamp: new Date()     // backend time
  });
}

// REAL-TIME LISTENER FOR ALL INCIDENTS
export function listenToIncidents(callback) {
  return onSnapshot(collection(db, "incidents"), (snapshot) => {
    const incidents = [];
    snapshot.forEach((docItem) => {
      incidents.push({ id: docItem.id, ...docItem.data() });
    });
    callback(incidents);
  });
}

// FILTER BY CATEGORY
export async function getIncidentsByCategory(category) {
  const q = query(collection(db, "incidents"), where("category", "==", category));
  const snapshot = await getDocs(q);
  
  return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
}

// FILTER BY SEVERITY
export async function getIncidentsBySeverity(severity) {
  const q = query(collection(db, "incidents"), where("severity", "==", severity));
  const snapshot = await getDocs(q);

  return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
}

// FETCH INCIDENTS OF CURRENT USER
export async function getMyIncidents(userId) {
  const q = query(collection(db, "incidents"), where("userId", "==", userId));
  const snapshot = await getDocs(q);

  return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
}

// VERIFY INCIDENT (ADMIN ONLY)
export async function verifyIncident(id) {
  return await updateDoc(doc(db, "incidents", id), {
    verified: true
  });
}

// DELETE INCIDENT (ADMIN ONLY)
export async function deleteIncident(id) {
  return await deleteDoc(doc(db, "incidents", id));
}
