interface Book {
    id: number;
    library_user?: number;
    title: string;
    author: string;
    topic: string;
    isbn: string;
    location: string;
}

export default Book;
