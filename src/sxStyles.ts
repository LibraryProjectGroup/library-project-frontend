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
        backgroundColor: "#FFB500"
    },
    padding: 2
};

export const loginBox: SxProps = {
    display: "flex",
    flexDirection: "Column",
    marginBottom: 5,
    marginTop: 4
};

export const loginAuthBox: SxProps = {
    padding: 10
};

export const loginAuthBoxTitle: SxProps = {
    textAlign: "center",
    fontFamily: "Montserrat",
    fontWeight: "bold"
};
export const loginAuthBoxHeaderText: SxProps = {
    textAlign: "center",
    fontFamily: "Montserrat",
    fontWeight: "bold"
};

export const loginHeaderTitleText: SxProps = {
    fontFamily: "Merriweather",
    fontWeight: "bold",
    paddingBottom: 5
};

export const loginHeaderContentText: SxProps = {
    fontFamily: "Merriweather",
    fontWeight: "light"
};

export const loginPaper: SxProps = {
    width: 500,
    height: 500
};

// CreateAccount

export const createAccountReturnButton: SxProps = {
    fontFamily: "Montserrat",
    fontWeight: "bold",
    fontSize: 15,
    width: "100%",
    backgroundColor: "#FFD100",
    color: "black",
    "&:hover": {
        backgroundColor: "#FFB500"
    },
    padding: 2
};

export const createAccountSignButton: SxProps = {
    fontFamily: "Montserrat",
    fontWeight: "bold",
    fontSize: 15,
    width: "40%",

    backgroundColor: "#FFD100",
    color: "black",
    "&:hover": {
        backgroundColor: "#FFB500"
    },
    padding: 2
};

export const createAccountBoxTitleText: SxProps = {
    textAlign: "center",
    fontFamily: "Montserrat",
    fontWeight: "bold"
};

export const createAccountHeaderTitleText: SxProps = {
    fontFamily: "Merriweather",
    fontWeight: "bold",
    paddingBottom: 5
};

export const createAccountHeaderContentText: SxProps = {
    fontFamily: "Merriweather",
    fontWeight: "light"
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
    paddingBottom: 2
};

export const addBookAddButton: SxProps = {
    fontWeight: "bold",
    fontSize: 15,
    marginLeft:5,
    //width: "30%",
    backgroundColor: "#FFD100",
    color: "black",
    "&:hover": {
        backgroundColor: "#FFB500"
    }
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
        backgroundColor: "#FFB500"
    }
    //padding: 2,
};

// EditBook

export const editBookBox: SxProps = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    boxShadow: 24,
    paddingTop: 4,
    paddingX: 4,
    paddingBottom: 2
};

export const editBookUpdateButton: SxProps = {
    fontFamily: "Montserrat",
    fontWeight: "bold",
    fontSize: 15,
    //width: "30%",
    backgroundColor: "#FFD100",
    color: "black",
    "&:hover": {
        backgroundColor: "#FFB500"
    }
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
        backgroundColor: "#FFB500"
    }
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
    bottom: 20
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
        backgroundColor: "#FFB500"
    }
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
        backgroundColor: "#FFB500"
    }
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
        backgroundColor: "#FFB500"
    }
    //padding: 1,
};

// UserPage

export const userPageReturnButton: SxProps = {
    fontFamily: "Montserrat",
    fontWeight: "bold",
    fontSize: 15,
    //width: "30%",
    backgroundColor: "#FFD100",
    color: "black",
    "&:hover": {
        backgroundColor: "#FFB500"
    }
    //padding: 1,
};

export const userPageBackButton: SxProps = {
    position: "relative",
    top: 50,
    marginBottom: 10,
    marginLeft: 5,
    backgroundColor: "#FFD100",
    color: "black",
    "&:hover": {
        backgroundColor: "#FFB500"
    }
};

export const userPageMyListsButton: SxProps = {
    fontFamily: "Montserrat",
    fontWeight: "bold",
    fontSize: 15,
    position: "relative",
    top: 50,
    marginBottom: 10,
    marginLeft: 5,
    backgroundColor: "#FFD100",
    color: "black",
    "&:hover": {
        backgroundColor: "#FFB500"
    }
};

// Admin page

export const adminPageTabs: SxProps = {
    width: "100%"
};

export const adminPageTab: SxProps = {
    fontFamily: "Montserrat",
    fontWeight: "bold",
    fontSize: 15,
    backgroundColor: "#FFD100",
    width: "100%"
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
        backgroundColor: "#FFB500"
    }
    //padding: 1,
};
