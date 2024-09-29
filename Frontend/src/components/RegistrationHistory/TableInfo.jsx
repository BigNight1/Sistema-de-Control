import React, { useEffect, useState } from "react";
import { RegistroClient } from "../../context/RegistroContext";
import dayjs from "dayjs";
import 'dayjs/locale/es'; // Importa el idioma español

// Configura dayjs para usar el idioma español
dayjs.locale('es');

// Función para obtener las fechas de lunes a domingo de la semana actual
const getWeekDates = () => {
  const startOfWeek = dayjs().startOf('week');
  return Array.from({ length: 7 }, (_, i) => startOfWeek.add(i, 'day'));
};

const TableInfo = () => {
  const { totales, getTotales } = RegistroClient();
  const [data, setData] = useState({});
  const weekDates = getWeekDates();

  useEffect(() => {
    getTotales();
  }, []);

  useEffect(() => {
    if (totales && typeof totales === 'object') {
      const newData = {};
      weekDates.forEach(date => {
        const formattedDate = date.format('YYYY-MM-DD');
        const dayName = date.format('dddd').toLowerCase();
        newData[dayName] = totales[formattedDate] || {};
      });
      setData(newData);
    }
  }, [totales]);

  console.log('Datos semanales:', data);

  return (
    <div className="flex gap-3 md:overflow-x-auto md:overflow-visible sm:w-[950px] xl:w-[1400px] ">
  {weekDates.map(date => {
    const dayName = date.format('dddd').toLowerCase();
    const total = data[dayName] || {};
    return (
      <div key={dayName} className="mb-4">
        <table className="table-auto min-w-[220px] max-w-sm border border-gray-300">
          <thead>
            <tr className="bg-gray-200 text-gray-600">
              <th className="px-4 py-3" colSpan="2">
                {dayName.charAt(0).toUpperCase() + dayName.slice(1)}
                {date.format(" DD/MM")}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="px-4 py-2 text-left">Ingreso efectivo</td>
              <td className="px-4 py-2 text-right">
                <span>{total.ingresoEfectivo || 0}</span>
              </td>
            </tr>
            <tr>
              <td className="px-4 py-2 text-left">Gastos efectivo</td>
              <td className="px-4 py-2 text-right">
                <span>{total.gastoEfectivo || 0}</span>
              </td>
            </tr>
            <tr>
              <td className="px-4 py-2 text-left">Ingreso Yape/Plin</td>
              <td className="px-4 py-2 text-right">
                <span>{total.ingresoYapePlin || 0}</span>
              </td>
            </tr>
            <tr>
              <td className="px-4 py-2 text-left">Gastos Yape/Plin</td>
              <td className="px-4 py-2 text-right">
                <span>{total.gastoYapePlin || 0}</span>
              </td>
            </tr>
            <tr>
              <td className="px-4 py-2 text-left">Ingreso bruto</td>
              <td className="px-4 py-2 text-right">
                <span>{total.ingresoBruto || 0}</span>
              </td>
            </tr>
            <tr>
              <td className="px-4 py-2 text-left text-red-500">
                Ingreso neto
              </td>
              <td className="px-4 py-2 text-right text-red-500">
                <span>{total.ingresoNeto || 0}</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  })}
</div>


  );
};

export default TableInfo;
