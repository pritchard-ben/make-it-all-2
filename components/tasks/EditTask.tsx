import { Autocomplete, Button, IconButton, TextField } from "@mui/material";
import Box from "@mui/material/Box";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { IProject } from "../../types/Project.d";
import { ISubTask } from "../../types/SubTask.d";
import { ITask } from "../../types/Task.d";
import { IUser } from "../../types/User.d";
import { UserContext } from "../../context/UserContext";
import Popover from "../misc/Popover";
import EditSubTasks from "./EditSubTasks";
import MoveTask from "./MoveTask";
import SaveIcon from "@mui/icons-material/Save";
import { FaUserCircle } from "react-icons/fa";
import UserAvatar from "components/misc/UserAvatar";

interface IProps {
  task: ITask;
  saveTask: any;
}
export default function EditTask({ task, saveTask }: IProps) {
  const currentUser = useContext(UserContext);
  const [projects, setProjects] = useState<IProject[]>([]);

  const [title, setTitle] = useState(task.name);
  const [description, setDescription] = useState(task.description);
  const [deadline, setDeadline] = useState(task.deadline);
  const [manHours, setManHours] = useState<number>(task.manHours);
  const [project, setProject] = useState<string>(task.project);

  const [status, setStatus] = useState<
    "to-do" | "in-progress" | "review" | "completed"
  >(task.status);
  const [subTasks, setSubTasks] = useState<ISubTask[]>(task.subTasks);

  async function getProjects() {
    if (currentUser) {
      const username = currentUser.email;
      const data = {
        username,
      };

      try {
        const response = await axios.post("/api/projects/getProjects", data);
        setProjects(response.data);
      } catch (error) {
        console.log(error);
      }
    }
  }
  useEffect(() => {
    getProjects();
  }, []);
  useEffect(() => {
    if (projects) {
      const foundProject = projects.find(
        (project) => project.id === task.project
      );
      if (foundProject) {
        setProject(foundProject.id);
      }
    }
  }, [projects]);

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
          <div>
            <p>Created by</p>
            <p>Assigned to</p>
          </div>
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
            options={projects.map((p) => {
              return {
                id: p.id,
                name: p.name,
              };
            })}
            getOptionLabel={(option) => option.name}
            renderInput={(params) => (
              <TextField {...params} label="Project" variant="outlined" />
            )}
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
          <Button
            variant={"contained"}
            onClick={() => saveTask(task)}
            startIcon={<SaveIcon />}
          >
            Save Changes
          </Button>
        </div>
      </div>
    </>
  );
}
