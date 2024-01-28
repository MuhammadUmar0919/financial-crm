import React from "react"
import {
  Box,
  Grid,
  Stack,
  Button,
  Dialog,
  Typography,
  IconButton,
  DialogTitle,
  FormControl,
  DialogContent,
  ListItemButton,
  DialogContentText,
} from "@mui/material"
import { Controller } from "react-hook-form"
import { Link } from "react-router-dom"
import Iconify from "Components/Iconify"
import ScrollBar from "react-perfect-scrollbar"
import useToken from "Hooks/UseToken"
import { SearchInput } from "@core/components/custom-input"
import NotFoundData from "Components/NotFound"
import { EmptyData } from "Components/EmptyData"

const filterData = (array, query) => {
  if (query) {
    return array.filter(
      (item) =>
        item?.fullName?.toLowerCase().includes(query.toLowerCase()) ||
        item?.address?.toLowerCase().includes(query.toLowerCase())
    )
  } else {
    return array
  }
}

export const FromTo = ({ title, data, setValue, errors, control }) => {
  const { token } = useToken()
  const userType = title === "employee"
  const field = userType ? "createdBy" : "billTo"
  const role = userType && token.roleName === "employee"
  const [open, setOpen] = React.useState(false)
  const [search, setSearch] = React.useState("")
  const [dataObj, setData] = React.useState(null)

  const handleOpen = () => setOpen(!open)
  const handleClose = () => setOpen(false)
  const handleFilter = (e) => setSearch(e.target.value)

  const handleClick = (value) => {
    setData(value)
    setValue(field, value.id)
    handleClose()
  }

  const filteredData = filterData(data, search)
  const isNotFound = !filteredData?.length && !!search
  return (
    <>
      <Stack
        sx={{
          display: "grid",
          height: "100%",
          alignContent: "space-between",
        }}
      >
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography variant="h6">{userType ? "From" : "To"}:</Typography>
          <IconButton disabled={role} onClick={handleOpen}>
            <Iconify icon={`mdi:${dataObj ? "edit" : "plus"}`} />
          </IconButton>
        </Stack>
        <Stack>
          {dataObj ? (
            <>
              <Typography variant="subtitle2">{dataObj.fullName}</Typography>
              <Typography variant="body2">{dataObj.address}</Typography>
              <Typography variant="body2">{dataObj.phoneNumber}</Typography>
            </>
          ) : (
            <Controller
              name={field}
              control={control}
              rules={{ required: "Please select a value." }}
              render={({ field: controllerField }) => (
                <Typography
                  variant="body2"
                  {...controllerField}
                  color={errors && errors[field] ? "error" : "inherit"}
                >
                  {errors[field] && errors[field].message}
                </Typography>
              )}
            />
          )}
        </Stack>
      </Stack>
      <Dialog
        sx={{ "& .MuiPaper-root": { width: "100%", maxWidth: 400, p: [4, 2] } }}
        open={open}
        onClose={handleClose}
      >
        <Box
          display="flex"
          alignItems="center"
          sx={{ p: "1rem 1rem 0 1rem" }}
          justifyContent="space-between"
        >
          <DialogTitle sx={{ p: "unset" }}>
            {userType ? "Employees" : "Customers"}
          </DialogTitle>
          <Button
            component={Link}
            to={`/${title.toLowerCase()}s`}
            startIcon={<Iconify icon="mdi:plus" />}
          >
            New
          </Button>
        </Box>
        <DialogContent>
          <DialogContentText mb={4}>
            <FormControl fullWidth>
              <SearchInput
                size="large"
                type={title}
                value={search}
                setValue={setSearch}
                onChange={handleFilter}
              />
            </FormControl>
          </DialogContentText>
          <Box component="form" onSubmit={handleClick}>
            <ScrollBar>
              {filteredData.length > 0 ? (
                <Grid height="auto" container spacing={3}>
                  {filteredData.map((item, index) => (
                    <Grid key={index} item xs={12}>
                      <ListItemButton
                        onClick={() => handleClick(item)}
                        sx={{
                          borderRadius: "10px",
                          display: "grid",
                          gap: "5px",
                        }}
                      >
                        <Typography variant="subtitle2">
                          {item.fullName}
                        </Typography>
                        <Typography variant="body2">{item.address}</Typography>
                        <Typography variant="body2">
                          {item.phoneNumber}
                        </Typography>
                      </ListItemButton>
                    </Grid>
                  ))}
                </Grid>
              ) : isNotFound ? (
                <NotFoundData text={search} />
              ) : (
                <EmptyData message="No data" />
              )}
            </ScrollBar>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  )
}
