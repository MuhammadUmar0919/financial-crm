import React from 'react'
import { styled, alpha } from '@mui/material/styles'
import { Box, CardContent, Divider, Grid, MenuItem, TableCell, TextField } from '@mui/material'

export const CustomInput = React.forwardRef(({ ...props }, ref) => {
    return (
      <TextField
        size='small'
        inputRef={ref}
        sx={{ width: { sm: '250px', xs: '170px' }, '& .MuiInputBase-input': { color: 'text.secondary' } }}
        {...props}
      />
    )
  })
  
export const MUITableCell = styled(TableCell)(({ theme }) => ({
    borderBottom: 0,
    padding: `${theme.spacing(1, 0)} !important`
  }))
  
export const CalcWrapper = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    '&:not(:last-of-type)': {
      marginBottom: theme.spacing(2)
    }
  }))
  
export const RepeatingContent = styled(Grid)(({ theme }) => ({
    paddingRight: 0,
    display: 'flex',
    position: 'relative',
    // borderBStyle: "dashed",
    // borderColor: "rgba(145, 158, 171, 0.2)",
    borderRadius: theme.shape.borderRadius,
    border: `1px solid ${theme.palette.divider}`,
    '& .col-title': {
      top: '-1.5rem',
      position: 'absolute'
    },
    '& .MuiInputBase-input': {
      color: theme.palette.text.secondary
    },
    [theme.breakpoints.down('lg')]: {
      '& .col-title': {
        top: '0',
        position: 'relative'
      }
    }
  }))
  
export const RepeaterWrapper = styled(CardContent)(({ theme }) => ({
    paddingTop: theme.spacing(6),
    paddingBottom: theme.spacing(6),
    '& .repeater-wrapper + .repeater-wrapper': {
      marginTop: theme.spacing(12)
    }
  }))
  
export const StyledLine = styled(Divider)(({ theme }) => ({
    borderStyle: "dashed",
    borderColor: "rgba(145, 158, 171, 0.2)",
    mt: theme => `${theme.spacing(6)} !important`, 
    mb: theme => `${theme.spacing(6)} !important`, 
  }))
  
export  const CustomSelectItem = styled(MenuItem)(({ theme }) => ({
    color: theme.palette.success.main,
    backgroundColor: 'transparent !important',
    '&:hover': { backgroundColor: `${alpha(theme.palette.success.main, 0.1)} !important` }
  }))

  export const OptionsWrapper = styled(Box)(() => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  }))
  export  const StyledDivider = styled(Divider)(({ theme }) => ({
    margin: '0px',
    flexShrink: '0',
    borderWidth: '0px thin 0px 0px',
    borderColor: 'rgba(145, 158, 171, 0.2)',
    height: 'auto',
    alignSelf: 'stretch',
    borderStyle: 'dashed',
  }))
