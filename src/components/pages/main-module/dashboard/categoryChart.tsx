import React from "react";
import type { ApexOptions } from "apexcharts";
import dynamic from "next/dynamic";

// ✅ Dynamic import (SSR disabled)
const Chart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

const CategoryChart: React.FC = () => {
  const options: ApexOptions = {
    chart: {
      type: "donut",
      height: 175,
    },
    labels: ["Delivery", "Reservation", "Take Away", "Dine"],
    colors: ["#14B51D", "#FFA80B", "#0D76E1", "#A91CFF"],
    stroke: {
      width: 0,
    },
    plotOptions: {
      pie: {
        donut: {
          size: "60%",
          labels: {
            show: true,
            name: {
              show: true,
              offsetY: -10,
              fontSize: "14px",
            },
            value: {
              show: true,
              offsetY: 10,
              color: "#333",
              fontSize: "24px",
              formatter: (value: string) => `${value}%`,
            },
            total: {
              show: false,
              label: "Leads",
              formatter: () => "589",
            },
          },
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: false,
    },
  };

  const series = [30, 20, 15, 35];

  return (
    <div id="category-chart">
      <Chart options={options} series={series} type="donut" height={175} />
    </div>
  );
};

export default CategoryChart;
