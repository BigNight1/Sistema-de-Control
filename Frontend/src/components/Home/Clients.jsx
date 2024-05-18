import React, { useEffect, useState } from "react";
import { ImExit } from "react-icons/im";
import { FaEdit } from "react-icons/fa";
import { IoIosCreate } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import { useClient } from "../../context/ClientContext.jsx";
import CounterCash from "./CounterCash.jsx";
import SearchCliente from "./SearchClient.jsx";
import Board from "./Board";

const Home = () => {
  const {
    client,
    getClients,
    deleteClient,
    SearchClient,
    searchTerms,
    filteredResults,
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
    <>
      <div className="flex h-screen">
        {/* Panel del Admin */}
        <div className="bg-[#32404e] w-[15%] p-4 ">
          <div className="flex items-center">
            <img
              src="/Img/images.jpeg"
              alt=""
              className="rounded-full h-[40px] w-[40px] object-cover"
            />
            <h2 className="pl-2 text-white">Martin Armas</h2>
          </div>
          <div>
            <Link
              to="/create-client"
              className="flex items-center gap-2 text-[#6b737e] pt-4 hover:text-white cursor-pointer text-xl"
            >
              <IoIosCreate className="mr-2 text-[#6b737e]" />
              <h2>Create</h2>
            </Link>

            <Link
              to="/"
              className="flex items-center gap-2 text-[#6b737e] pt-4 hover:text-white cursor-pointer text-xl"
            >
              <ImExit className="mr-2 text-[#6b737e]" />
              <h2>Exit</h2>
            </Link>
          </div>
        </div>

        <div className="w-[85%] p-2">
          <div className="flex justify-between">
            {/* BUSCADOR POR NOMBRE */}
            <SearchCliente />

            {/* GANANCIAS Y GASTOS */}
            <CounterCash />
          </div>

          {/* TABLA DE CLIENTES */}
          <Board
            searchTerms={searchTerms}
            filteredResults={filteredResults}
            client={client}
            deleteClient={deleteClient}
          />
        </div>
      </div>
    </>
  );
};

export default Home;
