import { ActivityWindow } from "@/network/types";
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

export const getStartTime = (window:ActivityWindow) => {
    const now = new Date;

    const map = {
        '24h': 1,
        '3d': 3,
        '7d': 7
    };

    now.setUTCDate(now.getUTCDate() - map[window])
    return now.toISOString()
}