import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const LineChart = () => {
  return (
    <Line
      options={{
        responsive: true,
        plugins: {
          legend: {
            display: true,
            // position: 'top' as const,
          },
          scales: {
            x: {
              grid: {
                display: true,
              },
            },

            y: {
              grid: {
                display: true,
              },
            },
          },
        },
      }}
      data={{
        labels: [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
        ],
        datasets: [
          {
            data: [123, 12, 543, 632, 212, 764, 211],
            borderColor: "rgb(0, 0, 0)",
          },
        ],
      }}
    />
  );
};

export default LineChart;
