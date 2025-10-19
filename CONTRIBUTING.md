# Contributing to Adaptly

Thank you for your interest in contributing to Adaptly! This document provides guidelines and information for contributors.

## 🎯 How to Contribute

### Reporting Issues

Before creating an issue, please:

1. **Search existing issues** to avoid duplicates
2. **Check the documentation** to ensure it's not a usage question
3. **Use the issue templates** when available

### Bug Reports

When reporting bugs, please include:

- **Environment details**: Node.js version, package manager, OS
- **Steps to reproduce**: Clear, numbered steps
- **Expected behavior**: What should happen
- **Actual behavior**: What actually happens
- **Screenshots/logs**: If applicable
- **Minimal reproduction**: If possible, create a minimal example

### Feature Requests

For feature requests, please:

- **Check existing issues** for similar requests
- **Describe the use case** and why it would be valuable
- **Provide examples** of how the feature would work
- **Consider implementation complexity** and maintenance burden

## 🛠️ Development Setup

### Prerequisites

- Node.js 18+
- npm, yarn, pnpm, or bun
- Git

### Getting Started

1. **Fork the repository**

   ```bash
   git clone https://github.com/your-username/adaptly.git
   cd adaptly
   ```

2. **Install dependencies**

   ```bash
   cd adaptly-lib
   npm install
   
   cd ../examples/adaptly-demo
   npm install
   ```

3. **Set up environment variables**

   ```bash
   # In examples/adaptly-demo/
   cp .env.example .env.local
   # Add your Gemini API key
   ```

4. **Run the development server**

   ```bash
   # From project root
   make demo-app
   ```

### Development Workflow

1. **Create a feature branch**

   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes**
   - Follow the coding standards
   - Add tests if applicable
   - Update documentation

3. **Test your changes**

   ```bash
   # Test the library
   cd adaptly-lib
   npm run build
   
   # Test the demo
   cd ../examples/adaptly-demo
   npm run dev
   ```

4. **Commit your changes**

   ```bash
   git add .
   git commit -m "feat: add your feature description"
   ```

5. **Push and create a pull request**

   ```bash
   git push origin feature/your-feature-name
   ```

## 📝 Coding Standards

### TypeScript

- **Use TypeScript** for all new code
- **Define proper types** for all functions and components
- **Use interfaces** for object shapes
- **Avoid `any`** - use proper typing

### React Components

- **Use functional components** with hooks
- **Define prop interfaces** for all components
- **Use proper naming conventions** (PascalCase for components)
- **Add JSDoc comments** for complex functions

### Code Style

- **Follow existing patterns** in the codebase
- **Use meaningful variable names**
- **Keep functions small and focused**
- **Add comments for complex logic**

### File Organization

```
adaptly-lib/
├── core/
│   ├── components/     # React components
│   ├── services/       # Business logic
│   ├── types/         # TypeScript definitions
│   └── utils/         # Utility functions
├── docs/              # Documentation
└── tests/             # Test files
```

## 🧪 Testing

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

### Writing Tests

- **Test component behavior**, not implementation details
- **Use descriptive test names**
- **Test edge cases and error conditions**
- **Mock external dependencies**

### Test Structure

```typescript
describe('ComponentName', () => {
  it('should render correctly', () => {
    // Test implementation
  });
  
  it('should handle user interaction', () => {
    // Test implementation
  });
});
```

## 📚 Documentation

### Code Documentation

- **Add JSDoc comments** for all public functions
- **Document complex algorithms** and business logic
- **Include usage examples** in comments
- **Update README files** when adding new features

### API Documentation

- **Document all public APIs**
- **Include parameter descriptions**
- **Provide usage examples**
- **Update type definitions**

### User Documentation

- **Update quick start guide** for new features
- **Add troubleshooting sections** for common issues
- **Include migration guides** for breaking changes
- **Update changelog** for all changes

## 🚀 Release Process

### Version Bumping

We follow [Semantic Versioning](https://semver.org/):

- **MAJOR**: Breaking changes
- **MINOR**: New features (backward compatible)
- **PATCH**: Bug fixes (backward compatible)

### Changelog

- **Update CHANGELOG.md** for all releases
- **Group changes** by type (Added, Changed, Fixed, Removed)
- **Include migration notes** for breaking changes
- **Link to issues and PRs** when relevant

### Release Checklist

- [ ] All tests pass
- [ ] Documentation is updated
- [ ] Changelog is updated
- [ ] Version is bumped
- [ ] Release notes are written

## 🤝 Community Guidelines

### Be Respectful

- **Use welcoming language**
- **Be respectful of differing viewpoints**
- **Focus on what's best for the community**
- **Show empathy towards other community members**

### Be Constructive

- **Provide constructive feedback**
- **Suggest improvements** rather than just pointing out problems
- **Help others learn** and grow
- **Share knowledge** and resources

### Be Collaborative

- **Work together** towards common goals
- **Share credit** for collaborative work
- **Be open to feedback** and suggestions
- **Help newcomers** get started

## 🐛 Bug Fixes

### Before Fixing

1. **Reproduce the bug** locally
2. **Identify the root cause**
3. **Check for existing fixes** or similar issues
4. **Understand the impact** of the fix

### During Fixing

1. **Write a test** that reproduces the bug
2. **Implement the fix**
3. **Ensure the test passes**
4. **Check for regressions**

### After Fixing

1. **Update documentation** if needed
2. **Add to changelog**
3. **Test in different environments**
4. **Get code review**

## ✨ Feature Development

### Before Starting

1. **Discuss the feature** in an issue first
2. **Get approval** from maintainers
3. **Plan the implementation**
4. **Consider backward compatibility**

### During Development

1. **Follow the coding standards**
2. **Write comprehensive tests**
3. **Update documentation**
4. **Consider performance implications**

### After Development

1. **Get thorough code review**
2. **Test in different scenarios**
3. **Update examples and demos**
4. **Prepare migration guide** if needed

## 📞 Getting Help

### Resources

- **Documentation**: Check the `/docs` folder
- **Issues**: Search existing issues on GitHub
- **Discussions**: Use GitHub Discussions for questions
- **Discord**: Join our community Discord (if available)

### Contact

- **Maintainer**: Gaurab Chhetri
- **Email**: [Your email]
- **GitHub**: [@gauravfs-14](https://github.com/gauravfs-14)

## 🙏 Recognition

Contributors will be recognized in:

- **README.md** contributors section
- **Release notes** for significant contributions
- **GitHub contributors** page
- **Project documentation**

Thank you for contributing to Adaptly! 🚀
