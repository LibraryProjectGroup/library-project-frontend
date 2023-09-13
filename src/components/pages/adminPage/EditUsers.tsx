import {
  Box,
  Button,
  MenuItem,
  Modal,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { FC, useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { fetchAllHomeOffices } from "../../../fetchFunctions";
import User from "../../../interfaces/editUser.interface";
import { HomeOffice } from "../../../interfaces/HomeOffice";
import { cancelButton, confirmButton, popupContainer } from "../../../sxStyles";
import OfficeSpan from "../../OfficeSpan";

interface IProps {
  visible: boolean;
  setVisible: Function;
  user: User | null;
  setOneUserData: Function;
  updateUser: Function;
}

const EditUser: FC<IProps> = ({
  visible,
  setVisible,
  user,
  setOneUserData,
  updateUser,
}: IProps): JSX.Element => {
  const editingMessage = () =>
    toast.success("User edited succesfully", { containerId: "ToastSuccess" });
  const [offices, setOffices] = useState<HomeOffice[]>([]);

  useEffect(() => {
    (async () => {
      setOffices(await fetchAllHomeOffices());
    })();
  }, []);

  const onChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setOneUserData({
      ...user,
      [event.target.name]: event.target.value,
    });
  };

  if (user == null) return <></>;

  return (
    <Modal open={visible} onClose={() => setVisible(false)}>
      <Box sx={popupContainer}>
        <Stack spacing={2}>
          <Typography
            sx={{
              fontFamily: "Montserrat",
              fontWeight: "bold",
            }}
            variant="h4"
          >
            Edit user
          </Typography>
          <TextField
            select
            label="Administrator"
            name="administrator"
            value={user?.administrator}
            onChange={(e) => onChange(e)}
          >
            <MenuItem value={"true"}>True</MenuItem>
            <MenuItem value={"false"}>False</MenuItem>
          </TextField>
          <TextField
            label="Username"
            name="username"
            value={user?.username}
            onChange={(e) => onChange(e)}
          />
          <TextField
            label="Email"
            name="email"
            value={user?.email}
            onChange={(e) => onChange(e)}
          />
          <TextField
            select
            label="Office"
            name="homeOfficeId"
            value={user?.homeOfficeId}
            onChange={(e) => onChange(e)}
          >
            {
              // @ts-ignore
              offices.map(({ id, name, countryCode }) => {
                return (
                  <MenuItem value={id}>
                    <OfficeSpan countryCode={countryCode} officeName={name} />
                  </MenuItem>
                );
              })
            }
          </TextField>
          <Stack direction="row" spacing={2} justifyContent="center">
            <Button
              sx={confirmButton}
              variant="contained"
              onClick={() => {
                updateUser(user);
                editingMessage();
              }}
            >
              Update
            </Button>
            <Button
              sx={cancelButton}
              variant="contained"
              onClick={() => setVisible(false)}
            >
              Cancel
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Modal>
  );
};

export default EditUser;
