// ** MUI Imports
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";
import CardHeader from "@mui/material/CardHeader";
import AlertTitle from "@mui/material/AlertTitle";
import InputLabel from "@mui/material/InputLabel";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import LoadingButton from "@mui/lab/LoadingButton";
import CardContent from "@mui/material/CardContent";
import FormControl from "@mui/material/FormControl";
import DialogTitle from "@mui/material/DialogTitle";
import OutlinedInput from "@mui/material/OutlinedInput";
import DialogContent from "@mui/material/DialogContent";
import InputAdornment from "@mui/material/InputAdornment";
import FormHelperText from "@mui/material/FormHelperText";
// yup import
import * as yup from "yup"
// ** React Imports
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
// ** components Imports
import Iconify from "@core/components/iconify";
// utils import
import { PWD_REGEX } from "Utils/validators";
import { showErrors } from "Utils/showErrors";

const Security = ({accountData}) => {
  const dispatch = useDispatch()
  // ** States
  const [showPassword, setShowPassword] = React.useState(false)
  const [values, setValues] = React.useState({
    mobile: "+1(968) 819-2547",
  })
  // ** States
  const [defaultValues, setDefaultValues] = useState({ mobile: '+1(968) 819-2547' })
  const [mobileNumber, setMobileNumber] = useState(defaultValues.mobile)
  const [openEditMobileNumber, setOpenEditMobileNumber] = useState(false)
  const { authData, loading } = useSelector((state) => state.authReducer)

  const initialValues = {
    newPassword: "",
    showNewPassword: false,
    confirmNewPassword: "",
    showConfirmNewPassword: false,
  }
  const schema = yup.object().shape({
    password: yup
    .string()
    .required()
    .matches(PWD_REGEX, "You entered the wrong password!")
    .min(8, (obj) => showErrors("Password", obj.value.length, obj.min))
  })
  // ** Hook
  const {
    reset,
    control,
    handleSubmit,
    formState,
    formState: { errors },
  } = useForm({
    defaultValues: accountData,
    mode: "onBlur",
    resolver: yupResolver(schema),
  })

  const onSubmit = async (value) => {
    try {
      dispatch({ type: "AUTH_UPDATING_START" });
      const findData = authData.find((item) => item.id === accountData.id);
      const updatedData = {
        ...findData,
        password: value.password,
      };
      await toast.promise(
        new Promise((resolve) => {
          setTimeout(() => {
            resolve();
          }, 2000);
        }),
        {
          loading: "Sending...",
          success: "Sent!",
          error: "There was an error sending"
        }
      );
      dispatch({ type: "AUTH_UPDATING_SUCCESS", data: updatedData });
      dispatch({ type: "ADMIN_UPDATING_SUCCESS", data: updatedData });
      reset({ something: '' });
    } catch (error) {
      toast.error("There was an error sending");
      dispatch({ type: "AUTH_UPDATING_ERROR" });
    }
  };

  React.useEffect(() => {
    if (formState.isSubmitSuccessful) {
      reset({ something: '' });
    }
  }, [formState, reset]);

  const handleNewPasswordChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value })
  }

  const handleClickShowNewPassword = () => {
    setValues({ ...values, showNewPassword: !values.showNewPassword })
  }

  const handleMouseDownNewPassword = (event) => {
    event.preventDefault()
  }

  // Handle Confirm Password
  // const handleConfirmNewPasswordChange = (prop) => (event) => {
  //   setValues({ ...values, [prop]: event.target.value })
  // }

  // const handleClickShowConfirmNewPassword = () => {
  //   setValues({
  //     ...values,
  //     showConfirmNewPassword: !values.showConfirmNewPassword,
  //   })
  // }

  const handleMouseDownPassword = (event) => {
    event.preventDefault()
  }

  // Handle edit mobile number dialog
  const handleEditMobileNumberClickOpen = () => setOpenEditMobileNumber(true)
  const handleEditMobileNumberClose = () => setOpenEditMobileNumber(false)

  // Handle button click inside the dialog
  const handleCancelClick = () => {
    setMobileNumber(defaultValues.mobile)
    handleEditMobileNumberClose()
  }

  const handleSubmitClick = () => {
    setDefaultValues({ ...defaultValues, mobile: mobileNumber })
    handleEditMobileNumberClose()
  }

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardHeader title="Enter Password" />
          <CardContent>
            <Alert icon={false} severity="warning" sx={{ mb: 6 }}>
              <AlertTitle
                sx={{
                  fontWeight: 600,
                  mb: (theme) => `${theme.spacing(1)} !important`,
                }}
              >
                Ensure that these requirements are met
              </AlertTitle>
              Minimum 8 characters long, uppercase & symbol
            </Alert>

            <Box component="form" autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
              <Grid container spacing={6}>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel
                      htmlFor="validation-async-password"
                      error={Boolean(errors.password)}
                    >
                      Password
                    </InputLabel>
                    <Controller
                      name="password"
                      control={control}
                      rules={{ required: true }}
                      render={({ field: { value, onChange } }) => (
                        <OutlinedInput
                          value={value}
                          label="Password"
                          onChange={onChange}
                          placeholder="********"
                          id="validation-async-password"
                          error={Boolean(errors.password)}
                          type={showPassword ? "text" : "password"}
                          endAdornment={
                            <InputAdornment position="end">
                              <IconButton
                                edge="end"
                                onClick={() => setShowPassword(!showPassword)}
                                onMouseDown={handleMouseDownPassword}
                                aria-label="toggle password visibility"
                              >
                                <Iconify
                                  icon={
                                    showPassword
                                      ? "mdi:eye-outline"
                                      : "mdi:eye-off-outline"
                                  }
                                />
                              </IconButton>
                            </InputAdornment>
                          }
                        />
                      )}
                    />
                    {errors.password && (
                      <FormHelperText
                        sx={{ color: "error.main" }}
                        id="validation-async-password"
                      >
                        {errors.password.message}
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>

                <Grid item xs={12}>
                  <LoadingButton loading={loading} type="submit" variant="contained">
                    Create Password
                  </LoadingButton>
                </Grid>
              </Grid>
            </Box>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12}>
        <Card>
          <CardHeader
            title="Two-step verification"
            titleTypographyProps={{ sx: { mb: 1 } }}
            subheader="Keep your account secure with authentication step."
          />
          <CardContent>
            <Typography sx={{ fontWeight: 500, fontSize: "0.875rem" }}>
              SMS
            </Typography>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Typography variant="body2">{mobileNumber}</Typography>
              <div>
                <IconButton
                  aria-label="edit"
                  sx={{ color: "text.secondary" }}
                  onClick={handleEditMobileNumberClickOpen}
                >
                  <Iconify icon="mdi:square-edit-outline" fontSize="1.25rem" />
                </IconButton>
                <IconButton
                  aria-label="delete"
                  sx={{ color: "text.secondary" }}
                >
                  <Iconify icon="mdi:delete-outline" fontSize="1.25rem" />
                </IconButton>
              </div>
            </Box>

            <Divider
              sx={{
                mt: "0 !important",
                mb: (theme) => `${theme.spacing(4)} !important`,
              }}
            />

            <Typography variant="body2">
              Two-factor authentication adds an additional layer of security to
              your account by requiring more than just a password to log in.{" "}
              <Link href="/" onClick={(e) => e.preventDefault()}>
                Learn more
              </Link>
              .
            </Typography>
          </CardContent>

          <Dialog
            open={openEditMobileNumber}
            onClose={handleCancelClick}
            aria-labelledby="user-view-security-edit-mobile-number"
            sx={{
              "& .MuiPaper-root": { width: "100%", maxWidth: 650, p: [2, 10] },
            }}
            aria-describedby="user-view-security-edit-mobile-number-description"
          >
            <DialogTitle
              id="user-view-security-edit-mobile-number"
              sx={{ textAlign: "center", fontSize: "1.5rem !important" }}
            >
              Enable One Time Password
            </DialogTitle>

            <DialogContent>
              <Typography variant="h6">
                Verify Your Mobile Number for SMS
              </Typography>
              <Typography variant="body2" sx={{ mt: 2, mb: 5 }}>
                Enter your mobile phone number with country code and we will
                send you a verification code.
              </Typography>
              <form onSubmit={(e) => e.preventDefault()}>
                <TextField
                  autoFocus
                  fullWidth
                  value={mobileNumber}
                  label="Mobile number with country code"
                  onChange={(e) => setMobileNumber(e.target.value)}
                />
                <Box
                  sx={{ mt: 6.5, display: "flex", justifyContent: "flex-end" }}
                >
                  <Button
                    type="reset"
                    color="secondary"
                    variant="outlined"
                    onClick={handleCancelClick}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    sx={{ ml: 3 }}
                    variant="contained"
                    onClick={handleSubmitClick}
                  >
                    Send
                  </Button>
                </Box>
              </form>
            </DialogContent>
          </Dialog>
        </Card>
      </Grid>
    </Grid>
  )
}

export default Security
