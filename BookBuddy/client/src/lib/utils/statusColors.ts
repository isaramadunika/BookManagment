import { ReadingStatusType } from "@shared/schema";

// Get background color class based on reading status
export function getStatusBgColor(status: string): string {
  switch (status) {
    case "reading":
      return "bg-yellow-400";
    case "completed":
      return "bg-green-400";
    case "want-to-read":
      return "bg-blue-400";
    case "dnf":
      return "bg-red-400";
    default:
      return "bg-gray-400";
  }
}

// Get text color class based on reading status
export function getStatusTextColor(status: string): string {
  switch (status) {
    case "reading":
      return "text-yellow-800";
    case "completed":
      return "text-green-800";
    case "want-to-read":
      return "text-blue-800";
    case "dnf":
      return "text-red-800";
    default:
      return "text-gray-800";
  }
}
