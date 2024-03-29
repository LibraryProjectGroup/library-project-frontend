import { authFetch } from './auth'
import Book from './interfaces/book.interface'
import User from './interfaces/user.interface'
import EditUser from './interfaces/editUser.interface'
import Borrow from './interfaces/borrow.interface'
import Book_list from './interfaces/book_list.interface'
import Book_list_entry from './interfaces/book_list_entry.interface'
import Book_review from './interfaces/book_review.interface'
import BACKEND_URL from './backendUrl'
import { HomeOffice } from './interfaces/HomeOffice'

interface OKStatus {
  ok: boolean
  message?: string
}

export const fetchAllBooks = async (): Promise<Book[]> => {
  return await authFetch(`/book/all`)
}

export const fetchPagedBooks = async (
  page: number,
  pageSize: number | null
): Promise<Book[]> => {
  return await authFetch(`/book/page?page=${page}&pageSize=${pageSize}`)
}

export const fetchAllBooksCount = async (): Promise<number> => {
  return await authFetch(`/book/count`)
}

export const fetchBook = async (bookId: string): Promise<Book> => {
  return await authFetch(`/book?id=${bookId}`)
}

export const fetchUpdateBook = async (newBook: Book): Promise<OKStatus> => {
  return await authFetch('/book', {
    method: 'PUT',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(newBook),
  })
}

export const fetchAddBook = async (newBook: Book): Promise<OKStatus> => {
  return await authFetch('/book', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(newBook),
  })
}

export const fetchDeleteBook = async (bookId: number): Promise<OKStatus> => {
  return await authFetch(`/book?id=${bookId}`, {
    method: 'DELETE',
  })
}

export const fetchAllUsers = async (): Promise<User[]> => {
  return await authFetch(`/user/all`)
}

export const fetchDeleteUser = async (userId: number): Promise<OKStatus> => {
  return await authFetch('/user', {
    method: 'DELETE',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({ id: userId }),
  })
}
export const fetchHardDeleteUser = async (
  userId: number
): Promise<OKStatus> => {
  return await authFetch('/user/admin', {
    method: 'DELETE',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({ id: userId }),
  })
}

export const fetchUserById = async (userId: number): Promise<any> => {
  return await authFetch(`/user?id=${userId}`, {
    method: 'GET',
    headers: {
      'content-type': 'application/json',
    },
  })
}

export const fetchUpdateUserData = async (
  editUser: EditUser
): Promise<OKStatus> => {
  return await authFetch(
    `/user?id=${editUser?.id}&username=${editUser?.username}&email=${editUser?.email}&homeOfficeId=${editUser?.homeOfficeId}`,
    {
      method: 'PUT',
      headers: {
        'content-type': 'application/json',
      },
    }
  )
}

export const fetchAdminUpdateUserData = async (
  editUser: EditUser
): Promise<OKStatus> => {
  return await authFetch(
    `/user/admin?id=${editUser?.id}&username=${editUser?.username}&email=${editUser?.email}&administrator=${editUser?.administrator}&homeOfficeId=${editUser?.homeOfficeId}`,
    {
      method: 'PUT',
      headers: {
        'content-type': 'application/json',
      },
    }
  )
}

export const fetchCurrentBorrows = async (): Promise<Borrow[]> => {
  return await authFetch(`/borrow/session`, {
    headers: {
      'content-type': 'application/json',
    },
  })
}

export const fetchAllCurrentBorrows = async (): Promise<Borrow[]> => {
  return await authFetch(`/borrow/current`, {
    headers: {
      'content-type': 'application/json',
    },
  })
}

export const fetchCreateBorrow = async (bookId: number): Promise<OKStatus> => {
  return await authFetch('/borrow', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({ bookId }),
  })
}

export const fetchReturnBorrowed = async (
  borrowId: number
): Promise<OKStatus> => {
  return await authFetch(`/borrow/return`, {
    method: 'PUT',
    headers: {
      'content-type': 'application/json;charset=UTF-8',
    },
    body: JSON.stringify({ borrowId: borrowId }),
  })
}

export const fetchAllBooklists = async (): Promise<Book_list[]> => {
  return await authFetch(`/booklist/all`)
}

export const fetchUserBooklists = async (): Promise<Book_list[]> => {
  return await authFetch(`/booklist/user`)
}

export const fetchBooklist = async (booklistId: number): Promise<Book_list> => {
  return await authFetch(`/booklist?id=${booklistId}`)
}

export const fetchDeleteBooklist = async (
  booklistId: number
): Promise<OKStatus> => {
  return await authFetch('/booklist', {
    method: 'DELETE',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({ id: booklistId }),
  })
}

export const fetchCreateBooklist = async (
  newBooklist: Book_list
): Promise<OKStatus> => {
  return await authFetch('/booklist', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(newBooklist),
  })
}

export const fetchUpdateBooklist = async (
  newBooklist: Book_list
): Promise<OKStatus> => {
  return await authFetch('/booklist', {
    method: 'PUT',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(newBooklist),
  })
}

export const fetchAllEntries = async (): Promise<Book_list_entry[]> => {
  return await authFetch(`/booklistentry/all`)
}

export const fetchEntry = async (entryId: number): Promise<Book_list_entry> => {
  return await authFetch(`/booklistentry?id=${entryId}`)
}

export const fetchEntriesByList = async (
  listId: number
): Promise<Book_list_entry[]> => {
  return await authFetch(`/booklistentry/list?id=${listId}`)
}

export const fetchDeleteEntry = async (entryId: number): Promise<OKStatus> => {
  return await authFetch('/booklistentry', {
    method: 'DELETE',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({ id: entryId }),
  })
}

export const fetchAddEntry = async (
  newEntry: Book_list_entry
): Promise<OKStatus> => {
  return await authFetch('/booklistentry', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(newEntry),
  })
}

export const fetchAllCurrentLoans = async () => {
  return await authFetch(`/borrow/current/admin`, {
    method: 'GET',
    headers: {
      'content-type': 'application/json;charset=UTF-8',
    },
  })
}

export const fetchExpiredLoans = async () => {
  return await authFetch(`/borrow/expired/admin`, {
    method: 'GET',
    headers: {
      'content-type': 'application/json;charset=UTF-8',
    },
  })
}

export const fetchListBooks = async (listId: number): Promise<Book[]> => {
  return await authFetch(`/booklist/books?id=${listId}`, {
    method: 'GET',
    headers: {
      'content-type': 'application/json;charset=UTF-8',
    },
  })
}

export const fetchListInfo = async (
  listId: number
): Promise<{ userId: number; username: string; name: string }> => {
  return await authFetch(`/booklist/info?id=${listId}`, {
    method: 'GET',
    headers: {
      'content-type': 'application/json;charset=UTF-8',
    },
  })
}

export const fetchDeleteListEntryBook = async (
  listId: number,
  bookId: number
): Promise<OKStatus> => {
  return await authFetch('/booklistentry/book', {
    method: 'DELETE',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({ listId, bookId }),
  })
}

// Book request

export const fetchAllBookRequests = async () => {
  return await authFetch(`/bookrequest/all`, {
    method: 'GET',
    headers: {
      'content-type': 'application/json;charset=UTF-8',
    },
  })
}

export const fetchAddBookRequest = async (
  isbn: string,
  title: string,
  reason: string
): Promise<OKStatus> => {
  return await authFetch('/bookrequest', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({ isbn, title, reason }),
  })
}

export const fetchUpdateBookRequest = async (
  id: number,
  status: number
): Promise<OKStatus> => {
  return await authFetch('/bookrequest/updatestatus', {
    method: 'PUT',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({ id, status }),
  })
}

// Book reservation

export const fetchAllBookReservations = async () => {
  return await authFetch('/bookreservation/all', {
    method: 'GET',
    headers: {
      'content-type': 'application/json;charset=UTF-8',
    },
  })
}

export const fetchAllExtendedBookReservations = async () => {
  return await authFetch('/bookreservation/all/extended', {
    method: 'GET',
    headers: {
      'content-type': 'application/json;charset=UTF-8',
    },
  })
}

export const fetchAllReservedBooks = async () => {
  return await authFetch(`/book/all/reserved`, {
    method: 'GET',
    headers: {
      'content-type': 'application/json;charset=UTF-8',
    },
  })
}

export const fetchCurrentBookReservations = async () => {
  return await authFetch('/bookreservation/all/current', {
    method: 'GET',
    headers: {
      'content-type': 'application/json;charset=UTF-8',
    },
  })
}

export const fetchAddBookReservation = async (
  bookId: number
): Promise<OKStatus> => {
  return await authFetch('/bookreservation', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({ bookId }),
  })
}

export const fetchCancelBookReservation = async (
  reservationId: number
): Promise<OKStatus> => {
  return await authFetch('/bookreservation/cancel', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({ reservationId }),
  })
}

export const fetchLoanBookReservation = async (
  reservationId: number
): Promise<OKStatus> => {
  return await authFetch('/bookreservation/loan', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({ reservationId }),
  })
}

export const fetchUserCurrentBookReservations = async (userId: number) => {
  return await authFetch('/bookreservation/user/current', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({ userId }),
  })
}

//Problem with backend
export const fetchActiveAndLoanableReservations = async () => {
  return await authFetch('/bookreservation/active/loanable', {
    method: 'GET',
    headers: {
      'content-type': 'application/json',
    },
  })
}

export const fetchPasswordResetSecret = async (userId: number) => {
  return await authFetch(`/passwordreset/secret?id=${userId}`, {
    method: 'GET',
    headers: {
      'content-type': 'application/json;charset=UTF-8',
    },
  })
}

export const fetchPasswordReset = async (secret: string, password?: string) => {
  return await fetch(`${BACKEND_URL}/passwordreset`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json;charset=UTF-8',
    },
    body: JSON.stringify({ secret, password }),
  })
}

export async function fetchAllHomeOffices(): Promise<HomeOffice[]> {
  return await authFetch(`/office/all`)
}

export async function fetchDeleteHomeOffice(
  homeOfficeId: number
): Promise<OKStatus> {
  return await authFetch(`/office/${encodeURIComponent(homeOfficeId)}`, {
    method: 'DELETE',
    headers: {
      'content-type': 'application/json',
    },
  })
}

export async function fetchHomeOfficeById(
  homeOfficeId: number
): Promise<HomeOffice> {
  return await authFetch(`/office/${encodeURIComponent(homeOfficeId)}`)
}

export async function fetchAdminUpdateHomeOfficeData(
  homeOffice: HomeOffice
): Promise<OKStatus> {
  // Do not include the id in the body
  const bodyData = (({ id, ...data }) => data)(homeOffice)
  return await authFetch(`/office/${encodeURIComponent(homeOffice.id)}`, {
    method: 'PUT',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(bodyData),
  })
}

export async function fetchAdminAddHomeOffice(
  homeOffice: HomeOffice
): Promise<OKStatus> {
  return await authFetch('/office', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(homeOffice),
  })
}

// book favorite

export async function fetchAddFavorite(bookId: number): Promise<OKStatus> {
  return await authFetch('/favorite', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({ bookId }),
  })
}

export async function fetchDeleteFavorite(bookId: number): Promise<OKStatus> {
  return await authFetch('/favorite', {
    method: 'DELETE',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({ bookId }),
  })
}

export async function fetchisBookFavoritedByUser(
  bookId: number
): Promise<{ isFavorited: boolean }> {
  const url = `/favorite/check?bookId=${bookId}`
  return await authFetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
}

export async function fetchFavoriteCountForBook(
  bookId: number
): Promise<{ count: number }> {
  const url = `/favorite/count?bookId=${bookId}`
  return await authFetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
}

export async function fetchAllReviews(): Promise<Book_review[]> {
  return await authFetch(`/review/all`)
}

export async function fetchReviewsByBookId(
  bookId: number
): Promise<Book_review[]> {
  return await authFetch(`/review/book?bookId=${encodeURIComponent(bookId)}`)
}

export async function fetchAverageRatingForBook(
  bookId: number
): Promise<{ averageRating: number }> {
  return await authFetch(
    `/review/average?bookId=${encodeURIComponent(bookId)}`,
    {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
      },
    }
  )
}

export async function fetchDeleteReview(reviewId: number) {
  const response = await authFetch(`/review/`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ reviewId }),
  })
  return true
}

export async function fetchAddReview(
  bookId: number,
  comment: string,
  rating: number
): Promise<OKStatus> {
  return await authFetch('/review', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({ bookId, comment, rating }),
  })
}

export async function fetchUpdateReview(
  reviewId: number,
  comment: string,
  rating: number
) {
  const response = await authFetch(`/review/`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ reviewId, comment, rating }),
  })
  return true
}
