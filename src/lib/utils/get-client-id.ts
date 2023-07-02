import { headers } from "next/headers"

// documentation

/**
 * getClientID
 * @returns {Promise<string>} A promise that resolves to a string that is the hash of the client's IP address
 */

async function getClientID() {
  const headers_list = headers()
  const ip_address =
    headers_list.get("X-Forwarded-For") ||
    // Fallback for localhost or non Vercel deployments
    "0.0.0.0"
  const salted_ip = ip_address + String(process.env.HASH_SALT)

  const ip_Utf8 = new TextEncoder().encode(salted_ip)
  const ipHash = await crypto.subtle.digest("SHA-256", ip_Utf8)

  const hashArray = Array.from(new Uint8Array(ipHash))
  const hashHex = hashArray
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("")

  return hashHex
}

export { getClientID }
