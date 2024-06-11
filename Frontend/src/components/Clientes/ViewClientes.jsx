import React, { useEffect } from "react";
import { useClient } from "../../context/ClientContext";
import Board from "./Board";
import SearchCliente from "./SearchClient";

const ViewClientes = () => {
  const {
    getClients,
    deleteClient,
    client,
    searchTerms,
    filteredResults,
    SearchClient,
    setFilteredResults,
    getClient
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
        getClient={getClient}
      />
    </div>
  );
};

export default ViewClientes;
