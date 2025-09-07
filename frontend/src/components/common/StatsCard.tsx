import { Card, CardContent, Typography, Box, Avatar } from "@mui/material"
import { TrendingUp, TrendingDown } from "@mui/icons-material"
import type React from "react"

interface StatsCardProps {
  title: string
  value: string
  change: string
  trend: "up" | "down"
  icon: React.ComponentType<{ sx?: any }>
  color: string
}

export function StatsCard({ title, value, change, trend, icon: Icon, color }: StatsCardProps) {
  return (
    <Card>
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Box sx={{ flex: 1 }}>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              {title}
            </Typography>
            <Typography variant="h5" component="div" gutterBottom sx={{ fontWeight: 700 }}>
              {value}
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
              {trend === "up" ? (
                <TrendingUp sx={{ fontSize: 16, color: "success.main" }} />
              ) : (
                <TrendingDown sx={{ fontSize: 16, color: "error.main" }} />
              )}
              <Typography
                variant="body2"
                sx={{
                  color: trend === "up" ? "success.main" : "error.main",
                  fontWeight: 500,
                }}
              >
                {change}
              </Typography>
            </Box>
          </Box>
          <Avatar sx={{ bgcolor: "transparent" }}>
            <Icon sx={{ fontSize: 32, color }} />
          </Avatar>
        </Box>
      </CardContent>
    </Card>
  )
}
