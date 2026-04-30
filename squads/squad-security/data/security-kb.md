# Security Knowledge Base — Squad Security

Base de conhecimento com conceitos-chave, frameworks, glossario e referencias para a squad de seguranca.

---

## 1. Frameworks & Standards

### OWASP (Open Worldwide Application Security Project)

| Recurso | Descricao | Link |
|---------|-----------|------|
| **OWASP Top 10 (2021)** | Top 10 riscos de seguranca web | https://owasp.org/www-project-top-ten/ |
| **OWASP API Top 10 (2023)** | Top 10 riscos de seguranca de APIs | https://owasp.org/API-Security/ |
| **OWASP ASVS** | Application Security Verification Standard | https://owasp.org/www-project-application-security-verification-standard/ |
| **OWASP Testing Guide** | Guia completo de testes de seguranca | https://owasp.org/www-project-web-security-testing-guide/ |
| **OWASP Cheat Sheets** | Guias rapidos de seguranca | https://cheatsheetseries.owasp.org/ |
| **OWASP Proactive Controls** | Top 10 controles proativos | https://owasp.org/www-project-proactive-controls/ |

### NIST (National Institute of Standards and Technology)

| Recurso | Descricao |
|---------|-----------|
| **NIST SP 800-53** | Catalogo de controles de seguranca e privacidade |
| **NIST SP 800-61** | Computer Security Incident Handling Guide |
| **NIST SP 800-207** | Zero Trust Architecture |
| **NIST CSF** | Cybersecurity Framework (Identify, Protect, Detect, Respond, Recover) |
| **NIST Privacy Framework** | Framework de privacidade |
| **NIST RMF** | Risk Management Framework |

### MITRE ATT&CK

| Componente | Descricao |
|-----------|-----------|
| **Tactics** | O "porque" do ataque (14 taticas) |
| **Techniques** | O "como" do ataque (200+ tecnicas) |
| **Sub-techniques** | Variantes especificas de tecnicas |
| **Procedures** | Implementacoes especificas por threat actors |
| **Mitigations** | Contramedidas para cada tecnica |
| **Detections** | Como detectar cada tecnica |

**Link:** https://attack.mitre.org/

### CIS Benchmarks

| Benchmark | Uso |
|-----------|-----|
| CIS Kubernetes | Hardening de clusters K8s |
| CIS Docker | Hardening de Docker daemon e containers |
| CIS AWS Foundations | Hardening de contas AWS |
| CIS Ubuntu/RHEL | Hardening de OS |

---

## 2. OWASP Top 10 (2021) — Resumo

| # | Categoria | Descricao | Prevencao |
|---|----------|-----------|-----------|
| A01 | Broken Access Control | Usuarios acessam o que nao deveriam | RBAC, deny by default, server-side checks |
| A02 | Cryptographic Failures | Dados sensiveis expostos | TLS, hashing forte, key management |
| A03 | Injection | SQL, XSS, Command injection | Parameterized queries, output encoding |
| A04 | Insecure Design | Falhas arquiteturais | Threat modeling, secure design patterns |
| A05 | Security Misconfiguration | Configs default inseguras | Hardening, remover features desnecessarias |
| A06 | Vulnerable Components | Dependencias com CVEs | npm audit, SCA, atualizacoes regulares |
| A07 | Auth Failures | Autenticacao/sessao falha | MFA, rate limiting, session management |
| A08 | Integrity Failures | Software/data integrity | SRI, signed updates, CI/CD security |
| A09 | Logging Failures | Falta de logs/monitoramento | Security logging, alerting, SIEM |
| A10 | SSRF | Server-Side Request Forgery | URL validation, network segmentation |

---

## 3. OWASP API Top 10 (2023) — Resumo

| # | Categoria | Descricao | Prevencao |
|---|----------|-----------|-----------|
| API1 | BOLA | Broken Object Level Authorization | Verificar ownership em cada request |
| API2 | Broken Auth | Autenticacao falha na API | JWT seguro, rate limiting, MFA |
| API3 | Property Auth | Mass assignment, data exposure | DTOs, whitelist de campos |
| API4 | Resource Consumption | Sem rate limiting | Rate limits, paginacao, timeouts |
| API5 | BFLA | Function level auth falha | RBAC per endpoint, deny by default |
| API6 | Business Flow | Abuso de fluxos de negocio | CAPTCHA, bot detection, rate limiting |
| API7 | SSRF | Server-side request forgery | URL validation, network controls |
| API8 | Misconfiguration | Config insegura | CORS, headers, error handling |
| API9 | Inventory | APIs nao gerenciadas | API inventory, versioning, sunset |
| API10 | Unsafe Consumption | Confiar em APIs externas | Validate external data, circuit breaker |

---

## 4. STRIDE Threat Model

| Categoria | Descricao | Controle |
|-----------|-----------|----------|
| **S**poofing | Fingir ser outro | Autenticacao forte |
| **T**ampering | Alterar dados | Integridade, checksums, audit trail |
| **R**epudiation | Negar acao | Logging, non-repudiation |
| **I**nformation Disclosure | Vazamento de dados | Criptografia, access control |
| **D**enial of Service | Indisponibilidade | Rate limiting, redundancia |
| **E**levation of Privilege | Ganhar mais permissoes | Least privilege, authorization |

---

## 5. ASVS Levels

| Level | Aplicacao | Requisitos |
|-------|----------|-----------|
| **L1** | Todas aplicacoes | Controles basicos, testavel automaticamente |
| **L2** | Aplicacoes com dados sensiveis | Controles avancados, maioria das apps deveria atingir |
| **L3** | Aplicacoes criticas (saude, financeiro, governo) | Controles profundos, verificacao de design |

---

## 6. Zero Trust Principles

### 5 Passos de Kindervag
1. **Define the Protect Surface** — Identificar DAAS (Data, Applications, Assets, Services)
2. **Map the Transaction Flows** — Entender como trafego flui
3. **Architect a Zero Trust Environment** — Microsegmentacao, policy engine
4. **Create Zero Trust Policy** — Kipling Method (who, what, when, where, why, how)
5. **Monitor and Maintain** — Monitoramento continuo, melhoria iterativa

### Core Concepts
- **Never trust, always verify** — Nenhum acesso implicito
- **Least privilege** — Acesso minimo necessario
- **Assume breach** — Agir como se ja estivesse comprometido
- **Microsegmentation** — Segmentar rede em zones granulares
- **Continuous verification** — Nao basta autenticar uma vez

---

## 7. Privacy by Design — 7 Principios

| # | Principio | Descricao |
|---|-----------|-----------|
| 1 | Proativo, nao reativo | Prevenir problemas de privacidade, nao remediar |
| 2 | Privacidade como padrao | Configuracoes default protegem privacidade |
| 3 | Privacidade no design | Incorporada a arquitetura, nao como add-on |
| 4 | Funcionalidade total | Privacidade + funcionalidade, nao trade-off |
| 5 | Seguranca fim-a-fim | Protecao em todo o ciclo de vida dos dados |
| 6 | Visibilidade e transparencia | Praticas abertas e verificaveis |
| 7 | Respeito pelo usuario | Interesses do usuario sao a prioridade |

---

## 8. LGPD — Conceitos Essenciais

| Conceito | Definicao |
|----------|-----------|
| **Dado Pessoal** | Qualquer informacao que identifique ou possa identificar uma pessoa |
| **Dado Sensivel** | Origem racial, religiao, saude, biometria, orientacao sexual, etc. |
| **Titular** | Pessoa a quem os dados se referem |
| **Controlador** | Quem decide sobre o tratamento dos dados |
| **Operador** | Quem processa dados em nome do controlador |
| **Encarregado (DPO)** | Pessoa de contato entre controlador, titulares e ANPD |
| **ANPD** | Autoridade Nacional de Protecao de Dados |
| **RIPD** | Relatorio de Impacto a Protecao de Dados Pessoais |
| **Consentimento** | Manifestacao livre, informada e inequivoca do titular |
| **Anonimizacao** | Tornar dado irreversivelmente nao identificavel |
| **Pseudonimizacao** | Substituir identificadores por pseudonimos (reversivel com chave) |

### Bases Legais (Art. 7)
1. Consentimento
2. Obrigacao legal/regulatoria
3. Execucao de politicas publicas
4. Pesquisa (anonimizado quando possivel)
5. Execucao de contrato
6. Exercicio regular de direitos
7. Protecao da vida
8. Tutela da saude
9. Interesse legitimo
10. Protecao do credito

### Sancoes (Art. 52)
- Advertencia
- Multa: ate 2% do faturamento, limitada a R$ 50 milhoes por infracao
- Multa diaria
- Publicizacao da infracao
- Bloqueio/eliminacao dos dados
- Suspensao da atividade de tratamento

---

## 9. Container Security — 5 Layers (Liz Rice)

| Layer | Foco | Ferramentas |
|-------|------|-------------|
| 1. Image | Vulnerabilidades, build security | Trivy, Grype, Cosign |
| 2. Runtime | Configs, capabilities, seccomp | Falco, Sysdig |
| 3. Orchestration | RBAC, policies, secrets | OPA, Kyverno, kube-bench |
| 4. Host | OS hardening, patching | CIS Benchmarks, Wazuh |
| 5. Network | Segmentacao, mTLS | NetworkPolicy, Istio, Calico |

---

## 10. Incident Response — NIST SP 800-61

| Fase | Acoes |
|------|-------|
| **Preparation** | Policies, tools, training, playbooks |
| **Detection & Analysis** | Monitoring, IOC analysis, classification |
| **Containment** | Short-term (isolate), Long-term (patch) |
| **Eradication** | Remove cause, clean systems |
| **Recovery** | Restore, monitor, validate |
| **Lessons Learned** | Post-mortem, update playbooks |

### Key Metrics
| Metrica | Definicao | Target (P1) |
|---------|-----------|-------------|
| MTTD | Mean Time to Detect | < 1 hora |
| MTTR | Mean Time to Respond | < 4 horas |
| MTTC | Mean Time to Contain | < 1 hora |
| MTTE | Mean Time to Eradicate | < 24 horas |

---

## 11. Glossario

| Termo | Definicao |
|-------|-----------|
| **BOLA** | Broken Object Level Authorization — acessar objetos de outros usuarios |
| **BFLA** | Broken Function Level Authorization — acessar funcoes nao autorizadas |
| **CVE** | Common Vulnerabilities and Exposures — identificador unico de vulnerabilidade |
| **CVSS** | Common Vulnerability Scoring System — score de severidade (0-10) |
| **CWE** | Common Weakness Enumeration — catalogo de tipos de fraquezas |
| **DAST** | Dynamic Application Security Testing — teste com app rodando |
| **DDoS** | Distributed Denial of Service — ataque de negacao de servico |
| **DLP** | Data Loss Prevention — prevencao de vazamento de dados |
| **EDR** | Endpoint Detection and Response — deteccao em endpoints |
| **HSTS** | HTTP Strict Transport Security — forca HTTPS |
| **IDOR** | Insecure Direct Object Reference — referencia direta insegura |
| **IOC** | Indicator of Compromise — indicador de comprometimento |
| **IR** | Incident Response — resposta a incidentes |
| **JWT** | JSON Web Token — token de autenticacao |
| **MFA** | Multi-Factor Authentication — autenticacao multifator |
| **mTLS** | Mutual TLS — TLS bidirecional |
| **OWASP** | Open Worldwide Application Security Project |
| **PIA** | Privacy Impact Assessment — avaliacao de impacto a privacidade |
| **RBAC** | Role-Based Access Control — controle de acesso por funcao |
| **RIPD** | Relatorio de Impacto a Protecao de Dados |
| **RLS** | Row Level Security — seguranca em nivel de linha no banco |
| **SAST** | Static Application Security Testing — analise estatica de codigo |
| **SCA** | Software Composition Analysis — analise de dependencias |
| **SIEM** | Security Information and Event Management |
| **SOAR** | Security Orchestration, Automation and Response |
| **SSRF** | Server-Side Request Forgery — forgery de requisicao server-side |
| **TLS** | Transport Layer Security — criptografia de transporte |
| **TTP** | Tactics, Techniques and Procedures — comportamento do atacante |
| **WAF** | Web Application Firewall — firewall de aplicacao |
| **XSS** | Cross-Site Scripting — injecao de scripts |
| **ZTA** | Zero Trust Architecture — arquitetura de confianca zero |

---

## 12. Security Tools Reference

### Scanning & Testing
| Tool | Tipo | Uso |
|------|------|-----|
| Nuclei | Vulnerability Scanner | Scan automatizado com templates |
| Trivy | Container Scanner | Vulnerabilidades em imagens |
| Nikto | Web Scanner | Scan basico de web servers |
| ffuf | Fuzzer | Directory/parameter fuzzing |
| SQLMap | SQL Injection | Testes de SQL injection |
| Amass | Recon | Enumeracao de subdominios |
| Nmap | Network Scanner | Port scanning e service detection |
| testssl.sh | SSL/TLS | Analise de configuracao SSL |
| kube-bench | K8s Security | CIS Benchmark para Kubernetes |

### Monitoring & Detection
| Tool | Tipo | Uso |
|------|------|-----|
| Falco | Runtime Security | Deteccao de ameacas em containers |
| Wazuh | HIDS | Host intrusion detection |
| OSSEC | HIDS | Host-based IDS open source |
| Sentry | Error Tracking | Monitoramento de erros |
| Datadog | Observability | Logs, metrics, traces |

### Web Security Headers
| Header | Valor Recomendado | Funcao |
|--------|------------------|--------|
| Strict-Transport-Security | max-age=31536000; includeSubDomains | Forca HTTPS |
| Content-Security-Policy | default-src 'self' | Previne XSS e data injection |
| X-Content-Type-Options | nosniff | Previne MIME sniffing |
| X-Frame-Options | DENY | Previne clickjacking |
| Referrer-Policy | strict-origin-when-cross-origin | Controla referrer |
| Permissions-Policy | camera=(), microphone=() | Controla features do browser |

---

## 13. CVSS Scoring Reference

| Score | Severidade | Acao |
|-------|-----------|------|
| 9.0 - 10.0 | Critical | Corrigir imediatamente |
| 7.0 - 8.9 | High | Corrigir em 1 semana |
| 4.0 - 6.9 | Medium | Corrigir em 1 mes |
| 0.1 - 3.9 | Low | Corrigir no proximo ciclo |
| 0.0 | Informational | Documentar e avaliar |

---

## 14. Quick Reference — Seguranca para Supabase

| Item | Como Verificar | Fix |
|------|---------------|-----|
| RLS habilitado | Dashboard → Table Editor → RLS toggle | Enable per table |
| RLS policies | `SELECT * FROM pg_policies` | Criar policies com `auth.uid()` |
| Service role key | Buscar no frontend code | Mover para server-side only |
| Auth settings | Dashboard → Auth → Settings | Email confirmation ON |
| Storage policies | Dashboard → Storage → Policies | Criar policies por bucket |
| Edge Functions secrets | Dashboard → Edge Functions → Secrets | Usar dashboard, nao hardcode |

---

## 15. Vibe Coder Security Quick Reference

### O Minimo que Voce PRECISA Saber

1. **RLS e obrigatorio** — Sem RLS, qualquer pessoa acessa todos dados
2. **Auth != Authz** — Login nao e permissao. Sao coisas diferentes.
3. **Valide no servidor** — Frontend pode ser burlado. Sempre.
4. **Secrets no .env** — Nunca coloque API keys no codigo.
5. **LGPD e lei** — Politica de privacidade e obrigatoria.
6. **HTTPS sempre** — Sem excecoes.
7. **Rate limiting** — Sem isso, bots destroem sua API.
8. **Logs existem para salvar** — Quando algo der errado, voce vai precisar.
9. **npm audit** — Rode regularmente. Vulnerabilidades em dependencias sao reais.
10. **Backup** — Se nao tem backup, nao tem app.

---

*Squad Security Knowledge Base v1.0*
*Ultima atualizacao: 2026-03-29*
