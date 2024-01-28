// ** React Imports
import React, { useState } from 'react'
import { Link, Navigate } from 'react-router-dom'

// ** MUI Components
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import Checkbox from '@mui/material/Checkbox'
import TextField from '@mui/material/TextField'
import InputLabel from '@mui/material/InputLabel'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
import { styled, useTheme } from '@mui/material/styles'
import MuiCard from '@mui/material/Card'
import InputAdornment from '@mui/material/InputAdornment'
import MuiFormControlLabel from '@mui/material/FormControlLabel'
import { Alert, FormHelperText } from '@mui/material'

// ** Icon Imports
import Iconify from 'Components/Iconify'

// ** Configs
import themeConfig from 'configs/themeConfig'

// ** Layout Import
import BlankLayout from '@core/layouts/BlankLayout'

// ** Demo Imports
import FooterIllustrationsV1 from 'views/pages/auth/FooterIllustrationsV1'
import { LoadingButton } from '@mui/lab'
import UseBgColor from '@core/hooks/useBgColor'
import { useSelector } from 'react-redux'
import { useAuth } from 'Hooks/useAuth'
// ** Third Party Imports
import * as yup from "yup"
import { useForm, Controller } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
// ** Utils Import
import { showErrors } from 'Utils/showErrors'
import { EMAIL_REGEX, PWD_REGEX } from 'Utils/validators'
import useToken from 'Hooks/UseToken'

// ** Styled Components
const Card = styled(MuiCard)(({ theme }) => ({
  [theme.breakpoints.up('sm')]: { width: 450 }
}))

const FormControlLabel = styled(MuiFormControlLabel)(({ theme }) => ({
  '& .MuiFormControlLabel-label': {
    fontSize: '0.875rem',
    color: theme.palette.text.secondary
  }
}))
const schema = yup.object().shape({
  email: yup
    .string()
    .email()
    .required()
    .matches(EMAIL_REGEX, "You have entered an incorrect email!"),
  password: yup
    .string()
    .required()
    .matches(PWD_REGEX, "You entered the wrong password!")
    .min(8, (obj) => showErrors("Password", obj.value.length, obj.min))
})

const defaultValues = {
  password: "Ixtiyor0919$%",
  email: "ixtiyor0919@gmail.com",
}

const LoginV1 = () => {
  // ** State
  const [rememberMe, setRememberMe] = useState(true)
  const [showPassword, setShowPassword] = useState(false)

  // ** Hooks
   const auth = useAuth()
   const theme = useTheme()
   const { token } = useToken()
   const bgColors = UseBgColor()
   const { loading } = useSelector((state) => state.authReducer)

   const {
    control,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues,
    mode: "onBlur",
    resolver: yupResolver(schema),
  })

  const onSubmit = (data) => {
    const { email, password } = data
    auth.login({ email, password, rememberMe }, () => {
      setError("email", {
        type: "manual",
        message: "Email or Password is invalid",
      })
    })
  }
  
  return (
    <Box className='content-center'>
      <Card sx={{ zIndex: 1 }}>
        <CardContent sx={{ p: theme => `${theme.spacing(13, 7, 6.5)} !important` }}>
          <Box sx={{ mb: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width={47} fill='none' height={26} viewBox='0 0 268 150' xmlns='http://www.w3.org/2000/svg'>
              <rect
                rx='25.1443'
                width='50.2886'
                height='143.953'
                fill={theme.palette.primary.main}
                transform='matrix(-0.865206 0.501417 0.498585 0.866841 195.571 0)'
              />
              <rect
                rx='25.1443'
                width='50.2886'
                height='143.953'
                fillOpacity='0.4'
                fill='url(#paint0_linear_7821_79167)'
                transform='matrix(-0.865206 0.501417 0.498585 0.866841 196.084 0)'
              />
              <rect
                rx='25.1443'
                width='50.2886'
                height='143.953'
                fill={theme.palette.primary.main}
                transform='matrix(0.865206 0.501417 -0.498585 0.866841 173.147 0)'
              />
              <rect
                rx='25.1443'
                width='50.2886'
                height='143.953'
                fill={theme.palette.primary.main}
                transform='matrix(-0.865206 0.501417 0.498585 0.866841 94.1973 0)'
              />
              <rect
                rx='25.1443'
                width='50.2886'
                height='143.953'
                fillOpacity='0.4'
                fill='url(#paint1_linear_7821_79167)'
                transform='matrix(-0.865206 0.501417 0.498585 0.866841 94.1973 0)'
              />
              <rect
                rx='25.1443'
                width='50.2886'
                height='143.953'
                fill={theme.palette.primary.main}
                transform='matrix(0.865206 0.501417 -0.498585 0.866841 71.7728 0)'
              />
              <defs>
                <linearGradient
                  y1='0'
                  x1='25.1443'
                  x2='25.1443'
                  y2='143.953'
                  id='paint0_linear_7821_79167'
                  gradientUnits='userSpaceOnUse'
                >
                  <stop />
                  <stop offset='1' stopOpacity='0' />
                </linearGradient>
                <linearGradient
                  y1='0'
                  x1='25.1443'
                  x2='25.1443'
                  y2='143.953'
                  id='paint1_linear_7821_79167'
                  gradientUnits='userSpaceOnUse'
                >
                  <stop />
                  <stop offset='1' stopOpacity='0' />
                </linearGradient>
              </defs>
            </svg>
            <Typography variant='h6' sx={{ ml: 2, lineHeight: 1, fontWeight: 700, fontSize: '1.5rem !important' }}>
              {themeConfig.templateName}
            </Typography>
          </Box>
          <Box sx={{ mb: 6 }}>
            <Typography variant='h5' sx={{ mb: 1.5, fontWeight: 600, letterSpacing: '0.18px' }}>
              {`Welcome to ${themeConfig.templateName}! 👋🏻`}
            </Typography>
            <Typography variant='body2'>Please sign-in to your account and start the adventure</Typography>
          </Box>
          <Alert
              icon={false}
              sx={{
                py: 3,
                mb: 6,
                ...bgColors.primaryLight,
                "& .MuiAlert-message": { p: 0 },
              }}
            >
              <Typography
                variant="caption"
                sx={{ display: "block", color: "primary.main" }}
              >
                SuperAdmin: <strong>ixtiyor0919@gmail.com</strong> / Pass:{" "}
                <strong>ixtiyor0919</strong>
              </Typography>
          </Alert>
          <Box
            component="form" 
            noValidate 
            autoComplete='off' 
            onSubmit={handleSubmit(onSubmit)}
          >
           <FormControl fullWidth sx={{ mb: 4 }}>
              <Controller
                name="email"
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange, onBlur } }) => (
                  <TextField
                    autoFocus
                    type="email"
                    label="Email"
                    value={value}
                    onBlur={onBlur}
                    onChange={onChange}
                    error={Boolean(errors.email)}
                    placeholder="admin@materialize.com"
                  />
                )}
              />
              {errors.email && (
                <FormHelperText sx={{ color: "error.main" }}>
                  {errors.email.message}
                </FormHelperText>
              )}
              </FormControl>
              <FormControl fullWidth>
                <InputLabel
                  htmlFor="auth-login-v2-password"
                  error={Boolean(errors.password)}
                >
                  Password
                </InputLabel>
                <Controller
                  name="password"
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange, onBlur } }) => (
                    <OutlinedInput
                      value={value}
                      onBlur={onBlur}
                      label="Password"
                      onChange={onChange}
                      id="auth-login-v2-password"
                      error={Boolean(errors.password)}
                      placeholder="********"
                      type={showPassword ? "text" : "password"}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            edge="end"
                            onMouseDown={(e) => e.preventDefault()}
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            <Iconify
                              icon={
                                showPassword
                                  ? "mdi:eye-outline"
                                  : "mdi:eye-off-outline"
                              }
                              fontSize={20}
                            />
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                  )}
                />
                {errors.password && (
                  <FormHelperText sx={{ color: "error.main" }} id="">
                    {errors.password.message}
                  </FormHelperText>
                )}
              </FormControl>
            <Box
              sx={{ mb: 4, display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'space-between' }}
            >
              <FormControlLabel
                label='Remember Me'
                control={<Checkbox />}
                checked={rememberMe}
                sx={{ '& .MuiFormControlLabel-label': { color: 'text.primary' } }}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <Typography
                variant='body2'
                component={Link}
                to='/auth/forgot-password-v1'
                sx={{ color: 'primary.main', textDecoration: 'none' }}
              >
                Forgot Password?
              </Typography>
            </Box>
            <LoadingButton
              loading={loading} 
              fullWidth 
              size='large' 
              type='submit' 
              variant='contained' 
              sx={{ mb: 7 }}
            >
              Login
            </LoadingButton>
            <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
              <Typography sx={{ mr: 2, color: 'text.secondary' }}>New on our platform?</Typography>
              <Typography
                component={Link}
                to='/auth/register-v1'
                sx={{ color: 'primary.main', textDecoration: 'none' }}
              >
                Create an account
              </Typography>
            </Box>
            <Divider
              sx={{
                '& .MuiDivider-wrapper': { px: 4 },
                mt: theme => `${theme.spacing(5)} !important`,
                mb: theme => `${theme.spacing(7.5)} !important`
              }}
            >
              or
            </Divider>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <IconButton to='/' component={Link} sx={{ color: '#497ce2' }} onClick={e => e.preventDefault()}>
                <Iconify icon='mdi:facebook' />
              </IconButton>
              <IconButton to='/' component={Link} sx={{ color: '#1da1f2' }} onClick={e => e.preventDefault()}>
                <Iconify icon='mdi:twitter' />
              </IconButton>
              <IconButton
                to='/'
                component={Link}
                onClick={e => e.preventDefault()}
                sx={{ color: theme => (theme.palette.mode === 'light' ? '#272727' : 'grey.300') }}
              >
                <Iconify icon='mdi:github' />
              </IconButton>
              <IconButton to='/' component={Link} sx={{ color: '#db4437' }} onClick={e => e.preventDefault()}>
                <Iconify icon='mdi:google' />
              </IconButton>
            </Box>
          </Box>
        </CardContent>
      </Card>
      <FooterIllustrationsV1 />
    </Box>
  )
}

export default LoginV1
