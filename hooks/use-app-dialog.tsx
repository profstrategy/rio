// Alternative useAppDialog.js
import AppDialogBox from '@/components/reusables/alert-dialog'
import React, { useState } from 'react'

export const useAppDialog = () => {
  const [showWhitePaper, setShowWhitePaper] = useState(false)

  const openDialog = () => setShowWhitePaper(true)
  const closeDialog = () => setShowWhitePaper(false)

  return { 
    showWhitePaper,
    openDialog,
    closeDialog,
    // Return props for the dialog
    dialogProps: {
      open: showWhitePaper,
      title: 'Your White Paper',
      confirmText: 'Agreed',
      cancelText: 'Cancel',
      onOpenChange: closeDialog,
      description: 'This Feature will be back soon!!!'
    }
  }
}