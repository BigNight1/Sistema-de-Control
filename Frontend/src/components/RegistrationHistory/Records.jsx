import { useEffect, useState } from "react";
import { RegistroClient } from "../../context/RegistroContext";
import TableInfo from "./TableInfo";

const Records = () => {
  const [data, setData] = useState([]);
  const { registro, getRegistros } = RegistroClient();

  useEffect(() => {
    getRegistros();
  }, []);

  useEffect(() => {
    if (registro) {
      setData(registro);
    }
  }, [registro]);

  if (data.length === 0) {
    return <div>Loading...</div>;
  }

  const formatDate = (dateString) => {
    const options = { weekday: "long", day: "2-digit", month: "2-digit" };
    return new Date(dateString).toLocaleDateString("es-ES", options);
  };

  return (
    <div >
      <TableInfo/>
      {/* <div className="flex gap-2">
        {data.map((entry, index) => (
          <div key={entry._id || index} className="w-full">
            <h3 className="mt-8 text-lg font-medium text-center">
              {formatDate(entry.fecha)}
            </h3>

            <table className="min-w-full divide-y divide-gray-200 mt-4">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ingreso Efectivo
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ingreso Yape/Pli
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Detalles
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Gastos Efectivo
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Gastos Yape/Pli
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Detalles
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {entry.ingresos.map((ingreso, index) => {
                  const gastoEfectivo = entry.gastos.find(
                    (gasto) => gasto.tipo === "efectivo"
                  );
                  const gastoYapePli = entry.gastos.find(
                    (gasto) => gasto.tipo === "pli"
                  );
                  return (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {ingreso.tipo === "efectivo" ? ingreso.monto : 0}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {ingreso.tipo === "yape"
                          ? ingreso.monto
                          : ingreso.tipo === "pli"
                          ? ingreso.monto
                          : 0}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {ingreso.detalles}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {gastoEfectivo ? gastoEfectivo.monto : 0}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {gastoYapePli ? gastoYapePli.monto : 0}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {gastoEfectivo
                          ? gastoEfectivo.detalles
                          : gastoYapePli
                          ? gastoYapePli.detalles
                          : ""}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ))}
      </div> */}
    </div>
  );
};

export default Records;
