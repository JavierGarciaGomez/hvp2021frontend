import React from "react";
import { CustomPieChart } from "./CustomPieChart";

export const CleanUpSummaryBranch = ({ branch, data }) => {
  let branchData = data.find((obj) => {
    return obj.branch === branch;
  });

  const { daysCleaned, daysNotCleaned, deepCleanUps, operatingRoomCleanUps } =
    branchData;

  return (
    <div className="col-12 col-lg-3 border-2 border rounded-3 u-borderPrimary mb-4">
      <h3 className="heading--tertiary l-centerContent u-mt-2r">{branch}</h3>
      <p className="mb-2">Porcentaje de cumplimiento del último mes: </p>
      <div className="pieChartContainer mb-3">
        <CustomPieChart
          data={[{ value: daysCleaned }, { value: daysNotCleaned }]}
        />
      </div>
      <div className="cleanupSummaryCard_data mb-5">
        <p>Días que no se limpió: </p>
        <p className="text-center">{daysNotCleaned}</p>
        <p>Limpiezas profundas realizadas en los últimos 30 días: </p>
        <p className="text-center">{deepCleanUps}</p>
        <p>Limpiezas en quirófano en los últimos 30 días: </p>
        <p className="text-center">{operatingRoomCleanUps}</p>
      </div>
    </div>
  );
};
