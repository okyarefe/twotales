import { languageLevel, storyLength } from "@/types";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function getLevelColor(level: languageLevel) {
  switch (level) {
    case "daily":
      return "bg-green-100 text-green-800";
    case "academic":
      return "bg-blue-100 text-blue-800";
    case "formal":
      return "bg-purple-100 text-purple-800";
    case "casual":
      return "bg-yellow-100 text-yellow-800";
    case "technical":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800"; // fallback, though shouldn't happen if type is enforced
  }
}

export function getLanguageColors(lang: string): string {
  const colors: { [key: string]: string } = {
    English: "bg-blue-100 text-blue-800",
    Spanish: "bg-green-100 text-green-800",
    French: "bg-purple-100 text-purple-800",
    German: "bg-orange-100 text-orange-800",
    Italian: "bg-pink-100 text-pink-800",
  };
  return colors[lang] || "bg-gray-100 text-gray-800";
}

export function getStoryLengthColors(length: storyLength): string {
  const colors: Record<storyLength, string> = {
    short: "bg-green-100 text-green-800",
    medium: "bg-yellow-100 text-yellow-800",
    long: "bg-red-100 text-red-800",
  };

  return colors[length] || "bg-gray-100 text-gray-800";
}
