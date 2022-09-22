import React, { useEffect, useState } from 'react';
import './App.css';
import Book from './interfaces/book.interface';
import AddBook from './components/AddBook';
import ListBooks from './components/ListBooks';
import EditBook from './components/EditBook';

function App() {

  const [exampleBook, setExampleBook] = useState<Book | undefined>(undefined)
  const [books, setBooks] = useState<Array<Book> | undefined>(undefined)
  const [addBookFormVisible, setAddBookFormVisible] = useState<boolean>(false)
  const [editBookFormVisible, setEditBookFormVisible] = useState<boolean>(false)
  const [bookToEdit, setBookToEdit] = useState<Book | undefined>(undefined)

  const BACKEND_URL = 'http://172.104.135.212'

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
    fetch(`${BACKEND_URL}/allbooks`, {headers:{'Access-Control-Allow-Origin':BACKEND_URL}})
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
    <div className="App">
      <button 
        onClick={()=>{setAddBookFormVisible(true)}} 
        style={{width: 200, height: 100, backgroundColor: "yellow", border: "solid black 2px", borderRadius: "2px"}}>
          Add book
      </button>
      {exampleBook && renderExampleBookData()}
      <AddBook addBookFormVisible={addBookFormVisible} setAddBookFormVisible={setAddBookFormVisible} fetchAllBooks={fetchAllBooks}/>
      {editBookFormVisible && bookToEdit && 
        <EditBook bookToEdit={bookToEdit} setEditBookFormVisible={setEditBookFormVisible} fetchAllBooks={fetchAllBooks}/>
      }
      <ListBooks books={books} fetchAllBooks={fetchAllBooks} setBookToEdit={setBookToEdit}/>
    </div>

  )
}

export default App;
