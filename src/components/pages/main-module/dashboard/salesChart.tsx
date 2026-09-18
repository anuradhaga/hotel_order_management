import React from "react";
import type { ApexOptions } from "apexcharts";
import dynamic from "next/dynamic";
// ✅ Dynamic import (SSR disabled)
const Chart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

const SalesChart: React.FC = () => {
  const options: ApexOptions = {
    chart: {
      height: 340,
      type: "radialBar",
      offsetY: -30,
      sparkline: {
        enabled: true,
      },
    },

    plotOptions: {
      radialBar: {
        startAngle: -90,
        endAngle: 90,
        dataLabels: {
          name: {
            fontSize: "16px",
            offsetY: 0,
          },
          value: {
            offsetY: -40,
            fontSize: "22px",
            formatter: (val: number) => `${val}%`,
          },
        },
      },
    },

    fill: {
      type: "gradient",
      gradient: {
        shade: "dark",
        shadeIntensity: 0.15,
        inverseColors: false,
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 50, 65, 91],
      },
    },

    stroke: {
      dashArray: 4,
    },

    grid: {
      padding: {
        bottom: 0,
        top: -20,
      },
    },

    colors: ["#FFA80B"],
    labels: ["Sales"],
  };

  const series = [40];

  return (
    <div id="sales-chart">
      <Chart
        options={options}
        series={series}
        type="radialBar"
        height={340}
      />
    </div>
  );
};

export default SalesChart;
