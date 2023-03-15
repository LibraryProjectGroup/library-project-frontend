import { useState, useEffect, FC } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Book from "../../../interfaces/book.interface";
import { fetchAllBooks } from "../../../fetchFunctions";

const BooksGrid: FC = (): JSX.Element => {
  const [booksData, setBooksData] = useState<Book[]>([]);

  const COLUMNS_BOOKS: GridColDef[] = [
    { field: "id", headerName: "ID", flex: 1, minWidth: 70 },
    { field: "title", headerName: "Title", flex: 5, minWidth: 140 },
    { field: "author", headerName: "Author", flex: 4, minWidth: 140 },
    { field: "year", headerName: "Year", flex: 4, minWidth: 60 },
    { field: "topic", headerName: "Topic", flex: 4, minWidth: 100 },
    { field: "location", headerName: "Location", flex: 3, minWidth: 140 },
    { field: "isbn", headerName: "ISBN", flex: 3, minWidth: 160 },
  ];

  useEffect(() => {
    loadBooksData();
  }, []);

  const loadBooksData = async () => {
    const booksTmp = await fetchAllBooks();
    setBooksData(booksTmp);
  };

  return (
    <DataGrid
      columns={COLUMNS_BOOKS}
      rows={booksData}
      sx={{ width: "100%", height: 1000, backgroundColor: "white" }}
    ></DataGrid>
  );
};

export default BooksGrid;
