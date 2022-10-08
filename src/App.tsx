import React, { useEffect, useState } from 'react';
import { Container, Button, Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import Book from './interfaces/book.interface';
import AddBook from './components/AddBook';
import ListBooks from './components/ListBooks';
import EditBook from './components/EditBook';
import BACKEND_URL from './backendUrl'

function App() {

  const [exampleBook, setExampleBook] = useState<Book | undefined>(undefined)
  const [books, setBooks] = useState<Array<Book> | undefined>(undefined)
  const [addBookFormVisible, setAddBookFormVisible] = useState<boolean>(false)
  const [editBookFormVisible, setEditBookFormVisible] = useState<boolean>(false)
  const [bookToEdit, setBookToEdit] = useState<Book | undefined>(undefined)

  useEffect(()=>{
    fetchAllBooks()
  },[])

  useEffect(()=>{
    if(bookToEdit){
      setEditBookFormVisible(true)
    }
  },[bookToEdit])

  function fetchExampleBookData() {
    fetch(`${BACKEND_URL}/example`, {headers:{'Access-Control-Allow-Origin':BACKEND_URL}})
      .then(response => response.json())
      .then(json=>setExampleBook(json))
  }

  function fetchAllBooks() {
    fetch(`${BACKEND_URL}/book/all`, {headers:{'Access-Control-Allow-Origin':'*'}})
      .then(response => response.json())
      .then(data => setBooks(data));
  }

  function fetchBookFromDb(bookId:string){
    fetch(`http://localhost:3001/book?id=${bookId}`, {headers:{'Access-Control-Allow-Origin':"http://localhost:3000/book"}})
      .then(response => response.json())
      .then(data => setExampleBook(data));
  }

  function renderExampleBookData(){
    return(
      <div style={{border: "solid saddlebrown 2px"}}>
        <p>Loaned to: {exampleBook?.owner}</p>
        <p>Title: {exampleBook?.title}</p>
        <p>Author: {exampleBook?.author}</p>
        <p>Topic: {exampleBook?.topic}</p>
        <p>ISBN: {exampleBook?.isbn}</p>
        <p>Location: {exampleBook?.location}</p>
      </div>
    )
  }

  return (
    <Container maxWidth="sm">
      {exampleBook && renderExampleBookData()}
      <AddBook addBookFormVisible={addBookFormVisible} setAddBookFormVisible={setAddBookFormVisible} fetchAllBooks={fetchAllBooks} />
      {editBookFormVisible && bookToEdit && 
          <EditBook editBookFormVisible={editBookFormVisible} bookToEdit={bookToEdit} setEditBookFormVisible={setEditBookFormVisible} fetchAllBooks={fetchAllBooks} />
      }
      <ListBooks books={books} fetchAllBooks={fetchAllBooks} setBookToEdit={setBookToEdit} setEditBookFormVisible={setEditBookFormVisible} />

      <Fab color="primary" aria-label="add" sx={{ position: "absolute", bottom: "2rem" }} onClick={()=>{setAddBookFormVisible(true)}}>
        <AddIcon />
      </Fab>
    </Container>
  )
}

export default App;
