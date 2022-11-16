import { authFetch } from "./auth";
import Book from "./interfaces/book.interface";
import User from "./interfaces/user.interface";
import EditUser from "./interfaces/editUser.interface";
import Borrow from "./interfaces/borrow.interface";
import Book_list from "./interfaces/book_list.interface";
import Book_list_entry from "./interfaces/book_list_entry.interface";
import Book_request, { Book_request_status } from "./interfaces/book_request.interface";

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

export const fetchUserById = async (userId: number): Promise<any> => {
    return await authFetch(`/user?id=${userId}`, {
        method: "GET",
        headers: {
            "content-type": "application/json"
        }
    });
};

export const fetchUpdateUserData = async (
    editUser: EditUser
): Promise<OKStatus> => {
    return await authFetch(
        `/user?id=${editUser?.id}&username=${editUser?.username}&administrator=${editUser?.administrator}`,
        {
            method: "PUT",
            headers: {
                "content-type": "application/json"
            }
        }
    );
};

export const fetchAdminUpdateUserData = async (
    editUser: EditUser
): Promise<OKStatus> => {
    return await authFetch(
        `/user/admin?id=${editUser?.id}&username=${editUser?.username}&administrator=${editUser?.administrator}`,
        {
            method: "PUT",
            headers: {
                "content-type": "application/json"
            }
        }
    );
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

export const fetchAllBooklists = async (): Promise<Book_list[]> => {
    return await authFetch(`/booklist/all`);
};

export const fetchUserBooklists = async (): Promise<Book_list[]> => {
    return await authFetch(`/booklist/user`);
};

export const fetchBooklist = async (booklistId: number): Promise<Book> => {
    return await authFetch(`/booklist?id=${booklistId}`);
};

export const fetchDeleteBooklist = async (
    booklistId: number
): Promise<OKStatus> => {
    return await authFetch("/booklist", {
        method: "DELETE",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify({ id: booklistId })
    });
};

export const fetchCreateBooklist = async (
    newBooklist: Book_list
): Promise<OKStatus> => {
    return await authFetch("/booklist", {
        method: "POST",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify(newBooklist)
    });
};

export const fetchUpdateBooklist = async (
    newBooklist: Book_list
): Promise<OKStatus> => {
    return await authFetch("/booklist", {
        method: "PUT",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify(newBooklist)
    });
};

export const fetchAllEntries = async (): Promise<Book_list_entry[]> => {
    return await authFetch(`/booklistentry/all`);
};

export const fetchEntry = async (entryId: number): Promise<Book_list_entry> => {
    return await authFetch(`/booklistentry?id=${entryId}`);
};

export const fetchEntriesByList = async (
    listId: number
): Promise<Book_list_entry[]> => {
    return await authFetch(`/booklistentry/list?id=${listId}`);
};

export const fetchDeleteEntry = async (entryId: number): Promise<OKStatus> => {
    return await authFetch("/booklistentry", {
        method: "DELETE",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify({ id: entryId })
    });
};

export const fetchAddEntry = async (
    newEntry: Book_list_entry
): Promise<OKStatus> => {
    return await authFetch("/booklistentry", {
        method: "POST",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify(newEntry)
    });
};

export const fetchAllCurrentLoans = async () => {
    return await authFetch(`/borrow/current/admin`, {
        method: "GET",
        headers: {
            "content-type": "application/json;charset=UTF-8"
        }
    });
};

export const fetchExpiredLoans = async () => {
    return await authFetch(`/borrow/expired/admin`, {
        method: "GET",
        headers: {
            "content-type": "application/json;charset=UTF-8"
        }
    });
};

export const fetchAllBookRequests = async () => {
    return await authFetch(`/bookrequest/all`, {
        method: "GET",
        headers: {
            "content-type": "application/json;charset=UTF-8"
        }
    });
};

export const fetchAddBookRequest = async (
    isbn: string,
    title: string,
    reason: string
): Promise<OKStatus> => {
    return await authFetch("/bookrequest", {
        method: "POST",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify({ isbn, title, reason })
    });
};

export const fetchUpdateBookRequest = async (id: number, status: number): Promise<OKStatus> => {
    return await authFetch("/bookrequest/updatestatus", {
        method: "PUT",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify({ id, status })
    }) 
       
}
