import Link from "next/link"
import { Box, IconButton, Typography } from "@mui/material"
import { ArrowBack } from "@mui/icons-material"

interface PageHeaderProps {
  title: string
  backUrl?: string
}

export function PageHeader({ title, backUrl = "/" }: PageHeaderProps) {
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 3, pt: 0.5 }}>
      <Link href={backUrl}>
        <IconButton
          sx={{
            bgcolor: "background.paper",
            border: "1px solid",
            borderColor: "divider",
            "&:hover": {
              bgcolor: "grey.50",
            },
          }}
        >
          <ArrowBack />
        </IconButton>
      </Link>
      <Typography variant="h5" component="h1">
        {title}
      </Typography>
    </Box>
  )
}
