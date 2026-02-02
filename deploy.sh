#!/bin/bash

# Cloudflare Pages Deployment Script
# This script builds the project and deploys it to Cloudflare Pages

set -e  # Exit on error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Configuration
PROJECT_NAME="h5-openim"
BUILD_DIR="dist"
PRODUCTION_BRANCH="main"

# Check if wrangler is installed
if ! command -v wrangler &> /dev/null; then
    echo -e "${RED}Error: Wrangler CLI is not installed${NC}"
    echo "Please install it using: npm install -g wrangler"
    exit 1
fi

# Check if user is logged in to Cloudflare
echo -e "${YELLOW}Checking Cloudflare authentication...${NC}"
if ! wrangler whoami &> /dev/null; then
    echo -e "${RED}Error: Not logged in to Cloudflare${NC}"
    echo "Please login using: wrangler login"
    exit 1
fi

echo -e "${GREEN}✓ Cloudflare authentication verified${NC}"

# Install dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
    echo -e "${YELLOW}Installing dependencies...${NC}"
    pnpm install
fi

# Build the project
echo -e "${YELLOW}Building project...${NC}"
pnpm run build

# Check if build was successful
if [ ! -d "$BUILD_DIR" ]; then
    echo -e "${RED}Error: Build failed - $BUILD_DIR directory not found${NC}"
    exit 1
fi

echo -e "${GREEN}✓ Build completed successfully${NC}"

# Get current branch name
CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD 2>/dev/null || echo "unknown")

# Determine if this is a production deployment
if [ "$CURRENT_BRANCH" = "$PRODUCTION_BRANCH" ]; then
    ENVIRONMENT="--branch=$PRODUCTION_BRANCH"
    echo -e "${YELLOW}Deploying to production environment (branch: $PRODUCTION_BRANCH)...${NC}"
else
    ENVIRONMENT="--branch=$CURRENT_BRANCH"
    echo -e "${YELLOW}Deploying to preview environment (branch: $CURRENT_BRANCH)...${NC}"
fi

# Deploy to Cloudflare Pages
echo -e "${YELLOW}Deploying to Cloudflare Pages...${NC}"
wrangler pages deploy "$BUILD_DIR" $ENVIRONMENT --project-name="$PROJECT_NAME" --commit-dirty=true

echo -e "${GREEN}✓ Deployment completed successfully!${NC}"
echo -e "${GREEN}Your site is now live on Cloudflare Pages${NC}"
