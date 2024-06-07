import { Box } from "@mui/material";
import { width } from "@mui/system";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const colors = ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"];

const options = {
  chart: {
    plotBackgroundColor: null,
    plotBorderWidth: null,
    plotShadow: false,
    type: "pie",
    height: 350,
    width: 250,
  },
  title: {
    text: " ",
    align: "left",
  },
  tooltip: {
    pointFormat: "{series.name}: <b>{point.percentage:.1f}%</b>",
  },
  accessibility: {
    point: {
      valueSuffix: "%",
    },
  },
  plotOptions: {
    pie: {
      allowPointSelect: true,
      cursor: "pointer",
      dataLabels: {
        enabled: false,
      },
      showInLegend: true,
    },
  },
  legend: {
    layout: "horizontal",
    align: "center",
    verticalAlign: "top",
    symbolRadius: 0,
    itemStyle: {
      fontWeight: "normal",
    },
  },
  credits: {
    enabled: false,
  },
  series: [
    {
      name: "Percentage",
      colorByPoint: true,
      data: [
        {
          name: "Jan",
          y: 34.77,
          selected: true,
        },
        {
          name: "Feb",
          y: 12.82,
        },
        {
          name: "Mar",
          y: 4.63,
        },
        {
          name: "Apr",
          y: 22.44,
        },
        {
          name: "May",
          y: 12.02,
        },
        {
          name: "Jun",
          y: 13.28,
        },
      ],
    },
  ],
};

function PieChart() {
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
}

export default PieChart;
