import React, { useState, FC } from "react";
import Book from "../interfaces/book.interface";


interface IProps {
    books: Array<Book> | undefined
    fetchAllBooks: Function
}

const BACKEND_URL = 'http://172.104.135.212'

const ListBooks: FC<IProps> = ({books, fetchAllBooks}: IProps): JSX.Element => {

    const renderBookData = (book:Book) => {
        return(
            <div style={{border:"solid black 1px", marginTop: 10}}>
                <p>Title: {book.title}</p>
                <p>Author: {book.author}</p>
                <p>Topic: {book.topic}</p>
                <p>isbn: {book.isbn}</p>
                <p>Location: {book.location}</p>
                <button onClick={()=>{
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
                </button>
            </div>
        )
    }

    const log = () =>{
        console.log(books)
    }

    return(
        <div>
            {books?.map(book=>(renderBookData(book)))}
        </div>
    )
}

export default ListBooks