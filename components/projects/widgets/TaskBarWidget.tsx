import {
  Card,
  CardContent,
  Grid,
  LinearProgress,
  Typography,
} from "@mui/material";
import { ITask } from "types/Task.d";
import {
  getTotalTasksCount,
  getCompletedTasksCount,
  getRemainingTasksCount,
  getCompletedTasksPercentage,
} from "./widgetUtils";

/**
 * @author Tom Whitticase
 *
 * @description widget for showing tasks completed, remaining and total for a project.
 */

interface IProps {
  tasks: ITask[];
}
export default function TaskBarWidget({ tasks }: IProps) {
  return (
    <Card className="desktop-only:w-1/3" elevation={2}>
      <CardContent>
        <Typography component="div" variant="h5">
          Tasks
        </Typography>

        <table className="table-auto w-full child:w-min">
          <tbody>
            <tr>
              <td>Total Tasks</td>
              <td>{getTotalTasksCount(tasks)}</td>
            </tr>
            <tr>
              <td>Completed</td>
              <td>{getCompletedTasksCount(tasks)}</td>
            </tr>
            <tr>
              <td>Remaining</td>
              <td>{getRemainingTasksCount(tasks)}</td>
            </tr>
          </tbody>
        </table>
        <div className="flex gap-2 items-center justify-venter">
          <Grid spacing={1} container>
            <Grid xs item>
              <LinearProgress
                value={getCompletedTasksPercentage(tasks)}
                variant="determinate"
                title="test"
              />
            </Grid>
          </Grid>
          <div>{getCompletedTasksPercentage(tasks) + "%"}</div>
        </div>
      </CardContent>
    </Card>
  );
}
