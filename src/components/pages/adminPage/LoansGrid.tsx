import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { FC, useEffect, useState } from 'react'
import { fetchAllCurrentLoans } from '../../../fetchFunctions'
import Loan from '../../../interfaces/loan.interface'

const LoansGrid: FC = (): JSX.Element => {
  const [loansData, setLoansData] = useState<Loan[]>([])

  const COLUMNS_LOANS: GridColDef[] = [
    { field: 'username', headerName: 'Username', flex: 2, minWidth: 120 },
    { field: 'title', headerName: 'Book title', flex: 3, minWidth: 250 },
    {
      field: 'borrowDate',
      headerName: 'Borrowed',
      flex: 2,
      minWidth: 100,
      valueFormatter(params) {
        return new Date(params.value).toLocaleString('fi', {
          year: 'numeric',
          month: 'numeric',
          day: 'numeric',
        })
      },
    },
    {
      field: 'dueDate',
      headerName: 'Due',
      flex: 2,
      minWidth: 100,
      renderCell(params) {
        const dueDate = new Date(params.value).toLocaleString('fi', {
          year: 'numeric',
          month: 'numeric',
          day: 'numeric',
        })
        return new Date(params.value) < new Date() ? (
          <div style={{ color: 'red' }}>{dueDate}</div>
        ) : (
          <div>{dueDate}</div>
        )
      },
    },
    { field: 'id', headerName: 'Book ID', flex: 1, minWidth: 80 },
  ]

  useEffect(() => {
    loadLoansData()
  }, [])

  const loadLoansData = async () => {
    const loansTmp = await fetchAllCurrentLoans()
    setLoansData(loansTmp)
  }

  return (
    <DataGrid
      columns={COLUMNS_LOANS}
      rows={loansData}
      sx={{ width: '100%', height: 1000, backgroundColor: 'white' }}
    ></DataGrid>
  )
}

export default LoansGrid
