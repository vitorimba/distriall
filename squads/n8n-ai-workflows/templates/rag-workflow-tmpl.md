# Template: RAG System Specification

## RAG System: {{system_name}}

**Knowledge Domain:** {{domain}}
**Vector Store:** {{vector_store}}
**Query Interface:** {{interface}}
**Created:** {{date}}

---

## Part A: Ingestion Pipeline

### Architecture
```
{{ingestion_diagram}}
```

### Document Sources
| Source | Type | Volume | Update Frequency |
|--------|------|--------|-----------------|
| {{source}} | {{type}} | {{volume}} | {{frequency}} |

### Chunking Config
```yaml
chunk_size: {{chunk_size}}
chunk_overlap: {{overlap}}
separators: {{separators}}
metadata:
  {{metadata_fields}}
```

### Embedding Config
```yaml
model: "{{embedding_model}}"
dimensions: {{dimensions}}
batch_size: {{batch_size}}
```

### Vector Store Config
```yaml
provider: "{{provider}}"
collection: "{{collection_name}}"
distance_metric: "cosine"
index_type: "hnsw"
```

---

## Part B: Query Pipeline

### Architecture
```
{{query_diagram}}
```

### AI Agent Config
```yaml
model: "{{model}}"
temperature: {{temperature}}
system_prompt: |
  {{system_prompt}}
retrieval:
  top_k: {{top_k}}
  similarity_threshold: {{threshold}}
  reranking: {{reranking_enabled}}
memory:
  type: "{{memory_type}}"
  window: {{window_size}}
```

### Fallback Strategy
| Condition | Action |
|-----------|--------|
| No relevant docs (score < {{threshold}}) | {{action}} |
| User asks out-of-domain | {{action}} |
| API error | {{action}} |

---

## Part C: Maintenance

- **Re-ingestion:** {{schedule}}
- **Monitoring:** {{metrics}}
- **Quality review:** {{review_schedule}}
- **Cleanup:** {{cleanup_strategy}}

---

## Cost Estimate

| Component | Per Query | Monthly ({{volume}}/day) |
|-----------|-----------|--------------------------|
| Embedding lookup | ${{cost}} | ${{monthly}} |
| AI generation | ${{cost}} | ${{monthly}} |
| Vector store | ${{cost}} | ${{monthly}} |
| **Total** | **${{total}}** | **${{monthly_total}}** |
