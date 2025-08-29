import clsx from "clsx";
import { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs:ClassValue[]) => {
return twMerge(clsx(...inputs));
<<<<<<< HEAD
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
=======
>>>>>>> bdb8ca02c6618833f1a21f4a84c8239f9c3e814e
}