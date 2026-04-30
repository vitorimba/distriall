<!-- SINKRA_TASK_METADATA:START -->
```yaml
sinkra_task_metadata:
  task_id: create-content
  task_name: Create OPES Branded Content
  status: active
  responsible_executor: '@marketing-cmo'
  execution_type: Worker
  estimated_time: 30m
  domain: Tactical
  output_persistence: transient_output
  accountable_id: Human:Squad_Operator
  accountability_scope: review_only
```
<!-- SINKRA_TASK_METADATA:END -->

<!-- SINKRA_CONTRACT:START -->
```yaml
sinkra_contract:
  Domain: Tactical
  atomic_layer: Atom
  executor: Worker
  pre_condition: "inputs e dependencias resolvidos antes de iniciar."
  post_condition: "output principal gerado e pronto para handoff."
  performance: "executar dentro do SLA, registrar erro e escalar sem falha silenciosa."
```
<!-- SINKRA_CONTRACT:END -->

---
task-id: create-content
name: Create OPES Branded Content
agent: carousel-designer
version: 1.0.0
purpose: Create branded social media content for OPES across multiple platforms

workflow-mode: interactive
elicit: true
elicitation-type: custom

prerequisites:
  - Content brief or topic defined
  - OPES brand guidelines available

inputs:
  - name: content_type
    type: enum
    description: Type of content to create
    required: true
    options: ["post", "story", "reel-script", "thread", "newsletter"]
  - name: topic
    type: string
    description: Topic or theme for the content
    required: true
  - name: platform
    type: enum
    description: Target platform
    required: false
    options: ["instagram", "linkedin", "twitter", "email"]
    default: "instagram"

outputs:
  - path: "outputs/marketing-opes/content/{date}-{type}-{topic-slug}.md"
    description: Formatted content ready for publishing
    format: "markdown"

validation:
  success-criteria:
    - "Content follows OPES brand voice and guidelines"
    - "Format appropriate for target platform"
    - "CTA included"
    - "Visual direction provided (if applicable)"
---

# Task: Create OPES Branded Content

## Purpose

Create branded social media content for OPES. Supports multiple formats (posts, stories, reel scripts, threads, newsletters) across different platforms.

## Steps

### Step 1: Content Brief
Elicit from user:
1. Content type (post, story, reel, thread, newsletter)
2. Platform (Instagram, LinkedIn, Twitter, email)
3. Topic/theme
4. Target audience
5. Key message

### Step 2: Generate Content
Based on content type and platform:
- **Post:** Copy + visual direction + hashtags
- **Story:** Sequence of frames with CTAs
- **Reel Script:** Hook → value → CTA with timing notes
- **Thread:** Multi-tweet sequence with engagement hooks
- **Newsletter:** Subject line, preview text, body sections

### Step 3: Apply OPES Branding
Ensure all content follows:
- OPES tone of voice
- Brand color references
- Logo placement guidelines
- Approved hashtags and mentions

### Step 4: Review
Present formatted content for user approval.

## Success Criteria
- [ ] Content created in correct format
- [ ] OPES branding applied
- [ ] Platform-specific optimization done
- [ ] User approved final version
