import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Add 0 to the hour part of the time string if it start with 0
 */
export function addZeroToHour(time: string): string {
  return time.split(':')[0].startsWith('0') ? `0${time}` : time
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
