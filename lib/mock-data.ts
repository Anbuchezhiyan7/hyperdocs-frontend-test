export type TocItem = {
  id: string
  title: string
  level: 1 | 2 | 3
  children?: TocItem[]
}

export const TABLE_OF_CONTENTS: TocItem[] = [
  {
    id: 'getting-started',
    title: 'Getting Started',
    level: 1,
    children: [
      { id: 'introduction', title: 'Introduction', level: 2 },
      { id: 'installation', title: 'Installation', level: 2 },
      { id: 'quick-start', title: 'Quick Start', level: 2 },
    ],
  },
  {
    id: 'api-reference',
    title: 'API Reference',
    level: 1,
    children: [
      { id: 'authentication', title: 'Authentication', level: 2 },
      {
        id: 'endpoints',
        title: 'Endpoints',
        level: 2,
        children: [
          { id: 'users', title: 'Users', level: 3 },
          { id: 'projects', title: 'Projects', level: 3 },
          { id: 'webhooks', title: 'Webhooks', level: 3 },
        ],
      },
      { id: 'error-codes', title: 'Error Codes', level: 2 },
    ],
  },
  {
    id: 'guides',
    title: 'Guides',
    level: 1,
    children: [
      { id: 'deployment', title: 'Deployment', level: 2 },
      { id: 'environment-variables', title: 'Environment Variables', level: 2 },
      { id: 'testing', title: 'Testing', level: 2 },
    ],
  },
  {
    id: 'changelog',
    title: 'Changelog',
    level: 1,
  },
]

// Flat list of all sections for the editor
export type DocSection = {
  id: string
  title: string
  content: DocNode[]
}

export type DocNode =
  | { type: 'h1'; text: string }
  | { type: 'h2'; text: string }
  | { type: 'h3'; text: string }
  | { type: 'p'; text: string }
  | { type: 'ul'; items: string[] }
  | { type: 'ol'; items: string[] }
  | { type: 'table'; headers: string[]; rows: string[][] }
  | { type: 'code'; lang: string; text: string }
  | { type: 'blockquote'; text: string }

export const DOC_SECTIONS: Record<string, DocSection> = {
  introduction: {
    id: 'introduction',
    title: 'Introduction',
    content: [
      { type: 'h1', text: 'Introduction' },
      {
        type: 'p',
        text: 'Welcome to the Hyperdocs API documentation. This guide covers everything you need to integrate with our platform, from authentication to advanced features.',
      },
      {
        type: 'p',
        text: 'Hyperdocs is a developer-first documentation platform that auto-generates structured, searchable docs from your codebase using AI. Our REST API allows you to manage documentation programmatically.',
      },
      {
        type: 'blockquote',
        text: 'This documentation was generated automatically by Hyperdocs AI from your connected repository. You can edit any section and the changes will be saved.',
      },
      { type: 'h2', text: 'Key Features' },
      {
        type: 'ul',
        items: [
          'AI-powered documentation generation from source code',
          'Real-time collaborative editing with rich text support',
          'Versioned documentation with full change history',
          'Auto-sync with your Git repositories on every push',
          'Full-text search across all documentation',
          'Custom branding and domain support',
        ],
      },
      { type: 'h2', text: 'Base URL' },
      {
        type: 'p',
        text: 'All API requests should be made to the following base URL:',
      },
      { type: 'code', lang: 'bash', text: 'https://api.hyperdocs.io/v1' },
    ],
  },
  installation: {
    id: 'installation',
    title: 'Installation',
    content: [
      { type: 'h1', text: 'Installation' },
      { type: 'p', text: 'Install the Hyperdocs SDK using your preferred package manager:' },
      { type: 'code', lang: 'bash', text: 'npm install @hyperdocs/sdk\n# or\nyarn add @hyperdocs/sdk\n# or\npnpm add @hyperdocs/sdk' },
      { type: 'h2', text: 'Requirements' },
      { type: 'ul', items: ['Node.js 18 or higher', 'A Hyperdocs account with API access', 'An API key from your dashboard'] },
    ],
  },
  authentication: {
    id: 'authentication',
    title: 'Authentication',
    content: [
      { type: 'h1', text: 'Authentication' },
      {
        type: 'p',
        text: 'The Hyperdocs API uses Bearer token authentication. Include your API key in the Authorization header of every request.',
      },
      { type: 'code', lang: 'bash', text: 'curl -H "Authorization: Bearer YOUR_API_KEY" \\\n     https://api.hyperdocs.io/v1/projects' },
      { type: 'h2', text: 'Generating an API Key' },
      {
        type: 'ol',
        items: [
          'Log in to your Hyperdocs dashboard',
          'Navigate to Settings → API Keys',
          'Click "Generate New Key"',
          'Copy and store the key securely — it will only be shown once',
        ],
      },
      { type: 'h2', text: 'Rate Limits' },
      {
        type: 'table',
        headers: ['Plan', 'Requests / min', 'Requests / day'],
        rows: [
          ['Free', '60', '1,000'],
          ['Pro', '300', '50,000'],
          ['Enterprise', 'Unlimited', 'Unlimited'],
        ],
      },
    ],
  },
  users: {
    id: 'users',
    title: 'Users',
    content: [
      { type: 'h1', text: 'Users API' },
      { type: 'p', text: 'Manage users in your organization through the Users API.' },
      { type: 'h2', text: 'Endpoints' },
      {
        type: 'table',
        headers: ['Method', 'Endpoint', 'Description'],
        rows: [
          ['GET', '/v1/users', 'List all users'],
          ['GET', '/v1/users/:id', 'Get a user by ID'],
          ['POST', '/v1/users', 'Create a new user'],
          ['PATCH', '/v1/users/:id', 'Update a user'],
          ['DELETE', '/v1/users/:id', 'Delete a user'],
        ],
      },
      { type: 'h2', text: 'List Users' },
      { type: 'code', lang: 'http', text: 'GET /v1/users?page=1&limit=20' },
      { type: 'h3', text: 'Response' },
      {
        type: 'code',
        lang: 'json',
        text: JSON.stringify(
          {
            data: [{ id: 'usr_123', name: 'Alice', email: 'alice@example.com', role: 'admin' }],
            meta: { total: 1, page: 1, limit: 20 },
          },
          null,
          2
        ),
      },
    ],
  },
  deployment: {
    id: 'deployment',
    title: 'Deployment',
    content: [
      { type: 'h1', text: 'Deployment' },
      {
        type: 'p',
        text: 'Deploy your application using the Hyperdocs CLI or connect your CI/CD pipeline.',
      },
      { type: 'h2', text: 'Using the CLI' },
      { type: 'code', lang: 'bash', text: 'npx hyperdocs deploy --env production' },
      { type: 'h2', text: 'Environment Variables' },
      {
        type: 'table',
        headers: ['Variable', 'Required', 'Description'],
        rows: [
          ['HYPERDOCS_API_KEY', 'Yes', 'Your Hyperdocs API key'],
          ['HYPERDOCS_PROJECT_ID', 'Yes', 'Your project identifier'],
          ['HYPERDOCS_ENV', 'No', 'Deployment environment (default: production)'],
        ],
      },
    ],
  },
}

export const INITIAL_SECTION_ID = 'introduction'
