---
title: Websites planned, built and deployed with AI
tag: AI
where: Consulting work
summary: "I set up GitHub, Cloudflare and the domain, then build the site with an AI coding assistant."
tech:
  - AI coding assistant
  - Visual Studio Code
  - GitHub
  - Cloudflare Pages and DNS
  - Namecheap
  - Astro
problem: "Small organizations need a fast, secure website they own, without paying for a large build or being tied to a page builder."
action: "I set up everything the site needs: a GitHub repository with a protected main branch, Visual Studio Code with an AI coding assistant, a Namecheap domain with DNS on Cloudflare, and Cloudflare Pages for hosting. Then I run the build in four phases. The AI writes the code, and I review and sign off on each phase."
result: "A fast, secure website the client owns outright: the code in their GitHub, hosting in their Cloudflare account, and the domain in their name. Every change gets a preview link before it goes live."
featured: false
draft: false
order: 0.5
---

## The stack

1. **GitHub.** A private repository holds the code. Main is protected, so every change arrives as a pull request.
2. **Visual Studio Code and an AI coding assistant.** An instruction file in the repository gives the AI the project's rules.
3. **Namecheap.** The domain is registered in the client's name, with its nameservers pointed to Cloudflare.
4. **Cloudflare DNS.** I rebuild the records that matter, including Microsoft 365 email (MX, SPF, DKIM and DMARC).
5. **Cloudflare Pages.** A push to main deploys the site, and every branch gets a private preview link.
6. **Security headers.** A strict content security policy and HSTS, with no third-party scripts.
7. **Build checks.** GitHub Actions builds every pull request, audits dependencies and blocks placeholder text.

## How a project runs

- **Plan.** I agree on the audience, goals, pages and content rules with the client.
- **Design.** The AI drafts design options, and we settle the headline and tone together.
- **Build.** The AI writes the code on a branch, and I review each change on its preview link.
- **Deploy.** I merge the approved pull request, then check the live site, the DNS and the headers.
