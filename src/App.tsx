import React, { useEffect, useState } from 'react';
import './App.css';
import Book from './interfaces/book.interface';

function App() {

  const [exampleBook, setExampleBook] = useState<Book | undefined>(undefined)
  
  useEffect(()=>{
    console.log("exampleBook changed to:")
    console.log(exampleBook)
  },[exampleBook])

  function fetchExampleBookData() {
    fetch('http://localhost:3001/example', {headers:{'Access-Control-Allow-Origin':"http://localhost:3000/example"}})
      .then(response => response.json())
      .then(data => setExampleBook(data));
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
        onClick={()=>{fetchBookFromDb("1")}} 
        style={{width: 200, height: 100, backgroundColor: "yellow", border: "solid black 2px", borderRadius: "2px"}}
      >
        Fetch book data
      </button>
      {exampleBook && renderExampleBookData()}
    </div>
  )
}

export default App;
