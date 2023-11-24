import { FC } from 'react'
import {
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  SelectChangeEvent,
} from '@mui/material'

interface SortingDropdownProps {
  onSortChange: (value: string) => void
  sortValue: string
}

const SortingDropdown: FC<SortingDropdownProps> = ({
  onSortChange,
  sortValue,
}) => {
  const handleSortChange = (event: SelectChangeEvent) => {
    onSortChange(event.target.value as string)
  }

  return (
    <FormControl
      variant="outlined"
      sx={{ minWidth: '110px', marginLeft: '5px', marginRight: '5px' }}
    >
      <InputLabel htmlFor="sorting-dropdown">Sort By</InputLabel>
      <Select
        label="Sort By"
        id="sorting-dropdown"
        onChange={handleSortChange}
        value={sortValue}
      >
        <MenuItem value="title">Title</MenuItem>
        <MenuItem value="author">Author</MenuItem>
        <MenuItem value="topic">Topic</MenuItem>
        <MenuItem value="year">Year</MenuItem>
        <MenuItem value="office">Office</MenuItem>
      </Select>
    </FormControl>
  )
}

export default SortingDropdown
