import { useState, FC } from "react";
import {
    Modal,
    Box,
    Button,
    Typography,
    TextField,
    Stack
} from "@mui/material";
import User from "../../../interfaces/editUser.interface";
import {
    editBookBox,
    editBookUpdateButton,
    editBookCancelButton
} from "../../../sxStyles";

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
    updateUser
}: IProps): JSX.Element => {
    const onChange = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setOneUserData({
            ...user,
            [event.target.name]: event.target.value
        });
    };

    if (user == null) return <></>;

    return (
        <Modal open={visible} onClose={() => setVisible(false)}>
            <Box sx={editBookBox}>
                <Stack spacing={2}>
                    <Typography
                        sx={{
                            fontFamily: "Montserrat",
                            fontWeight: "bold"
                        }}
                        variant="h4"
                    >
                        Edit user
                    </Typography>
                    <TextField
                        label="Administrator"
                        name="administrator"
                        value={user?.administrator}
                        onChange={(e) => onChange(e)}
                    />
                    <TextField
                        label="Username"
                        name="username"
                        value={user?.username}
                        onChange={(e) => onChange(e)}
                    />

                    <Stack direction="row" spacing={2} justifyContent="center">
                        <Button
                            sx={editBookUpdateButton}
                            variant="contained"
                            onClick={() => updateUser(user)}
                        >
                            Update
                        </Button>
                        <Button
                            sx={editBookCancelButton}
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
