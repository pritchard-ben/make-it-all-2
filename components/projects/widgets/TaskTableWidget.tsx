import { DataGrid, GridColDef } from "@mui/x-data-grid";
import React from "react";
import { Box, Card, Typography } from "@mui/material";
import { ITask } from "types/Task.d";
import UserAvatar from "components/user/UserAvatar";
import NewTaskButton from "components/tasks/forms/NewTaskButton";

/**
 * @author Tom Whitticase
 *
 * @description Provides a table of tasks for a project.
 */

interface ITaskListProps {
  tasks: ITask[];
}
export default function TaskTableWidget({ tasks }: ITaskListProps) {
  const rows = tasks;

  return (
    <Card sx={{ width: "100%" }} elevation={2}>
      <Box className="flex justify-start items-center w-full p-2">
        <Typography component="div" variant="h5" className="px-2">
          Tasks
        </Typography>
        <NewTaskButton size={"small"} inPlace={true} />
      </Box>
      <Box sx={{ height: 400, width: "100%" }}>
        <DataGrid rows={rows} columns={columns} />
      </Box>
    </Card>
  );
}
const columns: GridColDef[] = [
  { field: "id", headerName: "ID", hide: true },
  { field: "name", headerName: "Name", width: 200 },
  {
    field: "description",
    headerName: "Description",
    flex: 1,
    minWidth: 100,
  },
  {
    field: "deadline",
    headerName: "Deadline",
    type: "dateTime",
    width: 100,
  },
  {
    field: "user",
    headerName: "Assigned to",
    type: "IUser",
    width: 100,
    renderCell: (params) => {
      return <UserAvatar username={params.value.email} />;
    },
  },
  {
    field: "manHours",
    headerName: "Man Hours",
    type: "number",
    width: 100,
  },
  {
    field: "status",
    headerName: "Status",
    width: 120,
    type: "string",
    renderCell: (params) => {
      switch (params.value) {
        case "to-do": {
          return (
            <div className="bg-red-500 text-white rounded text-center p-2 m-2">
              To-do
            </div>
          );
        }
        case "in-progress": {
          return (
            <div className="bg-blue-500 text-white rounded text-center p-2 m-2">
              In-progress
            </div>
          );
        }
        case "review": {
          return (
            <div className="bg-amber-500 text-white rounded text-center p-2 m-2">
              Review
            </div>
          );
        }
        case "completed": {
          return (
            <div className="bg-green-500 text-white rounded text-center p-2 m-2">
              Completed
            </div>
          );
        }
      }
    },
  },
];
