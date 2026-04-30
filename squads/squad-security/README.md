# Squad Security

**Version:** 1.0.0
**Domain:** Cybersecurity
**Entry Agent:** `security-chief`
**Slash Prefix:** `/squad-security:{agent}`

## Overview

Comprehensive security squad covering AppSec, Penetration Testing, Compliance, Incident Response, Zero Trust, API Security, Container Security, and Privacy. Built for developers, vibe coders, CTOs, and security teams building or maintaining digital products.

## Agents

### Orchestrator
| Agent | Role |
|-------|------|
| **security-chief** | Squad orchestrator — routes requests, coordinates specialists |

### Tier 0 — Diagnosis
| Agent | Role |
|-------|------|
| **adam-shostack** | Threat Modeling (STRIDE, 4 Questions Framework) |
| **andrew-van-der-stock** | Security Verification (OWASP ASVS, Top 10) |

### Tier 1 — Core
| Agent | Role |
|-------|------|
| **jim-manico** | Secure Coding (OWASP Proactive Controls, Cheat Sheets) |
| **dafydd-stuttard** | Web App Pen Testing (Burp Suite methodology) |
| **blake-strom** | Threat Detection & Intelligence (MITRE ATT&CK) |
| **corey-ball** | API Security (Hacking APIs methodology) |
| **ron-ross** | Compliance & Governance (NIST RMF, SP 800-53) |

### Tier 2 — Specialists
| Agent | Role |
|-------|------|
| **ed-skoudis** | Network/Infrastructure Pen Testing (SANS) |
| **robert-m-lee** | Incident Response & DFIR |
| **jason-haddix** | Bug Bounty & Offensive Recon (TBHM) |
| **liz-rice** | Container & Cloud-Native Security |
| **john-kindervag** | Zero Trust Architecture |
| **ann-cavoukian** | Privacy by Design (LGPD/GDPR) |

## Tasks

| Task | Description |
|------|-------------|
| security-audit | Full security audit with ASVS scoring |
| threat-modeling | STRIDE-based threat modeling |
| pentest-execution | Web/network penetration testing |
| api-security-test | API security testing (OWASP API Top 10) |
| compliance-check | LGPD/GDPR/NIST compliance assessment |
| container-security-audit | Container and Kubernetes security audit |
| incident-response | Incident response and DFIR |
| secure-my-app | Quick security hardening for vibe coders |
| zero-trust-assessment | Zero Trust maturity assessment |
| privacy-impact-assessment | Privacy Impact Assessment (PIA/DPIA) |

## Workflows

| Workflow | Description |
|----------|-------------|
| wf-full-security-audit | End-to-end security audit pipeline |
| wf-incident-response | Incident response lifecycle |
| wf-vibe-coder-security | Quick security for vibe-coded apps |

## Quick Start

```
/squad-security:security-chief    # Start here — the chief routes you
/squad-security:adam-shostack      # Direct: threat modeling
/squad-security:jim-manico         # Direct: secure coding guidance
```
