import { useState, useEffect } from 'react';
import { db } from '../firebase/config';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';

const useIncidents = () => {
    const [incidents, setIncidents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // 1. Reference the collection
        const incidentsRef = collection(db, 'incidents');

        // 2. Create a query (Sort by newest first)
        // Note: You might need to create an index in Firebase Console if this warns you,
        // but for now, we can try without sorting if it fails, or just sort by default.
        const q = query(incidentsRef, orderBy('timestamp', 'desc'));

        // 3. Set up the Real-time Listener
        const unsubscribe = onSnapshot(q, 
            (snapshot) => {
                const incidentsData = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                
                setIncidents(incidentsData);
                setLoading(false);
            }, 
            (error) => {
                console.error("Error fetching incidents:", error);
                setLoading(false);
            }
        );

        // 4. Cleanup listener when component unmounts
        return () => unsubscribe();
    }, []);

    return { incidents, loading };
};

export default useIncidents;