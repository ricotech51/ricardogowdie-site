---
title: Building a practical Microsoft 365 security & data privacy baseline
date: 2025-12-13
description: A real-world approach to securing Microsoft 365, improving email deliverability, and building a privacy program that aligns with ISO 27001, NIST CSF, and Jamaica's Data Protection Act, especially for healthcare and SMB teams.
draft: false
---

If you're securing a Microsoft 365 tenant, your baseline should do one thing well: make the secure choice the default for sign-ins, admin access, email, data sharing, and monitoring. Here's a concise, practical baseline you can implement in phases without breaking the business.

## 1. Identity is the front door

**Require MFA for everyone**

- Enforce MFA tenant-wide using Conditional Access (start with a pilot, then expand).
- Use stronger methods for admins (Authenticator with number matching, or phishing-resistant options where possible).

**Block legacy authentication**

- Disable legacy protocols that bypass modern controls (POP, IMAP, and SMTP AUTH unless explicitly needed).

**Apply a Conditional Access "minimum set"**

- Require MFA for all users.
- Require compliant or managed devices for high-risk apps (or at least for admins).
- Block access from risky sign-ins (if available) and enforce session controls for browser access.

## 2. Secure admin access like it's a production system (because it is)

**Least privilege**

- Reduce Global Admins to as few as possible.
- Assign role-based admin roles (Exchange Admin, SharePoint Admin, and so on).

**Separate admin accounts**

- Admins should have a dedicated admin account, not the one they use for daily email and browsing.

**Just-in-time elevation**

- Use PIM (if available) so privileged roles are time-bound and approved.

## 3. Lock down email (still the #1 entry point)

**Baseline mail protection**

- Anti-phishing protections (impersonation and spoof settings if available).
- Safe Links and Safe Attachments (if available).
- Block or control auto-forwarding to external domains.

**Domain protection**

- Configure SPF, DKIM, and DMARC to reduce spoofing and improve deliverability.

## 4. Protect endpoints (because tokens live on devices)

**Standardize device posture**

- Require OS updates, disk encryption, screen lock, and endpoint protection.
- Enroll devices in Intune where possible (or at least enforce minimum security requirements).

**Defender baseline (if available)**

- Enable endpoint detection and response and basic attack surface reduction.

## 5. Reduce oversharing in SharePoint, OneDrive, and Teams

**Control external sharing**

- Default to "new and existing guests" (avoid anonymous links where possible).
- Limit sharing to approved domains if you can.
- Require sign-in for shared content.

**Protect high-value sites**

- Tighter permissions on Finance, HR, and Executive content.
- Separate "public collaboration" sites from sensitive internal sites.

## 6. Turn on visibility and alerting

**Baseline monitoring**

- Make sure audit logging is enabled and retained appropriately.
- Alert on admin role changes, suspicious sign-ins, mail forwarding rule creation, mass downloads or unusual sharing, and new OAuth app consent or risky app permissions.

**Track posture**

- Use Microsoft Secure Score as your monthly security health check.
- Fix the biggest-impact items first (identity and email usually top the list).

## A simple rollout plan

**Week 1:** MFA and blocking legacy auth, plus admin cleanup (reduce Global Admins, separate admin accounts).

**Week 2:** Email hardening (anti-phishing, Safe Links and Safe Attachments if available, block auto-forwarding) and external sharing defaults.

**Weeks 3 to 4:** Device compliance baseline, plus alerts, auditing, and a recurring review cadence.

## What "good" looks like

Your baseline is working when:

- Compromised passwords don't equal compromised accounts (MFA and Conditional Access).
- Admin actions are controlled and visible.
- Email spoofing and phishing are reduced.
- Sharing is intentional, not accidental.
- You can detect and respond quickly when something changes.
