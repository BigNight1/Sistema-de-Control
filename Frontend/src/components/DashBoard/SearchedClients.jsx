import { AgGridReact } from "ag-grid-react";
import { DashClient } from "../../context/DashContext.jsx";

const SearchedClients = () => {
  const { Clients } = DashClient();
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
    <div
      className="ag-theme-alpine overflow-x-auto rounded-md mt-4"
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
  );
};

export default SearchedClients;
