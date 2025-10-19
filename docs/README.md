# Adaptly Documentation

This directory contains the Docusaurus-based documentation for Adaptly.

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
cd docs
npm install
```

### Development

```bash
npm start
```

This starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

### Build

```bash
npm run build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

### Deployment

The documentation is automatically deployed to GitHub Pages when changes are pushed to the main branch. The deployment is handled by the GitHub Actions workflow in `.github/workflows/deploy-docs.yml`.

## 📁 Structure

```
docs/
├── docs/                    # Documentation content
│   ├── intro.md            # Homepage
│   ├── quick-start.md      # Quick start guide
│   ├── component-registry.md
│   ├── llm-providers.md
│   ├── storage-service.md
│   ├── advanced-features.md
│   ├── troubleshooting.md
│   └── api/                # API documentation
│       ├── core-components.md
│       └── types.md
├── src/                    # Source files
├── static/                 # Static assets
├── docusaurus.config.ts    # Docusaurus configuration
├── sidebars.ts             # Sidebar configuration
└── package.json           # Dependencies
```

## 🔧 Configuration

### Docusaurus Config

The main configuration is in `docusaurus.config.ts`. Key settings:

- **URL**: `https://gauravfs-14.github.io`
- **Base URL**: `/adaptly/`
- **Organization**: `gauravfs-14`
- **Project**: `adaptly`

### Sidebar Configuration

The sidebar is configured in `sidebars.ts` with the following structure:

1. **Introduction** - Homepage and quick start
2. **Guides** - Component registry, LLM providers, storage, advanced features, troubleshooting
3. **API Reference** - Core components and types

## 📝 Adding Content

### New Documentation Pages

1. Create a new `.md` file in the `docs/` directory
2. Add frontmatter with `sidebar_position` for ordering
3. Update `sidebars.ts` to include the new page

### API Documentation

API documentation goes in the `docs/api/` directory and should include:

- Complete type definitions
- Usage examples
- Parameter descriptions
- Return value documentation

## 🚀 Deployment

### Automatic Deployment

The documentation is automatically deployed to GitHub Pages when:

1. Changes are pushed to the `main` branch
2. The changes affect files in the `docs/` directory
3. The GitHub Actions workflow runs successfully

### Manual Deployment

If you need to deploy manually:

```bash
cd docs
npm run build
npm run deploy
```

## 🔍 Troubleshooting

### Common Issues

1. **Build fails**: Check that all markdown files have proper frontmatter
2. **Sidebar not updating**: Ensure `sidebars.ts` is properly configured
3. **Images not loading**: Place images in `static/img/` and reference as `/img/filename`

### Local Development Issues

1. **Port conflicts**: Use `npm start -- --port 3001` to use a different port
2. **Cache issues**: Clear browser cache or use incognito mode
3. **Hot reload not working**: Restart the development server

## 📚 Resources

- [Docusaurus Documentation](https://docusaurus.io/docs)
- [Markdown Guide](https://www.markdownguide.org/)
- [MDX Documentation](https://mdxjs.com/)

## 🤝 Contributing

1. Make changes to the documentation
2. Test locally with `npm start`
3. Create a pull request
4. The documentation will be automatically deployed when merged

## 📄 License

This documentation is part of the Adaptly project and follows the same MIT license.
