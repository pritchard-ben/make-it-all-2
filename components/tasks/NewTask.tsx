import { Autocomplete, Button, TextField, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { IProject } from "../../types/Project.d";
import { ISubTask } from "../../types/SubTask.d";
import { ITask } from "../../types/Task.d";
import { IUser } from "../../types/User.d";
import Popover from "../misc/Popover";
import EditSubTasks from "./forms/EditSubTasks";
import MoveTask from "./MoveTask";

interface IProps {}
export default function NewTask({}: IProps) {
  const [projects, setProjects] = useState<IProject[]>([]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");
  const [manHours, setManHours] = useState<number>(0);
  const [project, setProject] = useState<null | IProject>(null);
  const [user, setUser] = useState<IUser | null>();
  const [status, setStatus] = useState<
    "to-do" | "in-progress" | "review" | "completed"
  >("to-do");
  const [subTasks, setSubTasks] = useState<ISubTask[]>([]);

  const getStatusButton = (status: string) => {
    switch (status) {
      case "to-do": {
        return (
          <div className="cursor-pointer bg-red-500 w-full text-white rounded text-center p-2 ">
            To-do
          </div>
        );
      }
      case "in-progress": {
        return (
          <div className="cursor-pointer bg-blue-500 w-full text-white rounded text-center p-2 ">
            In-progress
          </div>
        );
      }
      case "review": {
        return (
          <div className="cursor-pointer bg-amber-500 w-full text-white rounded text-center p-2 ">
            Review
          </div>
        );
      }
      case "completed": {
        return (
          <div className="cursor-pointer bg-green-500 w-full text-white rounded text-center p-2 ">
            Completed
          </div>
        );
      }
    }
    return <></>;
  };

  return (
    <>
      <div className="flex gap-4 mobile-only:flex-col">
        <div className="flex gap-4 flex-col  w-full">
          <TextField
            label="Title"
            multiline
            rows={2}
            size="small"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            sx={{ width: "100%" }}
          />

          <TextField
            label="Description"
            size="small"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            multiline
            rows={6}
            sx={{ width: "100%" }}
          />
          <div className="child:flex-1 flex mobile-only:flex-col gap-4">
            <TextField
              label="Deadline"
              size="small"
              type="date"
              InputLabelProps={{
                shrink: true,
              }}
              value={deadline}
              onChange={(e) => {
                setDeadline(e.target.value);
              }}
            />

            <TextField
              label="Man Hours"
              size="small"
              type="number"
              value={manHours}
              onChange={(e) => setManHours(parseInt(e.target.value))}
            />
          </div>
          <Autocomplete
            size={"small"}
            options={projects}
            getOptionLabel={(option) => option.name}
            renderInput={(params) => (
              <TextField {...params} label="Project" variant="outlined" />
            )}
            value={project}
            onChange={(event, newValue) => setProject(newValue)}
          />
        </div>
        <div className="flex gap-4 flex-col w-full">
          <Popover
            button={getStatusButton(status)}
            children={<MoveTask status={status} setStatus={setStatus} />}
          />

          <Box
            sx={{
              border: "1px solid #e0e0e0",
              borderRadius: "5px",
              height: 300,
              overflowX: "auto",
            }}
          >
            <EditSubTasks subTasks={subTasks} setSubTasks={setSubTasks} />
          </Box>
        </div>
      </div>
    </>
  );
}
