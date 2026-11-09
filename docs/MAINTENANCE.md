# Maintenance and account security

## 1. Everyday editing

1. Open the project in VS Code.
2. Make a branch: click the branch name at the bottom-left and choose **Create new branch** (for example `add-firewall-case`).
3. Edit or add content. Templates are in `templates/`, and the steps are in `README.md`.
4. Run `npm run dev` and check the page at http://localhost:4321.
5. Run `npm run build`. Fix anything it reports.
6. Commit, push, and open a pull request on GitHub. Cloudflare posts a preview link on the pull request.
7. When the **Build check** is green and the preview looks right, merge. The live site updates in about a minute.

## 2. Updates and dependencies

- **Dependabot** opens pull requests for updates every week, and grouped minor updates arrive as one pull request.
- For each one: wait for **Build check** to pass, open the Cloudflare preview link, click through Home, About, and Case Studies, then merge.
- **Major version updates** (for example Astro 7 to 8) can change how things work. Read the release notes link in the pull request before merging. Ask Claude if you're unsure.
- Once a month, run `npm audit` locally. "found 0 vulnerabilities" is the goal.
- Never run `npm install some-package` because a website or tutorial says so without checking: every package can run code on your computer. Each dependency in this project has a reason in `README.md`.
- Always commit `package-lock.json`, and use `npm ci` (not `npm install`) to install.

## 3. Account security checklist

Do these once, then review every 6 months.

**GitHub**
- [ ] Turn on two-factor authentication: **Settings > Password and authentication**.
- [ ] Add a passkey or a hardware key (YubiKey or similar) on the same page. Save your recovery codes in your password manager.
- [ ] Protect the `main` branch (see `DEPLOY.md`, Part 2).
- [ ] Under the repository **Settings > Code security**, turn on **Dependabot alerts**, **Dependabot security updates**, and **Secret scanning** with **Push protection**.
- [ ] Review **Settings > Applications** and remove apps you don't use. Cloudflare Pages should have access to this one repository only.

**Cloudflare**
- [ ] Turn on two-factor authentication, preferably with a passkey or hardware key.
- [ ] Don't create API tokens unless you need one. Delete any you aren't using.

**Domain registrar (Namecheap)**
- [ ] Turn on two-factor authentication: **Profile > Security > 2-Factor Authentication**. Pick an authenticator app or a hardware key, not SMS.
- [ ] Turn on **Domain Lock** (the registrar lock): **Domain List > Manage > Domain** tab.
- [ ] Turn on **Auto-Renew** on the same tab, and make sure the card on file is current.
- [ ] Keep **Domain Privacy** (WHOIS privacy) on, so your home address isn't public. It's free at Namecheap.

**Email (Microsoft 365)**
- [ ] Check SPF, DKIM, and DMARC. Run these in Terminal:
  ```
  dig +short ricardogowdie.com TXT | grep spf
  dig +short selector1._domainkey.ricardogowdie.com CNAME
  dig +short _dmarc.ricardogowdie.com TXT
  ```
  Good looks like this:
  - **SPF:** `"v=spf1 include:spf.protection.outlook.com -all"`. There should be only one SPF record.
  - **DKIM:** both `selector1` and `selector2` return an address ending in `onmicrosoft.com`. If they're empty, turn on DKIM in the Microsoft Defender portal (**Email & collaboration > Policies > Email authentication settings > DKIM**).
  - **DMARC:** a record starting `v=DMARC1`. Start with `p=none` plus a reporting address, then move to `p=quarantine` and then `p=reject` once reports look clean for a few weeks.
- [ ] Turn on MFA for your Microsoft 365 admin and mailbox account.

**Your computer**
- [ ] Keep macOS and VS Code updated.
- [ ] Never save passwords, API keys, or tokens in this project. `.gitignore` blocks `.env` files, but it's safest not to create them at all.

## 4. Yearly tasks

- [ ] Renew `public/.well-known/security.txt`: change the `Expires` date to a year ahead.
- [ ] Check that every link on the site still works (booking link, LinkedIn, email).
- [ ] Re-run https://securityheaders.com and https://pagespeed.web.dev.
- [ ] Update the copyright and the content in `src/content/site.json` (years of experience, certifications).

## 5. If something breaks

1. **The build fails on Cloudflare or GitHub:** open the failed run and read the first red error. It usually names a file and a field. Run `npm run build` locally to see the same message.
2. **The live site looks wrong after a merge:** in Cloudflare, go to **Workers & Pages > your project > Deployments**, find the last good one, and click **Rollback**. Then fix the problem in a new pull request.
3. **Email stops working after a DNS change:** compare Cloudflare's DNS records with the list you saved in `DEPLOY.md`, Part 5, step 1, and restore whatever is missing.
