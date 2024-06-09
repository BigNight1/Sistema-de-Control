import { Route, Routes } from "react-router-dom";
import Welcome from "./pages/Welcome.jsx";
import CreateClient from "./pages/CreateClient.jsx";
import Login from "./components/Login/Login.jsx";
import { ClientProvider } from "./context/ClientContext.jsx";
import Clientes from "./pages/Clientes.jsx";
import PageError from "./pages/PageError.jsx";
import DashBoard from "./components/DashBoard/DashBoard";

function App() {
  return (
    <ClientProvider>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/clientes" element={<Clientes />} />
        <Route path="/clientes/create-client" element={<CreateClient />} />
        <Route path="/Dashboard" element={<DashBoard />} />
        <Route path="/client/:id" element={<CreateClient/>}/>
        <Route path="*" element={<PageError/>} />
      </Routes>
    </ClientProvider>
  );
}

export default App;
