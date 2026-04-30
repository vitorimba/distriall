# Task: Definir Escopo do Projeto

## Metadata
- **id**: define-scope
- **agent**: scope-manager
- **elicit**: true
- **version**: 1.0.0

## Description
Cria a Declaração de Escopo do Projeto e a Estrutura Analítica do Projeto (EAP / WBS — Work Breakdown Structure), dois dos artefatos mais importantes do planejamento. A Declaração de Escopo define o que está DENTRO e FORA do projeto. A WBS decompõe o trabalho total em componentes menores e gerenciáveis. Estudantes aprendem a delimitar claramente o escopo, evitar scope creep, e criar uma WBS hierárquica funcional.

## Inputs
- Objetivos do projeto (vindos do Charter ou direto do usuário)
- Lista de entregas (deliverables) esperadas
- Exclusões explícitas (o que NÃO faz parte do projeto)
- Restrições de escopo
- Premissas de escopo
- Critérios de aceitação das entregas

## Elicitation

1. **Quais são os objetivos do projeto?** (Se já tem um Charter, confirme ou atualize os objetivos)
2. **Quais são as ENTREGAS PRINCIPAIS (deliverables) do projeto?** Liste todos os produtos, serviços ou resultados que serão produzidos. (ex: "Aplicativo mobile Android/iOS", "Documentação técnica", "Treinamento da equipe")
3. **O que ESTÁ FORA do escopo deste projeto?** Liste explicitamente o que NÃO será feito, para evitar ambiguidades. (ex: "Não inclui suporte pós-lançamento", "Não inclui integração com sistema legado X")
4. **Quais são os critérios de aceitação de cada entrega principal?** Como o cliente/patrocinador saberá que a entrega está completa e aprovada?
5. **Existem restrições de escopo?** (ex: "Deve usar apenas tecnologias open-source", "Interface deve ser em português")
6. **Quais são as premissas de escopo?** (ex: "O cliente fornecerá os dados mestres", "O ambiente de teste já existe")
7. **Qual é a profundidade desejada para a WBS?** Escolha: Nível 2 (áreas de trabalho) / Nível 3 (pacotes de trabalho) / Nível 4 (atividades detalhadas)
8. **O projeto tem fases ou iterações bem definidas?** Se sim, quais são? (ex: Fase 1: Discovery, Fase 2: Desenvolvimento, Fase 3: Implantação)
9. **Há dependências externas que afetam o escopo?** (ex: "Aguarda aprovação regulatória", "Depende de entrega de terceiro")
10. **Quem tem autoridade para aprovar mudanças de escopo?** (ex: Comitê de Mudanças, Patrocinador, Gerente de Projeto)

## Process

1. **Validar objetivos** — Confirmar alinhamento com o Charter (se existir) ou estruturar objetivos a partir das respostas.
2. **Listar e categorizar entregas** — Agrupar deliverables por tipo (produto, serviço, resultado) e por fase.
3. **Redigir Declaração de Escopo** — Montar documento formal com descrição do escopo, entregas, exclusões, critérios de aceitação, premissas e restrições.
4. **Definir estrutura da WBS** — Determinar os níveis hierárquicos e o critério de decomposição (por fase, por entrega, por disciplina).
5. **Criar WBS em formato árvore** — Decompor cada entrega principal em pacotes de trabalho (Work Packages).
6. **Numerar os elementos da WBS** — Aplicar codificação hierárquica padrão (1.0, 1.1, 1.1.1, etc.).
7. **Criar Dicionário da WBS simplificado** — Para cada pacote de trabalho nível folha, registrar descrição e critério de conclusão.
8. **Verificar completude** — Confirmar que 100% do trabalho do projeto está representado na WBS (regra dos 100%).
9. **Revisar com o usuário** — Apresentar o escopo e WBS para validação antes de finalizar.
10. **Entregar artefatos** — Gerar Declaração de Escopo + WBS formatados.

## Output

```
# DECLARAÇÃO DE ESCOPO DO PROJETO
## {Nome do Projeto}

**Versão:** 1.0 | **Data:** {data} | **Autor:** Scope Manager

---

## 1. DESCRIÇÃO DO ESCOPO DO PRODUTO
{Descrição detalhada das características e funcionalidades do que será entregue}

## 2. ENTREGAS DO PROJETO (DELIVERABLES)
| # | Entrega                    | Descrição                          | Critério de Aceitação              |
|---|----------------------------|------------------------------------|------------------------------------|
| 1 | {nome da entrega}          | {o que é}                          | {como será aceita}                 |
| 2 | {nome da entrega}          | {o que é}                          | {como será aceita}                 |

## 3. EXCLUSÕES DE ESCOPO
O seguinte está FORA do escopo deste projeto:
- {Exclusão 1}
- {Exclusão 2}
- {Exclusão N}

## 4. RESTRIÇÕES
- {Restrição 1}
- {Restrição 2}

## 5. PREMISSAS
- {Premissa 1}
- {Premissa 2}

## 6. CONTROLE DE MUDANÇAS DE ESCOPO
Mudanças no escopo devem ser submetidas a {autoridade} via Solicitação de Mudança formal.

---

# ESTRUTURA ANALÍTICA DO PROJETO (EAP / WBS)
## {Nome do Projeto}

```
{Nome do Projeto} (1.0)
│
├── 1.1 Gerenciamento do Projeto
│   ├── 1.1.1 Planejamento
│   ├── 1.1.2 Monitoramento e Controle
│   └── 1.1.3 Encerramento
│
├── 1.2 {Entrega Principal 1}
│   ├── 1.2.1 {Pacote de Trabalho A}
│   │   └── 1.2.1.1 {Sub-pacote, se necessário}
│   ├── 1.2.2 {Pacote de Trabalho B}
│   └── 1.2.3 {Pacote de Trabalho C}
│
├── 1.3 {Entrega Principal 2}
│   ├── 1.3.1 {Pacote de Trabalho A}
│   └── 1.3.2 {Pacote de Trabalho B}
│
└── 1.N {Entrega Principal N}
    ├── 1.N.1 {Pacote de Trabalho A}
    └── 1.N.2 {Pacote de Trabalho B}
```

## DICIONÁRIO DA WBS (Resumido)
| Código | Pacote de Trabalho       | Descrição                              | Critério de Conclusão         |
|--------|--------------------------|----------------------------------------|-------------------------------|
| 1.2.1  | {nome}                   | {o que precisa ser feito}              | {quando está pronto}          |
| 1.2.2  | {nome}                   | {o que precisa ser feito}              | {quando está pronto}          |

**Verificação dos 100%:** Todos os pacotes somados representam 100% do trabalho do projeto. [ ] Confirmado
```

## PMBOK Reference
- **Grupo de Processos:** Planejamento (Planning Process Group)
- **Área de Conhecimento:** Gerenciamento do Escopo do Projeto (Project Scope Management)
- **Processos PMBOK:**
  - 5.3 — Definir o Escopo (Define Scope) → gera a Declaração de Escopo
  - 5.4 — Criar a EAP (Create WBS) → gera a Work Breakdown Structure
- **Entradas principais:** Plano de Gerenciamento do Escopo, Charter, Documentação de Requisitos
- **Saídas principais:** Declaração de Escopo do Projeto, Linha de Base do Escopo (EAP + Dicionário + Declaração)
