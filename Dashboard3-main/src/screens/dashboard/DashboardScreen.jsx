import React from "react";
import { AreaCards, AreaCharts, AreaTable, AreaTop } from "../../components";

const Dashboard = ({ title }) => {
  return (
    <div className="content-area">
      <h1>{title}</h1>
      <AreaTop />
      <AreaCards />
      <AreaCharts />
      <AreaTable />
    </div>
  );
};

export default Dashboard;
