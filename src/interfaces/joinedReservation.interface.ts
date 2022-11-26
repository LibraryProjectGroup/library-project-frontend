interface JoinedReservation {
    id: number;
    username: string;
    title: string;
    bookId: number;
    reservationDatetime: string; // Apparently sent as a string in ISO_8601 format
    loaned: boolean;
    canceled: boolean;
}

export default JoinedReservation;
