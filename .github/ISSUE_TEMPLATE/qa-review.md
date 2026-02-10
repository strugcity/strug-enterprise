---
name: QA Review
about: Review and quality assurance task
title: "[QA] Review title"
labels: "type:qa, agent:claude-code"
assignees: ""
---

## Description
<!-- What is being reviewed? List the PRs or issues covered. -->

## Review Checklist
- [ ] Code compiles and builds without errors
- [ ] TypeScript types are correct
- [ ] No security vulnerabilities (injections, exposed secrets, etc.)
- [ ] Error handling is appropriate
- [ ] No regressions in existing functionality
- [ ] Mobile responsive

## Security Checklist (if API routes)
- [ ] Authentication/authorization verified
- [ ] Input validation on all endpoints
- [ ] No secrets in client-side code
- [ ] Rate limiting configured
- [ ] Error responses don't leak internals

## Dependencies
<!-- List the issues/PRs this review covers -->

## Notes
<!-- Specific areas of concern, known issues, etc. -->
