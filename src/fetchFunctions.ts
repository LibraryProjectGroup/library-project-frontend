import BACKEND_URL from "./backendUrl";
import Book from "./interfaces/book.interface";

function fetchExampleBookData(setExampleBook: Function) {
  fetch(`${BACKEND_URL}/example`, {
    headers: { "Access-Control-Allow-Origin": BACKEND_URL },
    credentials: "include",
  })
    .then((response) => response.json())
    .then((json) => setExampleBook(json));
}

function fetchAllBooks(setBooks: Function) {
  fetch(`${BACKEND_URL}/book/all`, {
    headers: { "Access-Control-Allow-Origin": BACKEND_URL },
    credentials: "include",
  })
    .then((response) => response.json())
    .then((data) => setBooks(data));
}

function fetchBookFromDb(bookId: string, setExampleBook: Function) {
  fetch(`${BACKEND_URL}/book?id=${bookId}`, {
    headers: { "Access-Control-Allow-Origin": BACKEND_URL },
    credentials: "include",
  })
    .then((response) => response.json())
    .then((data) => setExampleBook(data));
}

const fetchCurrentBorrows = async (username: string) => {
  const response = await fetch(
    `${BACKEND_URL}/borrow/current/user?username=${username}`,
    {
      headers: {
        "content-type": "application/json",
        "Access-Control-Allow-Origin": BACKEND_URL,
      },
    }
  );
  return response.json();
};

const fetchAllCurrentBorrows = async () => {
  const response = await fetch(`${BACKEND_URL}/borrow/current`, {
    headers: {
      "content-type": "application/json",
      "Access-Control-Allow-Origin": BACKEND_URL,
    },
  });
  return response.json();
};

const fetchReturnBook = async () => {
  const response = await fetch(`${BACKEND_URL}/borrow/current`, {
    headers: {
      "content-type": "application/json",
      "Access-Control-Allow-Origin": BACKEND_URL,
    },
  });
  return response.json();
};

const fetchUserByName = async (username: string) => {
  const response = await fetch(
    `${BACKEND_URL}/user/username?username=${username}`,
    {
      headers: {
        "content-type": "application/json",
        "Access-Control-Allow-Origin": BACKEND_URL,
      },
    }
  );
  return response.json();
};

const fetchLoanBook = async (
  username: string | undefined | null,
  book: Book
) => {
  if (username) {
    const user = await fetchUserByName(username);
    var borrowDate = new Date();
    var dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + 10);
    const borrow: any = {
      user: user.id,
      book: book.id,
      borrowDate: borrowDate,
      dueDate: dueDate,
    };
    const response = await fetch(`${BACKEND_URL}/borrow`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      credentials: "include",
      body: JSON.stringify(borrow),
    });
    return response.json();
  } else {
    return { ok: false };
  }
};
export {
  fetchAllBooks,
  fetchExampleBookData,
  fetchBookFromDb,
  fetchCurrentBorrows,
  fetchAllCurrentBorrows,
  fetchLoanBook,
};
