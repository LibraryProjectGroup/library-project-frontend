import { FC } from 'react'
import { Button } from '@mui/material'
import { userPageReturnButton } from '../../../sxStyles'
import { useNavigate } from 'react-router-dom'

const Unauthorized: FC = () => {
  const navigate = useNavigate()
  return (
    <>
      <h1 style={{ textAlign: 'center' }}>Unauthorized</h1>
      <h3 style={{ textAlign: 'center' }}>Sorry, access denied</h3>
      <Button
        sx={userPageReturnButton}
        variant="contained"
        onClick={() => {
          navigate('/')
        }}
      >
        Return
      </Button>
    </>
  )
}

export default Unauthorized
