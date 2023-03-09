import { DataGrid, GridColDef } from "@mui/x-data-grid";
import UserCircle from "../misc/UserAvatar";

interface IProps {}
export default function OverdueList({}: IProps) {
  const rows = [
    {
      id: "0",
      name: "task1",
      user: {
        email: "tom@make-it-all.co.uk",
        name: "Tom Whitticase",
        role: "admin",
        profileImage: "",
      },
      deadline: "2023-01-12",
      timeRemaining: "5 days",
    },
    {
      id: "1",
      name: "task2",
      user: {
        email: "tom@make-it-all.co.uk",
        name: "Tom Whitticase",
        role: "admin",
        profileImage: "",
      },
      deadline: "2022-10-1",
      timeRemaining: "8 days ago",
    },
  ];
  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", hide: true },
    { field: "name", headerName: "Name", flex: 1 },
    {
      field: "user",
      headerName: "User",
      width: 50,
      renderCell: (params) => {
        return <UserCircle userEmail={params.value.email} />;
      },
    },
    { field: "deadline", headerName: "Deadline", width: 100 },
    {
      field: "timeRemaining",
      headerName: "Time Remaining",
      width: 150,
    },
  ];
  return (
    <div style={{ height: "12rem", width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        hideFooter={true}
        hideFooterPagination
        hideFooterSelectedRowCount
      />
    </div>
  );
}
