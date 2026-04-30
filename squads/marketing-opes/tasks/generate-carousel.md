<!-- SINKRA_TASK_METADATA:START -->
```yaml
sinkra_task_metadata:
  task_id: generate-carousel
  task_name: Generate Instagram Carousel
  status: active
  responsible_executor: '@carousel-designer'
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
task-id: generate-carousel
name: Generate Instagram Carousel
agent: carousel-designer
version: 1.0.0
purpose: Generate a complete Instagram carousel with OPES branding, including slide content and captions

workflow-mode: interactive
elicit: true
elicitation-type: custom

prerequisites:
  - Topic or theme for the carousel defined
  - OPES brand guidelines available

inputs:
  - name: topic
    type: string
    description: Main topic or theme for the carousel
    required: true
  - name: slides_count
    type: integer
    description: Number of slides (typically 5-10)
    required: false
    default: 7
  - name: style
    type: enum
    description: Carousel style
    required: false
    options: ["educational", "storytelling", "tips", "before-after", "listicle"]
    default: "educational"
  - name: cta
    type: string
    description: Call to action for the last slide
    required: false

outputs:
  - path: "outputs/marketing-opes/carousels/{date}-{topic-slug}.md"
    description: Complete carousel content with slide-by-slide breakdown
    format: "markdown"

validation:
  success-criteria:
    - "All slides have headline, body text, and visual direction"
    - "Content follows OPES brand voice"
    - "CTA slide included"
    - "Caption with hashtags generated"
---

# Task: Generate Instagram Carousel

## Purpose

Generate a complete Instagram carousel with OPES branding. Produces slide-by-slide content with headlines, body text, visual direction, and a caption with hashtags.

## Steps

### Step 1: Define Carousel Strategy
Elicit from user:
1. Main topic/theme
2. Target audience segment
3. Key message or takeaway
4. Number of slides (5-10)
5. Style (educational, storytelling, tips, etc.)

### Step 2: Create Slide Sequence
For each slide, generate:
- **Headline:** Bold, attention-grabbing (max 6 words)
- **Body text:** Supporting detail (max 30 words)
- **Visual direction:** Design notes for the slide
- **OPES branding elements:** Color scheme, logo placement

### Step 3: Write Caption
Generate Instagram caption with:
- Hook (first line)
- Value expansion
- Call to action
- 15-20 relevant hashtags

### Step 4: Review and Refine
Present complete carousel for user review and iterate on feedback.

## Success Criteria
- [ ] All slides created with OPES branding
- [ ] Caption generated with hashtags
- [ ] Content reviewed and approved
