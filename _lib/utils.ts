import clsx from "clsx";
import { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs:ClassValue[]) => {
return twMerge(clsx(...inputs));
}

/**
 * Utility functions for parsing and cleaning data
 */

/**
 * Cleans an email address by trimming whitespace and converting to lowercase
 * @param name The name to clean
 * @returns The cleaned name
 */

export const cleanName = (name:string): string => {
    if(!name) return ''
    return name.trim().toLowerCase()

}

/**
 * Calculate the start time based on the activity window
 * @param window - The time window ('24h', '3d', '7d')
 * @returns ISO string of the start time
 */
// export function getStartTime(window: ActivityWindow): string {
//   const now = new Date()
  
//   switch (window) {
//     case '24h':
//       // 24 hours ago
//       return new Date(now.getTime() - 24 * 60 * 60 * 1000).toISOString()
    
//     case '3d':
//       // 3 days ago
//       return new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000).toISOString()
    
//     case '7d':
//       // 7 days ago
//       return new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString()
    
//     default:
//       return now.toISOString()
//   }
// }

/**
 * Format activity type for display
 */
export function formatActivityType(type: string): string {
  return type.charAt(0) + type.slice(1).toLowerCase()
}

/**
 * Format date for display
 */
export function formatActivityDate(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date
  return d.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}