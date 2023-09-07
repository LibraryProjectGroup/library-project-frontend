import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { FC, useEffect, useState } from "react";
import { fetchAllBooks } from "../../../fetchFunctions";
import Book from "../../../interfaces/book.interface";
import OfficeSpan from "../../OfficeSpan";

const BooksGrid: FC = (): JSX.Element => {
  const [booksData, setBooksData] = useState<Book[]>([]);

  const COLUMNS_BOOKS: GridColDef[] = [
    { field: "id", headerName: "ID", flex: 1, minWidth: 70 },
    { field: "title", headerName: "Title", flex: 5, minWidth: 250 },
    { field: "image", headerName: "Image", flex: 5, minWidth: 120 },
    { field: "author", headerName: "Author", flex: 4, minWidth: 140 },
    { field: "year", headerName: "Year", flex: 4, minWidth: 70 },
    { field: "topic", headerName: "Topic", flex: 4, minWidth: 70 },
    {
      field: "office",
      headerName: "Office",
      flex: 3,
      minWidth: 120,
      renderCell: (params) => {
        const { homeOfficeCountry, homeOfficeName } = params.row;
        return (
          <OfficeSpan
            countryCode={homeOfficeCountry}
            officeName={homeOfficeName}
          />
        );
      },
    },
    { field: "isbn", headerName: "ISBN", flex: 3, minWidth: 150 },
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
