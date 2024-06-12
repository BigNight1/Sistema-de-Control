import React, { useEffect, useState } from "react";
import { DashClient } from "../../context/DashContext";
import DashboardCard from "./DashBoardCard";
import { Card } from "@tremor/react";
import Calendar from "./Calendar-Date.jsx";
import SearchedClients from "./SearchedClients.jsx";

const CounterCash = () => {
  const { CounterClient, Gasto, Count, Cash, Yape } = DashClient();
  const [selectedPayment, setSelectedPayment] = useState("cash");
  const [optionsOrder, setOptionsOrder] = useState(["cash", "yape"]);

  useEffect(() => {
    CounterClient();
  }, []);

  useEffect(() => {
    if (selectedPayment === "cash") {
      setOptionsOrder(["cash", "yape"]);
    } else {
      setOptionsOrder(["yape", "cash"]);
    }
  }, [selectedPayment]);

  return (
    <div className="flex flex-col h-full justify-between">
      <div className="flex gap-4 ">
        <DashboardCard
          title="Clientes"
          value={Count}
          color=""
          decorationColor="indigo"
        />

        <Card
          className={` w-64 ${
            selectedPayment === "cash" ? "bg-green-100" : "bg-purple-100"
          }`}
          decoration="top"
          decorationColor="indigo"
        >
          <div className="flex justify-between items-center">
            <select
              className="text-tremor-default text-tremor-content dark:text-dark-tremor-content bg-transparent border-none"
              value={selectedPayment}
              onChange={(e) => setSelectedPayment(e.target.value)}
            >
              {optionsOrder.map((option) => (
                <option key={option} value={option}>
                  {option === "cash" ? "Efectivo" : "Yape"}
                </option>
              ))}
            </select>
          </div>
          <p className="text-3xl text-tremor-content-strong dark:text-dark-tremor-content-strong font-semibold">
            {selectedPayment === "yape" ? `S/${Yape}` : `S/${Cash}`}
          </p>
        </Card>

        <DashboardCard
          title="Gastos"
          value={`- ${Gasto}`}
          color="bg-red-50"
          decorationColor="red"
        />
        <Calendar />
      </div>

      <SearchedClients />
    </div>
  );
};

export default CounterCash;
