import React, { useEffect } from "react";
import { useClient } from "../context/ClientContext";
import Board from "../components/Clientes/Board";
import SearchCliente from "../components/Clientes/SearchClient";

const Clientes = () => {
  const {
    getClients,
    deleteClient,
    client,
    searchTerms,
    filteredResults,
    SearchClient,
    setFilteredResults,
  } = useClient();
  useEffect(() => {
    getClients();
  }, []);
  useEffect(() => {
    if (searchTerms) {
      SearchClient(searchTerms);
    } else {
      setFilteredResults(client);
    }
  }, [searchTerms, client]);
  return (
    <div className="my-2">
      <SearchCliente />
      <Board
        searchTerms={searchTerms}
        filteredResults={filteredResults}
        client={client}
        deleteClient={deleteClient}
      />
    </div>
  );
};

export default Clientes;
