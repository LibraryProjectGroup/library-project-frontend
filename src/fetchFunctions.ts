import BACKEND_URL from "./backendUrl";
import Book from "./interfaces/book.interface";
import { authFetch } from "./auth";


// Auth 
/*
export const fetchExampleBookData = (setExampleBook: Function) => {
  authFetch(`/example`)
    .then((response) => response.json())
    .then((json) => setExampleBook(json));
}

export const fetchAllBooks = async () => {
  const response = await authFetch(`/book/all`);
  return response.json();
};

export const fetchAllUsers = async () => {
  const response = await authFetch(`/user/all`);
  return response.json();
};

export const fetchBookFromDb = (bookId: string, setExampleBook: Function) => {
  authFetch(`/book?id=${bookId}`)
    .then((response) => response.json())
    .then((data) => setExampleBook(data));
}

export const fetchCurrentBorrows = async (username: string) => {
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

export const fetchAllCurrentBorrows = async () => {
  const response = await authFetch(`/borrow/current`, {
    headers: {
      "content-type": "application/json"
    }
  });
  return response.json();
};

export const fetchUserByName = async (username: string) => {
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

export const fetchLoanBook = async (
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

export const fetchReturnBorrowedBook = async (borrowId: number) => {
  const response = await authFetch(`/borrow/return`, {
    method: "PUT",
    headers: {
      "content-type": "application/json;charset=UTF-8"
    },
    body: JSON.stringify({ borrowId: borrowId })
  });
  return response.json();
};
*/

// Non Auth

export const fetchExampleBookData = (setExampleBook: Function) => {
  fetch(`/example`)
    .then((response) => response.json())
    .then((json) => setExampleBook(json));
}

export const fetchAllBooks = async () => {
  const response = await fetch(`${BACKEND_URL}/book/all`);
  console.log()
  return response.json();
};

export const fetchAllUsers = async () => {
  const response = await fetch(`${BACKEND_URL}/user/all`);
  return response.json();
};

export const fetchBookFromDb = (bookId: string, setExampleBook: Function) => {
  fetch(`${BACKEND_URL}/book?id=${bookId}`)
    .then((response) => response.json())
    .then((data) => setExampleBook(data));
}

export const fetchCurrentBorrows = async (username: string) => {
  const response = await fetch(
    `${BACKEND_URL}/borrow/current/user?username=${username}`,
    {
      headers: {
        "content-type": "application/json"
      }
    }
  );
  return response.json();
};

export const fetchAllCurrentBorrows = async () => {
  const response = await fetch(`${BACKEND_URL}/borrow/current`, {
    headers: {
      "content-type": "application/json"
    }
  });
  return response.json();
};

export const fetchUserByName = async (username: string) => {
  const response = await fetch(
    `${BACKEND_URL}/user/username?username=${username}`,
    {
      headers: {
        "content-type": "application/json"
      }
    }
  );
  return response.json();
};

export const fetchLoanBook = async (
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
    const response = await fetch(`${BACKEND_URL}/borrow`, {
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

export const fetchReturnBorrowedBook = async (borrowId: number) => {
  const response = await fetch(`${BACKEND_URL}/borrow/return`, {
    method: "PUT",
    headers: {
      "content-type": "application/json;charset=UTF-8"
    },
    body: JSON.stringify({ borrowId: borrowId })
  });
  return response.json();
};


export const fetchDeleteUser = async (userId: number) => {
  const response = await fetch(`${BACKEND_URL}/user?id=${userId}`, {
    method: "DELETE",
    credentials: "include",
    headers: {
      "content-type": "application/json;charset=UTF-8",
      "Access-Control-Allow-Origin": BACKEND_URL
    },
  });
  return response.json();
}

export const fetchAndSetAllBooks = async (setBooks: Function) => {
  fetch(`${BACKEND_URL}/book/all`, {
    headers: { "Access-Control-Allow-Origin": BACKEND_URL },
    credentials: "include"
  })
    .then((response) => response.json())
    .then((data) => setBooks(data));
}
