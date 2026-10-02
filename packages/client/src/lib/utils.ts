import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge Tailwind classes with conflict resolution.
 * Later classes win — perfect for component variants + overrides.
 *
 * @example
 *   cn("px-4 py-2", "px-6")         // → "py-2 px-6"
 *   cn("bg-red-500", isActive && "bg-green-500")
 *   cn(base, variant, size, className)
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}