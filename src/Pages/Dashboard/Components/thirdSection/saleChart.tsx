import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const options = {
  chart: {
    type: "column",
    height: 350,
    width: 500,
  },
  title: {
    text: "",
    align: "left",
  },
  legend: {
    layout: "horizontal",
    align: "center",
    verticalAlign: "top", // Move legend to the top
    y: 0,
    padding: 0,
    symbolRadius: 0,
    // symbolHeight: 30, // Set the height of the legend symbol
    // symbolWidth: 10, // Set the width of the legend symbol

    symbol: "rectangle",
  },
  xAxis: {
    categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Aug"],
    crosshair: true,
    accessibility: {
      description: "Months",
    },
  },
  yAxis: {
    min: 0,
    title: {
      text: "",
    },
  },
  tooltip: {
    valueSuffix: " (1000 K)",
  },
  plotOptions: {
    column: {
      pointPadding: 0.1,
      borderWidth: 0,
      size: "100%",
      // allowPointSelect: true,
      cursor: "pointer",
      states: {
        hover: {
          enabled: false, // Disable the hover effect
        },
      },
    },
  },
  credits: {
    enabled: false,
  },
  series: [
    {
      name: "Sales Value",
      data: [406292, 260000, 107000, 68300, 27500, 14500, 222227],
      color: "#008001",
    },
    {
      name: "Inventory",
      data: [51086, 136000, 5500, 141000, 107180, 77000, 222221],
      color: "#e5e5e5",
    },
  ],
};

const SaleChart: React.FC = () => {
  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default SaleChart;
