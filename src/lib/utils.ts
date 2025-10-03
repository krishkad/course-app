import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { jwtVerify } from "jose";
import { CustomJWTPayload } from "@/types/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function createSlug(sentence: string): string {
  return sentence
    .toLowerCase() // Convert to lowercase
    .trim() // Remove leading/trailing whitespace
    .replace(/[^a-z0-9\s-]/g, "") // Remove special characters (keep letters, numbers, spaces, hyphens)
    .replace(/\s+/g, "-") // Replace spaces (and multiple spaces) with hyphens
    .replace(/-+/g, "-") // Replace multiple hyphens with a single one
    .replace(/^-+|-+$/g, ""); // Remove leading/trailing hyphens
}

const secret = new TextEncoder().encode(process.env.NEXTAUTH_SECRET);

export async function decodeCustomJWT(token: string) {
  try {
    const { payload } = await jwtVerify(token, secret);
    return payload as CustomJWTPayload;
  } catch (err) {
    console.error("Invalid token", err);
    return null;
  }
}

export function decodeJwt(token: string) {
  if (!token) {
    return { header: "", payload: "", signature: "" };
  }
  const [headerB64, payloadB64, signature] = token.split(".");

  if (!headerB64 || !payloadB64) {
    return { header: "", payload: "", signature: "" };
  }

  const base64UrlDecode = (b64Url: string): any => {
    const base64 = b64Url.replace(/-/g, "+").replace(/_/g, "/");
    const padded = base64.padEnd(
      base64.length + ((4 - (base64.length % 4)) % 4),
      "="
    );
    const decoded = atob(padded);
    return JSON.parse(decoded);
  };

  try {
    const header = base64UrlDecode(headerB64);
    const payload = base64UrlDecode(payloadB64);

    return {
      header,
      payload,
      signature,
    };
  } catch (error) {
    return { header: "", payload: "", signature: "" };
  }
}

export function displayRazorpayAmount(amountInPaisa: number) {
  // Check if the input is a valid number
  if (isNaN(amountInPaisa) || amountInPaisa === null) {
    return 0;
  }

  // Convert paisa to INR (divide by 100) and format to 2 decimal places
  const amountInINR = (amountInPaisa / 100).toFixed(2);

  // Return the amount as a float
  return parseFloat(amountInINR);
}
