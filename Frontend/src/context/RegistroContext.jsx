import { createContext, useContext, useState } from "react";
import { GetRegistros, GetTotales } from "../api/registro";

const RegistoContext = createContext();

export const RegistroClient = () => {
  const context = useContext(RegistoContext);
  if (!context) {
    throw new Error("RegistroClient Mush be used within a taskProvider");
  }
  return context;
};

export function RegistroProvider({ children }) {
  const [registro, setRegistro] = useState([]);
  const [totales, setTotales] = useState([]);

  const getRegistros = async () => {
    try {
      const res = await GetRegistros();
      setRegistro(res.data);
    } catch (error) {
      console.log("Error en conseguir los datos de Registros", error);
    }
  };

  const getTotales = async()=>{
    try {
      const res = await GetTotales()
      setTotales(res.data)
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <RegistoContext.Provider
      value={{
        getRegistros,
        registro,
        getTotales,
        totales
      }}
    >
      {children}
    </RegistoContext.Provider>
  );
}
