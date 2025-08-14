# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 15 application with TypeScript, using the App Router architecture. The project includes UI components built with shadcn/ui and Tailwind CSS v4, comprehensive testing with Vitest and Playwright, and deployment configurations for Cloudflare Workers.

## Essential Commands

### Development

- `npm run dev` - Start development server (http://localhost:3000)
- `npm run build` - Build for production
- `npm run start` - Start production server

### Code Quality

- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check formatting without modifying files
- `npm run typecheck` - TypeScript type checking

### Testing

#### Unit Testing (Vitest)

- `npm run test` - Run unit tests
- `npm run test:watch` - Run tests in watch mode
- `npm run test:ui` - Open Vitest UI
- `npm run test:coverage` - Generate coverage report
- `npm run test:run` - Run tests once (CI mode)

Test files: `src/**/*.{test,spec}.{ts,tsx}`

#### E2E Testing (Playwright)

- `npm run e2e` - Run all E2E tests
- `npm run e2e:docker` - Run tests in Docker container
- `npm run e2e:ui` - Open Playwright UI
- `npm run e2e:debug` - Debug mode
- `npm run e2e:headed` - Run with visible browser
- `npm run e2e:chrome` - Run Chrome tests only
- `npm run e2e:firefox` - Run Firefox tests only
- `npm run e2e:update-snapshots` - Update visual regression snapshots
- `npm run e2e:update-snapshots:docker` - Update visual regression snapshots in Docker container
- `npm run e2e:report` - View test report

Test files: `e2e/**/*.spec.ts`

## Architecture

### Directory Structure

- `src/app/` - Next.js App Router pages and layouts
- `src/components/` - React components
  - `ui/` - shadcn/ui components
  - Custom components with accompanying test files
- `src/lib/` - Utility functions
- `src/test/` - Test setup and utilities
- `src/types/` - TypeScript type definitions
- `e2e/` - Playwright E2E tests
- `supabase/` - Supabase configuration
- `scripts/` - Build and deployment scripts

### Key Technologies

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript with strict mode
- **Styling**: Tailwind CSS v4 with CSS variables
- **UI Components**: shadcn/ui (New York style)
- **Testing**: Vitest for unit tests, Playwright for E2E
- **Path Aliases**: `@/*` maps to `./src/*`

### Testing Strategy

- Unit tests use Vitest and React Testing Library with jsdom environment
- E2E tests run against Chromium and Firefox browsers
- Visual regression testing with screenshot comparisons
- Test coverage reports generated in HTML format
- CI configuration with retries and parallel execution

### Deployment

- Cloudflare Workers configurations for test report hosting:
  - `wrangler.unit-test.toml` - Unit test coverage reports
  - `wrangler.e2e-test.toml` - E2E test reports
