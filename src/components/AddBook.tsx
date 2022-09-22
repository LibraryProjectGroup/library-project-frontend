import React, { useState, FC } from "react";


interface IProps {
  addBookFormVisible: boolean
  setAddBookFormVisible: Function
  fetchAllBooks: Function
}

const AddBook: FC<IProps> = ({addBookFormVisible, setAddBookFormVisible, fetchAllBooks}: IProps): JSX.Element => {

  const BACKEND_URL = 'http://172.104.135.212'
  const [book, setBook] = useState({
    owner: "",
    title: "",
    author: "",
    topic: "",
    isbn: "",
    location: "",
  });

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBook({
      ...book,
      [event.target.name]: event.target.value,
    });
  };

  const addBook = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(book);
    //
    // PRELIMINARY, NOT TESTED!
    //
    try {
      const response = await fetch(
        `${BACKEND_URL}/book?owner=1&title=${book.title}&author=${book.author}&isbn=${book.isbn}&topic=${book.topic}&location=${book.location}`,
        {
          method: "POST",
          headers: {
            "content-type": "application/json;charset=UTF-8",
            "Access-Control-Allow-Origin": BACKEND_URL
          },
          // Data will be sent in a body
          /*body: JSON.stringify({
            title: book.title,
            author: book.author,
            isbn: book.isbn,
            topic: book.topic,
            location: book.location,
            owner: book.owner,
          })*/
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
      setBook({owner:"", title:"", author:"", topic:"", isbn:"", location:""})
    }
  };

  if(addBookFormVisible){
    return (
      <div style={{ marginTop: 20 }}>
        <h2>Add a new book</h2>
        <form onSubmit={addBook}>
          {/*book.owner is logged in user*/}
          <div>
            <label>
              Author:
              <input
                type="string"
                name="author"
                value={book.author}
                onChange={(event) => onChange(event)}
              />
            </label>
          </div>
          <div>
            <label>
              Title:
              <input
                type="string"
                name="title"
                value={book.title}
                onChange={(event) => onChange(event)}
              />
            </label>
          </div>
          <div>
            <label>
              Topic:
              <input
                type="string"
                name="topic"
                value={book.topic}
                onChange={(event) => onChange(event)}
              />
            </label>
          </div>
          <div>
            <label>
              isbn:
              <input
                type="string"
                name="isbn"
                value={book.isbn}
                onChange={(event) => onChange(event)}
              />
            </label>
          </div>
          <div>
            <label>
              Location:
              <input
                type="string"
                name="location"
                value={book.location}
                onChange={(event) => onChange(event)}
              />
            </label>
            <div>
              <button type="submit">Add</button>
            </div>
          </div>
        </form>
      </div>
    )
  } else{
    return <div></div>
  }
}

export default AddBook
