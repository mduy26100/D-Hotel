import { jwtDecode } from "jwt-decode"

export const decodeToken = (token) => {
  try {
    return jwtDecode(token)
  } catch (error) {
    console.error("Error decoding token:", error)
    return null
  }
}

export const getRolesFromToken = (token) => {
  const decoded = decodeToken(token)
  if (!decoded) return []

  // Handle different possible role claim names
  const roles =
    decoded.role || decoded.roles || decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] || []

  // Ensure roles is always an array
  return Array.isArray(roles) ? roles : [roles]
}

export const hasRole = (token, roleName) => {
  const roles = getRolesFromToken(token)
  return roles.includes(roleName)
}

export const isTokenExpired = (token) => {
  const decoded = decodeToken(token)
  if (!decoded || !decoded.exp) return true

  const currentTime = Date.now() / 1000
  return decoded.exp < currentTime
}
