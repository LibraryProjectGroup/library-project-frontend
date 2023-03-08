import { SxProps } from "@mui/material";

// LoginPage

export const loginButton: SxProps = {
  fontFamily: "Montserrat",
  fontWeight: "bold",
  fontSize: 15,
  width: "100%",
  backgroundColor: "#FFD100",
  color: "black",
  "&:hover": {
    backgroundColor: "#FFB500",
  },
  padding: 2,
};

export const textButton: SxProps = {
  fontFamily: "Montserrat",
  fontWeight: 600,
  fontSize: 13,
  width: "100%",
  color: "black",
  padding: 2,
};

export const loginBox: SxProps = {
  display: "flex",
  flexDirection: "Column",
  margin: "1rem 0",
};

export const AuthBoxTitle: SxProps = {
  textAlign: "center",
  fontFamily: "Montserrat",
  fontWeight: "bold",
};

export const loginRegisterTitle: SxProps = {
  display: "flex",
  alignItems: "center",
  justifyContent: { xs: "center", md: "flex-start" },
  fontFamily: "Merriweather",
  fontWeight: "bold",
  fontSize: { xs: "4rem", sm: "6rem" },
  marginBottom: "2rem",
};

export const loginRegisterContent: SxProps = {
  fontFamily: "Merriweather",
  fontWeight: "light",
};

export const loginPaper: SxProps = {
  width: "100%",
  height: "auto",
  margin: "1rem",
};

// AddBook

export const addBookFormBox: SxProps = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  paddingTop: 4,
  paddingX: 4,
  paddingBottom: 2,
};

export const addBookAddButton: SxProps = {
  fontWeight: "bold",
  fontSize: 15,
  marginLeft: 5,
  marginBottom: 2,
  //width: "30%",
  backgroundColor: "#FFD100",
  color: "black",
  "&:hover": {
    backgroundColor: "#FFB500",
  },
  //padding: 2,
};

export const addBookCancelButton: SxProps = {
  fontFamily: "Montserrat",
  fontWeight: "bold",
  fontSize: 15,
  //width: "30%",
  backgroundColor: "#FFD100",
  color: "black",
  "&:hover": {
    backgroundColor: "#FFB500",
  },
  //padding: 2,
};

// EditBook

export const editBookBox: SxProps = {
  position: "absolute",
  top: "50%",
  left: "50%",
  width: { xs: "15rem", md: "25rem" },
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 24,
  padding: "2rem 2rem 1rem 2rem",
};

export const editBookUpdateButton: SxProps = {
  fontFamily: "Montserrat",
  fontWeight: "bold",
  fontSize: 15,
  //width: "30%",
  backgroundColor: "#FFD100",
  color: "black",
  "&:hover": {
    backgroundColor: "#FFB500",
  },
  //padding: 2,
};

export const editBookCancelButton: SxProps = {
  fontFamily: "Montserrat",
  fontWeight: "bold",
  fontSize: 15,
  //width: "30%",
  backgroundColor: "#FFD100",
  color: "black",
  "&:hover": {
    backgroundColor: "#FFB500",
  },
  //padding: 2,
};

// ListBooks

export const listBooksFavoriteButton: SxProps = {
  fontFamily: "Montserrat",
  fontWeight: "bold",
  color: "#545353",
  width: 20,
  height: 20,
  left: 90,
  bottom: 20,
};

export const listBooksDeleteButton: SxProps = {
  fontFamily: "Montserrat",
  fontWeight: "bold",
  fontSize: 15,
  //width: "30%",
  whiteSpace: "nowrap",
  backgroundColor: "#FFD100",
  color: "black",
  "&:hover": {
    backgroundColor: "#FFB500",
  },
  //padding: 1,
};

export const listBooksEditButton: SxProps = {
  fontFamily: "Montserrat",
  fontWeight: "bold",
  fontSize: 15,
  marginTop: "1rem",
  //width: "30%",
  whiteSpace: "nowrap",
  backgroundColor: "#FFD100",
  color: "black",
  "&:hover": {
    backgroundColor: "#FFB500",
  },
  //padding: 1,
};

export const listBooksEntryAddButton: SxProps = {
  fontFamily: "Montserrat",
  fontWeight: "bold",
  fontSize: 15,
  // margin: "3px",
  //marginTop: "1rem",
  //width: "30%",
  whiteSpace: "nowrap",
  backgroundColor: "#FFD100",
  color: "black",
  "&:hover": {
    backgroundColor: "#FFB500",
  },
  //padding: 1,
};

export const listBooksLoanButton: SxProps = {
  fontFamily: "Montserrat",
  fontWeight: "bold",
  fontSize: 15,
  //width: "30%",
  backgroundColor: "#FFD100",
  marginTop: "1rem",
  color: "black",
  "&:hover": {
    backgroundColor: "#FFB500",
  },
  //padding: 1,
};

// UserPage

export const userPageReturnButton: SxProps = {
  fontFamily: "Montserrat",
  fontWeight: "bold",
  fontSize: 15,
  marginTop: 5,
  //width: "30%",
  backgroundColor: "#FFD100",
  color: "black",
  "&:hover": {
    backgroundColor: "#FFB500",
  },
  //padding: 1,
};

export const userPageBackButton: SxProps = {
  fontSize: 15,
  marginLeft: { sm: 0, md: "2.5rem" },
  marginBottom: 2,
  backgroundColor: "#FFD100",
  color: "black",
  "&:hover": {
    backgroundColor: "#FFB500",
  },
};

export const booklistsPageBackAndAddButtons: SxProps = {
  fontSize: 15,
  marginLeft: { sm: 0, md: "2.5rem" },
  marginBottom: 2,
  backgroundColor: "#FFD100",
  color: "black",
  "&:hover": {
    backgroundColor: "#FFB500",
  },
};

export const userLogOutButton: SxProps = {
  marginRight: 1,
  marginLeft: 1,
  backgroundColor: "#FFD100",
  color: "primary",
  "&:hover": {
    backgroundColor: "#FFB500",
  },
};

export const userPageMyListsButton: SxProps = {
  fontFamily: "Montserrat",
  fontWeight: "bold",
  fontSize: 15,
  backgroundColor: "#FFD100",
  marginLeft: 5,
  color: "black",
  cursor: "pointer",
  "&:hover": {
    backgroundColor: "#FFB500",
  },
};

//Navbar pages styles
export const navbarPagesHamburger: SxProps = {
  fontFamily: "Montserrat",
  fontWeight: "bold",
  fontSize: 15,
  color: "black",
};

export const navbarMenuItemHamburger: SxProps = {
  cursor: "pointer",
  "&:hover": {
    borderBottom: "2px solid #FFB500",
  },
};

export const navbarPagesLarge: SxProps = {
  fontFamily: "Montserrat",
  fontWeight: "bold",
  fontSize: 15,
  color: "black",
  cursor: "pointer",
  "&:hover": {
    borderBottom: "2px solid #FFB500",
  },
};

// Admin page
export const adminPageTabs: SxProps = {
  width: "100%",
};

export const adminPageTab: SxProps = {
  fontFamily: "Montserrat",
  fontWeight: "bold",
  fontSize: 15,
};

export const adminDeleteButton: SxProps = {
  fontFamily: "Montserrat",
  fontWeight: "bold",
  fontSize: 15,
  //width: "30%",
  backgroundColor: "red",
  marginTop: "1rem",
  color: "black",
  "&:hover": {
    backgroundColor: "#FFB500",
  },
  //padding: 1,
};

// EditUser

export const editUserBox: SxProps = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  paddingTop: 4,
  paddingX: 4,
  paddingBottom: 2,
};

export const editUserCancelButton: SxProps = {
  fontFamily: "Montserrat",
  fontWeight: "bold",
  fontSize: 15,
  //width: "30%",
  backgroundColor: "#FFD100",
  color: "black",
  "&:hover": {
    backgroundColor: "#FFB500",
  },
  //padding: 2,
};

export const editUserUpdateButton: SxProps = {
  fontFamily: "Montserrat",
  fontWeight: "bold",
  fontSize: 15,
  //width: "30%",
  backgroundColor: "#FFD100",
  color: "black",
  "&:hover": {
    backgroundColor: "#FFB500",
  },
  //padding: 2,
};

// EditBookList

export const editBookListBox: SxProps = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  // maxWidth: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  paddingTop: 4,
  paddingX: 4,
  paddingBottom: 2,
};
export const editBookListUpdateButton: SxProps = {
  fontFamily: "Montserrat",
  fontWeight: "bold",
  fontSize: 15,
  //width: "30%",
  backgroundColor: "#FFD100",
  color: "black",
  "&:hover": {
    backgroundColor: "#FFB500",
  },
  //padding: 2,
};

export const editBookListCancelButton: SxProps = {
  fontFamily: "Montserrat",
  fontWeight: "bold",
  fontSize: 15,
  //width: "30%",
  backgroundColor: "#FFD100",
  color: "black",
  "&:hover": {
    backgroundColor: "#FFB500",
  },
  //padding: 2,
};
