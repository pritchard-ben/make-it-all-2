import { Card, CardContent, Typography } from "@mui/material";
import { Bar } from "react-chartjs-2";
import { IProject } from "types/Project.d";
import { ITask } from "types/Task.d";

/**
 * @author Tom Whitticase
 *
 * @description bar chart showing man hours completed by each employee in a project.
 */

interface IProps {
  project: IProject;
  tasks: ITask[];
}
export default function ManHoursByEmployeeWidget({ project, tasks }: IProps) {
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

  return (
    <Card className="desktop-only:w-2/3" elevation={2}>
      <CardContent>
        <Typography className="pb-2" component="div" variant="h5">
          Employee Man Hours
        </Typography>
        <div className="w-full h-full">
          <Bar options={options} data={data} />
        </div>
      </CardContent>
    </Card>
  );
}
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
function countUserManHoursCompleted(user: string, tasks: ITask[]) {
  let manHours = 0;
  tasks.map((task: ITask) => {
    if (task.user === user && task.status === "completed")
      manHours += task.manHours;
  });
  return manHours;
}
function countUserManHoursRemaining(user: string, tasks: ITask[]) {
  let manHours = 0;
  tasks.map((task: ITask) => {
    if (task.user === user && task.status !== "completed")
      manHours += task.manHours;
  });
  return manHours;
}
