import { db } from '../firebase/config';
import { collection, addDoc, getDocs, query, orderBy } from 'firebase/firestore';

const INCIDENTS_COLLECTION = 'incidents';

export const reportIncident = async (incidentData) => {
    return await addDoc(collection(db, INCIDENTS_COLLECTION), {
        ...incidentData,
        createdAt: new Date()
    });
};

export const getIncidents = async () => {
    const q = query(collection(db, INCIDENTS_COLLECTION), orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};
