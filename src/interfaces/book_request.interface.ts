interface Book_request {
  id: number
  userId: number
  isbn: string
  title: string
  reason: string
  status: Book_request_status
}

enum Book_request_status {
  PENDING = 0,
  DENIED = 1,
  APPROVED = 2,
}

export default Book_request
export { Book_request_status }
