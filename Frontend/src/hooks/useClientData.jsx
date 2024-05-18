// src/hooks/useClientData.js
import { useEffect, useState } from "react";
import { useClient } from "../context/ClientContext.jsx";
import { SearchName } from "../api/search.js";

const useClientData = () => {
  const { getClients, client, deleteClient } = useClient();
  const [searchTerms, setSearchTerms] = useState("");
  const [filteredResults, setFilteredResults] = useState([]);

  useEffect(() => {
    getClients();
  }, [getClients]);

  useEffect(() => {
    if (searchTerms) {
      const fetchData = async () => {
        try {
          const response = await SearchName(searchTerms);
          setFilteredResults(response.data);
        } catch (error) {
          console.error("Error al buscar clientes", error);
        }
      };
      fetchData();
    } else {
      setFilteredResults(client);
    }
  }, [searchTerms, client]);

  return {
    searchTerms,
    setSearchTerms,
    filteredResults,
    deleteClient,
    client
  };
};

export default useClientData;
