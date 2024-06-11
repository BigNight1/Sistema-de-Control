import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { Chip,Tooltip } from "@material-tailwind/react";
import { Link } from "react-router-dom";


const Board = ({ searchTerms, filteredResults, client, deleteClient }) => {
  const rowData = searchTerms ? filteredResults : client;

  const columnDefs = [
    { headerName: "Fecha", field: "fecha", sortable: true,  width: 120},
    { headerName: "Nombre", field: "nombre", sortable: true,  width: 120 },
    { headerName: "Número", field: "numero", sortable: true,   width: 120},
    { headerName: "Trabajo", field: "trabajo", sortable: true  },
    { headerName: "Adelanto", field: "adelanto", sortable: true,  width: 130, cellRenderer: params => `S/${params.value}` },
    { headerName: "Efectivo", field: "efectivo", sortable: true,  width: 130, cellRenderer: params => `S/${params.value}` },
    { headerName: "Yape", field: "yape", sortable: true,  width: 130, cellRenderer: params => `S/${params.value}` },
    { headerName: "Precio", field: "precio", sortable: true, width: 130,  cellRenderer: params => `S/${params.value}` },
    { headerName: "Gastos", field: "gastos", sortable: true, width: 140,  cellRenderer: params => `-S/${params.value}` },
    { headerName: "Estado", field: "estado", sortable: true,  cellRenderer: params => (
        <Chip size="sm" variant="ghost" value={params.value} color={
          params.value === "Entregado" ? "green" : params.value === "En proceso" ? "amber" : "red"
        } />
      ) 
    },
    {
      headerName: "Acciones", field: "acciones",  width: 180,cellRenderer: params => (
        <div className="flex justify-center items-center gap-4">
          <Link to={`/client/${params.data._id}`}>
            <FaEdit className="size-[1.3rem]" />
          </Link>
          <Tooltip content="Eliminar" animate={{
            mount: { scale: 1, y: 0 },
            unmount: { scale: 0, y: 25 },
            }}
          >
            <div onClick={() => deleteClient(params.data._id)}>
              <MdDelete className="size-[1.3rem] cursor-pointer	" />
            </div>
          </Tooltip>
        </div>
      )
    }
  ];

  return (
    <div className="ag-theme-alpine m-2 overflow-x-auto shadow rounded-md" style={{ height: 500, width: '100%' }}>
      <AgGridReact
        rowData={rowData}
        columnDefs={columnDefs}
        pagination={true}
        paginationPageSize={10}
        paginationPageSizeSelector={false}  // Ocultar el selector de tamaño de página

      />
    </div>
  );
};

export default Board;
