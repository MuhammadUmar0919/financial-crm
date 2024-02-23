import * as React from "react"
import {
  Box,
  Dialog,
  Button,
  TextField,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
} from "@mui/material"
import Iconify from "../iconify"
import { LoadingButton } from "@mui/lab"
import { useDispatch } from "react-redux"
import { TimeSleep } from "Utils/timeSleep"

export default function AssignmentForm({ data, onDeadline, loading }) {
  const [open, setOpen] = React.useState(false)
  const [rank, setRank] = React.useState("")
  const dispatch = useDispatch()
  const handleChange = (value) => {
    setRank(value)
  }
  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    dispatch(onDeadline(rank))
    await TimeSleep()
    e.reset()
  }
  return (
    <>
      <Button
        color="info"
        variant="outlined"
        onClick={handleClickOpen}
        startIcon={
          <Iconify
            width={24}
            sx={{ mr: 2 }}
            icon={"mdi:card-account-details-outline"}
          />
        }
      >
        Assignment
      </Button>
      <Dialog
        sx={{
          "& .MuiPaper-root": { width: "100%", maxWidth: 400, p: [8, 4] },
        }}
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>{data?.fullName}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Box component="form" onSubmit={handleSubmit}>
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
            </Box>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={handleClose}>
            Cancel
          </Button>
          <LoadingButton
            type="submit"
            variant="contained"
            loading={loading}
            onClick={handleClose}
          >
            {loading ? "Saving" : "Save"}
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </>
  )
}
