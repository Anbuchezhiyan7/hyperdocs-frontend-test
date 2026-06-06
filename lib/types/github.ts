// GitHub API types

export interface GithubStatus {
  connected: boolean
  github_username: string | null
}

export interface GithubConnectResponse {
  redirect_url: string
}

export interface GithubRepository {
  id: number
  name: string
  full_name: string
  private: boolean
  default_branch: string
  description: string | null
}

export interface ConnectRepoPayload {
  repo_id: number
  full_name: string
  repo_name: string
  default_branch: string
}

export interface ConnectedRepo {
  user_id: string
  installation_id: number
  repo_id: number
  full_name: string
  repo_name: string
  default_branch: string
  last_commit_sha: string | null
  doc_folder_id: string | null
  connected_at: string
  last_generated_at: string | null
}

export type JobStatus = 'pending' | 'analyzing' | 'generating' | 'saving' | 'completed' | 'failed'

export interface GenerateDocsResponse {
  job_id: string
  user_id: string
  repo_id: number
  full_name: string
  status: JobStatus
  progress: number
  message: string
  created_at: string
  completed_at: string | null
  error: string | null
}

export interface JobStatusResponse {
  job_id: string
  user_id: string
  repo_id: number
  full_name: string
  status: JobStatus
  progress: number
  message: string
  created_at: string
  completed_at: string | null
  error: string | null
}

export interface Document {
  id: string
  title: string
  content?: string
  [key: string]: unknown
}

export interface GithubBranch {
  name: string
  sha: string
  protected: boolean
  is_default: boolean
}

export interface GithubCommit {
  commit_id: string
  committed_by: string
  committed_at: string
  message: string
  is_doc_generatable?: boolean
  reason?: string
}

export interface GithubChangedFile {
  filename: string;
  status: string;
  additions: number;
  deletions: number;
  changes: number;
  patch: string;
}

export interface GithubCommitsResponse {
  state: string
  message: string
  base_sha: string
  head_sha: string
  total_commits: number
  commits: GithubCommit[]
  changed_files: GithubChangedFile[]
}

export interface GithubAnalyzeResponse {
  is_doc_generatable: boolean
  reason: string
  base_sha: string
  head_sha: string
  changed_files: string[]
  commits: GithubCommit[]
}

export interface GithubGenerateResponse extends JobStatusResponse {
  mode: string
  base_sha: string
  head_sha: string
  changed_files_count: number
  changed_files: string[]
}


