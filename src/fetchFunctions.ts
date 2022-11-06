import { authFetch } from "./auth";
import Book from "./interfaces/book.interface";
import User from "./interfaces/user.interface";
import Borrow from "./interfaces/borrow.interface";

interface OKStatus {
    ok: boolean;
    message?: string;
}

export const fetchAllBooks = async (): Promise<Book[]> => {
    return await authFetch(`/book/all`);
};

export const fetchBook = async (bookId: string): Promise<Book> => {
    return await authFetch(`/book?id=${bookId}`);
};

export const fetchUpdateBook = async (newBook: Book): Promise<OKStatus> => {
    return await authFetch("/book", {
        method: "PUT",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify(newBook)
    });
};

export const fetchAddBook = async (newBook: Book): Promise<OKStatus> => {
    return await authFetch("/book", {
        method: "POST",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify(newBook)
    });
};

export const fetchDeleteBook = async (bookId: number): Promise<OKStatus> => {
    return await authFetch(`/book?id=${bookId}`, {
        method: "DELETE"
    });
};

export const fetchAllUsers = async (): Promise<User[]> => {
    return await authFetch(`/user/all`);
};

export const fetchDeleteUser = async (userId: number): Promise<OKStatus> => {
    return await authFetch("/user", {
        method: "DELETE",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify({ id: userId })
    });
};

export const fetchCurrentBorrows = async (): Promise<Borrow[]> => {
    return await authFetch(`/borrow/session`, {
        headers: {
            "content-type": "application/json"
        }
    });
};

export const fetchAllCurrentBorrows = async (): Promise<Borrow[]> => {
    return await authFetch(`/borrow/current`, {
        headers: {
            "content-type": "application/json"
        }
    });
};

export const fetchCreateBorrow = async (bookId: number): Promise<OKStatus> => {
    return await authFetch("/borrow", {
        method: "POST",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify({ bookId })
    });
};

export const fetchReturnBorrowed = async (
    borrowId: number
): Promise<OKStatus> => {
    return await authFetch(`/borrow/return`, {
        method: "PUT",
        headers: {
            "content-type": "application/json;charset=UTF-8"
        },
        body: JSON.stringify({ borrowId: borrowId })
    });
};
