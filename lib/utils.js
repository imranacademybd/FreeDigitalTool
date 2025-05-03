import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}


// lib/utils.js
export const validateDomain = (domain) => {
  // Match the original PHP fqdn validation
  const fqdnRegex = /^(?=.{1,253}$)(([a-zA-Z0-9-]{1,63}\.)+[a-zA-Z]{2,63})$/;
  return fqdnRegex.test(domain);
};

export const extractHostname = (url) => {
  // Clean URL and extract hostname
  try {
    const cleanedUrl = url.replace(/^(https?:\/\/)?/, '');
    return cleanedUrl.split('/')[0];
  } catch (e) {
    return url;
  }
};

// Optional: Add other utility functions here