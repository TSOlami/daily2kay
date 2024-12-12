import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getTimedFilename = (prefix: string, extension: string) => {
  const timestamp = new Date().getTime();
  return `${prefix}-${timestamp}.${extension}`;
};

export function downloadFile(
  url: string,
  options: { filename?: string; target?: string }
) {
  const a = document.createElement("a");
  a.href = url;
  a.download = options.filename || "file";
  if (options.target) {
    a.target = options.target;
  }
  a.style.display = "none";
  document.body.appendChild(a);
  a.click();

  window.URL.revokeObjectURL(url);
  document.body.removeChild(a);
}