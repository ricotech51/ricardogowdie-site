---
title: Websites built and deployed by directing Claude
tag: AI
where: Consulting work
summary: "I build and deploy websites by directing Claude. I lead the project and make the decisions, and Claude writes the code and ships it. This site is one example."
tech:
  - Claude
  - Astro
  - Cloudflare Pages
  - GitHub
artifact: ../../assets/artifacts/10-ai-built-websites.png
artifactKind: Delivery process
artifactAlt: "Sample delivery board for an AI-built website: five phases (plan, design, build, secure, deploy) showing what I decide, what Claude does, and the sign-off at each phase, plus the review loop every change follows."
problem: "Small organizations need a fast, secure website they own, without paying for a large build or being tied to a page builder."
action: "I run each website as a project: I set the requirements, the design direction and the security rules, and I review and approve every phase. Claude writes the code, opens each change as a pull request with a preview link, and deploys it to Cloudflare Pages once I approve."
result: "This website was built this way and is live, with strict security headers rated A+. The client owns the code, the hosting and the domain."
featured: true
draft: false
order: 0.5
---

## How I work

I treat a website like any other infrastructure project. I plan it, make the design decisions, set the rules, and sign off each phase. Claude does the hands-on work: it writes the code and the pages, builds the site, and deploys it. Nothing reaches the live site until I approve it.

Every change follows the same loop. I describe the change in plain English. Claude makes it on a separate branch, and I review it on a private preview link. Only my approval merges it to the live site.

## This site as the example

- **Plan:** I set the audience, the goals and the content rules, such as no phone number, no home address and no client names.
- **Design:** I chose a design direction from the options Claude drafted, and approved the headline and tone.
- **Build:** Claude wrote the site in Astro and Tailwind CSS, in a GitHub repository I own.
- **Secure:** I required no third-party scripts and a strict content security policy. The security headers are rated A+.
- **Guardrails:** The build refuses to go live while any page still shows placeholder text or an unconfirmed number.
- **Deploy:** Each approved change deploys to Cloudflare Pages, and the domain, DNS and email records stay in my own accounts.

## What a client gets

A fast, secure website they own outright: the code, the hosting account and the domain. They also get a simple way to change it later, by asking for the change in plain English and approving a preview.
