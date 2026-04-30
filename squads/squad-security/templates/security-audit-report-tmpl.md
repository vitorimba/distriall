# Security Audit Report — {{system_name}}

**Report ID:** SA-{{year}}-{{sequence}}
**Date:** {{date}}
**Auditor:** Squad Security
**Classification:** {{classification}} (Confidential / Internal / Public)
**Version:** {{version}}

---

## Executive Summary

**Overall Risk Score:** {{risk_score}}/10 ({{risk_level}})

| Severidade | Count |
|-----------|-------|
| Critical | {{critical_count}} |
| High | {{high_count}} |
| Medium | {{medium_count}} |
| Low | {{low_count}} |
| Informational | {{info_count}} |

**Key Findings:**
1. {{key_finding_1}}
2. {{key_finding_2}}
3. {{key_finding_3}}

**Recommendation:** {{overall_recommendation}}

---

## 1. Scope & Methodology

### 1.1 Scope
- **Target:** {{target}}
- **Type:** {{audit_type}} (Black-box / Grey-box / White-box)
- **Environment:** {{environment}} (Production / Staging / Development)
- **Tech Stack:** {{tech_stack}}
- **Duration:** {{duration}}

### 1.2 Methodology
- OWASP ASVS Level {{asvs_level}}
- OWASP Top 10 (2021)
- OWASP API Security Top 10 (2023)
- STRIDE Threat Modeling
- NIST SP 800-53 Controls

### 1.3 Limitations
{{limitations}}

---

## 2. Threat Model

### 2.1 Data Flow Diagram
{{dfd_description_or_image}}

### 2.2 Trust Boundaries
| ID | Boundary | Description |
|----|----------|-------------|
| TB1 | {{boundary_1}} | {{boundary_1_desc}} |
| TB2 | {{boundary_2}} | {{boundary_2_desc}} |

### 2.3 STRIDE Analysis Summary
| Component | S | T | R | I | D | E | Total Threats |
|-----------|---|---|---|---|---|---|---------------|
| {{component_1}} | {{s}} | {{t}} | {{r}} | {{i}} | {{d}} | {{e}} | {{total}} |

---

## 3. ASVS Verification Results

| Category | Score | Status |
|----------|-------|--------|
| V2 - Authentication | {{v2_score}}% | {{v2_status}} |
| V3 - Session Management | {{v3_score}}% | {{v3_status}} |
| V4 - Access Control | {{v4_score}}% | {{v4_status}} |
| V5 - Input Validation | {{v5_score}}% | {{v5_status}} |
| V6 - Cryptography | {{v6_score}}% | {{v6_status}} |
| V7 - Error Handling | {{v7_score}}% | {{v7_status}} |
| V8 - Data Protection | {{v8_score}}% | {{v8_status}} |
| V9 - Communication | {{v9_score}}% | {{v9_status}} |
| **Overall** | **{{overall_score}}%** | **{{overall_status}}** |

---

## 4. Findings

### 4.1 Critical Findings

#### Finding C-{{id}}: {{finding_title}}
- **Severidade:** Critical (CVSS {{cvss_score}})
- **Categoria:** {{category}} (OWASP Top 10 / API Top 10)
- **Componente:** {{component}}
- **Descricao:** {{description}}
- **Evidencia:** {{evidence}}
- **Impacto:** {{impact}}
- **Remediacao:** {{remediation}}
- **Referencia:** {{reference}} (CWE, CVE)

### 4.2 High Findings
<!-- Repeat finding template -->

### 4.3 Medium Findings
<!-- Repeat finding template -->

### 4.4 Low Findings
<!-- Repeat finding template -->

### 4.5 Informational
<!-- Repeat finding template -->

---

## 5. Compliance Assessment

| Framework | Score | Status |
|-----------|-------|--------|
| LGPD | {{lgpd_score}}% | {{lgpd_status}} |
| NIST SP 800-53 | {{nist_score}}% | {{nist_status}} |
| GDPR | {{gdpr_score}}% | {{gdpr_status}} |

### 5.1 Compliance Gaps
| Gap | Framework | Severidade | Remediacao |
|-----|----------|-----------|-----------|
| {{gap_1}} | {{framework}} | {{severity}} | {{remediation}} |

---

## 6. Remediation Roadmap

### 6.1 Immediate (0-48h)
| # | Finding | Acao | Responsavel | Esforco |
|---|---------|------|-------------|---------|
| 1 | {{finding}} | {{action}} | {{owner}} | {{effort}} |

### 6.2 Short-term (1-2 weeks)
| # | Finding | Acao | Responsavel | Esforco |
|---|---------|------|-------------|---------|
| 1 | {{finding}} | {{action}} | {{owner}} | {{effort}} |

### 6.3 Medium-term (1-3 months)
| # | Finding | Acao | Responsavel | Esforco |
|---|---------|------|-------------|---------|
| 1 | {{finding}} | {{action}} | {{owner}} | {{effort}} |

---

## 7. Risk Matrix

| | Low Impact | Medium Impact | High Impact | Critical Impact |
|---|-----------|--------------|------------|----------------|
| **High Prob.** | Medium | High | Critical | Critical |
| **Medium Prob.** | Low | Medium | High | Critical |
| **Low Prob.** | Info | Low | Medium | High |

---

## 8. Appendices

### A. Tools Used
{{tools_list}}

### B. Test Evidence
{{evidence_references}}

### C. Re-test Recommendations
- Recommended re-test date: {{retest_date}}
- Focus areas: {{focus_areas}}

---

**Prepared by:** Squad Security
**Reviewed by:** {{reviewer}}
**Approved by:** {{approver}}
**Distribution:** {{distribution_list}}
