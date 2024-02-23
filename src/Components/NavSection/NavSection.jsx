import PropTypes from "prop-types"
import { NavLink as RouterLink } from "react-router-dom"
// @mui
import { Box, List, ListItemText } from "@mui/material"
//
import { StyledNavItem, StyledNavItemIcon } from "./styles"
import Iconify from "../../@core/components/Iconify"
import useToken from "../../Hooks/UseToken"

// ----------------------------------------------------------------------

NavSection.propTypes = {
  data: PropTypes.array,
}

export default function NavSection({ data = [], ...other }) {
  const { token } = useToken()
  const filterData = data?.filter((item) => item !== null)
  return (
    <Box {...other}>
      <List disablePadding sx={{ p: 1 }}>
        {filterData?.map((item, index) => (
          <NavItem key={index} item={item} />
        ))}
      </List>
    </Box>
  )
}

// ----------------------------------------------------------------------

NavItem.propTypes = {
  item: PropTypes.object,
}

function NavItem({ item }) {
  const { title, path, icon, info } = item

  return (
    <StyledNavItem
      component={RouterLink}
      to={path}
      sx={{
        "&.active": {
          color: "#607D8B",
          bgcolor: "action.selected",
          fontWeight: "fontWeightBold",
        },
      }}
    >
      <StyledNavItemIcon>
        <Iconify width={24} icon={icon && icon} />
      </StyledNavItemIcon>

      <ListItemText disableTypography primary={title && title} />

      {info && info}
    </StyledNavItem>
  )
}
