import { Button } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import {
  fetchAdminUpdateHomeOfficeData,
  fetchAllHomeOffices,
  fetchDeleteHomeOffice,
  fetchHomeOfficeById,
  fetchAdminAddHomeOffice,
} from "../../../fetchFunctions";
import { HomeOffice } from "../../../interfaces/HomeOffice";
import CountrySpan from "../../CountrySpan";
import EditHomeOffice from "./HomeOfficeForm";

export default function HomeOfficeGrid(): JSX.Element {
  const [homeOffices, setHomeOffices] = useState<HomeOffice[]>([]);
  const [homeOfficeBeingEdited, setHomeOfficeBeingEdited] =
    useState<HomeOffice | null>(null);
  const [formVisible, setFormVisible] = useState(false);
  const [open, setOpen] = useState(false);
  const [formEditing, setFormEditing] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const setFormOffice = (office: HomeOffice) => {
    setHomeOfficeBeingEdited(office);
    setFormVisible(true);
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
      setFormVisible(true);
      setHomeOfficeBeingEdited(homeOfficeData);
    });
  }

  function updateHomeOffice(editedOffice: HomeOffice) {
    fetchAdminUpdateHomeOfficeData(editedOffice).then((ok) => {
      if (ok?.ok) {
        setFormVisible(false);
        return loadHomeOfficeData();
      }
    });
  }

  const addHomeOffice = async (newHomeOffice: HomeOffice) => {
    await fetchAdminAddHomeOffice(newHomeOffice).then((res: { ok: any }) => {
      if (!res.ok) {
        console.log("error creating office");
      } else {
        setFormVisible(false);
      }
    });
  };

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
            setFormEditing(true);
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
        visible={formVisible}
        setVisible={setFormVisible}
        setHomeOfficeData={setHomeOfficeBeingEdited}
        homeOffice={homeOfficeBeingEdited}
        updateHomeOffice={updateHomeOffice}
        addHomeOffice={addHomeOffice}
        editing={formEditing}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={() => {
          setFormEditing(false);
          setFormOffice({
            id: -1,
            countryCode: "XXX",
            name: "",
          });
        }}
      >
        Create New Office
      </Button>
      <DataGrid
        columns={COLUMNS_USERS}
        rows={homeOffices}
        sx={{ width: "100%", height: 1000, backgroundColor: "white" }}
      ></DataGrid>
    </>
  );
}
