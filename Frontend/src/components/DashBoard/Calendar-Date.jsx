import { useState, useEffect, useRef } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import { IoCalendarSharp } from "react-icons/io5";
import "react-datepicker/dist/react-datepicker.css";
import { es } from "date-fns/locale";
import { DashClient } from "../../context/DashContext";

registerLocale("es", es);

const Calendar = () => {
  const { fetchDailyData, Clients } = DashClient();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const datePickerRef = useRef(null);

  useEffect(() => {
    // Abre el calendario cuando el componente se monta
    datePickerRef.current.setFocus();
  }, []);

  const handleSearch = () => {
    if (selectedDate) {
      fetchDailyData(selectedDate);
    }
  };

  return (
    <div className="relative flex flex-col items-center max-w-sm">
      <div className="flex items-center mb-4">
        <IoCalendarSharp className="text-gray-500 dark:text-gray-400 mr-2" />
        <DatePicker
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          locale="es"
          dateFormat="dd/MM/yyyy"
          placeholderText="Selecciona una fecha"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          ref={datePickerRef}
        />
      </div>
      <button
        onClick={handleSearch}
        className="bg-blue-500 text-white px-4 py-2 rounded-lg"
      >
        Buscar
      </button>
      
    </div>
  );
};

export default Calendar;
