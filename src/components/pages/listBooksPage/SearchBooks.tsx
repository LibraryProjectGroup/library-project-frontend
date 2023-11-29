import React, { useState, ChangeEvent, KeyboardEvent } from 'react'
import { TextField, IconButton, InputAdornment } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import ClearIcon from '@mui/icons-material/Clear'

interface SearchBooksProps {
  onSearch: (searchTerm: string) => void
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>
  searchTerm: string
}

const SearchBooks: React.FC<SearchBooksProps> = ({
  onSearch,
  setSearchTerm,
  searchTerm,
}) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
  }

  const handleSearch = () => {
    onSearch(searchTerm)
  }

  const handleClear = () => {
    setSearchTerm('')
    onSearch('')
  }

  const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearch()
    }
  }

  return (
    <>
      <TextField
        label="Search"
        variant="outlined"
        value={searchTerm}
        onChange={handleChange}
        onKeyDown={handleKeyPress}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <IconButton
                type="submit"
                aria-label="search"
                onClick={handleSearch}
              >
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              {searchTerm && (
                <IconButton aria-label="clear search" onClick={handleClear}>
                  <ClearIcon />
                </IconButton>
              )}
            </InputAdornment>
          ),
        }}
      />
    </>
  )
}

export default SearchBooks
