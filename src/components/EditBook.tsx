import React, { useState, FC } from "react";
import Book from "../interfaces/book.interface";


interface IProps {
    bookToEdit: Book,
    setEditBookFormVisible: Function
    fetchAllBooks: Function
}


const EditBook: FC<IProps> = ({bookToEdit, setEditBookFormVisible, fetchAllBooks}: IProps): JSX.Element => {

    const BACKEND_URL = 'http://172.104.135.212'
    const [editedBook, setEditedBook] = useState(bookToEdit)

    const renderBookData = (book:Book, editedBook:Book, setEditedBook:Function) =>{

        
        return(
            <div>
                <div>
                    <label>
                    Author:
                    <input
                        type="string"
                        name="author"
                        value={editedBook.author}
                        onChange={(e) => setEditedBook(()=>({...editedBook, author: e.target.value}))}
                    />
                    </label>
                </div>
                <div>
                    <label>
                    Title:
                    <input
                        type="string"
                        name="title"
                        value={editedBook.title}
                        onChange={(e) => setEditedBook(()=>({...editedBook, title: e.target.value}))}
                    />
                    </label>
                </div>
                <div>
                    <label>
                    Topic:
                    <input
                        type="string"
                        name="topic"
                        value={editedBook.topic}
                        onChange={(e) => setEditedBook(()=>({...editedBook, "topic":e.target.value}))}
                    />
                    </label>
                </div>
                <div>
                    <label>
                    isbn:
                    <input
                        type="string"
                        name="isbn"
                        value={editedBook.isbn}
                        onChange={(e) => setEditedBook(()=>({...editedBook, "isbn":e.target.value}))}
                    />
                    </label>
                </div>
                <div>
                    <label>
                    Location:
                    <input
                        type="string"
                        name="location"
                        value={editedBook.location}
                        onChange={(e) => setEditedBook(()=>({...editedBook, "location":e.target.value}))}
                    />
                    </label>
                </div>
                <button onClick={()=>{updateBook(book)}}>
                    EDIT
                </button>
            </div>
        )
    }

    const updateBook = async (book:Book) =>{
        const response = await fetch(
            `${BACKEND_URL}/book?owner=1&id=${book.id}&title=${editedBook.title}&author=${editedBook.author}&isbn=${editedBook.isbn}&topic=${editedBook.topic}&location=${editedBook.location}`,
            {
              method: "PUT",
              headers: {
                "content-type": "application/json;charset=UTF-8",
                "Access-Control-Allow-Origin": BACKEND_URL
              }
            }
        )
        if(response.ok){
            setEditBookFormVisible(false)
            fetchAllBooks()
        }
    }

    return(
        <div>
            {bookToEdit && renderBookData(bookToEdit, editedBook, setEditedBook)}
        </div>
    )
}

export default EditBook