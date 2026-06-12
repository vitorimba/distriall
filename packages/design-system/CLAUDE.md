# CLAUDE.md — instruções para agentes neste projeto

Este projeto é o **design system da DistriAll** (plataforma B2B de gestão de distribuição, produto em pt-BR). Ele é consumido por outros projetos — mudanças aqui propagam. Leia antes de editar:

- `readme.md` — manifesto e índice
- `PRODUCT.md` — domínio, telas, regras de negócio
- `DESIGN.md` — fundações visuais, temas, catálogo de componentes

## Regras de edição

1. **Cores só via tokens.** Nunca hardcode hex/rgba em componentes ou telas — use `var(--*)` de `tokens/colors.css`. Toda mudança visual deve funcionar nos **dois temas** (dark padrão e `data-theme="light"`). Texto/ícone accent usa `--accent-fg`; texto de perigo usa `--danger-fg`.
2. **Idioma e tom:** TODA copy de UI em pt-BR, sentence case, tom direto e operacional. Sem emoji, sem Title Case, sem ALL CAPS (exceto micro-rótulos overline). Moeda `R$ 1.234,56` com `tabular-nums` (classe `.num`). Códigos (`#1042`, SKUs) em JetBrains Mono.
3. **Ícones:** somente Lucide, via componente `Icon` (nome kebab-case). Nunca desenhar SVG à mão nem usar emoji/unicode como ícone.
4. **Novo componente** = `<Name>.jsx` + `<Name>.d.ts` + `<Name>.prompt.md` no grupo certo (`components/core|forms|data|navigation`) + seus estados adicionados ao `*.card.html` do diretório. Estilos no CSS do grupo com prefixo `da-`, ou inline via tokens.
5. **Novas telas** vão em `ui_kits/distriall/`, compõem os primitivos (nunca reimplementam Button/Input/etc.), usam dados mock estáticos e entram no roteador do `index.html`. Registrar na tabela do `ui_kits/distriall/README.md`.
6. **Nunca editar** `_ds_bundle.js`, `_ds_manifest.json`, `_adherence.oxlintrc.json` — são gerados. `styles.css` contém apenas linhas de `@import`.
7. Após qualquer edição, rodar `check_design_system` e corrigir o que for apontado.
8. Manter `PRODUCT.md`/`DESIGN.md`/READMEs em dia ao adicionar telas, componentes ou tokens.
9. **Sincronização com o app (obrigatória):** todo componente ou padrão novo criado no design system deve ser **aplicado no app na mesma mudança** — entra em uso em pelo menos uma tela de `ui_kits/distriall/` (desktop e/ou mobile), substituindo qualquer improviso local que fazia o mesmo papel. O catálogo e o app nunca podem divergir.

## Certo vs errado

```jsx
// ✅ certo — token semântico, funciona nos dois temas
<span style={{ color: 'var(--accent-fg)' }}>R$ 1.234,56</span>

// ❌ errado — hex hardcoded, quebra no tema claro
<span style={{ color: '#FB923C' }}>R$ 1.234,56</span>
```

```jsx
// ✅ certo — compõe o primitivo
<Button icon="plus" onClick={onNew}>Novo pedido</Button>

// ❌ errado — reimplementa botão dentro da tela
<button style={{ background: 'orange', borderRadius: 12 }}>NOVO PEDIDO</button>
```

```jsx
// ✅ certo — status como Badge (soft bg + texto na cor)
<Badge tone="vencido" />

// ❌ errado — fundo sólido / texto puro
<span style={{ background: 'red', color: '#fff' }}>VENCIDO</span>
```

## Decisões já tomadas (não reverter sem o usuário pedir)

- Fontes: Archivo + JetBrains Mono via Google Fonts (substituição — sem binários da marca).
- Ícones: Lucide 0.460 via CDN UMD.
- Tema claro: off-white quente `#F6F4F0`; laranja escurece um passo (`--accent` = orange-600 no claro).
- Cores de status: sempre par soft-bg + texto na cor (nunca fundo sólido).
- Interface do motorista usa header verde (exceção intencional ao laranja).
