# Task: Build RAG System with n8n

```yaml
task:
  name: "Build RAG System"
  id: "build-rag-system"
  version: "1.0.0"
  execution_type: "Agent"
  responsible_executor: "cole-medin (via n8n-chief routing)"
  estimated_time: "45-90min"
  elicit: true

input:
  required:
    - name: "knowledge_source"
      description: "Where the knowledge comes from (docs, website, database, files)"
    - name: "query_interface"
      description: "How users will query (chat, API, WhatsApp, email)"
  optional:
    - name: "vector_store"
      description: "Preferred vector store (Qdrant, Supabase, Pinecone, in-memory)"
    - name: "update_frequency"
      description: "How often knowledge base updates"

output:
  - "Ingestion pipeline workflow"
  - "Query pipeline workflow"
  - "Vector store configuration"
  - "Embedding strategy"
  - "System prompts with RAG instructions"

veto_conditions:
  - "No knowledge source defined → STOP"
  - "Knowledge fits in system prompt (< 4000 tokens) → WARN, may not need RAG"
  - "Real-time data needed → WARN, RAG may not be best approach"

acceptance_criteria:
  - "Ingestion pipeline processes all document types"
  - "Chunking strategy defined (size, overlap, metadata)"
  - "Query pipeline returns cited responses"
  - "Fallback for when no relevant docs found"
  - "Update/re-ingestion strategy documented"
```

## Workflow

### Part A: Ingestion Pipeline

**Purpose:** Convert documents into embeddings stored in vector database.

```
Document Source → Document Loader → Text Splitter → Embeddings → Vector Store
     │
     ├── PDF/DOCX → Extract Text
     ├── Web pages → Scrape + Clean
     ├── Google Drive → Download + Parse
     └── Database → Query + Format
```

#### Step 1: Document Loading

| Source | n8n Node | Config |
|--------|----------|--------|
| PDF files | Read Binary File + Extract | Auto-detect encoding |
| Web pages | HTTP Request + HTML Extract | CSS selectors for content |
| Google Drive | Google Drive node | Filter by folder/type |
| Database | Postgres/MySQL query | Incremental by updated_at |
| Notion | Notion API | Export pages as markdown |

#### Step 2: Chunking Strategy

```yaml
chunking:
  method: "recursive_character"
  chunk_size: 800        # tokens (sweet spot for most use cases)
  chunk_overlap: 100     # tokens (ensures context continuity)
  separators: ["\n\n", "\n", ". ", " "]
  metadata_per_chunk:
    - source_document
    - page_number
    - section_title
    - last_updated
```

**Rules:**
- Small chunks (300-500) for precise Q&A
- Large chunks (800-1200) for summarization
- Always include metadata for filtering

#### Step 3: Embedding

```yaml
embedding:
  model: "text-embedding-3-small"  # Cost-effective, good quality
  dimensions: 1536
  batch_size: 100
  cost_per_1k_tokens: "$0.00002"
```

#### Step 4: Vector Store

| Store | Best For | Self-hosted? | Cost |
|-------|----------|-------------|------|
| Qdrant | Production, large scale | Yes | Free (self-hosted) |
| Supabase pgvector | Already using Supabase | Managed | $ |
| Pinecone | Managed, zero-ops | No | $$ |
| In-memory | Development/testing | N/A | Free |

### Part B: Query Pipeline

**Purpose:** Retrieve relevant context and generate cited responses.

```
User Query → AI Agent
                │
                ├── Tool: Vector Store Retriever
                │   └── top_k: 5, similarity_threshold: 0.7
                ├── Tool: Web Search (fallback)
                │   └── When vector store returns no results
                └── Memory: Postgres Chat Memory
                    └── session_key: user_id, window: 20

             → Generate Response with Citations
```

#### AI Agent Configuration

```yaml
agent:
  model: "gpt-4o"  # Needs reasoning for tool selection
  temperature: 0.2  # Low for accuracy
  system_prompt: |
    You are a helpful assistant with access to a knowledge base.

    RULES:
    1. ALWAYS use the retrieval tool before answering domain questions
    2. Base your answers ONLY on retrieved documents
    3. If the retrieved documents don't contain the answer, say:
       "I don't have that information in my knowledge base."
    4. ALWAYS cite your sources: [Source: document_name, page X]
    5. If the user asks about something outside your domain, politely redirect
    6. Keep answers concise but complete
    7. Use the user's language (match their language automatically)

  tools:
    - name: "Knowledge Base Search"
      type: "vectorStoreRetriever"
      config:
        top_k: 5
        similarity_threshold: 0.7
        metadata_filter: {}  # Can filter by source, date, etc.

    - name: "Web Search"
      type: "httpRequest"
      config:
        description: "Use ONLY when knowledge base has no relevant results"
        endpoint: "{search_api_endpoint}"

  memory:
    type: "postgres"
    session_key: "{{ $json.user_id || $json.session_id }}"
    window_size: 20
    table: "n8n_chat_histories"
```

### Part C: Maintenance

1. **Re-ingestion schedule:** Weekly cron workflow to re-process updated docs
2. **Monitoring:** Log retrieval scores, track "no results" rate
3. **Quality:** Sample 10 conversations/week for accuracy review
4. **Cleanup:** Remove outdated embeddings when source docs are deleted

## Outputs

- **ingestion-pipeline-workflow** — Pipeline de ingestao e chunking de documentos
- **query-pipeline-workflow** — Pipeline de consulta com respostas citadas
- **vector-store-configuration** — Configuracao do store e embedding strategy
