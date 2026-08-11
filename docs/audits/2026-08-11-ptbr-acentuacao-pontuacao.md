# Auditoria de Acentuação e Pontuação pt-BR — DistriAll (apps/web)

## 1. Resumo Executivo

| Métrica | Valor |
|---------|-------|
| **Total de correções** | 176 |
| Severidade **Alta** | 0 |
| Severidade **Média** | 0 |
| Severidade **Baixa** | 176 |
| **Arquivos afetados** | 47 |

Todas as 176 correções são de severidade **baixa**: são ajustes puramente cosméticos de acentuação/pontuação em strings de UI (rótulos, títulos, mensagens de erro, placeholders, toasts, textos de recibo). Nenhuma toca chaves de objeto, valores de enum, identificadores, `className` ou contratos de banco/API.

---

## 2. Correções por Arquivo

Arquivos ordenados por número de findings (decrescente).

### `apps/web/src/app/(authenticated)/dashboard/page.tsx` — 15 findings

| Linha | Atual | Sugerido | Severidade |
|-------|-------|----------|------------|
| 48 | `Mes` | `Mês` | baixa |
| 54 | `Visao geral do negocio` | `Visão geral do negócio` | baixa |
| 82 | `ate` | `até` | baixa |
| 94 | `Erro ao carregar estatisticas` | `Erro ao carregar estatísticas` | baixa |
| 104 | `Ticket medio` | `Ticket médio` | baixa |
| 126 | `vs periodo ant.` | `vs período ant.` | baixa |
| 126 | `vs periodo ant.` | `vs período ant.` | baixa |
| 128 | `no periodo` | `no período` | baixa |
| 136 | `vs periodo ant.` | `vs período ant.` | baixa |
| 140 | `Ticket medio` | `Ticket médio` | baixa |
| 144 | `Por pedido no periodo` | `Por pedido no período` | baixa |
| 152 | `vs periodo ant.` | `vs período ant.` | baixa |
| 160 | `Compraram no periodo` | `Compraram no período` | baixa |
| 168 | `Evolucao semanal` | `Evolução semanal` | baixa |

### `apps/web/src/app/(authenticated)/settings/page.tsx` — 13 findings

| Linha | Atual | Sugerido | Severidade |
|-------|-------|----------|------------|
| 13 | `A impressora nao aparece na lista de pareamento` | `A impressora não aparece na lista de pareamento` | baixa |
| 15 | `Verifique se a impressora esta ligada e em modo de pareamento (LED piscando). Mantenha-a a menos de 1 metro do aparelho e tente novamente.` | `Verifique se a impressora está ligada e em modo de pareamento (LED piscando). Mantenha-a a menos de 1 metro do aparelho e tente novamente.` | baixa |
| 20 | `Confirme a largura do papel nas opcoes da impressora (58mm ou 80mm). Recibos cortados geralmente indicam configuracao de largura errada.` | `Confirme a largura do papel nas opções da impressora (58mm ou 80mm). Recibos cortados geralmente indicam configuração de largura errada.` | baixa |
| 23 | `A conexao cai durante a impressao` | `A conexão cai durante a impressão` | baixa |
| 25 | `Bluetooth de baixa energia pode hibernar. Desative a economia de bateria para o navegador nas configuracoes do Android.` | `Bluetooth de baixa energia pode hibernar. Desative a economia de bateria para o navegador nas configurações do Android.` | baixa |
| 52 | `Configuracoes` | `Configurações` | baixa |
| 59 | `Impressora termica` | `Impressora térmica` | baixa |
| 120 | `Teste de impressao` | `Teste de impressão` | baixa |
| 133 | `Web Bluetooth nao e suportado neste navegador. Use Android Chrome ou Windows Chrome/Edge.` | `Web Bluetooth não é suportado neste navegador. Use Android Chrome ou Windows Chrome/Edge.` | baixa |
| 173 | `Safari e Firefox nao suportam Web Bluetooth` | `Safari e Firefox não suportam Web Bluetooth` | baixa |
| 183 | `Solucao de problemas` | `Solução de problemas` | baixa |

### `apps/web/src/app/(authenticated)/orders/[id]/page.tsx` — 8 findings

| Linha | Atual | Sugerido | Severidade |
|-------|-------|----------|------------|
| 353 | `Pedido nao encontrado.` | `Pedido não encontrado.` | baixa |
| 396 | ` · Credito: ` | ` · Crédito: ` | baixa |
| 419 | ` · Credito: ` | ` · Crédito: ` | baixa |
| 478 | `Devolucao` | `Devolução` | baixa |
| 733 | `Cartao` | `Cartão` | baixa |
| 752 | `Observacoes` | `Observações` | baixa |
| 762 | `Observacoes do pedido...` | `Observações do pedido...` | baixa |

### `apps/web/src/components/clients/client-form.tsx` — 8 findings

| Linha | Atual | Sugerido | Severidade |
|-------|-------|----------|------------|
| 169 | `Pessoa Fisica` | `Pessoa Física` | baixa |
| 177 | `Pessoa Juridica` | `Pessoa Jurídica` | baixa |
| 181 | `Razao Social` | `Razão Social` | baixa |
| 230 | `Inscricao Estadual` | `Inscrição Estadual` | baixa |
| 250 | `Endereco` | `Endereço` | baixa |
| 291 | `Forma de Pagamento Padrao` | `Forma de Pagamento Padrão` | baixa |
| 303 | `<option value="cartao">Cartao</option>` | `<option value="cartao">Cartão</option>` | baixa |
| 328 | `Salvar Alteracoes` | `Salvar Alterações` | baixa |

### `apps/web/src/components/clients/address-form.tsx` — 7 findings

| Linha | Atual | Sugerido | Severidade |
|-------|-------|----------|------------|
| 77 | `<Field label="Rotulo">` | `<Field label="Rótulo">` | baixa |
| 81 | `placeholder="Ex: Matriz, Filial, Deposito"` | `placeholder="Ex: Matriz, Filial, Depósito"` | baixa |
| 108 | `<Field label="Numero">` | `<Field label="Número">` | baixa |
| 137 | `Endereco fiscal (NF-e)` | `Endereço fiscal (NF-e)` | baixa |
| 146 | `Entrega padrao` | `Entrega padrão` | baixa |
| 152 | `Salvar endereco` | `Salvar endereço` | baixa |

### `apps/web/src/components/orders/order-list.tsx` — 7 findings

| Linha | Atual | Sugerido | Severidade |
|-------|-------|----------|------------|
| 45 | `{ value: 'mes', label: 'Mes' }` | `{ value: 'mes', label: 'Mês' }` | baixa |
| 77 | `{ value: 'lancado', label: 'Lancado' }` | `{ value: 'lancado', label: 'Lançado' }` | baixa |
| 90 | `{ value: 'cartao', label: 'Cartao' }` | `{ value: 'cartao', label: 'Cartão' }` | baixa |
| 159 | `Nao foi possivel carregar os pedidos.` | `Não foi possível carregar os pedidos.` | baixa |
| 227 | `Buscar por cliente ou numero...` | `Buscar por cliente ou número...` | baixa |
| 325 | `Tente ajustar os filtros ou o periodo.` | `Tente ajustar os filtros ou o período.` | baixa |
| 325 | `Lance o primeiro pedido para ve-lo aqui.` | `Lance o primeiro pedido para vê-lo aqui.` | baixa |

### `apps/web/src/components/orders/exchange-form.tsx` — 6 findings

| Linha | Atual | Sugerido | Severidade |
|-------|-------|----------|------------|
| 111 | `Selecione os itens que o cliente esta devolvendo. Voce sera redirecionado para criar o novo pedido de troca.` | `Selecione os itens que o cliente está devolvendo. Você será redirecionado para criar o novo pedido de troca.` | baixa |
| 124 | `Ja devolvido: ${item.returned_quantity}` | `Já devolvido: ${item.returned_quantity}` | baixa |
| 125 | `· Disponivel: {available}` | `· Disponível: {available}` | baixa |
| 169 | `Credito de troca:` | `Crédito de troca:` | baixa |
| 173 | `Este valor sera exibido como referencia no novo pedido.` | `Este valor será exibido como referência no novo pedido.` | baixa |

### `apps/web/src/components/orders/return-form.tsx` — 6 findings

| Linha | Atual | Sugerido | Severidade |
|-------|-------|----------|------------|
| 97 | `Registrar Devolucao` | `Registrar Devolução` | baixa |
| 112 | `Ja devolvido: ${item.returned_quantity}` | `Já devolvido: ${item.returned_quantity}` | baixa |
| 113 | `· Disponivel: {available}` | `· Disponível: {available}` | baixa |
| 143 | `Motivo da devolucao *` | `Motivo da devolução *` | baixa |
| 157 | `Valor da devolucao:` | `Valor da devolução:` | baixa |
| 180 | `Confirmar Devolucao` | `Confirmar Devolução` | baixa |

### `apps/web/src/components/products/product-form.tsx` — 6 findings

| Linha | Atual | Sugerido | Severidade |
|-------|-------|----------|------------|
| 269 | `Descricao` | `Descrição` | baixa |
| 296 | `Variacoes` | `Variações` | baixa |
| 298 | `Variacao` | `Variação` | baixa |
| 305 | `Variacao {i + 1}` | `Variação {i + 1}` | baixa |
| 336 | `Preco Custo` | `Preço Custo` | baixa |
| 348 | `Preco Venda` | `Preço Venda` | baixa |
| 381 | `Salvar Alteracoes` | `Salvar Alterações` | baixa |

### `apps/web/src/app/(authenticated)/orders/[id]/edit/page.tsx` — 7 findings

| Linha | Atual | Sugerido | Severidade |
|-------|-------|----------|------------|
| 49 | `Pedido nao encontrado` | `Pedido não encontrado` | baixa |
| 55 | `Pedido com status "${order.status}" nao pode ser editado` | `Pedido com status "${order.status}" não pode ser editado` | baixa |
| 103 | `Cliente e pelo menos um produto sao obrigatorios` | `Cliente e pelo menos um produto são obrigatórios` | baixa |
| 170 | `Cartao` | `Cartão` | baixa |
| 181 | `Observacoes` | `Observações` | baixa |
| 187 | `Observacoes do pedido...` | `Observações do pedido...` | baixa |

### `apps/web/src/components/clients/client-addresses.tsx` — 5 findings

| Linha | Atual | Sugerido | Severidade |
|-------|-------|----------|------------|
| 90 | `toast('Endereco salvo', 'success');` | `toast('Endereço salvo', 'success');` | baixa |
| 107 | `toast(newActive ? 'Endereco reativado' : 'Endereco desativado', 'success');` | `toast(newActive ? 'Endereço reativado' : 'Endereço desativado', 'success');` | baixa |
| 118 | `Enderecos` | `Endereços` | baixa |
| 143 | `Nenhum endereco cadastrado` | `Nenhum endereço cadastrado` | baixa |
| 191 | `endereco(s) inativo(s)` | `endereço(s) inativo(s)` | baixa |

### `apps/web/src/components/financial/expense-list.tsx` — 6 findings

| Linha | Atual | Sugerido | Severidade |
|-------|-------|----------|------------|
| 56 | `{ value: 'variavel', label: 'Variavel' }` | `{ value: 'variavel', label: 'Variável' }` | baixa |
| 63 | `{ value: 'manutencao', label: 'Manutencao' }` | `{ value: 'manutencao', label: 'Manutenção' }` | baixa |
| 114 | `Nao foi possivel carregar os gastos.` | `Não foi possível carregar os gastos.` | baixa |
| 135 | `Confirma exclusao do gasto?` | `Confirma exclusão do gasto?` | baixa |
| 171 | `Total no periodo` | `Total no período` | baixa |
| 200 | `Ate` | `Até` | baixa |

### `apps/web/src/components/clients/client-prices-editor.tsx` — 3 findings

| Linha | Atual | Sugerido | Severidade |
|-------|-------|----------|------------|
| 165 | `Precos Especiais` | `Preços Especiais` | baixa |
| 185 | `Padrao` | `Padrão` | baixa |
| 205 | `preco(s) especial(is) definido(s)` | `preço(s) especial(is) definido(s)` | baixa |

### `apps/web/src/components/clients/client-order-history.tsx` — 3 findings

| Linha | Atual | Sugerido | Severidade |
|-------|-------|----------|------------|
| 20 | `{ value: 'lancado', label: 'Lancado' }` | `{ value: 'lancado', label: 'Lançado' }` | baixa |
| 55 | `Historico de Pedidos` | `Histórico de Pedidos` | baixa |
| 71 | `Ate` | `Até` | baixa |

### `apps/web/src/components/clients/client-purchase-frequency.tsx` — 3 findings

| Linha | Atual | Sugerido | Severidade |
|-------|-------|----------|------------|
| 71 | `Ultimo pedido:` | `Último pedido:` | baixa |
| 77 | `(ha {data.daysSinceLastOrder} ...)` | `(há {data.daysSinceLastOrder} ...)` | baixa |
| 87 | `Frequencia:` | `Frequência:` | baixa |

### `apps/web/src/components/orders/client-recent-orders.tsx` — 3 findings

| Linha | Atual | Sugerido | Severidade |
|-------|-------|----------|------------|
| 211 | `Ultimos Pedidos ({orders.length})` | `Últimos Pedidos ({orders.length})` | baixa |
| 311 | `O carrinho ja tem {cartItems.length} ...` | `O carrinho já tem {cartItems.length} ...` | baixa |
| 312 | `Ao repetir o pedido, os itens atuais serao substituidos.` | `Ao repetir o pedido, os itens atuais serão substituídos.` | baixa |

### `apps/web/src/components/orders/order-receipt.tsx` — 3 findings

| Linha | Atual | Sugerido | Severidade |
|-------|-------|----------|------------|
| 224 | `*Industria e Comercio Temperos Boa Mesa*` | `*Indústria e Comércio Temperos Boa Mesa*` | baixa |
| 226 | `Rua Cezar Pupin, Sao Jose do Rio Preto - SP` | `Rua Cezar Pupin, São José do Rio Preto - SP` | baixa |
| 243 | `_AGRADECEMOS A PREFERENCIA_` | `_AGRADECEMOS A PREFERÊNCIA_` | baixa |

### `apps/web/src/components/orders/receipt.tsx` — 3 findings

| Linha | Atual | Sugerido | Severidade |
|-------|-------|----------|------------|
| 7 | `name: 'Industria e Comercio Temperos Boa Mesa'` | `name: 'Indústria e Comércio Temperos Boa Mesa'` | baixa |
| 9 | `address: 'Rua Cezar Pupin, Sao Jose do Rio Preto - SP, 15051-010'` | `address: 'Rua Cezar Pupin, São José do Rio Preto - SP, 15051-010'` | baixa |
| 48 | `rodape = 'Agradecemos a preferencia!'` | `rodape = 'Agradecemos a preferência!'` | baixa |

### `apps/web/src/components/products/batch-price-editor.tsx` — 5 findings

| Linha | Atual | Sugerido | Severidade |
|-------|-------|----------|------------|
| 62 | `{n} variacao{...'es'} atualizada{...}!` | `{n} variação{...'ões'} atualizada{...}!` | baixa |
| 73 | `Editar Precos em Lote (...)` | `Editar Preços em Lote (...)` | baixa |
| 83 | `Preco Fixo` | `Preço Fixo` | baixa |
| 97 | `Novo preco de venda (R$)` | `Novo preço de venda (R$)` | baixa |
| 123 | `Variacao` | `Variação` | baixa |

### `apps/web/src/components/products/product-list.tsx` — 4 findings

| Linha | Atual | Sugerido | Severidade |
|-------|-------|----------|------------|
| 68 | `Nao foi possivel carregar os produtos.` | `Não foi possível carregar os produtos.` | baixa |
| 169 | `Cadastre o primeiro produto para ve-lo aqui.` | `Cadastre o primeiro produto para vê-lo aqui.` | baixa |
| 197 | `{n} variacao{...'es'} · ...` | `{n} variação{...'ões'} · ...` | baixa |
| 214 | `Variacao` | `Variação` | baixa |

### `apps/web/src/lib/validations/product.ts` — 4 findings

| Linha | Atual | Sugerido | Severidade |
|-------|-------|----------|------------|
| 5 | `Nome da variacao obrigatorio` | `Nome da variação obrigatório` | baixa |
| 7 | `Preco de custo deve ser >= 0` | `Preço de custo deve ser >= 0` | baixa |
| 8 | `Preco de venda deve ser >= 0` | `Preço de venda deve ser >= 0` | baixa |
| 17 | `Pelo menos 1 variacao obrigatoria` | `Pelo menos 1 variação obrigatória` | baixa |

### `apps/web/src/components/clients/client-list.tsx` — 3 findings

| Linha | Atual | Sugerido | Severidade |
|-------|-------|----------|------------|
| 35 | `cartao: 'Cartao',` | `cartao: 'Cartão',` | baixa |
| 63 | `setError('Nao foi possivel carregar os clientes.');` | `setError('Não foi possível carregar os clientes.');` | baixa |
| 120 | `Cadastre o primeiro cliente para ve-lo aqui.` | `Cadastre o primeiro cliente para vê-lo aqui.` | baixa |

### `apps/web/src/app/(authenticated)/financial/settlements/page.tsx` — 3 findings

| Linha | Atual | Sugerido | Severidade |
|-------|-------|----------|------------|
| 83 | `Nao foi possivel carregar os acertos.` | `Não foi possível carregar os acertos.` | baixa |
| 124 | `Inicio` | `Início` | baixa |
| 162 | `Filtrar por periodo` | `Filtrar por período` | baixa |

### `apps/web/src/app/(authenticated)/orders/new/page.tsx` — 4 findings

| Linha | Atual | Sugerido | Severidade |
|-------|-------|----------|------------|
| 189 | ` · Credito: ` | ` · Crédito: ` | baixa |
| 226 | `Observacoes` | `Observações` | baixa |
| 231 | `Observacoes do pedido...` | `Observações do pedido...` | baixa |
| 246 | `Credito troca` | `Crédito troca` | baixa |

### `apps/web/src/lib/validations/expense.ts` — 3 findings

| Linha | Atual | Sugerido | Severidade |
|-------|-------|----------|------------|
| 5 | `Percentual maximo 100%` | `Percentual máximo 100%` | baixa |
| 9 | `Descricao obrigatoria` | `Descrição obrigatória` | baixa |
| 11 | `Data obrigatoria` | `Data obrigatória` | baixa |

### `apps/web/src/lib/mask-utils.ts` — 3 findings

| Linha | Atual | Sugerido | Severidade |
|-------|-------|----------|------------|
| 57 | `required: 'Campo obrigatorio',` | `required: 'Campo obrigatório',` | baixa |
| 59 | `invalidCpfCnpj: 'CPF ou CNPJ invalido',` | `invalidCpfCnpj: 'CPF ou CNPJ inválido',` | baixa |
| 60 | `invalidCep: 'CEP invalido',` | `invalidCep: 'CEP inválido',` | baixa |

### `apps/web/src/components/layout/sidebar.tsx` — 3 findings

| Linha | Atual | Sugerido | Severidade |
|-------|-------|----------|------------|
| 23 | `label: 'Inicio'` | `label: 'Início'` | baixa |
| 40 | `label: 'Estatisticas'` | `label: 'Estatísticas'` | baixa |
| 45 | `label: 'Configuracoes'` | `label: 'Configurações'` | baixa |

### `apps/web/src/components/financial/settlement-detail.tsx` — 2 findings

| Linha | Atual | Sugerido | Severidade |
|-------|-------|----------|------------|
| 56 | `Fechar o acerto? Esta acao e irreversivel.` | `Fechar o acerto? Esta ação é irreversível.` | baixa |
| 71 | `Regenerar o acerto? O acerto atual sera excluido e recalculado.` | `Regenerar o acerto? O acerto atual será excluído e recalculado.` | baixa |

### `apps/web/src/app/api/settlements/[id]/close/route.ts` — 2 findings

| Linha | Atual | Sugerido | Severidade |
|-------|-------|----------|------------|
| 28 | `Acerto nao encontrado` | `Acerto não encontrado` | baixa |
| 32 | `Acerto ja esta fechado` | `Acerto já está fechado` | baixa |

### `apps/web/src/components/deliveries/available-orders.tsx` — 3 findings

| Linha | Atual | Sugerido | Severidade |
|-------|-------|----------|------------|
| 24 | `Pedidos disponiveis (...)` | `Pedidos disponíveis (...)` | baixa |
| 37 | `Todos os pedidos carregados ja foram adicionados a rota` | `Todos os pedidos carregados já foram adicionados à rota` | baixa |
| 83 | `aria-label={\`Adicionar ${order.client_name} a rota\`}` | `aria-label={\`Adicionar ${order.client_name} à rota\`}` | baixa |

### `apps/web/src/components/financial/settlement-summary.tsx` — 2 findings

| Linha | Atual | Sugerido | Severidade |
|-------|-------|----------|------------|
| 32 | `Devolucoes` | `Devoluções` | baixa |
| 43 | `Lucro Liquido` | `Lucro Líquido` | baixa |

### `apps/web/src/components/financial/expense-form.tsx` — 3 findings

| Linha | Atual | Sugerido | Severidade |
|-------|-------|----------|------------|
| 187 | `Descricao` | `Descrição` | baixa |
| 263 | `Recorrencia` | `Recorrência` | baixa |
| 313 | `Salvar Alteracoes` | `Salvar Alterações` | baixa |

### `apps/web/src/components/financial/revenue-breakdown.tsx` — 2 findings

| Linha | Atual | Sugerido | Severidade |
|-------|-------|----------|------------|
| 19 | `{ key: 'revenue_cartao', label: 'Cartao' }` | `{ key: 'revenue_cartao', label: 'Cartão' }` | baixa |
| 55 | `Nenhuma receita no periodo` | `Nenhuma receita no período` | baixa |

### `apps/web/src/components/financial/payment-selector.tsx` — 2 findings

| Linha | Atual | Sugerido | Severidade |
|-------|-------|----------|------------|
| 16 | `{ value: 'cartao', label: 'Cartao' }` | `{ value: 'cartao', label: 'Cartão' }` | baixa |
| 99 | `Unico` | `Único` | baixa |

### `apps/web/src/components/driver/delivery-confirm-sheet.tsx` — 2 findings

| Linha | Atual | Sugerido | Severidade |
|-------|-------|----------|------------|
| 50 | `Observacao (opcional)` | `Observação (opcional)` | baixa |
| 56 | `Alguma observacao? (opcional)` | `Alguma observação? (opcional)` | baixa |

### `apps/web/src/components/orders/address-selector.tsx` — 2 findings

| Linha | Atual | Sugerido | Severidade |
|-------|-------|----------|------------|
| 55 | `Endereco de entrega` | `Endereço de entrega` | baixa |
| 73 | `Padrao` | `Padrão` | baixa |

### `apps/web/src/components/clients/client-prices-table.tsx` — 1 finding

| Linha | Atual | Sugerido | Severidade |
|-------|-------|----------|------------|
| 76 | `Precos Especiais` | `Preços Especiais` | baixa |

### `apps/web/src/components/clients/client-balance.tsx` — 1 finding

| Linha | Atual | Sugerido | Severidade |
|-------|-------|----------|------------|
| 22 | `Sem debito pendente` | `Sem débito pendente` | baixa |

### `apps/web/src/components/deliveries/route-builder.tsx` — 1 finding

| Linha | Atual | Sugerido | Severidade |
|-------|-------|----------|------------|
| 86 | `Adicione pedidos da lista ao lado e ordene a sequencia de entrega.` | `Adicione pedidos da lista ao lado e ordene a sequência de entrega.` | baixa |

### `apps/web/src/components/driver/delivery-card.tsx` — 1 finding

| Linha | Atual | Sugerido | Severidade |
|-------|-------|----------|------------|
| 16 | `cartao: 'Cartao',` | `cartao: 'Cartão',` | baixa |

### `apps/web/src/components/loading/loading-bottom-sheet.tsx` — 1 finding

| Linha | Atual | Sugerido | Severidade |
|-------|-------|----------|------------|
| 199 | `Pedidos Incluidos ({selectedOrders.length})` | `Pedidos Incluídos ({selectedOrders.length})` | baixa |

### `apps/web/src/components/orders/client-search.tsx` — 1 finding

| Linha | Atual | Sugerido | Severidade |
|-------|-------|----------|------------|
| 116 | `{priceCount} preco{...}` | `{priceCount} preço{...}` | baixa |

### `apps/web/src/components/orders/order-action-bar.tsx` — 2 findings

| Linha | Atual | Sugerido | Severidade |
|-------|-------|----------|------------|
| 36 | `Excluir ... cancelado...? Esta acao nao pode ser desfeita.` | `Excluir ... cancelado...? Esta ação não pode ser desfeita.` | baixa |
| 51 | `${deleted} pedido... excluido...` | `${deleted} pedido... excluído...` | baixa |

### `apps/web/src/components/orders/product-catalog.tsx` — 1 finding

| Linha | Atual | Sugerido | Severidade |
|-------|-------|----------|------------|
| 179 | `Cadastre produtos para comecar a lancar pedidos` | `Cadastre produtos para começar a lançar pedidos` | baixa |

### `apps/web/src/hooks/use-printer.ts` — 2 findings

| Linha | Atual | Sugerido | Severidade |
|-------|-------|----------|------------|
| 65 | `Impressora nao conectada` | `Impressora não conectada` | baixa |
| 126 | `Teste de Impressao` | `Teste de Impressão` | baixa |

### `apps/web/src/lib/bluetooth/receipt.ts` — 2 findings

| Linha | Atual | Sugerido | Severidade |
|-------|-------|----------|------------|
| 37 | `` `${data} as ${hora}` `` | `` `${data} às ${hora}` `` | baixa |
| 107 | `.text('AGRADECEMOS A PREFERENCIA')` | `.text('AGRADECEMOS A PREFERÊNCIA')` | baixa |

### `apps/web/src/lib/validations/client.ts` — 2 findings

| Linha | Atual | Sugerido | Severidade |
|-------|-------|----------|------------|
| 4 | `Nome do cliente obrigatorio` | `Nome do cliente obrigatório` | baixa |
| 23 | `Preco deve ser >= 0` | `Preço deve ser >= 0` | baixa |

### `apps/web/src/app/(authenticated)/clients/[id]/edit/page.tsx` — 2 findings

| Linha | Atual | Sugerido | Severidade |
|-------|-------|----------|------------|
| 65 | `Cliente nao encontrado` | `Cliente não encontrado` | baixa |
| 77 | `Precos especiais` | `Preços especiais` | baixa |

### `apps/web/src/app/(authenticated)/clients/[id]/page.tsx` — 2 findings

| Linha | Atual | Sugerido | Severidade |
|-------|-------|----------|------------|
| 38 | `Cliente nao encontrado.` | `Cliente não encontrado.` | baixa |
| 93 | `Pagamento padrao:` | `Pagamento padrão:` | baixa |

### `apps/web/src/app/(authenticated)/stats/page.tsx` — 3 findings

| Linha | Atual | Sugerido | Severidade |
|-------|-------|----------|------------|
| 38 | `Mes` | `Mês` | baixa |
| 44 | `Estatisticas` | `Estatísticas` | baixa |
| 67 | `ate` | `até` | baixa |

### `apps/web/src/app/(authenticated)/loading/page.tsx` — 2 findings

| Linha | Atual | Sugerido | Severidade |
|-------|-------|----------|------------|
| 19 | `Lancado` | `Lançado` | baixa |
| 71 | `Buscar por cliente ou numero...` | `Buscar por cliente ou número...` | baixa |

### `apps/web/src/app/layout.tsx` — 1 finding

| Linha | Atual | Sugerido | Severidade |
|-------|-------|----------|------------|
| 21 | `Gestao de vendas e distribuicao` | `Gestão de vendas e distribuição` | baixa |

### `apps/web/src/app/login/page.tsx` — 1 finding

| Linha | Atual | Sugerido | Severidade |
|-------|-------|----------|------------|
| 46 | `Email ou senha invalidos.` | `Email ou senha inválidos.` | baixa |

### `apps/web/src/app/api/settlements/generate/route.ts` — 1 finding

| Linha | Atual | Sugerido | Severidade |
|-------|-------|----------|------------|
| 30 | `account_id, period_start e period_end sao obrigatorios` | `account_id, period_start e period_end são obrigatórios` | baixa |

### `apps/web/src/hooks/use-loading.ts` — 1 finding

| Linha | Atual | Sugerido | Severidade |
|-------|-------|----------|------------|
| 29 | `Nao foi possivel carregar os pedidos de carregamento.` | `Não foi possível carregar os pedidos de carregamento.` | baixa |

### `apps/web/src/hooks/use-cep-lookup.ts` — 1 finding

| Linha | Atual | Sugerido | Severidade |
|-------|-------|----------|------------|
| 56 | `CEP nao encontrado` | `CEP não encontrado` | baixa |

### `apps/web/src/hooks/use-cnpj-lookup.ts` — 1 finding

| Linha | Atual | Sugerido | Severidade |
|-------|-------|----------|------------|
| 52 | `CNPJ nao encontrado` | `CNPJ não encontrado` | baixa |

### `apps/web/src/hooks/use-deliveries.ts` — 1 finding

| Linha | Atual | Sugerido | Severidade |
|-------|-------|----------|------------|
| 92 | `Erro ao carregar pedidos disponiveis` | `Erro ao carregar pedidos disponíveis` | baixa |

### `apps/web/src/app/(authenticated)/deliveries/page.tsx` — 1 finding

| Linha | Atual | Sugerido | Severidade |
|-------|-------|----------|------------|
| 234 | `Nao foi possivel carregar as entregas.` | `Não foi possível carregar as entregas.` | baixa |

### `apps/web/src/app/(authenticated)/financial/settlements/[id]/page.tsx` — 1 finding

| Linha | Atual | Sugerido | Severidade |
|-------|-------|----------|------------|
| 67 | `Acerto nao encontrado.` | `Acerto não encontrado.` | baixa |

### `apps/web/src/app/(authenticated)/financial/vouchers/page.tsx` — 1 finding

| Linha | Atual | Sugerido | Severidade |
|-------|-------|----------|------------|
| 67 | `Nao foi possivel carregar os vales.` | `Não foi possível carregar os vales.` | baixa |

### `apps/web/src/app/(authenticated)/products/[id]/page.tsx` — 1 finding

| Linha | Atual | Sugerido | Severidade |
|-------|-------|----------|------------|
| 80 | `Produto nao encontrado.` | `Produto não encontrado.` | baixa |

### `apps/web/src/app/(authenticated)/layout.tsx` — 1 finding

| Linha | Atual | Sugerido | Severidade |
|-------|-------|----------|------------|
| 32 | `Sua conta nao esta vinculada a nenhuma empresa ativa. Entre em contato com o administrador.` | `Sua conta não está vinculada a nenhuma empresa ativa. Entre em contato com o administrador.` | baixa |

---

## 3. Top Correções de Alta Visibilidade

Nenhum finding foi classificado como severidade **alta** ou **média** — todos os 176 são **baixa**.

Ainda assim, dentro do conjunto de baixa severidade, estas são as de **maior visibilidade** (labels de navegação, títulos de página e rótulos que o usuário vê em quase toda sessão). Recomenda-se priorizá-las na aplicação:

| Arquivo | Linha | Atual → Sugerido | Contexto de visibilidade |
|---------|-------|------------------|--------------------------|
| `components/layout/sidebar.tsx` | 23 | `Inicio` → `Início` | Menu lateral — visível em todas as telas |
| `components/layout/sidebar.tsx` | 40 | `Estatisticas` → `Estatísticas` | Menu lateral — visível em todas as telas |
| `components/layout/sidebar.tsx` | 45 | `Configuracoes` → `Configurações` | Menu lateral — visível em todas as telas |
| `app/layout.tsx` | 21 | `Gestao de vendas e distribuicao` → `Gestão de vendas e distribuição` | `<meta description>` — SEO, previews, PWA |
| `app/(authenticated)/settings/page.tsx` | 52 | `Configuracoes` → `Configurações` | Título da página de Configurações |
| `app/(authenticated)/stats/page.tsx` | 44 | `Estatisticas` → `Estatísticas` | Título da página de Estatísticas |
| `app/(authenticated)/dashboard/page.tsx` | 54 | `Visao geral do negocio` → `Visão geral do negócio` | Subtítulo do Dashboard (tela inicial) |
| `app/(authenticated)/dashboard/page.tsx` | 104/140 | `Ticket medio` → `Ticket médio` | Card de métrica do Dashboard |
| `app/login/page.tsx` | 46 | `Email ou senha invalidos.` → `Email ou senha inválidos.` | Erro na tela de login (primeiro contato) |
| `components/clients/client-form.tsx` | 169/177 | `Pessoa Fisica`/`Pessoa Juridica` → `Física`/`Jurídica` | Toggle PF/PJ no cadastro de cliente |

---

## 4. Nota sobre o Método

Esta auditoria seguiu um processo de **duas etapas**: identificação automatizada de strings com acentuação/pontuação pt-BR incorreta, seguida de **verificação adversarial** finding-a-finding. Cada correção foi confirmada como **texto de UI puro** (`confirmed_ui: true`) — rótulos JSX, props `label`/`title`/`placeholder`/`description`, conteúdos de `<CardTitle>`/`<option>`, mensagens `setError`/`toast`/`confirm()`, `aria-label` e linhas de recibo impresso.

Em todos os casos verificou-se que a correção **não toca** chaves de objeto, valores de enum acoplados ao backend (ex.: `value: 'cartao'`, `'lancado'`, `'variavel'`, `'manutencao'`), identificadores (`id`, `htmlFor`), `className`, comentários ou payloads de API/banco. Onde havia par label/value (dropdowns, filtros, mapas `PAYMENT_LABELS`), apenas o **label visível** é alterado; o **value/chave persistida permanece intacto**.

**Ressalvas registradas para a aplicação:**
- `lib/mask-utils.ts:59` — o teste `mask-utils.test.ts:151` faz `toBe('CPF ou CNPJ invalido')`; o literal do teste deve ser atualizado junto com a correção, senão a suíte quebra.
- Recibos térmicos (`use-printer.ts`, `lib/bluetooth/receipt.ts`) — a renderização de acentos depende do code page da impressora ESC/POS (CP850/CP860); é questão de encoding da camada de impressão, não da correção do texto.
- Alguns findings corrigem também **erros gramaticais de pluralização** (ex.: `variacao{'es'}` → `variação{'ões'}`), além do acento.