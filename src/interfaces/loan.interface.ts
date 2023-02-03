// Different from Borrow, which interfaces directly to borrowing table in the DB. Only unreturned Borrows can be Loans.
interface Loan {
  username: string;
  title: string;
  bookId: number;
  borrowDate: Date;
  dueDate: Date;
}

export default Loan;
