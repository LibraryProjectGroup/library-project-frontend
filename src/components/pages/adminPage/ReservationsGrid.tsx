import RemoveCircleIcon from '@mui/icons-material/RemoveCircle'
import { IconButton } from '@mui/material'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { FC, useEffect, useState } from 'react'
import {
  fetchAllExtendedBookReservations,
  fetchCancelBookReservation,
} from '../../../fetchFunctions'
import ExtendedReservation from '../../../interfaces/extendedReservation.interface'

const ReservationsGrid: FC = (): JSX.Element => {
  const [reservationsData, setReservationsData] = useState<
    ExtendedReservation[]
  >([])

  const COLUMNS_RESERVATIONS: GridColDef[] = [
    { field: 'id', headerName: 'Reservation ID', flex: 1, minWidth: 120 },
    { field: 'username', headerName: 'Username', flex: 2, minWidth: 140 },
    { field: 'title', headerName: 'Book title', flex: 3, minWidth: 200 },
    { field: 'bookId', headerName: 'Book id', flex: 1, minWidth: 80 },
    {
      field: 'reservationDatetime',
      headerName: 'Reservation time',
      flex: 2,
      minWidth: 180,
      valueFormatter(params) {
        return new Date(params.value).toLocaleString('fi', {
          year: 'numeric',
          month: 'numeric',
          day: 'numeric',
          hour: 'numeric',
          minute: 'numeric',
          second: 'numeric',
        })
      },
    },
    {
      field: 'loaned',
      headerName: 'Loaned',
      flex: 1,
      minWidth: 80,
      renderCell(params) {
        return params.value ? (
          <div style={{ color: 'green' }}>true</div>
        ) : (
          <div style={{ color: 'gray' }}>false</div>
        )
      },
    },
    {
      field: 'canceled',
      headerName: 'Canceled',
      flex: 1,
      minWidth: 80,
      renderCell(params) {
        return params.value ? (
          <div style={{ color: 'green' }}>true</div>
        ) : (
          <div style={{ color: 'gray' }}>false</div>
        )
      },
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Cancel res.',
      flex: 1,
      minWidth: 140,
      renderCell: (params) =>
        params.row.canceled ? null : (
          <div>
            <IconButton
              style={{ color: 'red' }}
              title="Cancel"
              onClick={() => {
                cancelReservation(params.row.id)
              }}
            >
              <RemoveCircleIcon />
            </IconButton>
          </div>
        ),
    },
  ]

  useEffect(() => {
    loadReservationsData()
  }, [])

  const loadReservationsData = async () => {
    const reservationsTmp = await fetchAllExtendedBookReservations()
    setReservationsData(reservationsTmp)
  }

  const cancelReservation = async (id: number) => {
    await fetchCancelBookReservation(id)
    loadReservationsData()
  }

  return (
    <DataGrid
      columns={COLUMNS_RESERVATIONS}
      rows={reservationsData}
      sx={{ width: '100%', height: 1000, backgroundColor: 'white' }}
    ></DataGrid>
  )
}

export default ReservationsGrid
