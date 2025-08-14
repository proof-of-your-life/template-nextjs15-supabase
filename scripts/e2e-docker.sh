#!/bin/bash
set -e

# Get current user ID and group ID
USER_ID=$(id -u)
GROUP_ID=$(id -g)

# Run Playwright tests in Docker with proper user permissions
docker run --rm \
  -v "$(pwd):/work" \
  -w /work \
  --network=host \
  --user "${USER_ID}:${GROUP_ID}" \
  -e HOME=/tmp \
  -e npm_config_cache=/tmp/.npm \
  mcr.microsoft.com/playwright:v1.54.2-jammy \
  sh -c "npm ci && npm run e2e"