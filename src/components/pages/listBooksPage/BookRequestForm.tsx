import { useState, FC } from "react";
import {
    Modal,
    Box,
    Button,
    TextField,
    Stack,
    Typography
} from "@mui/material";
import {
    editBookBox,
    editBookUpdateButton,
    editBookCancelButton
} from "../../../sxStyles";
import { fetchAddBookRequest } from "../../../fetchFunctions";

interface IProps {
    visible: boolean;
    setVisible: Function;
}

const RequestBook: FC<IProps> = ({
    visible,
    setVisible
}: IProps): JSX.Element => {
    const [isbn, setIsbn] = useState<string>("");
    const [title, setTitle] = useState<string>("");
    const [reason, setReason] = useState<string>("");

    const requestBook = async () => {
        const response = await fetchAddBookRequest(isbn, title, reason);
        if (response.ok) {
            setVisible(false);
        }
    };

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
                        Request a Book
                    </Typography>
                    <TextField
                        label="Isbn"
                        name="isbn"
                        onChange={(e) => setIsbn(e.target.value)}
                    />
                    <TextField
                        label="Title"
                        name="title"
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <TextField
                        label="Reason"
                        name="reason"
                        onChange={(e) => setReason(e.target.value)}
                    />
                    <Stack direction="row" spacing={2} justifyContent="center">
                        <Button
                            sx={editBookUpdateButton}
                            variant="contained"
                            onClick={requestBook}
                        >
                            Add
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

export default RequestBook;
