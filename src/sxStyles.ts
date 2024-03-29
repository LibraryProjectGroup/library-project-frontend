import { SxProps } from '@mui/material'

// LoginPage

export const loginButton: SxProps = {
  fontFamily: 'Montserrat',
  fontWeight: 'bold',
  fontSize: 15,
  width: '100%',
  backgroundColor: '#FFD100',
  color: 'black',
  '&:hover': {
    backgroundColor: '#FFB500',
  },
  padding: 2,
}

export const textButton: SxProps = {
  fontFamily: 'Montserrat',
  fontWeight: 600,
  fontSize: 13,
  width: '100%',
  color: 'black',
  padding: 2,
}

export const loginBox: SxProps = {
  display: 'flex',
  flexDirection: 'Column',
  margin: '1rem 0',
}

export const AuthBoxTitle: SxProps = {
  textAlign: 'center',
  fontFamily: 'Montserrat',
  fontWeight: 'bold',
}

export const loginRegisterTitle: SxProps = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: { xs: 'center', md: 'flex-start' },
  fontFamily: 'Merriweather',
  fontWeight: 'bold',
  fontSize: { xs: '4rem', sm: '6rem' },
  marginBottom: '2rem',
}

export const loginRegisterContent: SxProps = {
  fontFamily: 'Merriweather',
  fontWeight: 'light',
}

export const loginPaper: SxProps = {
  width: '100%',
  height: 'auto',
  margin: '1rem',
}

export const createAccountBoxTitleText: SxProps = {
  textAlign: 'center',
  fontFamily: 'Montserrat',
  fontWeight: 'bold',
}

export const createAccountHeaderTitleText: SxProps = {
  fontFamily: 'Merriweather',
  fontWeight: 'bold',
  paddingBottom: 5,
}

export const createAccountHeaderContentText: SxProps = {
  fontFamily: 'Merriweather',
  fontWeight: 'light',
}

// AddBook

export const addBookFormBox: SxProps = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  paddingTop: 4,
  paddingX: 4,
  paddingBottom: 2,
}

export const addBookAddButton: SxProps = {
  fontWeight: 'bold',
  fontSize: 15,
  marginLeft: 5,
  marginBottom: 2,
  backgroundColor: '#FFD100',
  color: 'black',
  '&:hover': {
    backgroundColor: '#FFB500',
  },
}

export const addBookCancelButton: SxProps = {
  fontFamily: 'Montserrat',
  fontWeight: 'bold',
  fontSize: 15,
  backgroundColor: '#FFD100',
  color: 'black',
  '&:hover': {
    backgroundColor: '#FFB500',
  },
}

// EditBook

export const editBookBox: SxProps = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  width: { xs: '15rem', md: '25rem' },
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  boxShadow: 24,
  padding: '2rem 2rem 1rem 2rem',
}

export const editBookUpdateButton: SxProps = {
  fontFamily: 'Montserrat',
  fontWeight: 'bold',
  fontSize: 15,
  backgroundColor: '#FFD100',
  color: 'black',
  '&:hover': {
    backgroundColor: '#FFB500',
  },
}

export const editBookCancelButton: SxProps = {
  fontFamily: 'Montserrat',
  fontWeight: 'bold',
  fontSize: 15,
  backgroundColor: '#FFD100',
  color: 'black',
  '&:hover': {
    backgroundColor: '#FFB500',
  },
}

// ListBooks

export const listBooksFavoriteButton: SxProps = {
  fontFamily: 'Montserrat',
  fontWeight: 'bold',
  color: '#545353',
  width: 20,
  height: 20,
  left: 90,
  bottom: 20,
}

export const listBooksDeleteButton: SxProps = {
  fontFamily: 'Montserrat',
  fontWeight: 'bold',
  fontSize: 15,
  whiteSpace: 'nowrap',
  backgroundColor: '#FFD100',
  color: 'black',
  '&:hover': {
    backgroundColor: '#FFB500',
  },
}

export const listBooksEditButton: SxProps = {
  fontFamily: 'Montserrat',
  fontWeight: 'bold',
  fontSize: 15,
  marginTop: '1rem',
  whiteSpace: 'nowrap',
  backgroundColor: '#FFD100',
  color: 'black',
  '&:hover': {
    backgroundColor: '#FFB500',
  },
}

export const listBooksLikeButton: SxProps = {
  fontFamily: 'Montserrat',
  fontWeight: 'bold',
  fontSize: 15,
  marginTop: '1rem',
  whiteSpace: 'nowrap',
  backgroundColor: '#FFD100',
  color: 'black',
  '&:hover': {
    backgroundColor: '#FFB500',
  },
  width: 40,
  height: 38.25,
  position: { xs: 'absolute', md: 'inherit' },
  bottom: 0,
  right: 0,
}

export const listBooksLikeButtonGrid: SxProps = {
  fontFamily: 'Montserrat',
  fontWeight: 'bold',
  fontSize: 15,
  marginTop: '1rem',
  marginBottom: '1rem',
  whiteSpace: 'nowrap',
  backgroundColor: '#FFD100',
  color: 'black',
  '&:hover': {
    backgroundColor: '#FFB500',
  },
  width: 40,
  height: 38.25,
  position: 'inherit',
}

export const listBooksEntryAddButton: SxProps = {
  fontFamily: 'Montserrat',
  fontWeight: 'bold',
  fontSize: 15,
  // margin: "3px",
  //marginTop: "1rem",
  //width: "30%",
  whiteSpace: 'nowrap',
  backgroundColor: '#FFD100',
  color: 'black',
  '&:hover': {
    backgroundColor: '#FFB500',
  },
  //padding: 1,
}

export const listBooksLoanButton: SxProps = {
  fontFamily: 'Montserrat',
  fontWeight: 'bold',
  fontSize: 15,
  backgroundColor: '#FFD100',
  marginTop: '1rem',
  color: 'black',
  '&:hover': {
    backgroundColor: '#FFB500',
  },
}

// Reviews

export const showReviewsButton: SxProps = {
  maxWidth: 200,
  color: 'black',
}

export const reviewDeleteButton: SxProps = {
  color: 'red',
  position: 'absolute',
  top: 5,
  right: 10,
}

// UserPage

export const userPageReturnButton: SxProps = {
  fontFamily: 'Montserrat',
  fontWeight: 'bold',
  fontSize: 15,
  marginTop: 5,
  backgroundColor: '#FFD100',
  color: 'black',
  '&:hover': {
    backgroundColor: '#FFB500',
  },
}

export const userPageBackButton: SxProps = {
  fontSize: 15,
  marginLeft: { sm: 0, md: '2.5rem' },
  marginBottom: 2,
  backgroundColor: '#FFD100',
  color: 'black',
  '&:hover': {
    backgroundColor: '#FFB500',
  },
}

export const booklistsPageBackAndAddButtons: SxProps = {
  fontSize: 15,
  marginLeft: { sm: 0, md: '2.5rem' },
  marginBottom: 2,
  backgroundColor: '#FFD100',
  color: 'black',
  '&:hover': {
    backgroundColor: '#FFB500',
  },
}

export const userProfileButton: SxProps = {
  marginRight: 1,
  marginLeft: 1,
  backgroundColor: '#FFD100',
  color: 'primary',
  '&:hover': {
    backgroundColor: '#FFB500',
  },
}

export const userPageMyListsButton: SxProps = {
  fontFamily: 'Montserrat',
  fontWeight: 'bold',
  fontSize: 15,
  backgroundColor: '#FFD100',
  marginLeft: 5,
  color: 'black',
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: '#FFB500',
  },
}

//Navbar pages styles
export const navbarPagesHamburger: SxProps = {
  fontFamily: 'Montserrat',
  fontWeight: 'bold',
  fontSize: 15,
  color: 'black',
}

export const navbarMenuItemHamburger: SxProps = {
  cursor: 'pointer',
  '&:hover': {
    borderBottom: '2px solid #FFB500',
  },
}

export const navbarPagesLarge: SxProps = {
  fontFamily: 'Montserrat',
  fontWeight: 'bold',
  fontSize: 15,
  color: 'black',
  cursor: 'pointer',
  '&:hover': {
    borderBottom: '2px solid #FFB500',
  },
}

// Admin page
export const adminPageTabs: SxProps = {
  width: '100%',
}

export const adminPageTab: SxProps = {
  fontFamily: 'Montserrat',
  fontWeight: 'bold',
  fontSize: 15,
}

export const adminDeleteButton: SxProps = {
  fontFamily: 'Montserrat',
  fontWeight: 'bold',
  fontSize: 15,
  backgroundColor: 'red',
  marginTop: '1rem',
  color: 'black',
  '&:hover': {
    backgroundColor: '#FFB500',
  },
}

export const adminAddOfficeButton: SxProps = {
  fontWeight: 'bold',
  fontSize: 15,
  marginBottom: 2,
  backgroundColor: '#FFD100',
  color: 'black',
  '&:hover': {
    backgroundColor: '#FFB500',
  },
  width: 200,
}
// EditUser

export const editUserBox: SxProps = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  paddingTop: 4,
  paddingX: 4,
  paddingBottom: 2,
}

export const editUserCancelButton: SxProps = {
  fontFamily: 'Montserrat',
  fontWeight: 'bold',
  fontSize: 15,
  backgroundColor: '#FFD100',
  color: 'black',
  '&:hover': {
    backgroundColor: '#FFB500',
  },
}

export const editUserUpdateButton: SxProps = {
  fontFamily: 'Montserrat',
  fontWeight: 'bold',
  fontSize: 15,
  backgroundColor: '#FFD100',
  color: 'black',
  '&:hover': {
    backgroundColor: '#FFB500',
  },
}

// EditBookList

export const editBookListBox: SxProps = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  // maxWidth: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  paddingTop: 4,
  paddingX: 4,
  paddingBottom: 2,
}
export const editBookListUpdateButton: SxProps = {
  fontFamily: 'Montserrat',
  fontWeight: 'bold',
  fontSize: 15,
  backgroundColor: '#FFD100',
  color: 'black',
  '&:hover': {
    backgroundColor: '#FFB500',
  },
}

export const editBookListCancelButton: SxProps = {
  fontFamily: 'Montserrat',
  fontWeight: 'bold',
  fontSize: 15,
  backgroundColor: '#FFD100',
  color: 'black',
  '&:hover': {
    backgroundColor: '#FFB500',
  },
}

//Modal styles
export const modalPopup: SxProps = {
  fontSize: 12,
}

export const headerPopup: SxProps = {
  width: '100%',
  borderBottom: '1px solid gray',
  fontSize: 18,
  textAlign: 'center',
  padding: 5,
}

export const contentPopup: SxProps = {
  width: '100%',
  padding: '10px 5px',
}

export const actionsPopup: SxProps = {
  width: '100%',
  padding: '10px 5px',
  margin: 'auto',
  textAlign: 'center',
}

export const closePopup: SxProps = {
  cursor: 'pointer',
  position: 'absolute',
  display: 'block',
  padding: '2px 5px',
  lineHeight: 20,
  right: -10,
  top: -10,
  fontSize: 24,
  background: '#ffffff',
  borderRadius: 18,
  border: '1px solid #cfcece',
}

export const cancelButton: SxProps = {
  fontFamily: 'Montserrat',
  fontWeight: 'bold',
  fontSize: 15,
  backgroundColor: '#FFD100',
  color: 'black',
  '&:hover': {
    backgroundColor: '#FFB500',
  },
}

export const confirmButton: SxProps = {
  fontFamily: 'Montserrat',
  fontWeight: 'bold',
  fontSize: 15,
  backgroundColor: '#FFD100',
  color: 'black',
  '&:hover': {
    backgroundColor: '#FFB500',
  },
}

export const bookBox: SxProps = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  width: { xs: '15rem', md: '25rem' },
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  boxShadow: 24,
  padding: '2rem 2rem 1rem 2rem',
}

//Popup box Styling
export const popupContainer: SxProps = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  width: { xs: '15rem', md: '25rem' },
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  boxShadow: 24,
  padding: '2rem 2rem 1rem 2rem',
}
