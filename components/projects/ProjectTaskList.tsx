import { DataGrid, GridColDef } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import { ITask } from "../../types/Task.d";
import UserCircle from "../misc/UserAvatar";
import UserCircles from "../misc/AvatarList";
import { Box } from "@mui/material";

interface ITaskListProps {
  tasks: ITask[];
}

export default function ProjectTaskList({ tasks }: ITaskListProps) {
  const rows = tasks;

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
        return <UserCircle userEmail={params.value.email} />;
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

  return (
    <div style={{ height: 500, width: "100%" }}>
      <div style={{ display: "flex", height: "100%" }}>
        <div style={{ flexGrow: 1 }}>
          <DataGrid rows={rows} columns={columns} />
        </div>
      </div>
    </div>
  );
}
