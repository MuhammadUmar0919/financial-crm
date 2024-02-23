// ** React Imports
import { useState } from "react";

// ** react-router
import { Link } from "react-router-dom";

// ** MUI Imports
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Tooltip from "@mui/material/Tooltip";
import { DataGrid } from "@mui/x-data-grid";
import CardHeader from "@mui/material/CardHeader";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";

// ** Custom Component Imports
import Label from "@core/components/label";
import Iconify from "@core/components/iconify";
import { ExportBtn } from "@core/components/export";
import CustomAvatar from "@core/components/mui/avatar";
import OptionsMenu from "@core/components/option-menu";
// change case import
import { sentenceCase } from "change-case";
// utils import
import { statusColors } from "Utils/statusColors";

// ** Vars
const invoiceStatusObj = {
  Sent: { color: "secondary", icon: "mdi:send" },
  Paid: { color: "success", icon: "mdi:check" },
  Draft: { color: "primary", icon: "mdi:content-save-outline" },
  "Partial Payment": { color: "warning", icon: "mdi:chart-pie" },
  "Past Due": { color: "error", icon: "mdi:information-outline" },
  Downloaded: { color: "info", icon: "mdi:arrow-down" },
}

const columns = [
  {
    flex: 0.15,
    minWidth: 100,
    field: "fullName",
    headerName: "Name",
    renderCell: ({ row }) => (
      <Typography variant="body2">{row.fullName}</Typography>
    ),
  },
  {
    flex: 0.15,
    minWidth: 80,
    field: "invoiceStatus",
    renderHeader: () => <Iconify icon="mdi:trending-up" fontSize={20} />,
    renderCell: ({ row }) => {
      const { dueDate, balance, invoiceStatus, roleIcon } = row
      const color = invoiceStatusObj[invoiceStatus]
        ? invoiceStatusObj[invoiceStatus].color
        : "primary"

      return (
        <Tooltip
          title={
            <>
              <Typography
                variant="caption"
                sx={{ color: "common.white", fontWeight: 600 }}
              >
                {invoiceStatus}
              </Typography>
              <br />
              <Typography
                variant="caption"
                sx={{ color: "common.white", fontWeight: 600 }}
              >
                Balance:
              </Typography>{" "}
              {balance}
              <br />
              <Typography
                variant="caption"
                sx={{ color: "common.white", fontWeight: 600 }}
              >
                Due Date:
              </Typography>{" "}
              {dueDate}
            </>
          }
        >
          <CustomAvatar
            skin="light"
            color={color}
            sx={{ width: "1.875rem", height: "1.875rem" }}
          >
            <Iconify icon={roleIcon} fontSize="1rem" />
          </CustomAvatar>
        </Tooltip>
      )
    },
  },
  {
    flex: 0.25,
    minWidth: 90,
    field: "total",
    headerName: "Total",
    renderCell: ({ row }) => (
      <Typography variant="body2">${row.total || 0}</Typography>
    ),
  },
  {
    flex: 0.3,
    minWidth: 120,
    field: "issuedDate",
    headerName: "Issued Date",
    renderCell: ({ row }) => (
      <Typography variant="body2">{row.issuedDate}</Typography>
    ),
  },
  {
    flex: 0.3,
    minWidth: 100,
    field: "email",
    headerName: "Email",
    renderCell: ({ row }) => (
      <Typography variant="body2">{row.email}</Typography>
    ),
  },
  {
    flex: 0.3,
    minWidth: 100,
    field: "status",
    headerName: "Status",
    renderCell: ({ row }) => (
      <Label color={statusColors(row?.status)}>
        {sentenceCase(row?.status ? row?.status : '')}
      </Label>
    ),
  },
  {
    flex: 0.3,
    minWidth: 120,
    field: "region",
    headerName: "Region",
    renderCell: ({ row }) => (
      <Typography variant="body2">{row.region}</Typography>
    ),
  },
  {
    flex: 0.1,
    minWidth: 130,
    sortable: false,
    field: "actions",
    headerName: "Actions",
    renderCell: ({ row }) => (
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Tooltip title="Delete Invoice">
          <IconButton size="small">
            <Iconify icon="mdi:delete-outline" fontSize={20} />
          </IconButton>
        </Tooltip>
        <Tooltip title="View">
          <IconButton
            size="small"
            component={Link}
            href={`/apps/invoice/preview/${row.id}`}
          >
            <Iconify icon="mdi:eye-outline" fontSize={20} />
          </IconButton>
        </Tooltip>
        <OptionsMenu
          iconProps={{ fontSize: 20 }}
          iconButtonProps={{ size: "small" }}
          menuProps={{ sx: { "& .MuiMenuItem-root svg": { mr: 2 } } }}
          options={[
            {
              text: "Download",
              icon: <Iconify icon="mdi:download" fontSize={20} />,
            },
            {
              text: "Edit",
              href: `/apps/invoice/edit/${row.id}`,
              icon: <Iconify icon="mdi:pencil-outline" fontSize={20} />,
            },
            {
              text: "Duplicate",
              icon: <Iconify icon="mdi:content-copy" fontSize={20} />,
            },
          ]}
        />
      </Box>
    ),
  },
]

const ProductsListTable = ({ data }) => {
  // ** State
  const [pageSize, setPageSize] = useState(7)
  const [anchorEl, setAnchorEl] = useState(null)

  // ** Var
  const open = Boolean(anchorEl)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  return (
    <Card>
      <CardHeader
        title="Invoice List"
        sx={{ "& .MuiCardHeader-action": { m: 0 } }}
        action={<ExportBtn data={data} title="contacted" />}
      />
      <DataGrid
        autoHeight
        columns={columns}
        rows={data}
        pageSize={pageSize}
        disableSelectionOnClick
        rowsPerPageOptions={[7, 10, 25, 50]}
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        sx={{ "& .MuiDataGrid-columnHeaders": { borderRadius: 0 } }}
      />
    </Card>
  )
}

export default ProductsListTable
