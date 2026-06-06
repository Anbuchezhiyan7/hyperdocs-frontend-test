/**
 * Determines if a hostname is a platform domain.
 * Platform domains include:
 * - hyperdocs.cloud
 * - www.hyperdocs.cloud
 * - any subdomain ending with .hyperdocs.cloud (e.g., johndoe.hyperdocs.cloud, acme.hyperdocs.cloud)
 *
 * All other domains are considered custom domains.
 *
 * @param hostname The hostname of the request (e.g. from headers)
 */
export function isPlatformDomain(hostname: string): boolean {
  if (!hostname) return false

  // Normalize hostname: lowercase and strip port if present
  const cleanHost = hostname.split(':')[0].toLowerCase().trim()

  if (cleanHost === 'hyperdocs.cloud' || cleanHost === 'www.hyperdocs.cloud') {
    return true
  }

  return cleanHost.endsWith('.hyperdocs.cloud')
}
