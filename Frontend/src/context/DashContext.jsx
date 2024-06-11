import { createContext, useContext, useState } from "react";
import { SumPaymentsyape, SumPaymentscash,SumPaymentsGastos, CountClient,FetchDailyData  } from "../api/dashboard.js";

const DashContext = createContext();

export const DashClient = () => {
  const context = useContext(DashContext);
  if (!context) {
    throw new Error("DashClient Must be used within a taskProvider");
  }
  return context;
};

export function DashProvider({ children }) {
  const [Cash, setCash] = useState(0);
  const [Yape, setYape] = useState(0);
  const [Gasto, setGasto] = useState(0);
  const [Count, setCount] = useState(0);
  const [Clients, setClients] = useState([]);
  const [dailyData, setDailyData] = useState(null); // Estado para almacenar los datos diarios


  // const sumPaymentsYape = async () => {
  //   try {
  //     const res = await SumPaymentsyape();
  //     setYape(res.data.totalYape);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  // const sumPaymentsCash = async () => {
  //   try {
  //     const res = await SumPaymentscash();
  //     setCash(res.data.totalCash);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  // const sumPaymentsGastos = async () => {
  //   try {
  //     const res = await SumPaymentsGastos();
  //     setGasto(res.data.totalGasto);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  const CounterClient = async () => {
    try {
      const res = await CountClient();
      setCount(res.data.totalCliente);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchDailyData = async (date) => {
    try {
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const year = date.getFullYear();
      const res = await FetchDailyData(day, month, year);
      setClients(res.data.clients);
      setCash(res.data.dailyData.totalEfectivo)
      setYape(res.data.dailyData.totalYape)
      setGasto(res.data.dailyData.totalGastos)
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <DashContext.Provider
      value={{
        // sumPaymentsYape,
        // sumPaymentsCash,
        CounterClient,
        // sumPaymentsGastos,
        fetchDailyData,
        Cash,
        Yape,
        Gasto,
        Count,
        Clients,
        dailyData
      }}
    >
      {children}
    </DashContext.Provider>
  );
}
