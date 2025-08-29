'use client';

import React from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

interface AppDialogBoxProps {
  trigger?: React.ReactNode;
  title?: string;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  description?: string | React.ReactNode;
  cancelText?: string;
  confirmText?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
  children?: React.ReactNode;
  isLoading?: boolean
}

const AppDialogBox = ({
  trigger = '',
  title = 'Are you absolutely sure?',
  description = 'This action cannot be undone. This will permanently delete your account and remove your data from our servers.',
  cancelText = 'Cancel',
  confirmText = 'Continue',
  onConfirm,
  onCancel,
  open,
  onOpenChange,
  children,
  isLoading
}: AppDialogBoxProps) => {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogTrigger asChild>
        {typeof trigger === 'string' ? <button>{trigger}</button> : trigger}
      </AlertDialogTrigger>
      <AlertDialogContent
        className="bg-white border border-gray-200 rounded-lg shadow-lg"
        style={{ backgroundColor: 'white', padding: '1rem' }}
      >
        <AlertDialogHeader>
          <AlertDialogTitle className="text-gray-900 text-xl font-semibold">
            {title}
          </AlertDialogTitle>
          <AlertDialogDescription className="text-gray-600">
            {description}
          </AlertDialogDescription>
          {children}
        </AlertDialogHeader>
        <AlertDialogFooter>
            <div className='flex gap-2'>
          <AlertDialogCancel
            className="border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors focus:ring-0 focus:ring-offset-0 w-24"
            onClick={onCancel}
            disabled={isLoading}
            style={{
              backgroundColor: 'red',
              borderColor: 'white/50',
              color: 'white',
            }}
          >
            {cancelText}
          </AlertDialogCancel>
          <AlertDialogAction
            className="bg-gray-900 text-white hover:bg-gray-800 transition-colors focus:ring-0 focus:ring-offset-0 w-24"
            style={{ backgroundColor: '#00B4DB', color: 'black' }}
            onClick={onConfirm}
            disabled={isLoading}
          >
            {confirmText}
          </AlertDialogAction>
          </div>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AppDialogBox;
