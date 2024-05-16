import { Route, Routes } from "react-router-dom";
import Home from "./components/Home/Clients.jsx";
import CreateClient from "./components/CreateClient/CreateClient.jsx";
import { ClientProvider } from "./context/ClientContext.jsx";

function App() {
  return (
    <ClientProvider>
      <Routes>
        <Route path="/clients" element={<Home />} />
        <Route path="/create-client" element={<CreateClient />} />
      </Routes>
    </ClientProvider>
  );
}

export default App;
