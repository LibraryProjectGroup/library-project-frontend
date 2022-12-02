interface ExtendedReservation {
    id: number;
    username: string;
    title: string;
    bookId: number;
    reservationDatetime: string; // Apparently sent as a string in ISO_8601 format
    loaned: boolean;
    canceled: boolean;
    returnDate: string | null;
}

export default ExtendedReservation;
