# A3-Creativz

AI-powered development and project progress dashboard for tracking software projects from planning to production.

## Purpose

A3 Creativz provides a single source of truth for project progress, combining structured delivery phases with real repository activity wherever available.

## Core workflow

**Planning → UI/UX Design → Development → Testing → Bug Fixing → Optimization → Deployment → Completed**

## Product goals

- Clear project status at a glance
- Progress based on verifiable project data, not fabricated percentages
- GitHub commits, pull requests, issues, checks, and deployment signals surfaced in one dashboard
- Scalable architecture for multiple projects and integrations
- Professional responsive UX with accessible, restrained motion

## Architecture

- **Next.js App Router** for the web application
- **TypeScript** for type-safe application code
- **Server-side GitHub API integration** to keep repository telemetry out of the browser
- **GitHub Issues** as the initial source of truth for workflow-stage completion
- **GitHub Actions** for continuous type-check and production-build verification
- **Environment-based GitHub token** support for higher API limits and future private repositories

## Evidence-driven progress

The initial progress model tracks one GitHub Issue per lifecycle stage. A stage is completed only when its corresponding issue is closed. The dashboard calculates the percentage from the tracked GitHub issue states, so changing the project state in GitHub changes the dashboard state.

## Development status

**Current phase: Development**

Planning has been completed and the initial dashboard/UI foundation plus GitHub telemetry layer are implemented. CI is active and currently validating the repository. Further work will expand feature-level tracking, deployment integration, automated testing, and production hardening.

See [`PROJECT_WORKFLOW.md`](./PROJECT_WORKFLOW.md) for the lifecycle, progress model, architecture direction, and definition of done.
