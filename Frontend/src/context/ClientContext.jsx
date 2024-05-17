import { createContext, useContext, useState } from "react";
import { DeleteClient, getClient , createClient} from "../api/client";
import Swal from "sweetalert2"

const ClienContext = createContext();

export const useClient = () => {
  const context = useContext(ClienContext);
  if (!context) {
    throw new Error("useClient Must be used within a taskProvider");
  }
  return context;
};

export function ClientProvider({ children }) {
  const [client, setClient] = useState([]);

  const createClients = async (data) => {
    try {
      // Dependiendo de la forma de pago seleccionada, asignar el precio a efectivo o yape
      if (data.formaPago === "efectivo") {
        data.efectivo = data.precio;
        data.yape = 0;
      } else if (data.formaPago === "yape") {
        data.yape = data.precio;
        data.efectivo = 0;
      }
      delete data.precio; // Eliminar el campo de precio para no enviarlo al backend

      const res = await createClient(data);
      if(res.status === 204){
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Your work has been saved",
          showConfirmButton: false,
          timer: 1500
        });
      }
    } catch (error) {
      console.error("Error al crear el cliente:", error);
    }
  };

  const getClients = async () => {
    try {
      const res = await getClient();
      setClient(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  const deleteClient = async (id) => {
    try {
      const res = await DeleteClient(id);
      if (res.status === 204)
        setClient((prevClients) =>
          prevClients.filter((client) => client._id !== id)
        );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ClienContext.Provider
      value={{
        client,
        getClients,
        deleteClient,
        createClients
      }}
    >
      {children}
    </ClienContext.Provider>
  );
}
