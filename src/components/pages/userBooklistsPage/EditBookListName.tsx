import { useState, FC } from "react";
import {
    Modal,
    Box,
    Button,
    Typography,
    TextField,
    Stack,
    MenuItem
} from "@mui/material";
// import User from "../../../interfaces/editUser.interface";
import {
    editBookListBox,
    editBookListUpdateButton,
    editBookListCancelButton
} from "../../../sxStyles";
import Book_list from "../../../interfaces/book_list.interface";

interface IProps {
    visible: boolean;
    setVisible: Function;
    oneBookListDataToEditName: Book_list | null;
    setOneBookListDataToEditName: Function;
    updateBookListName: Function;
    // user: User | null;
    // setOneUserData: Function;
    // updateUser: Function;
}

const EditBookListName: FC<IProps> = ({
    visible,
    setVisible,
    oneBookListDataToEditName,
    setOneBookListDataToEditName,
    updateBookListName
}: // user,
// setOneUserData,
// updateUser
IProps): JSX.Element => {
    const onChange = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setOneBookListDataToEditName({
            ...oneBookListDataToEditName,
            [event.target.name]: event.target.value
        });
    };

    if (oneBookListDataToEditName == null) return <></>;

    return (
        <Modal open={visible} onClose={() => setVisible(false)}>
            <Box sx={editBookListBox}>
                <Stack spacing={2}>
                    <Typography
                        sx={{
                            fontFamily: "Montserrat",
                            fontWeight: "bold"
                        }}
                        variant="h4"
                    >
                        Edit Book List Name
                    </Typography>
                    <TextField
                        label="BookListName"
                        name="name"
                        value={oneBookListDataToEditName?.name}
                        onChange={(e) => onChange(e)}
                    />

                    <Stack direction="row" spacing={2} justifyContent="center">
                        <Button
                            sx={editBookListUpdateButton}
                            variant="contained"
                            onClick={() =>
                                updateBookListName(oneBookListDataToEditName)
                            }
                        >
                            Update
                        </Button>
                        <Button
                            sx={editBookListCancelButton}
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

export default EditBookListName;
