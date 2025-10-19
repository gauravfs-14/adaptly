# Security Policy

## Supported Versions

We provide security updates for the following versions of Adaptly:

| Version | Supported          |
| ------- | ------------------ |
| 0.0.1   | :white_check_mark: |
| < 0.0.1 | :x:                |

## Reporting a Vulnerability

### How to Report

We take security vulnerabilities seriously. If you discover a security vulnerability in Adaptly, please report it responsibly:

**DO NOT** create a public GitHub issue for security vulnerabilities.

### Reporting Process

1. **Email the maintainer directly**:
   - **Email**: [Your security email]
   - **Subject**: "Security Vulnerability in Adaptly"
   - **Include**: Detailed description of the vulnerability

2. **Use GitHub Security Advisories** (preferred):
   - Go to the [Security tab](https://github.com/gauravfs-14/adaptly/security) in the repository
   - Click "Report a vulnerability"
   - Fill out the security advisory form

3. **Include the following information**:
   - **Description** of the vulnerability
   - **Steps to reproduce** the issue
   - **Potential impact** and severity
   - **Suggested fix** (if you have one)
   - **Your contact information** for follow-up

### What to Include

When reporting a security vulnerability, please provide:

- **Detailed description** of the vulnerability
- **Proof of concept** or steps to reproduce
- **Affected versions** of Adaptly
- **Potential impact** on users
- **Suggested remediation** (if known)
- **Your contact information** for coordination

### Response Timeline

- **Initial response**: Within 48 hours
- **Status update**: Within 7 days
- **Resolution**: Depends on severity and complexity
- **Public disclosure**: After fix is available

## Security Considerations

### AI and LLM Security

Adaptly integrates with AI services (Google Gemini). Security considerations include:

- **API Key Protection**: Never expose API keys in client-side code
- **Input Validation**: Sanitize user inputs before sending to LLM
- **Rate Limiting**: Implement proper rate limiting for AI requests
- **Data Privacy**: Ensure user data is handled securely

### Component Security

- **XSS Prevention**: Sanitize user-generated content in components
- **Props Validation**: Validate all component props
- **Safe Rendering**: Use safe rendering practices
- **Content Security Policy**: Implement CSP headers

### Registry Security

- **Configuration Validation**: Validate adaptly.json configuration
- **Component Validation**: Ensure registered components are safe
- **Schema Validation**: Validate all registry schemas
- **Access Control**: Implement proper access controls

## Security Best Practices

### For Developers

1. **Keep dependencies updated**:

   ```bash
   npm audit
   npm update
   ```

2. **Use environment variables** for sensitive data:

   ```bash
   # Never commit API keys
   NEXT_PUBLIC_GOOGLE_GENERATIVE_AI_API_KEY=your_key_here
   ```

3. **Validate all inputs**:

   ```typescript
   // Validate user inputs
   if (!input || typeof input !== 'string') {
     throw new Error('Invalid input');
   }
   ```

4. **Use HTTPS** in production:

   ```typescript
   // Ensure secure connections
   const apiUrl = process.env.NODE_ENV === 'production' 
     ? 'https://api.example.com' 
     : 'http://localhost:3000';
   ```

5. **Implement proper error handling**:

   ```typescript
   try {
     // AI processing
   } catch (error) {
     // Log error securely
     console.error('AI processing failed:', error.message);
     // Don't expose sensitive information
   }
   ```

### For Users

1. **Protect your API keys**:
   - Never share API keys publicly
   - Use environment variables
   - Rotate keys regularly
   - Monitor API usage

2. **Validate component registry**:
   - Only register trusted components
   - Validate component props
   - Review component code
   - Use TypeScript for type safety

3. **Secure your deployment**:
   - Use HTTPS in production
   - Implement proper CORS policies
   - Set up security headers
   - Monitor for vulnerabilities

## Known Security Issues

### Current Issues

None at this time.

### Resolved Issues

None at this time.

## Security Updates

### How We Handle Security Issues

1. **Assessment**: Evaluate the severity and impact
2. **Coordination**: Work with reporters to understand the issue
3. **Fix Development**: Create a fix for the vulnerability
4. **Testing**: Thoroughly test the fix
5. **Release**: Publish a security update
6. **Disclosure**: Publicly disclose the issue (after fix is available)

### Security Update Process

1. **Immediate Response**: Acknowledge receipt within 48 hours
2. **Investigation**: Assess the vulnerability within 7 days
3. **Fix Development**: Create and test a fix
4. **Release**: Publish security update
5. **Disclosure**: Public disclosure after fix is available

## Security Tools and Resources

### Recommended Tools

- **npm audit**: Check for vulnerable dependencies
- **Snyk**: Monitor for security vulnerabilities
- **OWASP ZAP**: Web application security testing
- **ESLint security rules**: Static analysis for security issues

### Security Resources

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Node.js Security Best Practices](https://nodejs.org/en/docs/guides/security/)
- [React Security Best Practices](https://reactjs.org/docs/security.html)
- [AI Security Guidelines](https://www.nist.gov/ai/ai-risk-management-framework)

## Contact Information

### Security Team

- **Primary Contact**: Gaurab Chhetri
- **Email**: [Your security email]
- **GitHub**: [@gauravfs-14](https://github.com/gauravfs-14)

### Alternative Contact

If you cannot reach the primary contact:

- **GitHub Security Advisories**: [Security tab](https://github.com/gauravfs-14/adaptly/security)
- **GitHub Issues**: Use "Security" label (for non-sensitive issues)

## Acknowledgments

We appreciate security researchers who responsibly disclose vulnerabilities. Contributors who report security issues will be:

- **Acknowledged** in security advisories (if desired)
- **Listed** in the security contributors section
- **Credited** in release notes
- **Recognized** in the project documentation

## Legal

### Responsible Disclosure

We follow responsible disclosure practices:

- **No public disclosure** until a fix is available
- **Reasonable time** for fix development
- **Coordination** with security researchers
- **Credit** for responsible disclosure

### Liability

- **No liability** for security issues in the software
- **Use at your own risk**
- **Regular updates** recommended
- **Security monitoring** advised

## Updates

This security policy may be updated from time to time. Changes will be communicated through:

- **GitHub releases** and announcements
- **Security advisories**
- **Community notifications**
- **Documentation updates**

---

**Remember**: Security is everyone's responsibility. Help us keep Adaptly secure! 🔒
