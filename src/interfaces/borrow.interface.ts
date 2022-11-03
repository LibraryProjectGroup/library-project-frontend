interface Borrow {
    id: number;
    library_user: number;
    book: number;
    borrowDate: Date;
    dueDate: Date;
    returned: boolean;
}

export default Borrow;
