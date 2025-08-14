# CI/CD Workflow Documentation

This repository uses a two-stage deployment process to ensure quality and stability.

## 🔄 Workflow Overview

### 1. **Preview Deployments** (`deploy-preview.yaml`)

- **Triggered by**: Pull Request creation, updates, or synchronization
- **Purpose**: Deploy preview versions for testing before merging
- **Preview URL**: `https://ridhitbhura.github.io/my-website/preview/pr-{PR_NUMBER}`
- **Auto-cleanup**: Preview is removed when PR is closed/merged

### 2. **Production Deployment** (`hugo.yaml`)

- **Triggered by**: Push to `main` branch (i.e., merged PRs)
- **Purpose**: Deploy to production site
- **Production URL**: `https://ridhitbhura.github.io/my-website/`

## 🚀 Development Workflow

1. **Create Feature Branch**

   ```bash
   git checkout -b feature/my-new-feature
   # Make your changes
   git push origin feature/my-new-feature
   ```

2. **Create Pull Request**

   - Open PR against `main` branch
   - GitHub Actions automatically builds and deploys preview
   - PR comment shows preview URL for testing

3. **Review & Test**

   - Review code changes
   - Test functionality on preview URL
   - Make additional commits if needed (preview auto-updates)

4. **Merge to Production**
   - Once approved, merge PR to `main`
   - Production deployment automatically triggers
   - Preview cleanup happens automatically

## 🔧 Environment Details

### Preview Environment

- **Hugo Environment**: `development`
- **Base URL**: Dynamic per PR
- **Retention**: 7 days for artifacts
- **Concurrency**: One deployment per PR

### Production Environment

- **Hugo Environment**: `production`
- **Base URL**: From GitHub Pages configuration
- **Caching**: Enabled for performance
- **Minification**: Enabled

## 🏗️ Build Process

Both workflows use:

- **Hugo Version**: 0.148.0 (Extended)
- **Dart Sass Version**: 1.89.2
- **Node.js**: Latest LTS
- **Caching**: Hugo cache for faster builds

## 🛠️ Manual Deployment

You can manually trigger deployments:

1. Go to **Actions** tab in GitHub
2. Select **Deploy to Production** workflow
3. Click **Run workflow** button
4. Choose branch and run

## 📋 Prerequisites

- GitHub Pages enabled for repository
- Appropriate permissions set in workflow files
- Hugo theme as git submodule (automatically handled)
