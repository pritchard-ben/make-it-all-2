/* button that when clicked opens the form for adding a new task */
import { Fab, IconButton } from "@mui/material";
import Modal from "components/misc/Modal";
import NewTask from "./NewTask";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";

interface IProps {
  inPlace?: boolean;
  size?: "small" | "medium" | "large";
}
export default function NewTaskButton({
  inPlace = false,
  size = "medium",
}: IProps) {
  return (
    <Modal
      title="new task"
      button={
        inPlace ? (
          <IconButton size={size} color="primary" aria-label="add">
            <PlaylistAddIcon />
          </IconButton>
        ) : (
          <div className="z-[100] fixed bottom-4 mobile-only:bottom-20 right-8">
            <Fab
              size={size}
              color="primary"
              aria-label="add"
              variant={"extended"}
            >
              New Task <PlaylistAddIcon sx={{ marginLeft: 1 }} />
            </Fab>
          </div>
        )
      }
    >
      <NewTask />
    </Modal>
  );
}
