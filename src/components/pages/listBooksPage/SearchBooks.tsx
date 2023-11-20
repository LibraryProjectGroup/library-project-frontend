import React, { useState, useEffect, ChangeEvent } from 'react'
import { TextField, IconButton, InputAdornment } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'

interface SearchBooksProps {
  onSearch: (searchTerm: string) => void
}

const SearchBooks: React.FC<SearchBooksProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState<string>('')

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
  }

  const handleSearch = () => {
    onSearch(searchTerm)
  }

  return (
    <>
      <TextField
        label="Search"
        variant="outlined"
        value={searchTerm}
        onChange={handleChange}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                type="submit"
                aria-label="search"
                onClick={handleSearch}
              >
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </>
  )
}

export default SearchBooks
