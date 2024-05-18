import React from "react";
import { useClient } from "../../context/ClientContext";
import { FaSearch } from "react-icons/fa";

const SearchCliente = () => {
  const { searchTerms, setSearchTerms } = useClient();
  return (
    <div className="flex items-end ">
      <div className="flex items-center">
        <FaSearch className="text-2xl mr-1" />
        <input
          type="text"
          placeholder="Buscar Nombre"
          className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          value={searchTerms}
          onChange={(e) => setSearchTerms(e.target.value)}
        />
      </div>
    </div>
  );
};

export default SearchCliente;
