"use client"

import { useState, useCallback } from "react"

type AlertType = "error" | "success" | "info" | "warning"

interface AlertState {
  open: boolean
  message: string
  type: AlertType
  title?: string
}

export function useAlertModal() {
  const [alertState, setAlertState] = useState<AlertState>({
    open: false,
    message: "",
    type: "info",
  })

  const showAlert = useCallback((
    message: string,
    type: AlertType = "info",
    title?: string
  ) => {
    setAlertState({
      open: true,
      message,
      type,
      title,
    })
  }, [])

  const hideAlert = useCallback(() => {
    setAlertState((prev) => ({ ...prev, open: false }))
  }, [])

  return {
    alertState,
    showAlert,
    hideAlert,
  }
}
