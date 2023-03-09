import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { IProject } from "../../types/Project.d";
import AvatarList from "../user/AvatarList";
import UserAvatar from "../user/UserAvatar";
import { useEffect, useState } from "react";
import LoadingPage from "../misc/LoadingPage";

interface IProps {
  setSelectedProject: any;
  projects: IProject[];
}

export default function ProjectsTable({
  projects,
  setSelectedProject,
}: IProps) {
  const rows = projects;

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
      field: "tasks",
      headerName: "Tasks",
      type: "number",
      width: 80,
      renderCell: (params) => {
        return params.value.length;
      },
    },
    {
      field: "projectLeader",
      headerName: "Leader",
      type: "IUser",
      width: 80,
      renderCell: (params) => {
        return <UserAvatar user={params.value} />;
      },
    },
    {
      field: "users",
      headerName: "Team Members",
      width: 200,
      type: "IUser[]",
      renderCell: (params) => {
        return <AvatarList users={params.value} />;
      },
    },
  ];

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(false);
  }, []);

  return loading ? (
    <LoadingPage variant={"table"} />
  ) : (
    <div style={{ height: "100%", width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        onRowClick={(row) => {
          projects.filter((project) => {
            if (project.id === row.id) setSelectedProject(project);
          });
        }}
        sx={{
          "& .MuiDataGrid-row:hover": {
            cursor: "pointer",
          },
        }}
        hideFooter
      />
    </div>
  );
}
