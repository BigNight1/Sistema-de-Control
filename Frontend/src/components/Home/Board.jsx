import React from "react";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";


const Board = ({searchTerms,
  setSearchTerms,
  filteredResults,
  deleteClient,client}) => {
  return (
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
  );
};

export default Board;
