"use client"

import { TextField, InputAdornment } from "@mui/material"
import { Search } from "@mui/icons-material"

interface SearchBarProps {
  placeholder: string
  value: string
  onChange: (value: string) => void
}

export function SearchBar({ placeholder, value, onChange }: SearchBarProps) {
  return (
    <TextField
      fullWidth
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <Search color="action" />
          </InputAdornment>
        ),
      }}
      sx={{ mb: 2 }}
    />
  )
}
