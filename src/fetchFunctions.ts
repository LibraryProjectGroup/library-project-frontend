import BACKEND_URL from "./backendUrl";
import Book from "./interfaces/book.interface";
import { authFetch } from "./auth";

function fetchExampleBookData(setExampleBook: Function) {
  authFetch(`/example`)
    .then((response) => response.json())
    .then((json) => setExampleBook(json));
}

function fetchAllBooks(setBooks: Function) {
  authFetch(`/book/all`)
    .then((response) => response.json())
    .then((data) => setBooks(data));
}

const fetchAllBooks2 = async () => {
  const response = await authFetch(`/book/all`);
  return response.json();
};

function fetchBookFromDb(bookId: string, setExampleBook: Function) {
  authFetch(`/book?id=${bookId}`)
    .then((response) => response.json())
    .then((data) => setExampleBook(data));
}

const fetchCurrentBorrows = async (username: string) => {
  const response = await authFetch(
    `/borrow/current/user?username=${username}`,
    {
      headers: {
        "content-type": "application/json"
      }
    }
  );
  return response.json();
};

const fetchAllCurrentBorrows = async () => {
  const response = await authFetch(`/borrow/current`, {
    headers: {
      "content-type": "application/json"
    }
  });
  return response.json();
};

const fetchUserByName = async (username: string) => {
  const response = await authFetch(
    `/user/username?username=${username}`,
    {
      headers: {
        "content-type": "application/json"
      }
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
      dueDate: dueDate
    };
    const response = await authFetch(`/borrow`, {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(borrow)
    });
    return response.json();
  } else {
    return { ok: false };
  }
};

const fetchReturnBorrowedBook = async (borrowId: number) => {
  const response = await authFetch(`/borrow/return`, {
    method: "PUT",
    headers: {
      "content-type": "application/json;charset=UTF-8"
    },
    body: JSON.stringify({ borrowId: borrowId })
  });
  return response.json();
};

export {
  fetchAllBooks,
  fetchExampleBookData,
  fetchAllBooks2,
  fetchBookFromDb,
  fetchCurrentBorrows,
  fetchAllCurrentBorrows,
  fetchLoanBook,
  fetchReturnBorrowedBook
};
