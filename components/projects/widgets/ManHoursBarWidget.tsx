import {
  Card,
  CardContent,
  Grid,
  LinearProgress,
  Typography,
} from "@mui/material";
import { ITask } from "types/Task.d";
import {
  getCompletedManHours,
  getCompletedManHoursPercentage,
  getRemainingManHours,
  getTotalManHours,
} from "./widgetUtils";

/**
 * @author Tom Whitticase
 *
 * @description widget for showing man hours completed, remaining and total for a project.
 */

interface IProps {
  tasks: ITask[];
}
export default function ManHoursBarWidget({ tasks }: IProps) {
  return (
    <Card className="desktop-only:w-1/3" elevation={2}>
      <CardContent>
        <Typography component="div" variant="h5">
          Man Hours
        </Typography>
        <table className="table-auto w-full child:w-min">
          <tbody>
            <tr>
              <td>Total Man Hours</td>
              <td>{getTotalManHours(tasks)}</td>
            </tr>
            <tr>
              <td>Completed</td>
              <td>{getCompletedManHours(tasks)}</td>
            </tr>
            <tr>
              <td>Remaining</td>
              <td>{getRemainingManHours(tasks)}</td>
            </tr>
          </tbody>
        </table>
        <div className="flex gap-2 items-center justify-venter">
          <Grid spacing={1} container>
            <Grid xs item>
              <LinearProgress
                value={getCompletedManHoursPercentage(tasks)}
                variant="determinate"
                title="test"
              />
            </Grid>
          </Grid>
          <div>{getCompletedManHoursPercentage(tasks) + "%"}</div>
        </div>
      </CardContent>
    </Card>
  );
}
