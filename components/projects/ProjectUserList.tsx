import { DataGrid, GridColDef } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import UserCircle from "../user/UserAvatar";
import ProgressCircle from "../misc/ProgressCircle";
import LoadingPage from "../misc/LoadingPage";
import { IUser } from "types/User.d";

/**
 * @author Ben Pritchard
 *
 * @description Creates a list of users to be displayed in a table
 *
 */

interface IUserListProps {
  users: IUser[];
}

export default function UserList({ users }: IUserListProps) {
  const rows: IUser[] = users;
  const columns: GridColDef[] = [
    { field: "userId", headerName: "Email", flex: 1, minWidth: 100 },
    { field: "name", headerName: "Name", flex: 1, minWidth: 70 },
    {
      field: "role",
      headerName: "Role",
      flex: 1,
      minWidth: 70,
    },
    // {
    //   field: "leaderId",
    //   headerName: "Leader",
    //   flex: 1,
    //   minWidth: 100,
    // },
  ];

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(false);
  }, []);
  return (
    <>
      {loading ? (
        <LoadingPage variant="table" />
      ) : (
        <div style={{ height: "85%", width: "100%" }}>
          <DataGrid
            rows={rows}
            getRowId={(row) => row.userId}
            columns={columns}
            pageSize={10}
          />
        </div>
      )}
    </>
  );
}
