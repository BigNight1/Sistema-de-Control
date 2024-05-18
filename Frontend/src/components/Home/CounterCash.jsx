import React from "react";

const CounterCash = () => {
  return (
    <div className="flex gap-7 pr-4">
      <div className="bg-lime-500 w-[180px] h-[140px] border border-black">
        <div className="flex items-center justify-center h-full text-2xl font-bold">
          <div className="flex flex-col">
            <p className="font-semibold">Ganancias</p>
            <div className="flex justify-center">
              <span>S/</span>
              <p>150</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-red-600 w-[180px] h-[140px] border border-black">
        <div className="flex items-center justify-center h-full text-2xl font-bold">
          <div className="flex flex-col">
            <p className="font-semibold">Gastos</p>
            <div className="flex justify-center">
              <span>-S/</span>
              <p>150</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CounterCash;
