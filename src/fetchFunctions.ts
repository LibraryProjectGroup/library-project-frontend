import BACKEND_URL from "./backendUrl";

function fetchExampleBookData(setExampleBook: Function) {
  fetch(`${BACKEND_URL}/example`, {
    headers: { "Access-Control-Allow-Origin": BACKEND_URL },
  })
    .then((response) => response.json())
    .then((json) => setExampleBook(json));
}

function fetchAllBooks(setBooks: Function) {
  fetch(`${BACKEND_URL}/book/all`, {
    headers: { "Access-Control-Allow-Origin": "*" },
    credentials: "include",
  })
    .then((response) => response.json())
    .then((data) => setBooks(data));
}

function fetchBookFromDb(bookId: string, setExampleBook: Function) {
  fetch(`${BACKEND_URL}/book?id=${bookId}`, {
    headers: { "Access-Control-Allow-Origin": "http://localhost:3000/book" },
  })
    .then((response) => response.json())
    .then((data) => setExampleBook(data));
}

export { fetchAllBooks, fetchExampleBookData, fetchBookFromDb };
