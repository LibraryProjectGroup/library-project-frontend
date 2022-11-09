import { useState, FC, useContext, useEffect } from "react";
import { Paper, Typography, Button, Stack, Fab } from "@mui/material";
import { TheContext } from "../../../TheContext";
import { useNavigate } from "react-router-dom";
import { fetchDeleteBooklist, fetchUserBooklists } from "../../../fetchFunctions";
import Book_list from "../../../interfaces/book_list.interface";
import { userPageBackButton, userPageReturnButton } from "../../../sxStyles";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AddIcon from "@mui/icons-material/Add";
import BooklistForm from "./BooklistForm";
import {
    listBooksDeleteButton,
    listBooksEditButton,
    listBooksLoanButton,
    addBookAddButton as addButton,
    listBooksFavoriteButton as favButton
} from "../../../sxStyles";

const UserBooklists: FC = (): JSX.Element => {
    const [booklists, setBooklists] = useState<Book_list[]>([]);
    const [formBooklist, setFormBooklist] = useState<Book_list | null>(null); 
    const [formVisible, setFormVisible] = useState(false);
    const [formEditing, setFormEditing] = useState(false);

    const context = useContext(TheContext);
    const navigate = useNavigate();

    const fetchBooklists = async () => {
        setBooklists(await fetchUserBooklists());
    };

    useEffect(() => {
        fetchBooklists();
    }, []);

    const renderBookLists = () => {
        let renderedBooklists = [];
        for (const booklist of booklists) {
            renderedBooklists.push(
                <Paper elevation={10} sx={{ padding: "2rem" }}>
                    <Stack direction="row" justifyContent="space-between">
                        <Stack>
                            <Typography
                                sx={{
                                    fontFamily: "Montserrat",
                                    fontWeight: "bold"
                                }}
                            >
                                {booklist.name}
                            </Typography>
                        </Stack>
                        <Stack marginY={1} justifyContent="space-between">
                            <Button
                                sx={userPageReturnButton}
                                variant="contained"
                                onClick={async () => {
                                    await fetchDeleteBooklist(booklist.id);
                                    await fetchBooklists();
                                }}
                            >
                                Delete
                            </Button>
                        </Stack>
                    </Stack>
                </Paper>
            );
        }
        return renderedBooklists;
    };

    return (
        <>
            <div style={{ position: "absolute", right: 30 }}>
                <p>
                    User: <b>{context?.user?.username}</b>
                </p>
                <p>Book Lists</p>
            </div>
            <Fab
                aria-label="back"
                sx={userPageBackButton}
                onClick={() => {
                    navigate("/user");
                }}
            >
                <ArrowBackIcon />
            </Fab>
            {renderBookLists()}
            <Fab
                aria-label="add"
                sx={addButton}
                onClick={() => {
                    setFormEditing(false);
                    setFormBooklist({
                        id: -1, // This wont get used
                        name: ""
                    });
                    setFormVisible(true);
                }}
            >
                <AddIcon />
            </Fab>
            <BooklistForm
                visible={formVisible}
                setVisible={setFormVisible}
                booklist={formBooklist}
                setBooklist={setFormBooklist}
                editing={formEditing}
                updateBooklists={fetchBooklists}
            />
        </>
    );
};

export default UserBooklists;
