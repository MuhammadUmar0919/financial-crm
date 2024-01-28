// ** MUI Imports
import Grid from "@mui/material/Grid"
import { useSelector } from "react-redux"

// ** Demo Components Imports
import OverViewLeft from "./OverViewLeft"
import OverViewRight from "./OverViewRight"

const OverViewPage = () => {
  const { viewData } = useSelector((state) => state.viewReducer)

  return (
    viewData && (
      <Grid container spacing={6}>
        <Grid item xs={12} md={5} lg={4}>
          <OverViewLeft tableData={viewData} />
        </Grid>
        <Grid item xs={12} md={7} lg={8}>
          <OverViewRight tableData={viewData} />
        </Grid>
      </Grid>
    )
  )
}

export default OverViewPage
