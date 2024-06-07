import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { Box } from "@mui/material";

const options = {
  chart: {
    type: "column",
    height: 350,
  },
  title: {
    text: "",
    align: "left",
  },
  legend: {
    layout: "horizontal",
    align: "center",
    verticalAlign: "top",
    y: 0,
    padding: 0,
    symbolRadius: 0,
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
      cursor: "pointer",
      states: {
        hover: {
          enabled: false,
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
  return (
    <Box>
      <Box
        sx={{
          width: "98%",
          height: 1.1,
          backgroundColor: "#e5e5e5",
          mt: 1,
        }}
      />
      <HighchartsReact highcharts={Highcharts} options={options} />
    </Box>
  );
};

export default SaleChart;
