import { useState, useEffect } from 'react';
import { db } from '../firebase/config';
import { collection, query, where, orderBy, onSnapshot } from 'firebase/firestore';
import useAuth from './useAuth';

const useUserIncidents = () => {
    const { user } = useAuth();
    const [incidents, setIncidents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user) {
            setLoading(false);
            return;
        }

        const incidentsRef = collection(db, 'incidents');
        
        // Query: Filter by userId AND sort by timestamp
        // Note: Firestore requires a composite index for this specific query (where + orderBy).
        // If you see an error in the console with a link, click it to auto-create the index!
        const q = query(
            incidentsRef, 
            where('userId', '==', user.uid), 
            orderBy('timestamp', 'desc')
        );

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
                console.error("Error fetching user incidents:", error);
                setLoading(false);
            }
        );

        return () => unsubscribe();
    }, [user]);

    return { incidents, loading };
};

export default useUserIncidents;