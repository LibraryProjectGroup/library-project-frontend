import { authFetch } from "./auth";
import Book from "./interfaces/book.interface";
import User from "./interfaces/user.interface";
import Borrow from "./interfaces/borrow.interface";
import Book_list from "./interfaces/book_list.interface";
import Book_list_entry from "./interfaces/book_list_entry.interface";

interface OKStatus {
    ok: boolean;
    message?: string;
}

const fetchAllBooks = async (): Promise<Book[]> => {
    return await authFetch(`/book/all`);
};

const fetchBook = async (bookId: string): Promise<Book> => {
    return await authFetch(`/book?id=${bookId}`);
};

const fetchUpdateBook = async (newBook: Book): Promise<OKStatus> => {
    return await authFetch("/book", {
        method: "PUT",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify(newBook)
    });
};

const fetchAddBook = async (newBook: Book): Promise<OKStatus> => {
    return await authFetch("/book", {
        method: "POST",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify(newBook)
    });
};

const fetchDeleteBook = async (bookId: number): Promise<OKStatus> => {
    return await authFetch(`/book?id=${bookId}`, {
        method: "DELETE"
    });
};

const fetchAllUsers = async (): Promise<User[]> => {
    return await authFetch(`/user/all`);
};

const fetchDeleteUser = async (userId: number): Promise<OKStatus> => {
    return await authFetch("/user", {
        method: "DELETE",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify({ id: userId })
    });
};

const fetchCurrentBorrows = async (): Promise<Borrow[]> => {
    return await authFetch(`/borrow/session`, {
        headers: {
            "content-type": "application/json"
        }
    });
};

const fetchAllCurrentBorrows = async (): Promise<Borrow[]> => {
    return await authFetch(`/borrow/current`, {
        headers: {
            "content-type": "application/json"
        }
    });
};

const fetchCreateBorrow = async (bookId: number): Promise<OKStatus> => {
    return await authFetch("/borrow", {
        method: "POST",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify({ bookId })
    });
};

const fetchReturnBorrowed = async (borrowId: number): Promise<OKStatus> => {
    return await authFetch(`/borrow/return`, {
        method: "PUT",
        headers: {
            "content-type": "application/json;charset=UTF-8"
        },
        body: JSON.stringify({ borrowId: borrowId })
    });
};


const fetchAllBooklists = async (): Promise<Book_list[]> => {
    return await authFetch(`/booklist/all`);
};

const fetchUserBooklists = async (): Promise<Book_list[]> => {
    return await authFetch(`/booklist/user`);
};

const fetchBooklist= async (booklistId: string): Promise<Book> => {
    return await authFetch(`/booklist?id=${booklistId}`);
};

const fetchDeleteBooklist = async (booklistId: number): Promise<OKStatus> => {
    return await authFetch("/booklist", {
        method: "DELETE",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify({ id: booklistId })
    });
};

const fetchCreateBooklist = async (newBooklist: Book_list): Promise<OKStatus> => {
    return await authFetch("/booklist", {
        method: "POST",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify(newBooklist)
    });
};

const fetchUpdateBooklist = async (newBooklist: Book_list): Promise<OKStatus> => {
    return await authFetch("/booklist", {
        method: "PUT",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify(newBooklist)
    });
};

const fetchAllEntries = async (): Promise<Book_list[]> => {
    return await authFetch(`/booklist_entry/all`);
};

const fetchEntry = async (entryId: string): Promise<Book> => {
    return await authFetch(`/booklist_entry?id=${entryId}`);
};

const fetchDeleteEntry = async (entryId: number): Promise<OKStatus> => {
    return await authFetch("/booklist_entry", {
        method: "DELETE",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify({ id: entryId })
    });
};

const fetchAddEntry = async (newEntry: Book_list_entry): Promise<OKStatus> => {
    return await authFetch("/booklist_entry", {
        method: "POST",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify(newEntry)
    });
};

export {
    fetchAllBooks,
    fetchBook,
    fetchUpdateBook,
    fetchAddBook,
    fetchDeleteBook,
    fetchAllUsers,
    fetchDeleteUser,
    fetchCurrentBorrows,
    fetchAllCurrentBorrows,
    fetchCreateBorrow,
    fetchReturnBorrowed,
    fetchUserBooklists,
    fetchBooklist,
    fetchCreateBooklist,
    fetchUpdateBooklist,
    fetchAllEntries,
    fetchEntry,
    fetchDeleteEntry,
    fetchAddEntry
};
