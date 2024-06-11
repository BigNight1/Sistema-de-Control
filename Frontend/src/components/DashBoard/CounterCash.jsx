import React, { useEffect, useState } from "react";
import { DashClient } from "../../context/DashContext";
import DateComponent from "./Date";
import DashboardCard from "./DashBoardCard";
import { Card } from "@tremor/react";
import { AgGridReact } from "ag-grid-react";

const CounterCash = () => {
  const {
    CounterClient,
    // sumPaymentsYape,
    // sumPaymentsCash,
    // sumPaymentsGastos,
    Gasto,
    Count,
    Cash,
    Yape,
    Clients,
    
  } = DashClient();
  const [selectedPayment, setSelectedPayment] = useState("cash");
  const [optionsOrder, setOptionsOrder] = useState(["cash", "yape"]);

  useEffect(() => {
    CounterClient();
    // sumPaymentsYape();
    // sumPaymentsCash();
    // sumPaymentsGastos();
  }, []);

  useEffect(() => {
    if (selectedPayment === "cash") {
      setOptionsOrder(["cash", "yape"]);
    } else {
      setOptionsOrder(["yape", "cash"]);
    }
  }, [selectedPayment]);
  
  const columnDefs = [
    { headerName: "Fecha", field: "fecha", sortable: true, width: 120 },
    { headerName: "Nombre", field: "nombre", sortable: true },
    { headerName: "Número", field: "numero", sortable: true },
    { headerName: "Trabajo", field: "trabajo", sortable: true },
    {
      headerName: "Adelanto",
      field: "adelanto",
      sortable: true,
      cellRenderer: (params) => `S/${params.value}`,
    },
    {
      headerName: "Efectivo",
      field: "efectivo",
      sortable: true,
      cellRenderer: (params) => `S/${params.value}`,
    },
    {
      headerName: "Yape",
      field: "yape",
      sortable: true,
      cellRenderer: (params) => `S/${params.value}`,
    },
    {
      headerName: "Precio",
      field: "precio",
      sortable: true,
      cellRenderer: (params) => `S/${params.value}`,
    },
    {
      headerName: "Gastos",
      field: "gastos",
      sortable: true,
      width: 150,
      cellRenderer: (params) => `-S/${params.value}`,
    },
  ];

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
        <DateComponent />
      </div>

      <div
        className="ag-theme-alpine m-2 overflow-x-auto rounded-md mt-4"
        style={{ height: 520 }}
      >
        <AgGridReact
          columnDefs={columnDefs}
          rowData={Clients}
          pagination={true}
          paginationPageSize={10}
          paginationPageSizeSelector={false} // Ocultar el selector de tamaño de página
        />
      </div>
    </div>
  );
};

export default CounterCash;
