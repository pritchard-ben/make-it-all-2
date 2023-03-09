import { Card, CardContent, Typography } from "@mui/material";
import { Doughnut } from "react-chartjs-2";
import { ITask } from "types/Task.d";

/**
 * @author Tom Whitticase
 *
 * @description widget for showing the progress of tasks in a project as a donut chart.
 */

interface IProps {
  tasks: ITask[];
}
export default function StatusDonutWidget({ tasks }: IProps) {
  const data = {
    labels: ["To-do", "In-progress", "Review", "Completed"],
    datasets: [
      {
        label: "Tasks",
        data: [
          countStatus(tasks, "to-do"),
          countStatus(tasks, "in-progress"),
          countStatus(tasks, "review"),
          countStatus(tasks, "completed"),
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

  return (
    <Card className="desktop-only:w-1/3" elevation={2}>
      <CardContent>
        <Typography className="pb-2" component="div" variant="h5">
          Progress of Tasks
        </Typography>
        <div className="w-full h-full">
          <Doughnut options={options} data={data} />
        </div>
      </CardContent>
    </Card>
  );
}
const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "right" as const,
    },
  },
};
function countStatus(tasks: ITask[], status: string) {
  let count = 0;
  tasks.map((task) => {
    if (task.status === status) count++;
  });
  return count;
}
