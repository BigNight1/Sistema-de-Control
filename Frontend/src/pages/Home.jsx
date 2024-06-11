import React from "react";
import Sliderbar from "../components/Welcome/Sliderbar";
import ViewClientes from "../components/Clientes/ViewClientes";

export function Home() {
  return (
    <div className="home flex h-screen">
    <Sliderbar />
    <div className="homeContainer flex-grow p-4 ">
      <ViewClientes />
    </div>
  </div>
  );
}

export default Home;
