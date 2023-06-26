import { headers } from "next/headers";

async function getClientID() {
  const headers_list = headers();
  const ip_address =
    headers_list.get("X-Forwarded-For") ||
    // Fallback for localhost or non Vercel deployments
    "0.0.0.0";
  console.log(ip_address);
  const salted_ip = ip_address + String(process.env.HASH_SALT);

  const ip_Utf8 = new TextEncoder().encode(salted_ip);
  const ipHash = await crypto.subtle.digest("SHA-256", ip_Utf8);

  const hashArray = Array.from(new Uint8Array(ipHash));
  const hashHex = hashArray
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");

  return hashHex;
}

export { getClientID };
