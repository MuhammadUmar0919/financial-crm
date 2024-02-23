// ** MUI Components
import Button from "@mui/material/Button"
import { styled } from "@mui/material/styles"
import Typography from "@mui/material/Typography"
import Box from "@mui/material/Box"
import { LoadingButton } from "@mui/lab"

// ** Demo Imports
import FooterIllustrations from "@/views/pages/misc/FooterIllustrations"
import React from "react"
import toast from "react-hot-toast"
import Iconify from "@/@core/components/iconify"
import { Link } from "@mui/material"
import { useOnlineStatus } from "@/Hooks/useOnlineStatus"
import shape from "@/Assets/template/images/pages/misc404.png"
import illustration from "@/Assets/template/images/pages/Ills404.png"

// ** Styled Components
const BoxWrapper = styled(Box)(({ theme }) => ({
  [theme.breakpoints.down("md")]: {
    width: "90vw",
  },
}))

const Img = styled("img")(({ theme }) => ({
  height: "30rem",
  marginTop: theme.spacing(10),
  marginBottom: theme.spacing(10),
  [theme.breakpoints.down("lg")]: {
    height: 450,
    marginTop: theme.spacing(10),
    marginBottom: theme.spacing(10),
  },
  [theme.breakpoints.down("md")]: {
    height: 400,
  },
}))

const NoNetwork = () => {
  const { isOnline: isNeetwork } = useOnlineStatus();

  React.useEffect(() => {
    toast.error("You're offline now!", {
      icon: <Iconify icon="mdi:wifi-off" />,
    })
  }, [isNeetwork])

  return (
    <Box className="content-center">
      <Box
        sx={{
          p: 5,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <BoxWrapper>
          <Typography
            variant="h5"
            sx={{
              mb: 2.5,
              letterSpacing: "0.18px",
              fontSize: "1.5rem !important",
            }}
          >
            No Internet Connection <Iconify icon="mdi:wifi-alert" />
          </Typography>
          <Typography variant="body2">
            Check your Internet Connection or your network.
          </Typography>
        </BoxWrapper>
        <Img alt="error-illustration" src={illustration} />
        <Button href="/" component={Link} variant="contained" sx={{ px: 5.5 }}>
          Try again
        </Button>
        <LoadingButton
          sx={{
            left: 60,
            bottom: 30,
            position: "fixed",
            display: !isNeetwork ? "flex" : "none",
          }}
          loading={!isNeetwork}
          loadingPosition="start"
          startIcon={<Iconify icon="mdi:wifi-off" />}
        >
          Connecting...
        </LoadingButton>
      </Box>
      <FooterIllustrations image={shape} />
    </Box>
  )
}

export default NoNetwork
