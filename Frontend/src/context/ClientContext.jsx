import { createContext, useContext, useState } from "react";
import { DeleteClient, getClient } from "../api/client";

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
        setClient(prevClients => prevClients.filter((client) => client._id !== id));
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
      }}
    >
      {children}
    </ClienContext.Provider>
  );
}
