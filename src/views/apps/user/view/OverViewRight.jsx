// ** React Imports
import { useState, useEffect } from "react"

// ** MUI Imports
import Box from "@mui/material/Box"
import TabList from "@mui/lab/TabList"
import TabPanel from "@mui/lab/TabPanel"
import TabContext from "@mui/lab/TabContext"
import { styled } from "@mui/material/styles"
import Typography from "@mui/material/Typography"
import MuiTab from "@mui/material/Tab"
import CircularProgress from "@mui/material/CircularProgress"

// ** Iconify Imports
import Iconify from "Components/Iconify"

// ** Demo Components Imports
import Overview from "./Overview"
import Security from "./Security"
import ProjectListTable from "./ProjectListTable"

// ** Styled Tab component
const Tab = styled(MuiTab)(({ theme }) => ({
  minHeight: 48,
  flexDirection: "row",
  "& svg": {
    marginBottom: "0 !important",
    marginRight: theme.spacing(1),
  },
}))

const OverViewRight = ({ tableData }) => {
  const { profile, allData, tableCell } = tableData
  // ** State
  const [activeTab, setActiveTab] = useState("overview")
  const [isLoading, setIsLoading] = useState(true)
  const handleChange = (event, value) => {
    setIsLoading(true)
    setActiveTab(value)
    setIsLoading(false)
  }
  useEffect(() => {
    if (allData) {
      setIsLoading(false)
    }
  }, [allData])
  return (
    <TabContext value={activeTab}>
      <TabList
        variant="scrollable"
        scrollButtons="auto"
        onChange={handleChange}
        aria-label="forced scroll tabs example"
        sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
      >
        <Tab
          value="overview"
          label="Overview"
          icon={<Iconify icon="mdi:account-outline" />}
        />
        {tableCell?.staff && (
          <Tab
            value="security"
            label="Security"
            icon={<Iconify icon="mdi:lock-outline" />}
          />
        )}
      </TabList>
      <Box sx={{ mt: 6 }}>
        {isLoading ? (
          <Box
            sx={{
              mt: 6,
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <CircularProgress sx={{ mb: 4 }} />
            <Typography>Loading...</Typography>
          </Box>
        ) : (
          <>
            {tableCell?.staff ? (
              <>
                <TabPanel sx={{ p: 0 }} value="overview">
                  <Overview data={allData} />
                </TabPanel>
                <TabPanel sx={{ p: 0 }} value="security">
                  <Security accountData={profile} />
                </TabPanel>
              </>
            ) : (
              <TabPanel sx={{ p: 0 }} value="overview">
                <ProjectListTable />
              </TabPanel>
            )}
          </>
        )}
      </Box>
    </TabContext>
  )
}

export default OverViewRight
