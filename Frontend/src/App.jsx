import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home.jsx";
import CreateClient from "./pages/CreateClient.jsx";
import Login from "./components/Login/Login.jsx";
import { ClientProvider } from "./context/ClientContext.jsx";
import PageError from "./pages/PageError.jsx";
import DashBoard from "./components/DashBoard/DashBoard";
import Clientes from "./pages/Clientes";
import { DashProvider } from "./context/DashContext";
import RegistrationHistory from "./components/RegistrationHistory/RegistrationHistory";
import { RegistroProvider } from "./context/RegistroContext";

function App() {
  return (
    <ClientProvider>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/clientes" element={<Clientes />} />
        <Route path="/clientes/create-client" element={<CreateClient />} />
        <Route
          path="/Dashboard"
          element={
            <DashProvider>
              <DashBoard />
            </DashProvider>
          }
        />
        <Route
          path="/registro"
          element={
            <RegistroProvider>
              <RegistrationHistory />
            </RegistroProvider>
          }
        />
        <Route path="/client/:id" element={<CreateClient />} />
        <Route path="*" element={<PageError />} />
      </Routes>
    </ClientProvider>
  );
}

export default App;
