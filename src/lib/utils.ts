import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDuration(duration: string) {
  const minutes = Math.floor(Number(duration) / 60 / 1000);
  return `${minutes} mins`;
}

export function formatPrice(price: string) {
  return Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  }).format(Math.floor(Number(price) / 100));
}

export function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}
