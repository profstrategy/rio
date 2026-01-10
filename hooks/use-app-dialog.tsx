import { useState } from 'react'

export const useAppDialog = () => {
  const [showWhitePaper, setShowWhitePaper] = useState(false)

  const openDialog = () => setShowWhitePaper(true)
  const closeDialog = () => setShowWhitePaper(false)

  return { 
    showWhitePaper,
    openDialog,
    closeDialog,
    dialogProps: {
      open: showWhitePaper,
      title: 'User activity dashboard',
      confirmText: 'Agreed',
      cancelText: 'Cancel',
      onOpenChange: closeDialog,
      description: 'This Feature will be back soon!!!'
    }
  }
}