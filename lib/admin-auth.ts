import { createHash } from "crypto"

// The admin cookie holds a hash of ADMIN_PASSWORD, so it can't be forged without
// knowing the password, and changing the password signs everyone out.
export const ADMIN_COOKIE = "vh_admin"

export function adminToken() {
  const pw = process.env.ADMIN_PASSWORD?.trim()
  if (!pw) return null
  return createHash("sha256").update(`vh-admin:${pw}`).digest("hex")
}
