import React from "react";
import type { ApexOptions } from "apexcharts";
import dynamic from "next/dynamic";
// ✅ Dynamic import (SSR disabled)
const Chart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

const RevenueChart: React.FC = () => {
  const options: ApexOptions = {
    chart: {
      height: 220,
      type: "bar",
      toolbar: { show: false },
    },
    plotOptions: {
      bar: {
        borderRadius: 10,
        dataLabels: {
          position: "top",
        },
      },
    },
    dataLabels: {
      enabled: true,
      formatter: (val: number) => `${val}%`,
      offsetY: -20,
      style: {
        fontSize: "12px",
        colors: ["#304758"],
      },
    },
    xaxis: {
      categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      axisBorder: { show: false },
      axisTicks: { show: false },
      crosshairs: {
        fill: {
          type: "gradient",
          gradient: {
            colorFrom: "#F8F8F8",
            colorTo: "#F8F8F8",
            stops: [0, 100],
            opacityFrom: 0.4,
            opacityTo: 0.5,
          },
        },
      },
      tooltip: { enabled: true },
    },
    yaxis: {
      axisBorder: { show: false },
      axisTicks: { show: true },
      labels: {
        show: true,
        formatter: (val: number) => `${val}k`,
      },
    },
  colors: ['#0D76E1'],
  };

  const series = [
    {
      name: "Revenue",
      data: [4, 2, 3.5, 3, 2, 2.8, 3.2],
    },
  ];

  return (
    <div id="revenue-chart">
      <Chart
        options={options}
        series={series}
        type="bar"
        height={220}
      />
    </div>
  );
};

export default RevenueChart;
