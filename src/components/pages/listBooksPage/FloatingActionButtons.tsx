import React, { useContext } from 'react'
import { Tooltip, Fab, Box } from '@mui/material'
import AddCommentIcon from '@mui/icons-material/AddComment'
import AddIcon from '@mui/icons-material/Add'
import Book from '../../../interfaces/book.interface'
import { addBookAddButton as addButton } from '../../../sxStyles'
import { TheContext } from '../../../TheContext'

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
  const context = useContext(TheContext)
  // Check for null or undefined context or user object
  const isAdmin = context?.user?.administrator ?? false

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
      {/* Check that only admin can add new book */}
      {isAdmin ? (
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
                description: '',
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
      ) : null}
    </Box>
  )
}

export default FloatingActionButtons
