import React, { useState, useEffect } from "react"
import Card from "@mui/material/Card"
import CardHeader from "@mui/material/CardHeader"
import MenuItem from "@mui/material/MenuItem"
import Select from "@mui/material/Select"
import { fNumber } from "Utils/formatNumber"
import { styled } from "@mui/material"
import Chart from "Components/chart"

const CHART_HEIGHT = 400

const LEGEND_HEIGHT = 72

const StyledChart = styled(Chart)(({ theme }) => ({
  height: CHART_HEIGHT,
  "& .apexcharts-canvas, .apexcharts-inner, svg, foreignObject": {
    height: `100% !important`,
  },
  "& .apexcharts-legend": {
    height: LEGEND_HEIGHT,
    borderTop: `dashed 1px ${theme.palette.divider}`,
    top: `calc(${CHART_HEIGHT - LEGEND_HEIGHT}px) !important`,
  },
}))

const AreaChart = ({ title, subheader, ...other }) => {
  const [selectedInterval, setSelectedInterval] = useState("Daily") // Default interval is set to 'Daily'
  const [categories, setCategories] = useState([
    "Day 1",
    "Day 2",
    "Day 3",
    "Day 4",
    "Day 5",
    "Day 6",
    "Day 7",
  ])

  // Fake data for daily, weekly, monthly, and yearly intervals
  const dailyData = [10, 15, 20, 18, 25, 22, 30] // Daily sold products
  const weeklyData = [50, 55, 60, 58, 65, 62, 70] // Weekly sold products
  const monthlyData = [200, 220, 240, 230, 250, 260, 270] // Monthly sold products
  const yearlyData = [800, 850, 900, 880, 920, 950, 970] // Yearly sold products

  // Data mapping based on selected interval
  const intervalData = {
    Daily: dailyData,
    Weekly: weeklyData,
    Monthly: monthlyData,
    Yearly: yearlyData,
  }

  useEffect(() => {
    // Update categories based on selected interval
    if (selectedInterval === "Weekly") {
      setCategories(["Week 1", "Week 2", "Week 3", "Week 4"])
    } else if (selectedInterval === "Monthly") {
      setCategories(["Month 1", "Month 2", "Month 3", "Month 4"])
    } else if (selectedInterval === "Yearly") {
      setCategories(["Q1", "Q2", "Q3", "Q4"])
    } else {
      setCategories([
        "Day 1",
        "Day 2",
        "Day 3",
        "Day 4",
        "Day 5",
        "Day 6",
        "Day 7",
      ])
    }
  }, [selectedInterval])

  const handleChange = (event) => {
    setSelectedInterval(event.target.value)
  }

  const chartData = {
    options: {
      chart: {
        // sparkline: {
        //   enabled: true,
        // },
      },
      xaxis: {
        categories: categories, // Updated categories based on the selected interval
      },
      colors: ["#008FFB", "#00E396", "#FEB019", "#FF4560"],
      legend: {
        floating: true,
        position: "bottom",
        horizontalAlign: "center",
      },
      dataLabels: {
        enabled: true,
        dropShadow: {
          enabled: false,
        },
      },
      tooltip: {
        fillSeriesColor: false,
        y: {
          formatter: (value) => fNumber(value),
          title: {
            formatter: (seriesName) => `${seriesName}`,
          },
        },
      },
      plotOptions: {
        pie: {
          donut: {
            labels: {
              show: false,
            },
          },
        },
      },
    },
    series: [
      {
        name: selectedInterval,
        data: intervalData[selectedInterval],
      },
    ],
  }

  return (
    <Card {...other} className="area-chart">
      <CardHeader title={title} subheader={subheader} sx={{ mb: 5 }} />
      <div className="interval-select">
        <Select value={selectedInterval} onChange={handleChange}>
          <MenuItem value="Daily">Daily</MenuItem>
          <MenuItem value="Weekly">Weekly</MenuItem>
          <MenuItem value="Monthly">Monthly</MenuItem>
          <MenuItem value="Yearly">Yearly</MenuItem>
        </Select>
      </div>
      <StyledChart
        options={chartData.options}
        series={chartData.series}
        type="area"
        height="400"
      />
    </Card>
  )
}

export default AreaChart
