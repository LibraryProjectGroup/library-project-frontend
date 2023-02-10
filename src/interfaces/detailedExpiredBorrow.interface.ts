interface DetailedExpiredBorrow {
  id: number;
  borrowId: number;
  title: string;
  dueDate: Date;
  bookId: number;
  library_user: string;
  userId: number;
}

export default DetailedExpiredBorrow;
