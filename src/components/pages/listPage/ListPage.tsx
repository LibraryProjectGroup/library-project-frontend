import {
  Button,
  Paper,
  Stack,
  Typography,
  Fab,
  Box,
  Snackbar,
  Alert,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { FC, useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  fetchListInfo,
  fetchListBooks,
  fetchDeleteListEntryBook,
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
  const [popupOpen, setPopupOpen] = useState(false);

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
    <Box sx={{ marginTop: 5, marginBottom: 5, position: "relative" }}>
      <Fab
        aria-label="back"
        sx={userPageBackButton}
        onClick={() => navigate("/booklists")}
      >
        <ArrowBackIcon />
      </Fab>
      <Stack sx={{ textAlign: "center" }}>
        <Typography variant="h3">
          {invalid ? "Non-existant list" : name}
        </Typography>
        {!invalid && (
          <>
            <Typography variant="subtitle1" sx={{ paddingBottom: 2 }}>
              Created by: {username}
            </Typography>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginBottom: "10px",
              }}
            >
              <Button
                sx={listBooksDeleteButton}
                onClick={() => {
                  navigator.clipboard.writeText(
                    `${window.location.origin}/list/${id}`
                  );
                  setPopupOpen(true);
                }}
              >
                Copy Link
              </Button>
            </div>
          </>
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
                marginBottom: 1,
              }}
            >
              <Stack direction="row" justifyContent="space-between">
                <Stack>
                  <Typography
                    sx={{
                      fontFamily: "Montserrat",
                      fontWeight: "bold",
                    }}
                  >
                    {book.title}
                  </Typography>
                  <Typography
                    sx={{
                      fontFamily: "Merriweather",
                      fontWeight: "light",
                    }}
                  >
                    Author: {book.author}
                  </Typography>

                  <Typography
                    sx={{
                      fontFamily: "Merriweather",
                      fontWeight: "light",
                    }}
                  >
                    Year: {book.year}
                  </Typography>

                  <Typography
                    sx={{
                      fontFamily: "Merriweather",
                      fontWeight: "light",
                    }}
                  >
                    Topic: {book.topic}
                  </Typography>
                  <Typography
                    sx={{
                      fontFamily: "Merriweather",
                      fontWeight: "light",
                    }}
                  >
                    isbn: {book.isbn}
                  </Typography>
                  <Typography
                    sx={{
                      fontFamily: "Merriweather",
                      fontWeight: "light",
                    }}
                  >
                    Location: {book.location}
                  </Typography>
                </Stack>

                {context?.user?.id == userId && (
                  <Stack marginY={5}>
                    <Button
                      sx={listBooksDeleteButton}
                      variant="contained"
                      onClick={async () => {
                        if (id) {
                          let status = await fetchDeleteListEntryBook(
                            Number(id),
                            book.id
                          );
                          if (status.ok) {
                            setBooks(books.filter((b) => b.id != book.id));
                          }
                        }
                      }}
                    >
                      Remove
                    </Button>
                  </Stack>
                )}
              </Stack>
            </Paper>
          ))}
      </Stack>
      <Snackbar
        open={popupOpen}
        autoHideDuration={6000}
        onClose={() => setPopupOpen(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => setPopupOpen(false)}
          severity="success"
          sx={{ width: "100%" }}
          variant="filled"
        >
          Copied list link to clipboard
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ListPage;
