interface ExtendedReservation {
  id: number;
  username: string;
  title: string;
  bookId: number;
  reservationDatetime: string; // Apparently Date is sent as a string in ISO_8601 format
  loaned: boolean;
  canceled: boolean;
  returnDate: string | null;
  dueDate: string;
}

export default ExtendedReservation;
