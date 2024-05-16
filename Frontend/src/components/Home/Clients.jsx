import React, { useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { ImExit } from "react-icons/im";
import { FaEdit } from "react-icons/fa";
import { IoIosCreate } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import { useClient } from "../../context/ClientContext.jsx";

const Home = () => {
  const { getClients, client } = useClient();

  useEffect(() => {
    getClients();
  }, []);

  return (
    <>
      <div className="flex h-screen">
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
              <FaSearch className="mr-2 text-[#6b737e]" />
              <h2>Buscar</h2>
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
              {client.map((task) => (
                <tr key={task._id}>
                  <td className="text-center px-4 py-2 border border-gray-300">{task.fecha}</td>
                  <td className="px-4 py-2 border border-gray-300">{task.nombre}</td>
                  <td className="px-4 py-2 border border-gray-300">{task.numero}</td>
                  <td className="px-4 py-2 border border-gray-300">{task.trabajo}</td>
                  <td className="px-4 py-2 border border-gray-300"><span>S/</span>{task.adelanto}</td>
                  <td className="px-4 py-2 border border-gray-300"><span>S/</span>{task.efectivo}</td>
                  <td className="px-4 py-2 border border-gray-300"><span>S/</span>{task.yape}</td>
                  <td className="px-4 py-2 border border-gray-300">{task.estado}</td>
                  <td className="px-4 py-2 border border-gray-300">
                    <div className="flex items-center gap-1">
                      <FaEdit />
                      <MdDelete />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Home;
