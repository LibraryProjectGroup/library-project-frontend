import * as React from 'react'
import { FC, useState, useEffect } from 'react'
import {
  Popover,
  Box,
  Button,
  Typography,
  List,
  ListItem,
  Stack,
} from '@mui/material'
import {
  listBooksFavoriteButton as favButton,
  userPageMyListsButton,
  listBooksEntryAddButton,
} from '../../../sxStyles'
import Book from '../../../interfaces/book.interface'
import Book_list from '../../../interfaces/book_list.interface'
import Book_list_entry from '../../../interfaces/book_list_entry.interface'
import { fetchUserBooklists, fetchAddEntry } from '../../../fetchFunctions'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const UserListPopup: FC<{ book: Book }> = ({ book }): JSX.Element => {
  const [booklists, setBooklists] = useState<Book_list[]>([])
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (Boolean(anchorEl) === true) {
      setOpen(true);
      fetchBooklists();
    }
  }, [anchorEl])

  const navigate = useNavigate()

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setOpen(false);
    setAnchorEl(null);
  }

  const handleAddButton = (list: Book_list) => {
    const addEntry: Book_list_entry = {
      id: -1,
      list: list.id,
      book: book.id,
    }
    console.log(addEntry)
    //TODO: add check to prevent duplicate entries
    //  fetch all entries of user
    //  compare addEntry to fetched entries
    fetchAddEntry(addEntry)
    // close popup after adding
    //setAnchorEl(null)
    handleClose()
    SuccessMessage()
  }

  const SuccessMessage = () =>
    toast.success('Book was added successfully', {
      containerId: 'ToastSuccess',
  })

  const id = open ? 'simple-popover' : undefined
  const fetchBooklists = async () => {
    setBooklists(await fetchUserBooklists())
  }

  const addBookToList = async (newEntry: Book_list_entry) => {
    const response = await fetchAddEntry(newEntry)
  }

  /*
    // note(markus):    maybe doing checkmark is too advanced to complete in the remaining time
    //                  suggestion to just use a button to add then delete only from the list view for now
    
    const handleBooklistCheckmark = (e: React.SyntheticEvent, list:Book_list) => {
        //console.log(book)
        //console.log(book.id)
        console.log( e.target.checked )
        console.log( list )
        if(e.target.checked){
            //add book to list of checkmark

        } else {
            //remove book from list

        }
    }
    */

  const renderBooklists = () => {
    let booklist = []
    let idx = 0
    for (const list of booklists) {
      if (!list) continue
      booklist.push(
        <Box key={idx}>
          <Stack
            direction="row"
            justifyContent="space-between"
            sx={{ paddingRight: 2 }}
          >
            <ListItem key={list.id}>{list.name}</ListItem>
            <Button
              sx={listBooksEntryAddButton}
              onClick={() => {
                handleAddButton(list)
              }}
            >
              Add
            </Button>
          </Stack>
        </Box>
      )
      idx++
    }

    // note(markus): this part shows for a split second when clicking a new +add button
    if (booklists.length < 1) {
      booklist.push(
        <>
          <Box sx={{ textAlign: 'center', marginTop: 2 }}>
            <Typography>You have no lists yet.</Typography>
            <Box sx={{ marginRight: 5 }}>
              <Button
                sx={userPageMyListsButton}
                variant="contained"
                onClick={() => {
                  navigate('/booklists')
                }}
              >
                Go to My Lists
              </Button>
            </Box>
          </Box>
        </>
      )
    }

    return booklist
  }

  /*
    const renderBooklists = () => {
        let booklist = [];
        for (const list of booklists) {
            if (!list) continue;
            booklist.push(<ListItem key={list.id}>{list.name}</ListItem>);
        }
    
        return booklist;
    };*/

  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        justifyContent: { xs: 'flex-start', md: 'flex-end' },
      }}
    >
      <Button
        size="small"
        sx={{
          fontFamily: 'Montserrat',
          fontWeight: 'bold',
          color: '#545353',
          marginY: '0.5rem',
        }}
        onClick={handleClick}
      >
        + Add to list
      </Button>
      {booklists.length > 0 && (
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        // transformOrigin={{
        // 	vertical: "bottom",
        // 	horizontal: "center",
        // }}
      >
        <List>
          {booklists.map((list, id) => {
            return (
              <Box key={id}>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  sx={{ paddingRight: 2 }}
                >
                  <ListItem key={list.id}>{list.name}</ListItem>
                  <Button
                    sx={listBooksEntryAddButton}
                    onClick={() => {
                      handleAddButton(list)
                    }}
                  >
                    Add
                  </Button>
                </Stack>
              </Box>
            )
          })}
        </List>
      </Popover>
      )}
    </Box>
  )
}

export default UserListPopup
