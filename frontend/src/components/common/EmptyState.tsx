import { Box, Typography } from "@mui/material"
import { Inventory as PackageIcon } from "@mui/icons-material"
import type React from "react"

interface EmptyStateProps {
  title: string
  description: string
  icon?: React.ComponentType<{ sx?: any }>
}

export function EmptyState({ title, description, icon: Icon = PackageIcon }: EmptyStateProps) {
  return (
    <Box sx={{ textAlign: "center", py: 6 }}>
      <Icon sx={{ fontSize: 48, color: "text.disabled", mb: 2 }} />
      <Typography variant="h6" gutterBottom color="text.primary">
        {title}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {description}
      </Typography>
    </Box>
  )
}
