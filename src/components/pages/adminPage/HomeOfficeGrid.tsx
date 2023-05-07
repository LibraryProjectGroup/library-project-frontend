import { useEffect, useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import {
  fetchAdminUpdateHomeOfficeData,
  fetchAllHomeOffices,
  fetchDeleteHomeOffice,
  fetchHomeOfficeById,
} from "../../../fetchFunctions";
import { HomeOffice } from "../../../interfaces/HomeOffice";
import EditHomeOffice from "./EditHomeOffice";
import CountrySpan from "../../CountrySpan";

export default function HomeOfficeGrid(): JSX.Element {
  const [homeOffices, setHomeOffices] = useState<HomeOffice[]>([]);
  const [homeOfficeBeingEdited, setHomeOfficeBeingEdited] =
    useState<HomeOffice | null>(null);
  const [editFormVisible, setEditFormVisible] = useState(false);
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  function loadHomeOfficeData() {
    (async () => {
      setHomeOffices(await fetchAllHomeOffices());
    })();
  }

  // On the initial page render, fetch all home offices
  useEffect(() => {
    loadHomeOfficeData();
  }, []);

  function deleteHomeOffice(homeOfficeId: number) {
    fetchDeleteHomeOffice(homeOfficeId).then(() => loadHomeOfficeData());
  }

  function editHomeOffice(homeOfficeId: number) {
    fetchHomeOfficeById(homeOfficeId).then((homeOfficeData) => {
      setEditFormVisible(true);
      setHomeOfficeBeingEdited(homeOfficeData);
    });
  }

  function updateHomeOffice(editedOffice: HomeOffice) {
    fetchAdminUpdateHomeOfficeData(editedOffice).then((ok) => {
      if (ok?.ok) {
        setEditFormVisible(false);
        return loadHomeOfficeData();
      }
    });
  }

  const COLUMNS_USERS: GridColDef[] = [
    { field: "id", headerName: "ID", flex: 1, minWidth: 70 },
    { field: "name", headerName: "Office Name", flex: 2, minWidth: 160 },
    {
      field: "countryCode",
      headerName: "Country",
      flex: 2,
      minWidth: 240,
      renderCell: (params) => {
        const countryCode = params.row.countryCode;
        return <CountrySpan countryCode={countryCode} includeFlag={true} />;
      },
    },
    {
      field: "edit",
      headerName: "Edit Office",
      flex: 2,
      minWidth: 100,
      renderCell: (params) => (
        <Button
          sx={{ color: "blue" }}
          onClick={() => {
            editHomeOffice(params.row.id);
          }}
        >
          Edit
        </Button>
      ),
    },
    {
      field: "delete",
      headerName: "Delete Office",
      flex: 2,
      minWidth: 100,
      renderCell: (params) => (
        <Button
          sx={{ color: "red" }}
          onClick={() => {
            deleteHomeOffice(params.row.id);
            loadHomeOfficeData();
          }}
        >
          Delete
        </Button>
      ),
    },
  ];

  return (
    <>
      <EditHomeOffice
        visible={editFormVisible}
        setVisible={setEditFormVisible}
        setEditingHomeOfficeData={setHomeOfficeBeingEdited}
        homeOffice={homeOfficeBeingEdited}
        updateHomeOffice={updateHomeOffice}
      />
      <DataGrid
        columns={COLUMNS_USERS}
        rows={homeOffices}
        sx={{ width: "100%", height: 1000, backgroundColor: "white" }}
      ></DataGrid>
    </>
  );
}
