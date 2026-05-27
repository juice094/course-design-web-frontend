# Security Policy

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 2.0.x   | :white_check_mark: |
| < 2.0   | :x:                |

## Reporting a Vulnerability

Please report security vulnerabilities by emailing the repository maintainers directly.

**Do not** open a public issue for security-related bugs.

### What to Include

- A description of the vulnerability
- Steps to reproduce (if applicable)
- Potential impact assessment
- Suggested fix (if you have one)

### Response Timeline

| Stage | Target |
|-------|--------|
| Initial acknowledgment | Within 48 hours |
| Vulnerability assessment | Within 7 days |
| Fix release (if confirmed) | Within 30 days |

## Current Security Measures

- **Dependency Scanning**: Dependabot monitors for known vulnerabilities in dependencies
- **Code Scanning**: CodeQL runs on every push to `main` and on pull requests
- **Branch Protection**: `main` branch requires pull request reviews and passing CI checks
- **Signed Commits**: Required for all contributions to `main`

## Known Limitations

This is a course design project with the following security considerations:

- Authentication uses mock JWT tokens (not production-grade)
- No backend API rate limiting (frontend-only)
- localStorage is used for data persistence (not encrypted)
- Steam/GitHub data scraping relies on public endpoints

These limitations are acceptable for the project's educational scope but would require hardening for production deployment.
