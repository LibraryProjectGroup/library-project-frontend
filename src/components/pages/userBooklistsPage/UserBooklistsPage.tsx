import { useState, FC, useContext, useEffect } from 'react'
import {
  Paper,
  Typography,
  Button,
  Stack,
  Fab,
  Box,
  Tooltip,
  Container,
} from '@mui/material'
import { TheContext } from '../../../TheContext'
import { useNavigate } from 'react-router-dom'
import {
  fetchUpdateBooklist,
  fetchDeleteBooklist,
  fetchUserBooklists,
} from '../../../fetchFunctions'
import Book_list from '../../../interfaces/book_list.interface'
import { booklistsPageBackAndAddButtons } from '../../../sxStyles'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import AddIcon from '@mui/icons-material/Add'
import BooklistForm from './BooklistForm'
import {
  listBooksDeleteButton,
  listBooksLoanButton,
  addBookAddButton as addButton,
  listBooksFavoriteButton as favButton,
} from '../../../sxStyles'
import EditBookListName from './EditBookListName'

const UserBooklists: FC = (): JSX.Element => {
  const [booklists, setBooklists] = useState<Book_list[]>([])
  const [formBooklist, setFormBooklist] = useState<Book_list | null>(null)
  const [formVisible, setFormVisible] = useState(false)
  const [editBookListFormVisible, setEditBookListFormVisible] = useState(false)
  const [oneBookListDataToEditName, setOneBookListDataToEditName] =
    useState<Book_list | null>(null)
  const [formEditing, setFormEditing] = useState(false)

  const context = useContext(TheContext)
  const navigate = useNavigate()

  const fetchBooklists = async () => {
    setBooklists(await fetchUserBooklists())
  }

  useEffect(() => {
    fetchBooklists()
  }, [])

  const handleUserBooksButton = (booklist: Book_list) => {
    navigate(`/list/${booklist.id}`)
  }

  const updateBookListName = async (editedBook: Book_list) => {
    // avoid updating the name with empty name value
    if (editedBook.name === '') return
    const ok = await fetchUpdateBooklist(editedBook)
    if (ok?.ok) {
      setEditBookListFormVisible(false)
      await fetchBooklists()
    }
  }

  const renderBookLists = () => {
    let renderedBooklists = []
    for (const booklist of booklists) {
      renderedBooklists.push(
        <Paper
          elevation={10}
          sx={{
            padding: '1rem',
            width: '60%',
            margin: 'auto',
            marginBottom: 1,
          }}
        >
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            justifyContent="space-between"
          >
            <Stack>
              <Typography
                sx={{
                  fontFamily: 'Montserrat',
                  fontWeight: 'bold',
                  margin: 'auto',
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
                  handleUserBooksButton(booklist)
                }}
              >
                View
              </Button>
              <Button
                sx={listBooksLoanButton}
                variant="contained"
                onClick={async () => {
                  setOneBookListDataToEditName(booklist)
                  setEditBookListFormVisible(true)
                }}
              >
                Edit Name
              </Button>
              <Button
                sx={listBooksLoanButton}
                variant="contained"
                onClick={async () => {
                  await fetchDeleteBooklist(booklist.id)
                  await fetchBooklists()
                }}
              >
                Delete
              </Button>
            </Stack>
          </Stack>
        </Paper>
      )
    }
    return renderedBooklists
  }

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

  return (
    <Box sx={{ marginTop: 5, marginBottom: 5, position: 'relative' }}>
      <Container
        sx={{
          position: { sm: 'none', md: 'absolute' },
          display: 'flex',
          flexDirection: { sm: 'row', md: 'column' },
          gap: { xs: '2rem', md: 'unset' },
          justifyContent: 'center',
          alignItems: 'flex-start',
        }}
      >
        <Fab
          aria-label="back"
          sx={booklistsPageBackAndAddButtons}
          onClick={() => {
            navigate(-1)
          }}
        >
          <ArrowBackIcon />
        </Fab>
        <Tooltip title="Create new list">
          <Fab
            aria-label="add"
            sx={booklistsPageBackAndAddButtons}
            onClick={() => {
              setFormEditing(false)
              setFormBooklist({
                id: -1, // This wont get used
                name: '',
              })
              setFormVisible(true)
            }}
          >
            <AddIcon />
          </Fab>
        </Tooltip>
      </Container>

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
    </Box>
  )
}

export default UserBooklists
