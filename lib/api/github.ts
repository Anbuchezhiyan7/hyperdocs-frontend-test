import { deleteRequest, getRequest, postRequest } from '@/lib/axios'
import type {
  GithubStatus,
  GithubConnectResponse,
  GithubRepository,
  ConnectRepoPayload,
  ConnectedRepo,
  GenerateDocsResponse,
  JobStatusResponse,
  Document,
  GithubBranch,
  GithubCommitsResponse,
  GithubAnalyzeResponse,
  GithubGenerateResponse,
} from '@/lib/types/github'

// ─── Response formatter ───────────────────────────────────────────────────────

const ok = <T>(data: T) => ({ success: true as const, data, error: null })
const err = (error: unknown, fallback = 'Something went wrong') => {
  const e = error as { status?: number; data?: { message?: string; detail?: string }; message?: string }
  const message = e?.data?.message || e?.data?.detail || e?.message || fallback
  return { success: false as const, data: null, error: message, status: e?.status || null }
}

// ─── API functions (NO caching) ──────────────────────────────────────────────
let statusPromise: Promise<{ success: boolean; data: GithubStatus | null; error: string | null }> | null = null
let lastStatusFetchedTime = 0

/**
 * GET /github/status
 * Returns connection status + github username if connected
 */
export async function apiGetGithubStatus() {
  const now = Date.now()
  if (statusPromise && now - lastStatusFetchedTime < 2000) {
    return statusPromise
  }
  lastStatusFetchedTime = now
  statusPromise = (async () => {
    try {
      const { data } = await getRequest('github/status')
      return ok(data as GithubStatus)
    } catch (error) {
      statusPromise = null
      lastStatusFetchedTime = 0
      return err(error, 'Failed to fetch GitHub status')
    }
  })()
  return statusPromise
}

/**
 * GET /github/connect
 * Returns the GitHub OAuth redirect URL
 */
export async function apiGetGithubConnectUrl() {
  try {
    const { data } = await getRequest('github/connect')
    return ok(data as GithubConnectResponse)
  } catch (error) {
    return err(error, 'Failed to get GitHub connect URL')
  }
}

/**
 * GET /github/repositories/available
 * Returns list of repositories available for connection
 */
export async function apiGetAvailableRepos() {
  try {
    const { data } = await getRequest('github/repositories/available')
    return ok(data as GithubRepository[])
  } catch (error) {
    return err(error, 'Failed to fetch repositories')
  }
}

/**
 * POST /github/repositories
 * Connects repositories to the project
 */
export async function apiConnectRepo(payload: ConnectRepoPayload[]) {
  try {
    const { data } = await postRequest('github/repositories', payload)
    return ok(data as ConnectedRepo[])
  } catch (error) {
    return err(error, 'Failed to connect repository')
  }
}

/**
 * POST /github/generate
 * Kicks off documentation generation (no repo ID needed)
 */
export async function apiGenerateDocs() {
  try {
    const { data } = await postRequest('github/generate', {})
    return ok(data as GenerateDocsResponse)
  } catch (error) {
    return err(error, 'Failed to start documentation generation')
  }
}

/**
 * GET /github/jobs/{jobId}
 * Polls the status of a documentation generation job
 */
export async function apiGetJobStatus(jobId: string) {
  try {
    const { data } = await getRequest(`github/jobs/${jobId}`)
    return ok(data as JobStatusResponse)
  } catch (error) {
    return err(error, 'Failed to fetch job status')
  }
}

/**
 * GET /documents/{userId}
 * Fetches generated documents for a user
 */
export async function apiGetDocuments(userId: string) {
  try {
    const { data } = await getRequest(`documents/${userId}`)
    return ok(data as Document[])
  } catch (error) {
    return err(error, 'Failed to fetch documents')
  }
}

/**
 * GET /github/disconnect
 * Disconnects GitHub integration
 */
export async function apiDisconnectGithub() {
  statusPromise = null
  lastStatusFetchedTime = 0
  try {
    const { data } = await deleteRequest('github/disconnect')
    return ok(data)
  } catch (error) {
    return err(error, 'Failed to disconnect GitHub')
  }
}

/**
 * GET /github/repositories/{repoId}/branches
 * Returns the list of branches for a repository
 */
export async function apiGetRepoBranches(repoId: number) {
  try {
    const { data } = await getRequest(`github/repositories/${repoId}/branches`)
    return ok(data as GithubBranch[])
  } catch (error) {
    return err(error, 'Failed to fetch repository branches')
  }
}

/**
 * POST /github/repositories/{repoId}/analyze-commits?branch={branch}
 * Returns analyzed commits and whether docs are generatable
 */
export async function apiGetRepoCommits(repoId: number, branch: string) {
  try {
    const { data } = await postRequest(`github/repositories/${repoId}/analyze-commits?branch=${branch}`, {})
    return ok(data as GithubAnalyzeResponse)
  } catch (error) {
    return err(error, 'Failed to analyze repository commits')
  }
}

/**
 * POST /github/repositories/{repoId}/generate-changes
 * Triggers documentation generation for updated codebase using repoId
 */
export async function apiGenerateRepoChanges(repoId: number | string) {
  try {
    const { data } = await postRequest(`github/repositories/${repoId}/generate-changes`, {})
    return ok(data as GithubGenerateResponse)
  } catch (error) {
    return err(error, 'Failed to generate docs for updated codebase')
  }
}

/**
 * POST /github/repositories/{repoId}/acknowledge-changes
 * Acknowledges changes in the repository
 */
export async function apiAcknowledgeChanges(repoId: number | string) {
  try {
    const { data } = await postRequest(`github/repositories/${repoId}/acknowledge-changes`, {})
    return ok(data as { acknowledged: boolean; repo_id: number })
  } catch (error) {
    return err(error, 'Failed to acknowledge repository changes')
  }
}

