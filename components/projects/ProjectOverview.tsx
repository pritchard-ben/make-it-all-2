import { Box } from "@mui/material";
import { IProject } from "../../types/Project.d";
import { ITask } from "../../types/Task.d";

import ManHoursBarWidget from "./widgets/ManHoursBarWidget";
import ManHoursByEmployeeWidget from "./widgets/ManHoursByEmployeeWidget";
import StatusDonutWidget from "./widgets/StatusDonutWidget";
import TaskBarWidget from "./widgets/TaskBarWidget";
import TaskTableWidget from "./widgets/TaskTableWidget";
import TitleWidget from "./widgets/TitleWidget";

interface IProps {
  project: IProject;
  tasks: ITask[];
}
export default function ProjectOverview({ project, tasks }: IProps) {
  return (
    <>
      <div className="flex flex-col p-4 gap-4">
        <Box sx={{ display: "flex", gap: 2 }} className="mobile-only:flex-col">
          <TitleWidget project={project} />
          <TaskBarWidget tasks={tasks} />
          <ManHoursBarWidget tasks={tasks} />
        </Box>
        <Box sx={{ display: "flex", gap: 2 }} className="mobile-only:flex-col">
          <StatusDonutWidget tasks={tasks} />
          <ManHoursByEmployeeWidget project={project} tasks={tasks} />
        </Box>

        <TaskTableWidget tasks={tasks} />
      </div>
    </>
  );
}
