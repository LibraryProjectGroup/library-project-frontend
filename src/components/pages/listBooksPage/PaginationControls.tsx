import React from 'react'
import { Grid, TablePagination } from '@mui/material'

interface PaginationControlsProps {
  booksLength: number
  page: number
  rowsPerPage: number
  handleChangePage: (event: unknown, newPage: number) => void
  handleChangeRowsPerPage: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const PaginationControls: React.FC<PaginationControlsProps> = ({
  booksLength,
  page,
  rowsPerPage,
  handleChangePage,
  handleChangeRowsPerPage,
}) => {
  return (
    <Grid
      sx={{
        textAlign: 'center',
        display: 'flex',
        minWidth: '400px',
        justifyContent: 'center',
        marginLeft: '5px',
        marginRight: '5px',
        marginTop: '5px',
      }}
    >
      <TablePagination
        component="div"
        count={booksLength}
        rowsPerPageOptions={[5, 10, 25]}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        labelRowsPerPage="Books per page:"
      />
    </Grid>
  )
}

export default PaginationControls
