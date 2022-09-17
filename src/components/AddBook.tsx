import React, { useState } from "react";

function NewBook() {
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
        "http://localhost:3001/book?{title}&{author}&{isbn}&{topic}&{location}",
        {
          method: "POST",
          headers: {
            "content-type": "application/json;charset=UTF-8",
            "Access-Control-Allow-Origin":
              "http://localhost:3000/book?{title}&{author}&{isbn}&{topic}&{location}"
          },
          // Data will be sent in a body
          body: JSON.stringify({
            title: book.title,
            author: book.author,
            isbn: book.isbn,
            topic: book.topic,
            location: book.location,
            owner: book.owner,
          })
        }
        );
        if(!response.ok) {
          console.log('something went wrong!')
        }
    } catch (error) {
      console.error();
    }
  };

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
  );
}

export default NewBook;
