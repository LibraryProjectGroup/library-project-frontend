import React, { useState, FC } from "react";
import { Modal, Box, Button, Typography, TextField, Stack } from "@mui/material";

import BACKEND_URL from '../backendUrl'

interface IProps {
  addBookFormVisible: boolean
  setAddBookFormVisible: Function
  fetchAllBooks: Function
}

const AddBook: FC<IProps> = ({addBookFormVisible, setAddBookFormVisible, fetchAllBooks}: IProps): JSX.Element => {

  const [book, setBook] = useState({
    title: "",
    author: "",
    topic: "",
    isbn: "",
    location: "",
  });

  const onChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setBook({
      ...book,
      [event.target.name]: event.target.value,
    });
  };

  const addBook = async () => {
    try {
      const response = await fetch(
        `${BACKEND_URL}/book`,
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
            "Access-Control-Allow-Origin": BACKEND_URL
          },
          body: JSON.stringify(book),
        }
        );    
        if(response.ok){
          setAddBookFormVisible(false)
          fetchAllBooks()
        } else{
          console.log('something went wrong!')
        }
    } catch (error) {
      console.error();
    } finally{
      setBook({title:"", author:"", topic:"", isbn:"", location:""})
    }
  };

  if(addBookFormVisible) {
    return (
      <Modal
        open={addBookFormVisible}
        onClose={() => {setAddBookFormVisible(false)}}
      >
        <Box sx={{
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
        }}>
          {/*book.owner is logged in user*/}
          <Stack spacing={2}>
            <Typography 
            sx={{
              fontFamily: "Montserrat",
              fontWeight: "bold",
            }}variant="h4">Add a new book</Typography>
            <TextField
              label="Author"
              name="author"
              value={book.author}
              onChange={(event) => onChange(event)}
            />
            <TextField
              label="Title"
              name="title"
              value={book.title}
              onChange={(event) => onChange(event)}
            />
            <TextField
              label="Topic"
              name="topic"
              value={book.topic}
              onChange={(event) => onChange(event)}
            />
            <TextField
              label="ISBN"
              name="isbn"
              value={book.isbn}
              onChange={(event) => onChange(event)}
            />
            <TextField
              label="Location"
              name="location"
              value={book.location}
              onChange={(event) => onChange(event)}
            />
            <Stack direction="row" spacing={2} justifyContent="center">
              <Button  
                  sx={{
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
                  }} variant="contained" onClick={addBook}>Add</Button>
              <Button  
                  sx={{
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
                  }} variant="contained" onClick={() => {setAddBookFormVisible(false)}}>Cancel</Button>
            </Stack>
          </Stack>
        </Box>
      </Modal>
    )
  } else {
    return <></>;
  }
}

export default AddBook
