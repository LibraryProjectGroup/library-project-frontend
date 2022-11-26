interface Book_reservation {
    id: number;
    bookId: number;
    userId: number;
    reservationDatetime: Date;
    loaned: boolean;
    canceled: boolean;
}

export default Book_reservation;
