import { Box, Card, Typography } from "@mui/material";
import { IProject } from "types/Project.d";
import AvatarList from "components/user/AvatarList";
import UserAvatar from "components/user/UserAvatar";

/**
 * @author Tom Whitticase
 *
 * @description a card displaying the title of a project, the project leader and the team members.
 */

interface IProps {
  project: IProject;
}
export default function TitleWidget({ project }: IProps) {
  return (
    <Card className="" elevation={2}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          padding: 2,

          height: "100%",
          justifyContent: "between",
          gap: 2,
        }}
      >
        <Box>
          <Typography component="div" variant="h5">
            {project.name}
          </Typography>
          <Typography component="div" variant="subtitle1">
            {project.description}
          </Typography>
        </Box>
        <Box>
          <table className="table-auto w-full child:w-min">
            <tbody>
              <tr>
                <td>Team Leader</td>
                <td>
                  <UserAvatar
                    size={"medium"}
                    userEmail={project.projectLeader}
                  />
                </td>
              </tr>
              <tr>
                <td>Team Members</td>
                <td>
                  <AvatarList size={"medium"} userEmails={project.users} />
                </td>
              </tr>
            </tbody>
          </table>
        </Box>
      </Box>
    </Card>
  );
}
