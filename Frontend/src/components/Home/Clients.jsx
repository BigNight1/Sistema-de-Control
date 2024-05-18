import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { ImExit } from "react-icons/im";
import { FaEdit } from "react-icons/fa";
import { IoIosCreate } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import { useClient } from "../../context/ClientContext.jsx";
import { SearchName } from "../../api/search.js"; // Asegúrate de importar correctamente

const Home = () => {
  const { getClients, client, deleteClient } = useClient();
  const [searchTerms, setSearchTerms] = useState("");
  const [filteredResults, setFilteredResults] = useState([]);

  useEffect(() => {
    getClients();
  }, []);

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

  return (
    <>
      <div className="flex h-screen">
        {/* Panel del Admin */}
        <div className="bg-[#32404e] w-1/6 p-4 mr-2">
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

        <div className="my-2 w-full">
          <div className="flex">
            {/* BUSCADOR POR NOMBRE */}
            <div className="flex items-end mr-3">
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

            {/* GANANCIAS Y GASTOS */}
            <div className="flex gap-7">
              <div className="bg-lime-500 w-[180px] h-[140px] border border-black">
                <div className="flex items-center justify-center h-full text-2xl font-bold">
                  <div className="flex flex-col">
                    <p className="font-semibold">Ganancias</p>
                    <div className="flex justify-center">
                      <span>S/</span>
                      <p>150</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-red-600 w-[180px] h-[140px] border border-black">
                <div className="flex items-center justify-center h-full text-2xl font-bold">
                  <div className="flex flex-col">
                    <p className="font-semibold">Gastos</p>
                    <div className="flex justify-center">
                      <span>-S/</span>
                      <p>150</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* TABLA DE CLIENTES */}
          <div className="mt-4 overflow-x-auto shadow rounded-md">

            <table className="table-auto w-full min-w-max">
              <thead>
                <tr>
                  <th className="text-center px-4 py-2 bg-gray-200">Fecha</th>
                  <th className="px-4 py-2 bg-gray-200">Nombre</th>
                  <th className="px-4 py-2 bg-gray-200">Número</th>
                  <th className="px-4 py-2 bg-gray-200">Trabajo</th>
                  <th className="px-4 py-2 bg-gray-200">Adelanto</th>
                  <th className="px-4 py-2 bg-gray-200">Efectivo</th>
                  <th className="px-4 py-2 bg-gray-200">Yape</th>
                  <th className="px-4 py-2 bg-gray-200">Estado</th>
                  <th className="px-4 py-2 bg-gray-200">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {(searchTerms ? filteredResults : client).map((task) => (
                  <tr key={task._id}>
                    <td className="text-center px-4 py-2 border border-gray-300">
                      {task.fecha}
                    </td>
                    <td className="px-4 py-2 border border-gray-300">
                      {task.nombre}
                    </td>
                    <td className="px-4 py-2 border border-gray-300">
                      {task.numero}
                    </td>
                    <td className="px-4 py-2 border border-gray-300">
                      {task.trabajo}
                    </td>
                    <td className="px-4 py-2 border border-gray-300">
                      <span>S/</span>
                      {task.adelanto}
                    </td>
                    <td className="px-4 py-2 border border-gray-300">
                      <span>S/</span>
                      {task.efectivo}
                    </td>
                    <td className="px-4 py-2 border border-gray-300">
                      <span>S/</span>
                      {task.yape}
                    </td>
                    <td className="px-4 py-2 border border-gray-300">
                      {task.estado}
                    </td>
                    <td className="px-4 py-2 border border-gray-300">
                      <div className="flex items-center gap-4">
                        <FaEdit className="size-[1.3rem]" />
                        <MdDelete
                          onClick={() => {
                            deleteClient(task._id);
                          }}
                          className="size-[1.3rem]"
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
