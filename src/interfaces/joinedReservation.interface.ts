interface JoinedReservation {
    id: number;
    username: string;
    title: string;
    bookId: number;
    reservationDatetime: Date;
    loaned: boolean;
    canceled: boolean;
}

export default JoinedReservation;
