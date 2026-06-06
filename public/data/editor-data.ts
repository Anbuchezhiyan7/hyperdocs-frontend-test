const TEST_EDITOR_DATA = [
    {
        "id": "f-getting-started",
        "title": "Getting Started",
        "slug": "getting-started",
        "type": "folder",
        "children": [
            {
                "id": "p-quickstart",
                "title": "Quickstart",
                "slug": "quickstart",
                "type": "page",
                "content": [
                    {
                        "type": "h1",
                        "children": [
                            {
                                "text": ""
                            }
                        ],
                        "id": "i3CJy5vO_1"
                    },
                    {
                        "type": "callout",
                        "variant": "info",
                        "children": [
                            {
                                "text": "What Changed — updated from: src/app/(app)/(private)/dashboard/ai-docs/page.tsx, src/app/(app)/(private)/dashboard/api-keys/page.tsx, src/app/(app)/(private)/dashboard/docs-creation/page.tsx, src/components/RenderServerElements/Polls.tsx, src/components/common/Sidebar/index.tsx, src/components/editor/Poll/PollDisplay.tsx"
                            }
                        ],
                        "id": "305c5c93ee"
                    },
                    {
                        "type": "callout",
                        "variant": "warning",
                        "children": [
                            {
                                "text": "Click \"Generate\" and our AI will analyze your codebase, identify changes, and produce structured documentation automatically."
                            }
                        ],
                        "id": "7f1e07bbb9"
                    },
                    {
                        "type": "h1",
                        "before": "Quickstart Guide",
                        "children": [
                            {
                                "text": "Quickstart"
                            }
                        ],
                        "id": "6b9f38c17a"
                    },
                    {
                        "type": "p",
                        "before": "Get up and running with your first docs site in minutes.",
                        "children": [
                            {
                                "text": "Get your first documentation site live in under 5 minutes."
                            }
                        ],
                        "id": "7854ecb4f1"
                    },
                    {
                        "type": "h2",
                        "before": "Step 1 — Link your repo",
                        "children": [
                            {
                                "text": "Step 1 — Connect your repository"
                            }
                        ],
                        "id": "2b37c95a5d"
                    },
                    {
                        "type": "p",
                        "before": "Log in with GitHub and pick the repo you'd like to document.",
                        "children": [
                            {
                                "text": "Sign in with GitHub and select the repository you want to document."
                            }
                        ],
                        "id": "e4d5180631"
                    },
                    {
                        "type": "h2",
                        "before": "Step 2 — Run the AI generator",
                        "children": [
                            {
                                "text": "Step 2 — Generate docs"
                            }
                        ],
                        "id": "872ea09d67"
                    },
                    {
                        "type": "p",
                        "children": [
                            {
                                "text": "Click \"Generate\" and our AI will analyze your codebase, identify changes, and produce structured documentation automatically."
                            }
                        ],
                        "id": "d15ce0089e"
                    },
                    {
                        "type": "p",
                        "children": [
                            {
                                "text": "You can also scan your repository for changes using the \"Rescan Git Repo\" button if there are new updates."
                            }
                        ],
                        "id": "8f2833a9b6"
                    },
                    {
                        "type": "h2",
                        "before": "Step 3 — Go live",
                        "children": [
                            {
                                "text": "Step 3 — Publish"
                            }
                        ],
                        "id": "b0d6c3549b"
                    },
                    {
                        "type": "p",
                        "before": "Press Publish and your docs will be live on your Hyperdocs subdomain right away.",
                        "children": [
                            {
                                "text": "Hit Publish. Your docs are live instantly on your Hyperdocs subdomain."
                            }
                        ],
                        "id": "cdf2111362"
                    },
                    {
                        "type": "code_block",
                        "lang": "bash",
                        "children": [
                            {
                                "type": "code_line",
                                "children": [
                                    {
                                        "text": "# Install the CLI (optional)"
                                    }
                                ],
                                "id": "b992c7e314"
                            },
                            {
                                "type": "code_line",
                                "children": [
                                    {
                                        "text": "npm install -g @hyperdocs/cli"
                                    }
                                ],
                                "id": "53fd1f92c8"
                            },
                            {
                                "type": "code_line",
                                "children": [
                                    {
                                        "text": "hyperdocs deploy"
                                    }
                                ],
                                "id": "c89a4b3e77"
                            }
                        ],
                        "id": "059ac7b23f"
                    }
                ]
            },
            {
                "id": "p-introduction",
                "title": "Introduction",
                "slug": "introduction",
                "type": "page",
                "content": [
                    {
                        "type": "h1",
                        "children": [
                            {
                                "text": "Introduction 2"
                            }
                        ],
                        "id": "0tqpa_R95E"
                    },
                    {
                        "type": "p",
                        "children": [
                            {
                                "text": "Hyperdocs is an AI-powered documentation platform that automatically generates, syncs, and publishes beautiful docs from your codebase. Whether you are a solo developer or a team of hundreds, Hyperdocs keeps your documentation always up to date — without any manual effort."
                            }
                        ],
                        "id": "ecXedZkQk2"
                    },
                    {
                        "type": "p",
                        "children": [
                            {
                                "text": "Traditional documentation workflows break down quickly. Docs live in a separate repo, get out of sync with the code, and nobody has time to update them. Hyperdocs solves this by treating documentation as a first-class output of your development process."
                            }
                        ],
                        "id": "r7P63Y9pmH"
                    },
                    {
                        "type": "h2",
                        "children": [
                            {
                                "text": "Key Features"
                            }
                        ],
                        "id": "2sGArwlxOM"
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "disc",
                        "children": [
                            {
                                "text": "Auto-generate docs from source code, comments, and OpenAPI specs using AI"
                            }
                        ],
                        "id": "1kDCFk3gF0"
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "disc",
                        "children": [
                            {
                                "text": "Real-time sync with GitHub, GitLab, and Bitbucket on every push"
                            }
                        ],
                        "id": "_QHC4T5gfu"
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "disc",
                        "children": [
                            {
                                "text": "Rich block editor — headings, code, tables, callouts, images"
                            }
                        ],
                        "id": "9zbV63aAqV"
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "disc",
                        "children": [
                            {
                                "text": "Versioned docs with full history and diff viewer"
                            }
                        ],
                        "id": "Vb3lolvZN6"
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "disc",
                        "children": [
                            {
                                "text": "Custom domains with automatic SSL provisioning"
                            }
                        ],
                        "id": "F1uRVRqXD_"
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "disc",
                        "children": [
                            {
                                "text": "Full-text search powered by a dedicated indexing engine"
                            }
                        ],
                        "id": "mWwQHn3ZtU"
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "disc",
                        "children": [
                            {
                                "text": "Access controls — public, private, or password-protected docs"
                            }
                        ],
                        "id": "xVLuiwa6Wn"
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "disc",
                        "children": [
                            {
                                "text": "REST API and SDKs for JavaScript, Python, and Go"
                            }
                        ],
                        "id": "73_EiAbsXO"
                    },
                    {
                        "type": "h2",
                        "children": [
                            {
                                "text": "How It Works"
                            }
                        ],
                        "id": "vC4phNFYEW"
                    },
                    {
                        "type": "p",
                        "children": [
                            {
                                "text": "Hyperdocs connects directly to your repository via a lightweight webhook. On every push to your configured branch, the sync engine diffs only the changed files and updates the affected doc pages. No full rebuilds — even large monorepos stay fast."
                            }
                        ],
                        "id": "-4c5jYESeu"
                    },
                    {
                        "type": "p",
                        "children": [
                            {
                                "text": "The AI layer reads your source code, inline comments, JSDoc/TSDoc annotations, and any existing markdown files. It structures this into a navigable doc site with sections, headings, and code examples already in place. You can then edit, rearrange, or extend any part of the output."
                            }
                        ],
                        "id": "8eTxmCviE3"
                    },
                    {
                        "type": "h2",
                        "children": [
                            {
                                "text": "Architecture Overview"
                            }
                        ],
                        "id": "SGaqnbUfiA"
                    },
                    {
                        "type": "p",
                        "children": [
                            {
                                "text": "At a high level, Hyperdocs consists of four layers:"
                            }
                        ],
                        "id": "2_CuKP2bIW"
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "decimal",
                        "children": [
                            {
                                "text": "Ingestion — your repo is cloned and parsed on each sync event"
                            }
                        ],
                        "id": "N87PMZ1gid"
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "decimal",
                        "children": [
                            {
                                "text": "AI Generation — changed files are sent to the generation pipeline which produces structured blocks"
                            }
                        ],
                        "listStart": 2,
                        "id": "66RTDV18lw"
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "decimal",
                        "children": [
                            {
                                "text": "Storage — blocks are stored in a versioned content graph, not raw markdown"
                            }
                        ],
                        "listStart": 3,
                        "id": "_mlh0Ntewm"
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "decimal",
                        "children": [
                            {
                                "text": "Delivery — the rendered docs site is served via a global CDN with sub-50ms TTFB"
                            }
                        ],
                        "listStart": 4,
                        "id": "XS1GAPKI9t"
                    },
                    {
                        "type": "h2",
                        "children": [
                            {
                                "text": "Supported Stacks"
                            }
                        ],
                        "id": "en6inAWVjf"
                    },
                    {
                        "type": "p",
                        "children": [
                            {
                                "text": "Hyperdocs parses documentation from a wide range of languages and frameworks out of the box:"
                            }
                        ],
                        "id": "HY7sjlNXFW"
                    },
                    {
                        "type": "table",
                        "children": [
                            {
                                "type": "tr",
                                "children": [
                                    {
                                        "type": "th",
                                        "children": [
                                            {
                                                "type": "p",
                                                "children": [
                                                    {
                                                        "text": "Language"
                                                    }
                                                ],
                                                "id": "19pk2L2T0J"
                                            }
                                        ],
                                        "id": "mRnGqtifjQ"
                                    },
                                    {
                                        "type": "th",
                                        "children": [
                                            {
                                                "type": "p",
                                                "children": [
                                                    {
                                                        "text": "Comment Style"
                                                    }
                                                ],
                                                "id": "PTO00jFsG4"
                                            }
                                        ],
                                        "id": "yALzHZFQdk"
                                    },
                                    {
                                        "type": "th",
                                        "children": [
                                            {
                                                "type": "p",
                                                "children": [
                                                    {
                                                        "text": "Extras"
                                                    }
                                                ],
                                                "id": "pMhRuHhGc4"
                                            }
                                        ],
                                        "id": "wWZlKilThD"
                                    }
                                ],
                                "id": "yFcN47nKw5"
                            },
                            {
                                "type": "tr",
                                "children": [
                                    {
                                        "type": "td",
                                        "children": [
                                            {
                                                "type": "p",
                                                "children": [
                                                    {
                                                        "text": "TypeScript / JavaScript"
                                                    }
                                                ],
                                                "id": "B8FSg_Zj6Y"
                                            }
                                        ],
                                        "id": "7P4XZjDVVm"
                                    },
                                    {
                                        "type": "td",
                                        "children": [
                                            {
                                                "type": "p",
                                                "children": [
                                                    {
                                                        "text": "JSDoc, TSDoc"
                                                    }
                                                ],
                                                "id": "jwrVWeDncd"
                                            }
                                        ],
                                        "id": "drg9gXbOuh"
                                    },
                                    {
                                        "type": "td",
                                        "children": [
                                            {
                                                "type": "p",
                                                "children": [
                                                    {
                                                        "text": "OpenAPI v3, GraphQL SDL"
                                                    }
                                                ],
                                                "id": "0Kjz6fByc4"
                                            }
                                        ],
                                        "id": "zaQK1fNA0H"
                                    }
                                ],
                                "id": "vmkjZ-fzBR"
                            },
                            {
                                "type": "tr",
                                "children": [
                                    {
                                        "type": "td",
                                        "children": [
                                            {
                                                "type": "p",
                                                "children": [
                                                    {
                                                        "text": "Python"
                                                    }
                                                ],
                                                "id": "UNRuyqdjUN"
                                            }
                                        ],
                                        "id": "rGptv-RHmO"
                                    },
                                    {
                                        "type": "td",
                                        "children": [
                                            {
                                                "type": "p",
                                                "children": [
                                                    {
                                                        "text": "Docstrings (Google, NumPy)"
                                                    }
                                                ],
                                                "id": "ecDIWb9oUo"
                                            }
                                        ],
                                        "id": "hT4N2XxkIC"
                                    },
                                    {
                                        "type": "td",
                                        "children": [
                                            {
                                                "type": "p",
                                                "children": [
                                                    {
                                                        "text": "FastAPI auto-schema"
                                                    }
                                                ],
                                                "id": "Qrq5hbQsYZ"
                                            }
                                        ],
                                        "id": "9cAv1dx-2q"
                                    }
                                ],
                                "id": "shEEzkHxAI"
                            },
                            {
                                "type": "tr",
                                "children": [
                                    {
                                        "type": "td",
                                        "children": [
                                            {
                                                "type": "p",
                                                "children": [
                                                    {
                                                        "text": "Go"
                                                    }
                                                ],
                                                "id": "SaJ3xNXKft"
                                            }
                                        ],
                                        "id": "LX5yY-c4Rb"
                                    },
                                    {
                                        "type": "td",
                                        "children": [
                                            {
                                                "type": "p",
                                                "children": [
                                                    {
                                                        "text": "GoDoc comments"
                                                    }
                                                ],
                                                "id": "sDX3jqQxNO"
                                            }
                                        ],
                                        "id": "RYB9ORb9iA"
                                    },
                                    {
                                        "type": "td",
                                        "children": [
                                            {
                                                "type": "p",
                                                "children": [
                                                    {
                                                        "text": "go doc output"
                                                    }
                                                ],
                                                "id": "5OaP3UYEgu"
                                            }
                                        ],
                                        "id": "PjOfUjUOnC"
                                    }
                                ],
                                "id": "eEcjYSovPM"
                            },
                            {
                                "type": "tr",
                                "children": [
                                    {
                                        "type": "td",
                                        "children": [
                                            {
                                                "type": "p",
                                                "children": [
                                                    {
                                                        "text": "Rust"
                                                    }
                                                ],
                                                "id": "Xo2Ew5tpn9"
                                            }
                                        ],
                                        "id": "dfTJfowUdw"
                                    },
                                    {
                                        "type": "td",
                                        "children": [
                                            {
                                                "type": "p",
                                                "children": [
                                                    {
                                                        "text": "rustdoc (///)"
                                                    }
                                                ],
                                                "id": "Z8h9sxYfhZ"
                                            }
                                        ],
                                        "id": "A9FjdGK-ka"
                                    },
                                    {
                                        "type": "td",
                                        "children": [
                                            {
                                                "type": "p",
                                                "children": [
                                                    {
                                                        "text": "cargo doc output"
                                                    }
                                                ],
                                                "id": "bnRKU0Uxu4"
                                            }
                                        ],
                                        "id": "JfGXDuvA8B"
                                    }
                                ],
                                "id": "wnixZO8KGl"
                            },
                            {
                                "type": "tr",
                                "children": [
                                    {
                                        "type": "td",
                                        "children": [
                                            {
                                                "type": "p",
                                                "children": [
                                                    {
                                                        "text": "Java / Kotlin"
                                                    }
                                                ],
                                                "id": "14o_I2vRLe"
                                            }
                                        ],
                                        "id": "L6BZzAOMxs"
                                    },
                                    {
                                        "type": "td",
                                        "children": [
                                            {
                                                "type": "p",
                                                "children": [
                                                    {
                                                        "text": "Javadoc, KDoc"
                                                    }
                                                ],
                                                "id": "6mi7cZSlzP"
                                            }
                                        ],
                                        "id": "oYWXcrRl3q"
                                    },
                                    {
                                        "type": "td",
                                        "children": [
                                            {
                                                "type": "p",
                                                "children": [
                                                    {
                                                        "text": "Spring annotations"
                                                    }
                                                ],
                                                "id": "HDa53smKI6"
                                            }
                                        ],
                                        "id": "Aw0wZIOSr6"
                                    }
                                ],
                                "id": "_DH5jfJWha"
                            }
                        ],
                        "id": "WIa_M84hGO"
                    },
                    {
                        "type": "h2",
                        "children": [
                            {
                                "text": "Quick Example"
                            }
                        ],
                        "id": "76QVQ7psFQ"
                    },
                    {
                        "type": "p",
                        "children": [
                            {
                                "text": "Here is all it takes to publish your first docs site:"
                            }
                        ],
                        "id": "u7egsiRLv6"
                    },
                    {
                        "type": "code_block",
                        "lang": "bash",
                        "children": [
                            {
                                "type": "code_line",
                                "children": [
                                    {
                                        "text": "# 1. Install the CLI"
                                    }
                                ],
                                "id": "hnVkB_gc6B"
                            },
                            {
                                "type": "code_line",
                                "children": [
                                    {
                                        "text": "npm install -g @hyperdocs/cli"
                                    }
                                ],
                                "id": "UR2KVjs-GE"
                            },
                            {
                                "type": "code_line",
                                "children": [
                                    {
                                        "text": ""
                                    }
                                ],
                                "id": "WOCt63hQxz"
                            },
                            {
                                "type": "code_line",
                                "children": [
                                    {
                                        "text": "# 2. Authenticate"
                                    }
                                ],
                                "id": "6Ozv4cBX6M"
                            },
                            {
                                "type": "code_line",
                                "children": [
                                    {
                                        "text": "hyperdocs login"
                                    }
                                ],
                                "id": "ueT7K_l-58"
                            },
                            {
                                "type": "code_line",
                                "children": [
                                    {
                                        "text": ""
                                    }
                                ],
                                "id": "jKi5L3kQF_"
                            },
                            {
                                "type": "code_line",
                                "children": [
                                    {
                                        "text": "# 3. Initialise a project in your repo root"
                                    }
                                ],
                                "id": "ZDsUv7yw0-"
                            },
                            {
                                "type": "code_line",
                                "children": [
                                    {
                                        "text": "hyperdocs init"
                                    }
                                ],
                                "id": "76s1d8fR4V"
                            },
                            {
                                "type": "code_line",
                                "children": [
                                    {
                                        "text": ""
                                    }
                                ],
                                "id": "AR3iaMEPFo"
                            },
                            {
                                "type": "code_line",
                                "children": [
                                    {
                                        "text": "# 4. Generate docs from source"
                                    }
                                ],
                                "id": "vIaUguAlLC"
                            },
                            {
                                "type": "code_line",
                                "children": [
                                    {
                                        "text": "hyperdocs generate"
                                    }
                                ],
                                "id": "CXKwSjRxnK"
                            },
                            {
                                "type": "code_line",
                                "children": [
                                    {
                                        "text": ""
                                    }
                                ],
                                "id": "sbHv4yq8V-"
                            },
                            {
                                "type": "code_line",
                                "children": [
                                    {
                                        "text": "# 5. Publish"
                                    }
                                ],
                                "id": "ui7biVLL2Y"
                            },
                            {
                                "type": "code_line",
                                "children": [
                                    {
                                        "text": "hyperdocs deploy"
                                    }
                                ],
                                "id": "BpzxyVNrLx"
                            }
                        ],
                        "id": "V66D9Izpe2"
                    },
                    {
                        "type": "h2",
                        "children": [
                            {
                                "text": "Pricing"
                            }
                        ],
                        "id": "ejUt6AeGrb"
                    },
                    {
                        "type": "p",
                        "children": [
                            {
                                "text": "Hyperdocs is free for open-source projects and individual developers. Paid plans unlock private docs, custom domains, team access controls, and priority support."
                            }
                        ],
                        "id": "PDCUe50jMi"
                    },
                    {
                        "type": "table",
                        "children": [
                            {
                                "type": "tr",
                                "children": [
                                    {
                                        "type": "th",
                                        "children": [
                                            {
                                                "type": "p",
                                                "children": [
                                                    {
                                                        "text": "Plan"
                                                    }
                                                ],
                                                "id": "jp_wFjUTWF"
                                            }
                                        ],
                                        "id": "U_oQGwnyhW"
                                    },
                                    {
                                        "type": "th",
                                        "children": [
                                            {
                                                "type": "p",
                                                "children": [
                                                    {
                                                        "text": "Price"
                                                    }
                                                ],
                                                "id": "Qa9sgtx6T3"
                                            }
                                        ],
                                        "id": "4BMRdy9_WS"
                                    },
                                    {
                                        "type": "th",
                                        "children": [
                                            {
                                                "type": "p",
                                                "children": [
                                                    {
                                                        "text": "Projects"
                                                    }
                                                ],
                                                "id": "0u6d3G3DaS"
                                            }
                                        ],
                                        "id": "KBhILGhD8n"
                                    },
                                    {
                                        "type": "th",
                                        "children": [
                                            {
                                                "type": "p",
                                                "children": [
                                                    {
                                                        "text": "Team Members"
                                                    }
                                                ],
                                                "id": "SsQIQulHIO"
                                            }
                                        ],
                                        "id": "Sk46tKUz_I"
                                    }
                                ],
                                "id": "bXOhPlvXkY"
                            },
                            {
                                "type": "tr",
                                "children": [
                                    {
                                        "type": "td",
                                        "children": [
                                            {
                                                "type": "p",
                                                "children": [
                                                    {
                                                        "text": "Free"
                                                    }
                                                ],
                                                "id": "_D1r-zx_4H"
                                            }
                                        ],
                                        "id": "EZ3NWBWJzq"
                                    },
                                    {
                                        "type": "td",
                                        "children": [
                                            {
                                                "type": "p",
                                                "children": [
                                                    {
                                                        "text": "$0 / mo"
                                                    }
                                                ],
                                                "id": "gwAPbY9rdQ"
                                            }
                                        ],
                                        "id": "EzTdcHcjTH"
                                    },
                                    {
                                        "type": "td",
                                        "children": [
                                            {
                                                "type": "p",
                                                "children": [
                                                    {
                                                        "text": "3"
                                                    }
                                                ],
                                                "id": "GMQKQTTvsj"
                                            }
                                        ],
                                        "id": "DAS1pn6Ax8"
                                    },
                                    {
                                        "type": "td",
                                        "children": [
                                            {
                                                "type": "p",
                                                "children": [
                                                    {
                                                        "text": "1"
                                                    }
                                                ],
                                                "id": "hh7qRulifJ"
                                            }
                                        ],
                                        "id": "cuuuyVOlOt"
                                    }
                                ],
                                "id": "JkqJg5jlrj"
                            },
                            {
                                "type": "tr",
                                "children": [
                                    {
                                        "type": "td",
                                        "children": [
                                            {
                                                "type": "p",
                                                "children": [
                                                    {
                                                        "text": "Pro"
                                                    }
                                                ],
                                                "id": "d3oGvKV2MR"
                                            }
                                        ],
                                        "id": "W36wvt0936"
                                    },
                                    {
                                        "type": "td",
                                        "children": [
                                            {
                                                "type": "p",
                                                "children": [
                                                    {
                                                        "text": "$19 / mo"
                                                    }
                                                ],
                                                "id": "_wjO36Hdym"
                                            }
                                        ],
                                        "id": "-LqlqEEBKC"
                                    },
                                    {
                                        "type": "td",
                                        "children": [
                                            {
                                                "type": "p",
                                                "children": [
                                                    {
                                                        "text": "Unlimited"
                                                    }
                                                ],
                                                "id": "CerlYtIATP"
                                            }
                                        ],
                                        "id": "bFci2_9kdj"
                                    },
                                    {
                                        "type": "td",
                                        "children": [
                                            {
                                                "type": "p",
                                                "children": [
                                                    {
                                                        "text": "5"
                                                    }
                                                ],
                                                "id": "O_zLgGQH0v"
                                            }
                                        ],
                                        "id": "vOoYRYoa8l"
                                    }
                                ],
                                "id": "1jiYdb67Op"
                            },
                            {
                                "type": "tr",
                                "children": [
                                    {
                                        "type": "td",
                                        "children": [
                                            {
                                                "type": "p",
                                                "children": [
                                                    {
                                                        "text": "Team"
                                                    }
                                                ],
                                                "id": "dOCm8p4IJ-"
                                            }
                                        ],
                                        "id": "AyHte8U7Oj"
                                    },
                                    {
                                        "type": "td",
                                        "children": [
                                            {
                                                "type": "p",
                                                "children": [
                                                    {
                                                        "text": "$49 / mo"
                                                    }
                                                ],
                                                "id": "EAHIBbwoXC"
                                            }
                                        ],
                                        "id": "kxviYv5q8M"
                                    },
                                    {
                                        "type": "td",
                                        "children": [
                                            {
                                                "type": "p",
                                                "children": [
                                                    {
                                                        "text": "Unlimited"
                                                    }
                                                ],
                                                "id": "TAerMfdqcO"
                                            }
                                        ],
                                        "id": "8AhIKkA0xu"
                                    },
                                    {
                                        "type": "td",
                                        "children": [
                                            {
                                                "type": "p",
                                                "children": [
                                                    {
                                                        "text": "25"
                                                    }
                                                ],
                                                "id": "yQ69GY6O2D"
                                            }
                                        ],
                                        "id": "78WNpx7Vl4"
                                    }
                                ],
                                "id": "H4otSZRslL"
                            },
                            {
                                "type": "tr",
                                "children": [
                                    {
                                        "type": "td",
                                        "children": [
                                            {
                                                "type": "p",
                                                "children": [
                                                    {
                                                        "text": "Enterprise"
                                                    }
                                                ],
                                                "id": "VoUWptIuBI"
                                            }
                                        ],
                                        "id": "q4x4G_Xx2R"
                                    },
                                    {
                                        "type": "td",
                                        "children": [
                                            {
                                                "type": "p",
                                                "children": [
                                                    {
                                                        "text": "Custom"
                                                    }
                                                ],
                                                "id": "By983u6pxs"
                                            }
                                        ],
                                        "id": "EWNM1LXR61"
                                    },
                                    {
                                        "type": "td",
                                        "children": [
                                            {
                                                "type": "p",
                                                "children": [
                                                    {
                                                        "text": "Unlimited"
                                                    }
                                                ],
                                                "id": "k-MkY6INid"
                                            }
                                        ],
                                        "id": "fwN---MAiU"
                                    },
                                    {
                                        "type": "td",
                                        "children": [
                                            {
                                                "type": "p",
                                                "children": [
                                                    {
                                                        "text": "Unlimited"
                                                    }
                                                ],
                                                "id": "FTlL-K8mqM"
                                            }
                                        ],
                                        "id": "KjFfL3NIen"
                                    }
                                ],
                                "id": "8SDYjZ1fGj"
                            }
                        ],
                        "id": "dz7WAfNMWK"
                    },
                    {
                        "type": "h2",
                        "children": [
                            {
                                "text": "Security"
                            }
                        ],
                        "id": "V6Mw3ht67y"
                    },
                    {
                        "type": "p",
                        "children": [
                            {
                                "text": "All data is encrypted at rest (AES-256) and in transit (TLS 1.3). API keys are hashed with bcrypt and never stored in plaintext. Hyperdocs is SOC 2 Type II certified and GDPR compliant."
                            }
                        ],
                        "id": "ceqvf6aAFJ"
                    },
                    {
                        "type": "blockquote",
                        "children": [
                            {
                                "type": "p",
                                "children": [
                                    {
                                        "text": "We never store your source code beyond the time needed to generate documentation. Parsed ASTs are discarded after each sync."
                                    }
                                ],
                                "id": "6NvPILpzCt"
                            }
                        ],
                        "id": "rOm72_-YCp"
                    },
                    {
                        "type": "h2",
                        "children": [
                            {
                                "text": "Callout Examples"
                            }
                        ],
                        "id": "AFzYOSH5S7"
                    },
                    {
                        "type": "p",
                        "children": [
                            {
                                "text": "Callouts help highlight important information at a glance."
                            }
                        ],
                        "id": "asPGPbQa50"
                    },
                    {
                        "type": "callout",
                        "variant": "check",
                        "children": [
                            {
                                "text": "Your API key has been verified and your account is ready to use."
                            }
                        ],
                        "id": "CIhnLeKc0O"
                    },
                    {
                        "type": "callout",
                        "variant": "info",
                        "children": [
                            {
                                "text": "Hyperdocs supports OpenAPI v3, GraphQL SDL, and AsyncAPI out of the box."
                            }
                        ],
                        "id": "O4_g59yy0t"
                    },
                    {
                        "type": "callout",
                        "variant": "note",
                        "children": [
                            {
                                "text": "Rate limits are applied per API key, not per IP address."
                            }
                        ],
                        "id": "PKS_IlE_7_"
                    },
                    {
                        "type": "callout",
                        "variant": "tip",
                        "children": [
                            {
                                "text": "Use the hyperdocs generate --watch flag during development to auto-regenerate docs on file changes."
                            }
                        ],
                        "id": "pk20fJVmuo"
                    },
                    {
                        "type": "callout",
                        "variant": "warning",
                        "children": [
                            {
                                "text": "Rotating your API key will immediately invalidate the old key. Update all integrations before rotating."
                            }
                        ],
                        "id": "ccsvjRGwPc"
                    },
                    {
                        "type": "callout",
                        "variant": "danger",
                        "children": [
                            {
                                "text": "Deleting a project is permanent and cannot be undone. All pages, history, and settings will be lost."
                            }
                        ],
                        "id": "O4n8_IiAA0"
                    },
                    {
                        "type": "h2",
                        "children": [
                            {
                                "text": "Getting Help"
                            }
                        ],
                        "id": "0nzQOhxKrL"
                    },
                    {
                        "type": "p",
                        "children": [
                            {
                                "text": "We are here to help. Choose the channel that works best for you:"
                            }
                        ],
                        "id": "sDfDgEIa_7"
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "disc",
                        "children": [
                            {
                                "text": "GitHub Issues — bug reports and feature requests"
                            }
                        ],
                        "id": "h-XuGqEXtQ"
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "disc",
                        "children": [
                            {
                                "text": "Discord — real-time community support"
                            }
                        ],
                        "id": "TT1FZYJubP"
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "disc",
                        "children": [
                            {
                                "text": "Email support@hyperdocs.io — Pro and Enterprise customers"
                            }
                        ],
                        "id": "QfUD4wku0N"
                    },
                    {
                        "type": "blockquote",
                        "children": [
                            {
                                "type": "p",
                                "children": [
                                    {
                                        "text": "If you run into issues, open a GitHub issue or reach out on Discord. We respond within 24 hours."
                                    }
                                ],
                                "id": "RatlM04_e8"
                            }
                        ],
                        "id": "5OWTTa7qlM"
                    }
                ]
            },
            {
                "id": "p-installation",
                "title": "Installation",
                "slug": "installation",
                "type": "page",
                "content": [
                    {
                        "type": "h1",
                        "children": [
                            {
                                "text": "Installation"
                            }
                        ]
                    },
                    {
                        "type": "p",
                        "children": [
                            {
                                "text": "Install the Hyperdocs SDK using your preferred package manager."
                            }
                        ]
                    },
                    {
                        "type": "code_block",
                        "lang": "bash",
                        "children": [
                            {
                                "type": "code_line",
                                "children": [
                                    {
                                        "text": "npm install @hyperdocs/sdk"
                                    }
                                ]
                            },
                            {
                                "type": "code_line",
                                "children": [
                                    {
                                        "text": "# or"
                                    }
                                ]
                            },
                            {
                                "type": "code_line",
                                "children": [
                                    {
                                        "text": "yarn add @hyperdocs/sdk"
                                    }
                                ]
                            },
                            {
                                "type": "code_line",
                                "children": [
                                    {
                                        "text": "# or"
                                    }
                                ]
                            },
                            {
                                "type": "code_line",
                                "children": [
                                    {
                                        "text": "pnpm add @hyperdocs/sdk"
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "type": "h2",
                        "children": [
                            {
                                "text": "Requirements"
                            }
                        ]
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "disc",
                        "children": [
                            {
                                "text": "Node.js 18 or higher"
                            }
                        ]
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "disc",
                        "children": [
                            {
                                "text": "A Hyperdocs account with API access"
                            }
                        ]
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "disc",
                        "children": [
                            {
                                "text": "An API key from your dashboard"
                            }
                        ]
                    },
                    {
                        "type": "h2",
                        "children": [
                            {
                                "text": "Initialise the SDK"
                            }
                        ]
                    },
                    {
                        "type": "code_block",
                        "lang": "typescript",
                        "children": [
                            {
                                "type": "code_line",
                                "children": [
                                    {
                                        "text": "import { Hyperdocs } from '@hyperdocs/sdk'"
                                    }
                                ]
                            },
                            {
                                "type": "code_line",
                                "children": [
                                    {
                                        "text": ""
                                    }
                                ]
                            },
                            {
                                "type": "code_line",
                                "children": [
                                    {
                                        "text": "const client = new Hyperdocs({"
                                    }
                                ]
                            },
                            {
                                "type": "code_line",
                                "children": [
                                    {
                                        "text": "  apiKey: process.env.HYPERDOCS_API_KEY,"
                                    }
                                ]
                            },
                            {
                                "type": "code_line",
                                "children": [
                                    {
                                        "text": "  projectId: 'proj_your_project_id',"
                                    }
                                ]
                            },
                            {
                                "type": "code_line",
                                "children": [
                                    {
                                        "text": "})"
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                "id": "p-concepts",
                "title": "Core Concepts",
                "slug": "core-concepts",
                "type": "page",
                "content": [
                    {
                        "type": "h1",
                        "children": [
                            {
                                "text": "Core Concepts"
                            }
                        ]
                    },
                    {
                        "type": "p",
                        "children": [
                            {
                                "text": "Understanding a few key ideas will help you get the most out of Hyperdocs."
                            }
                        ]
                    },
                    {
                        "type": "h2",
                        "children": [
                            {
                                "text": "Projects"
                            }
                        ]
                    },
                    {
                        "type": "p",
                        "children": [
                            {
                                "text": "A project represents one documentation site. Each project maps to a single repository and has its own custom domain, navigation structure, and access controls."
                            }
                        ]
                    },
                    {
                        "type": "h2",
                        "children": [
                            {
                                "text": "Versions"
                            }
                        ]
                    },
                    {
                        "type": "p",
                        "children": [
                            {
                                "text": "Every time you publish, Hyperdocs creates a versioned snapshot. You can expose multiple versions simultaneously and let readers switch between them."
                            }
                        ]
                    },
                    {
                        "type": "h2",
                        "children": [
                            {
                                "text": "Blocks"
                            }
                        ]
                    },
                    {
                        "type": "p",
                        "children": [
                            {
                                "text": "Content is stored as structured blocks (headings, paragraphs, code, tables, callouts) rather than raw markdown. This enables rich editing, search indexing, and AI re-generation without loss of formatting."
                            }
                        ]
                    },
                    {
                        "type": "h2",
                        "children": [
                            {
                                "text": "Sync Engine"
                            }
                        ]
                    },
                    {
                        "type": "p",
                        "children": [
                            {
                                "text": "The sync engine listens for webhook events from your Git provider. On each push, it diffs only the changed files and updates the affected doc pages, keeping build times fast even in large repos."
                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        "id": "f-api-reference",
        "title": "API Reference",
        "slug": "api-reference",
        "type": "folder",
        "children": [
            {
                "id": "p-authentication",
                "title": "Authentication",
                "slug": "authentication",
                "type": "page",
                "content": [
                    {
                        "type": "h1",
                        "children": [
                            {
                                "text": "Authentication"
                            }
                        ]
                    },
                    {
                        "type": "p",
                        "children": [
                            {
                                "text": "All API requests require a Bearer token in the Authorization header."
                            }
                        ]
                    },
                    {
                        "type": "code_block",
                        "lang": "bash",
                        "children": [
                            {
                                "type": "code_line",
                                "children": [
                                    {
                                        "text": "curl -H \"Authorization: Bearer YOUR_API_KEY\" \\"
                                    }
                                ]
                            },
                            {
                                "type": "code_line",
                                "children": [
                                    {
                                        "text": "     https://api.hyperdocs.io/v1/projects"
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "type": "h2",
                        "children": [
                            {
                                "text": "Generating an API Key"
                            }
                        ]
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "decimal",
                        "children": [
                            {
                                "text": "Log in to your Hyperdocs dashboard"
                            }
                        ]
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "decimal",
                        "children": [
                            {
                                "text": "Navigate to Settings → API Keys"
                            }
                        ]
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "decimal",
                        "children": [
                            {
                                "text": "Click \"Generate New Key\""
                            }
                        ]
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "decimal",
                        "children": [
                            {
                                "text": "Copy and store the key securely — it will only be shown once"
                            }
                        ]
                    },
                    {
                        "type": "h2",
                        "children": [
                            {
                                "text": "Rate Limits"
                            }
                        ]
                    },
                    {
                        "type": "table",
                        "children": [
                            {
                                "type": "tr",
                                "children": [
                                    {
                                        "type": "th",
                                        "children": [
                                            {
                                                "type": "p",
                                                "children": [
                                                    {
                                                        "text": "Plan"
                                                    }
                                                ]
                                            }
                                        ]
                                    },
                                    {
                                        "type": "th",
                                        "children": [
                                            {
                                                "type": "p",
                                                "children": [
                                                    {
                                                        "text": "Requests / min"
                                                    }
                                                ]
                                            }
                                        ]
                                    },
                                    {
                                        "type": "th",
                                        "children": [
                                            {
                                                "type": "p",
                                                "children": [
                                                    {
                                                        "text": "Requests / day"
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                "type": "tr",
                                "children": [
                                    {
                                        "type": "td",
                                        "children": [
                                            {
                                                "type": "p",
                                                "children": [
                                                    {
                                                        "text": "Free"
                                                    }
                                                ]
                                            }
                                        ]
                                    },
                                    {
                                        "type": "td",
                                        "children": [
                                            {
                                                "type": "p",
                                                "children": [
                                                    {
                                                        "text": "60"
                                                    }
                                                ]
                                            }
                                        ]
                                    },
                                    {
                                        "type": "td",
                                        "children": [
                                            {
                                                "type": "p",
                                                "children": [
                                                    {
                                                        "text": "1,000"
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                "type": "tr",
                                "children": [
                                    {
                                        "type": "td",
                                        "children": [
                                            {
                                                "type": "p",
                                                "children": [
                                                    {
                                                        "text": "Pro"
                                                    }
                                                ]
                                            }
                                        ]
                                    },
                                    {
                                        "type": "td",
                                        "children": [
                                            {
                                                "type": "p",
                                                "children": [
                                                    {
                                                        "text": "300"
                                                    }
                                                ]
                                            }
                                        ]
                                    },
                                    {
                                        "type": "td",
                                        "children": [
                                            {
                                                "type": "p",
                                                "children": [
                                                    {
                                                        "text": "50,000"
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                "type": "tr",
                                "children": [
                                    {
                                        "type": "td",
                                        "children": [
                                            {
                                                "type": "p",
                                                "children": [
                                                    {
                                                        "text": "Enterprise"
                                                    }
                                                ]
                                            }
                                        ]
                                    },
                                    {
                                        "type": "td",
                                        "children": [
                                            {
                                                "type": "p",
                                                "children": [
                                                    {
                                                        "text": "Unlimited"
                                                    }
                                                ]
                                            }
                                        ]
                                    },
                                    {
                                        "type": "td",
                                        "children": [
                                            {
                                                "type": "p",
                                                "children": [
                                                    {
                                                        "text": "Unlimited"
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                "id": "p-errors",
                "title": "Error Codes",
                "slug": "error-codes",
                "type": "page",
                "content": [
                    {
                        "type": "h1",
                        "children": [
                            {
                                "text": "Error Codes"
                            }
                        ]
                    },
                    {
                        "type": "p",
                        "children": [
                            {
                                "text": "The Hyperdocs API uses conventional HTTP response codes. Codes in the 2xx range indicate success, 4xx indicate a client error, and 5xx indicate a server error."
                            }
                        ]
                    },
                    {
                        "type": "h2",
                        "children": [
                            {
                                "text": "Error Response Shape"
                            }
                        ]
                    },
                    {
                        "type": "code_block",
                        "lang": "json",
                        "children": [
                            {
                                "type": "code_line",
                                "children": [
                                    {
                                        "text": "{"
                                    }
                                ]
                            },
                            {
                                "type": "code_line",
                                "children": [
                                    {
                                        "text": "  \"error\": {"
                                    }
                                ]
                            },
                            {
                                "type": "code_line",
                                "children": [
                                    {
                                        "text": "    \"code\": \"not_found\","
                                    }
                                ]
                            },
                            {
                                "type": "code_line",
                                "children": [
                                    {
                                        "text": "    \"message\": \"The requested resource was not found.\","
                                    }
                                ]
                            },
                            {
                                "type": "code_line",
                                "children": [
                                    {
                                        "text": "    \"status\": 404"
                                    }
                                ]
                            },
                            {
                                "type": "code_line",
                                "children": [
                                    {
                                        "text": "  }"
                                    }
                                ]
                            },
                            {
                                "type": "code_line",
                                "children": [
                                    {
                                        "text": "}"
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "type": "h2",
                        "children": [
                            {
                                "text": "Common Codes"
                            }
                        ]
                    },
                    {
                        "type": "table",
                        "children": [
                            {
                                "type": "tr",
                                "children": [
                                    {
                                        "type": "th",
                                        "children": [
                                            {
                                                "type": "p",
                                                "children": [
                                                    {
                                                        "text": "Code"
                                                    }
                                                ]
                                            }
                                        ]
                                    },
                                    {
                                        "type": "th",
                                        "children": [
                                            {
                                                "type": "p",
                                                "children": [
                                                    {
                                                        "text": "HTTP Status"
                                                    }
                                                ]
                                            }
                                        ]
                                    },
                                    {
                                        "type": "th",
                                        "children": [
                                            {
                                                "type": "p",
                                                "children": [
                                                    {
                                                        "text": "Description"
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                "type": "tr",
                                "children": [
                                    {
                                        "type": "td",
                                        "children": [
                                            {
                                                "type": "p",
                                                "children": [
                                                    {
                                                        "text": "unauthorized"
                                                    }
                                                ]
                                            }
                                        ]
                                    },
                                    {
                                        "type": "td",
                                        "children": [
                                            {
                                                "type": "p",
                                                "children": [
                                                    {
                                                        "text": "401"
                                                    }
                                                ]
                                            }
                                        ]
                                    },
                                    {
                                        "type": "td",
                                        "children": [
                                            {
                                                "type": "p",
                                                "children": [
                                                    {
                                                        "text": "Missing or invalid API key"
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                "type": "tr",
                                "children": [
                                    {
                                        "type": "td",
                                        "children": [
                                            {
                                                "type": "p",
                                                "children": [
                                                    {
                                                        "text": "forbidden"
                                                    }
                                                ]
                                            }
                                        ]
                                    },
                                    {
                                        "type": "td",
                                        "children": [
                                            {
                                                "type": "p",
                                                "children": [
                                                    {
                                                        "text": "403"
                                                    }
                                                ]
                                            }
                                        ]
                                    },
                                    {
                                        "type": "td",
                                        "children": [
                                            {
                                                "type": "p",
                                                "children": [
                                                    {
                                                        "text": "Insufficient permissions"
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                "type": "tr",
                                "children": [
                                    {
                                        "type": "td",
                                        "children": [
                                            {
                                                "type": "p",
                                                "children": [
                                                    {
                                                        "text": "not_found"
                                                    }
                                                ]
                                            }
                                        ]
                                    },
                                    {
                                        "type": "td",
                                        "children": [
                                            {
                                                "type": "p",
                                                "children": [
                                                    {
                                                        "text": "404"
                                                    }
                                                ]
                                            }
                                        ]
                                    },
                                    {
                                        "type": "td",
                                        "children": [
                                            {
                                                "type": "p",
                                                "children": [
                                                    {
                                                        "text": "Resource does not exist"
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                "type": "tr",
                                "children": [
                                    {
                                        "type": "td",
                                        "children": [
                                            {
                                                "type": "p",
                                                "children": [
                                                    {
                                                        "text": "rate_limited"
                                                    }
                                                ]
                                            }
                                        ]
                                    },
                                    {
                                        "type": "td",
                                        "children": [
                                            {
                                                "type": "p",
                                                "children": [
                                                    {
                                                        "text": "429"
                                                    }
                                                ]
                                            }
                                        ]
                                    },
                                    {
                                        "type": "td",
                                        "children": [
                                            {
                                                "type": "p",
                                                "children": [
                                                    {
                                                        "text": "Too many requests"
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                "id": "f-endpoints",
                "title": "Endpoints",
                "slug": "endpoints",
                "type": "folder",
                "children": [
                    {
                        "id": "p-users",
                        "title": "Users",
                        "slug": "users",
                        "type": "page",
                        "content": [
                            {
                                "type": "h1",
                                "children": [
                                    {
                                        "text": "Users API"
                                    }
                                ]
                            },
                            {
                                "type": "p",
                                "children": [
                                    {
                                        "text": "Manage users in your organization."
                                    }
                                ]
                            },
                            {
                                "type": "h2",
                                "children": [
                                    {
                                        "text": "List Users"
                                    }
                                ]
                            },
                            {
                                "type": "p",
                                "children": [
                                    {
                                        "text": "Returns all users in the organization."
                                    }
                                ]
                            },
                            {
                                "type": "code_block",
                                "lang": "http",
                                "children": [
                                    {
                                        "type": "code_line",
                                        "children": [
                                            {
                                                "text": "GET /v1/users"
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                "type": "h2",
                                "children": [
                                    {
                                        "text": "Create User"
                                    }
                                ]
                            },
                            {
                                "type": "code_block",
                                "lang": "http",
                                "children": [
                                    {
                                        "type": "code_line",
                                        "children": [
                                            {
                                                "text": "POST /v1/users"
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "id": "p-projects",
                        "title": "Projects",
                        "slug": "projects",
                        "type": "page",
                        "content": [
                            {
                                "type": "h1",
                                "children": [
                                    {
                                        "text": "Projects API"
                                    }
                                ]
                            },
                            {
                                "type": "p",
                                "children": [
                                    {
                                        "text": "Create, update, and manage documentation projects."
                                    }
                                ]
                            },
                            {
                                "type": "h2",
                                "children": [
                                    {
                                        "text": "List Projects"
                                    }
                                ]
                            },
                            {
                                "type": "code_block",
                                "lang": "http",
                                "children": [
                                    {
                                        "type": "code_line",
                                        "children": [
                                            {
                                                "text": "GET /v1/projects"
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                "type": "h2",
                                "children": [
                                    {
                                        "text": "Create Project"
                                    }
                                ]
                            },
                            {
                                "type": "code_block",
                                "lang": "http",
                                "children": [
                                    {
                                        "type": "code_line",
                                        "children": [
                                            {
                                                "text": "POST /v1/projects"
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                "type": "code_block",
                                "lang": "json",
                                "children": [
                                    {
                                        "type": "code_line",
                                        "children": [
                                            {
                                                "text": "{"
                                            }
                                        ]
                                    },
                                    {
                                        "type": "code_line",
                                        "children": [
                                            {
                                                "text": "  \"name\": \"My Project\","
                                            }
                                        ]
                                    },
                                    {
                                        "type": "code_line",
                                        "children": [
                                            {
                                                "text": "  \"repo\": \"github.com/acme/backend\","
                                            }
                                        ]
                                    },
                                    {
                                        "type": "code_line",
                                        "children": [
                                            {
                                                "text": "  \"branch\": \"main\""
                                            }
                                        ]
                                    },
                                    {
                                        "type": "code_line",
                                        "children": [
                                            {
                                                "text": "}"
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "id": "p-webhooks",
                        "title": "Webhooks",
                        "slug": "webhooks",
                        "type": "page",
                        "content": [
                            {
                                "type": "h1",
                                "children": [
                                    {
                                        "text": "Webhooks"
                                    }
                                ]
                            },
                            {
                                "type": "p",
                                "children": [
                                    {
                                        "text": "Receive real-time notifications when documentation events occur."
                                    }
                                ]
                            },
                            {
                                "type": "h2",
                                "children": [
                                    {
                                        "text": "Available Events"
                                    }
                                ]
                            },
                            {
                                "type": "p",
                                "indent": 1,
                                "listStyleType": "disc",
                                "children": [
                                    {
                                        "text": "page.published — a page was published"
                                    }
                                ]
                            },
                            {
                                "type": "p",
                                "indent": 1,
                                "listStyleType": "disc",
                                "children": [
                                    {
                                        "text": "page.updated — a page was edited"
                                    }
                                ]
                            },
                            {
                                "type": "p",
                                "indent": 1,
                                "listStyleType": "disc",
                                "children": [
                                    {
                                        "text": "project.synced — a repo sync completed"
                                    }
                                ]
                            },
                            {
                                "type": "h2",
                                "children": [
                                    {
                                        "text": "Register a Webhook"
                                    }
                                ]
                            },
                            {
                                "type": "code_block",
                                "lang": "http",
                                "children": [
                                    {
                                        "type": "code_line",
                                        "children": [
                                            {
                                                "text": "POST /v1/webhooks"
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                "type": "code_block",
                                "lang": "json",
                                "children": [
                                    {
                                        "type": "code_line",
                                        "children": [
                                            {
                                                "text": "{"
                                            }
                                        ]
                                    },
                                    {
                                        "type": "code_line",
                                        "children": [
                                            {
                                                "text": "  \"url\": \"https://yourapp.com/webhooks/hyperdocs\","
                                            }
                                        ]
                                    },
                                    {
                                        "type": "code_line",
                                        "children": [
                                            {
                                                "text": "  \"events\": [\"page.published\", \"project.synced\"]"
                                            }
                                        ]
                                    },
                                    {
                                        "type": "code_line",
                                        "children": [
                                            {
                                                "text": "}"
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        "id": "f-guides",
        "title": "Guides",
        "slug": "guides",
        "type": "folder",
        "children": [
            {
                "id": "p-deployment",
                "title": "Deployment",
                "slug": "deployment",
                "type": "page",
                "content": [
                    {
                        "type": "h1",
                        "children": [
                            {
                                "text": "Deployment"
                            }
                        ]
                    },
                    {
                        "type": "p",
                        "children": [
                            {
                                "text": "Deploy your documentation site using the Hyperdocs CLI or connect your CI/CD pipeline for automatic publishing on every push."
                            }
                        ]
                    },
                    {
                        "type": "h2",
                        "children": [
                            {
                                "text": "Using the CLI"
                            }
                        ]
                    },
                    {
                        "type": "code_block",
                        "lang": "bash",
                        "children": [
                            {
                                "type": "code_line",
                                "children": [
                                    {
                                        "text": "npx hyperdocs deploy --env production"
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "type": "h2",
                        "children": [
                            {
                                "text": "GitHub Actions"
                            }
                        ]
                    },
                    {
                        "type": "code_block",
                        "lang": "yaml",
                        "children": [
                            {
                                "type": "code_line",
                                "children": [
                                    {
                                        "text": "name: Deploy Docs"
                                    }
                                ]
                            },
                            {
                                "type": "code_line",
                                "children": [
                                    {
                                        "text": "on:"
                                    }
                                ]
                            },
                            {
                                "type": "code_line",
                                "children": [
                                    {
                                        "text": "  push:"
                                    }
                                ]
                            },
                            {
                                "type": "code_line",
                                "children": [
                                    {
                                        "text": "    branches: [main]"
                                    }
                                ]
                            },
                            {
                                "type": "code_line",
                                "children": [
                                    {
                                        "text": "jobs:"
                                    }
                                ]
                            },
                            {
                                "type": "code_line",
                                "children": [
                                    {
                                        "text": "  deploy:"
                                    }
                                ]
                            },
                            {
                                "type": "code_line",
                                "children": [
                                    {
                                        "text": "    runs-on: ubuntu-latest"
                                    }
                                ]
                            },
                            {
                                "type": "code_line",
                                "children": [
                                    {
                                        "text": "    steps:"
                                    }
                                ]
                            },
                            {
                                "type": "code_line",
                                "children": [
                                    {
                                        "text": "      - uses: hyperdocs/deploy-action@v2"
                                    }
                                ]
                            },
                            {
                                "type": "code_line",
                                "children": [
                                    {
                                        "text": "        with:"
                                    }
                                ]
                            },
                            {
                                "type": "code_line",
                                "children": [
                                    {
                                        "text": "          api-key: ${{ secrets.HYPERDOCS_API_KEY }}"
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "type": "h2",
                        "children": [
                            {
                                "text": "Environment Variables"
                            }
                        ]
                    },
                    {
                        "type": "table",
                        "children": [
                            {
                                "type": "tr",
                                "children": [
                                    {
                                        "type": "th",
                                        "children": [
                                            {
                                                "type": "p",
                                                "children": [
                                                    {
                                                        "text": "Variable"
                                                    }
                                                ]
                                            }
                                        ]
                                    },
                                    {
                                        "type": "th",
                                        "children": [
                                            {
                                                "type": "p",
                                                "children": [
                                                    {
                                                        "text": "Required"
                                                    }
                                                ]
                                            }
                                        ]
                                    },
                                    {
                                        "type": "th",
                                        "children": [
                                            {
                                                "type": "p",
                                                "children": [
                                                    {
                                                        "text": "Description"
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                "type": "tr",
                                "children": [
                                    {
                                        "type": "td",
                                        "children": [
                                            {
                                                "type": "p",
                                                "children": [
                                                    {
                                                        "text": "HYPERDOCS_API_KEY"
                                                    }
                                                ]
                                            }
                                        ]
                                    },
                                    {
                                        "type": "td",
                                        "children": [
                                            {
                                                "type": "p",
                                                "children": [
                                                    {
                                                        "text": "Yes"
                                                    }
                                                ]
                                            }
                                        ]
                                    },
                                    {
                                        "type": "td",
                                        "children": [
                                            {
                                                "type": "p",
                                                "children": [
                                                    {
                                                        "text": "Your API key"
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                "type": "tr",
                                "children": [
                                    {
                                        "type": "td",
                                        "children": [
                                            {
                                                "type": "p",
                                                "children": [
                                                    {
                                                        "text": "HYPERDOCS_PROJECT_ID"
                                                    }
                                                ]
                                            }
                                        ]
                                    },
                                    {
                                        "type": "td",
                                        "children": [
                                            {
                                                "type": "p",
                                                "children": [
                                                    {
                                                        "text": "Yes"
                                                    }
                                                ]
                                            }
                                        ]
                                    },
                                    {
                                        "type": "td",
                                        "children": [
                                            {
                                                "type": "p",
                                                "children": [
                                                    {
                                                        "text": "Your project ID"
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                "id": "p-configuration",
                "title": "Configuration",
                "slug": "configuration",
                "type": "page",
                "content": [
                    {
                        "type": "h1",
                        "children": [
                            {
                                "text": "Configuration"
                            }
                        ]
                    },
                    {
                        "type": "p",
                        "children": [
                            {
                                "text": "Configure Hyperdocs using a hyperdocs.config.ts file in the root of your repository."
                            }
                        ]
                    },
                    {
                        "type": "code_block",
                        "lang": "typescript",
                        "children": [
                            {
                                "type": "code_line",
                                "children": [
                                    {
                                        "text": "import { defineConfig } from '@hyperdocs/sdk'"
                                    }
                                ]
                            },
                            {
                                "type": "code_line",
                                "children": [
                                    {
                                        "text": ""
                                    }
                                ]
                            },
                            {
                                "type": "code_line",
                                "children": [
                                    {
                                        "text": "export default defineConfig({"
                                    }
                                ]
                            },
                            {
                                "type": "code_line",
                                "children": [
                                    {
                                        "text": "  name: 'My API Docs',"
                                    }
                                ]
                            },
                            {
                                "type": "code_line",
                                "children": [
                                    {
                                        "text": "  logo: '/logo.svg',"
                                    }
                                ]
                            },
                            {
                                "type": "code_line",
                                "children": [
                                    {
                                        "text": "  primaryColor: '#f26522',"
                                    }
                                ]
                            },
                            {
                                "type": "code_line",
                                "children": [
                                    {
                                        "text": "  domain: 'docs.myapp.com',"
                                    }
                                ]
                            },
                            {
                                "type": "code_line",
                                "children": [
                                    {
                                        "text": "  nav: ["
                                    }
                                ]
                            },
                            {
                                "type": "code_line",
                                "children": [
                                    {
                                        "text": "    { label: 'Docs', href: '/getting-started' },"
                                    }
                                ]
                            },
                            {
                                "type": "code_line",
                                "children": [
                                    {
                                        "text": "    { label: 'API', href: '/api-reference' },"
                                    }
                                ]
                            },
                            {
                                "type": "code_line",
                                "children": [
                                    {
                                        "text": "  ],"
                                    }
                                ]
                            },
                            {
                                "type": "code_line",
                                "children": [
                                    {
                                        "text": "})"
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "type": "h2",
                        "children": [
                            {
                                "text": "Config Options"
                            }
                        ]
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "disc",
                        "children": [
                            {
                                "text": "name — the display name of your docs site"
                            }
                        ]
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "disc",
                        "children": [
                            {
                                "text": "logo — path to your logo image"
                            }
                        ]
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "disc",
                        "children": [
                            {
                                "text": "primaryColor — brand hex color"
                            }
                        ]
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "disc",
                        "children": [
                            {
                                "text": "domain — custom domain for your docs"
                            }
                        ]
                    }
                ]
            },
            {
                "id": "p-custom-domain",
                "title": "Custom Domain",
                "slug": "custom-domain",
                "type": "page",
                "content": [
                    {
                        "type": "h1",
                        "children": [
                            {
                                "text": "Custom Domain"
                            }
                        ]
                    },
                    {
                        "type": "p",
                        "children": [
                            {
                                "text": "Point your own domain to your Hyperdocs site in three steps."
                            }
                        ]
                    },
                    {
                        "type": "h2",
                        "children": [
                            {
                                "text": "Step 1 — Add the domain"
                            }
                        ]
                    },
                    {
                        "type": "p",
                        "children": [
                            {
                                "text": "Go to your project Settings → Domains and enter your custom domain."
                            }
                        ]
                    },
                    {
                        "type": "h2",
                        "children": [
                            {
                                "text": "Step 2 — Configure DNS"
                            }
                        ]
                    },
                    {
                        "type": "p",
                        "children": [
                            {
                                "text": "Add a CNAME record pointing to your Hyperdocs subdomain."
                            }
                        ]
                    },
                    {
                        "type": "table",
                        "children": [
                            {
                                "type": "tr",
                                "children": [
                                    {
                                        "type": "th",
                                        "children": [
                                            {
                                                "type": "p",
                                                "children": [
                                                    {
                                                        "text": "Type"
                                                    }
                                                ]
                                            }
                                        ]
                                    },
                                    {
                                        "type": "th",
                                        "children": [
                                            {
                                                "type": "p",
                                                "children": [
                                                    {
                                                        "text": "Name"
                                                    }
                                                ]
                                            }
                                        ]
                                    },
                                    {
                                        "type": "th",
                                        "children": [
                                            {
                                                "type": "p",
                                                "children": [
                                                    {
                                                        "text": "Value"
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                "type": "tr",
                                "children": [
                                    {
                                        "type": "td",
                                        "children": [
                                            {
                                                "type": "p",
                                                "children": [
                                                    {
                                                        "text": "CNAME"
                                                    }
                                                ]
                                            }
                                        ]
                                    },
                                    {
                                        "type": "td",
                                        "children": [
                                            {
                                                "type": "p",
                                                "children": [
                                                    {
                                                        "text": "docs"
                                                    }
                                                ]
                                            }
                                        ]
                                    },
                                    {
                                        "type": "td",
                                        "children": [
                                            {
                                                "type": "p",
                                                "children": [
                                                    {
                                                        "text": "your-project.hyperdocs.io"
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "type": "h2",
                        "children": [
                            {
                                "text": "Step 3 — SSL"
                            }
                        ]
                    },
                    {
                        "type": "p",
                        "children": [
                            {
                                "text": "SSL is provisioned automatically via Let's Encrypt within a few minutes of DNS propagation."
                            }
                        ]
                    }
                ]
            },
            {
                "id": "p-search",
                "title": "Search",
                "slug": "search",
                "type": "page",
                "content": [
                    {
                        "type": "h1",
                        "children": [
                            {
                                "text": "Search"
                            }
                        ]
                    },
                    {
                        "type": "p",
                        "children": [
                            {
                                "text": "Hyperdocs provides full-text search across all pages. No additional configuration is required — search is enabled by default for all projects."
                            }
                        ]
                    },
                    {
                        "type": "h2",
                        "children": [
                            {
                                "text": "How It Works"
                            }
                        ]
                    },
                    {
                        "type": "p",
                        "children": [
                            {
                                "text": "Content is indexed automatically after each publish. The search index is updated incrementally — only changed pages are re-indexed, keeping publish times fast."
                            }
                        ]
                    },
                    {
                        "type": "h2",
                        "children": [
                            {
                                "text": "Keyboard Shortcut"
                            }
                        ]
                    },
                    {
                        "type": "p",
                        "children": [
                            {
                                "text": "Press ⌘K (Mac) or Ctrl+K (Windows) anywhere on your docs site to open the search modal."
                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        "id": "f-tutorials",
        "title": "Tutorials",
        "slug": "tutorials",
        "type": "folder",
        "children": [
            {
                "id": "p-tut-first-site",
                "title": "Build Your First Docs Site",
                "slug": "first-docs-site",
                "type": "page",
                "content": [
                    {
                        "type": "h1",
                        "children": [
                            {
                                "text": "Build Your First Docs Site"
                            }
                        ]
                    },
                    {
                        "type": "p",
                        "children": [
                            {
                                "text": "This tutorial walks you through creating a complete documentation site from scratch using Hyperdocs, from connecting your repository to publishing a live URL."
                            }
                        ]
                    },
                    {
                        "type": "h2",
                        "children": [
                            {
                                "text": "Prerequisites"
                            }
                        ]
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "disc",
                        "children": [
                            {
                                "text": "A GitHub account with at least one repository"
                            }
                        ]
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "disc",
                        "children": [
                            {
                                "text": "Node.js 18+ installed locally"
                            }
                        ]
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "disc",
                        "children": [
                            {
                                "text": "A free Hyperdocs account"
                            }
                        ]
                    },
                    {
                        "type": "h2",
                        "children": [
                            {
                                "text": "Step 1 — Create a Project"
                            }
                        ]
                    },
                    {
                        "type": "p",
                        "children": [
                            {
                                "text": "Log in to your Hyperdocs dashboard and click New Project. Enter a name and select your repository from the GitHub integration list."
                            }
                        ]
                    },
                    {
                        "type": "h2",
                        "children": [
                            {
                                "text": "Step 2 — Run the Generator"
                            }
                        ]
                    },
                    {
                        "type": "p",
                        "children": [
                            {
                                "text": "Once your project is linked, click Generate. The AI pipeline will scan your repository and produce an initial doc structure within a few minutes."
                            }
                        ]
                    },
                    {
                        "type": "h2",
                        "children": [
                            {
                                "text": "Step 3 — Edit and Organise"
                            }
                        ]
                    },
                    {
                        "type": "p",
                        "children": [
                            {
                                "text": "Use the editor to review the generated pages. Drag and drop items in the sidebar to reorganise, and click any page to edit its content."
                            }
                        ]
                    },
                    {
                        "type": "h2",
                        "children": [
                            {
                                "text": "Step 4 — Publish"
                            }
                        ]
                    },
                    {
                        "type": "code_block",
                        "lang": "bash",
                        "children": [
                            {
                                "type": "code_line",
                                "children": [
                                    {
                                        "text": "hyperdocs deploy --env production"
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                "id": "p-tut-cicd",
                "title": "CI/CD Integration",
                "slug": "cicd-integration",
                "type": "page",
                "content": [
                    {
                        "type": "h1",
                        "children": [
                            {
                                "text": "CI/CD Integration"
                            }
                        ]
                    },
                    {
                        "type": "p",
                        "children": [
                            {
                                "text": "Automate your documentation deployment so docs are always published on every merge to main."
                            }
                        ]
                    },
                    {
                        "type": "h2",
                        "children": [
                            {
                                "text": "GitHub Actions"
                            }
                        ]
                    },
                    {
                        "type": "code_block",
                        "lang": "yaml",
                        "children": [
                            {
                                "type": "code_line",
                                "children": [
                                    {
                                        "text": "name: Publish Docs"
                                    }
                                ]
                            },
                            {
                                "type": "code_line",
                                "children": [
                                    {
                                        "text": "on: { push: { branches: [main] } }"
                                    }
                                ]
                            },
                            {
                                "type": "code_line",
                                "children": [
                                    {
                                        "text": "jobs:"
                                    }
                                ]
                            },
                            {
                                "type": "code_line",
                                "children": [
                                    {
                                        "text": "  publish:"
                                    }
                                ]
                            },
                            {
                                "type": "code_line",
                                "children": [
                                    {
                                        "text": "    runs-on: ubuntu-latest"
                                    }
                                ]
                            },
                            {
                                "type": "code_line",
                                "children": [
                                    {
                                        "text": "    steps:"
                                    }
                                ]
                            },
                            {
                                "type": "code_line",
                                "children": [
                                    {
                                        "text": "      - uses: actions/checkout@v4"
                                    }
                                ]
                            },
                            {
                                "type": "code_line",
                                "children": [
                                    {
                                        "text": "      - uses: hyperdocs/deploy-action@v2"
                                    }
                                ]
                            },
                            {
                                "type": "code_line",
                                "children": [
                                    {
                                        "text": "        with: { api-key: \"${{ secrets.HYPERDOCS_KEY }}\" }"
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "type": "h2",
                        "children": [
                            {
                                "text": "GitLab CI"
                            }
                        ]
                    },
                    {
                        "type": "code_block",
                        "lang": "yaml",
                        "children": [
                            {
                                "type": "code_line",
                                "children": [
                                    {
                                        "text": "deploy-docs:"
                                    }
                                ]
                            },
                            {
                                "type": "code_line",
                                "children": [
                                    {
                                        "text": "  stage: deploy"
                                    }
                                ]
                            },
                            {
                                "type": "code_line",
                                "children": [
                                    {
                                        "text": "  only: [main]"
                                    }
                                ]
                            },
                            {
                                "type": "code_line",
                                "children": [
                                    {
                                        "text": "  script:"
                                    }
                                ]
                            },
                            {
                                "type": "code_line",
                                "children": [
                                    {
                                        "text": "    - npm install -g @hyperdocs/cli"
                                    }
                                ]
                            },
                            {
                                "type": "code_line",
                                "children": [
                                    {
                                        "text": "    - hyperdocs deploy"
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                "id": "p-tut-team",
                "title": "Team Workflow",
                "slug": "team-workflow",
                "type": "page",
                "content": [
                    {
                        "type": "h1",
                        "children": [
                            {
                                "text": "Team Workflow"
                            }
                        ]
                    },
                    {
                        "type": "p",
                        "children": [
                            {
                                "text": "Hyperdocs is built for teams. Multiple people can edit docs simultaneously, with changes synced in real time and a full audit trail."
                            }
                        ]
                    },
                    {
                        "type": "h2",
                        "children": [
                            {
                                "text": "Inviting Team Members"
                            }
                        ]
                    },
                    {
                        "type": "p",
                        "children": [
                            {
                                "text": "Go to Project Settings → Team and invite members by email. You can assign one of three roles:"
                            }
                        ]
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "disc",
                        "children": [
                            {
                                "text": "Viewer — read-only access to all pages"
                            }
                        ]
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "disc",
                        "children": [
                            {
                                "text": "Editor — can create and edit pages"
                            }
                        ]
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "disc",
                        "children": [
                            {
                                "text": "Admin — full access including publishing and settings"
                            }
                        ]
                    },
                    {
                        "type": "h2",
                        "children": [
                            {
                                "text": "Review & Approval"
                            }
                        ]
                    },
                    {
                        "type": "p",
                        "children": [
                            {
                                "text": "Enable the review flow in Settings → Publishing. Editors submit pages for review, and admins approve before publication."
                            }
                        ]
                    }
                ]
            },
            {
                "id": "p-tut-migrate",
                "title": "Migrating from GitBook",
                "slug": "migrate-from-gitbook",
                "type": "page",
                "content": [
                    {
                        "type": "h1",
                        "children": [
                            {
                                "text": "Migrating from GitBook"
                            }
                        ]
                    },
                    {
                        "type": "p",
                        "children": [
                            {
                                "text": "Moving from GitBook to Hyperdocs takes about 15 minutes using the migration CLI."
                            }
                        ]
                    },
                    {
                        "type": "h2",
                        "children": [
                            {
                                "text": "Export from GitBook"
                            }
                        ]
                    },
                    {
                        "type": "p",
                        "children": [
                            {
                                "text": "In GitBook, go to Integrations → Export and download your content as a ZIP archive."
                            }
                        ]
                    },
                    {
                        "type": "h2",
                        "children": [
                            {
                                "text": "Import to Hyperdocs"
                            }
                        ]
                    },
                    {
                        "type": "code_block",
                        "lang": "bash",
                        "children": [
                            {
                                "type": "code_line",
                                "children": [
                                    {
                                        "text": "npx @hyperdocs/migrate --from gitbook --file export.zip --project proj_abc"
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "type": "h2",
                        "children": [
                            {
                                "text": "What Gets Migrated"
                            }
                        ]
                    },
                    {
                        "type": "table",
                        "children": [
                            {
                                "type": "tr",
                                "children": [
                                    {
                                        "type": "th",
                                        "children": [
                                            {
                                                "type": "p",
                                                "children": [
                                                    {
                                                        "text": "Content Type"
                                                    }
                                                ]
                                            }
                                        ]
                                    },
                                    {
                                        "type": "th",
                                        "children": [
                                            {
                                                "type": "p",
                                                "children": [
                                                    {
                                                        "text": "Migrated?"
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                "type": "tr",
                                "children": [
                                    {
                                        "type": "td",
                                        "children": [
                                            {
                                                "type": "p",
                                                "children": [
                                                    {
                                                        "text": "Pages and headings"
                                                    }
                                                ]
                                            }
                                        ]
                                    },
                                    {
                                        "type": "td",
                                        "children": [
                                            {
                                                "type": "p",
                                                "children": [
                                                    {
                                                        "text": "Yes"
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                "type": "tr",
                                "children": [
                                    {
                                        "type": "td",
                                        "children": [
                                            {
                                                "type": "p",
                                                "children": [
                                                    {
                                                        "text": "Code blocks"
                                                    }
                                                ]
                                            }
                                        ]
                                    },
                                    {
                                        "type": "td",
                                        "children": [
                                            {
                                                "type": "p",
                                                "children": [
                                                    {
                                                        "text": "Yes"
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                "type": "tr",
                                "children": [
                                    {
                                        "type": "td",
                                        "children": [
                                            {
                                                "type": "p",
                                                "children": [
                                                    {
                                                        "text": "Images"
                                                    }
                                                ]
                                            }
                                        ]
                                    },
                                    {
                                        "type": "td",
                                        "children": [
                                            {
                                                "type": "p",
                                                "children": [
                                                    {
                                                        "text": "Yes (re-uploaded)"
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                "type": "tr",
                                "children": [
                                    {
                                        "type": "td",
                                        "children": [
                                            {
                                                "type": "p",
                                                "children": [
                                                    {
                                                        "text": "Comments"
                                                    }
                                                ]
                                            }
                                        ]
                                    },
                                    {
                                        "type": "td",
                                        "children": [
                                            {
                                                "type": "p",
                                                "children": [
                                                    {
                                                        "text": "No"
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                "id": "p-tut-openapi",
                "title": "OpenAPI Integration",
                "slug": "openapi-integration",
                "type": "page",
                "content": [
                    {
                        "type": "h1",
                        "children": [
                            {
                                "text": "OpenAPI Integration"
                            }
                        ]
                    },
                    {
                        "type": "p",
                        "children": [
                            {
                                "text": "Point Hyperdocs at your OpenAPI spec and it will generate a complete, interactive API reference automatically."
                            }
                        ]
                    },
                    {
                        "type": "h2",
                        "children": [
                            {
                                "text": "Linking Your Spec"
                            }
                        ]
                    },
                    {
                        "type": "p",
                        "children": [
                            {
                                "text": "Add the openapi key to your config file:"
                            }
                        ]
                    },
                    {
                        "type": "code_block",
                        "lang": "typescript",
                        "children": [
                            {
                                "type": "code_line",
                                "children": [
                                    {
                                        "text": "export default defineConfig({"
                                    }
                                ]
                            },
                            {
                                "type": "code_line",
                                "children": [
                                    {
                                        "text": "  openapi: { src: './openapi.yaml', path: '/api-reference' },"
                                    }
                                ]
                            },
                            {
                                "type": "code_line",
                                "children": [
                                    {
                                        "text": "})"
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "type": "h2",
                        "children": [
                            {
                                "text": "Supported Formats"
                            }
                        ]
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "disc",
                        "children": [
                            {
                                "text": "OpenAPI 3.0 and 3.1 (YAML or JSON)"
                            }
                        ]
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "disc",
                        "children": [
                            {
                                "text": "Swagger 2.0 (auto-upgraded)"
                            }
                        ]
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "disc",
                        "children": [
                            {
                                "text": "Postman Collection v2.1 (converted on import)"
                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        "id": "f-reference",
        "title": "Reference",
        "slug": "reference",
        "type": "folder",
        "children": [
            {
                "id": "p-ref-config",
                "title": "Config Reference",
                "slug": "config-reference",
                "type": "page",
                "content": [
                    {
                        "type": "h1",
                        "children": [
                            {
                                "text": "Config Reference"
                            }
                        ]
                    },
                    {
                        "type": "p",
                        "children": [
                            {
                                "text": "Full reference for every option in hyperdocs.config.ts."
                            }
                        ]
                    },
                    {
                        "type": "h2",
                        "children": [
                            {
                                "text": "Top-Level Options"
                            }
                        ]
                    },
                    {
                        "type": "table",
                        "children": [
                            {
                                "type": "tr",
                                "children": [
                                    {
                                        "type": "th",
                                        "children": [
                                            {
                                                "type": "p",
                                                "children": [
                                                    {
                                                        "text": "Option"
                                                    }
                                                ]
                                            }
                                        ]
                                    },
                                    {
                                        "type": "th",
                                        "children": [
                                            {
                                                "type": "p",
                                                "children": [
                                                    {
                                                        "text": "Type"
                                                    }
                                                ]
                                            }
                                        ]
                                    },
                                    {
                                        "type": "th",
                                        "children": [
                                            {
                                                "type": "p",
                                                "children": [
                                                    {
                                                        "text": "Default"
                                                    }
                                                ]
                                            }
                                        ]
                                    },
                                    {
                                        "type": "th",
                                        "children": [
                                            {
                                                "type": "p",
                                                "children": [
                                                    {
                                                        "text": "Description"
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                "type": "tr",
                                "children": [
                                    {
                                        "type": "td",
                                        "children": [
                                            {
                                                "type": "p",
                                                "children": [
                                                    {
                                                        "text": "name"
                                                    }
                                                ]
                                            }
                                        ]
                                    },
                                    {
                                        "type": "td",
                                        "children": [
                                            {
                                                "type": "p",
                                                "children": [
                                                    {
                                                        "text": "string"
                                                    }
                                                ]
                                            }
                                        ]
                                    },
                                    {
                                        "type": "td",
                                        "children": [
                                            {
                                                "type": "p",
                                                "children": [
                                                    {
                                                        "text": "—"
                                                    }
                                                ]
                                            }
                                        ]
                                    },
                                    {
                                        "type": "td",
                                        "children": [
                                            {
                                                "type": "p",
                                                "children": [
                                                    {
                                                        "text": "Display name of your docs site"
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                "type": "tr",
                                "children": [
                                    {
                                        "type": "td",
                                        "children": [
                                            {
                                                "type": "p",
                                                "children": [
                                                    {
                                                        "text": "primaryColor"
                                                    }
                                                ]
                                            }
                                        ]
                                    },
                                    {
                                        "type": "td",
                                        "children": [
                                            {
                                                "type": "p",
                                                "children": [
                                                    {
                                                        "text": "string"
                                                    }
                                                ]
                                            }
                                        ]
                                    },
                                    {
                                        "type": "td",
                                        "children": [
                                            {
                                                "type": "p",
                                                "children": [
                                                    {
                                                        "text": "#f26522"
                                                    }
                                                ]
                                            }
                                        ]
                                    },
                                    {
                                        "type": "td",
                                        "children": [
                                            {
                                                "type": "p",
                                                "children": [
                                                    {
                                                        "text": "Brand hex color"
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                "type": "tr",
                                "children": [
                                    {
                                        "type": "td",
                                        "children": [
                                            {
                                                "type": "p",
                                                "children": [
                                                    {
                                                        "text": "domain"
                                                    }
                                                ]
                                            }
                                        ]
                                    },
                                    {
                                        "type": "td",
                                        "children": [
                                            {
                                                "type": "p",
                                                "children": [
                                                    {
                                                        "text": "string"
                                                    }
                                                ]
                                            }
                                        ]
                                    },
                                    {
                                        "type": "td",
                                        "children": [
                                            {
                                                "type": "p",
                                                "children": [
                                                    {
                                                        "text": "auto"
                                                    }
                                                ]
                                            }
                                        ]
                                    },
                                    {
                                        "type": "td",
                                        "children": [
                                            {
                                                "type": "p",
                                                "children": [
                                                    {
                                                        "text": "Custom domain"
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                "type": "tr",
                                "children": [
                                    {
                                        "type": "td",
                                        "children": [
                                            {
                                                "type": "p",
                                                "children": [
                                                    {
                                                        "text": "private"
                                                    }
                                                ]
                                            }
                                        ]
                                    },
                                    {
                                        "type": "td",
                                        "children": [
                                            {
                                                "type": "p",
                                                "children": [
                                                    {
                                                        "text": "boolean"
                                                    }
                                                ]
                                            }
                                        ]
                                    },
                                    {
                                        "type": "td",
                                        "children": [
                                            {
                                                "type": "p",
                                                "children": [
                                                    {
                                                        "text": "false"
                                                    }
                                                ]
                                            }
                                        ]
                                    },
                                    {
                                        "type": "td",
                                        "children": [
                                            {
                                                "type": "p",
                                                "children": [
                                                    {
                                                        "text": "Password-protect the site"
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                "id": "p-ref-cli",
                "title": "CLI Reference",
                "slug": "cli-reference",
                "type": "page",
                "content": [
                    {
                        "type": "h1",
                        "children": [
                            {
                                "text": "CLI Reference"
                            }
                        ]
                    },
                    {
                        "type": "p",
                        "children": [
                            {
                                "text": "Complete reference for all hyperdocs CLI commands."
                            }
                        ]
                    },
                    {
                        "type": "h2",
                        "children": [
                            {
                                "text": "hyperdocs init"
                            }
                        ]
                    },
                    {
                        "type": "p",
                        "children": [
                            {
                                "text": "Initialises a new Hyperdocs project in the current directory, creating hyperdocs.config.ts."
                            }
                        ]
                    },
                    {
                        "type": "code_block",
                        "lang": "bash",
                        "children": [
                            {
                                "type": "code_line",
                                "children": [
                                    {
                                        "text": "hyperdocs init [--name <name>] [--template <template>]"
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "type": "h2",
                        "children": [
                            {
                                "text": "hyperdocs generate"
                            }
                        ]
                    },
                    {
                        "type": "p",
                        "children": [
                            {
                                "text": "Runs the AI generation pipeline against your source code and writes output to the local project store."
                            }
                        ]
                    },
                    {
                        "type": "code_block",
                        "lang": "bash",
                        "children": [
                            {
                                "type": "code_line",
                                "children": [
                                    {
                                        "text": "hyperdocs generate [--watch] [--only <glob>]"
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "type": "h2",
                        "children": [
                            {
                                "text": "hyperdocs deploy"
                            }
                        ]
                    },
                    {
                        "type": "p",
                        "children": [
                            {
                                "text": "Publishes your local project to the Hyperdocs CDN."
                            }
                        ]
                    },
                    {
                        "type": "code_block",
                        "lang": "bash",
                        "children": [
                            {
                                "type": "code_line",
                                "children": [
                                    {
                                        "text": "hyperdocs deploy [--env <env>] [--dry-run]"
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "type": "h2",
                        "children": [
                            {
                                "text": "hyperdocs dev"
                            }
                        ]
                    },
                    {
                        "type": "p",
                        "children": [
                            {
                                "text": "Starts a local preview server at http://localhost:4000."
                            }
                        ]
                    },
                    {
                        "type": "code_block",
                        "lang": "bash",
                        "children": [
                            {
                                "type": "code_line",
                                "children": [
                                    {
                                        "text": "hyperdocs dev [--port <port>]"
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                "id": "p-ref-env",
                "title": "Environment Variables",
                "slug": "environment-variables",
                "type": "page",
                "content": [
                    {
                        "type": "h1",
                        "children": [
                            {
                                "text": "Environment Variables"
                            }
                        ]
                    },
                    {
                        "type": "p",
                        "children": [
                            {
                                "text": "All environment variables recognised by the Hyperdocs CLI and SDK."
                            }
                        ]
                    },
                    {
                        "type": "table",
                        "children": [
                            {
                                "type": "tr",
                                "children": [
                                    {
                                        "type": "th",
                                        "children": [
                                            {
                                                "type": "p",
                                                "children": [
                                                    {
                                                        "text": "Variable"
                                                    }
                                                ]
                                            }
                                        ]
                                    },
                                    {
                                        "type": "th",
                                        "children": [
                                            {
                                                "type": "p",
                                                "children": [
                                                    {
                                                        "text": "Required"
                                                    }
                                                ]
                                            }
                                        ]
                                    },
                                    {
                                        "type": "th",
                                        "children": [
                                            {
                                                "type": "p",
                                                "children": [
                                                    {
                                                        "text": "Description"
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                "type": "tr",
                                "children": [
                                    {
                                        "type": "td",
                                        "children": [
                                            {
                                                "type": "p",
                                                "children": [
                                                    {
                                                        "text": "HYPERDOCS_API_KEY"
                                                    }
                                                ]
                                            }
                                        ]
                                    },
                                    {
                                        "type": "td",
                                        "children": [
                                            {
                                                "type": "p",
                                                "children": [
                                                    {
                                                        "text": "Yes"
                                                    }
                                                ]
                                            }
                                        ]
                                    },
                                    {
                                        "type": "td",
                                        "children": [
                                            {
                                                "type": "p",
                                                "children": [
                                                    {
                                                        "text": "Your API key from the dashboard"
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                "type": "tr",
                                "children": [
                                    {
                                        "type": "td",
                                        "children": [
                                            {
                                                "type": "p",
                                                "children": [
                                                    {
                                                        "text": "HYPERDOCS_PROJECT_ID"
                                                    }
                                                ]
                                            }
                                        ]
                                    },
                                    {
                                        "type": "td",
                                        "children": [
                                            {
                                                "type": "p",
                                                "children": [
                                                    {
                                                        "text": "Yes"
                                                    }
                                                ]
                                            }
                                        ]
                                    },
                                    {
                                        "type": "td",
                                        "children": [
                                            {
                                                "type": "p",
                                                "children": [
                                                    {
                                                        "text": "Your project identifier"
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                "type": "tr",
                                "children": [
                                    {
                                        "type": "td",
                                        "children": [
                                            {
                                                "type": "p",
                                                "children": [
                                                    {
                                                        "text": "HYPERDOCS_ENV"
                                                    }
                                                ]
                                            }
                                        ]
                                    },
                                    {
                                        "type": "td",
                                        "children": [
                                            {
                                                "type": "p",
                                                "children": [
                                                    {
                                                        "text": "No"
                                                    }
                                                ]
                                            }
                                        ]
                                    },
                                    {
                                        "type": "td",
                                        "children": [
                                            {
                                                "type": "p",
                                                "children": [
                                                    {
                                                        "text": "Deployment target (default: production)"
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                "type": "tr",
                                "children": [
                                    {
                                        "type": "td",
                                        "children": [
                                            {
                                                "type": "p",
                                                "children": [
                                                    {
                                                        "text": "HYPERDOCS_DEBUG"
                                                    }
                                                ]
                                            }
                                        ]
                                    },
                                    {
                                        "type": "td",
                                        "children": [
                                            {
                                                "type": "p",
                                                "children": [
                                                    {
                                                        "text": "No"
                                                    }
                                                ]
                                            }
                                        ]
                                    },
                                    {
                                        "type": "td",
                                        "children": [
                                            {
                                                "type": "p",
                                                "children": [
                                                    {
                                                        "text": "Enable verbose logging (1 or true)"
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                "id": "p-ref-blocks",
                "title": "Block Types",
                "slug": "block-types",
                "type": "page",
                "content": [
                    {
                        "type": "h1",
                        "children": [
                            {
                                "text": "Block Types"
                            }
                        ]
                    },
                    {
                        "type": "p",
                        "children": [
                            {
                                "text": "Hyperdocs content is composed of blocks. Each block type has its own rendering rules and editor behaviour."
                            }
                        ]
                    },
                    {
                        "type": "h2",
                        "children": [
                            {
                                "text": "Text Blocks"
                            }
                        ]
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "disc",
                        "children": [
                            {
                                "text": "Paragraph — plain text, supports inline bold/italic/code"
                            }
                        ]
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "disc",
                        "children": [
                            {
                                "text": "Heading 1 / 2 / 3 — section headings, auto-linked for TOC"
                            }
                        ]
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "disc",
                        "children": [
                            {
                                "text": "Blockquote — styled callout for notes and tips"
                            }
                        ]
                    },
                    {
                        "type": "h2",
                        "children": [
                            {
                                "text": "Code Blocks"
                            }
                        ]
                    },
                    {
                        "type": "p",
                        "children": [
                            {
                                "text": "Code blocks support 40+ languages with syntax highlighting. Specify the language after the opening fence."
                            }
                        ]
                    },
                    {
                        "type": "code_block",
                        "lang": "typescript",
                        "children": [
                            {
                                "type": "code_line",
                                "children": [
                                    {
                                        "text": "const greet = (name: string) => `Hello, ${name}!`"
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "type": "h2",
                        "children": [
                            {
                                "text": "Structural Blocks"
                            }
                        ]
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "disc",
                        "children": [
                            {
                                "text": "Table — multi-column data with header row"
                            }
                        ]
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "disc",
                        "children": [
                            {
                                "text": "Ordered list — numbered steps"
                            }
                        ]
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "disc",
                        "children": [
                            {
                                "text": "Unordered list — bullet points"
                            }
                        ]
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "disc",
                        "children": [
                            {
                                "text": "Image — with alt text and optional caption"
                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        "id": "f-sdks",
        "title": "SDKs & Libraries",
        "slug": "sdks",
        "type": "folder",
        "children": [
            {
                "id": "p-sdk-js",
                "title": "JavaScript / TypeScript",
                "slug": "javascript",
                "type": "page",
                "content": [
                    {
                        "type": "h1",
                        "children": [
                            {
                                "text": "JavaScript / TypeScript SDK"
                            }
                        ]
                    },
                    {
                        "type": "p",
                        "children": [
                            {
                                "text": "The official Hyperdocs JS SDK works in Node.js and modern browsers."
                            }
                        ]
                    },
                    {
                        "type": "code_block",
                        "lang": "bash",
                        "children": [
                            {
                                "type": "code_line",
                                "children": [
                                    {
                                        "text": "npm install @hyperdocs/sdk"
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "type": "h2",
                        "children": [
                            {
                                "text": "Basic Usage"
                            }
                        ]
                    },
                    {
                        "type": "code_block",
                        "lang": "typescript",
                        "children": [
                            {
                                "type": "code_line",
                                "children": [
                                    {
                                        "text": "import { Hyperdocs } from '@hyperdocs/sdk'"
                                    }
                                ]
                            },
                            {
                                "type": "code_line",
                                "children": [
                                    {
                                        "text": ""
                                    }
                                ]
                            },
                            {
                                "type": "code_line",
                                "children": [
                                    {
                                        "text": "const hd = new Hyperdocs({ apiKey: process.env.HYPERDOCS_KEY })"
                                    }
                                ]
                            },
                            {
                                "type": "code_line",
                                "children": [
                                    {
                                        "text": "const pages = await hd.pages.list({ projectId: \"proj_abc\" })"
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                "id": "p-sdk-python",
                "title": "Python",
                "slug": "python",
                "type": "page",
                "content": [
                    {
                        "type": "h1",
                        "children": [
                            {
                                "text": "Python SDK"
                            }
                        ]
                    },
                    {
                        "type": "p",
                        "children": [
                            {
                                "text": "The official Hyperdocs Python SDK supports Python 3.9 and above."
                            }
                        ]
                    },
                    {
                        "type": "code_block",
                        "lang": "bash",
                        "children": [
                            {
                                "type": "code_line",
                                "children": [
                                    {
                                        "text": "pip install hyperdocs"
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "type": "h2",
                        "children": [
                            {
                                "text": "Basic Usage"
                            }
                        ]
                    },
                    {
                        "type": "code_block",
                        "lang": "python",
                        "children": [
                            {
                                "type": "code_line",
                                "children": [
                                    {
                                        "text": "import hyperdocs"
                                    }
                                ]
                            },
                            {
                                "type": "code_line",
                                "children": [
                                    {
                                        "text": ""
                                    }
                                ]
                            },
                            {
                                "type": "code_line",
                                "children": [
                                    {
                                        "text": "client = hyperdocs.Client(api_key=\"YOUR_KEY\")"
                                    }
                                ]
                            },
                            {
                                "type": "code_line",
                                "children": [
                                    {
                                        "text": "pages = client.pages.list(project_id=\"proj_abc\")"
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                "id": "p-sdk-go",
                "title": "Go",
                "slug": "go",
                "type": "page",
                "content": [
                    {
                        "type": "h1",
                        "children": [
                            {
                                "text": "Go SDK"
                            }
                        ]
                    },
                    {
                        "type": "p",
                        "children": [
                            {
                                "text": "The official Go client for the Hyperdocs API."
                            }
                        ]
                    },
                    {
                        "type": "code_block",
                        "lang": "bash",
                        "children": [
                            {
                                "type": "code_line",
                                "children": [
                                    {
                                        "text": "go get github.com/hyperdocs/hyperdocs-go"
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "type": "h2",
                        "children": [
                            {
                                "text": "Basic Usage"
                            }
                        ]
                    },
                    {
                        "type": "code_block",
                        "lang": "go",
                        "children": [
                            {
                                "type": "code_line",
                                "children": [
                                    {
                                        "text": "client := hyperdocs.NewClient(\"YOUR_API_KEY\")"
                                    }
                                ]
                            },
                            {
                                "type": "code_line",
                                "children": [
                                    {
                                        "text": "pages, err := client.Pages.List(ctx, \"proj_abc\")"
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        "id": "f-changelog",
        "title": "Changelog",
        "slug": "changelog",
        "type": "folder",
        "children": [
            {
                "id": "p-v3",
                "title": "v3.0 — May 2025",
                "slug": "v3-0",
                "type": "page",
                "content": [
                    {
                        "type": "h1",
                        "children": [
                            {
                                "text": "v3.0 — May 2025"
                            }
                        ]
                    },
                    {
                        "type": "h2",
                        "children": [
                            {
                                "text": "New Features"
                            }
                        ]
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "disc",
                        "children": [
                            {
                                "text": "AI block regeneration — right-click any block to regenerate with AI"
                            }
                        ]
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "disc",
                        "children": [
                            {
                                "text": "Versioned docs — expose multiple doc versions simultaneously"
                            }
                        ]
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "disc",
                        "children": [
                            {
                                "text": "Custom domain SSL auto-provisioning"
                            }
                        ]
                    },
                    {
                        "type": "h2",
                        "children": [
                            {
                                "text": "Bug Fixes"
                            }
                        ]
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "disc",
                        "children": [
                            {
                                "text": "Fixed code block syntax highlighting for Rust and Go"
                            }
                        ]
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "disc",
                        "children": [
                            {
                                "text": "Resolved search index delay after publish"
                            }
                        ]
                    }
                ]
            },
            {
                "id": "p-v2",
                "title": "v2.4 — Feb 2025",
                "slug": "v2-4",
                "type": "page",
                "content": [
                    {
                        "type": "h1",
                        "children": [
                            {
                                "text": "v2.4 — February 2025"
                            }
                        ]
                    },
                    {
                        "type": "h2",
                        "children": [
                            {
                                "text": "Improvements"
                            }
                        ]
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "disc",
                        "children": [
                            {
                                "text": "Drag-and-drop page reordering in the editor sidebar"
                            }
                        ]
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "disc",
                        "children": [
                            {
                                "text": "Webhook retry logic with exponential backoff"
                            }
                        ]
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "disc",
                        "children": [
                            {
                                "text": "Python SDK initial release"
                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        "id": "f-github-hyperblog-frontend-test-getting-started",
        "title": "Getting Started",
        "slug": "github-hyperblog-frontend-test-getting-started",
        "type": "folder",
        "children": [
            {
                "id": "p-github-hyperblog-frontend-test-accessing-hyperblog",
                "title": "Accessing HyperBlog",
                "slug": "github-hyperblog-frontend-test-accessing-hyperblog",
                "type": "page",
                "description": "Sign in and access the HyperBlog platform to begin creating content.",
                "content": [
                    {
                        "type": "h1",
                        "children": [
                            {
                                "text": "Accessing HyperBlog"
                            }
                        ],
                        "id": "a1b2c3d4e5"
                    },
                    {
                        "type": "p",
                        "children": [
                            {
                                "text": "Accessing HyperBlog is the first step to creating interactive blog posts and managing your published content. Once you sign in, you gain access to the block-based editor, engagement components, and all your saved posts so you can start writing right away."
                            }
                        ],
                        "id": "f6g7h8i9j0"
                    },
                    {
                        "type": "h2",
                        "children": [
                            {
                                "text": "How It Works"
                            }
                        ],
                        "id": "k1l2m3n4o5"
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "disc",
                        "children": [
                            {
                                "text": "Sign in to the platform using your account credentials to reach your personal dashboard and editor."
                            }
                        ],
                        "id": "p6q7r8s9t0"
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "disc",
                        "children": [
                            {
                                "text": "Your profile avatar is displayed automatically, sourced from your linked Google account or generated from your initials."
                            }
                        ],
                        "id": "u1v2w3x4y5"
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "disc",
                        "children": [
                            {
                                "text": "After signing in, you can open the block editor to create new posts or continue editing existing drafts."
                            }
                        ],
                        "id": "z6a7b8c9d0"
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "disc",
                        "children": [
                            {
                                "text": "Published blog pages load quickly for visitors, while your editing tools remain available behind your authenticated session."
                            }
                        ],
                        "id": "e1f2g3h4i5"
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "disc",
                        "children": [
                            {
                                "text": "Your session keeps you connected so you can move between writing, configuring engagement components, and publishing without re-entering details."
                            }
                        ],
                        "id": "j6k7l8m9n0"
                    },
                    {
                        "type": "h2",
                        "children": [
                            {
                                "text": "Steps"
                            }
                        ],
                        "id": "o1p2q3r4s5"
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "decimal",
                        "children": [
                            {
                                "text": "Open the HyperBlog platform in your web browser using the address provided by your team or organization."
                            }
                        ],
                        "id": "t6u7v8w9x0"
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "decimal",
                        "children": [
                            {
                                "text": "Enter your account credentials or choose a sign-in option such as your linked Google account."
                            }
                        ],
                        "id": "y1z2a3b4c5",
                        "listStart": 2
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "decimal",
                        "children": [
                            {
                                "text": "Confirm your sign-in to load your dashboard, where your profile avatar appears in the corner."
                            }
                        ],
                        "id": "d6e7f8g9h0",
                        "listStart": 3
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "decimal",
                        "children": [
                            {
                                "text": "Select the option to create a new post or open an existing one to launch the block editor."
                            }
                        ],
                        "id": "i1j2k3l4m5",
                        "listStart": 4
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "decimal",
                        "children": [
                            {
                                "text": "Begin writing content and adding interactive components, then publish when your post is ready."
                            }
                        ],
                        "id": "n6o7p8q9r0",
                        "listStart": 5
                    },
                    {
                        "type": "h2",
                        "children": [
                            {
                                "text": "Sign-In Options"
                            }
                        ],
                        "id": "s1t2u3v4w5"
                    },
                    {
                        "type": "table",
                        "id": "x6y7z8a9b0",
                        "children": [
                            {
                                "type": "tr",
                                "id": "c1d2e3f4g5",
                                "children": [
                                    {
                                        "type": "th",
                                        "id": "h6i7j8k9l0",
                                        "children": [
                                            {
                                                "type": "p",
                                                "children": [
                                                    {
                                                        "text": "Option"
                                                    }
                                                ],
                                                "id": "m1n2o3p4q5"
                                            }
                                        ]
                                    },
                                    {
                                        "type": "th",
                                        "id": "r6s7t8u9v0",
                                        "children": [
                                            {
                                                "type": "p",
                                                "children": [
                                                    {
                                                        "text": "What It Does"
                                                    }
                                                ],
                                                "id": "w1x2y3z4a5"
                                            }
                                        ]
                                    },
                                    {
                                        "type": "th",
                                        "id": "b6c7d8e9f0",
                                        "children": [
                                            {
                                                "type": "p",
                                                "children": [
                                                    {
                                                        "text": "Best For"
                                                    }
                                                ],
                                                "id": "g1h2i3j4k5"
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                "type": "tr",
                                "id": "l6m7n8o9p0",
                                "children": [
                                    {
                                        "type": "td",
                                        "id": "q1r2s3t4u5",
                                        "children": [
                                            {
                                                "type": "p",
                                                "children": [
                                                    {
                                                        "text": "Account credentials"
                                                    }
                                                ],
                                                "id": "v6w7x8y9z0"
                                            }
                                        ]
                                    },
                                    {
                                        "type": "td",
                                        "id": "a1b2c3d4e6",
                                        "children": [
                                            {
                                                "type": "p",
                                                "children": [
                                                    {
                                                        "text": "Signs you in with your registered email and password."
                                                    }
                                                ],
                                                "id": "f6g7h8i9j1"
                                            }
                                        ]
                                    },
                                    {
                                        "type": "td",
                                        "id": "k1l2m3n4o6",
                                        "children": [
                                            {
                                                "type": "p",
                                                "children": [
                                                    {
                                                        "text": "Standard access to your workspace."
                                                    }
                                                ],
                                                "id": "p6q7r8s9t1"
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                "type": "tr",
                                "id": "u1v2w3x4y6",
                                "children": [
                                    {
                                        "type": "td",
                                        "id": "z6a7b8c9d1",
                                        "children": [
                                            {
                                                "type": "p",
                                                "children": [
                                                    {
                                                        "text": "Google account"
                                                    }
                                                ],
                                                "id": "e1f2g3h4i6"
                                            }
                                        ]
                                    },
                                    {
                                        "type": "td",
                                        "id": "j6k7l8m9n1",
                                        "children": [
                                            {
                                                "type": "p",
                                                "children": [
                                                    {
                                                        "text": "Uses your Google profile and avatar to sign in quickly."
                                                    }
                                                ],
                                                "id": "o1p2q3r4s6"
                                            }
                                        ]
                                    },
                                    {
                                        "type": "td",
                                        "id": "t6u7v8w9x1",
                                        "children": [
                                            {
                                                "type": "p",
                                                "children": [
                                                    {
                                                        "text": "Fast, password-free access."
                                                    }
                                                ],
                                                "id": "y1z2a3b4c6"
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                "type": "tr",
                                "id": "d6e7f8g9h1",
                                "children": [
                                    {
                                        "type": "td",
                                        "id": "i1j2k3l4m6",
                                        "children": [
                                            {
                                                "type": "p",
                                                "children": [
                                                    {
                                                        "text": "Generated avatar"
                                                    }
                                                ],
                                                "id": "n6o7p8q9r1"
                                            }
                                        ]
                                    },
                                    {
                                        "type": "td",
                                        "id": "s1t2u3v4w6",
                                        "children": [
                                            {
                                                "type": "p",
                                                "children": [
                                                    {
                                                        "text": "Creates an avatar from your initials if no profile image is available."
                                                    }
                                                ],
                                                "id": "x6y7z8a9b1"
                                            }
                                        ]
                                    },
                                    {
                                        "type": "td",
                                        "id": "c1d2e3f4g6",
                                        "children": [
                                            {
                                                "type": "p",
                                                "children": [
                                                    {
                                                        "text": "Accounts without a linked profile photo."
                                                    }
                                                ],
                                                "id": "h6i7j8k9l1"
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "type": "h2",
                        "children": [
                            {
                                "text": "Tips"
                            }
                        ],
                        "id": "m1n2o3p4q6"
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "disc",
                        "children": [
                            {
                                "text": "Bookmark the platform address so you can return to your editor quickly each time you write."
                            }
                        ],
                        "id": "r6s7t8u9v1"
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "disc",
                        "children": [
                            {
                                "text": "Use a supported, up-to-date browser for the smoothest editing and fastest page loading."
                            }
                        ],
                        "id": "w1x2y3z4a6"
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "disc",
                        "children": [
                            {
                                "text": "Add a profile photo to your linked account so your avatar appears alongside your work."
                            }
                        ],
                        "id": "b6c7d8e9f1"
                    },
                    {
                        "type": "callout",
                        "variant": "tip",
                        "children": [
                            {
                                "text": "Signing in with your Google account is the fastest way to get started — no separate password to remember."
                            }
                        ],
                        "id": "g1h2i3j4k6"
                    },
                    {
                        "type": "callout",
                        "variant": "info",
                        "children": [
                            {
                                "text": "Published blog pages are viewable by anyone, but creating and editing content always requires a signed-in account."
                            }
                        ],
                        "id": "l6m7n8o9p1"
                    },
                    {
                        "type": "h2",
                        "children": [
                            {
                                "text": "Troubleshooting"
                            }
                        ],
                        "id": "q1r2s3t4u6"
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "disc",
                        "children": [
                            {
                                "text": "If sign-in fails, double-check that your email and password are entered correctly and try again."
                            }
                        ],
                        "id": "v6w7x8y9z1"
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "disc",
                        "children": [
                            {
                                "text": "If the page does not load, refresh your browser or clear your cache, then revisit the platform address."
                            }
                        ],
                        "id": "a1b2c3d4e7"
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "disc",
                        "children": [
                            {
                                "text": "If your avatar does not appear, confirm your linked account has a profile image or that your initials are set up correctly."
                            }
                        ],
                        "id": "f6g7h8i9j2"
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "disc",
                        "children": [
                            {
                                "text": "If you are unexpectedly signed out, sign in again to restore your session and continue editing."
                            }
                        ],
                        "id": "k1l2m3n4o7"
                    },
                    {
                        "type": "p",
                        "children": [
                            {
                                "text": "Related topics: Creating Your First Blog Post, Using the Block Editor, Publishing a Blog Post."
                            }
                        ],
                        "id": "p6q7r8s9t2"
                    }
                ]
            },
            {
                "id": "p-github-hyperblog-frontend-test-creating-your-first-post",
                "title": "Creating Your First Post",
                "slug": "github-hyperblog-frontend-test-creating-your-first-post",
                "type": "page",
                "description": "Open the editor and create a new blog post from scratch.",
                "content": [
                    {
                        "type": "h1",
                        "children": [
                            {
                                "text": "Creating Your First Post"
                            }
                        ],
                        "id": "a1b2c3d4e5"
                    },
                    {
                        "type": "p",
                        "children": [
                            {
                                "text": "HyperBlog gives you a powerful block-based editor for building rich, interactive blog posts. This guide walks you through opening the editor and creating your very first post from a blank canvas, so you can start sharing content right away."
                            }
                        ],
                        "id": "f6g7h8i9j0"
                    },
                    {
                        "type": "h2",
                        "children": [
                            {
                                "text": "How It Works"
                            }
                        ],
                        "id": "k1l2m3n4o5"
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "disc",
                        "children": [
                            {
                                "text": "The editor uses content blocks, so each paragraph, heading, list, or image is its own building piece you can add, move, and edit independently."
                            }
                        ],
                        "id": "p6q7r8s9t0"
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "disc",
                        "children": [
                            {
                                "text": "You can add new blocks instantly using the slash command (type \"/\") or the formatting toolbar at the top of the editor."
                            }
                        ],
                        "id": "u1v2w3x4y5"
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "disc",
                        "children": [
                            {
                                "text": "Beyond text, you can drop in rich elements like images, tables, code blocks, quotes, drawings, math equations, and emojis."
                            }
                        ],
                        "id": "z6a7b8c9d0"
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "disc",
                        "children": [
                            {
                                "text": "Posts can be enriched with interactive engagement components such as polls, FAQs, lead magnets, banners, and infographics."
                            }
                        ],
                        "id": "e1f2g3h4i5"
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "disc",
                        "children": [
                            {
                                "text": "Your work is structured for fast, SEO-friendly publishing, so finished posts load quickly for readers."
                            }
                        ],
                        "id": "j6k7l8m9n0"
                    },
                    {
                        "type": "h2",
                        "children": [
                            {
                                "text": "Steps"
                            }
                        ],
                        "id": "o1p2q3r4s5"
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "decimal",
                        "children": [
                            {
                                "text": "Open the blog editor from your dashboard to start a new post on a blank page."
                            }
                        ],
                        "id": "t6u7v8w9x0"
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "decimal",
                        "children": [
                            {
                                "text": "Add a title at the top, then click into the body area to begin writing your first block of content."
                            }
                        ],
                        "id": "y1z2a3b4c5",
                        "listStart": 2
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "decimal",
                        "children": [
                            {
                                "text": "Type \"/\" to open the slash menu, then choose a block type such as a heading, list, image, or quote to insert it."
                            }
                        ],
                        "id": "d6e7f8g9h0",
                        "listStart": 3
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "decimal",
                        "children": [
                            {
                                "text": "Use the toolbar to format selected text with bold, highlights, links, and other styling as you build out the post."
                            }
                        ],
                        "id": "i1j2k3l4m5",
                        "listStart": 4
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "decimal",
                        "children": [
                            {
                                "text": "Insert any interactive components you want, like a poll or lead magnet, to boost reader engagement."
                            }
                        ],
                        "id": "n6o7p8q9r0",
                        "listStart": 5
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "decimal",
                        "children": [
                            {
                                "text": "Review your layout, then publish the post to make it live on a public blog page."
                            }
                        ],
                        "id": "s1t2u3v4w5",
                        "listStart": 6
                    },
                    {
                        "type": "h2",
                        "children": [
                            {
                                "text": "Block Types You Can Add"
                            }
                        ],
                        "id": "x6y7z8a9b0"
                    },
                    {
                        "type": "table",
                        "id": "c1d2e3f4g5",
                        "children": [
                            {
                                "type": "tr",
                                "id": "h6i7j8k9l0",
                                "children": [
                                    {
                                        "type": "th",
                                        "id": "m1n2o3p4q5",
                                        "children": [
                                            {
                                                "type": "p",
                                                "children": [
                                                    {
                                                        "text": "Block"
                                                    }
                                                ],
                                                "id": "r6s7t8u9v0"
                                            }
                                        ]
                                    },
                                    {
                                        "type": "th",
                                        "id": "w1x2y3z4a5",
                                        "children": [
                                            {
                                                "type": "p",
                                                "children": [
                                                    {
                                                        "text": "Purpose"
                                                    }
                                                ],
                                                "id": "b6c7d8e9f0"
                                            }
                                        ]
                                    },
                                    {
                                        "type": "th",
                                        "id": "g1h2i3j4k5",
                                        "children": [
                                            {
                                                "type": "p",
                                                "children": [
                                                    {
                                                        "text": "How to Add"
                                                    }
                                                ],
                                                "id": "l6m7n8o9p0"
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                "type": "tr",
                                "id": "q1r2s3t4u5",
                                "children": [
                                    {
                                        "type": "td",
                                        "id": "v6w7x8y9z0",
                                        "children": [
                                            {
                                                "type": "p",
                                                "children": [
                                                    {
                                                        "text": "Text & Headings"
                                                    }
                                                ],
                                                "id": "a1b2c3d4e6"
                                            }
                                        ]
                                    },
                                    {
                                        "type": "td",
                                        "id": "f6g7h8i9j1",
                                        "children": [
                                            {
                                                "type": "p",
                                                "children": [
                                                    {
                                                        "text": "Write paragraphs and structure your post with titles."
                                                    }
                                                ],
                                                "id": "k1l2m3n4o6"
                                            }
                                        ]
                                    },
                                    {
                                        "type": "td",
                                        "id": "p6q7r8s9t1",
                                        "children": [
                                            {
                                                "type": "p",
                                                "children": [
                                                    {
                                                        "text": "Start typing or use the slash menu."
                                                    }
                                                ],
                                                "id": "u1v2w3x4y6"
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                "type": "tr",
                                "id": "z6a7b8c9d1",
                                "children": [
                                    {
                                        "type": "td",
                                        "id": "e1f2g3h4i6",
                                        "children": [
                                            {
                                                "type": "p",
                                                "children": [
                                                    {
                                                        "text": "Images & Tables"
                                                    }
                                                ],
                                                "id": "j6k7l8m9n1"
                                            }
                                        ]
                                    },
                                    {
                                        "type": "td",
                                        "id": "o1p2q3r4s6",
                                        "children": [
                                            {
                                                "type": "p",
                                                "children": [
                                                    {
                                                        "text": "Add visuals and organized data to your content."
                                                    }
                                                ],
                                                "id": "t6u7v8w9x1"
                                            }
                                        ]
                                    },
                                    {
                                        "type": "td",
                                        "id": "y1z2a3b4c6",
                                        "children": [
                                            {
                                                "type": "p",
                                                "children": [
                                                    {
                                                        "text": "Insert via the slash menu or toolbar."
                                                    }
                                                ],
                                                "id": "d6e7f8g9h1"
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                "type": "tr",
                                "id": "i1j2k3l4m6",
                                "children": [
                                    {
                                        "type": "td",
                                        "id": "n6o7p8q9r1",
                                        "children": [
                                            {
                                                "type": "p",
                                                "children": [
                                                    {
                                                        "text": "Code, Quotes & Math"
                                                    }
                                                ],
                                                "id": "s1t2u3v4w6"
                                            }
                                        ]
                                    },
                                    {
                                        "type": "td",
                                        "id": "x6y7z8a9b1",
                                        "children": [
                                            {
                                                "type": "p",
                                                "children": [
                                                    {
                                                        "text": "Share technical snippets, highlight quotes, or render equations."
                                                    }
                                                ],
                                                "id": "c1d2e3f4g6"
                                            }
                                        ]
                                    },
                                    {
                                        "type": "td",
                                        "id": "h6i7j8k9l1",
                                        "children": [
                                            {
                                                "type": "p",
                                                "children": [
                                                    {
                                                        "text": "Choose from the slash menu."
                                                    }
                                                ],
                                                "id": "m1n2o3p4q6"
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                "type": "tr",
                                "id": "r6s7t8u9v1",
                                "children": [
                                    {
                                        "type": "td",
                                        "id": "w1x2y3z4a6",
                                        "children": [
                                            {
                                                "type": "p",
                                                "children": [
                                                    {
                                                        "text": "Interactive Components"
                                                    }
                                                ],
                                                "id": "b6c7d8e9f1"
                                            }
                                        ]
                                    },
                                    {
                                        "type": "td",
                                        "id": "g1h2i3j4k6",
                                        "children": [
                                            {
                                                "type": "p",
                                                "children": [
                                                    {
                                                        "text": "Add polls, FAQs, lead magnets, banners, and infographics."
                                                    }
                                                ],
                                                "id": "l6m7n8o9p1"
                                            }
                                        ]
                                    },
                                    {
                                        "type": "td",
                                        "id": "q1r2s3t4u6",
                                        "children": [
                                            {
                                                "type": "p",
                                                "children": [
                                                    {
                                                        "text": "Insert and configure from the slash menu."
                                                    }
                                                ],
                                                "id": "v6w7x8y9z1"
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "type": "h2",
                        "children": [
                            {
                                "text": "Tips"
                            }
                        ],
                        "id": "a1b2c3d4e7"
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "disc",
                        "children": [
                            {
                                "text": "Start with a clear structure using headings before filling in detailed text — it keeps long posts easy to scan."
                            }
                        ],
                        "id": "f6g7h8i9j2"
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "disc",
                        "children": [
                            {
                                "text": "The slash command is the fastest way to add any block; just type \"/\" and search for what you need."
                            }
                        ],
                        "id": "k1l2m3n4o7"
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "disc",
                        "children": [
                            {
                                "text": "Add at least one engagement component, like a poll or lead magnet, to turn passive readers into participants."
                            }
                        ],
                        "id": "p6q7r8s9t2"
                    },
                    {
                        "type": "callout",
                        "variant": "tip",
                        "children": [
                            {
                                "text": "You can rearrange blocks at any time, so don't worry about getting the order perfect on your first pass."
                            }
                        ],
                        "id": "u1v2w3x4y7"
                    },
                    {
                        "type": "callout",
                        "variant": "info",
                        "children": [
                            {
                                "text": "Heavier elements like drawings, animations, and math load only when needed, keeping your editor responsive."
                            }
                        ],
                        "id": "z6a7b8c9d2"
                    },
                    {
                        "type": "h2",
                        "children": [
                            {
                                "text": "Troubleshooting"
                            }
                        ],
                        "id": "e1f2g3h4i7"
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "disc",
                        "children": [
                            {
                                "text": "If the slash menu doesn't appear, make sure your cursor is inside an empty block before typing \"/\"."
                            }
                        ],
                        "id": "j6k7l8m9n2"
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "disc",
                        "children": [
                            {
                                "text": "If an image won't insert, check that the file is a supported format and that you have a stable connection for upload."
                            }
                        ],
                        "id": "o1p2q3r4s7"
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "disc",
                        "children": [
                            {
                                "text": "If an interactive component appears blank, reopen its settings and confirm all required fields are configured."
                            }
                        ],
                        "id": "t6u7v8w9x2"
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "disc",
                        "children": [
                            {
                                "text": "If your post won't publish, ensure the title and main content are filled in, then try again."
                            }
                        ],
                        "id": "y1z2a3b4c7"
                    },
                    {
                        "type": "p",
                        "children": [
                            {
                                "text": "Related topics: Using the Block Editor, Embedding Interactive Components, Publishing Your Post."
                            }
                        ],
                        "id": "d6e7f8g9h2"
                    }
                ]
            },
            {
                "id": "p-github-hyperblog-frontend-test-understanding-the-block-editor",
                "title": "Understanding the Block Editor",
                "slug": "github-hyperblog-frontend-test-understanding-the-block-editor",
                "type": "page",
                "description": "Get oriented with the block-based editor and how content is structured.",
                "content": [
                    {
                        "type": "h1",
                        "children": [
                            {
                                "text": "Understanding the Block Editor"
                            }
                        ],
                        "id": "a1b2c3d4e5"
                    },
                    {
                        "type": "p",
                        "children": [
                            {
                                "text": "The block editor is the heart of HyperBlog, where you write and design every post. Instead of one continuous text field, your content is built from individual blocks—each paragraph, heading, image, or interactive element is its own piece that you can add, rearrange, and style independently. This makes it easy to create rich, engaging articles without any technical knowledge."
                            }
                        ],
                        "id": "b2c3d4e5f6"
                    },
                    {
                        "type": "h2",
                        "children": [
                            {
                                "text": "How It Works"
                            }
                        ],
                        "id": "c3d4e5f6a7"
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "disc",
                        "children": [
                            {
                                "text": "Every part of your post is a separate block, so you can focus on one element at a time and move pieces around freely."
                            }
                        ],
                        "id": "d4e5f6a7b8"
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "disc",
                        "children": [
                            {
                                "text": "You can mix text blocks—paragraphs, headings, lists, quotes, and code—with rich media like images, tables, drawings, math equations, and animations."
                            }
                        ],
                        "id": "e5f6a7b8c9"
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "disc",
                        "children": [
                            {
                                "text": "Interactive engagement blocks such as polls, FAQs, lead magnets, banners, and infographics can be dropped right into the flow of your writing."
                            }
                        ],
                        "id": "f6a7b8c9d0"
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "disc",
                        "children": [
                            {
                                "text": "A slash menu and a formatting toolbar let you insert and style any block quickly while you write."
                            }
                        ],
                        "id": "a7b8c9d0e1"
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "disc",
                        "children": [
                            {
                                "text": "Advanced extras like emojis, a table of contents, mentions, dates, and toggles help you organize and personalize content."
                            }
                        ],
                        "id": "b8c9d0e1f2"
                    },
                    {
                        "type": "h2",
                        "children": [
                            {
                                "text": "Steps"
                            }
                        ],
                        "id": "c9d0e1f2a3"
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "decimal",
                        "children": [
                            {
                                "text": "Open the editor and start a new blog post, then click into the main writing area to place your cursor."
                            }
                        ],
                        "id": "d0e1f2a3b4"
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "decimal",
                        "children": [
                            {
                                "text": "Type your text to create paragraph blocks, pressing Enter to begin a new block each time."
                            }
                        ],
                        "id": "e1f2a3b4c5",
                        "listStart": 2
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "decimal",
                        "children": [
                            {
                                "text": "Type the slash key to open the insert menu, then choose a block type such as heading, image, table, poll, or FAQ."
                            }
                        ],
                        "id": "f2a3b4c5d6",
                        "listStart": 3
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "decimal",
                        "children": [
                            {
                                "text": "Highlight any text to reveal the formatting toolbar, where you can apply bold, links, highlights, and other styles."
                            }
                        ],
                        "id": "a3b4c5d6e7",
                        "listStart": 4
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "decimal",
                        "children": [
                            {
                                "text": "Drag blocks to reorder them or adjust their settings until the layout looks the way you want."
                            }
                        ],
                        "id": "b4c5d6e7f8",
                        "listStart": 5
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "decimal",
                        "children": [
                            {
                                "text": "Preview your post and publish it once your content and interactive elements are arranged correctly."
                            }
                        ],
                        "id": "c5d6e7f8a9",
                        "listStart": 6
                    },
                    {
                        "type": "h2",
                        "children": [
                            {
                                "text": "Available Block Types"
                            }
                        ],
                        "id": "d6e7f8a9b0"
                    },
                    {
                        "type": "table",
                        "id": "e7f8a9b0c1",
                        "children": [
                            {
                                "type": "tr",
                                "id": "f8a9b0c1d2",
                                "children": [
                                    {
                                        "type": "th",
                                        "id": "a9b0c1d2e3",
                                        "children": [
                                            {
                                                "type": "p",
                                                "children": [
                                                    {
                                                        "text": "Category"
                                                    }
                                                ],
                                                "id": "b0c1d2e3f4"
                                            }
                                        ]
                                    },
                                    {
                                        "type": "th",
                                        "id": "c1d2e3f4a5",
                                        "children": [
                                            {
                                                "type": "p",
                                                "children": [
                                                    {
                                                        "text": "Block Examples"
                                                    }
                                                ],
                                                "id": "d2e3f4a5b6"
                                            }
                                        ]
                                    },
                                    {
                                        "type": "th",
                                        "id": "e3f4a5b6c7",
                                        "children": [
                                            {
                                                "type": "p",
                                                "children": [
                                                    {
                                                        "text": "Best Used For"
                                                    }
                                                ],
                                                "id": "f4a5b6c7d8"
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                "type": "tr",
                                "id": "a5b6c7d8e9",
                                "children": [
                                    {
                                        "type": "td",
                                        "id": "b6c7d8e9f0",
                                        "children": [
                                            {
                                                "type": "p",
                                                "children": [
                                                    {
                                                        "text": "Text"
                                                    }
                                                ],
                                                "id": "c7d8e9f0a1"
                                            }
                                        ]
                                    },
                                    {
                                        "type": "td",
                                        "id": "d8e9f0a1b2",
                                        "children": [
                                            {
                                                "type": "p",
                                                "children": [
                                                    {
                                                        "text": "Paragraphs, headings, lists, blockquotes, code blocks"
                                                    }
                                                ],
                                                "id": "e9f0a1b2c3"
                                            }
                                        ]
                                    },
                                    {
                                        "type": "td",
                                        "id": "f0a1b2c3d4",
                                        "children": [
                                            {
                                                "type": "p",
                                                "children": [
                                                    {
                                                        "text": "Writing and structuring your main article"
                                                    }
                                                ],
                                                "id": "a1b2c3d4e6"
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                "type": "tr",
                                "id": "b2c3d4e6f7",
                                "children": [
                                    {
                                        "type": "td",
                                        "id": "c3d4e6f7a8",
                                        "children": [
                                            {
                                                "type": "p",
                                                "children": [
                                                    {
                                                        "text": "Media"
                                                    }
                                                ],
                                                "id": "d4e6f7a8b9"
                                            }
                                        ]
                                    },
                                    {
                                        "type": "td",
                                        "id": "e6f7a8b9c0",
                                        "children": [
                                            {
                                                "type": "p",
                                                "children": [
                                                    {
                                                        "text": "Images, tables, drawings, math equations, animations"
                                                    }
                                                ],
                                                "id": "f7a8b9c0d1"
                                            }
                                        ]
                                    },
                                    {
                                        "type": "td",
                                        "id": "a8b9c0d1e2",
                                        "children": [
                                            {
                                                "type": "p",
                                                "children": [
                                                    {
                                                        "text": "Illustrating ideas with visuals and rich elements"
                                                    }
                                                ],
                                                "id": "b9c0d1e2f3"
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                "type": "tr",
                                "id": "c0d1e2f3a4",
                                "children": [
                                    {
                                        "type": "td",
                                        "id": "d1e2f3a4b5",
                                        "children": [
                                            {
                                                "type": "p",
                                                "children": [
                                                    {
                                                        "text": "Interactive"
                                                    }
                                                ],
                                                "id": "e2f3a4b5c6"
                                            }
                                        ]
                                    },
                                    {
                                        "type": "td",
                                        "id": "f3a4b5c6d7",
                                        "children": [
                                            {
                                                "type": "p",
                                                "children": [
                                                    {
                                                        "text": "Polls, FAQs, lead magnets, banners, infographics"
                                                    }
                                                ],
                                                "id": "a4b5c6d7e8"
                                            }
                                        ]
                                    },
                                    {
                                        "type": "td",
                                        "id": "b5c6d7e8f9",
                                        "children": [
                                            {
                                                "type": "p",
                                                "children": [
                                                    {
                                                        "text": "Boosting reader engagement and capturing leads"
                                                    }
                                                ],
                                                "id": "c6d7e8f9a0"
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                "type": "tr",
                                "id": "d7e8f9a0b1",
                                "children": [
                                    {
                                        "type": "td",
                                        "id": "e8f9a0b1c2",
                                        "children": [
                                            {
                                                "type": "p",
                                                "children": [
                                                    {
                                                        "text": "Extras"
                                                    }
                                                ],
                                                "id": "f9a0b1c2d3"
                                            }
                                        ]
                                    },
                                    {
                                        "type": "td",
                                        "id": "a0b1c2d3e4",
                                        "children": [
                                            {
                                                "type": "p",
                                                "children": [
                                                    {
                                                        "text": "Emojis, table of contents, mentions, dates, toggles, columns"
                                                    }
                                                ],
                                                "id": "b1c2d3e4f5"
                                            }
                                        ]
                                    },
                                    {
                                        "type": "td",
                                        "id": "c2d3e4f5a6",
                                        "children": [
                                            {
                                                "type": "p",
                                                "children": [
                                                    {
                                                        "text": "Adding organization and personal touches"
                                                    }
                                                ],
                                                "id": "d3e4f5a6b7"
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "type": "h2",
                        "children": [
                            {
                                "text": "Tips"
                            }
                        ],
                        "id": "e4f5a6b7c8"
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "disc",
                        "children": [
                            {
                                "text": "Use the slash menu as your fastest path to inserting any block—just type the name of what you want, like \"poll\" or \"table.\""
                            }
                        ],
                        "id": "f5a6b7c8d9"
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "disc",
                        "children": [
                            {
                                "text": "Add a table of contents block to long posts so readers can jump straight to the sections they care about."
                            }
                        ],
                        "id": "a6b7c8d9e0"
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "disc",
                        "children": [
                            {
                                "text": "Place interactive blocks like polls or lead magnets partway through your article, where readers are already engaged."
                            }
                        ],
                        "id": "b7c8d9e0f1"
                    },
                    {
                        "type": "callout",
                        "variant": "tip",
                        "children": [
                            {
                                "text": "Heavy elements such as drawings, animations, and math equations load only when needed, so you can use them freely without slowing down your readers."
                            }
                        ],
                        "id": "c8d9e0f1a2"
                    },
                    {
                        "type": "callout",
                        "variant": "info",
                        "children": [
                            {
                                "text": "Your content is structured as separate blocks behind the scenes, which is what lets HyperBlog reorder, style, and publish each piece independently."
                            }
                        ],
                        "id": "d9e0f1a2b3"
                    },
                    {
                        "type": "h2",
                        "children": [
                            {
                                "text": "Troubleshooting"
                            }
                        ],
                        "id": "e0f1a2b3c4"
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "disc",
                        "children": [
                            {
                                "text": "If the slash menu doesn't appear, make sure your cursor is on an empty line and try typing the slash key again."
                            }
                        ],
                        "id": "f1a2b3c4d5"
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "disc",
                        "children": [
                            {
                                "text": "If a block won't move, click directly on its drag handle before dragging it to a new position."
                            }
                        ],
                        "id": "a2b3c4d5e6"
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "disc",
                        "children": [
                            {
                                "text": "If formatting options are missing, select the text first—the toolbar only appears once content is highlighted."
                            }
                        ],
                        "id": "b3c4d5e6f7"
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "disc",
                        "children": [
                            {
                                "text": "If an interactive block looks empty, open its settings to confirm you've configured its content, such as poll questions or FAQ answers."
                            }
                        ],
                        "id": "c4d5e6f7a8"
                    },
                    {
                        "type": "p",
                        "children": [
                            {
                                "text": "Related topics: Embedding Interactive Components, Adding Media and Rich Elements, Publishing Your Blog Post."
                            }
                        ],
                        "id": "d5e6f7a8b9"
                    }
                ]
            }
        ]
    },
    {
        "id": "f-github-hyperblog-frontend-test-writing-content",
        "title": "Writing Content",
        "slug": "github-hyperblog-frontend-test-writing-content",
        "type": "folder",
        "children": [
            {
                "id": "p-github-hyperblog-frontend-test-adding-text-and-formatting-blocks",
                "title": "Adding Text and Formatting Blocks",
                "slug": "github-hyperblog-frontend-test-adding-text-and-formatting-blocks",
                "type": "page",
                "description": "Write with paragraphs, headings, lists, blockquotes, code blocks, and highlights.",
                "content": [
                    {
                        "type": "h1",
                        "children": [
                            {
                                "text": "Adding Text and Formatting Blocks"
                            }
                        ],
                        "id": "a1b2c3d4e5"
                    },
                    {
                        "type": "p",
                        "children": [
                            {
                                "text": "The block editor is where you write and shape every blog post in HyperBlog. With text and formatting blocks, you can structure your writing using paragraphs, headings, lists, blockquotes, code blocks, and highlights so your content reads clearly and looks polished."
                            }
                        ],
                        "id": "b2c3d4e5f6"
                    },
                    {
                        "type": "h2",
                        "children": [
                            {
                                "text": "How It Works"
                            }
                        ],
                        "id": "c3d4e5f6g7"
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "disc",
                        "children": [
                            {
                                "text": "Write in blocks, where each paragraph, heading, or list is its own movable element you can rearrange at any time."
                            }
                        ],
                        "id": "d4e5f6g7h8"
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "disc",
                        "children": [
                            {
                                "text": "Structure your post with multiple heading levels to create clear sections and an easy-to-scan layout."
                            }
                        ],
                        "id": "e5f6g7h8i9"
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "disc",
                        "children": [
                            {
                                "text": "Format inline text with highlights, bold, and other emphasis to draw attention to key points."
                            }
                        ],
                        "id": "f6g7h8i9j0"
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "disc",
                        "children": [
                            {
                                "text": "Add bulleted and numbered lists, blockquotes, and code blocks to present information in the most readable form."
                            }
                        ],
                        "id": "g7h8i9j0k1"
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "disc",
                        "children": [
                            {
                                "text": "Insert blocks quickly using the slash menu or the formatting toolbar without leaving the writing flow."
                            }
                        ],
                        "id": "h8i9j0k1l2"
                    },
                    {
                        "type": "h2",
                        "children": [
                            {
                                "text": "Steps"
                            }
                        ],
                        "id": "i9j0k1l2m3"
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "decimal",
                        "children": [
                            {
                                "text": "Open the editor for a new or existing blog post and click into the writing area to begin."
                            }
                        ],
                        "id": "j0k1l2m3n4"
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "decimal",
                        "children": [
                            {
                                "text": "Type your text directly to create a paragraph block, then press Enter to start a new block."
                            }
                        ],
                        "id": "k1l2m3n4o5",
                        "listStart": 2
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "decimal",
                        "children": [
                            {
                                "text": "To change a block's type, type \"/\" to open the slash menu and choose an option such as Heading, Bulleted List, Quote, or Code Block."
                            }
                        ],
                        "id": "l2m3n4o5p6",
                        "listStart": 3
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "decimal",
                        "children": [
                            {
                                "text": "Select any text and use the toolbar to apply formatting like bold, highlight, or links."
                            }
                        ],
                        "id": "m3n4o5p6q7",
                        "listStart": 4
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "decimal",
                        "children": [
                            {
                                "text": "Drag blocks to reorder them, and continue adding content until your post is structured the way you want."
                            }
                        ],
                        "id": "n4o5p6q7r8",
                        "listStart": 5
                    },
                    {
                        "type": "h2",
                        "children": [
                            {
                                "text": "Available Text and Formatting Blocks"
                            }
                        ],
                        "id": "o5p6q7r8s9"
                    },
                    {
                        "type": "table",
                        "id": "p6q7r8s9t0",
                        "children": [
                            {
                                "type": "tr",
                                "id": "q7r8s9t0u1",
                                "children": [
                                    {
                                        "type": "th",
                                        "id": "r8s9t0u1v2",
                                        "children": [
                                            {
                                                "type": "p",
                                                "children": [
                                                    {
                                                        "text": "Block"
                                                    }
                                                ],
                                                "id": "s9t0u1v2w3"
                                            }
                                        ]
                                    },
                                    {
                                        "type": "th",
                                        "id": "t0u1v2w3x4",
                                        "children": [
                                            {
                                                "type": "p",
                                                "children": [
                                                    {
                                                        "text": "Use It For"
                                                    }
                                                ],
                                                "id": "u1v2w3x4y5"
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                "type": "tr",
                                "id": "v2w3x4y5z6",
                                "children": [
                                    {
                                        "type": "td",
                                        "id": "w3x4y5z6a7",
                                        "children": [
                                            {
                                                "type": "p",
                                                "children": [
                                                    {
                                                        "text": "Paragraph"
                                                    }
                                                ],
                                                "id": "x4y5z6a7b8"
                                            }
                                        ]
                                    },
                                    {
                                        "type": "td",
                                        "id": "y5z6a7b8c9",
                                        "children": [
                                            {
                                                "type": "p",
                                                "children": [
                                                    {
                                                        "text": "Standard body text that makes up the bulk of your post."
                                                    }
                                                ],
                                                "id": "z6a7b8c9d0"
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                "type": "tr",
                                "id": "a7b8c9d0e1",
                                "children": [
                                    {
                                        "type": "td",
                                        "id": "b8c9d0e1f2",
                                        "children": [
                                            {
                                                "type": "p",
                                                "children": [
                                                    {
                                                        "text": "Heading"
                                                    }
                                                ],
                                                "id": "c9d0e1f2g3"
                                            }
                                        ]
                                    },
                                    {
                                        "type": "td",
                                        "id": "d0e1f2g3h4",
                                        "children": [
                                            {
                                                "type": "p",
                                                "children": [
                                                    {
                                                        "text": "Section titles that organize your content into a clear hierarchy."
                                                    }
                                                ],
                                                "id": "e1f2g3h4i5"
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                "type": "tr",
                                "id": "f2g3h4i5j6",
                                "children": [
                                    {
                                        "type": "td",
                                        "id": "g3h4i5j6k7",
                                        "children": [
                                            {
                                                "type": "p",
                                                "children": [
                                                    {
                                                        "text": "Bulleted & Numbered Lists"
                                                    }
                                                ],
                                                "id": "h4i5j6k7l8"
                                            }
                                        ]
                                    },
                                    {
                                        "type": "td",
                                        "id": "i5j6k7l8m9",
                                        "children": [
                                            {
                                                "type": "p",
                                                "children": [
                                                    {
                                                        "text": "Steps, tips, and grouped items presented in an easy-to-scan format."
                                                    }
                                                ],
                                                "id": "j6k7l8m9n0"
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                "type": "tr",
                                "id": "k7l8m9n0o1",
                                "children": [
                                    {
                                        "type": "td",
                                        "id": "l8m9n0o1p2",
                                        "children": [
                                            {
                                                "type": "p",
                                                "children": [
                                                    {
                                                        "text": "Blockquote"
                                                    }
                                                ],
                                                "id": "m9n0o1p2q3"
                                            }
                                        ]
                                    },
                                    {
                                        "type": "td",
                                        "id": "n0o1p2q3r4",
                                        "children": [
                                            {
                                                "type": "p",
                                                "children": [
                                                    {
                                                        "text": "Highlighting quotes, callouts, or noteworthy statements."
                                                    }
                                                ],
                                                "id": "o1p2q3r4s5"
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                "type": "tr",
                                "id": "p2q3r4s5t6",
                                "children": [
                                    {
                                        "type": "td",
                                        "id": "q3r4s5t6u7",
                                        "children": [
                                            {
                                                "type": "p",
                                                "children": [
                                                    {
                                                        "text": "Code Block"
                                                    }
                                                ],
                                                "id": "r4s5t6u7v8"
                                            }
                                        ]
                                    },
                                    {
                                        "type": "td",
                                        "id": "s5t6u7v8w9",
                                        "children": [
                                            {
                                                "type": "p",
                                                "children": [
                                                    {
                                                        "text": "Displaying snippets of code with clear formatting."
                                                    }
                                                ],
                                                "id": "t6u7v8w9x0"
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                "type": "tr",
                                "id": "u7v8w9x0y1",
                                "children": [
                                    {
                                        "type": "td",
                                        "id": "v8w9x0y1z2",
                                        "children": [
                                            {
                                                "type": "p",
                                                "children": [
                                                    {
                                                        "text": "Highlight"
                                                    }
                                                ],
                                                "id": "w9x0y1z2a3"
                                            }
                                        ]
                                    },
                                    {
                                        "type": "td",
                                        "id": "x0y1z2a3b4",
                                        "children": [
                                            {
                                                "type": "p",
                                                "children": [
                                                    {
                                                        "text": "Drawing attention to key words or phrases inline."
                                                    }
                                                ],
                                                "id": "y1z2a3b4c5"
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "type": "h2",
                        "children": [
                            {
                                "text": "Tips"
                            }
                        ],
                        "id": "z2a3b4c5d6"
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "disc",
                        "children": [
                            {
                                "text": "Use headings consistently to create a logical structure that also improves how your post appears in search results."
                            }
                        ],
                        "id": "a3b4c5d6e7"
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "disc",
                        "children": [
                            {
                                "text": "Break long paragraphs into shorter ones and lists to keep readers engaged on the page."
                            }
                        ],
                        "id": "b4c5d6e7f8"
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "disc",
                        "children": [
                            {
                                "text": "The slash menu is the fastest way to insert any block — just type \"/\" and start typing the block name."
                            }
                        ],
                        "id": "c5d6e7f8g9"
                    },
                    {
                        "type": "callout",
                        "variant": "tip",
                        "children": [
                            {
                                "text": "Highlight only the most important words. Overusing highlights makes them lose their impact."
                            }
                        ],
                        "id": "d6e7f8g9h0"
                    },
                    {
                        "type": "callout",
                        "variant": "info",
                        "children": [
                            {
                                "text": "Most blocks can be reordered by dragging, so you can restructure your post at any time without retyping."
                            }
                        ],
                        "id": "e7f8g9h0i1"
                    },
                    {
                        "type": "h2",
                        "children": [
                            {
                                "text": "Troubleshooting"
                            }
                        ],
                        "id": "f8g9h0i1j2"
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "disc",
                        "children": [
                            {
                                "text": "If the slash menu doesn't appear, make sure your cursor is on an empty line or at the start of a block before typing \"/\"."
                            }
                        ],
                        "id": "g9h0i1j2k3"
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "disc",
                        "children": [
                            {
                                "text": "If formatting like bold or highlight isn't applying, confirm you have selected the text first before clicking the toolbar option."
                            }
                        ],
                        "id": "h0i1j2k3l4"
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "disc",
                        "children": [
                            {
                                "text": "If a block appears in the wrong place, drag it to reposition it instead of deleting and retyping the content."
                            }
                        ],
                        "id": "i1j2k3l4m5"
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "disc",
                        "children": [
                            {
                                "text": "If pressing Enter inside a list keeps adding new list items, press Enter on an empty item to exit the list and return to a paragraph."
                            }
                        ],
                        "id": "j2k3l4m5n6"
                    },
                    {
                        "type": "p",
                        "children": [
                            {
                                "text": "Related topics: Inserting Content with Slash Commands, Adding Advanced Media and Rich Elements, Embedding Interactive Engagement Components."
                            }
                        ],
                        "id": "k3l4m5n6o7"
                    }
                ]
            },
            {
                "id": "p-github-hyperblog-frontend-test-inserting-blocks-with-slash-commands",
                "title": "Inserting Blocks with Slash Commands",
                "slug": "github-hyperblog-frontend-test-inserting-blocks-with-slash-commands",
                "type": "page",
                "description": "Quickly add and format content blocks using slash menus and the toolbar.",
                "content": [
                    {
                        "type": "h1",
                        "children": [
                            {
                                "text": "Inserting Blocks with Slash Commands"
                            }
                        ],
                        "id": "a1b2c3d4e5"
                    },
                    {
                        "type": "p",
                        "children": [
                            {
                                "text": "Slash commands let you add and format content blocks in your blog post without lifting your hands from the keyboard. Type a slash, choose a block, and it appears instantly where your cursor sits — making writing faster and more fluid."
                            }
                        ],
                        "id": "f6g7h8i9j0"
                    },
                    {
                        "type": "h2",
                        "children": [
                            {
                                "text": "How It Works"
                            }
                        ],
                        "id": "k1l2m3n4o5"
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "disc",
                        "children": [
                            {
                                "text": "Typing a forward slash (/) opens a searchable menu of available blocks right at your cursor position."
                            }
                        ],
                        "id": "p6q7r8s9t0"
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "disc",
                        "children": [
                            {
                                "text": "You can insert text elements such as headings, paragraphs, lists, blockquotes, code blocks, and tables."
                            }
                        ],
                        "id": "u1v2w3x4y5"
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "disc",
                        "children": [
                            {
                                "text": "Rich elements like images, drawings, math equations, animations, emojis, and a table of contents are available from the same menu."
                            }
                        ],
                        "id": "z6a7b8c9d0"
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "disc",
                        "children": [
                            {
                                "text": "Interactive engagement components — polls, FAQs, lead magnets, banners, and infographics — can be inserted directly into your post."
                            }
                        ],
                        "id": "e1f2g3h4i5"
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "disc",
                        "children": [
                            {
                                "text": "A floating toolbar also lets you format selected text and add blocks if you prefer clicking over typing commands."
                            }
                        ],
                        "id": "j6k7l8m9n0"
                    },
                    {
                        "type": "h2",
                        "children": [
                            {
                                "text": "Steps"
                            }
                        ],
                        "id": "o1p2q3r4s5"
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "decimal",
                        "children": [
                            {
                                "text": "Open your blog post in the editor and place your cursor on a new, empty line where you want the block to appear."
                            }
                        ],
                        "id": "t6u7v8w9x0"
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "decimal",
                        "children": [
                            {
                                "text": "Type a forward slash (/) to open the slash command menu."
                            }
                        ],
                        "id": "y1z2a3b4c5",
                        "listStart": 2
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "decimal",
                        "children": [
                            {
                                "text": "Start typing the name of the block you want — for example, \"poll,\" \"heading,\" or \"image\" — to filter the list."
                            }
                        ],
                        "id": "d6e7f8g9h0",
                        "listStart": 3
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "decimal",
                        "children": [
                            {
                                "text": "Use the arrow keys or your mouse to highlight the block you want, then press Enter or click to insert it."
                            }
                        ],
                        "id": "i1j2k3l4m5",
                        "listStart": 4
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "decimal",
                        "children": [
                            {
                                "text": "Configure the inserted block — add your text, upload media, or set up the interactive component as needed."
                            }
                        ],
                        "id": "n6o7p8q9r0",
                        "listStart": 5
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "decimal",
                        "children": [
                            {
                                "text": "Continue writing, or select text and use the floating toolbar to apply formatting like bold, highlights, or links."
                            }
                        ],
                        "id": "s1t2u3v4w5",
                        "listStart": 6
                    },
                    {
                        "type": "h2",
                        "children": [
                            {
                                "text": "Available Block Types"
                            }
                        ],
                        "id": "x6y7z8a9b0"
                    },
                    {
                        "type": "table",
                        "id": "c1d2e3f4g5",
                        "children": [
                            {
                                "type": "tr",
                                "id": "h6i7j8k9l0",
                                "children": [
                                    {
                                        "type": "th",
                                        "id": "m1n2o3p4q5",
                                        "children": [
                                            {
                                                "type": "p",
                                                "children": [
                                                    {
                                                        "text": "Category"
                                                    }
                                                ],
                                                "id": "r6s7t8u9v0"
                                            }
                                        ]
                                    },
                                    {
                                        "type": "th",
                                        "id": "w1x2y3z4a5",
                                        "children": [
                                            {
                                                "type": "p",
                                                "children": [
                                                    {
                                                        "text": "Blocks You Can Insert"
                                                    }
                                                ],
                                                "id": "b6c7d8e9f0"
                                            }
                                        ]
                                    },
                                    {
                                        "type": "th",
                                        "id": "g1h2i3j4k5",
                                        "children": [
                                            {
                                                "type": "p",
                                                "children": [
                                                    {
                                                        "text": "Best Used For"
                                                    }
                                                ],
                                                "id": "l6m7n8o9p0"
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                "type": "tr",
                                "id": "q1r2s3t4u5",
                                "children": [
                                    {
                                        "type": "td",
                                        "id": "v6w7x8y9z0",
                                        "children": [
                                            {
                                                "type": "p",
                                                "children": [
                                                    {
                                                        "text": "Text"
                                                    }
                                                ],
                                                "id": "a1b2c3d4e6"
                                            }
                                        ]
                                    },
                                    {
                                        "type": "td",
                                        "id": "f6g7h8i9j1",
                                        "children": [
                                            {
                                                "type": "p",
                                                "children": [
                                                    {
                                                        "text": "Headings, paragraphs, lists, blockquotes, code blocks, tables, toggles"
                                                    }
                                                ],
                                                "id": "k1l2m3n4o6"
                                            }
                                        ]
                                    },
                                    {
                                        "type": "td",
                                        "id": "p6q7r8s9t1",
                                        "children": [
                                            {
                                                "type": "p",
                                                "children": [
                                                    {
                                                        "text": "Structuring and writing your article"
                                                    }
                                                ],
                                                "id": "u1v2w3x4y6"
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                "type": "tr",
                                "id": "z6a7b8c9d1",
                                "children": [
                                    {
                                        "type": "td",
                                        "id": "e1f2g3h4i6",
                                        "children": [
                                            {
                                                "type": "p",
                                                "children": [
                                                    {
                                                        "text": "Media & Rich"
                                                    }
                                                ],
                                                "id": "j6k7l8m9n1"
                                            }
                                        ]
                                    },
                                    {
                                        "type": "td",
                                        "id": "o1p2q3r4s6",
                                        "children": [
                                            {
                                                "type": "p",
                                                "children": [
                                                    {
                                                        "text": "Images, drawings, math equations, animations, emojis, table of contents"
                                                    }
                                                ],
                                                "id": "t6u7v8w9x1"
                                            }
                                        ]
                                    },
                                    {
                                        "type": "td",
                                        "id": "y1z2a3b4c6",
                                        "children": [
                                            {
                                                "type": "p",
                                                "children": [
                                                    {
                                                        "text": "Visual interest and explanation"
                                                    }
                                                ],
                                                "id": "d6e7f8g9h1"
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                "type": "tr",
                                "id": "i1j2k3l4m6",
                                "children": [
                                    {
                                        "type": "td",
                                        "id": "n6o7p8q9r1",
                                        "children": [
                                            {
                                                "type": "p",
                                                "children": [
                                                    {
                                                        "text": "Engagement"
                                                    }
                                                ],
                                                "id": "s1t2u3v4w6"
                                            }
                                        ]
                                    },
                                    {
                                        "type": "td",
                                        "id": "x6y7z8a9b1",
                                        "children": [
                                            {
                                                "type": "p",
                                                "children": [
                                                    {
                                                        "text": "Polls, FAQs, lead magnets, banners, infographics"
                                                    }
                                                ],
                                                "id": "c1d2e3f4g6"
                                            }
                                        ]
                                    },
                                    {
                                        "type": "td",
                                        "id": "h6i7j8k9l1",
                                        "children": [
                                            {
                                                "type": "p",
                                                "children": [
                                                    {
                                                        "text": "Boosting reader interaction and conversions"
                                                    }
                                                ],
                                                "id": "m1n2o3p4q6"
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "type": "h2",
                        "children": [
                            {
                                "text": "Tips"
                            }
                        ],
                        "id": "r6s7t8u9v1"
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "disc",
                        "children": [
                            {
                                "text": "Type a keyword right after the slash to jump straight to the block you need instead of scrolling the full list."
                            }
                        ],
                        "id": "w1x2y3z4a6"
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "disc",
                        "children": [
                            {
                                "text": "Press Escape to close the slash menu without inserting anything if you change your mind."
                            }
                        ],
                        "id": "b6c7d8e9f1"
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "disc",
                        "children": [
                            {
                                "text": "Use the floating toolbar for quick text formatting when you already have content selected."
                            }
                        ],
                        "id": "g1h2i3j4k6"
                    },
                    {
                        "type": "callout",
                        "variant": "tip",
                        "children": [
                            {
                                "text": "Heavier blocks like drawings, animations, and math equations load on demand, so the editor stays fast even when your post mixes many element types."
                            }
                        ],
                        "id": "l6m7n8o9p1"
                    },
                    {
                        "type": "callout",
                        "variant": "info",
                        "children": [
                            {
                                "text": "Interactive components such as polls and lead magnets can be configured after insertion to capture reader responses and sign-ups."
                            }
                        ],
                        "id": "q1r2s3t4u6"
                    },
                    {
                        "type": "h2",
                        "children": [
                            {
                                "text": "Troubleshooting"
                            }
                        ],
                        "id": "v6w7x8y9z1"
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "disc",
                        "children": [
                            {
                                "text": "Slash menu doesn't appear: Make sure your cursor is on an empty line and try typing the slash again at the start of the line."
                            }
                        ],
                        "id": "a1b2c3d4e7"
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "disc",
                        "children": [
                            {
                                "text": "Block isn't in the list: Clear your search text — a typo in the keyword can hide the block you're looking for."
                            }
                        ],
                        "id": "f6g7h8i9j2"
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "disc",
                        "children": [
                            {
                                "text": "A rich element shows a loading message: Wait a moment while the drawing, animation, or math tool finishes loading, then it will be ready to edit."
                            }
                        ],
                        "id": "k1l2m3n4o7"
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "disc",
                        "children": [
                            {
                                "text": "Inserted block appears in the wrong spot: Undo the action, reposition your cursor where you want the block, and insert it again."
                            }
                        ],
                        "id": "p6q7r8s9t2"
                    },
                    {
                        "type": "p",
                        "children": [
                            {
                                "text": "Related topics: Create and Edit Blog Content, Embed Interactive Engagement Components, Add Advanced Media and Rich Elements."
                            }
                        ],
                        "id": "u1v2w3x4y7"
                    }
                ]
            },
            {
                "id": "p-github-hyperblog-frontend-test-structuring-layouts-and-columns",
                "title": "Structuring Layouts and Columns",
                "slug": "github-hyperblog-frontend-test-structuring-layouts-and-columns",
                "type": "page",
                "description": "Organize content using columns, toggles, tables, and a table of contents.",
                "content": [
                    {
                        "type": "h1",
                        "children": [
                            {
                                "text": "Structuring Layouts and Columns"
                            }
                        ],
                        "id": "a1b2c3d4e5"
                    },
                    {
                        "type": "p",
                        "children": [
                            {
                                "text": "Well-structured content keeps readers engaged and makes long posts easy to scan. HyperBlog gives you flexible layout tools — columns, toggles, tables, and a table of contents — so you can organize information clearly and guide readers through your post."
                            }
                        ],
                        "id": "f6g7h8i9j0"
                    },
                    {
                        "type": "h2",
                        "children": [
                            {
                                "text": "How It Works"
                            }
                        ],
                        "id": "k1l2m3n4o5"
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "disc",
                        "children": [
                            {
                                "text": "Columns let you place blocks side by side, splitting your content into multiple vertical sections within a single row."
                            }
                        ],
                        "id": "p6q7r8s9t0"
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "disc",
                        "children": [
                            {
                                "text": "Toggles create collapsible sections that readers can expand or hide, keeping pages tidy and reducing clutter."
                            }
                        ],
                        "id": "u1v2w3x4y5"
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "disc",
                        "children": [
                            {
                                "text": "Tables organize structured data into rows and columns for easy comparison and reference."
                            }
                        ],
                        "id": "z6a7b8c9d0"
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "disc",
                        "children": [
                            {
                                "text": "A table of contents automatically lists your headings, letting readers jump straight to the section they want."
                            }
                        ],
                        "id": "e1f2g3h4i5"
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "disc",
                        "children": [
                            {
                                "text": "All layout elements can be inserted quickly using the slash menu or the editor toolbar while you write."
                            }
                        ],
                        "id": "j6k7l8m9n0"
                    },
                    {
                        "type": "h2",
                        "children": [
                            {
                                "text": "Steps"
                            }
                        ],
                        "id": "o1p2q3r4s5"
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "decimal",
                        "children": [
                            {
                                "text": "Open your post in the editor and place your cursor where you want to add a layout element."
                            }
                        ],
                        "id": "t6u7v8w9x0"
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "decimal",
                        "children": [
                            {
                                "text": "Type \"/\" to open the slash menu, then choose Columns, Toggle, Table, or Table of Contents."
                            }
                        ],
                        "id": "y1z2a3b4c5",
                        "listStart": 2
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "decimal",
                        "children": [
                            {
                                "text": "For columns, drag or paste blocks into each column area to arrange your content side by side."
                            }
                        ],
                        "id": "d6e7f8g9h0",
                        "listStart": 3
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "decimal",
                        "children": [
                            {
                                "text": "For toggles, type a title for the collapsible section and add the content you want hidden underneath it."
                            }
                        ],
                        "id": "i1j2k3l4m5",
                        "listStart": 4
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "decimal",
                        "children": [
                            {
                                "text": "For tables, add or remove rows and columns and fill in your cells with text or other blocks."
                            }
                        ],
                        "id": "n6o7p8q9r0",
                        "listStart": 5
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "decimal",
                        "children": [
                            {
                                "text": "Insert a table of contents near the top of your post — it updates automatically as you add headings, then publish when ready."
                            }
                        ],
                        "id": "s1t2u3v4w5",
                        "listStart": 6
                    },
                    {
                        "type": "h2",
                        "children": [
                            {
                                "text": "Layout Elements"
                            }
                        ],
                        "id": "x6y7z8a9b0"
                    },
                    {
                        "type": "table",
                        "id": "c1d2e3f4g5",
                        "children": [
                            {
                                "type": "tr",
                                "id": "h6i7j8k9l0",
                                "children": [
                                    {
                                        "type": "th",
                                        "id": "m1n2o3p4q5",
                                        "children": [
                                            {
                                                "type": "p",
                                                "children": [
                                                    {
                                                        "text": "Element"
                                                    }
                                                ],
                                                "id": "r6s7t8u9v0"
                                            }
                                        ]
                                    },
                                    {
                                        "type": "th",
                                        "id": "w1x2y3z4a5",
                                        "children": [
                                            {
                                                "type": "p",
                                                "children": [
                                                    {
                                                        "text": "Best Used For"
                                                    }
                                                ],
                                                "id": "b6c7d8e9f0"
                                            }
                                        ]
                                    },
                                    {
                                        "type": "th",
                                        "id": "g1h2i3j4k5",
                                        "children": [
                                            {
                                                "type": "p",
                                                "children": [
                                                    {
                                                        "text": "Reader Benefit"
                                                    }
                                                ],
                                                "id": "l6m7n8o9p0"
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                "type": "tr",
                                "id": "q1r2s3t4u5",
                                "children": [
                                    {
                                        "type": "td",
                                        "id": "v6w7x8y9z0",
                                        "children": [
                                            {
                                                "type": "p",
                                                "children": [
                                                    {
                                                        "text": "Columns"
                                                    }
                                                ],
                                                "id": "a1b2c3d4e6"
                                            }
                                        ]
                                    },
                                    {
                                        "type": "td",
                                        "id": "f6g7h8i9j1",
                                        "children": [
                                            {
                                                "type": "p",
                                                "children": [
                                                    {
                                                        "text": "Side-by-side text, images, or comparisons"
                                                    }
                                                ],
                                                "id": "k1l2m3n4o6"
                                            }
                                        ]
                                    },
                                    {
                                        "type": "td",
                                        "id": "p6q7r8s9t1",
                                        "children": [
                                            {
                                                "type": "p",
                                                "children": [
                                                    {
                                                        "text": "Cleaner, magazine-style layouts"
                                                    }
                                                ],
                                                "id": "u1v2w3x4y6"
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                "type": "tr",
                                "id": "z6a7b8c9d1",
                                "children": [
                                    {
                                        "type": "td",
                                        "id": "e1f2g3h4i6",
                                        "children": [
                                            {
                                                "type": "p",
                                                "children": [
                                                    {
                                                        "text": "Toggle"
                                                    }
                                                ],
                                                "id": "j6k7l8m9n1"
                                            }
                                        ]
                                    },
                                    {
                                        "type": "td",
                                        "id": "o1p2q3r4s6",
                                        "children": [
                                            {
                                                "type": "p",
                                                "children": [
                                                    {
                                                        "text": "Optional details, long explanations, FAQs"
                                                    }
                                                ],
                                                "id": "t6u7v8w9x1"
                                            }
                                        ]
                                    },
                                    {
                                        "type": "td",
                                        "id": "y1z2a3b4c6",
                                        "children": [
                                            {
                                                "type": "p",
                                                "children": [
                                                    {
                                                        "text": "Less scrolling, on-demand detail"
                                                    }
                                                ],
                                                "id": "d6e7f8g9h1"
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                "type": "tr",
                                "id": "i1j2k3l4m6",
                                "children": [
                                    {
                                        "type": "td",
                                        "id": "n6o7p8q9r1",
                                        "children": [
                                            {
                                                "type": "p",
                                                "children": [
                                                    {
                                                        "text": "Table"
                                                    }
                                                ],
                                                "id": "s1t2u3v4w6"
                                            }
                                        ]
                                    },
                                    {
                                        "type": "td",
                                        "id": "x6y7z8a9b1",
                                        "children": [
                                            {
                                                "type": "p",
                                                "children": [
                                                    {
                                                        "text": "Specifications, pricing, data comparisons"
                                                    }
                                                ],
                                                "id": "c1d2e3f4g6"
                                            }
                                        ]
                                    },
                                    {
                                        "type": "td",
                                        "id": "h6i7j8k9l1",
                                        "children": [
                                            {
                                                "type": "p",
                                                "children": [
                                                    {
                                                        "text": "Quick, scannable reference"
                                                    }
                                                ],
                                                "id": "m1n2o3p4q6"
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                "type": "tr",
                                "id": "r6s7t8u9v1",
                                "children": [
                                    {
                                        "type": "td",
                                        "id": "w1x2y3z4a6",
                                        "children": [
                                            {
                                                "type": "p",
                                                "children": [
                                                    {
                                                        "text": "Table of Contents"
                                                    }
                                                ],
                                                "id": "b6c7d8e9f1"
                                            }
                                        ]
                                    },
                                    {
                                        "type": "td",
                                        "id": "g1h2i3j4k6",
                                        "children": [
                                            {
                                                "type": "p",
                                                "children": [
                                                    {
                                                        "text": "Long-form posts with many headings"
                                                    }
                                                ],
                                                "id": "l6m7n8o9p1"
                                            }
                                        ]
                                    },
                                    {
                                        "type": "td",
                                        "id": "q1r2s3t4u6",
                                        "children": [
                                            {
                                                "type": "p",
                                                "children": [
                                                    {
                                                        "text": "Fast navigation to any section"
                                                    }
                                                ],
                                                "id": "v6w7x8y9z1"
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "type": "h2",
                        "children": [
                            {
                                "text": "Tips"
                            }
                        ],
                        "id": "a1b2c3d4e7"
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "disc",
                        "children": [
                            {
                                "text": "Use headings consistently throughout your post so your table of contents stays accurate and easy to follow."
                            }
                        ],
                        "id": "f6g7h8i9j2"
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "disc",
                        "children": [
                            {
                                "text": "Keep columns to two or three for the best appearance on smaller screens and mobile devices."
                            }
                        ],
                        "id": "k1l2m3n4o7"
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "disc",
                        "children": [
                            {
                                "text": "Use toggles to tuck away supplementary information so your main content stays focused and readable."
                            }
                        ],
                        "id": "p6q7r8s9t2"
                    },
                    {
                        "type": "callout",
                        "variant": "tip",
                        "children": [
                            {
                                "text": "Combine a table of contents at the top with toggles further down to create a clean, navigable long-form article."
                            }
                        ],
                        "id": "u1v2w3x4y7"
                    },
                    {
                        "type": "callout",
                        "variant": "info",
                        "children": [
                            {
                                "text": "Layout elements adjust to fit different screen sizes, so always preview your post before publishing to confirm it looks right on mobile."
                            }
                        ],
                        "id": "z6a7b8c9d2"
                    },
                    {
                        "type": "h2",
                        "children": [
                            {
                                "text": "Troubleshooting"
                            }
                        ],
                        "id": "e1f2g3h4i7"
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "disc",
                        "children": [
                            {
                                "text": "Table of contents is empty or missing entries: confirm you have added proper heading blocks — plain bold text won't appear as headings."
                            }
                        ],
                        "id": "j6k7l8m9n2"
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "disc",
                        "children": [
                            {
                                "text": "Columns look cramped or overlap: reduce the number of columns or move some content into a full-width block instead."
                            }
                        ],
                        "id": "o1p2q3r4s7"
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "disc",
                        "children": [
                            {
                                "text": "Toggle content won't show: make sure your blocks are placed inside the toggle area and that the toggle is expanded in the editor."
                            }
                        ],
                        "id": "t6u7v8w9x2"
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "disc",
                        "children": [
                            {
                                "text": "Table cells won't accept content: click directly inside a cell before typing, and use the table controls to add rows or columns as needed."
                            }
                        ],
                        "id": "y1z2a3b4c7"
                    },
                    {
                        "type": "p",
                        "children": [
                            {
                                "text": "Related topics: Create and Edit Blog Content, Insert Content with Slash Commands, Add Advanced Media and Rich Elements."
                            }
                        ],
                        "id": "d6e7f8g9h2"
                    }
                ]
            }
        ]
    },
    {
        "id": "f-github-hyperblog-frontend-test-rich-media",
        "title": "Rich Media",
        "slug": "github-hyperblog-frontend-test-rich-media",
        "type": "folder",
        "children": [
            {
                "id": "p-github-hyperblog-frontend-test-adding-images-and-media",
                "title": "Adding Images and Media",
                "slug": "github-hyperblog-frontend-test-adding-images-and-media",
                "type": "page",
                "description": "Upload and embed images hosted through Cloudinary into your posts.",
                "content": [
                    {
                        "type": "h1",
                        "children": [
                            {
                                "text": "Adding Images and Media"
                            }
                        ],
                        "id": "a1b2c3d4e5"
                    },
                    {
                        "type": "p",
                        "children": [
                            {
                                "text": "Images and media bring your blog posts to life, making them more engaging and easier to read. HyperBlog lets you upload images directly into your posts, where they are hosted reliably and delivered quickly to readers. This page walks you through adding images and other rich media while you write."
                            }
                        ],
                        "id": "b2c3d4e5f6"
                    },
                    {
                        "type": "h2",
                        "children": [
                            {
                                "text": "How It Works"
                            }
                        ],
                        "id": "c3d4e5f6a7"
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "disc",
                        "children": [
                            {
                                "text": "Upload images straight from your computer into any post, and they are stored and served through fast, optimized hosting."
                            }
                        ],
                        "id": "d4e5f6a7b8"
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "disc",
                        "children": [
                            {
                                "text": "Insert media blocks anywhere in your content using the slash menu or the editor toolbar."
                            }
                        ],
                        "id": "e5f6a7b8c9"
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "disc",
                        "children": [
                            {
                                "text": "Add advanced visual elements such as drawings, math equations, animations, and emojis alongside your images."
                            }
                        ],
                        "id": "f6a7b8c9d0"
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "disc",
                        "children": [
                            {
                                "text": "Images load progressively on published pages so readers see your content quickly without long waits."
                            }
                        ],
                        "id": "a7b8c9d0e1"
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "disc",
                        "children": [
                            {
                                "text": "Position and resize media within your layout to control how it appears next to text and other blocks."
                            }
                        ],
                        "id": "b8c9d0e1f2"
                    },
                    {
                        "type": "h2",
                        "children": [
                            {
                                "text": "Steps"
                            }
                        ],
                        "id": "c9d0e1f2a3"
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "decimal",
                        "children": [
                            {
                                "text": "Open the blog editor and place your cursor where you want the image or media to appear."
                            }
                        ],
                        "id": "d0e1f2a3b4"
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "decimal",
                        "children": [
                            {
                                "text": "Type \"/\" to open the slash menu, or use the toolbar, then choose the image or media option."
                            }
                        ],
                        "id": "e1f2a3b4c5",
                        "listStart": 2
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "decimal",
                        "children": [
                            {
                                "text": "Select an image file from your device to upload it, or paste an existing image link."
                            }
                        ],
                        "id": "f2a3b4c5d6",
                        "listStart": 3
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "decimal",
                        "children": [
                            {
                                "text": "Wait for the upload to finish — the image will appear in your post once it is hosted and ready."
                            }
                        ],
                        "id": "a3b4c5d6e7",
                        "listStart": 4
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "decimal",
                        "children": [
                            {
                                "text": "Adjust the size or placement of the media block, then continue writing or publish your post."
                            }
                        ],
                        "id": "b4c5d6e7f8",
                        "listStart": 5
                    },
                    {
                        "type": "h2",
                        "children": [
                            {
                                "text": "Media Options"
                            }
                        ],
                        "id": "c5d6e7f8a9"
                    },
                    {
                        "type": "table",
                        "id": "d6e7f8a9b0",
                        "children": [
                            {
                                "type": "tr",
                                "id": "e7f8a9b0c1",
                                "children": [
                                    {
                                        "type": "th",
                                        "id": "f8a9b0c1d2",
                                        "children": [
                                            {
                                                "type": "p",
                                                "children": [
                                                    {
                                                        "text": "Media Type"
                                                    }
                                                ],
                                                "id": "a9b0c1d2e3"
                                            }
                                        ]
                                    },
                                    {
                                        "type": "th",
                                        "id": "b0c1d2e3f4",
                                        "children": [
                                            {
                                                "type": "p",
                                                "children": [
                                                    {
                                                        "text": "Best Used For"
                                                    }
                                                ],
                                                "id": "c1d2e3f4a5"
                                            }
                                        ]
                                    },
                                    {
                                        "type": "th",
                                        "id": "d2e3f4a5b6",
                                        "children": [
                                            {
                                                "type": "p",
                                                "children": [
                                                    {
                                                        "text": "How to Add"
                                                    }
                                                ],
                                                "id": "e3f4a5b6c7"
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                "type": "tr",
                                "id": "f4a5b6c7d8",
                                "children": [
                                    {
                                        "type": "td",
                                        "id": "a5b6c7d8e9",
                                        "children": [
                                            {
                                                "type": "p",
                                                "children": [
                                                    {
                                                        "text": "Image"
                                                    }
                                                ],
                                                "id": "b6c7d8e9f0"
                                            }
                                        ]
                                    },
                                    {
                                        "type": "td",
                                        "id": "c7d8e9f0a1",
                                        "children": [
                                            {
                                                "type": "p",
                                                "children": [
                                                    {
                                                        "text": "Photos, screenshots, illustrations"
                                                    }
                                                ],
                                                "id": "d8e9f0a1b2"
                                            }
                                        ]
                                    },
                                    {
                                        "type": "td",
                                        "id": "e9f0a1b2c3",
                                        "children": [
                                            {
                                                "type": "p",
                                                "children": [
                                                    {
                                                        "text": "Upload a file or paste an image link"
                                                    }
                                                ],
                                                "id": "f0a1b2c3d4"
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                "type": "tr",
                                "id": "a1b2c3d4e6",
                                "children": [
                                    {
                                        "type": "td",
                                        "id": "b2c3d4e6f7",
                                        "children": [
                                            {
                                                "type": "p",
                                                "children": [
                                                    {
                                                        "text": "Drawing"
                                                    }
                                                ],
                                                "id": "c3d4e6f7a8"
                                            }
                                        ]
                                    },
                                    {
                                        "type": "td",
                                        "id": "d4e6f7a8b9",
                                        "children": [
                                            {
                                                "type": "p",
                                                "children": [
                                                    {
                                                        "text": "Sketches, diagrams, freehand visuals"
                                                    }
                                                ],
                                                "id": "e6f7a8b9c0"
                                            }
                                        ]
                                    },
                                    {
                                        "type": "td",
                                        "id": "f7a8b9c0d1",
                                        "children": [
                                            {
                                                "type": "p",
                                                "children": [
                                                    {
                                                        "text": "Insert a drawing block from the slash menu"
                                                    }
                                                ],
                                                "id": "a8b9c0d1e2"
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                "type": "tr",
                                "id": "b9c0d1e2f3",
                                "children": [
                                    {
                                        "type": "td",
                                        "id": "c0d1e2f3a4",
                                        "children": [
                                            {
                                                "type": "p",
                                                "children": [
                                                    {
                                                        "text": "Animation"
                                                    }
                                                ],
                                                "id": "d1e2f3a4b5"
                                            }
                                        ]
                                    },
                                    {
                                        "type": "td",
                                        "id": "e2f3a4b5c6",
                                        "children": [
                                            {
                                                "type": "p",
                                                "children": [
                                                    {
                                                        "text": "Eye-catching motion and visual interest"
                                                    }
                                                ],
                                                "id": "f3a4b5c6d7"
                                            }
                                        ]
                                    },
                                    {
                                        "type": "td",
                                        "id": "a4b5c6d7e8",
                                        "children": [
                                            {
                                                "type": "p",
                                                "children": [
                                                    {
                                                        "text": "Add an animation block where supported"
                                                    }
                                                ],
                                                "id": "b5c6d7e8f9"
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                "type": "tr",
                                "id": "c6d7e8f9a0",
                                "children": [
                                    {
                                        "type": "td",
                                        "id": "d7e8f9a0b1",
                                        "children": [
                                            {
                                                "type": "p",
                                                "children": [
                                                    {
                                                        "text": "Math equation"
                                                    }
                                                ],
                                                "id": "e8f9a0b1c2"
                                            }
                                        ]
                                    },
                                    {
                                        "type": "td",
                                        "id": "f9a0b1c2d3",
                                        "children": [
                                            {
                                                "type": "p",
                                                "children": [
                                                    {
                                                        "text": "Formulas and technical content"
                                                    }
                                                ],
                                                "id": "a0b1c2d3e4"
                                            }
                                        ]
                                    },
                                    {
                                        "type": "td",
                                        "id": "b1c2d3e4f5",
                                        "children": [
                                            {
                                                "type": "p",
                                                "children": [
                                                    {
                                                        "text": "Insert an equation block and enter your formula"
                                                    }
                                                ],
                                                "id": "c2d3e4f5a6"
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "type": "h2",
                        "children": [
                            {
                                "text": "Tips"
                            }
                        ],
                        "id": "d3e4f5a6b7"
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "disc",
                        "children": [
                            {
                                "text": "Choose clear, high-quality images, but keep file sizes reasonable so pages load quickly for readers."
                            }
                        ],
                        "id": "e4f5a6b7c8"
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "disc",
                        "children": [
                            {
                                "text": "Place media near the text it supports so readers can connect the visual to the point you're making."
                            }
                        ],
                        "id": "f5a6b7c8d9"
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "disc",
                        "children": [
                            {
                                "text": "Use drawings or animations sparingly to highlight key ideas rather than overwhelming the page."
                            }
                        ],
                        "id": "a6b7c8d9e0"
                    },
                    {
                        "type": "callout",
                        "variant": "tip",
                        "children": [
                            {
                                "text": "Uploaded images are delivered through optimized hosting, so they load fast on published posts without any extra setup from you."
                            }
                        ],
                        "id": "b7c8d9e0f1"
                    },
                    {
                        "type": "callout",
                        "variant": "info",
                        "children": [
                            {
                                "text": "Advanced media like animations and equations load progressively, keeping your main content visible while the extras finish loading."
                            }
                        ],
                        "id": "c8d9e0f1a2"
                    },
                    {
                        "type": "h2",
                        "children": [
                            {
                                "text": "Troubleshooting"
                            }
                        ],
                        "id": "d9e0f1a2b3"
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "disc",
                        "children": [
                            {
                                "text": "If an image fails to upload, check your internet connection and confirm the file is a supported image format, then try again."
                            }
                        ],
                        "id": "e0f1a2b3c4"
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "disc",
                        "children": [
                            {
                                "text": "If an image doesn't appear after pasting a link, make sure the link points directly to an image and is publicly accessible."
                            }
                        ],
                        "id": "f1a2b3c4d5"
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "disc",
                        "children": [
                            {
                                "text": "If a large image slows down editing, try resizing or compressing it before uploading."
                            }
                        ],
                        "id": "a2b3c4d5e6"
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "disc",
                        "children": [
                            {
                                "text": "If an animation or equation block doesn't render, refresh the editor and re-insert the block to reload the needed component."
                            }
                        ],
                        "id": "b3c4d5e6f7"
                    },
                    {
                        "type": "p",
                        "children": [
                            {
                                "text": "Related topics: Create and Edit Blog Content, Insert Content with Slash Commands, Adding Advanced Rich Elements."
                            }
                        ],
                        "id": "c4d5e6f7a8"
                    }
                ]
            },
            {
                "id": "p-github-hyperblog-frontend-test-inserting-drawings-and-animations",
                "title": "Inserting Drawings and Animations",
                "slug": "github-hyperblog-frontend-test-inserting-drawings-and-animations",
                "type": "page",
                "description": "Add Excalidraw drawings and Lottie animations to enrich your content.",
                "content": [
                    {
                        "type": "h1",
                        "children": [
                            {
                                "text": "Inserting Drawings and Animations"
                            }
                        ],
                        "id": "a1b2c3d4e5"
                    },
                    {
                        "type": "p",
                        "children": [
                            {
                                "text": "HyperBlog lets you bring your posts to life with hand-drawn diagrams and motion graphics. Using built-in drawing tools and animation support, you can illustrate concepts, add visual interest, and keep readers engaged without leaving the editor."
                            }
                        ],
                        "id": "f6g7h8i9j0"
                    },
                    {
                        "type": "h2",
                        "children": [
                            {
                                "text": "How It Works"
                            }
                        ],
                        "id": "k1l2m3n4o5"
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "disc",
                        "children": [
                            {
                                "text": "Create freehand drawings, shapes, arrows, and diagrams directly inside a post using the built-in drawing canvas."
                            }
                        ],
                        "id": "p6q7r8s9t0"
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "disc",
                        "children": [
                            {
                                "text": "Add lightweight, looping animations to highlight key sections or add visual flair to your content."
                            }
                        ],
                        "id": "u1v2w3x4y5"
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "disc",
                        "children": [
                            {
                                "text": "Insert drawings and animations through the slash menu or toolbar while you write, just like any other content block."
                            }
                        ],
                        "id": "z6a7b8c9d0"
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "disc",
                        "children": [
                            {
                                "text": "These rich elements load only when needed, so published pages stay fast for your readers."
                            }
                        ],
                        "id": "e1f2g3h4i5"
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "disc",
                        "children": [
                            {
                                "text": "Edit drawings at any time and reposition them anywhere within your post layout."
                            }
                        ],
                        "id": "j6k7l8m9n0"
                    },
                    {
                        "type": "h2",
                        "children": [
                            {
                                "text": "Steps"
                            }
                        ],
                        "id": "o1p2q3r4s5"
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "decimal",
                        "children": [
                            {
                                "text": "Open the post you want to edit and place your cursor where you want the drawing or animation to appear."
                            }
                        ],
                        "id": "t6u7v8w9x0"
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "decimal",
                        "children": [
                            {
                                "text": "Type \"/\" to open the slash menu, or use the toolbar, then choose the drawing or animation element."
                            }
                        ],
                        "id": "y1z2a3b4c5",
                        "listStart": 2
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "decimal",
                        "children": [
                            {
                                "text": "For a drawing, use the drawing canvas to sketch shapes, arrows, text, and freehand lines, then save when finished."
                            }
                        ],
                        "id": "d6e7f8g9h0",
                        "listStart": 3
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "decimal",
                        "children": [
                            {
                                "text": "For an animation, add your animation file and confirm it plays correctly in the preview."
                            }
                        ],
                        "id": "i1j2k3l4m5",
                        "listStart": 4
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "decimal",
                        "children": [
                            {
                                "text": "Reposition or resize the element as needed, then continue writing or publish your post."
                            }
                        ],
                        "id": "n6o7p8q9r0",
                        "listStart": 5
                    },
                    {
                        "type": "h2",
                        "children": [
                            {
                                "text": "Drawing and Animation Options"
                            }
                        ],
                        "id": "s1t2u3v4w5"
                    },
                    {
                        "type": "table",
                        "id": "x6y7z8a9b0",
                        "children": [
                            {
                                "type": "tr",
                                "id": "c1d2e3f4g5",
                                "children": [
                                    {
                                        "type": "th",
                                        "id": "h6i7j8k9l0",
                                        "children": [
                                            {
                                                "type": "p",
                                                "children": [
                                                    {
                                                        "text": "Element"
                                                    }
                                                ],
                                                "id": "m1n2o3p4q5"
                                            }
                                        ]
                                    },
                                    {
                                        "type": "th",
                                        "id": "r6s7t8u9v0",
                                        "children": [
                                            {
                                                "type": "p",
                                                "children": [
                                                    {
                                                        "text": "Best For"
                                                    }
                                                ],
                                                "id": "w1x2y3z4a5"
                                            }
                                        ]
                                    },
                                    {
                                        "type": "th",
                                        "id": "b6c7d8e9f0",
                                        "children": [
                                            {
                                                "type": "p",
                                                "children": [
                                                    {
                                                        "text": "Editable Later"
                                                    }
                                                ],
                                                "id": "g1h2i3j4k5"
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                "type": "tr",
                                "id": "l6m7n8o9p0",
                                "children": [
                                    {
                                        "type": "td",
                                        "id": "q1r2s3t4u5",
                                        "children": [
                                            {
                                                "type": "p",
                                                "children": [
                                                    {
                                                        "text": "Drawing canvas"
                                                    }
                                                ],
                                                "id": "v6w7x8y9z0"
                                            }
                                        ]
                                    },
                                    {
                                        "type": "td",
                                        "id": "a1b2c3d4e6",
                                        "children": [
                                            {
                                                "type": "p",
                                                "children": [
                                                    {
                                                        "text": "Diagrams, flowcharts, sketches, annotations"
                                                    }
                                                ],
                                                "id": "f6g7h8i9j1"
                                            }
                                        ]
                                    },
                                    {
                                        "type": "td",
                                        "id": "k1l2m3n4o6",
                                        "children": [
                                            {
                                                "type": "p",
                                                "children": [
                                                    {
                                                        "text": "Yes"
                                                    }
                                                ],
                                                "id": "p6q7r8s9t1"
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                "type": "tr",
                                "id": "u1v2w3x4y6",
                                "children": [
                                    {
                                        "type": "td",
                                        "id": "z6a7b8c9d1",
                                        "children": [
                                            {
                                                "type": "p",
                                                "children": [
                                                    {
                                                        "text": "Animation"
                                                    }
                                                ],
                                                "id": "e1f2g3h4i6"
                                            }
                                        ]
                                    },
                                    {
                                        "type": "td",
                                        "id": "j6k7l8m9n1",
                                        "children": [
                                            {
                                                "type": "p",
                                                "children": [
                                                    {
                                                        "text": "Motion accents, attention-grabbing highlights, loaders"
                                                    }
                                                ],
                                                "id": "o1p2q3r4s6"
                                            }
                                        ]
                                    },
                                    {
                                        "type": "td",
                                        "id": "t6u7v8w9x1",
                                        "children": [
                                            {
                                                "type": "p",
                                                "children": [
                                                    {
                                                        "text": "Replace the file"
                                                    }
                                                ],
                                                "id": "y1z2a3b4c6"
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "type": "h2",
                        "children": [
                            {
                                "text": "Tips"
                            }
                        ],
                        "id": "d6e7f8g9h1"
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "disc",
                        "children": [
                            {
                                "text": "Use drawings to explain processes or relationships that are hard to describe in plain text."
                            }
                        ],
                        "id": "i1j2k3l4m6"
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "disc",
                        "children": [
                            {
                                "text": "Keep animations short and purposeful so they enhance rather than distract from your message."
                            }
                        ],
                        "id": "n6o7p8q9r1"
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "disc",
                        "children": [
                            {
                                "text": "Preview your post on different screen sizes to confirm drawings and animations display well for all readers."
                            }
                        ],
                        "id": "s1t2u3v4w6"
                    },
                    {
                        "type": "callout",
                        "variant": "tip",
                        "children": [
                            {
                                "text": "Drawings and animations load on demand, so adding a few rich elements won't slow down your published page."
                            }
                        ],
                        "id": "x6y7z8a9b1"
                    },
                    {
                        "type": "callout",
                        "variant": "info",
                        "children": [
                            {
                                "text": "You can return to a saved drawing at any time to refine shapes, colors, or labels."
                            }
                        ],
                        "id": "c1d2e3f4g6"
                    },
                    {
                        "type": "h2",
                        "children": [
                            {
                                "text": "Troubleshooting"
                            }
                        ],
                        "id": "h6i7j8k9l1"
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "disc",
                        "children": [
                            {
                                "text": "Drawing tool slow to appear: The drawing canvas loads only when opened, so give it a moment on slower connections before sketching."
                            }
                        ],
                        "id": "m1n2o3p4q6"
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "disc",
                        "children": [
                            {
                                "text": "Animation not playing: Confirm the animation file uploaded fully and is in a supported format, then refresh the editor."
                            }
                        ],
                        "id": "r6s7t8u9v1"
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "disc",
                        "children": [
                            {
                                "text": "Changes not saving: Make sure you save the drawing before clicking away, and check that your post itself has been saved."
                            }
                        ],
                        "id": "w1x2y3z4a6"
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "disc",
                        "children": [
                            {
                                "text": "Element looks misplaced: Reposition or resize the block within the editor and preview the post to verify the layout."
                            }
                        ],
                        "id": "b6c7d8e9f1"
                    },
                    {
                        "type": "p",
                        "children": [
                            {
                                "text": "Related topics: Create and Edit Blog Content, Insert Content via Slash Commands, Add Math Equations and Emojis."
                            }
                        ],
                        "id": "g1h2i3j4k6"
                    }
                ]
            },
            {
                "id": "p-github-hyperblog-frontend-test-adding-math-and-emojis",
                "title": "Adding Math Equations and Emojis",
                "slug": "github-hyperblog-frontend-test-adding-math-and-emojis",
                "type": "page",
                "description": "Insert KaTeX math equations and emojis to enhance your writing.",
                "content": [
                    {
                        "type": "h1",
                        "children": [
                            {
                                "text": "Adding Math Equations and Emojis"
                            }
                        ],
                        "id": "a1b2c3d4e5"
                    },
                    {
                        "type": "p",
                        "children": [
                            {
                                "text": "HyperBlog lets you bring expressive detail and personality to your posts by inserting beautifully rendered math equations and a wide range of emojis. Whether you're explaining a formula or adding a friendly touch to your writing, these elements help your content communicate more clearly and feel more engaging."
                            }
                        ],
                        "id": "b2c3d4e5f6"
                    },
                    {
                        "type": "h2",
                        "children": [
                            {
                                "text": "How It Works"
                            }
                        ],
                        "id": "c3d4e5f6g7"
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "disc",
                        "children": [
                            {
                                "text": "Insert math equations that render cleanly using KaTeX, perfect for fractions, symbols, exponents, and complex notation."
                            }
                        ],
                        "id": "d4e5f6g7h8"
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "disc",
                        "children": [
                            {
                                "text": "Add equations as their own block or inline within a sentence so formulas flow naturally with your text."
                            }
                        ],
                        "id": "e5f6g7h8i9"
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "disc",
                        "children": [
                            {
                                "text": "Browse and pick emojis from a built-in emoji picker with search, categories, and skin-tone options."
                            }
                        ],
                        "id": "f6g7h8i9j0"
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "disc",
                        "children": [
                            {
                                "text": "Insert both equations and emojis quickly using slash commands while you type, without leaving the keyboard."
                            }
                        ],
                        "id": "g7h8i9j0k1"
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "disc",
                        "children": [
                            {
                                "text": "Equations and emojis render instantly in the editor and appear exactly the same on your published, fast-loading blog page."
                            }
                        ],
                        "id": "h8i9j0k1l2"
                    },
                    {
                        "type": "h2",
                        "children": [
                            {
                                "text": "Steps"
                            }
                        ],
                        "id": "i9j0k1l2m3"
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "decimal",
                        "children": [
                            {
                                "text": "Open your post in the editor and place your cursor where you want the equation or emoji to appear."
                            }
                        ],
                        "id": "j0k1l2m3n4"
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "decimal",
                        "children": [
                            {
                                "text": "Type a forward slash to open the slash menu, then search for \"Equation\" or \"Emoji.\""
                            }
                        ],
                        "id": "k1l2m3n4o5",
                        "listStart": 2
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "decimal",
                        "children": [
                            {
                                "text": "For a math equation, select the equation block, then type your formula using standard math notation. The preview updates as you type."
                            }
                        ],
                        "id": "l2m3n4o5p6",
                        "listStart": 3
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "decimal",
                        "children": [
                            {
                                "text": "For an emoji, select the emoji option to open the picker, then search by keyword or browse categories and click the emoji you want."
                            }
                        ],
                        "id": "m3n4o5p6q7",
                        "listStart": 4
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "decimal",
                        "children": [
                            {
                                "text": "Click outside the block to confirm, then continue writing your post."
                            }
                        ],
                        "id": "n4o5p6q7r8",
                        "listStart": 5
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "decimal",
                        "children": [
                            {
                                "text": "Publish or update your post so readers see the rendered equations and emojis on the live page."
                            }
                        ],
                        "id": "o5p6q7r8s9",
                        "listStart": 6
                    },
                    {
                        "type": "h2",
                        "children": [
                            {
                                "text": "Insert Options"
                            }
                        ],
                        "id": "p6q7r8s9t0"
                    },
                    {
                        "type": "table",
                        "id": "q7r8s9t0u1",
                        "children": [
                            {
                                "type": "tr",
                                "id": "r8s9t0u1v2",
                                "children": [
                                    {
                                        "type": "th",
                                        "id": "s9t0u1v2w3",
                                        "children": [
                                            {
                                                "type": "p",
                                                "children": [
                                                    {
                                                        "text": "Element"
                                                    }
                                                ],
                                                "id": "t0u1v2w3x4"
                                            }
                                        ]
                                    },
                                    {
                                        "type": "th",
                                        "id": "u1v2w3x4y5",
                                        "children": [
                                            {
                                                "type": "p",
                                                "children": [
                                                    {
                                                        "text": "Best For"
                                                    }
                                                ],
                                                "id": "v2w3x4y5z6"
                                            }
                                        ]
                                    },
                                    {
                                        "type": "th",
                                        "id": "w3x4y5z6a7",
                                        "children": [
                                            {
                                                "type": "p",
                                                "children": [
                                                    {
                                                        "text": "How to Insert"
                                                    }
                                                ],
                                                "id": "x4y5z6a7b8"
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                "type": "tr",
                                "id": "y5z6a7b8c9",
                                "children": [
                                    {
                                        "type": "td",
                                        "id": "z6a7b8c9d0",
                                        "children": [
                                            {
                                                "type": "p",
                                                "children": [
                                                    {
                                                        "text": "Block equation"
                                                    }
                                                ],
                                                "id": "a7b8c9d0e1"
                                            }
                                        ]
                                    },
                                    {
                                        "type": "td",
                                        "id": "b8c9d0e1f2",
                                        "children": [
                                            {
                                                "type": "p",
                                                "children": [
                                                    {
                                                        "text": "Standalone formulas that need emphasis on their own line"
                                                    }
                                                ],
                                                "id": "c9d0e1f2g3"
                                            }
                                        ]
                                    },
                                    {
                                        "type": "td",
                                        "id": "d0e1f2g3h4",
                                        "children": [
                                            {
                                                "type": "p",
                                                "children": [
                                                    {
                                                        "text": "Slash menu → Equation"
                                                    }
                                                ],
                                                "id": "e1f2g3h4i5"
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                "type": "tr",
                                "id": "f2g3h4i5j6",
                                "children": [
                                    {
                                        "type": "td",
                                        "id": "g3h4i5j6k7",
                                        "children": [
                                            {
                                                "type": "p",
                                                "children": [
                                                    {
                                                        "text": "Inline equation"
                                                    }
                                                ],
                                                "id": "h4i5j6k7l8"
                                            }
                                        ]
                                    },
                                    {
                                        "type": "td",
                                        "id": "i5j6k7l8m9",
                                        "children": [
                                            {
                                                "type": "p",
                                                "children": [
                                                    {
                                                        "text": "Short symbols or variables within a sentence"
                                                    }
                                                ],
                                                "id": "j6k7l8m9n0"
                                            }
                                        ]
                                    },
                                    {
                                        "type": "td",
                                        "id": "k7l8m9n0o1",
                                        "children": [
                                            {
                                                "type": "p",
                                                "children": [
                                                    {
                                                        "text": "Slash menu → Inline Equation"
                                                    }
                                                ],
                                                "id": "l8m9n0o1p2"
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                "type": "tr",
                                "id": "m9n0o1p2q3",
                                "children": [
                                    {
                                        "type": "td",
                                        "id": "n0o1p2q3r4",
                                        "children": [
                                            {
                                                "type": "p",
                                                "children": [
                                                    {
                                                        "text": "Emoji"
                                                    }
                                                ],
                                                "id": "o1p2q3r4s5"
                                            }
                                        ]
                                    },
                                    {
                                        "type": "td",
                                        "id": "p2q3r4s5t6",
                                        "children": [
                                            {
                                                "type": "p",
                                                "children": [
                                                    {
                                                        "text": "Adding tone, expression, or visual cues to text"
                                                    }
                                                ],
                                                "id": "q3r4s5t6u7"
                                            }
                                        ]
                                    },
                                    {
                                        "type": "td",
                                        "id": "r4s5t6u7v8",
                                        "children": [
                                            {
                                                "type": "p",
                                                "children": [
                                                    {
                                                        "text": "Slash menu → Emoji, or the emoji picker"
                                                    }
                                                ],
                                                "id": "s5t6u7v8w9"
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "type": "h2",
                        "children": [
                            {
                                "text": "Tips"
                            }
                        ],
                        "id": "t6u7v8w9x0"
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "disc",
                        "children": [
                            {
                                "text": "Use the live preview in the equation block to catch formula mistakes before you move on."
                            }
                        ],
                        "id": "u7v8w9x0y1"
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "disc",
                        "children": [
                            {
                                "text": "Search the emoji picker by keyword (such as \"rocket\" or \"check\") to find the right symbol faster than scrolling."
                            }
                        ],
                        "id": "v8w9x0y1z2"
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "disc",
                        "children": [
                            {
                                "text": "Use emojis sparingly in headings and intros to keep your writing professional and readable."
                            }
                        ],
                        "id": "w9x0y1z2a3"
                    },
                    {
                        "type": "callout",
                        "variant": "tip",
                        "children": [
                            {
                                "text": "Inline equations are great for quick references like variables in a paragraph, while block equations stand out for important formulas."
                            }
                        ],
                        "id": "x0y1z2a3b4"
                    },
                    {
                        "type": "callout",
                        "variant": "info",
                        "children": [
                            {
                                "text": "Math equations are rendered with KaTeX, so they stay crisp and properly formatted on any screen size for your readers."
                            }
                        ],
                        "id": "y1z2a3b4c5"
                    },
                    {
                        "type": "h2",
                        "children": [
                            {
                                "text": "Troubleshooting"
                            }
                        ],
                        "id": "z2a3b4c5d6"
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "disc",
                        "children": [
                            {
                                "text": "Equation not rendering correctly? Check for typos in your math notation, such as a missing bracket or backslash, and review the live preview."
                            }
                        ],
                        "id": "a3b4c5d6e7"
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "disc",
                        "children": [
                            {
                                "text": "Emoji picker won't open? Make sure your cursor is active in an editable block, then try the slash command again."
                            }
                        ],
                        "id": "b4c5d6e7f8"
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "disc",
                        "children": [
                            {
                                "text": "Emoji appears as a plain box on the published page? This usually means the reader's device lacks that emoji font—try a more common emoji for wider compatibility."
                            }
                        ],
                        "id": "c5d6e7f8g9"
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "disc",
                        "children": [
                            {
                                "text": "Changes not showing on the live blog? Confirm you saved and republished the post after inserting the element."
                            }
                        ],
                        "id": "d6e7f8g9h0"
                    },
                    {
                        "type": "p",
                        "children": [
                            {
                                "text": "Related topics: Insert content via slash commands and toolbar, Adding Advanced Media and Rich Elements, Create and Edit Blog Content with the Block Editor."
                            }
                        ],
                        "id": "e7f8g9h0i1"
                    }
                ]
            }
        ]
    },
    {
        "id": "f-github-hyperblog-frontend-test-engagement-components",
        "title": "Engagement Components",
        "slug": "github-hyperblog-frontend-test-engagement-components",
        "type": "folder",
        "children": [
            {
                "id": "p-github-hyperblog-frontend-test-adding-polls",
                "title": "Adding Polls",
                "slug": "github-hyperblog-frontend-test-adding-polls",
                "type": "page",
                "description": "Embed and configure polls to gather reader votes and feedback.",
                "content": [
                    {
                        "type": "h1",
                        "children": [
                            {
                                "text": "Adding Polls"
                            }
                        ],
                        "id": "a1b2c3d4e5"
                    },
                    {
                        "type": "p",
                        "children": [
                            {
                                "text": "Polls let you turn passive readers into active participants by inviting them to vote and share their opinions directly inside your blog post. Adding a poll is a quick way to boost engagement, gather feedback, and learn what your audience really thinks while they read."
                            }
                        ],
                        "id": "b2c3d4e5f6"
                    },
                    {
                        "type": "h2",
                        "children": [
                            {
                                "text": "How It Works"
                            }
                        ],
                        "id": "c3d4e5f6a7"
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "disc",
                        "children": [
                            {
                                "text": "Insert a poll anywhere in your post using the slash command menu or the editor toolbar."
                            }
                        ],
                        "id": "d4e5f6a7b8"
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "disc",
                        "children": [
                            {
                                "text": "Add a poll question along with two or more answer options for readers to choose from."
                            }
                        ],
                        "id": "e5f6a7b8c9"
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "disc",
                        "children": [
                            {
                                "text": "Readers vote with a single tap, and results display instantly within the published post."
                            }
                        ],
                        "id": "f6a7b8c9d0"
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "disc",
                        "children": [
                            {
                                "text": "Poll data loads as a priority engagement element, so votes and results appear quickly even on fast-loading pages."
                            }
                        ],
                        "id": "a7b8c9d0e1"
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "disc",
                        "children": [
                            {
                                "text": "You can reposition, edit, or remove a poll at any time before or after publishing."
                            }
                        ],
                        "id": "b8c9d0e1f2"
                    },
                    {
                        "type": "h2",
                        "children": [
                            {
                                "text": "Steps"
                            }
                        ],
                        "id": "c9d0e1f2a3"
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "decimal",
                        "children": [
                            {
                                "text": "Open the blog post you want to edit and place your cursor where the poll should appear."
                            }
                        ],
                        "id": "d0e1f2a3b4"
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "decimal",
                        "children": [
                            {
                                "text": "Type \"/\" to open the slash command menu, then search for and select the Poll element."
                            }
                        ],
                        "id": "e1f2a3b4c5",
                        "listStart": 2
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "decimal",
                        "children": [
                            {
                                "text": "Enter your poll question in the question field so readers know what they are voting on."
                            }
                        ],
                        "id": "f2a3b4c5d6",
                        "listStart": 3
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "decimal",
                        "children": [
                            {
                                "text": "Add answer options one by one, including as many choices as your question needs."
                            }
                        ],
                        "id": "a3b4c5d6e7",
                        "listStart": 4
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "decimal",
                        "children": [
                            {
                                "text": "Adjust the poll settings, such as how results are shown, then save your changes."
                            }
                        ],
                        "id": "b4c5d6e7f8",
                        "listStart": 5
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "decimal",
                        "children": [
                            {
                                "text": "Publish the post and confirm the poll displays correctly on the live blog page."
                            }
                        ],
                        "id": "c5d6e7f8a9",
                        "listStart": 6
                    },
                    {
                        "type": "h2",
                        "children": [
                            {
                                "text": "Poll Configuration Options"
                            }
                        ],
                        "id": "d6e7f8a9b0"
                    },
                    {
                        "type": "table",
                        "id": "e7f8a9b0c1",
                        "children": [
                            {
                                "type": "tr",
                                "id": "f8a9b0c1d2",
                                "children": [
                                    {
                                        "type": "th",
                                        "id": "a9b0c1d2e3",
                                        "children": [
                                            {
                                                "type": "p",
                                                "children": [
                                                    {
                                                        "text": "Option"
                                                    }
                                                ],
                                                "id": "b0c1d2e3f4"
                                            }
                                        ]
                                    },
                                    {
                                        "type": "th",
                                        "id": "c1d2e3f4a5",
                                        "children": [
                                            {
                                                "type": "p",
                                                "children": [
                                                    {
                                                        "text": "What It Does"
                                                    }
                                                ],
                                                "id": "d2e3f4a5b6"
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                "type": "tr",
                                "id": "e3f4a5b6c7",
                                "children": [
                                    {
                                        "type": "td",
                                        "id": "f4a5b6c7d8",
                                        "children": [
                                            {
                                                "type": "p",
                                                "children": [
                                                    {
                                                        "text": "Poll Question"
                                                    }
                                                ],
                                                "id": "a5b6c7d8e9"
                                            }
                                        ]
                                    },
                                    {
                                        "type": "td",
                                        "id": "b6c7d8e9f0",
                                        "children": [
                                            {
                                                "type": "p",
                                                "children": [
                                                    {
                                                        "text": "The main prompt readers respond to."
                                                    }
                                                ],
                                                "id": "c7d8e9f0a1"
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                "type": "tr",
                                "id": "d8e9f0a1b2",
                                "children": [
                                    {
                                        "type": "td",
                                        "id": "e9f0a1b2c3",
                                        "children": [
                                            {
                                                "type": "p",
                                                "children": [
                                                    {
                                                        "text": "Answer Options"
                                                    }
                                                ],
                                                "id": "f0a1b2c3d4"
                                            }
                                        ]
                                    },
                                    {
                                        "type": "td",
                                        "id": "a1b2c3d4e6",
                                        "children": [
                                            {
                                                "type": "p",
                                                "children": [
                                                    {
                                                        "text": "The choices readers can select from when voting."
                                                    }
                                                ],
                                                "id": "b2c3d4e6f7"
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                "type": "tr",
                                "id": "c3d4e6f7a8",
                                "children": [
                                    {
                                        "type": "td",
                                        "id": "d4e6f7a8b9",
                                        "children": [
                                            {
                                                "type": "p",
                                                "children": [
                                                    {
                                                        "text": "Results Display"
                                                    }
                                                ],
                                                "id": "e6f7a8b9c0"
                                            }
                                        ]
                                    },
                                    {
                                        "type": "td",
                                        "id": "f7a8b9c0d1",
                                        "children": [
                                            {
                                                "type": "p",
                                                "children": [
                                                    {
                                                        "text": "Controls how vote results appear to readers after they participate."
                                                    }
                                                ],
                                                "id": "a8b9c0d1e2"
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                "type": "tr",
                                "id": "b9c0d1e2f3",
                                "children": [
                                    {
                                        "type": "td",
                                        "id": "c0d1e2f3a4",
                                        "children": [
                                            {
                                                "type": "p",
                                                "children": [
                                                    {
                                                        "text": "Placement"
                                                    }
                                                ],
                                                "id": "d1e2f3a4b5"
                                            }
                                        ]
                                    },
                                    {
                                        "type": "td",
                                        "id": "e2f3a4b5c6",
                                        "children": [
                                            {
                                                "type": "p",
                                                "children": [
                                                    {
                                                        "text": "Where the poll sits within the flow of your post content."
                                                    }
                                                ],
                                                "id": "f3a4b5c6d7"
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "type": "h2",
                        "children": [
                            {
                                "text": "Tips"
                            }
                        ],
                        "id": "a4b5c6d7e8"
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "disc",
                        "children": [
                            {
                                "text": "Keep poll questions short and focused so readers can answer in a glance."
                            }
                        ],
                        "id": "b5c6d7e8f9"
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "disc",
                        "children": [
                            {
                                "text": "Place polls near related content, such as right after a key point you want feedback on."
                            }
                        ],
                        "id": "c6d7e8f9a0"
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "disc",
                        "children": [
                            {
                                "text": "Offer balanced, distinct answer options to encourage meaningful responses."
                            }
                        ],
                        "id": "d7e8f9a0b1"
                    },
                    {
                        "type": "callout",
                        "variant": "tip",
                        "children": [
                            {
                                "text": "A single, well-placed poll often gets more votes than several polls scattered throughout a long post."
                            }
                        ],
                        "id": "e8f9a0b1c2"
                    },
                    {
                        "type": "callout",
                        "variant": "info",
                        "children": [
                            {
                                "text": "Poll results update live as readers vote, so you can monitor engagement without refreshing the page."
                            }
                        ],
                        "id": "f9a0b1c2d3"
                    },
                    {
                        "type": "h2",
                        "children": [
                            {
                                "text": "Troubleshooting"
                            }
                        ],
                        "id": "a0b1c2d3e4"
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "disc",
                        "children": [
                            {
                                "text": "Poll not appearing in the editor? Make sure you selected the Poll element from the slash menu and that your cursor was in a valid spot in the content."
                            }
                        ],
                        "id": "b1c2d3e4f5"
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "disc",
                        "children": [
                            {
                                "text": "Votes not registering? Confirm the poll was saved with at least two answer options before publishing."
                            }
                        ],
                        "id": "c2d3e4f5a6"
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "disc",
                        "children": [
                            {
                                "text": "Results take a moment to load? Poll data loads progressively in the background, so allow a few seconds on the live page."
                            }
                        ],
                        "id": "d3e4f5a6b7"
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "disc",
                        "children": [
                            {
                                "text": "Changes not showing on the live blog? Re-publish the post so your latest poll edits are pushed to the public page."
                            }
                        ],
                        "id": "e4f5a6b7c8"
                    },
                    {
                        "type": "p",
                        "children": [
                            {
                                "text": "Related topics: Embedding Lead Magnets, Adding FAQ Sections, Inserting Content with Slash Commands."
                            }
                        ],
                        "id": "f5a6b7c8d9"
                    }
                ]
            },
            {
                "id": "p-github-hyperblog-frontend-test-building-faq-sections",
                "title": "Building FAQ Sections",
                "slug": "github-hyperblog-frontend-test-building-faq-sections",
                "type": "page",
                "description": "Create expandable FAQ blocks to answer common reader questions.",
                "content": [
                    {
                        "type": "h1",
                        "children": [
                            {
                                "text": "Building FAQ Sections"
                            }
                        ],
                        "id": "a1b2c3d4e5"
                    },
                    {
                        "type": "p",
                        "children": [
                            {
                                "text": "FAQ sections let you answer your readers' most common questions directly inside a blog post using clean, expandable blocks. Readers can click each question to reveal its answer, keeping your content tidy while making important information easy to find."
                            }
                        ],
                        "id": "f6g7h8i9j0"
                    },
                    {
                        "type": "h2",
                        "children": [
                            {
                                "text": "How It Works"
                            }
                        ],
                        "id": "k1l2m3n4o5"
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "disc",
                        "children": [
                            {
                                "text": "Insert an FAQ block anywhere in your post using the slash menu or the toolbar."
                            }
                        ],
                        "id": "p6q7r8s9t0"
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "disc",
                        "children": [
                            {
                                "text": "Add as many question-and-answer pairs as you need within a single FAQ section."
                            }
                        ],
                        "id": "u1v2w3x4y5"
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "disc",
                        "children": [
                            {
                                "text": "Readers see each question as a collapsible row that expands to reveal the answer when clicked."
                            }
                        ],
                        "id": "z6a7b8c9d0"
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "disc",
                        "children": [
                            {
                                "text": "FAQ content is prioritized as engagement data, so it loads quickly for readers on the published page."
                            }
                        ],
                        "id": "e1f2g3h4i5"
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "disc",
                        "children": [
                            {
                                "text": "Answers are rendered for search engines too, helping your questions appear in search results."
                            }
                        ],
                        "id": "j6k7l8m9n0"
                    },
                    {
                        "type": "h2",
                        "children": [
                            {
                                "text": "Steps"
                            }
                        ],
                        "id": "o1p2q3r4s5"
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "decimal",
                        "children": [
                            {
                                "text": "Open your blog post in the editor and place your cursor where you want the FAQ section to appear."
                            }
                        ],
                        "id": "t6u7v8w9x0"
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "decimal",
                        "children": [
                            {
                                "text": "Type \"/\" to open the slash menu, then search for and select the FAQ block (you can also add it from the toolbar)."
                            }
                        ],
                        "id": "y1z2a3b4c5",
                        "listStart": 2
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "decimal",
                        "children": [
                            {
                                "text": "Enter your first question in the question field and type the corresponding answer below it."
                            }
                        ],
                        "id": "d6e7f8g9h0",
                        "listStart": 3
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "decimal",
                        "children": [
                            {
                                "text": "Add more question-and-answer pairs to cover the topics your readers ask about most."
                            }
                        ],
                        "id": "i1j2k3l4m5",
                        "listStart": 4
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "decimal",
                        "children": [
                            {
                                "text": "Reorder or remove entries as needed to keep the most important questions near the top."
                            }
                        ],
                        "id": "n6o7p8q9r0",
                        "listStart": 5
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "decimal",
                        "children": [
                            {
                                "text": "Preview the post to confirm the questions expand and collapse correctly, then publish."
                            }
                        ],
                        "id": "s1t2u3v4w5",
                        "listStart": 6
                    },
                    {
                        "type": "h2",
                        "children": [
                            {
                                "text": "FAQ Block Options"
                            }
                        ],
                        "id": "x6y7z8a9b0"
                    },
                    {
                        "type": "table",
                        "id": "c1d2e3f4g5",
                        "children": [
                            {
                                "type": "tr",
                                "id": "h6i7j8k9l0",
                                "children": [
                                    {
                                        "type": "th",
                                        "id": "m1n2o3p4q5",
                                        "children": [
                                            {
                                                "type": "p",
                                                "children": [
                                                    {
                                                        "text": "Option"
                                                    }
                                                ],
                                                "id": "r6s7t8u9v0"
                                            }
                                        ]
                                    },
                                    {
                                        "type": "th",
                                        "id": "w1x2y3z4a5",
                                        "children": [
                                            {
                                                "type": "p",
                                                "children": [
                                                    {
                                                        "text": "What It Does"
                                                    }
                                                ],
                                                "id": "b6c7d8e9f0"
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                "type": "tr",
                                "id": "g1h2i3j4k5",
                                "children": [
                                    {
                                        "type": "td",
                                        "id": "l6m7n8o9p0",
                                        "children": [
                                            {
                                                "type": "p",
                                                "children": [
                                                    {
                                                        "text": "Question"
                                                    }
                                                ],
                                                "id": "q1r2s3t4u5"
                                            }
                                        ]
                                    },
                                    {
                                        "type": "td",
                                        "id": "v6w7x8y9z0",
                                        "children": [
                                            {
                                                "type": "p",
                                                "children": [
                                                    {
                                                        "text": "The text shown on the clickable row that readers tap to expand."
                                                    }
                                                ],
                                                "id": "a1b2c3d4e6"
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                "type": "tr",
                                "id": "f6g7h8i9j1",
                                "children": [
                                    {
                                        "type": "td",
                                        "id": "k1l2m3n4o6",
                                        "children": [
                                            {
                                                "type": "p",
                                                "children": [
                                                    {
                                                        "text": "Answer"
                                                    }
                                                ],
                                                "id": "p6q7r8s9t1"
                                            }
                                        ]
                                    },
                                    {
                                        "type": "td",
                                        "id": "u1v2w3x4y6",
                                        "children": [
                                            {
                                                "type": "p",
                                                "children": [
                                                    {
                                                        "text": "The hidden content revealed when a reader opens the question."
                                                    }
                                                ],
                                                "id": "z6a7b8c9d1"
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                "type": "tr",
                                "id": "e1f2g3h4i6",
                                "children": [
                                    {
                                        "type": "td",
                                        "id": "j6k7l8m9n1",
                                        "children": [
                                            {
                                                "type": "p",
                                                "children": [
                                                    {
                                                        "text": "Add Entry"
                                                    }
                                                ],
                                                "id": "o1p2q3r4s6"
                                            }
                                        ]
                                    },
                                    {
                                        "type": "td",
                                        "id": "t6u7v8w9x1",
                                        "children": [
                                            {
                                                "type": "p",
                                                "children": [
                                                    {
                                                        "text": "Creates an additional question-and-answer pair within the same section."
                                                    }
                                                ],
                                                "id": "y1z2a3b4c6"
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                "type": "tr",
                                "id": "d6e7f8g9h1",
                                "children": [
                                    {
                                        "type": "td",
                                        "id": "i1j2k3l4m6",
                                        "children": [
                                            {
                                                "type": "p",
                                                "children": [
                                                    {
                                                        "text": "Reorder / Remove"
                                                    }
                                                ],
                                                "id": "n6o7p8q9r1"
                                            }
                                        ]
                                    },
                                    {
                                        "type": "td",
                                        "id": "s1t2u3v4w6",
                                        "children": [
                                            {
                                                "type": "p",
                                                "children": [
                                                    {
                                                        "text": "Lets you change the order of entries or delete ones you no longer need."
                                                    }
                                                ],
                                                "id": "x6y7z8a9b1"
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "type": "h2",
                        "children": [
                            {
                                "text": "Tips"
                            }
                        ],
                        "id": "c1d2e3f4g6"
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "disc",
                        "children": [
                            {
                                "text": "Write questions the way your readers actually phrase them — this improves clarity and search visibility."
                            }
                        ],
                        "id": "h6i7j8k9l1"
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "disc",
                        "children": [
                            {
                                "text": "Keep answers short and focused; link to a fuller section of the post if more detail is needed."
                            }
                        ],
                        "id": "m1n2o3p4q6"
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "disc",
                        "children": [
                            {
                                "text": "Place the FAQ section near the end of a post or beside related content for the best engagement."
                            }
                        ],
                        "id": "r6s7t8u9v1"
                    },
                    {
                        "type": "callout",
                        "variant": "tip",
                        "children": [
                            {
                                "text": "Group related questions into a single FAQ block rather than scattering them — readers find answers faster when they are together."
                            }
                        ],
                        "id": "w1x2y3z4a6"
                    },
                    {
                        "type": "callout",
                        "variant": "info",
                        "children": [
                            {
                                "text": "Because FAQ answers are also rendered for search engines, well-written questions can help your post appear in search results."
                            }
                        ],
                        "id": "b6c7d8e9f1"
                    },
                    {
                        "type": "h2",
                        "children": [
                            {
                                "text": "Troubleshooting"
                            }
                        ],
                        "id": "g1h2i3j4k6"
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "disc",
                        "children": [
                            {
                                "text": "Questions won't expand for readers: confirm each entry has both a question and an answer filled in before publishing."
                            }
                        ],
                        "id": "l6m7n8o9p1"
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "disc",
                        "children": [
                            {
                                "text": "An entry is missing on the published page: check that you didn't accidentally remove it and that the post was saved and republished."
                            }
                        ],
                        "id": "q1r2s3t4u6"
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "disc",
                        "children": [
                            {
                                "text": "FAQ content appears slowly: this is normal on first load, as main content shows first while engagement blocks load progressively."
                            }
                        ],
                        "id": "v6w7x8y9z1"
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "disc",
                        "children": [
                            {
                                "text": "The slash menu doesn't show the FAQ option: type more of the word to filter the menu, or add the block from the toolbar instead."
                            }
                        ],
                        "id": "a1b2c3d4e7"
                    },
                    {
                        "type": "p",
                        "children": [
                            {
                                "text": "Related topics: Embedding Polls, Adding Lead Magnets, Inserting Content with Slash Commands."
                            }
                        ],
                        "id": "f6g7h8i9j2"
                    }
                ]
            },
            {
                "id": "p-github-hyperblog-frontend-test-capturing-leads-with-lead-magnets",
                "title": "Capturing Leads with Lead Magnets",
                "slug": "github-hyperblog-frontend-test-capturing-leads-with-lead-magnets",
                "type": "page",
                "description": "Insert lead magnets to collect signups and grow your audience.",
                "content": [
                    {
                        "type": "h1",
                        "children": [
                            {
                                "text": "Capturing Leads with Lead Magnets"
                            }
                        ],
                        "id": "a1b2c3d4e5"
                    },
                    {
                        "type": "p",
                        "children": [
                            {
                                "text": "Lead magnets let you collect signups directly inside your blog posts by offering readers something valuable in exchange for their contact details. Adding a lead magnet to a post turns engaged readers into subscribers, helping you grow your audience while they read."
                            }
                        ],
                        "id": "f6g7h8i9j0"
                    },
                    {
                        "type": "h2",
                        "children": [
                            {
                                "text": "How It Works"
                            }
                        ],
                        "id": "k1l2m3n4o5"
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "disc",
                        "children": [
                            {
                                "text": "Insert a lead magnet block anywhere in your post using the slash menu or the editor toolbar."
                            }
                        ],
                        "id": "p6q7r8s9t0"
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "disc",
                        "children": [
                            {
                                "text": "Configure the offer, headline, and signup fields so readers know exactly what they receive."
                            }
                        ],
                        "id": "u1v2w3x4y5"
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "disc",
                        "children": [
                            {
                                "text": "Readers enter their details and submit the form without leaving the blog page."
                            }
                        ],
                        "id": "z6a7b8c9d0"
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "disc",
                        "children": [
                            {
                                "text": "Lead magnets are treated as priority engagement content, so they load quickly for readers as the page progressively renders."
                            }
                        ],
                        "id": "e1f2g3h4i5"
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "disc",
                        "children": [
                            {
                                "text": "Collected signups are stored with your blog so you can grow and manage your audience."
                            }
                        ],
                        "id": "j6k7l8m9n0"
                    },
                    {
                        "type": "h2",
                        "children": [
                            {
                                "text": "Steps"
                            }
                        ],
                        "id": "o1p2q3r4s5"
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "decimal",
                        "children": [
                            {
                                "text": "Open the post you want to edit in the block editor and place your cursor where you want the lead magnet to appear."
                            }
                        ],
                        "id": "t6u7v8w9x0"
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "decimal",
                        "children": [
                            {
                                "text": "Type the slash command or use the toolbar to insert a lead magnet block."
                            }
                        ],
                        "id": "y1z2a3b4c5",
                        "listStart": 2
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "decimal",
                        "children": [
                            {
                                "text": "Add a clear headline and short description that explains what readers get when they sign up."
                            }
                        ],
                        "id": "d6e7f8g9h0",
                        "listStart": 3
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "decimal",
                        "children": [
                            {
                                "text": "Choose which fields readers must fill in, such as name and email, and set the button text."
                            }
                        ],
                        "id": "i1j2k3l4m5",
                        "listStart": 4
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "decimal",
                        "children": [
                            {
                                "text": "Preview the post to confirm the lead magnet displays correctly, then publish it to your public blog page."
                            }
                        ],
                        "id": "n6o7p8q9r0",
                        "listStart": 5
                    },
                    {
                        "type": "h2",
                        "children": [
                            {
                                "text": "Lead Magnet Options"
                            }
                        ],
                        "id": "s1t2u3v4w5"
                    },
                    {
                        "type": "table",
                        "id": "x6y7z8a9b0",
                        "children": [
                            {
                                "type": "tr",
                                "id": "c1d2e3f4g5",
                                "children": [
                                    {
                                        "type": "th",
                                        "id": "h6i7j8k9l0",
                                        "children": [
                                            {
                                                "type": "p",
                                                "children": [
                                                    {
                                                        "text": "Option"
                                                    }
                                                ],
                                                "id": "m1n2o3p4q5"
                                            }
                                        ]
                                    },
                                    {
                                        "type": "th",
                                        "id": "r6s7t8u9v0",
                                        "children": [
                                            {
                                                "type": "p",
                                                "children": [
                                                    {
                                                        "text": "Description"
                                                    }
                                                ],
                                                "id": "w1x2y3z4a5"
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                "type": "tr",
                                "id": "b6c7d8e9f0",
                                "children": [
                                    {
                                        "type": "td",
                                        "id": "g1h2i3j4k5",
                                        "children": [
                                            {
                                                "type": "p",
                                                "children": [
                                                    {
                                                        "text": "Headline"
                                                    }
                                                ],
                                                "id": "l6m7n8o9p0"
                                            }
                                        ]
                                    },
                                    {
                                        "type": "td",
                                        "id": "q1r2s3t4u5",
                                        "children": [
                                            {
                                                "type": "p",
                                                "children": [
                                                    {
                                                        "text": "The main title that grabs attention and describes the offer."
                                                    }
                                                ],
                                                "id": "v6w7x8y9z0"
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                "type": "tr",
                                "id": "a1b2c3d4e6",
                                "children": [
                                    {
                                        "type": "td",
                                        "id": "f6g7h8i9j1",
                                        "children": [
                                            {
                                                "type": "p",
                                                "children": [
                                                    {
                                                        "text": "Description"
                                                    }
                                                ],
                                                "id": "k1l2m3n4o6"
                                            }
                                        ]
                                    },
                                    {
                                        "type": "td",
                                        "id": "p6q7r8s9t1",
                                        "children": [
                                            {
                                                "type": "p",
                                                "children": [
                                                    {
                                                        "text": "Supporting text that explains the value readers receive by signing up."
                                                    }
                                                ],
                                                "id": "u1v2w3x4y6"
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                "type": "tr",
                                "id": "z6a7b8c9d1",
                                "children": [
                                    {
                                        "type": "td",
                                        "id": "e1f2g3h4i6",
                                        "children": [
                                            {
                                                "type": "p",
                                                "children": [
                                                    {
                                                        "text": "Signup Fields"
                                                    }
                                                ],
                                                "id": "j6k7l8m9n1"
                                            }
                                        ]
                                    },
                                    {
                                        "type": "td",
                                        "id": "o1p2q3r4s6",
                                        "children": [
                                            {
                                                "type": "p",
                                                "children": [
                                                    {
                                                        "text": "The information readers enter, such as name and email address."
                                                    }
                                                ],
                                                "id": "t6u7v8w9x1"
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                "type": "tr",
                                "id": "y1z2a3b4c6",
                                "children": [
                                    {
                                        "type": "td",
                                        "id": "d6e7f8g9h1",
                                        "children": [
                                            {
                                                "type": "p",
                                                "children": [
                                                    {
                                                        "text": "Button Text"
                                                    }
                                                ],
                                                "id": "i1j2k3l4m6"
                                            }
                                        ]
                                    },
                                    {
                                        "type": "td",
                                        "id": "n6o7p8q9r1",
                                        "children": [
                                            {
                                                "type": "p",
                                                "children": [
                                                    {
                                                        "text": "The call-to-action label on the submit button, such as Download Now."
                                                    }
                                                ],
                                                "id": "s1t2u3v4w6"
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "type": "h2",
                        "children": [
                            {
                                "text": "Tips"
                            }
                        ],
                        "id": "x6y7z8a9b1"
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "disc",
                        "children": [
                            {
                                "text": "Keep your headline benefit-focused so readers immediately understand why signing up is worth it."
                            }
                        ],
                        "id": "c1d2e3f4g6"
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "disc",
                        "children": [
                            {
                                "text": "Ask for only the fields you truly need — shorter forms convert better."
                            }
                        ],
                        "id": "h6i7j8k9l1"
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "disc",
                        "children": [
                            {
                                "text": "Place the lead magnet near high-interest content, such as after a key insight or at the end of the post."
                            }
                        ],
                        "id": "m1n2o3p4q6"
                    },
                    {
                        "type": "callout",
                        "variant": "tip",
                        "children": [
                            {
                                "text": "Lead magnets load as priority engagement content, so they appear quickly for readers even on slower connections."
                            }
                        ],
                        "id": "r6s7t8u9v1"
                    },
                    {
                        "type": "callout",
                        "variant": "info",
                        "children": [
                            {
                                "text": "You can place more than one lead magnet in a post, but spacing them out keeps the reading experience clean."
                            }
                        ],
                        "id": "w1x2y3z4a6"
                    },
                    {
                        "type": "h2",
                        "children": [
                            {
                                "text": "Troubleshooting"
                            }
                        ],
                        "id": "b6c7d8e9f1"
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "disc",
                        "children": [
                            {
                                "text": "If the lead magnet doesn't appear on the published page, confirm you saved and published the post after inserting it."
                            }
                        ],
                        "id": "g1h2i3j4k6"
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "disc",
                        "children": [
                            {
                                "text": "If readers can't submit the form, make sure all required fields and the button text are configured correctly."
                            }
                        ],
                        "id": "l6m7n8o9p1"
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "disc",
                        "children": [
                            {
                                "text": "If the block looks empty in preview, check that you added a headline and description before publishing."
                            }
                        ],
                        "id": "q1r2s3t4u6"
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "disc",
                        "children": [
                            {
                                "text": "If signups aren't showing up, refresh your blog's audience view, since collected leads load in the background and may take a moment to update."
                            }
                        ],
                        "id": "v6w7x8y9z1"
                    },
                    {
                        "type": "p",
                        "children": [
                            {
                                "text": "Related topics: Embedding Polls in Your Posts, Adding FAQ Sections, Inserting Promotional Banners."
                            }
                        ],
                        "id": "a1b2c3d4e7"
                    }
                ]
            },
            {
                "id": "p-github-hyperblog-frontend-test-adding-banners-and-infographics",
                "title": "Adding Banners and Infographics",
                "slug": "github-hyperblog-frontend-test-adding-banners-and-infographics",
                "type": "page",
                "description": "Place promotional banners and infographics to drive conversions.",
                "content": [
                    {
                        "type": "h1",
                        "children": [
                            {
                                "text": "Adding Banners and Infographics"
                            }
                        ],
                        "id": "a1b2c3d4e5"
                    },
                    {
                        "type": "p",
                        "children": [
                            {
                                "text": "Banners and infographics are visual engagement elements you can place directly inside your blog posts to grab attention and drive conversions. Banners highlight promotions or calls to action, while infographics present information in an eye-catching, easy-to-digest visual format. Both load progressively so your main content appears instantly while these visual enhancements follow."
                            }
                        ],
                        "id": "b2c3d4e5f6"
                    },
                    {
                        "type": "h2",
                        "children": [
                            {
                                "text": "How It Works"
                            }
                        ],
                        "id": "c3d4e5f6g7"
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "disc",
                        "children": [
                            {
                                "text": "Insert a banner anywhere in your post to promote offers, announcements, or sign-up prompts."
                            }
                        ],
                        "id": "d4e5f6g7h8"
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "disc",
                        "children": [
                            {
                                "text": "Add an infographic block to display visual, data-rich content that readers can quickly scan."
                            }
                        ],
                        "id": "e5f6g7h8i9"
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "disc",
                        "children": [
                            {
                                "text": "Configure each element's content, image, and link so it points readers toward the action you want."
                            }
                        ],
                        "id": "f6g7h8i9j0"
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "disc",
                        "children": [
                            {
                                "text": "Banners and infographics load as visual enhancements after your main blog text, keeping pages fast."
                            }
                        ],
                        "id": "g7h8i9j0k1"
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "disc",
                        "children": [
                            {
                                "text": "Images are hosted and optimized automatically so they render crisply across devices."
                            }
                        ],
                        "id": "h8i9j0k1l2"
                    },
                    {
                        "type": "h2",
                        "children": [
                            {
                                "text": "Steps"
                            }
                        ],
                        "id": "i9j0k1l2m3"
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "decimal",
                        "children": [
                            {
                                "text": "Open the post you want to edit in the block editor and place your cursor where you want the element to appear."
                            }
                        ],
                        "id": "j0k1l2m3n4"
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "decimal",
                        "children": [
                            {
                                "text": "Type the slash command or use the toolbar to open the insert menu, then choose Banner or Infographic."
                            }
                        ],
                        "id": "k1l2m3n4o5",
                        "listStart": 2
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "decimal",
                        "children": [
                            {
                                "text": "Upload or select your image and add any headline, supporting text, or button label the element supports."
                            }
                        ],
                        "id": "l2m3n4o5p6",
                        "listStart": 3
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "decimal",
                        "children": [
                            {
                                "text": "Set the destination link or call-to-action so readers go to the right page when they click."
                            }
                        ],
                        "id": "m3n4o5p6q7",
                        "listStart": 4
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "decimal",
                        "children": [
                            {
                                "text": "Preview the post to confirm the banner or infographic displays correctly, then save and publish."
                            }
                        ],
                        "id": "n4o5p6q7r8",
                        "listStart": 5
                    },
                    {
                        "type": "h2",
                        "children": [
                            {
                                "text": "Element Options"
                            }
                        ],
                        "id": "o5p6q7r8s9"
                    },
                    {
                        "type": "table",
                        "id": "p6q7r8s9t0",
                        "children": [
                            {
                                "type": "tr",
                                "id": "q7r8s9t0u1",
                                "children": [
                                    {
                                        "type": "th",
                                        "id": "r8s9t0u1v2",
                                        "children": [
                                            {
                                                "type": "p",
                                                "children": [
                                                    {
                                                        "text": "Element"
                                                    }
                                                ],
                                                "id": "s9t0u1v2w3"
                                            }
                                        ]
                                    },
                                    {
                                        "type": "th",
                                        "id": "t0u1v2w3x4",
                                        "children": [
                                            {
                                                "type": "p",
                                                "children": [
                                                    {
                                                        "text": "Best Used For"
                                                    }
                                                ],
                                                "id": "u1v2w3x4y5"
                                            }
                                        ]
                                    },
                                    {
                                        "type": "th",
                                        "id": "v2w3x4y5z6",
                                        "children": [
                                            {
                                                "type": "p",
                                                "children": [
                                                    {
                                                        "text": "Configurable Items"
                                                    }
                                                ],
                                                "id": "w3x4y5z6a7"
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                "type": "tr",
                                "id": "x4y5z6a7b8",
                                "children": [
                                    {
                                        "type": "td",
                                        "id": "y5z6a7b8c9",
                                        "children": [
                                            {
                                                "type": "p",
                                                "children": [
                                                    {
                                                        "text": "Banner"
                                                    }
                                                ],
                                                "id": "z6a7b8c9d0"
                                            }
                                        ]
                                    },
                                    {
                                        "type": "td",
                                        "id": "a7b8c9d0e1",
                                        "children": [
                                            {
                                                "type": "p",
                                                "children": [
                                                    {
                                                        "text": "Promotions, announcements, and calls to action"
                                                    }
                                                ],
                                                "id": "b8c9d0e1f2"
                                            }
                                        ]
                                    },
                                    {
                                        "type": "td",
                                        "id": "c9d0e1f2g3",
                                        "children": [
                                            {
                                                "type": "p",
                                                "children": [
                                                    {
                                                        "text": "Image, headline, supporting text, button label, link"
                                                    }
                                                ],
                                                "id": "d0e1f2g3h4"
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                "type": "tr",
                                "id": "e1f2g3h4i5",
                                "children": [
                                    {
                                        "type": "td",
                                        "id": "f2g3h4i5j6",
                                        "children": [
                                            {
                                                "type": "p",
                                                "children": [
                                                    {
                                                        "text": "Infographic"
                                                    }
                                                ],
                                                "id": "g3h4i5j6k7"
                                            }
                                        ]
                                    },
                                    {
                                        "type": "td",
                                        "id": "h4i5j6k7l8",
                                        "children": [
                                            {
                                                "type": "p",
                                                "children": [
                                                    {
                                                        "text": "Visual data, processes, and comparisons"
                                                    }
                                                ],
                                                "id": "i5j6k7l8m9"
                                            }
                                        ]
                                    },
                                    {
                                        "type": "td",
                                        "id": "j6k7l8m9n0",
                                        "children": [
                                            {
                                                "type": "p",
                                                "children": [
                                                    {
                                                        "text": "Image, caption, optional link"
                                                    }
                                                ],
                                                "id": "k7l8m9n0o1"
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "type": "h2",
                        "children": [
                            {
                                "text": "Tips"
                            }
                        ],
                        "id": "l8m9n0o1p2"
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "disc",
                        "children": [
                            {
                                "text": "Use high-resolution images so banners and infographics stay sharp on large screens and high-density displays."
                            }
                        ],
                        "id": "m9n0o1p2q3"
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "disc",
                        "children": [
                            {
                                "text": "Keep banner text short and action-focused so readers immediately understand what to do."
                            }
                        ],
                        "id": "n0o1p2q3r4"
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "disc",
                        "children": [
                            {
                                "text": "Place a banner near the top or end of a post where readers are most likely to act."
                            }
                        ],
                        "id": "o1p2q3r4s5"
                    },
                    {
                        "type": "callout",
                        "variant": "tip",
                        "children": [
                            {
                                "text": "Pair an infographic with a related banner directly below it to turn reader interest into a click."
                            }
                        ],
                        "id": "p2q3r4s5t6"
                    },
                    {
                        "type": "callout",
                        "variant": "info",
                        "children": [
                            {
                                "text": "Banners and infographics are visual enhancements that load after your main content, so they will never slow down how quickly readers see your article."
                            }
                        ],
                        "id": "q3r4s5t6u7"
                    },
                    {
                        "type": "h2",
                        "children": [
                            {
                                "text": "Troubleshooting"
                            }
                        ],
                        "id": "r4s5t6u7v8"
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "disc",
                        "children": [
                            {
                                "text": "Image not showing: confirm the upload completed successfully and that you selected an image before saving."
                            }
                        ],
                        "id": "s5t6u7v8w9"
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "disc",
                        "children": [
                            {
                                "text": "Banner link not working: re-check the destination URL for typos and make sure it includes the full address."
                            }
                        ],
                        "id": "t6u7v8w9x0"
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "disc",
                        "children": [
                            {
                                "text": "Element appears blank on the live page: it may still be loading in the background—refresh after a moment to confirm it renders."
                            }
                        ],
                        "id": "u7v8w9x0y1"
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "disc",
                        "children": [
                            {
                                "text": "Layout looks off: try a properly sized image and preview the post before publishing to catch spacing issues."
                            }
                        ],
                        "id": "v8w9x0y1z2"
                    },
                    {
                        "type": "p",
                        "children": [
                            {
                                "text": "Related topics: Embed Interactive Polls, Adding Lead Magnets, Creating FAQ Sections."
                            }
                        ],
                        "id": "w9x0y1z2a3"
                    }
                ]
            }
        ]
    },
    {
        "id": "f-github-hyperblog-frontend-test-publishing",
        "title": "Publishing",
        "slug": "github-hyperblog-frontend-test-publishing",
        "type": "folder",
        "children": [
            {
                "id": "p-github-hyperblog-frontend-test-publishing-a-post",
                "title": "Publishing a Post",
                "slug": "github-hyperblog-frontend-test-publishing-a-post",
                "type": "page",
                "description": "Publish your post to a fast-loading, public-facing blog page.",
                "content": [
                    {
                        "type": "h1",
                        "children": [
                            {
                                "text": "Publishing a Post"
                            }
                        ],
                        "id": "a1b2c3d4e5"
                    },
                    {
                        "type": "p",
                        "children": [
                            {
                                "text": "Publishing turns your draft into a live, public-facing blog page that loads quickly for readers and is optimized for search engines. Once published, your content—along with any interactive components you added—becomes available at a public web address that anyone can visit."
                            }
                        ],
                        "id": "b2c3d4e5f6"
                    },
                    {
                        "type": "h2",
                        "children": [
                            {
                                "text": "How It Works"
                            }
                        ],
                        "id": "c3d4e5f6g7"
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "disc",
                        "children": [
                            {
                                "text": "Your main blog content loads instantly as the highest priority, so readers can start reading without waiting."
                            }
                        ],
                        "id": "d4e5f6g7h8"
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "disc",
                        "children": [
                            {
                                "text": "Interactive components—such as polls, FAQs, and lead magnets—load progressively in the background after the main content appears."
                            }
                        ],
                        "id": "e5f6g7h8i9"
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "disc",
                        "children": [
                            {
                                "text": "Published pages render SEO-friendly content for search engines without slowing down the reading experience."
                            }
                        ],
                        "id": "f6g7h8i9j0"
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "disc",
                        "children": [
                            {
                                "text": "Each post is published to its own public web address (slug) that you can share directly with readers."
                            }
                        ],
                        "id": "g7h8i9j0k1"
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "disc",
                        "children": [
                            {
                                "text": "Images and media are served from optimized hosting so they appear sharp and load fast on any device."
                            }
                        ],
                        "id": "h8i9j0k1l2"
                    },
                    {
                        "type": "h2",
                        "children": [
                            {
                                "text": "Steps"
                            }
                        ],
                        "id": "i9j0k1l2m3"
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "decimal",
                        "children": [
                            {
                                "text": "Open the post you want to publish in the editor and review all of your content blocks."
                            }
                        ],
                        "id": "j0k1l2m3n4"
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "decimal",
                        "children": [
                            {
                                "text": "Confirm that any embedded interactive components—such as polls, FAQs, banners, or lead magnets—are configured the way you want them."
                            }
                        ],
                        "id": "k1l2m3n4o5",
                        "listStart": 2
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "decimal",
                        "children": [
                            {
                                "text": "Check your post title and web address so readers and search engines see the correct page details."
                            }
                        ],
                        "id": "l2m3n4o5p6",
                        "listStart": 3
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "decimal",
                        "children": [
                            {
                                "text": "Select the publish action to make the post live on its public-facing blog page."
                            }
                        ],
                        "id": "m3n4o5p6q7",
                        "listStart": 4
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "decimal",
                        "children": [
                            {
                                "text": "Open the published page in a browser to verify the content, media, and interactive elements all appear correctly for readers."
                            }
                        ],
                        "id": "n4o5p6q7r8",
                        "listStart": 5
                    },
                    {
                        "type": "h2",
                        "children": [
                            {
                                "text": "What Loads When You Publish"
                            }
                        ],
                        "id": "o5p6q7r8s9"
                    },
                    {
                        "type": "table",
                        "id": "p6q7r8s9t0",
                        "children": [
                            {
                                "type": "tr",
                                "id": "q7r8s9t0u1",
                                "children": [
                                    {
                                        "type": "th",
                                        "id": "r8s9t0u1v2",
                                        "children": [
                                            {
                                                "type": "p",
                                                "children": [
                                                    {
                                                        "text": "Content Type"
                                                    }
                                                ],
                                                "id": "s9t0u1v2w3"
                                            }
                                        ]
                                    },
                                    {
                                        "type": "th",
                                        "id": "t0u1v2w3x4",
                                        "children": [
                                            {
                                                "type": "p",
                                                "children": [
                                                    {
                                                        "text": "Loading Priority"
                                                    }
                                                ],
                                                "id": "u1v2w3x4y5"
                                            }
                                        ]
                                    },
                                    {
                                        "type": "th",
                                        "id": "v2w3x4y5z6",
                                        "children": [
                                            {
                                                "type": "p",
                                                "children": [
                                                    {
                                                        "text": "What Readers See"
                                                    }
                                                ],
                                                "id": "w3x4y5z6a7"
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                "type": "tr",
                                "id": "x4y5z6a7b8",
                                "children": [
                                    {
                                        "type": "td",
                                        "id": "y5z6a7b8c9",
                                        "children": [
                                            {
                                                "type": "p",
                                                "children": [
                                                    {
                                                        "text": "Main blog content"
                                                    }
                                                ],
                                                "id": "z6a7b8c9d0"
                                            }
                                        ]
                                    },
                                    {
                                        "type": "td",
                                        "id": "a7b8c9d0e1",
                                        "children": [
                                            {
                                                "type": "p",
                                                "children": [
                                                    {
                                                        "text": "Immediate"
                                                    }
                                                ],
                                                "id": "b8c9d0e1f2"
                                            }
                                        ]
                                    },
                                    {
                                        "type": "td",
                                        "id": "c9d0e1f2g3",
                                        "children": [
                                            {
                                                "type": "p",
                                                "children": [
                                                    {
                                                        "text": "Text, headings, and images appear right away"
                                                    }
                                                ],
                                                "id": "d0e1f2g3h4"
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                "type": "tr",
                                "id": "e1f2g3h4i5",
                                "children": [
                                    {
                                        "type": "td",
                                        "id": "f2g3h4i5j6",
                                        "children": [
                                            {
                                                "type": "p",
                                                "children": [
                                                    {
                                                        "text": "Polls, FAQs, lead magnets"
                                                    }
                                                ],
                                                "id": "g3h4i5j6k7"
                                            }
                                        ]
                                    },
                                    {
                                        "type": "td",
                                        "id": "h4i5j6k7l8",
                                        "children": [
                                            {
                                                "type": "p",
                                                "children": [
                                                    {
                                                        "text": "Progressive"
                                                    }
                                                ],
                                                "id": "i5j6k7l8m9"
                                            }
                                        ]
                                    },
                                    {
                                        "type": "td",
                                        "id": "j6k7l8m9n0",
                                        "children": [
                                            {
                                                "type": "p",
                                                "children": [
                                                    {
                                                        "text": "Interactive elements load shortly after main content"
                                                    }
                                                ],
                                                "id": "k7l8m9n0o1"
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                "type": "tr",
                                "id": "l8m9n0o1p2",
                                "children": [
                                    {
                                        "type": "td",
                                        "id": "m9n0o1p2q3",
                                        "children": [
                                            {
                                                "type": "p",
                                                "children": [
                                                    {
                                                        "text": "Banners, infographics"
                                                    }
                                                ],
                                                "id": "n0o1p2q3r4"
                                            }
                                        ]
                                    },
                                    {
                                        "type": "td",
                                        "id": "o1p2q3r4s5",
                                        "children": [
                                            {
                                                "type": "p",
                                                "children": [
                                                    {
                                                        "text": "Secondary"
                                                    }
                                                ],
                                                "id": "p2q3r4s5t6"
                                            }
                                        ]
                                    },
                                    {
                                        "type": "td",
                                        "id": "q3r4s5t6u7",
                                        "children": [
                                            {
                                                "type": "p",
                                                "children": [
                                                    {
                                                        "text": "Visual enhancements load in the background"
                                                    }
                                                ],
                                                "id": "r4s5t6u7v8"
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                "type": "tr",
                                "id": "s5t6u7v8w9",
                                "children": [
                                    {
                                        "type": "td",
                                        "id": "t6u7v8w9x0",
                                        "children": [
                                            {
                                                "type": "p",
                                                "children": [
                                                    {
                                                        "text": "SEO content"
                                                    }
                                                ],
                                                "id": "u7v8w9x0y1"
                                            }
                                        ]
                                    },
                                    {
                                        "type": "td",
                                        "id": "v8w9x0y1z2",
                                        "children": [
                                            {
                                                "type": "p",
                                                "children": [
                                                    {
                                                        "text": "Background"
                                                    }
                                                ],
                                                "id": "w9x0y1z2a3"
                                            }
                                        ]
                                    },
                                    {
                                        "type": "td",
                                        "id": "x0y1z2a3b4",
                                        "children": [
                                            {
                                                "type": "p",
                                                "children": [
                                                    {
                                                        "text": "Hidden from readers but available to search engines"
                                                    }
                                                ],
                                                "id": "y1z2a3b4c5"
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "type": "h2",
                        "children": [
                            {
                                "text": "Tips"
                            }
                        ],
                        "id": "z2a3b4c5d6"
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "disc",
                        "children": [
                            {
                                "text": "Preview your published page on both desktop and mobile to make sure layouts and images display well everywhere."
                            }
                        ],
                        "id": "a3b4c5d6e7"
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "disc",
                        "children": [
                            {
                                "text": "Give your post a clear, descriptive title and web address—these help readers and search engines understand your content."
                            }
                        ],
                        "id": "b4c5d6e7f8"
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "disc",
                        "children": [
                            {
                                "text": "Test interactive components like polls and lead magnets on the live page to confirm readers can engage with them."
                            }
                        ],
                        "id": "c5d6e7f8g9"
                    },
                    {
                        "type": "callout",
                        "variant": "tip",
                        "children": [
                            {
                                "text": "Because main content loads first and extras load progressively, your readers can begin reading immediately even on slower connections."
                            }
                        ],
                        "id": "d6e7f8g9h0"
                    },
                    {
                        "type": "callout",
                        "variant": "info",
                        "children": [
                            {
                                "text": "Published pages are designed to maintain SEO benefits without causing layout shifts or slowing down the reading experience."
                            }
                        ],
                        "id": "e7f8g9h0i1"
                    },
                    {
                        "type": "h2",
                        "children": [
                            {
                                "text": "Troubleshooting"
                            }
                        ],
                        "id": "f8g9h0i1j2"
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "disc",
                        "children": [
                            {
                                "text": "If interactive components don't appear right away, wait a moment—they load progressively after the main content and may take a few seconds."
                            }
                        ],
                        "id": "g9h0i1j2k3"
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "disc",
                        "children": [
                            {
                                "text": "If images look broken or missing, confirm they finished uploading in the editor before you published the post."
                            }
                        ],
                        "id": "h0i1j2k3l4"
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "disc",
                        "children": [
                            {
                                "text": "If recent edits don't show on the live page, refresh the browser, since published pages may show a cached version briefly."
                            }
                        ],
                        "id": "i1j2k3l4m5"
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "disc",
                        "children": [
                            {
                                "text": "If a poll or lead magnet isn't working for readers, reopen the post and check that the component is fully configured and saved."
                            }
                        ],
                        "id": "j2k3l4m5n6"
                    },
                    {
                        "type": "p",
                        "children": [
                            {
                                "text": "Related topics: Create and Edit Blog Content, Embed Interactive Engagement Components, SEO-Optimized Publishing."
                            }
                        ],
                        "id": "k3l4m5n6o7"
                    }
                ]
            },
            {
                "id": "p-github-hyperblog-frontend-test-optimizing-posts-for-seo",
                "title": "Optimizing Posts for SEO",
                "slug": "github-hyperblog-frontend-test-optimizing-posts-for-seo",
                "type": "page",
                "description": "Ensure your published pages render SEO content for search engines.",
                "content": [
                    {
                        "type": "h1",
                        "children": [
                            {
                                "text": "Optimizing Posts for SEO"
                            }
                        ],
                        "id": "seoa1b2c3d4"
                    },
                    {
                        "type": "p",
                        "children": [
                            {
                                "text": "HyperBlog automatically prepares your published posts so search engines can read and index your content, while readers enjoy fast-loading pages. This means your interactive elements and rich content stay discoverable without slowing down the reading experience or causing distracting layout shifts."
                            }
                        ],
                        "id": "introseo123"
                    },
                    {
                        "type": "h2",
                        "children": [
                            {
                                "text": "How It Works"
                            }
                        ],
                        "id": "howit45678a"
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "disc",
                        "children": [
                            {
                                "text": "Your main post content loads first and appears immediately, so both readers and search engines see the most important material right away."
                            }
                        ],
                        "id": "bul1aa1234b"
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "disc",
                        "children": [
                            {
                                "text": "Interactive components such as polls, FAQs, lead magnets, banners, and infographics load progressively in the background after the core content is ready."
                            }
                        ],
                        "id": "bul2bb2345c"
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "disc",
                        "children": [
                            {
                                "text": "Search engine content is rendered behind the scenes so crawlers can index it, while it stays out of the reader's visible layout to prevent shifting elements."
                            }
                        ],
                        "id": "bul3cc3456d"
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "disc",
                        "children": [
                            {
                                "text": "Pages are optimized for Core Web Vitals, improving how quickly content appears and becomes interactive for your visitors."
                            }
                        ],
                        "id": "bul4dd4567e"
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "disc",
                        "children": [
                            {
                                "text": "Headings, lists, and structured text blocks you add in the editor become the readable structure that search engines use to understand your post."
                            }
                        ],
                        "id": "bul5ee5678f"
                    },
                    {
                        "type": "h2",
                        "children": [
                            {
                                "text": "Steps"
                            }
                        ],
                        "id": "stepshd901a"
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "decimal",
                        "children": [
                            {
                                "text": "Open your post in the editor and give it a clear, descriptive title that reflects what the content is about."
                            }
                        ],
                        "id": "stp1ff1234a"
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "decimal",
                        "children": [
                            {
                                "text": "Structure your content using heading blocks (H1, H2, H3) so search engines can understand the hierarchy of your topics."
                            }
                        ],
                        "id": "stp2gg2345b",
                        "listStart": 2
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "decimal",
                        "children": [
                            {
                                "text": "Add descriptive text around images, polls, and other interactive components so the surrounding content carries meaning for crawlers."
                            }
                        ],
                        "id": "stp3hh3456c",
                        "listStart": 3
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "decimal",
                        "children": [
                            {
                                "text": "Insert engagement components like FAQs and lead magnets, which provide additional indexable content for search engines."
                            }
                        ],
                        "id": "stp4ii4567d",
                        "listStart": 4
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "decimal",
                        "children": [
                            {
                                "text": "Publish the post to generate a public page where the SEO content renders automatically in the background."
                            }
                        ],
                        "id": "stp5jj5678e",
                        "listStart": 5
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "decimal",
                        "children": [
                            {
                                "text": "Verify your live page using a tool like Google PageSpeed Insights or Lighthouse to confirm fast loading and good performance scores."
                            }
                        ],
                        "id": "stp6kk6789f",
                        "listStart": 6
                    },
                    {
                        "type": "h2",
                        "children": [
                            {
                                "text": "SEO Loading Priorities"
                            }
                        ],
                        "id": "tblhead012a"
                    },
                    {
                        "type": "table",
                        "id": "tblmain123b",
                        "children": [
                            {
                                "type": "tr",
                                "id": "trh001234c",
                                "children": [
                                    {
                                        "type": "th",
                                        "id": "th0012345d",
                                        "children": [
                                            {
                                                "type": "p",
                                                "children": [
                                                    {
                                                        "text": "Content Type"
                                                    }
                                                ],
                                                "id": "pth012345e"
                                            }
                                        ]
                                    },
                                    {
                                        "type": "th",
                                        "id": "th0023456f",
                                        "children": [
                                            {
                                                "type": "p",
                                                "children": [
                                                    {
                                                        "text": "Loading Priority"
                                                    }
                                                ],
                                                "id": "pth023456g"
                                            }
                                        ]
                                    },
                                    {
                                        "type": "th",
                                        "id": "th0034567h",
                                        "children": [
                                            {
                                                "type": "p",
                                                "children": [
                                                    {
                                                        "text": "SEO Benefit"
                                                    }
                                                ],
                                                "id": "pth034567i"
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                "type": "tr",
                                "id": "trr011234j",
                                "children": [
                                    {
                                        "type": "td",
                                        "id": "td0112345k",
                                        "children": [
                                            {
                                                "type": "p",
                                                "children": [
                                                    {
                                                        "text": "Main blog content"
                                                    }
                                                ],
                                                "id": "ptd112345l"
                                            }
                                        ]
                                    },
                                    {
                                        "type": "td",
                                        "id": "td0123456m",
                                        "children": [
                                            {
                                                "type": "p",
                                                "children": [
                                                    {
                                                        "text": "Immediate (highest)"
                                                    }
                                                ],
                                                "id": "ptd123456n"
                                            }
                                        ]
                                    },
                                    {
                                        "type": "td",
                                        "id": "td0134567o",
                                        "children": [
                                            {
                                                "type": "p",
                                                "children": [
                                                    {
                                                        "text": "Core indexable text appears instantly"
                                                    }
                                                ],
                                                "id": "ptd134567p"
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                "type": "tr",
                                "id": "trr022345q",
                                "children": [
                                    {
                                        "type": "td",
                                        "id": "td0212345r",
                                        "children": [
                                            {
                                                "type": "p",
                                                "children": [
                                                    {
                                                        "text": "Polls, FAQs, lead magnets"
                                                    }
                                                ],
                                                "id": "ptd212345s"
                                            }
                                        ]
                                    },
                                    {
                                        "type": "td",
                                        "id": "td0223456t",
                                        "children": [
                                            {
                                                "type": "p",
                                                "children": [
                                                    {
                                                        "text": "Progressive"
                                                    }
                                                ],
                                                "id": "ptd223456u"
                                            }
                                        ]
                                    },
                                    {
                                        "type": "td",
                                        "id": "td0234567v",
                                        "children": [
                                            {
                                                "type": "p",
                                                "children": [
                                                    {
                                                        "text": "Adds engagement content without blocking the page"
                                                    }
                                                ],
                                                "id": "ptd234567w"
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                "type": "tr",
                                "id": "trr033456x",
                                "children": [
                                    {
                                        "type": "td",
                                        "id": "td0312345y",
                                        "children": [
                                            {
                                                "type": "p",
                                                "children": [
                                                    {
                                                        "text": "Banners, infographics"
                                                    }
                                                ],
                                                "id": "ptd312345z"
                                            }
                                        ]
                                    },
                                    {
                                        "type": "td",
                                        "id": "td0323456a",
                                        "children": [
                                            {
                                                "type": "p",
                                                "children": [
                                                    {
                                                        "text": "Secondary"
                                                    }
                                                ],
                                                "id": "ptd323456b"
                                            }
                                        ]
                                    },
                                    {
                                        "type": "td",
                                        "id": "td0334567c",
                                        "children": [
                                            {
                                                "type": "p",
                                                "children": [
                                                    {
                                                        "text": "Visual enhancements load last"
                                                    }
                                                ],
                                                "id": "ptd334567d"
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                "type": "tr",
                                "id": "trr044567e",
                                "children": [
                                    {
                                        "type": "td",
                                        "id": "td0412345f",
                                        "children": [
                                            {
                                                "type": "p",
                                                "children": [
                                                    {
                                                        "text": "Search engine content"
                                                    }
                                                ],
                                                "id": "ptd412345g"
                                            }
                                        ]
                                    },
                                    {
                                        "type": "td",
                                        "id": "td0423456h",
                                        "children": [
                                            {
                                                "type": "p",
                                                "children": [
                                                    {
                                                        "text": "Background (hidden)"
                                                    }
                                                ],
                                                "id": "ptd423456i"
                                            }
                                        ]
                                    },
                                    {
                                        "type": "td",
                                        "id": "td0434567j",
                                        "children": [
                                            {
                                                "type": "p",
                                                "children": [
                                                    {
                                                        "text": "Indexed by crawlers without layout shifts"
                                                    }
                                                ],
                                                "id": "ptd434567k"
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "type": "h2",
                        "children": [
                            {
                                "text": "Tips"
                            }
                        ],
                        "id": "tipshead12a"
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "disc",
                        "children": [
                            {
                                "text": "Use a single clear H1 for your title and nest H2 and H3 headings logically to help search engines map your content."
                            }
                        ],
                        "id": "tip1aa123b"
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "disc",
                        "children": [
                            {
                                "text": "Add descriptive alt text and meaningful captions to images so they contribute to your page's search relevance."
                            }
                        ],
                        "id": "tip2bb234c"
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "disc",
                        "children": [
                            {
                                "text": "FAQ sections are especially valuable because their question-and-answer format gives search engines clear, indexable content."
                            }
                        ],
                        "id": "tip3cc345d"
                    },
                    {
                        "type": "callout",
                        "variant": "tip",
                        "children": [
                            {
                                "text": "Because the main content loads first, focus your key keywords and message in the opening paragraphs and headings for the strongest SEO impact."
                            }
                        ],
                        "id": "cal1tip456e"
                    },
                    {
                        "type": "callout",
                        "variant": "info",
                        "children": [
                            {
                                "text": "SEO content renders automatically in the background once you publish — you do not need to configure it manually."
                            }
                        ],
                        "id": "cal2inf567f"
                    },
                    {
                        "type": "h2",
                        "children": [
                            {
                                "text": "Troubleshooting"
                            }
                        ],
                        "id": "trblhead12a"
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "disc",
                        "children": [
                            {
                                "text": "If a page seems slow to index, confirm the post is fully published and the public page loads correctly in a browser."
                            }
                        ],
                        "id": "trb1aa123b"
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "disc",
                        "children": [
                            {
                                "text": "If interactive components appear missing to search engines, remember they load progressively — give the page time to finish loading before testing."
                            }
                        ],
                        "id": "trb2bb234c"
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "disc",
                        "children": [
                            {
                                "text": "If your performance scores are low, run the page through PageSpeed Insights or Lighthouse to identify large images or other heavy elements to optimize."
                            }
                        ],
                        "id": "trb3cc345d"
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "disc",
                        "children": [
                            {
                                "text": "If your content structure looks flat to search engines, review your heading levels and ensure you are using proper heading blocks instead of plain bold text."
                            }
                        ],
                        "id": "trb4dd456e"
                    },
                    {
                        "type": "p",
                        "children": [
                            {
                                "text": "Related topics: Reading and Loading Published Blogs, Adding FAQ Sections, Capturing Leads with Lead Magnets."
                            }
                        ],
                        "id": "reltop789a"
                    }
                ]
            },
            {
                "id": "p-github-hyperblog-frontend-test-exporting-content",
                "title": "Exporting Content",
                "slug": "github-hyperblog-frontend-test-exporting-content",
                "type": "page",
                "description": "Export your blog content using the export toolbar actions.",
                "content": [
                    {
                        "type": "h1",
                        "children": [
                            {
                                "text": "Exporting Content"
                            }
                        ],
                        "id": "a1b2c3d4e5"
                    },
                    {
                        "type": "p",
                        "children": [
                            {
                                "text": "Exporting lets you take your finished blog content out of the editor in a portable format, so you can save a copy, share it, or repurpose it elsewhere. The export toolbar gives you quick, one-click access to these actions while you work on a post."
                            }
                        ],
                        "id": "f6g7h8i9j0"
                    },
                    {
                        "type": "h2",
                        "children": [
                            {
                                "text": "How It Works"
                            }
                        ],
                        "id": "k1l2m3n4o5"
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "disc",
                        "children": [
                            {
                                "text": "Export actions are available directly from the editor toolbar, so you don't need to leave your post."
                            }
                        ],
                        "id": "p6q7r8s9t0"
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "disc",
                        "children": [
                            {
                                "text": "Your entire post — including text blocks, headings, lists, images, and embedded elements — is captured in the export."
                            }
                        ],
                        "id": "u1v2w3x4y5"
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "disc",
                        "children": [
                            {
                                "text": "Exports reflect the current state of your content, so what you see in the editor is what gets exported."
                            }
                        ],
                        "id": "z6a7b8c9d0"
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "disc",
                        "children": [
                            {
                                "text": "You can export at any point while drafting, whether the post is published or still in progress."
                            }
                        ],
                        "id": "e1f2g3h4i5"
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "disc",
                        "children": [
                            {
                                "text": "Once an export is generated, the file is saved to your device for offline use or sharing."
                            }
                        ],
                        "id": "j6k7l8m9n0"
                    },
                    {
                        "type": "h2",
                        "children": [
                            {
                                "text": "Steps"
                            }
                        ],
                        "id": "o1p2q3r4s5"
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "decimal",
                        "children": [
                            {
                                "text": "Open the blog post you want to export in the editor."
                            }
                        ],
                        "id": "t6u7v8w9x0"
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "decimal",
                        "children": [
                            {
                                "text": "Make sure your content is complete and the post looks the way you want it to appear."
                            }
                        ],
                        "id": "y1z2a3b4c5",
                        "listStart": 2
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "decimal",
                        "children": [
                            {
                                "text": "Locate the export button in the editor toolbar."
                            }
                        ],
                        "id": "d6e7f8g9h0",
                        "listStart": 3
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "decimal",
                        "children": [
                            {
                                "text": "Click the export button to open the available export options."
                            }
                        ],
                        "id": "i1j2k3l4m5",
                        "listStart": 4
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "decimal",
                        "children": [
                            {
                                "text": "Choose the export format you prefer from the menu."
                            }
                        ],
                        "id": "n6o7p8q9r0",
                        "listStart": 5
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "decimal",
                        "children": [
                            {
                                "text": "Confirm the action, and the exported file will be generated and saved to your device."
                            }
                        ],
                        "id": "s1t2u3v4w5",
                        "listStart": 6
                    },
                    {
                        "type": "h2",
                        "children": [
                            {
                                "text": "Export Options"
                            }
                        ],
                        "id": "x6y7z8a9b0"
                    },
                    {
                        "type": "table",
                        "id": "c1d2e3f4g5",
                        "children": [
                            {
                                "type": "tr",
                                "id": "h6i7j8k9l0",
                                "children": [
                                    {
                                        "type": "th",
                                        "id": "m1n2o3p4q5",
                                        "children": [
                                            {
                                                "type": "p",
                                                "children": [
                                                    {
                                                        "text": "Option"
                                                    }
                                                ],
                                                "id": "r6s7t8u9v0"
                                            }
                                        ]
                                    },
                                    {
                                        "type": "th",
                                        "id": "w1x2y3z4a5",
                                        "children": [
                                            {
                                                "type": "p",
                                                "children": [
                                                    {
                                                        "text": "What It Does"
                                                    }
                                                ],
                                                "id": "b6c7d8e9f0"
                                            }
                                        ]
                                    },
                                    {
                                        "type": "th",
                                        "id": "g1h2i3j4k5",
                                        "children": [
                                            {
                                                "type": "p",
                                                "children": [
                                                    {
                                                        "text": "Best For"
                                                    }
                                                ],
                                                "id": "l6m7n8o9p0"
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                "type": "tr",
                                "id": "q1r2s3t4u5",
                                "children": [
                                    {
                                        "type": "td",
                                        "id": "v6w7x8y9z0",
                                        "children": [
                                            {
                                                "type": "p",
                                                "children": [
                                                    {
                                                        "text": "Export full post"
                                                    }
                                                ],
                                                "id": "a1b2c3d4e6"
                                            }
                                        ]
                                    },
                                    {
                                        "type": "td",
                                        "id": "f6g7h8i9j1",
                                        "children": [
                                            {
                                                "type": "p",
                                                "children": [
                                                    {
                                                        "text": "Captures all blocks and embedded elements in the current post."
                                                    }
                                                ],
                                                "id": "k1l2m3n4o6"
                                            }
                                        ]
                                    },
                                    {
                                        "type": "td",
                                        "id": "p6q7r8s9t1",
                                        "children": [
                                            {
                                                "type": "p",
                                                "children": [
                                                    {
                                                        "text": "Saving a complete copy of your work."
                                                    }
                                                ],
                                                "id": "u1v2w3x4y6"
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                "type": "tr",
                                "id": "z6a7b8c9d1",
                                "children": [
                                    {
                                        "type": "td",
                                        "id": "e1f2g3h4i6",
                                        "children": [
                                            {
                                                "type": "p",
                                                "children": [
                                                    {
                                                        "text": "Export to a portable file"
                                                    }
                                                ],
                                                "id": "j6k7l8m9n1"
                                            }
                                        ]
                                    },
                                    {
                                        "type": "td",
                                        "id": "o1p2q3r4s6",
                                        "children": [
                                            {
                                                "type": "p",
                                                "children": [
                                                    {
                                                        "text": "Downloads your content as a file to your device."
                                                    }
                                                ],
                                                "id": "t6u7v8w9x1"
                                            }
                                        ]
                                    },
                                    {
                                        "type": "td",
                                        "id": "y1z2a3b4c6",
                                        "children": [
                                            {
                                                "type": "p",
                                                "children": [
                                                    {
                                                        "text": "Offline storage, backups, or sharing."
                                                    }
                                                ],
                                                "id": "d6e7f8g9h1"
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                "type": "tr",
                                "id": "i1j2k3l4m6",
                                "children": [
                                    {
                                        "type": "td",
                                        "id": "n6o7p8q9r1",
                                        "children": [
                                            {
                                                "type": "p",
                                                "children": [
                                                    {
                                                        "text": "Export current view"
                                                    }
                                                ],
                                                "id": "s1t2u3v4w6"
                                            }
                                        ]
                                    },
                                    {
                                        "type": "td",
                                        "id": "x6y7z8a9b1",
                                        "children": [
                                            {
                                                "type": "p",
                                                "children": [
                                                    {
                                                        "text": "Exports exactly what is shown in the editor at the moment."
                                                    }
                                                ],
                                                "id": "c1d2e3f4g6"
                                            }
                                        ]
                                    },
                                    {
                                        "type": "td",
                                        "id": "h6i7j8k9l1",
                                        "children": [
                                            {
                                                "type": "p",
                                                "children": [
                                                    {
                                                        "text": "Sharing drafts or works in progress."
                                                    }
                                                ],
                                                "id": "m1n2o3p4q6"
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "type": "h2",
                        "children": [
                            {
                                "text": "Tips"
                            }
                        ],
                        "id": "r6s7t8u9v1"
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "disc",
                        "children": [
                            {
                                "text": "Review your post one last time before exporting, since the export captures your content exactly as it appears."
                            }
                        ],
                        "id": "w1x2y3z4a6"
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "disc",
                        "children": [
                            {
                                "text": "Export a copy of important posts as a backup before making major edits."
                            }
                        ],
                        "id": "b6c7d8e9f1"
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "disc",
                        "children": [
                            {
                                "text": "If a post contains heavy elements like drawings or animations, give the export a moment to finish generating."
                            }
                        ],
                        "id": "g1h2i3j4k6"
                    },
                    {
                        "type": "callout",
                        "variant": "tip",
                        "children": [
                            {
                                "text": "Exporting is a great way to keep an offline archive of your published posts or to hand off content to a teammate for review."
                            }
                        ],
                        "id": "l6m7n8o9p1"
                    },
                    {
                        "type": "callout",
                        "variant": "info",
                        "children": [
                            {
                                "text": "The exported file reflects the current content only. To capture later changes, run the export again after editing."
                            }
                        ],
                        "id": "q1r2s3t4u6"
                    },
                    {
                        "type": "h2",
                        "children": [
                            {
                                "text": "Troubleshooting"
                            }
                        ],
                        "id": "v6w7x8y9z1"
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "disc",
                        "children": [
                            {
                                "text": "If the export button doesn't respond, refresh the editor and make sure your post has finished loading before trying again."
                            }
                        ],
                        "id": "a1b2c3d4e7"
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "disc",
                        "children": [
                            {
                                "text": "If embedded elements like polls or infographics seem missing from the export, allow extra time for all content to load, then export again."
                            }
                        ],
                        "id": "f6g7h8i9j2"
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "disc",
                        "children": [
                            {
                                "text": "If the file doesn't download, check your browser's download settings and ensure pop-ups or downloads aren't being blocked."
                            }
                        ],
                        "id": "k1l2m3n4o7"
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "disc",
                        "children": [
                            {
                                "text": "If the exported content looks incomplete, return to the editor, confirm all blocks are present, and run the export once more."
                            }
                        ],
                        "id": "p6q7r8s9t2"
                    },
                    {
                        "type": "p",
                        "children": [
                            {
                                "text": "Related topics: Create and Edit Blog Content, Insert Content via Slash Commands, Add Advanced Media and Rich Elements."
                            }
                        ],
                        "id": "u1v2w3x4y7"
                    }
                ]
            }
        ]
    },
    {
        "id": "f-github-hyperblog-frontend-test-reader-experience",
        "title": "Reader Experience",
        "slug": "github-hyperblog-frontend-test-reader-experience",
        "type": "folder",
        "children": [
            {
                "id": "p-github-hyperblog-frontend-test-reading-published-blogs",
                "title": "Reading Published Blogs",
                "slug": "github-hyperblog-frontend-test-reading-published-blogs",
                "type": "page",
                "description": "Understand how readers view progressively-loading, fast blog pages.",
                "content": [
                    {
                        "type": "h1",
                        "children": [
                            {
                                "text": "Reading Published Blogs"
                            }
                        ],
                        "id": "a1b2c3d4e5"
                    },
                    {
                        "type": "p",
                        "children": [
                            {
                                "text": "When you open a HyperBlog post, the page is built to show you the content right away and then bring in extra interactive elements as you read. This progressive approach means you spend less time waiting and more time engaging with the article, polls, FAQs, and other features the author has added."
                            }
                        ],
                        "id": "f6g7h8i9j0"
                    },
                    {
                        "type": "h2",
                        "children": [
                            {
                                "text": "How It Works"
                            }
                        ],
                        "id": "k1l2m3n4o5"
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "disc",
                        "children": [
                            {
                                "text": "The main article text and layout appear first, so you can begin reading immediately without waiting for the whole page to finish."
                            }
                        ],
                        "id": "p6q7r8s9t0"
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "disc",
                        "children": [
                            {
                                "text": "Interactive components such as polls, FAQs, and lead magnets load progressively in the background and appear as they become ready."
                            }
                        ],
                        "id": "u1v2w3x4y5"
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "disc",
                        "children": [
                            {
                                "text": "Visual enhancements like banners and infographics load after the core engagement elements to keep the initial view fast."
                            }
                        ],
                        "id": "z6a7b8c9d0"
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "disc",
                        "children": [
                            {
                                "text": "Loading indicators briefly appear where a component is still being prepared, so you always know more content is on the way."
                            }
                        ],
                        "id": "e1f2g3h4i5"
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "disc",
                        "children": [
                            {
                                "text": "Pages are optimized for search engines, so blog content is discoverable while still loading quickly for readers."
                            }
                        ],
                        "id": "j6k7l8m9n0"
                    },
                    {
                        "type": "h2",
                        "children": [
                            {
                                "text": "Steps"
                            }
                        ],
                        "id": "o1p2q3r4s5"
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "decimal",
                        "children": [
                            {
                                "text": "Open a blog link or click through to a published post from a search result, social share, or website."
                            }
                        ],
                        "id": "t6u7v8w9x0"
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "decimal",
                        "children": [
                            {
                                "text": "Start reading the main article as soon as it appears — text and headings load first so there is no need to wait."
                            }
                        ],
                        "id": "y1z2a3b4c5",
                        "listStart": 2
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "decimal",
                        "children": [
                            {
                                "text": "Watch for interactive elements such as polls and FAQ sections to fill in as you scroll; a brief loader shows where they are still arriving."
                            }
                        ],
                        "id": "d6e7f8g9h0",
                        "listStart": 3
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "decimal",
                        "children": [
                            {
                                "text": "Interact with the embedded components — vote in a poll, expand an FAQ answer, or sign up through a lead magnet."
                            }
                        ],
                        "id": "i1j2k3l4m5",
                        "listStart": 4
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "decimal",
                        "children": [
                            {
                                "text": "Continue scrolling to view banners, infographics, and other visual extras as they finish loading."
                            }
                        ],
                        "id": "n6o7p8q9r0",
                        "listStart": 5
                    },
                    {
                        "type": "h2",
                        "children": [
                            {
                                "text": "What Loads and When"
                            }
                        ],
                        "id": "s1t2u3v4w5"
                    },
                    {
                        "type": "table",
                        "id": "x6y7z8a9b0",
                        "children": [
                            {
                                "type": "tr",
                                "id": "c1d2e3f4g5",
                                "children": [
                                    {
                                        "type": "th",
                                        "id": "h6i7j8k9l0",
                                        "children": [
                                            {
                                                "type": "p",
                                                "children": [
                                                    {
                                                        "text": "Content Type"
                                                    }
                                                ],
                                                "id": "m1n2o3p4q5"
                                            }
                                        ]
                                    },
                                    {
                                        "type": "th",
                                        "id": "r6s7t8u9v0",
                                        "children": [
                                            {
                                                "type": "p",
                                                "children": [
                                                    {
                                                        "text": "Loading Priority"
                                                    }
                                                ],
                                                "id": "w1x2y3z4a5"
                                            }
                                        ]
                                    },
                                    {
                                        "type": "th",
                                        "id": "b6c7d8e9f0",
                                        "children": [
                                            {
                                                "type": "p",
                                                "children": [
                                                    {
                                                        "text": "What You See"
                                                    }
                                                ],
                                                "id": "g1h2i3j4k5"
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                "type": "tr",
                                "id": "l6m7n8o9p0",
                                "children": [
                                    {
                                        "type": "td",
                                        "id": "q1r2s3t4u5",
                                        "children": [
                                            {
                                                "type": "p",
                                                "children": [
                                                    {
                                                        "text": "Main article text and layout"
                                                    }
                                                ],
                                                "id": "v6w7x8y9z0"
                                            }
                                        ]
                                    },
                                    {
                                        "type": "td",
                                        "id": "a1b2c3d4e6",
                                        "children": [
                                            {
                                                "type": "p",
                                                "children": [
                                                    {
                                                        "text": "Immediate (highest)"
                                                    }
                                                ],
                                                "id": "f6g7h8i9j1"
                                            }
                                        ]
                                    },
                                    {
                                        "type": "td",
                                        "id": "k1l2m3n4o6",
                                        "children": [
                                            {
                                                "type": "p",
                                                "children": [
                                                    {
                                                        "text": "Readable content appears right away"
                                                    }
                                                ],
                                                "id": "p6q7r8s9t1"
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                "type": "tr",
                                "id": "u1v2w3x4y6",
                                "children": [
                                    {
                                        "type": "td",
                                        "id": "z6a7b8c9d1",
                                        "children": [
                                            {
                                                "type": "p",
                                                "children": [
                                                    {
                                                        "text": "Polls, FAQs, lead magnets"
                                                    }
                                                ],
                                                "id": "e1f2g3h4i6"
                                            }
                                        ]
                                    },
                                    {
                                        "type": "td",
                                        "id": "j6k7l8m9n1",
                                        "children": [
                                            {
                                                "type": "p",
                                                "children": [
                                                    {
                                                        "text": "Progressive (high)"
                                                    }
                                                ],
                                                "id": "o1p2q3r4s6"
                                            }
                                        ]
                                    },
                                    {
                                        "type": "td",
                                        "id": "t6u7v8w9x1",
                                        "children": [
                                            {
                                                "type": "p",
                                                "children": [
                                                    {
                                                        "text": "Engagement components fill in as they load"
                                                    }
                                                ],
                                                "id": "y1z2a3b4c6"
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                "type": "tr",
                                "id": "d6e7f8g9h1",
                                "children": [
                                    {
                                        "type": "td",
                                        "id": "i1j2k3l4m6",
                                        "children": [
                                            {
                                                "type": "p",
                                                "children": [
                                                    {
                                                        "text": "Banners and infographics"
                                                    }
                                                ],
                                                "id": "n6o7p8q9r1"
                                            }
                                        ]
                                    },
                                    {
                                        "type": "td",
                                        "id": "s1t2u3v4w6",
                                        "children": [
                                            {
                                                "type": "p",
                                                "children": [
                                                    {
                                                        "text": "Secondary (background)"
                                                    }
                                                ],
                                                "id": "x6y7z8a9b1"
                                            }
                                        ]
                                    },
                                    {
                                        "type": "td",
                                        "id": "c1d2e3f4g6",
                                        "children": [
                                            {
                                                "type": "p",
                                                "children": [
                                                    {
                                                        "text": "Visual extras appear last without slowing reading"
                                                    }
                                                ],
                                                "id": "h6i7j8k9l1"
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "type": "h2",
                        "children": [
                            {
                                "text": "Tips"
                            }
                        ],
                        "id": "m1n2o3p4q6"
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "disc",
                        "children": [
                            {
                                "text": "You can begin reading as soon as the article appears — there's no need to wait for the entire page to finish loading."
                            }
                        ],
                        "id": "r6s7t8u9v1"
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "disc",
                        "children": [
                            {
                                "text": "If you spot a loading indicator, give it a moment — an interactive element such as a poll or infographic is on its way."
                            }
                        ],
                        "id": "w1x2y3z4a6"
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "disc",
                        "children": [
                            {
                                "text": "A faster, more stable connection helps interactive components and visual extras appear more quickly."
                            }
                        ],
                        "id": "b6c7d8e9f1"
                    },
                    {
                        "type": "callout",
                        "variant": "tip",
                        "children": [
                            {
                                "text": "Scroll through the whole post to discover all the interactive extras — authors often place polls, FAQs, and sign-up offers further down the page."
                            }
                        ],
                        "id": "g1h2i3j4k6"
                    },
                    {
                        "type": "callout",
                        "variant": "info",
                        "children": [
                            {
                                "text": "Blog pages are designed to look stable while loading, so interactive elements appear in place without shifting the content you're already reading."
                            }
                        ],
                        "id": "l6m7n8o9p1"
                    },
                    {
                        "type": "h2",
                        "children": [
                            {
                                "text": "Troubleshooting"
                            }
                        ],
                        "id": "q1r2s3t4u6"
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "disc",
                        "children": [
                            {
                                "text": "An interactive element isn't showing: wait a few seconds for it to finish loading, then refresh the page if it still doesn't appear."
                            }
                        ],
                        "id": "v6w7x8y9z1"
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "disc",
                        "children": [
                            {
                                "text": "Images or infographics look blank: check your internet connection, as these visual extras load after the main text."
                            }
                        ],
                        "id": "a1b2c3d4e7"
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "disc",
                        "children": [
                            {
                                "text": "A poll or FAQ won't respond: make sure the component has fully loaded before clicking, and try reloading if it remains unresponsive."
                            }
                        ],
                        "id": "f6g7h8i9j2"
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "disc",
                        "children": [
                            {
                                "text": "The page feels slow on an older device: close other browser tabs and ensure your browser is up to date for the best reading experience."
                            }
                        ],
                        "id": "k1l2m3n4o7"
                    },
                    {
                        "type": "p",
                        "children": [
                            {
                                "text": "Related topics: Embed Interactive Engagement Components, Reader Engagement Journey, SEO-Optimized Publishing."
                            }
                        ],
                        "id": "p6q7r8s9t2"
                    }
                ]
            },
            {
                "id": "p-github-hyperblog-frontend-test-interacting-with-embedded-elements",
                "title": "Interacting with Embedded Elements",
                "slug": "github-hyperblog-frontend-test-interacting-with-embedded-elements",
                "type": "page",
                "description": "Vote in polls, expand FAQs, and download lead magnets as a reader.",
                "content": [
                    {
                        "type": "h1",
                        "children": [
                            {
                                "text": "Interacting with Embedded Elements"
                            }
                        ],
                        "id": "a1b2c3d4e5"
                    },
                    {
                        "type": "p",
                        "children": [
                            {
                                "text": "Many HyperBlog posts include interactive elements that let you do more than just read. As a reader, you can vote in polls, expand FAQ answers, and download lead magnets directly within the article. These elements appear inline as you scroll and respond instantly to your actions."
                            }
                        ],
                        "id": "f6g7h8i9j0"
                    },
                    {
                        "type": "h2",
                        "children": [
                            {
                                "text": "How It Works"
                            }
                        ],
                        "id": "k1l2m3n4o5"
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "disc",
                        "children": [
                            {
                                "text": "Polls let you cast a vote and immediately see how others have responded."
                            }
                        ],
                        "id": "p6q7r8s9t0"
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "disc",
                        "children": [
                            {
                                "text": "FAQ sections show questions you can click to expand and read the full answer."
                            }
                        ],
                        "id": "u1v2w3x4y5"
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "disc",
                        "children": [
                            {
                                "text": "Lead magnets offer a downloadable resource in exchange for a quick sign-up."
                            }
                        ],
                        "id": "z6a7b8c9d0"
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "disc",
                        "children": [
                            {
                                "text": "Interactive elements load progressively, so the main article appears first and embedded components fill in moments later."
                            }
                        ],
                        "id": "e1f2g3h4i5"
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "disc",
                        "children": [
                            {
                                "text": "Banners and infographics enhance the page visually and may include clickable links or calls to action."
                            }
                        ],
                        "id": "j6k7l8m9n0"
                    },
                    {
                        "type": "h2",
                        "children": [
                            {
                                "text": "Steps"
                            }
                        ],
                        "id": "o1p2q3r4s5"
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "decimal",
                        "children": [
                            {
                                "text": "Open a published blog post and scroll through the content as it loads."
                            }
                        ],
                        "id": "t6u7v8w9x0"
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "decimal",
                        "children": [
                            {
                                "text": "To vote in a poll, select the option you prefer and confirm your choice. The results display right after you vote."
                            }
                        ],
                        "id": "y1z2a3b4c5",
                        "listStart": 2
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "decimal",
                        "children": [
                            {
                                "text": "To read an FAQ, click a question to expand its answer, then click again to collapse it."
                            }
                        ],
                        "id": "d6e7f8g9h0",
                        "listStart": 3
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "decimal",
                        "children": [
                            {
                                "text": "To get a lead magnet, click the download or sign-up button, enter the requested details, and submit to receive the resource."
                            }
                        ],
                        "id": "i1j2k3l4m5",
                        "listStart": 4
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "decimal",
                        "children": [
                            {
                                "text": "Continue reading and interact with any other embedded elements as you scroll."
                            }
                        ],
                        "id": "n6o7p8q9r0",
                        "listStart": 5
                    },
                    {
                        "type": "h2",
                        "children": [
                            {
                                "text": "Embedded Element Actions"
                            }
                        ],
                        "id": "s1t2u3v4w5"
                    },
                    {
                        "type": "table",
                        "id": "x6y7z8a9b0",
                        "children": [
                            {
                                "type": "tr",
                                "id": "c1d2e3f4g5",
                                "children": [
                                    {
                                        "type": "th",
                                        "id": "h6i7j8k9l0",
                                        "children": [
                                            {
                                                "type": "p",
                                                "children": [
                                                    {
                                                        "text": "Element"
                                                    }
                                                ],
                                                "id": "m1n2o3p4q5"
                                            }
                                        ]
                                    },
                                    {
                                        "type": "th",
                                        "id": "r6s7t8u9v0",
                                        "children": [
                                            {
                                                "type": "p",
                                                "children": [
                                                    {
                                                        "text": "What You Can Do"
                                                    }
                                                ],
                                                "id": "w1x2y3z4a5"
                                            }
                                        ]
                                    },
                                    {
                                        "type": "th",
                                        "id": "b6c7d8e9f0",
                                        "children": [
                                            {
                                                "type": "p",
                                                "children": [
                                                    {
                                                        "text": "Result"
                                                    }
                                                ],
                                                "id": "g1h2i3j4k5"
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                "type": "tr",
                                "id": "l6m7n8o9p0",
                                "children": [
                                    {
                                        "type": "td",
                                        "id": "q1r2s3t4u5",
                                        "children": [
                                            {
                                                "type": "p",
                                                "children": [
                                                    {
                                                        "text": "Poll"
                                                    }
                                                ],
                                                "id": "v6w7x8y9z0"
                                            }
                                        ]
                                    },
                                    {
                                        "type": "td",
                                        "id": "a1b2c3d4e6",
                                        "children": [
                                            {
                                                "type": "p",
                                                "children": [
                                                    {
                                                        "text": "Select an option and submit your vote"
                                                    }
                                                ],
                                                "id": "f6g7h8i9j1"
                                            }
                                        ]
                                    },
                                    {
                                        "type": "td",
                                        "id": "k1l2m3n4o6",
                                        "children": [
                                            {
                                                "type": "p",
                                                "children": [
                                                    {
                                                        "text": "See live results from all voters"
                                                    }
                                                ],
                                                "id": "p6q7r8s9t1"
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                "type": "tr",
                                "id": "u1v2w3x4y6",
                                "children": [
                                    {
                                        "type": "td",
                                        "id": "z6a7b8c9d1",
                                        "children": [
                                            {
                                                "type": "p",
                                                "children": [
                                                    {
                                                        "text": "FAQ"
                                                    }
                                                ],
                                                "id": "e1f2g3h4i6"
                                            }
                                        ]
                                    },
                                    {
                                        "type": "td",
                                        "id": "j6k7l8m9n1",
                                        "children": [
                                            {
                                                "type": "p",
                                                "children": [
                                                    {
                                                        "text": "Click a question to expand"
                                                    }
                                                ],
                                                "id": "o1p2q3r4s6"
                                            }
                                        ]
                                    },
                                    {
                                        "type": "td",
                                        "id": "t6u7v8w9x1",
                                        "children": [
                                            {
                                                "type": "p",
                                                "children": [
                                                    {
                                                        "text": "View the full answer inline"
                                                    }
                                                ],
                                                "id": "y1z2a3b4c6"
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                "type": "tr",
                                "id": "d6e7f8g9h1",
                                "children": [
                                    {
                                        "type": "td",
                                        "id": "i1j2k3l4m6",
                                        "children": [
                                            {
                                                "type": "p",
                                                "children": [
                                                    {
                                                        "text": "Lead Magnet"
                                                    }
                                                ],
                                                "id": "n6o7p8q9r1"
                                            }
                                        ]
                                    },
                                    {
                                        "type": "td",
                                        "id": "s1t2u3v4w6",
                                        "children": [
                                            {
                                                "type": "p",
                                                "children": [
                                                    {
                                                        "text": "Sign up and download"
                                                    }
                                                ],
                                                "id": "x6y7z8a9b1"
                                            }
                                        ]
                                    },
                                    {
                                        "type": "td",
                                        "id": "c1d2e3f4g6",
                                        "children": [
                                            {
                                                "type": "p",
                                                "children": [
                                                    {
                                                        "text": "Receive the offered resource"
                                                    }
                                                ],
                                                "id": "h6i7j8k9l1"
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                "type": "tr",
                                "id": "m1n2o3p4q6",
                                "children": [
                                    {
                                        "type": "td",
                                        "id": "r6s7t8u9v1",
                                        "children": [
                                            {
                                                "type": "p",
                                                "children": [
                                                    {
                                                        "text": "Banner / Infographic"
                                                    }
                                                ],
                                                "id": "w1x2y3z4a6"
                                            }
                                        ]
                                    },
                                    {
                                        "type": "td",
                                        "id": "b6c7d8e9f1",
                                        "children": [
                                            {
                                                "type": "p",
                                                "children": [
                                                    {
                                                        "text": "Click links or view visuals"
                                                    }
                                                ],
                                                "id": "g1h2i3j4k6"
                                            }
                                        ]
                                    },
                                    {
                                        "type": "td",
                                        "id": "l6m7n8o9p1",
                                        "children": [
                                            {
                                                "type": "p",
                                                "children": [
                                                    {
                                                        "text": "Follow a call to action or explore content"
                                                    }
                                                ],
                                                "id": "q1r2s3t4u6"
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "type": "h2",
                        "children": [
                            {
                                "text": "Tips"
                            }
                        ],
                        "id": "v6w7x8y9z1"
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "disc",
                        "children": [
                            {
                                "text": "If an element hasn't appeared yet, give the page a moment—interactive components load right after the main article."
                            }
                        ],
                        "id": "a1b2c3d4e7"
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "disc",
                        "children": [
                            {
                                "text": "Once you vote in a poll, your choice is recorded, so review the options before submitting."
                            }
                        ],
                        "id": "f6g7h8i9j2"
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "disc",
                        "children": [
                            {
                                "text": "Use the lead magnet form only with an email address you check regularly so you receive the resource."
                            }
                        ],
                        "id": "k1l2m3n4o7"
                    },
                    {
                        "type": "callout",
                        "variant": "tip",
                        "children": [
                            {
                                "text": "Expanding multiple FAQ questions at once makes it easy to scan all the answers in a single view."
                            }
                        ],
                        "id": "p6q7r8s9t2"
                    },
                    {
                        "type": "callout",
                        "variant": "info",
                        "children": [
                            {
                                "text": "The main article is always readable first, even while polls, FAQs, and other elements are still loading in the background."
                            }
                        ],
                        "id": "u1v2w3x4y7"
                    },
                    {
                        "type": "h2",
                        "children": [
                            {
                                "text": "Troubleshooting"
                            }
                        ],
                        "id": "z6a7b8c9d2"
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "disc",
                        "children": [
                            {
                                "text": "An embedded element isn't showing: wait a few seconds for background loading to finish, then refresh the page if it still doesn't appear."
                            }
                        ],
                        "id": "e1f2g3h4i7"
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "disc",
                        "children": [
                            {
                                "text": "Your poll vote didn't register: make sure you selected an option and submitted; reload the page to see the current results."
                            }
                        ],
                        "id": "j6k7l8m9n2"
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "disc",
                        "children": [
                            {
                                "text": "The lead magnet download didn't arrive: confirm your email address was entered correctly and check your spam folder."
                            }
                        ],
                        "id": "o1p2q3r4s7"
                    },
                    {
                        "type": "p",
                        "indent": 1,
                        "listStyleType": "disc",
                        "children": [
                            {
                                "text": "An FAQ won't expand: try clicking directly on the question text, and ensure the page has fully loaded."
                            }
                        ],
                        "id": "t6u7v8w9x2"
                    },
                    {
                        "type": "p",
                        "children": [
                            {
                                "text": "Related topics: Reading Published Blog Posts, Embedding Interactive Engagement Components, Adding Lead Magnets to a Post."
                            }
                        ],
                        "id": "y1z2a3b4c7"
                    }
                ]
            }
        ]
    },
    {
        "id": "f-github-hyperblog-frontend-test-analytics-and-integrations",
        "title": "Analytics and Integrations",
        "slug": "github-hyperblog-frontend-test-analytics-and-integrations",
        "type": "folder",
        "children": [
            {
                "id": "p-github-hyperblog-frontend-test-tracking-engagement-and-usage",
                "title": "Tracking Engagement and Usage",
                "slug": "github-hyperblog-frontend-test-tracking-engagement-and-usage",
                "type": "page",
                "description": "Monitor reader behavior and product usage through PostHog analytics.",
                "content": []
            },
            {
                "id": "p-github-hyperblog-frontend-test-managing-connected-services",
                "title": "Managing Connected Services",
                "slug": "github-hyperblog-frontend-test-managing-connected-services",
                "type": "page",
                "description": "Configure integrations like Cloudinary, avatars, and the backend API.",
                "content": []
            }
        ]
    }
]

export default TEST_EDITOR_DATA