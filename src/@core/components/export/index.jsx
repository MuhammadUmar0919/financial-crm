// react import
import * as React from "react";
// @mui import
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import MenuItem from "@mui/material/MenuItem";
import { Box, ListItemIcon } from "@mui/material";
// components import
import { StyledMenu } from "./styled";
import Iconify from "@/@core/components/iconify";
import { DownloadPDF } from "@/@core/components/Downloads/DownloadPDF";
import { DownloadEXCEL } from "@/@core/components/Downloads/DownloadEXCEL";

export const ExportBtn = ({ data, title }) => {
  const [anchorEl, setAnchorEl] = React.useState(null)
  const open = Boolean(anchorEl)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <Box>
      <Button
        color="primary"
        disableElevation
        variant="outlined"
        aria-haspopup="true"
        onClick={handleClick}
        id="demo-customized-button"
        aria-expanded={open ? "true" : undefined}
        endIcon={<Iconify icon="mdi:chevron-down" />}
        startIcon={<Iconify icon={"mdi:table-arrow-right"} />}
        aria-controls={open ? "demo-customized-menu" : undefined}
      >
        Export
      </Button>
      <StyledMenu
        id="demo-customized-menu"
        MenuListProps={{
          "aria-labelledby": "demo-customized-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem onClick={() => DownloadEXCEL(data, title)} disableRipple>
          <ListItemIcon sx={{mr: 0}}>
            <Iconify icon="mdi:file-excel-outline" />
          </ListItemIcon>
          Excel
        </MenuItem>
        <Divider sx={{ my: 0.5 }} />
        <MenuItem onClick={() => DownloadPDF(data, title)} disableRipple>
          <ListItemIcon sx={{mr: 0}}>
            <Iconify icon="mdi:file-pdf-outline" />
          </ListItemIcon>
          PDF
        </MenuItem>
      </StyledMenu>
    </Box>
  )
}
