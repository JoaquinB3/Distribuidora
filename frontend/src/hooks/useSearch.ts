"use client"

import { useState, useMemo } from "react"

export function useSearch<T>(items: T[], searchFields: (keyof T)[]) {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredItems = useMemo(() => {
    if (!searchTerm) return items

    return items.filter((item) =>
      searchFields.some((field) => {
        const value = item[field]
        return typeof value === "string" && value.toLowerCase().includes(searchTerm.toLowerCase())
      }),
    )
  }, [items, searchTerm, searchFields])

  return {
    searchTerm,
    setSearchTerm,
    filteredItems,
  }
}
