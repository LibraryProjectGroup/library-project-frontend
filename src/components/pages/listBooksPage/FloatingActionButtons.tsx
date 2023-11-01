import React from 'react'
import { Tooltip, Fab, Box } from '@mui/material'
import AddCommentIcon from '@mui/icons-material/AddComment'
import AddIcon from '@mui/icons-material/Add'
import Book from '../../../interfaces/book.interface'
import { addBookAddButton as addButton } from '../../../sxStyles'

interface FloatingActionButtonsProps {
  setRequestVisible: (visible: boolean) => void
  setFormEditing: (editing: boolean) => void
  setFormBook: (book: Book) => void // Import the Book interface
  setFormVisible: (visible: boolean) => void
}

const FloatingActionButtons: React.FC<FloatingActionButtonsProps> = ({
  setRequestVisible,
  setFormEditing,
  setFormBook,
  setFormVisible,
}) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'row', md: 'column' },
        justifyContent: { xs: 'center', md: 'flex-start' },
        alignItems: 'center',
      }}
    >
      <Tooltip title="Request a book">
        <Fab
          aria-label="request"
          sx={addButton}
          onClick={() => setRequestVisible(true)}
        >
          <AddCommentIcon />
        </Fab>
      </Tooltip>
      <Tooltip title="Add new book">
        <Fab
          aria-label="add"
          sx={addButton}
          onClick={() => {
            setFormEditing(false)
            setFormBook({
              id: -1, // This wont get used
              title: '',
              image: '',
              author: '',
              year: new Date().getFullYear(),
              topic: '',
              isbn: '',
              homeOfficeId: -1,
              homeOfficeCountry: 'XXX',
              homeOfficeName: '',
              deleted: false,
            })
            setFormVisible(true)
          }}
        >
          <AddIcon />
        </Fab>
      </Tooltip>
    </Box>
  )
}

export default FloatingActionButtons
