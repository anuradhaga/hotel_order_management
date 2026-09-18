import React from "react";
import Chart from "react-apexcharts";
import type { ApexOptions } from "apexcharts";

const StatisticChart: React.FC = () => {
  const options: ApexOptions = {
    chart: {
      height: 260,
      type: "area",
      zoom: { enabled: false },
      toolbar: { show: false },
    },

    tooltip: {
      enabled: true,
      x: { show: true },
      y: {
        title: {
          formatter: () => "",
        },
      },
      marker: { show: false },
    },

    dataLabels: { enabled: false },

    stroke: {
      curve: "smooth",
      width: 1.5,
    },

    fill: {
      type: "gradient",
      opacity: 0.2,
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.4,
        opacityTo: 0.9,
        stops: [0, 90, 100],
        colorStops: [
          {
            offset: 0,
            color: "#4da5ff",
            opacity: 0.8,
          },
          {
            offset: 100,
            color: "#ffffff",
            opacity: 0,
          },
        ],
      },
    },

    grid: {
      borderColor: "transparent",
      strokeDashArray: 0,
      xaxis: { lines: { show: false } },
      yaxis: { lines: { show: false } },
      padding: {
        left: 2,
        right: -3,
        top: -50,
      },
    },

    xaxis: {
      categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      labels: {
        style: { fontSize: "12px" },
      },
    },

    yaxis: {
      min: 0,
      forceNiceScale: true,
      labels: { show: false },
    },

    colors: ["#4da5ff"],
  };

  const series = [
    {
      name: "Orders",
      data: [40, 35, 45, 44, 63, 50, 84],
    },
  ];

  return (
    <div id="statistic-chart">
      <Chart options={options} series={series} type="area" height={260} />
    </div>
  );
};

export default StatisticChart;
