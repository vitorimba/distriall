# Incident Report — {{incident_id}}

**Severity:** {{severity}} (P1 Critical / P2 High / P3 Medium / P4 Low)
**Type:** {{incident_type}}
**Status:** {{status}} (Active / Contained / Resolved / Closed)
**Date Detected:** {{detection_date}}
**Date Resolved:** {{resolution_date}}
**MTTD:** {{mttd}} (Mean Time to Detect)
**MTTR:** {{mttr}} (Mean Time to Respond)

---

## 1. Executive Summary

{{executive_summary}}

### Impact Summary
- **Systems Affected:** {{affected_systems}}
- **Users Affected:** {{affected_users_count}}
- **Data Compromised:** {{data_compromised}} (Yes/No — Type and volume)
- **Service Disruption:** {{service_disruption}} (Duration)
- **Financial Impact:** {{financial_impact}} (Estimated)

---

## 2. Incident Classification

| Attribute | Value |
|-----------|-------|
| Type | {{type}} (Malware / Breach / DDoS / Insider / Ransomware / Phishing) |
| Severity | {{severity}} |
| Attack Vector | {{attack_vector}} |
| MITRE ATT&CK Tactic | {{mitre_tactic}} |
| MITRE ATT&CK Technique | {{mitre_technique}} |
| Threat Actor | {{threat_actor}} (if identified) |

---

## 3. Timeline of Events

| Date/Time | Event | Source | Action Taken |
|-----------|-------|--------|-------------|
| {{datetime_1}} | {{event_1}} | {{source_1}} | {{action_1}} |
| {{datetime_2}} | {{event_2}} | {{source_2}} | {{action_2}} |
| {{datetime_3}} | {{event_3}} | {{source_3}} | {{action_3}} |

---

## 4. Detection

- **Detection Method:** {{detection_method}} (Monitoring / User report / Third-party / Audit)
- **Detection Tool:** {{detection_tool}}
- **Alert ID:** {{alert_id}}
- **First Indicator:** {{first_indicator}}

---

## 5. Indicators of Compromise (IOCs)

### Network IOCs
| Type | Value | Context |
|------|-------|---------|
| IP | {{ip}} | {{context}} |
| Domain | {{domain}} | {{context}} |
| URL | {{url}} | {{context}} |

### Host IOCs
| Type | Value | Context |
|------|-------|---------|
| File Hash (SHA256) | {{hash}} | {{context}} |
| File Path | {{path}} | {{context}} |
| Registry Key | {{reg_key}} | {{context}} |

### MITRE ATT&CK Mapping
| Tactic | Technique | ID | Evidence |
|--------|-----------|-----|----------|
| {{tactic}} | {{technique}} | {{att_ck_id}} | {{evidence}} |

---

## 6. Containment Actions

### Short-term Containment
- [ ] {{containment_action_1}}
- [ ] {{containment_action_2}}
- [ ] {{containment_action_3}}

### Long-term Containment
- [ ] {{long_term_action_1}}
- [ ] {{long_term_action_2}}

### Evidence Preserved
| Evidence | Method | Location | Custodian |
|----------|--------|----------|-----------|
| {{evidence_1}} | {{method}} | {{location}} | {{custodian}} |

---

## 7. Root Cause Analysis

### Root Cause
{{root_cause_description}}

### Contributing Factors
1. {{contributing_factor_1}}
2. {{contributing_factor_2}}

### Vulnerability Exploited
- **CVE:** {{cve_id}} (if applicable)
- **CWE:** {{cwe_id}}
- **Description:** {{vuln_description}}

---

## 8. Eradication & Recovery

### Eradication Steps
1. {{eradication_step_1}}
2. {{eradication_step_2}}
3. {{eradication_step_3}}

### Recovery Steps
1. {{recovery_step_1}}
2. {{recovery_step_2}}
3. {{recovery_step_3}}

### Validation
- [ ] IOCs no longer detected
- [ ] Systems scanned clean
- [ ] Persistence mechanisms removed
- [ ] 72h monitoring without re-infection

---

## 9. Regulatory Notifications

| Entity | Required? | Deadline | Status | Date Notified |
|--------|-----------|----------|--------|---------------|
| ANPD (LGPD Art. 48) | {{required}} | 72 hours | {{status}} | {{date}} |
| Data Subjects | {{required}} | Reasonable time | {{status}} | {{date}} |
| Law Enforcement | {{required}} | N/A | {{status}} | {{date}} |
| Cyber Insurance | {{required}} | Per policy | {{status}} | {{date}} |

---

## 10. Lessons Learned

### What Worked Well
1. {{worked_well_1}}
2. {{worked_well_2}}

### What Needs Improvement
1. {{needs_improvement_1}}
2. {{needs_improvement_2}}

### Action Items
| # | Action | Owner | Deadline | Status |
|---|--------|-------|----------|--------|
| 1 | {{action_1}} | {{owner}} | {{deadline}} | {{status}} |
| 2 | {{action_2}} | {{owner}} | {{deadline}} | {{status}} |

---

## 11. Metrics

| Metric | Value | Target | Status |
|--------|-------|--------|--------|
| MTTD (Mean Time to Detect) | {{mttd}} | < 1h (P1) | {{status}} |
| MTTR (Mean Time to Respond) | {{mttr}} | < 4h (P1) | {{status}} |
| MTTC (Mean Time to Contain) | {{mttc}} | < 1h (P1) | {{status}} |
| MTTE (Mean Time to Eradicate) | {{mtte}} | < 24h (P1) | {{status}} |

---

## 12. Follow-up Schedule

| Review | Date | Responsible | Status |
|--------|------|-------------|--------|
| 30-day review | {{date_30}} | {{responsible}} | [ ] Pending |
| 60-day review | {{date_60}} | {{responsible}} | [ ] Pending |
| 90-day review | {{date_90}} | {{responsible}} | [ ] Pending |

---

**Incident Commander:** {{incident_commander}}
**Report Author:** {{author}}
**Reviewed by:** {{reviewer}}
**Classification:** Confidential
