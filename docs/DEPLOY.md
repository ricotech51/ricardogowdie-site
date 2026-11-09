# Deploy guide: GitHub + Cloudflare Pages

Why Cloudflare Pages: it's free, fast worldwide, builds the site on every push, and it reads `public/_headers`, so your security headers work. GitHub Pages can't send custom security headers.

Total time: about 1 hour, plus up to 24 hours for DNS to settle.

---

## Part 1. Put the project on GitHub (about 10 minutes)

1. Sign in at https://github.com as `ricotech51`. Turn on two-factor authentication first if it isn't on (see `MAINTENANCE.md`, section 3).
2. Click **New repository**.
   - Name: `ricardogowdie-site`
   - Visibility: **Private** (Cloudflare can still build it).
   - Leave "Add a README", ".gitignore", and "license" **unchecked**. The project already has them.
3. Click **Create repository**, then tell Claude the repository exists. Claude will push the full project, including the `.github` folder that couldn't be copied to your Mac.
4. On your Mac, open VS Code, press Cmd+Shift+P, choose **Git: Clone**, and pick the new repository. Use this clone from now on instead of `~/Projects/ricardogowdie/site`.
5. In the clone, run `npm ci`, then `npm run dev` to confirm it works.

## Part 2. Protect the main branch (about 5 minutes)

1. In the repository, go to **Settings > Branches > Add branch ruleset** (or **Add rule**).
2. Target branch: `main`.
3. Turn on:
   - **Require a pull request before merging** (you can approve your own while you're the only person).
   - **Require status checks to pass**, and pick **Build check**.
   - **Block force pushes**.
   - **Restrict deletions**.
4. Save.

## Part 3. Connect Cloudflare Pages (about 15 minutes)

1. Create a free account at https://dash.cloudflare.com and turn on two-factor authentication right away (**My Profile > Authentication**).
2. Go to **Workers & Pages > Create > Pages > Connect to Git**.
3. Authorize the **Cloudflare Pages** GitHub app for **only** the `ricardogowdie-site` repository (choose "Only select repositories").
4. Build settings:
   - Framework preset: **Astro**
   - Build command: `npm run build`
   - Build output directory: `dist`
   - Environment variable: `NODE_VERSION` = `22`
5. Click **Save and Deploy**. When it finishes you get a test address like `ricardogowdie-site.pages.dev`. Open it and click through every page.

Note: Cloudflare sometimes steers new projects toward "Workers" instead of "Pages". Either works, and both read the `_headers` file. If the screens look different from these steps, tell Claude what you see.

## Part 4. Check the headers on the test address (about 5 minutes)

1. Go to https://securityheaders.com and enter your `pages.dev` address. You should get an **A** or **A+**.
2. Open the site in Chrome, press Cmd+Option+J, and check the Console. It should show no red errors.

## Part 5. Move your domain (about 20 minutes, then waiting)

Your Microsoft 365 email uses this domain, so **email records must come across exactly**. Do this part when you have time to check it.

1. **Before you change anything**, record your current DNS. In Terminal on your Mac, run:
   ```
   for t in A AAAA CNAME MX TXT CAA NS; do echo "== $t"; dig +short ricardogowdie.com $t; done
   dig +short www.ricardogowdie.com CNAME
   dig +short autodiscover.ricardogowdie.com CNAME
   dig +short selector1._domainkey.ricardogowdie.com CNAME
   dig +short selector2._domainkey.ricardogowdie.com CNAME
   dig +short _dmarc.ricardogowdie.com TXT
   ```
   Save the output in a note. Send it to Claude if you'd like a check.
   - If the `NS` lines end in your web host's name (hosting.com), your DNS records live in its cPanel under **Zone Editor**. Take a screenshot of that page too, because it's the most complete list.
2. In Cloudflare, click **Add a domain**, enter `ricardogowdie.com`, and pick the **Free** plan. Cloudflare scans your existing records.
3. **Compare Cloudflare's list with your note from step 1.** The MX, SPF (TXT starting `v=spf1`), DKIM (`selector1`/`selector2`), DMARC, and `autodiscover` records must all be there. Add any that are missing. Set mail-related records to **DNS only** (grey cloud).
4. Switch nameservers at **Namecheap**:
   1. Sign in at https://www.namecheap.com and open **Domain List**, then click **Manage** next to `ricardogowdie.com`.
   2. If **DNSSEC** is turned on (in the **Advanced DNS** tab), turn it off first. Old DNSSEC settings would make the domain fail to load after the switch. You'll turn DNSSEC back on in Cloudflare in step 9.
   3. On the **Domain** tab, find **Nameservers**, choose **Custom DNS**, and enter the two nameservers Cloudflare gave you. Click the green check mark to save.
   4. Cloudflare emails you when the domain is active (usually within an hour, sometimes up to 24).
5. In your Pages project, go to **Custom domains** and add `ricardogowdie.com`, then `www.ricardogowdie.com`. Cloudflare creates the records and the HTTPS certificate.
6. Redirect `www` to the main address: **Rules > Redirect Rules > Create rule**, "Redirect from WWW to root" template.
7. Under **SSL/TLS**, set mode to **Full (strict)**, and under **SSL/TLS > Edge Certificates** turn on **Always Use HTTPS**.
8. Send yourself an email to `hello@ricardogowdie.com` and reply from it to confirm email still works both ways.
9. Turn DNSSEC back on through Cloudflare: **DNS > Settings > Enable DNSSEC**. Cloudflare shows a DS record. In Namecheap, go to **Advanced DNS > DNSSEC**, add that record, and save.

## Part 6. Final checks after go-live

1. https://ricardogowdie.com loads the new site, and https://www.ricardogowdie.com redirects to it.
2. https://securityheaders.com shows **A** or **A+** for the real domain.
3. https://pagespeed.web.dev scores 95+ on mobile.
4. Share the link in a LinkedIn draft (don't post) to check the preview image appears.
5. In **Google Search Console** (https://search.google.com/search-console), add the domain and submit `https://ricardogowdie.com/sitemap-index.xml`.
6. Remove the old resume PDF from hosting.com today, even before the move, because it has your phone number and address: in cPanel, open **File Manager > public_html** and delete `Ricardo_J_Gowdie_Resume.pdf`.
7. Keep the hosting.com plan for **2 weeks** after go-live in case you need to roll back. Then download a backup from cPanel and cancel the plan. Before you cancel, confirm nothing else (such as email) runs through it.
