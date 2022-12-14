interface Book {
    id: number;
    library_user?: number;
    title: string;
    author: string;
    topic: string;
    isbn: string;
    location: string;
    deleted: boolean;
}

export default Book;
