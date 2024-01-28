// ** React Imports
import { useState } from "react"

// ** MUI Imports
import Box from "@mui/material/Box"
import Grid from "@mui/material/Grid"
import Card from "@mui/material/Card"
import Divider from "@mui/material/Divider"
import { styled } from "@mui/material/styles"
import Typography from "@mui/material/Typography"
import CardContent from "@mui/material/CardContent"
import CardActions from "@mui/material/CardActions"

// ** Iconify Imports
import Iconify from "Components/Iconify"

// ** Custom Components
import CustomChip from "@core/components/mui/chip"
import CustomAvatar from "@core/components/mui/avatar"
import SuspendDialog from "./SuspendDialog"
import SubscriptionDialog from "./SubscriptionDialog"

// ** Utils Import
import { getInitials } from "@core/utils/get-initials"
import Label from "Components/Label"
import { sentenceCase } from "change-case"
import { momentDate } from "Utils/formatTime"
import { createdByFind } from "Utils/dataUtils"
import RankForm from "Components/RankForm"
import AssignmentForm from "Components/AssignmentForm"
import { fDateTime } from "Utils/formatTime"
import { useSelector } from "react-redux"

// const data = {
//   avatarColor: "primary",
//   company: "Yotz PVT LTD",
//   currentPlan: "enterprise",
//   avatar: "/images/avatars/4.png",
// }

const roleColors = {
  Admin: "success",
  Employee: "info",
  User: "warning",
}

const statusColors = {
  active: "success",
  pending: "warning",
  inactive: "secondary",
  rejected: "error",
}

// ** Styled <sup> component
const Sup = styled("sup")(({ theme }) => ({
  top: "0.2rem",
  left: "-0.6rem",
  position: "absolute",
  color: theme.palette.primary.main,
}))

// ** Styled <sub> component
const Sub = styled("sub")({
  fontWeight: 300,
  fontSize: "1rem",
  alignSelf: "flex-end",
})

const UserViewLeft = ({ tableData }) => {
  // ** States
  const { profile, tableCell, loading, onEdit } = tableData
  const {
    age,
    email,
    avatar,
    status,
    company,
    country,
    address,
    fullName,
    roleIcon,
    roleName,
    username,
    createdBy,
    assignment,
    createdAt,
    phoneNumber,
    modifiedDate,
  } = profile
  const [openEdit, setOpenEdit] = useState(false)
  const [suspendDialogOpen, setSuspendDialogOpen] = useState(false)
  const [subscriptionDialogOpen, setSubscriptionDialogOpen] = useState(false)
  const { authData } = useSelector((state) => state.authReducer);

  // Handle Edit dialog
  const handleEditClickOpen = () => setOpenEdit(true)
  const handleEditClose = () => setOpenEdit(false)

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardContent
            sx={{
              pt: 10,
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            {roleIcon.length ? (
              <CustomAvatar
                src={avatar}
                variant="rounded"
                alt={fullName}
                sx={{
                  width: 120,
                  height: 120,
                  fontWeight: 600,
                  mb: 4,
                  fontSize: "3rem",
                }}
              />
            ) : (
              <CustomAvatar
                skin="light"
                variant="rounded"
                color="secondary"
                sx={{
                  width: 80,
                  height: 80,
                  fontWeight: 600,
                  mb: 4,
                  fontSize: "2rem",
                }}
              >
                {getInitials(fullName)}
              </CustomAvatar>
            )}
            <Typography variant="h6" sx={{ mb: 2 }}>
              {fullName}
            </Typography>
            <Label
              color={roleColors[roleName]}
              startIcon={<Iconify icon={roleIcon} />}
            >
              {sentenceCase(roleName || "")}
            </Label>
          </CardContent>

          <CardContent sx={{ my: 1 }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Box sx={{ mr: 8, display: "flex", alignItems: "center" }}>
                <CustomAvatar skin="light" variant="rounded" sx={{ mr: 3 }}>
                  <Iconify icon="mdi:check" />
                </CustomAvatar>
                <Box>
                  <Typography variant="h6" sx={{ lineHeight: 1.3 }}>
                    1.23k
                  </Typography>
                  <Typography variant="body2">Task Done</Typography>
                </Box>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <CustomAvatar skin="light" variant="rounded" sx={{ mr: 3 }}>
                  <Iconify icon="mdi:briefcase-variant-outline" />
                </CustomAvatar>
                <Box>
                  <Typography variant="h6" sx={{ lineHeight: 1.3 }}>
                    {assignment?.length}
                  </Typography>
                  <Typography variant="body2">Assignment Done</Typography>
                </Box>
              </Box>
            </Box>
          </CardContent>

          <CardContent>
            <Typography variant="h6">Details</Typography>
            <Divider sx={{ mt: (theme) => `${theme.spacing(4)} !important` }} />
            <Box sx={{ pt: 2, pb: 1 }}>
              <Box sx={{ display: "flex", mb: 2.7 }}>
                <Typography
                  variant="subtitle2"
                  sx={{ mr: 2, color: "text.primary" }}
                >
                  Full name:
                </Typography>
                <Typography variant="body2">{fullName}</Typography>
              </Box>
              <Box sx={{ display: "flex", mb: 2.7 }}>
                <Typography
                  variant="subtitle2"
                  sx={{ mr: 2, color: "text.primary" }}
                >
                  Email:
                </Typography>
                <Typography variant="body2">{email}</Typography>
              </Box>
              <Box sx={{ display: "flex", mb: 2.7 }}>
                <Typography
                  variant="subtitle2"
                  sx={{ mr: 2, color: "text.primary" }}
                >
                  Status:
                </Typography>
                <CustomChip
                  skin="light"
                  size="small"
                  label={status}
                  color={statusColors[status]}
                  sx={{
                    height: 20,
                    fontWeight: 500,
                    fontSize: "0.75rem",
                    borderRadius: "5px",
                    textTransform: "capitalize",
                  }}
                />
              </Box>
              <Box sx={{ display: "flex", mb: 2.7 }}>
                <Typography
                  sx={{ mr: 2, fontWeight: 500, fontSize: "0.875rem" }}
                >
                  Role:
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ textTransform: "capitalize" }}
                >
                  {roleName}
                </Typography>
              </Box>
              <Box sx={{ display: "flex", mb: 2.7 }}>
                <Typography
                  sx={{ mr: 2, fontWeight: 500, fontSize: "0.875rem" }}
                >
                  Age:
                </Typography>
                <Typography variant="body2">{age}</Typography>
              </Box>
              <Box sx={{ display: "flex", mb: 2.7 }}>
                <Typography
                  sx={{ mr: 2, fontWeight: 500, fontSize: "0.875rem" }}
                >
                  Contact:
                </Typography>
                <Typography variant="body2">{phoneNumber}</Typography>
              </Box>
              <Box sx={{ display: "flex", mb: 2.7 }}>
                <Typography
                  sx={{ mr: 2, fontWeight: 500, fontSize: "0.875rem" }}
                >
                  Username:
                </Typography>
                <Typography variant="body2">{username}</Typography>
              </Box>
              <Box sx={{ display: "flex", mb: 2.7 }}>
                <Typography
                  sx={{ mr: 2, fontWeight: 500, fontSize: "0.875rem" }}
                >
                  Company:
                </Typography>
                <Typography variant="body2">{company}</Typography>
              </Box>
              <Box sx={{ display: "flex", mb: 2.7 }}>
                <Typography
                  sx={{ mr: 2, fontWeight: 500, fontSize: "0.875rem" }}
                >
                  Country:
                </Typography>
                <Typography variant="body2">{country}</Typography>
              </Box>
              <Box sx={{ display: "flex", mb: 2.7 }}>
                <Typography
                  sx={{ mr: 2, fontWeight: 500, fontSize: "0.875rem" }}
                >
                  Address:
                </Typography>
                <Typography variant="body2">{address}</Typography>
              </Box>
              <Box sx={{ display: "flex", mb: 2.7 }}>
                <Typography
                  sx={{ mr: 2, fontWeight: 500, fontSize: "0.875rem" }}
                >
                  Created by:
                </Typography>
                <Box>
                  <Typography
                    sx={{ mr: 2, fontWeight: 500, fontSize: "0.875rem" }}
                  >
                    {sentenceCase(createdByFind(createdBy, authData)?.roleName || '')}
                  </Typography>
                  <Typography variant="body2">
                    {createdByFind(createdBy, authData)?.fullName}
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ display: "flex", mb: 2.7 }}>
                <Typography
                  sx={{ mr: 2, fontWeight: 500, fontSize: "0.875rem" }}
                >
                  Created at:
                </Typography>
                <Typography variant="body2">{fDateTime(createdAt)}</Typography>
              </Box>
              <Box sx={{ display: "flex", mb: 2.7 }}>
                <Typography
                  sx={{ mr: 2, fontWeight: 500, fontSize: "0.875rem" }}
                >
                  Modified at:
                </Typography>
                <Typography variant="body2">
                  {momentDate(modifiedDate)}
                </Typography>
              </Box>
            </Box>
          </CardContent>

          <CardActions sx={{ justifyContent: "space-between" }}>
            {tableCell?.assignmentBtn && (
              <AssignmentForm
                data={profile}
                loading={loading}
                onDeadline={onEdit}
              />
            )}
            {tableCell?.rankBtn && (
              <RankForm data={profile} loading={loading} onRank={onEdit} />
            )}
          </CardActions>

          {/* <Dialog
            open={openEdit}
            onClose={handleEditClose}
            sx={{
              "& .MuiPaper-root": {
                width: "100%",
                maxWidth: 650,
                p: [2, 10],
              },
            }}
            aria-labelledby="user-view-edit"
            aria-describedby="user-view-edit-description"
          >
            <DialogTitle
              id="user-view-edit"
              sx={{ textAlign: "center", fontSize: "1.5rem !important" }}
            >
              Edit User Information
            </DialogTitle>
            <DialogContent>
              <Box component="form">
                <Grid container spacing={6}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Full Name"
                      defaultValue={profile.fullName}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Username"
                      defaultValue={profile.username}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">@</InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      type="email"
                      label="Billing Email"
                      defaultValue={profile.email}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                      <InputLabel id="user-view-status-label">
                        Status
                      </InputLabel>
                      <Select
                        label="Status"
                        defaultValue={profile.status}
                        id="user-view-status"
                        labelId="user-view-status-label"
                      >
                        <MenuItem value="pending">Pending</MenuItem>
                        <MenuItem value="active">Active</MenuItem>
                        <MenuItem value="inactive">Inactive</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="TAX ID"
                      defaultValue="Tax-8894"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Contact"
                      defaultValue={`+1 ${profile.contact}`}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                      <InputLabel id="user-view-language-label">
                        Language
                      </InputLabel>
                      <Select
                        label="Language"
                        defaultValue="English"
                        id="user-view-language"
                        labelId="user-view-language-label"
                      >
                        <MenuItem value="English">English</MenuItem>
                        <MenuItem value="Spanish">Spanish</MenuItem>
                        <MenuItem value="Portuguese">Portuguese</MenuItem>
                        <MenuItem value="Russian">Russian</MenuItem>
                        <MenuItem value="French">French</MenuItem>
                        <MenuItem value="German">German</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                      <InputLabel id="user-view-country-label">
                        Country
                      </InputLabel>
                      <Select
                        label="Country"
                        defaultValue="USA"
                        id="user-view-country"
                        labelId="user-view-country-label"
                      >
                        <MenuItem value="USA">USA</MenuItem>
                        <MenuItem value="UK">UK</MenuItem>
                        <MenuItem value="Spain">Spain</MenuItem>
                        <MenuItem value="Russia">Russia</MenuItem>
                        <MenuItem value="France">France</MenuItem>
                        <MenuItem value="Germany">Germany</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <FormControlLabel
                      label="Use as a billing address?"
                      control={<Switch defaultChecked />}
                      sx={{ "& .MuiTypography-root": { fontWeight: 500 } }}
                    />
                  </Grid>
                </Grid>
              </Box>
            </DialogContent>
            <DialogActions sx={{ justifyContent: "center" }}>
              <Button
                variant="contained"
                sx={{ mr: 1 }}
                onClick={handleEditClose}
              >
                Submit
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                onClick={handleEditClose}
              >
                Cancel
              </Button>
            </DialogActions>
          </Dialog> */}

          <SuspendDialog
            open={suspendDialogOpen}
            setOpen={setSuspendDialogOpen}
          />
          <SubscriptionDialog
            open={subscriptionDialogOpen}
            setOpen={setSubscriptionDialogOpen}
          />
        </Card>
      </Grid>
    </Grid>
  )
}

export default UserViewLeft
