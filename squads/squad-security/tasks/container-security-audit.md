---
name: Container & Kubernetes Security Audit
description: 5-layer container security audit covering images, runtime, orchestration, host, and network
executor: security-chief → rice → kindervag
elicit: true
mode: interactive
---

# Task: Container & Kubernetes Security Audit

## Purpose

Auditar a seguranca de ambientes containerizados (Docker, Kubernetes, ECS, etc.) usando o modelo de 5 camadas de Liz Rice. Identifica vulnerabilidades em cada camada e gera recomendacoes praticas para hardening.

## Inputs

| Input | Obrigatorio | Descricao |
|-------|-------------|-----------|
| `environment` | SIM | Docker standalone, Kubernetes, ECS, Cloud Run, etc. |
| `cluster_info` | NAO | Numero de nodes, namespaces, workloads |
| `container_registry` | NAO | Onde imagens sao armazenadas (ECR, GCR, Docker Hub) |
| `ci_cd_pipeline` | NAO | Pipeline de build e deploy |
| `cloud_provider` | NAO | AWS, GCP, Azure |
| `network_topology` | NAO | Arquitetura de rede do cluster |
| `current_policies` | NAO | Policies ja implementadas (NetworkPolicy, PSP, OPA) |
| `compliance_requirements` | NAO | CIS Benchmarks, SOC2, PCI-DSS |

## Steps

### Phase 1: Layer 1 — Container Image Security

**Executor:** @rice (Liz Rice)

1. **Image Scanning**
   - Scan de vulnerabilidades em imagens (Trivy, Grype)
   - Verificar base images (Alpine vs Ubuntu vs distroless)
   - Checar imagens com tag `latest` (antipattern)
   - Verificar imagens sem assinatura digital
   - Checar secrets hardcoded em imagens (layers)

2. **Image Build Best Practices**
   - Multi-stage builds implementados?
   - Minimo de pacotes instalados?
   - User nao-root definido no Dockerfile?
   - HEALTHCHECK definido?
   - Imagens pinned por digest (nao tag)?
   - .dockerignore configurado?

3. **Supply Chain Security**
   - Imagens vem de registries confiaveis?
   - SBOM (Software Bill of Materials) gerado?
   - Assinatura de imagens (Cosign/Notary)?
   - Provenance tracking implementado?

**Checkpoint:** Imagens auditadas, vulnerabilidades catalogadas

### Phase 2: Layer 2 — Container Runtime Security

**Executor:** @rice (Liz Rice)

4. **Runtime Configuration**
   - Containers rodando como root?
   - Capabilities desnecessarias habilitadas?
   - Filesystem read-only?
   - Seccomp profile aplicado?
   - AppArmor/SELinux habilitado?
   - Resource limits (CPU, memory) definidos?
   - Privileged mode desabilitado?

5. **Runtime Monitoring**
   - Runtime threat detection (Falco, Sysdig)?
   - Container drift detection?
   - Alertas para comportamento anomalo?
   - Exec em containers monitorado?

**Checkpoint:** Runtime configs avaliadas

### Phase 3: Layer 3 — Orchestration Security (Kubernetes)

**Executor:** @rice (Liz Rice)

6. **API Server Security**
   - Autenticacao no API server (OIDC, certificates)
   - RBAC configurado (nao usar cluster-admin para tudo)
   - Audit logging habilitado
   - API server nao exposto publicamente
   - Admission controllers configurados (OPA/Gatekeeper, Kyverno)

7. **Workload Security**
   - Pod Security Standards/Admission aplicados
   - ServiceAccounts com permissoes minimas
   - Secrets armazenados de forma segura (Vault, External Secrets)
   - ConfigMaps nao contem dados sensiveis
   - Resource quotas por namespace

8. **Network Policies**
   - NetworkPolicies definidas por namespace
   - Default deny ingress/egress implementado
   - Comunicacao entre pods restrita ao necessario
   - Ingress controller com TLS
   - Service mesh (Istio/Linkerd) para mTLS

**Checkpoint:** Orchestration security avaliada

### Phase 4: Layer 4 — Host Security

**Executor:** @rice (Liz Rice)

9. **Node Security**
   - OS atualizado e patched
   - CIS Benchmark para o OS aplicado
   - SSH access restrito
   - Kubelet configurado de forma segura
   - Container runtime atualizado (containerd, CRI-O)
   - Node auto-upgrade habilitado (managed K8s)

10. **Host Monitoring**
    - Node exporter / metrics collection
    - Host-level IDS (OSSEC, Wazuh)
    - Log forwarding configurado
    - Disk encryption habilitada

**Checkpoint:** Host security verificada

### Phase 5: Layer 5 — Network & Zero Trust

**Executor:** @kindervag (John Kindervag)

11. **Network Security**
    - Network segmentation (VPC, subnets)
    - Microsegmentation entre services
    - Ingress/egress filtering
    - DNS security (CoreDNS policies)
    - Service mesh mTLS
    - Load balancer security (WAF, DDoS)

12. **Zero Trust for Containers**
    - Identidade por workload (SPIFFE/SPIRE)?
    - Autorizacao per-request entre services?
    - Mutual TLS (mTLS) em toda comunicacao?
    - Policy engine centralizado?
    - Monitoramento continuo de postura?

**Checkpoint:** Network e Zero Trust avaliados

### Phase 6: CIS Benchmark Assessment

**Executor:** @rice (Liz Rice)

13. **CIS Kubernetes Benchmark**
    - Executar kube-bench (CIS benchmark automatizado)
    - Avaliar resultados por categoria
    - Priorizar remediacao de falhas

14. **CIS Docker Benchmark**
    - Executar docker-bench-security
    - Avaliar configuracao do Docker daemon
    - Verificar storage drivers e logging

**Checkpoint:** CIS benchmarks executados

### Phase 7: Report & Remediation

**Executor:** security-chief

15. Consolidar findings por camada
16. Classificar por severidade e facilidade de correcao
17. Criar remediation roadmap
18. Incluir automation scripts onde possivel

## Checkpoints

| # | Checkpoint | Criterio |
|---|-----------|----------|
| 1 | Images | Scan completo, supply chain verificada |
| 2 | Runtime | Configs avaliadas, monitoring verificado |
| 3 | Orchestration | RBAC, policies, secrets auditados |
| 4 | Host | Nodes verificados, CIS benchmark |
| 5 | Network/ZT | Segmentacao e mTLS verificados |
| 6 | CIS Benchmarks | Executados e avaliados |
| 7 | Relatorio | Consolidado com roadmap |

## Veto Conditions

- **BLOCKED** se nao ha acesso ao cluster/ambiente
- **BLOCKED** se ambiente de producao sem autorizacao para audit
- **ESCALATE** se containers rodando como root privileged em producao
- **ESCALATE** se secrets expostos em ConfigMaps/env vars
- **WARN** se sem NetworkPolicies em cluster multi-tenant

## Output

**Container Security Report** contendo:

1. Executive Summary
2. 5-Layer Assessment Results
3. CIS Benchmark Scores
4. Findings por severidade
5. Remediation Roadmap
6. Automation Scripts/Manifests
7. Monitoring Recommendations

## Output Example

```markdown
# Container Security Report — Production Cluster

**Date:** 2026-03-29
**Environment:** AWS EKS 1.29, 12 nodes, 8 namespaces
**Overall Score:** 58/100 (NEEDS IMPROVEMENT)

## Score by Layer
| Layer | Score | Critical | High | Medium |
|-------|-------|----------|------|--------|
| 1. Images | 65/100 | 2 | 5 | 8 |
| 2. Runtime | 50/100 | 3 | 4 | 6 |
| 3. Orchestration | 55/100 | 1 | 6 | 9 |
| 4. Host | 70/100 | 0 | 3 | 5 |
| 5. Network | 45/100 | 2 | 5 | 4 |

## Top Critical Findings
1. **12 containers running as root** — All in `payments` namespace
   Fix: Add `runAsNonRoot: true` to pod security context

2. **No NetworkPolicies** — All pods can communicate freely
   Fix: Implement default-deny + allow-list per namespace

3. **Secrets in environment variables** — DB passwords in plain ConfigMaps
   Fix: Migrate to External Secrets Operator + AWS Secrets Manager
```

## Outputs

- **image-vulnerability-report** — CVEs por imagem com base images, secrets expostos e supply chain gaps
- **runtime-config-assessment** — Avaliacao de containers com privilegios, capabilities e resource limits
- **k8s-hardening-report** — Findings por camada com recomendacoes de hardening
