// ** React Imports
import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';

// ** MUI Components
import Box from '@mui/material/Box';
import { LoadingButton } from '@mui/lab';
import Divider from '@mui/material/Divider';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import FormControl from '@mui/material/FormControl';
import useMediaQuery from '@mui/material/useMediaQuery';
import OutlinedInput from '@mui/material/OutlinedInput';
import { styled, useTheme } from '@mui/material/styles';
import InputAdornment from '@mui/material/InputAdornment';
import MuiFormControlLabel from '@mui/material/FormControlLabel';
import { Alert, Card, CardContent, FormHelperText } from '@mui/material';

// ** Icon Imports
import Iconify from '@/@core/components/iconify';

// ** Configs
import themeConfig from '@/configs/themeConfig';

// ** Hooks
import useToken from '@/Hooks/useToken';
import { useAuth } from '@/Hooks/useAuth';
import UseBgColor from '@/@core/hooks/useBgColor';
import { useSettings } from '@/@core/hooks/useSettings';

// ** Demo Imports
import FooterIllustrationsV2 from '@/views/pages/auth/FooterIllustrationsV2';
import { Logo } from './logo';

// ** Styled Components
const LoginIllustrationWrapper = styled(Box)(({ theme }) => ({
  padding: theme.spacing(20),
  paddingRight: '0 !important',
  [theme.breakpoints.down('lg')]: {
    padding: theme.spacing(10),
  },
}));

const LoginIllustration = styled('img')(({ theme }) => ({
  maxWidth: '44rem',
  [theme.breakpoints.down('xl')]: {
    maxWidth: '38rem',
  },
  [theme.breakpoints.down('lg')]: {
    maxWidth: '30rem',
  },
}));

const RightWrapper = styled(Box)(({ theme }) => ({
  width: '100%',
  [theme.breakpoints.up('md')]: {
    maxWidth: 400,
  },
  [theme.breakpoints.up('lg')]: {
    maxWidth: 450,
  },
}));

const BoxWrapper = styled(Box)(({ theme }) => ({
  width: '100%',
  alignItems: 'end',
  [theme.breakpoints.down('md')]: {
    maxWidth: 400,
  },
}));

const TypographyStyled = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  letterSpacing: '0.18px',
  marginBottom: theme.spacing(1.5),
  [theme.breakpoints.down('md')]: { marginTop: theme.spacing(8) },
}));

const FormControlLabel = styled(MuiFormControlLabel)(({ theme }) => ({
  '& .MuiFormControlLabel-label': {
    fontSize: '0.875rem',
    color: theme.palette.text.secondary,
  },
}));
const defaultValues = {
  password: 'Ixtiyor0919$%',
  email: 'ixtiyor0919@gmail.com',
};
const LoginV2 = () => {
  const [rememberMe, setRememberMe] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  // ** Hooks
  const auth = useAuth();
  const theme = useTheme();
  const { token } = useToken();
  const bgColors = UseBgColor();
  const { settings } = useSettings();
  const loading = auth.loading;
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues,
    mode: 'onBlur',
    // resolver: yupResolver(loginChema),
  });

  const onSubmit = (data) => {
    const { email, password } = data;
    auth.login({ email, password, rememberMe });
  };

  // React.useEffect(() => {
  //   if (token) {
  //     return <Navigate to='/' replace />;
  //   }
  // }, [token]);
  // ** Vars
  const { skin } = settings;
  const hidden = useMediaQuery(theme.breakpoints.down('md'));

  const imageSource =
    skin === 'bordered' ? 'auth-v2-login-illustration-bordered' : 'auth-v2-login-illustration';

  return (
    <Box sx={{height: '100vh', overflow: 'hidden'}} className="content-right">
      {!hidden ? (
        <Box
          sx={{
            flex: 1,
            display: 'flex',
            position: 'relative',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <LoginIllustrationWrapper>
            <LoginIllustration
              alt="login-illustration"
              src={`/images/pages/${imageSource}-${theme.palette.mode}.png`}
            />
          </LoginIllustrationWrapper>
          <FooterIllustrationsV2 />
        </Box>
      ) : null}
      <RightWrapper
        sx={
          skin === 'bordered' && !hidden ? { borderLeft: `1px solid ${theme.palette.divider}` } : {}
        }
      >
        <Box
          sx={{
            p: 7,
            height: '100%',
            display: 'flex',
            alignItems: 'end',
            justifyContent: 'center',
            backgroundColor: !hidden && 'background.paper',
          }}
        >
          <BoxWrapper>
            <Box
              sx={{
                top: 30,
                left: 40,
                display: 'flex',
                position: 'absolute',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {!hidden && <Logo />}
            </Box>
            <Card sx={{ zIndex: 1 }}>
              <CardContent sx={{  p:  (theme) => hidden && `${theme.spacing(6, 7, 6.5)} !important` }}>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  {hidden && <Logo />}
                </Box>
                <Box sx={{ mb: 6 }}>
                  <TypographyStyled variant="h5">{`Welcome to ${themeConfig.templateName}! 👋🏻`}</TypographyStyled>
                  <Typography variant="body2">
                    Please sign-in to your account and start the adventure
                  </Typography>
                </Box>
                <Alert
                  icon={false}
                  sx={{
                    py: 3,
                    mb: 6,
                    ...bgColors.primaryLight,
                    '& .MuiAlert-message': { p: 0 },
                  }}
                >
                  <Typography variant="caption" sx={{ display: 'block', color: 'primary.main' }}>
                    SuperAdmin: <strong>ixtiyor0919@gmail.com</strong> / Pass:{' '}
                    <strong>ixtiyor0919</strong>
                  </Typography>
                </Alert>
                <Box
                  noValidate
                  component="form"
                  autoComplete="off"
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
                      <FormHelperText sx={{ color: 'error.main' }}>
                        {errors.email.message}
                      </FormHelperText>
                    )}
                  </FormControl>
                  <FormControl fullWidth>
                    <InputLabel htmlFor="auth-login-v2-password" error={Boolean(errors.password)}>
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
                          type={showPassword ? 'text' : 'password'}
                          endAdornment={
                            <InputAdornment position="end">
                              <IconButton
                                edge="end"
                                onMouseDown={(e) => e.preventDefault()}
                                onClick={() => setShowPassword(!showPassword)}
                              >
                                <Iconify
                                  icon={showPassword ? 'mdi:eye-outline' : 'mdi:eye-off-outline'}
                                  fontSize={20}
                                />
                              </IconButton>
                            </InputAdornment>
                          }
                        />
                      )}
                    />
                    {errors.password && (
                      <FormHelperText sx={{ color: 'error.main' }} id="">
                        {errors.password.message}
                      </FormHelperText>
                    )}
                  </FormControl>
                  <Box
                    sx={{
                      mb: 4,
                      display: 'flex',
                      alignItems: 'center',
                      flexWrap: 'wrap',
                      justifyContent: 'space-between',
                    }}
                  >
                    <FormControlLabel
                      label="Remember Me"
                      control={<Checkbox />}
                      checked={rememberMe}
                      sx={{
                        '& .MuiFormControlLabel-label': { color: 'text.primary' },
                      }}
                      onChange={(e) => setRememberMe(e.target.checked)}
                    />
                    <Typography
                      variant="body2"
                      component={Link}
                      to="/auth/forgot-password-v1"
                      sx={{ color: 'primary.main', textDecoration: 'none' }}
                    >
                      Forgot Password?
                    </Typography>
                  </Box>
                  <LoadingButton
                    loading={loading}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                    sx={{ mb: 7 }}
                  >
                    Login
                  </LoadingButton>
                  {/* <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
                <Typography sx={{ mr: 2, color: 'text.secondary' }}>New on our platform?</Typography>
                <Typography
                  component={Link}
                  to='/pages/auth/register-v1'
                  sx={{ color: 'primary.main', textDecoration: 'none' }}
                >
                  Create an account
                </Typography>
              </Box> */}
                  <Divider
                    sx={{
                      '& .MuiDivider-wrapper': { px: 4 },
                      // mt: theme => `${theme.spacing(5)} !important`,
                      mb: (theme) => `${theme.spacing(7.5)} !important`,
                    }}
                  >
                    or
                  </Divider>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <IconButton
                      to="/"
                      component={Link}
                      sx={{ color: '#497ce2' }}
                      onClick={(e) => e.preventDefault()}
                    >
                      <Iconify icon="mdi:facebook" />
                    </IconButton>
                    <IconButton
                      to="/"
                      component={Link}
                      sx={{ color: '#1da1f2' }}
                      onClick={(e) => e.preventDefault()}
                    >
                      <Iconify icon="mdi:twitter" />
                    </IconButton>
                    <IconButton
                      to="/"
                      component={Link}
                      onClick={(e) => e.preventDefault()}
                      sx={{
                        color: (theme) => (theme.palette.mode === 'light' ? '#272727' : 'grey.300'),
                      }}
                    >
                      <Iconify icon="mdi:github" />
                    </IconButton>
                    <IconButton
                      to="/"
                      component={Link}
                      sx={{ color: '#db4437' }}
                      onClick={(e) => e.preventDefault()}
                    >
                      <Iconify icon="mdi:google" />
                    </IconButton>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </BoxWrapper>
        </Box>
      </RightWrapper>
    </Box>
  );
};

export default LoginV2;
