import { createContext, useContext, useState } from "react";
import { getClient } from "../api/client";

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

  return (
    <ClienContext.Provider
      value={{
        client,
        getClients,
      }}
    >
      {children}
    </ClienContext.Provider>
  );
}
