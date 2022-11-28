import { Button, Paper, Stack, Typography, Fab } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { FC, useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
    fetchListInfo,
    fetchListBooks,
    fetchDeleteListEntryBook
} from "../../../fetchFunctions";
import Book from "../../../interfaces/book.interface";
import { listBooksDeleteButton, userPageBackButton } from "../../../sxStyles";
import { TheContext } from "../../../TheContext";

const ListPage: FC = (): JSX.Element => {
    const [userId, setUserId] = useState<number | null>(null);
    const [username, setUsername] = useState("");
    const [name, setName] = useState("");
    const [books, setBooks] = useState<Book[]>([]);
    const [invalid, setInvalid] = useState(false);

    const { id } = useParams();
    const navigate = useNavigate();
    const context = useContext(TheContext);

    useEffect(() => {
        if (!id || isNaN(Number(id))) {
            setInvalid(true);
            return;
        }

        fetchListInfo(Number(id)).then((data) => {
            if (!data) {
                setInvalid(true);
                return;
            }
            setName(data.name);
            setUsername(data.username);
            setUserId(data.userId);
        });
        fetchListBooks(Number(id)).then((data) => setBooks(data));
    }, [id]);

    return (
        <>
            <Fab
                aria-label="back"
                sx={userPageBackButton}
                onClick={() => navigate("/")}
            >
                <ArrowBackIcon />
            </Fab>
            <Stack sx={{ textAlign: "center" }}>
                <Typography variant="h3">
                    {invalid ? "Non-existant list" : name}
                </Typography>
                {!invalid && (
                    <Typography variant="subtitle1">
                        Author: {username}
                    </Typography>
                )}
                {!invalid &&
                    books.map((book) => (
                        <Paper
                            key={book.id}
                            elevation={10}
                            sx={{
                                padding: "2rem",
                                width: "60%",
                                margin: "auto",
                                marginBottom: 1
                            }}
                        >
                            <Stack
                                direction="row"
                                justifyContent="space-between"
                            >
                                <Stack>
                                    <Typography
                                        sx={{
                                            fontFamily: "Montserrat",
                                            fontWeight: "bold"
                                        }}
                                    >
                                        {book.title}
                                    </Typography>
                                    <Typography
                                        sx={{
                                            fontFamily: "Merriweather",
                                            fontWeight: "light"
                                        }}
                                    >
                                        Author: {book.author}
                                    </Typography>
                                    <Typography
                                        sx={{
                                            fontFamily: "Merriweather",
                                            fontWeight: "light"
                                        }}
                                    >
                                        Topic: {book.topic}
                                    </Typography>
                                    <Typography
                                        sx={{
                                            fontFamily: "Merriweather",
                                            fontWeight: "light"
                                        }}
                                    >
                                        isbn: {book.isbn}
                                    </Typography>
                                    <Typography
                                        sx={{
                                            fontFamily: "Merriweather",
                                            fontWeight: "light"
                                        }}
                                    >
                                        Location: {book.location}
                                    </Typography>

                                    {context?.user?.id == userId && (
                                        <Stack marginY={5}>
                                            <Button
                                                sx={listBooksDeleteButton}
                                                variant="contained"
                                                onClick={async () => {
                                                    if (id) {
                                                        let status =
                                                            await fetchDeleteListEntryBook(
                                                                Number(id),
                                                                book.id
                                                            );
                                                        if (status.ok) {
                                                            setBooks(
                                                                books.filter(
                                                                    (b) =>
                                                                        b.id !=
                                                                        book.id
                                                                )
                                                            );
                                                        }
                                                    }
                                                }}
                                            >
                                                Remove
                                            </Button>
                                        </Stack>
                                    )}
                                </Stack>
                            </Stack>
                        </Paper>
                    ))}
            </Stack>
        </>
    );
};

export default ListPage;
