// @mui
import { styled } from "@mui/material/styles"
import { MenuItem } from "@mui/material"

export const StyledMenuItem = styled(MenuItem)(({ theme, color, bgColor }) => {
  const colorStyle = {
    ...(color && {
      // color: theme.palette.text.primary,
      color: `${theme.palette[color].main} !important`,
    }),
    ...(bgColor && {
      // backgroundColor: "transparent",
      backgroundColor: `${theme.palette[bgColor].main} !important`,
    }),
  }
  return {
    ...colorStyle,
    borderRadius: "10px"
  }
})
