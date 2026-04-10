import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPercent(value: number) {
  return `${Math.round(value)}%`;
}

export function statusTone(status: string) {
  if (status.toLowerCase().includes("red") || status.toLowerCase().includes("critical") || status.toLowerCase().includes("danger")) {
    return "red";
  }
  if (status.toLowerCase().includes("yellow") || status.toLowerCase().includes("watch") || status.toLowerCase().includes("caution")) {
    return "yellow";
  }
  return "green";
}
