import * as React from "react"
import Button from "@mui/material/Button"
import TextField from "@mui/material/TextField"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogTitle from "@mui/material/DialogTitle"
import { useDispatch } from "react-redux"
import { Box, MenuItem } from "@mui/material"
import Iconify from "../../@core/components/iconify"
import { statusUsers } from "Data"
import { sentenceCase } from "change-case"
import Label from "../../@core/components/label"
import useResponsive from "Hooks/UseResponsive"
import { LoadingButton } from "@mui/lab"
import { StatusColors } from "Utils/statusColors"

export default function RankForm({ onRank, data, loading }) {
  const dispatch = useDispatch()
  const [open, setOpen] = React.useState(false)
  const isDesktop = useResponsive("up", "lg", "sm", "xs")
  const [userData, setUserData] = React.useState({ ...data })
  const [dateValue, setValue] = React.useState(userData.meetingDate)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value })
  }

  const handleChanged = (newValue) => {
    setValue(newValue)
  }

  const handleEditSubmit = async (event) => {
    event.preventDefault()
    const value = {
      ...userData,
      modifiedDate: new Date(),
      rank: value,
    }
    try {
      dispatch(onRank(value))
    } catch (error) {}
  }

  return (
    <>
      <Button
        color="success"
        variant="outlined"
        onClick={handleClickOpen}
        startIcon={
          <Iconify
            icon={"mdi:card-account-details-star-outline"}
            sx={{ mr: 2 }}
          />
        }
      >
        Rank
      </Button>
      <Dialog fullWidth maxWidth="xs" open={open} onClose={handleClose}>
        <Box
          noValidate
          component="form"
          autoComplete="off"
          onSubmit={handleEditSubmit}
        >
          <DialogTitle>Select the status</DialogTitle>
          <DialogContent>
            <TextField
              multiline
              fullWidth
              minRows={3}
              maxRows={6}
              id="rejectedReason"
              // value={field.value}
              // onChange={field.onChange}
              placeholder="Enter the reason..."
              // error={!!errors.rejectedReason}
              // helperText={
              //   errors.rejectedReason ? errors.rejectedReason.message : ""
              // }
            />
          </DialogContent>
          <DialogActions>
            <Button variant="outlined" onClick={handleClose}>
              Cancel
            </Button>
            <LoadingButton
              type="submit"
              loading={loading}
              variant="contained"
              onClick={handleEditSubmit}
            >
              {loading ? "Saving..." : "Save"}
            </LoadingButton>
          </DialogActions>
        </Box>
      </Dialog>
    </>
  )
}
