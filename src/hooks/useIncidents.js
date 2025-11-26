import { useEffect, useState } from "react";
import { listenToIncidents } from "../services/incidentService";

export default function useIncidents() {
  const [incidents, setIncidents] = useState([]);

  useEffect(() => {
    const unsubscribe = listenToIncidents((list) => {
      setIncidents(list);
    });

    return () => unsubscribe();
  }, []);

  return incidents;
}
