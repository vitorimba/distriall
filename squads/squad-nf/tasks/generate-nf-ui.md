# Task: Gerar Componentes de UI para NF

## Purpose
Gerar componentes de interface (formulários, listagens, views de detalhe) para operações de notas fiscais no frontend do sistema-alvo.

## Inputs
- Framework frontend do sistema-alvo (React, Next.js, Vue, etc.)
- Design system/component library existente (shadcn, MUI, Ant Design, etc.)
- Endpoints de API (task `generate-nf-endpoints.md`)
- Padrões de UI do projeto (layouts, temas)

## Steps

1. **Gerar página de listagem de NFs**
   - Tabela com colunas: número, série, tipo, destinatário, valor, status, data
   - Filtros: tipo (NF-e/NFS-e/NFC-e), status, período, destinatário
   - Paginação e ordenação
   - Ações rápidas: visualizar, emitir, cancelar
   - Badges coloridos por status (rascunho, autorizada, cancelada, rejeitada)
   - Busca por chave de acesso ou número

2. **Gerar formulário de criação/edição de NF**
   - Seção emitente (pré-preenchido da configuração)
   - Seção destinatário (busca por CNPJ/CPF com autocomplete)
   - Seção itens (tabela editável: produto, NCM, CFOP, qtd, valor)
   - Seção valores (totais calculados automaticamente)
   - Seção tributos (ICMS, PIS, COFINS — exibição, cálculo automático)
   - Seção informações adicionais (fisco, contribuinte)
   - Validação em tempo real dos campos

3. **Gerar view de detalhe da NF**
   - Dados completos da NF (cabeçalho, itens, tributos, totais)
   - Timeline de eventos (criação, emissão, cancelamento, CC-e)
   - Download de XML e DANFE (PDF)
   - Ações disponíveis conforme status:
     - Rascunho: editar, emitir, excluir
     - Autorizada: cancelar, CC-e, download XML/DANFE
     - Cancelada: somente visualização
     - Rejeitada: ver motivo, corrigir e reemitir

4. **Gerar componentes auxiliares**
   - Modal de cancelamento (justificativa obrigatória)
   - Modal de CC-e (texto da correção)
   - Seletor de NCM (busca com autocomplete)
   - Calculadora de tributos inline
   - Status badge component
   - Viewer de XML (formatado/colorido)

5. **Gerar dashboard fiscal**
   - NFs emitidas no mês (total, valor)
   - NFs por status (gráfico de pizza)
   - Tributos do período (ICMS, PIS, COFINS, ISS)
   - Alertas: certificado próximo de vencer, NFs pendentes
   - NFs recebidas pendentes de manifestação

6. **Implementar feedback ao usuário**
   - Loading states durante emissão
   - Toast/notificação de sucesso/erro
   - Confirmação antes de ações destrutivas (cancelar)
   - Progress indicator para emissão em batch

## Outputs
- Páginas: listagem, criação, edição, detalhe
- Componentes: modals, badges, seletores, viewer XML
- Dashboard fiscal
- Hooks/composables para API (useInvoices, useEmitInvoice)
- Tipos/interfaces TypeScript para NF

## Acceptance Criteria
- [ ] Listagem com filtros, paginação e ações
- [ ] Formulário com validação em tempo real
- [ ] View de detalhe com timeline de eventos
- [ ] Componentes seguem design system do projeto
- [ ] Dashboard com métricas fiscais
- [ ] Feedback ao usuário em todas as operações
