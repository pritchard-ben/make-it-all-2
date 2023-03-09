import {
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  LinearProgress,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { CategoryScale, LinearScale, BarElement, Title } from "chart.js";
import { Bar } from "react-chartjs-2";
import { ITask } from "../../types/Task.d";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

interface IProps {
  tasks: ITask[];
}
export default function ProjectProgressDoughnut({ tasks }: IProps) {
  const countStatus = (status: string) => {
    let count = 0;
    tasks.map((task) => {
      if (task.status === status) count++;
    });
    return count;
  };
  const data = {
    labels: ["To-do", "In-progress", "Review", "Completed"],
    datasets: [
      {
        label: "Tasks",
        data: [
          countStatus("to-do"),
          countStatus("in-progress"),
          countStatus("review"),
          countStatus("completed"),
        ],
        backgroundColor: [
          "hsl(5, 60%, 50%)",
          "hsl(200,60%,45%)",
          "hsl(41, 100%, 60%)",
          "hsl(120, 70%, 45%)",
        ],

        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "right" as const,
      },
    },
  };

  return (
    <div className="w-full h-full">
      <Doughnut options={options} data={data} />
    </div>
  );
}
