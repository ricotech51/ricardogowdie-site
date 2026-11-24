---
title: Websites planned, built and deployed with AI
tag: AI
where: Consulting work
summary: "I set up the infrastructure for a website and run the project with an AI coding assistant: GitHub, Visual Studio Code with the assistant, the domain, and Cloudflare for DNS, hosting and security."
tech:
  - AI coding assistant
  - Visual Studio Code
  - GitHub
  - Cloudflare Pages and DNS
  - Namecheap
  - Astro
artifact: ../../assets/artifacts/10-ai-built-websites.png
artifactKind: Setup and delivery plan
artifactAlt: "Sample setup plan for a website built with AI: the stack from Visual Studio Code and an AI coding assistant to GitHub, Cloudflare Pages and DNS, and a Namecheap domain, then the plan, design, build and deploy steps with a sign-off at each one."
problem: "Small organizations need a fast, secure website they own, without paying for a large build or being tied to a page builder."
action: "I set up the stack: a GitHub repository with a protected main branch, Visual Studio Code with an AI coding assistant, a domain registered at Namecheap with DNS moved to Cloudflare, and Cloudflare Pages for hosting. Then I run the project in phases (plan, design, build, deploy), with the AI writing the code and me reviewing and approving each phase."
result: "A fast, secure website the client owns outright: the code in their GitHub, hosting in their Cloudflare account, and the domain in their name. Every change gets a preview link before it goes live."
featured: true
draft: false
order: 0.5
---

## The stack and how each piece is set up

1. **GitHub repository.** A private repository holds the site's code and full history. The main branch is protected, so changes arrive as pull requests on their own branches, and only an approved pull request reaches main.
2. **Visual Studio Code and an AI coding assistant.** I clone the repository in Visual Studio Code and run the assistant in it. An instruction file in the repository gives the AI the project's rules: the design system, the content style, and what must never be published.
3. **Domain at Namecheap.** The domain is registered at Namecheap in the client's name. I point its nameservers to Cloudflare, so DNS is managed in one place.
4. **Cloudflare DNS.** I recreate the records that matter, such as the email records for Microsoft 365 (MX, SPF, DKIM and DMARC), and add the website records.
5. **Cloudflare Pages.** Pages connects to the GitHub repository. A push to main deploys the live site, and every branch gets its own private preview link. The apex domain and www are added as custom domains, with HTTPS managed by Cloudflare.
6. **Security headers.** A headers file sets a strict content security policy, HSTS and the other standard headers, with no third-party scripts. I check the result with a header scanner before launch.
7. **Build checks.** A GitHub Actions check runs on every pull request: it builds the site, audits dependencies, and fails if a page still shows placeholder text or personal data.

## How a project runs

- **Plan.** I agree the audience, goals, pages and content rules with the client. The AI turns that into a written plan with open questions.
- **Design.** The AI drafts design directions and sample pages. The client picks one, and I approve the headline and tone with them.
- **Build.** The AI writes the code and content on a branch. I review each change on its preview link and ask for fixes in plain English.
- **Deploy.** Once the preview is approved, I merge the pull request, Cloudflare deploys it, and I check the live site, the DNS and the security headers.

## What the client keeps

The client owns the GitHub repository, the Cloudflare account and the domain. Changes later follow the same loop: ask for the change, review the preview, approve it.
