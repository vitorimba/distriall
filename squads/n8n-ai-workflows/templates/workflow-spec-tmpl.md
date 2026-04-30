# Template: General Workflow Specification

## Workflow: {{workflow_name}}

**Purpose:** {{purpose}}
**Trigger:** {{trigger_type}}
**Created:** {{date}}

---

## Flow Diagram

```
{{ascii_flow_diagram}}
```

---

## Nodes Specification

| # | Node Name | Type | Purpose | Config |
|---|-----------|------|---------|--------|
| 1 | {{name}} | {{type}} | {{purpose}} | {{key_config}} |

---

## Connections

| From → To | Condition | Data |
|-----------|-----------|------|
| {{from}} → {{to}} | {{condition}} | {{data}} |

---

## Error Handling

| Node | On Error | Retry | Fallback |
|------|----------|-------|----------|
| {{node}} | {{action}} | {{count}} | {{fallback}} |

---

## Credentials Required

| Service | Credential Type | Setup Guide |
|---------|----------------|-------------|
| {{service}} | {{type}} | {{guide_link}} |

---

## Deployment Checklist

- [ ] All credentials configured in n8n
- [ ] Webhook URL registered in external service
- [ ] Error notification channel configured
- [ ] Test execution successful
- [ ] Monitoring/logging active
- [ ] Documentation updated
