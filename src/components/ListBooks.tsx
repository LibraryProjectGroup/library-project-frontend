import React, { useState, FC } from "react";
import { Paper, Typography, Button, Stack } from "@mui/material";

import Book from "../interfaces/book.interface";
import BACKEND_URL from '../backendUrl'
import { right } from "@popperjs/core";

interface IProps {
    books: Array<Book> | undefined,
    fetchAllBooks: Function,
    setBookToEdit: Function,
    setEditBookFormVisible: Function
}

const ListBooks: FC<IProps> = ({books, fetchAllBooks, setBookToEdit, setEditBookFormVisible}: IProps): JSX.Element => {

    const renderBookData = (book:Book) => {
        return(
            <Paper elevation={10} sx={{ padding: "2rem", }}>
                <Stack direction="row" justifyContent="space-between">
                <Stack>
                <Typography 
                sx={{
                  fontFamily: "Montserrat",
                  fontWeight: "bold",
                }}>{book.title}</Typography>
                <Typography 
                sx={{
                  fontFamily: "Merriweather",
                  fontWeight: "light",
                }}>Author: {book.author}</Typography>
                <Typography 
                sx={{
                  fontFamily: "Merriweather",
                  fontWeight: "light",
                }}>Topic: {book.topic}</Typography>
                <Typography 
                sx={{
                  fontFamily: "Merriweather",
                  fontWeight: "light",
                }}>isbn: {book.isbn}</Typography>
                <Typography 
                sx={{
                  fontFamily: "Merriweather",
                  fontWeight: "light",
                }}>Location: {book.location}</Typography>
                </Stack>
                <Stack  marginY={1} justifyContent="space-between" >
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
                    //padding: 1,
                  }}
                    variant="contained" color="error" onClick={()=>{
                        fetch(`${BACKEND_URL}/book?id=${book.id}`,{method: 'DELETE'})
                        .then(response=>{
                            if(response.ok){
                                fetchAllBooks()
                            } else{
                                // handle !response
                            }
                        }
                        )}
                    }>
                        Delete book
                    </Button>
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
                    //padding: 1,
                    }}
                    variant="contained" onClick={()=>{setBookToEdit(book); setEditBookFormVisible(true)}}>Edit book</Button>
                </Stack>
                </Stack>
            </Paper>
        )
    }

    return(
        <Stack spacing={3} sx={{marginTop: "1rem"}}>
            {books?.map(book=>(renderBookData(book)))}
        </Stack>
    )
}

export default ListBooks