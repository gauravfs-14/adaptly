# Deployment Guide

This guide covers deploying Adaptly applications to various platforms, including configuration, optimization, and production considerations.

## 🚀 Quick Deployment

### Vercel (Recommended)

Vercel is the easiest way to deploy Adaptly applications with built-in Next.js support.

#### 1. Prepare Your Project

```bash
# Ensure your project is ready
npm run build
npm run lint
```

#### 2. Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Follow the prompts:
# - Link to existing project? No
# - Project name: your-adaptly-app
# - Directory: ./
# - Override settings: No
```

#### 3. Configure Environment Variables

In the Vercel dashboard:

1. Go to your project settings
2. Navigate to "Environment Variables"
3. Add your variables:

```env
NEXT_PUBLIC_GOOGLE_GENERATIVE_AI_API_KEY=your_api_key_here
```

#### 4. Deploy

```bash
# Deploy to production
vercel --prod
```

### Netlify

#### 1. Build Configuration

Create `netlify.toml`:

```toml
[build]
  command = "npm run build"
  publish = ".next"

[build.environment]
  NODE_VERSION = "18"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

#### 2. Deploy

```bash
# Install Netlify CLI
npm i -g netlify-cli

# Deploy
netlify deploy --prod
```

### Railway

#### 1. Railway Configuration

Create `railway.json`:

```json
{
  "build": {
    "builder": "NIXPACKS"
  },
  "deploy": {
    "startCommand": "npm start",
    "healthcheckPath": "/",
    "healthcheckTimeout": 100,
    "restartPolicyType": "ON_FAILURE",
    "restartPolicyMaxRetries": 10
  }
}
```

#### 2. Deploy

```bash
# Install Railway CLI
npm i -g @railway/cli

# Login and deploy
railway login
railway link
railway up
```

## 🔧 Platform-Specific Configuration

### Vercel Configuration

#### `vercel.json`

```json
{
  "framework": "nextjs",
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "installCommand": "npm install",
  "devCommand": "npm run dev",
  "env": {
    "NEXT_PUBLIC_GOOGLE_GENERATIVE_AI_API_KEY": "@gemini-api-key"
  },
  "functions": {
    "app/api/**/*.ts": {
      "maxDuration": 30
    }
  }
}
```

#### Environment Variables

```env
# Required
NEXT_PUBLIC_GOOGLE_GENERATIVE_AI_API_KEY=your_api_key_here

# Optional
NEXT_PUBLIC_APP_NAME=My Adaptly App
NEXT_PUBLIC_APP_VERSION=1.0.0
```

### Netlify Configuration

#### `netlify.toml`

```toml
[build]
  command = "npm run build"
  publish = ".next"

[build.environment]
  NODE_VERSION = "18"
  NPM_VERSION = "9"

[build.processing]
  skip_processing = false

[build.processing.css]
  bundle = true
  minify = true

[build.processing.js]
  bundle = true
  minify = true

[build.processing.html]
  pretty_urls = true

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[functions]
  directory = "netlify/functions"
```

### AWS Amplify

#### `amplify.yml`

```yaml
version: 1
frontend:
  phases:
    preBuild:
      commands:
        - npm install
    build:
      commands:
        - npm run build
  artifacts:
    baseDirectory: .next
    files:
      - '**/*'
  cache:
    paths:
      - node_modules/**/*
      - .next/cache/**/*
```

### Docker Deployment

#### `Dockerfile`

```dockerfile
FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json* ./
RUN npm ci

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build the application
RUN npm run build

# Production image
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

CMD ["node", "server.js"]
```

#### `docker-compose.yml`

```yaml
version: '3.8'

services:
  adaptly-app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NEXT_PUBLIC_GOOGLE_GENERATIVE_AI_API_KEY=${GEMINI_API_KEY}
    volumes:
      - .:/app
      - /app/node_modules
```

## ⚙️ Production Configuration

### Environment Variables

#### Required Variables

```env
# AI API Key (required for AI features)
NEXT_PUBLIC_GOOGLE_GENERATIVE_AI_API_KEY=your_api_key_here

# Alternative naming
NEXT_PUBLIC_GEMINI_API_KEY=your_api_key_here
```

#### Optional Variables

```env
# App Configuration
NEXT_PUBLIC_APP_NAME=My Adaptly App
NEXT_PUBLIC_APP_VERSION=1.0.0
NEXT_PUBLIC_APP_URL=https://myapp.vercel.app

# AI Configuration
NEXT_PUBLIC_AI_MODEL=gemini-2.0-flash
NEXT_PUBLIC_AI_TEMPERATURE=0.7
NEXT_PUBLIC_AI_MAX_TOKENS=1000

# Feature Flags
NEXT_PUBLIC_ENABLE_AI=true
NEXT_PUBLIC_ENABLE_ANALYTICS=false
NEXT_PUBLIC_ENABLE_DEBUG=false

# Performance
NEXT_PUBLIC_MAX_COMPONENTS=50
NEXT_PUBLIC_CACHE_DURATION=300000
```

### Next.js Configuration

#### `next.config.js`

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  experimental: {
    appDir: true,
  },
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY,
  },
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Access-Control-Allow-Methods', value: 'GET, POST, PUT, DELETE, OPTIONS' },
          { key: 'Access-Control-Allow-Headers', value: 'Content-Type, Authorization' },
        ],
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: '/api/adaptly/:path*',
        destination: '/api/adaptly/:path*',
      },
    ];
  },
};

module.exports = nextConfig;
```

### Build Optimization

#### `package.json` Scripts

```json
{
  "scripts": {
    "build": "next build",
    "build:analyze": "ANALYZE=true next build",
    "build:production": "NODE_ENV=production next build",
    "start": "next start",
    "start:production": "NODE_ENV=production next start -p 3000"
  }
}
```

#### Bundle Analysis

```bash
# Install bundle analyzer
npm install --save-dev @next/bundle-analyzer

# Analyze bundle
npm run build:analyze
```

## 🔒 Security Considerations

### API Key Security

#### Environment Variables

```env
# Never commit API keys to version control
NEXT_PUBLIC_GOOGLE_GENERATIVE_AI_API_KEY=your_api_key_here
```

#### Key Rotation

```typescript
// Implement key rotation
const getApiKey = () => {
  const primaryKey = process.env.NEXT_PUBLIC_GOOGLE_GENERATIVE_AI_API_KEY;
  const backupKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY_BACKUP;
  
  return primaryKey || backupKey;
};
```

### Content Security Policy

#### `next.config.js`

```javascript
const nextConfig = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; connect-src 'self' https://generativelanguage.googleapis.com;",
          },
        ],
      },
    ];
  },
};
```

### Rate Limiting

#### API Route Protection

```typescript
// app/api/adaptly/plan/route.ts
import { NextRequest, NextResponse } from 'next/server';

const rateLimit = new Map();

export async function POST(req: NextRequest) {
  const ip = req.ip || req.headers.get('x-forwarded-for') || 'unknown';
  const now = Date.now();
  const windowMs = 60 * 1000; // 1 minute
  const maxRequests = 10;
  
  if (!rateLimit.has(ip)) {
    rateLimit.set(ip, { count: 1, resetTime: now + windowMs });
  } else {
    const userLimit = rateLimit.get(ip);
    if (now > userLimit.resetTime) {
      rateLimit.set(ip, { count: 1, resetTime: now + windowMs });
    } else if (userLimit.count >= maxRequests) {
      return NextResponse.json({ error: 'Rate limit exceeded' }, { status: 429 });
    } else {
      userLimit.count++;
    }
  }
  
  // Process request
  // ... your logic
}
```

## 📊 Monitoring and Analytics

### Performance Monitoring

#### Vercel Analytics

```typescript
// app/layout.tsx
import { Analytics } from '@vercel/analytics/react';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
```

#### Custom Analytics

```typescript
// lib/analytics.ts
export const trackEvent = (event: string, properties?: Record<string, unknown>) => {
  if (typeof window !== 'undefined') {
    // Send to your analytics service
    console.log('Event:', event, properties);
  }
};

// Usage
trackEvent('ai_request', { input: 'Add a chart', response_time: 1500 });
```

### Error Monitoring

#### Sentry Integration

```bash
npm install @sentry/nextjs
```

```typescript
// sentry.client.config.ts
import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  tracesSampleRate: 1.0,
  debug: false,
  replaysOnErrorSampleRate: 1.0,
  replaysSessionSampleRate: 0.1,
});
```

#### Custom Error Handling

```typescript
// lib/error-handler.ts
export const handleError = (error: Error, context?: string) => {
  console.error('Error:', error.message, context);
  
  // Send to monitoring service
  if (typeof window !== 'undefined') {
    // Client-side error handling
    trackEvent('error', { message: error.message, context });
  }
};
```

## 🚀 Performance Optimization

### Build Optimization

#### Next.js Configuration

```javascript
// next.config.js
const nextConfig = {
  output: 'standalone',
  compress: true,
  poweredByHeader: false,
  generateEtags: false,
  images: {
    domains: ['example.com'],
    formats: ['image/webp', 'image/avif'],
  },
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ['adaptly'],
  },
};
```

#### Bundle Splitting

```typescript
// Dynamic imports for better code splitting
const AdaptlyProvider = dynamic(() => import('adaptly').then(mod => ({ default: mod.AdaptlyProvider })), {
  ssr: false,
  loading: () => <div>Loading Adaptly...</div>
});
```

### Caching Strategy

#### API Response Caching

```typescript
// app/api/adaptly/plan/route.ts
export async function POST(req: NextRequest) {
  const cacheKey = `adaptly:${JSON.stringify(await req.json())}`;
  
  // Check cache
  const cached = await redis.get(cacheKey);
  if (cached) {
    return NextResponse.json(JSON.parse(cached));
  }
  
  // Process request
  const result = await processRequest();
  
  // Cache result
  await redis.setex(cacheKey, 300, JSON.stringify(result)); // 5 minutes
  
  return NextResponse.json(result);
}
```

#### Static Generation

```typescript
// app/dashboard/page.tsx
export async function generateStaticParams() {
  return [
    { id: '1' },
    { id: '2' },
    { id: '3' },
  ];
}

export default function Dashboard({ params }: { params: { id: string } }) {
  // Your component
}
```

## 🔧 CI/CD Pipeline

### GitHub Actions

#### `.github/workflows/deploy.yml`

```yaml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run tests
        run: npm run test
      
      - name: Run linting
        run: npm run lint
      
      - name: Build application
        run: npm run build
        env:
          NEXT_PUBLIC_GOOGLE_GENERATIVE_AI_API_KEY: ${{ secrets.GEMINI_API_KEY }}
      
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
          vercel-args: '--prod'
```

### GitLab CI

#### `.gitlab-ci.yml`

```yaml
stages:
  - test
  - build
  - deploy

variables:
  NODE_VERSION: "18"

test:
  stage: test
  image: node:18-alpine
  script:
    - npm ci
    - npm run test
    - npm run lint
  only:
    - merge_requests
    - main

build:
  stage: build
  image: node:18-alpine
  script:
    - npm ci
    - npm run build
  artifacts:
    paths:
      - .next/
    expire_in: 1 hour
  only:
    - main

deploy:
  stage: deploy
  image: alpine:latest
  script:
    - apk add --no-cache curl
    - curl -X POST $DEPLOY_WEBHOOK_URL
  only:
    - main
  when: manual
```

## 🆘 Troubleshooting

### Common Deployment Issues

#### Build Failures

```bash
# Check build locally
npm run build

# Check for TypeScript errors
npm run type-check

# Check for linting errors
npm run lint
```

#### Environment Variable Issues

```typescript
// Check environment variables
console.log('API Key:', process.env.NEXT_PUBLIC_GOOGLE_GENERATIVE_AI_API_KEY);
console.log('Node Env:', process.env.NODE_ENV);
```

#### Performance Issues

```bash
# Analyze bundle size
npm run build:analyze

# Check for memory leaks
node --inspect server.js
```

### Debug Tools

#### Production Debugging

```typescript
// Enable debug mode in production
const isDebug = process.env.NODE_ENV === 'development' || 
                process.env.NEXT_PUBLIC_DEBUG === 'true';

if (isDebug) {
  console.log('Debug mode enabled');
  // Debug logging
}
```

#### Health Checks

```typescript
// app/api/health/route.ts
export async function GET() {
  return NextResponse.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    version: process.env.NEXT_PUBLIC_APP_VERSION,
  });
}
```

## 📚 Next Steps

Now that you understand deployment:

1. **Read the [Performance Guide](./performance.md)** - Optimize your application
2. **Check out [Monitoring Guide](./monitoring.md)** - Set up monitoring
3. **Explore [Custom Components](./custom-components.md)** - Build your own components
4. **Try the [Basic Dashboard Tutorial](./tutorials/basic-dashboard.md)** - Build a complete dashboard

---

**Ready to deploy?** Check out the [Quick Start Guide](./quick-start.md) to get started!
