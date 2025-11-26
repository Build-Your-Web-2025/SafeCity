import { db } from '../firebase/config';
import { collection, addDoc, getDocs, query, orderBy, serverTimestamp } from 'firebase/firestore';

const INCIDENTS_COLLECTION = 'incidents';

// Renamed to 'addIncident' to match your Frontend import
export const addIncident = async (incidentData) => {
    try {
        const docRef = await addDoc(collection(db, INCIDENTS_COLLECTION), {
            ...incidentData,
            // Use serverTimestamp for consistent sorting across different users' devices
            timestamp: serverTimestamp(),
            // Ensure defaults
            status: incidentData.status || 'Open',
            verified: incidentData.verified || false
        });
        return { success: true, id: docRef.id };
    } catch (error) {
        console.error("Error adding incident:", error);
        throw error;
    }
};

// This fetches data once (non-realtime). 
// Note: Your Dashboard uses the 'useIncidents' hook for real-time updates instead.
export const getIncidents = async () => {
    try {
        const q = query(collection(db, INCIDENTS_COLLECTION), orderBy('timestamp', 'desc'));
        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
        console.error("Error getting incidents:", error);
        throw error;
    }
};