import { useState, FC, useContext, useEffect } from "react";
import {
    Paper,
    Typography,
    Button,
    Stack,
    Fab,
    Card,
    CardActionArea
} from "@mui/material";
import { TheContext } from "../../../TheContext";
import { useNavigate } from "react-router-dom";
import {
    fetchUpdateBooklist,
    fetchDeleteBooklist,
    fetchUserBooklists
} from "../../../fetchFunctions";
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
import { fetchBooklist } from "../../../fetchFunctions";
import UserBooks from "../UserBooksPage/UserBooks";
import EditBookListName from "./EditBookListName";
import { arrayBuffer } from "stream/consumers";

const UserBooklists: FC = (): JSX.Element => {
    const [booklists, setBooklists] = useState<Book_list[]>([]);
    const [formBooklist, setFormBooklist] = useState<Book_list | null>(null);
    const [formVisible, setFormVisible] = useState(false);
    const [editBookListFormVisible, setEditBookListFormVisible] =
        useState(false);
    const [oneBookListDataToEditName, setOneBookListDataToEditName] =
        useState<Book_list | null>(null);
    const [formEditing, setFormEditing] = useState(false);
    const [bookListSelected, setBookListSelected] = useState(false);
    const [selectedBooklist, setSelectedBooklist] = useState<Book_list>({
        id: -1,
        name: ""
    });

    const context = useContext(TheContext);
    const navigate = useNavigate();

    const fetchBooklists = async () => {
        setBooklists(await fetchUserBooklists());
    };

    useEffect(() => {
        fetchBooklists();
    }, []);

    const handleUserBooksButton = (booklist: Book_list) => {
        setSelectedBooklist(booklist);
    };

    useEffect(() => {
        if (selectedBooklist.id !== -1) {
            setBookListSelected(true);
        }
    }, [selectedBooklist]);

    const handleCloseList = () => {
        setBookListSelected(false);
        setSelectedBooklist({ id: -1, name: "" });
    };

    const updateBookListName = async (editedBook: Book_list) => {
        // avoid updating the name with empty name value
        if (editedBook.name === "") return;
        const ok = await fetchUpdateBooklist(editedBook);
        if (ok?.ok) {
            setEditBookListFormVisible(false);
            await fetchBooklists();
        }
    };

    const renderBookLists = () => {
        let renderedBooklists = [];
        for (const booklist of booklists) {
            renderedBooklists.push(
                <Paper
                    elevation={10}
                    sx={{
                        padding: "1rem",
                        width: "60%",
                        margin: "auto",
                        marginBottom: 1
                    }}
                >
                    <Stack direction="row" justifyContent="space-between">
                        <Stack>
                            <Typography
                                sx={{
                                    fontFamily: "Montserrat",
                                    fontWeight: "bold",
                                    margin: "auto"
                                }}
                            >
                                {booklist.name}
                            </Typography>
                        </Stack>
                        <Stack marginY={1}>
                            <Button
                                sx={listBooksDeleteButton}
                                variant="contained"
                                /*
                                onClick={() => {
                                    navigate("/userlist");
                                }}*/
                                onClick={() => {
                                    handleUserBooksButton(booklist);
                                }}
                            >
                                View
                            </Button>
                            <Button
                                sx={listBooksLoanButton}
                                variant="contained"
                                onClick={async () => {
                                    // await fetchDeleteBooklist(booklist.id);
                                    // await fetchBooklists();
                                    setOneBookListDataToEditName(booklist);
                                    setEditBookListFormVisible(true);
                                }}
                            >
                                Edit Name
                            </Button>
                            <Button
                                sx={listBooksLoanButton}
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

    /*  using Card component and CardActionArea to click on whole card instead of button component
    const renderBookLists = () => {
        let renderedBooklists = [];
        for (const booklist of booklists) {
            renderedBooklists.push(
                <Card
                    elevation={10}
                    sx={{
                        width: "60%",
                        margin: "auto",
                        marginBottom: 1
                    }}
                >
                    <CardActionArea
                        sx={{ padding: 3 }}
                        onClick={() => {
                            navigate("/booklistviet");
                        }}
                    >
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
                    </CardActionArea>
                </Card>
            );
        }
        return renderedBooklists;
    };*/

    return bookListSelected ? (
        <UserBooks
            booklist={selectedBooklist}
            handleCloseList={handleCloseList}
        />
    ) : (
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

            <Fab
                aria-label="add"
                sx={userPageBackButton}
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

            {renderBookLists()}

            <BooklistForm
                visible={formVisible}
                setVisible={setFormVisible}
                booklist={formBooklist}
                setBooklist={setFormBooklist}
                editing={formEditing}
                updateBooklists={fetchBooklists}
            />
            <EditBookListName
                visible={editBookListFormVisible}
                setVisible={setEditBookListFormVisible}
                oneBookListDataToEditName={oneBookListDataToEditName}
                setOneBookListDataToEditName={setOneBookListDataToEditName}
                updateBookListName={updateBookListName}
            />
        </>
    );
};

export default UserBooklists;
