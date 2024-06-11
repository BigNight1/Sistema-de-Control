import React from "react";
import CounterCash from "./CounterCash.jsx";
import Sliderbar from "../Welcome/Sliderbar";

const DashBoard = () => {
  return (
    <div className="dashBoard flex h-screen">
      <Sliderbar/>
      <div className="flex-grow p-4">
        <CounterCash />
      </div>
    </div>
  );
};

export default DashBoard;
