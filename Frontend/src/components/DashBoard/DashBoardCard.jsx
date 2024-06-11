import React from "react";
import { Card } from "@tremor/react";

const DashboardCard = ({ title, value, color, decorationColor }) => {
  return (
    <Card className={` w-64 ${color}`} decoration="top" decorationColor={decorationColor}>
      <p className="text-tremor-default text-tremor-content dark:text-dark-tremor-content">
        {title}
      </p>
      <p className="text-3xl text-tremor-content-strong dark:text-dark-tremor-content-strong font-semibold">
        {value}
      </p>
    </Card>
  );
};

export default DashboardCard;
