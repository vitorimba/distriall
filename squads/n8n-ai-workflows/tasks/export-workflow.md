# Task: Export Workflow as n8n JSON

```yaml
task:
  name: "Export Workflow JSON"
  id: "export-workflow"
  version: "1.0.0"
  execution_type: "Agent"
  responsible_executor: "n8n-chief"
  estimated_time: "10-20min"

input:
  required:
    - name: "workflow_spec"
      description: "The workflow specification (from *design-workflow or *build-agent output)"
  optional:
    - name: "n8n_version"
      description: "Target n8n version (default: latest)"

output:
  - "n8n-compatible JSON workflow file"
  - "Import instructions"
  - "Credential setup guide"

acceptance_criteria:
  - "Valid n8n JSON format"
  - "All nodes have correct type identifiers"
  - "Connections between nodes are properly mapped"
  - "Credential placeholders documented"
```

## n8n Workflow JSON Structure

Every n8n workflow JSON follows this structure:

```json
{
  "name": "Workflow Name",
  "nodes": [
    {
      "parameters": {},
      "id": "unique-uuid",
      "name": "Node Name",
      "type": "n8n-nodes-base.nodeType",
      "typeVersion": 1,
      "position": [x, y]
    }
  ],
  "connections": {
    "Node Name": {
      "main": [
        [
          {
            "node": "Next Node Name",
            "type": "main",
            "index": 0
          }
        ]
      ]
    }
  },
  "settings": {
    "executionOrder": "v1"
  }
}
```

## Common Node Types

| Node | Type ID |
|------|---------|
| Webhook | n8n-nodes-base.webhook |
| Chat Trigger | @n8n/n8n-nodes-langchain.chatTrigger |
| AI Agent | @n8n/n8n-nodes-langchain.agent |
| OpenAI Chat Model | @n8n/n8n-nodes-langchain.lmChatOpenAi |
| Memory Buffer | @n8n/n8n-nodes-langchain.memoryBufferWindow |
| Postgres Memory | @n8n/n8n-nodes-langchain.memoryPostgresChat |
| Vector Store Retriever | @n8n/n8n-nodes-langchain.retrieverVectorStore |
| Qdrant Vector Store | @n8n/n8n-nodes-langchain.vectorStoreQdrant |
| HTTP Request | n8n-nodes-base.httpRequest |
| Code | n8n-nodes-base.code |
| Switch | n8n-nodes-base.switch |
| IF | n8n-nodes-base.if |
| Set | n8n-nodes-base.set |
| Merge | n8n-nodes-base.merge |
| Slack | n8n-nodes-base.slack |
| Google Sheets | n8n-nodes-base.googleSheets |
| Postgres | n8n-nodes-base.postgres |

## Export Process

1. Take the workflow specification
2. Map each described node to n8n node types
3. Generate unique IDs for each node
4. Calculate node positions (grid layout)
5. Map connections between nodes
6. Add credential placeholders
7. Validate JSON structure
8. Output with import instructions

## Outputs

- **n8n-compatible-json** — Workflow pronto para importar no n8n
- **credential-setup-guide** — Documentacao de placeholders e credenciais necessarias
- **import-instructions** — Passo a passo para importar e ativar o workflow
