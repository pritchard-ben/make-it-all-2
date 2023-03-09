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
import { IProject } from "../../types/Project.d";
import { IUser } from "../../types/User.d";

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
  project: IProject;
  tasks: ITask[];
}
export default function ProjectManhoursBar({ project, tasks }: IProps) {
  const countUserManHoursCompleted = (user: string, tasks: ITask[]) => {
    let manHours = 0;
    tasks.map((task: ITask) => {
      if (task.user === user && task.status === "completed")
        manHours += task.manHours;
    });
    return manHours;
  };
  const countUserManHoursRemaining = (user: string, tasks: ITask[]) => {
    let manHours = 0;
    tasks.map((task: ITask) => {
      if (task.user === user && task.status !== "completed")
        manHours += task.manHours;
    });
    return manHours;
  };

  const data = {
    labels: project.users,
    datasets: [
      {
        label: "Man Hours Completed",
        backgroundColor: "hsl(120, 70%, 45%)",
        data: project.users.map((user) => {
          return countUserManHoursCompleted(user, tasks);
        }),
      },
      {
        label: "Man Hours Remaining",
        backgroundColor: "hsl(20, 70%, 45%)",
        data: project.users.map((user) => {
          return countUserManHoursRemaining(user, tasks);
        }),
      },
    ],
  };

  const options = {
    indexAxis: "y" as const,
    elements: {
      bar: {
        borderWidth: 2,
      },
    },
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "right" as const,
        display: true,
      },
    },
  };

  return (
    <>
      <div className="w-full h-full">
        <Bar options={options} data={data} />
      </div>
    </>
  );
}
