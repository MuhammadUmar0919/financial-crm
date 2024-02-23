// components import
import Iconify from "@/@core/components/iconify"
// mui imports
import { InputAdornment, TextField, IconButton } from "@mui/material"

export const SearchInput = ({ fullWidth, type, value, setValue, onChange, size, sx }) => {
  const handleClear = () => {
    setValue('')
  }
    return (
        <TextField
          fullWidth
          size={size}
          value={value}
          sx={{ ...sx }}
          onChange={onChange}
          placeholder={`Search ${type}...`}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Iconify
                  width={20}
                  color='text.primary'
                  icon="eva:search-fill"
                />
              </InputAdornment>
            ),
            endAdornment: (
              value &&
              <InputAdornment position="end">
                <IconButton size="small" onClick={handleClear}>
                  <Iconify
                    // width={20}
                    icon="mdi:close"
                    color='text.primary'
                  />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
    )
}