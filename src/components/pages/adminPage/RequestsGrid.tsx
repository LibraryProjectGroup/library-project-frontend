import CheckIcon from '@mui/icons-material/Check'
import ClearIcon from '@mui/icons-material/Clear'
import { IconButton } from '@mui/material'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { FC, useEffect, useState } from 'react'
import {
  fetchAllBookRequests,
  fetchUpdateBookRequest,
} from '../../../fetchFunctions'
import Book_request, {
  Book_request_status,
} from '../../../interfaces/book_request.interface'

const RequestsGrid: FC = (): JSX.Element => {
  const [requestsData, setRequestsData] = useState<Book_request[]>([])

  const COLUMNS_REQUESTS: GridColDef[] = [
    { field: 'id', headerName: 'Request ID', flex: 1, minWidth: 100 },
    { field: 'userId', headerName: 'User ID', flex: 1, minWidth: 100 },
    { field: 'isbn', headerName: 'ISBN', flex: 2, minWidth: 160 },
    { field: 'title', headerName: 'Title', flex: 3, minWidth: 80 },
    { field: 'reason', headerName: 'Reason', flex: 3, minWidth: 80 },
    {
      field: 'status',
      headerName: 'Status',
      flex: 2,
      minWidth: 100,
      valueFormatter(params: any) {
        switch (params.value) {
          case 0:
            return 'PENDING'
          case 1:
            return 'DENIED'
          case 2:
            return 'APPROVED'
          default:
            return 'UNKNOWN'
        }
      },
    },
    {
      field: 'approve',
      headerName: 'Approve',
      flex: 1,
      minWidth: 80,
      renderCell: (params) => (
        <IconButton
          title="Approve"
          onClick={() => {
            updateStatus(params.row.id, 2)
            loadRequestsData()
          }}
        >
          <CheckIcon />
        </IconButton>
      ),
    },
    {
      field: 'deny',
      headerName: 'Deny',
      flex: 1,
      minWidth: 80,
      renderCell: (params) => (
        <IconButton
          title="Deny"
          onClick={() => {
            updateStatus(params.row.id, 1)
            loadRequestsData()
          }}
        >
          <ClearIcon />
        </IconButton>
      ),
    },
  ]

  useEffect(() => {
    loadRequestsData()
  }, [])

  const loadRequestsData = async () => {
    const requestsTmp = await fetchAllBookRequests()
    setRequestsData(requestsTmp)
  }

  const updateStatus = async (id: number, status: Book_request_status) => {
    await fetchUpdateBookRequest(id, status)
    await loadRequestsData()
  }

  return (
    <DataGrid
      columns={COLUMNS_REQUESTS}
      rows={requestsData}
      sx={{ width: '100%', height: 1000, backgroundColor: 'white' }}
    ></DataGrid>
  )
}

export default RequestsGrid
