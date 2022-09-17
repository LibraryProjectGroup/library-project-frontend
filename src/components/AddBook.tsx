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

  const addBook = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    //do something to post data
    console.log(book)

    const response = fetch('/book?{title}&{author}&{isbn}&{topic}&{location}', {
      method: "POST",
      headers: {
        'content-type': 'application/json;charset=UTF-8',
      },
      // Data will be serialized and sent as json
      body: JSON.stringify({
        variables: {
          owner: book.owner,
          title: book.title,
          author: book.author,
          topic: book.topic,
          isbn: book.isbn,
          location: book.location
        }
      }),
  })
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
          <button type='submit'>Add</button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default NewBook;
