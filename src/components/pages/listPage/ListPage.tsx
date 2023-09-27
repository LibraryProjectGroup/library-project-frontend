import {
  Button,
  Paper,
  Stack,
  Typography,
  Fab,
  Box,
  Snackbar,
  Alert,
  Container,
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
import OfficeSpan from "../../OfficeSpan";

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
      <Container
        sx={{
          position: { sm: "none", md: "absolute" },
          display: "flex",
          flexDirection: { sm: "row", md: "column" },
          gap: { xs: "2rem", md: "unset" },
          justifyContent: "center",
          alignItems: "flex-start",
        }}
      >
        <Fab
          aria-label="back"
          sx={userPageBackButton}
          onClick={() => navigate(-1)}
        >
          <ArrowBackIcon />
        </Fab>
      </Container>
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
                display: "flex",
                alignItems: { xs: "center" },
                justifyContent: { xs: "center" },
                padding: "2rem",
                width: "60%",
                margin: "auto",
                marginBottom: 1,
                textAlign: "left",
              }}
            >
              <Stack
                sx={{
                  flexDirection: { xs: "column", md: "row" },
                  justifyContent: { xs: "center", md: "space-between" },
                  width: "100%",
                }}
              >
                <Stack>
                  <img
                    alt="Book cover"
                    width={120}
                    height={160}
                    src={book.image}
                  />
                </Stack>
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
                    ISBN: {book.isbn}
                  </Typography>

                  <Typography
                    sx={{
                      fontFamily: "Merriweather",
                      fontWeight: "light",
                    }}
                  >
                    Office:{" "}
                    <OfficeSpan
                      countryCode={book.homeOfficeCountry}
                      officeName={book.homeOfficeName}
                    />
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
