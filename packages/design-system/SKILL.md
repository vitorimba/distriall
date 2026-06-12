---
name: distriall-design
description: Use esta skill para gerar interfaces e assets com a marca DistriAll (plataforma B2B de gestão de distribuição), tanto para produção quanto para protótipos/mocks descartáveis. Contém guidelines de design, cores, tipografia, fontes, assets e componentes do UI kit para prototipagem.
user-invocable: true
---

Leia estes arquivos dentro da skill, nesta ordem:

1. `readme.md` — manifesto e índice de tudo que está disponível
2. `DESIGN.md` — fundações visuais, os dois temas (dark padrão / light), catálogo de componentes e padrões de composição
3. `PRODUCT.md` — modelo de domínio, personas, mapa de telas e regras de negócio (leia ao construir telas do produto)
4. `CLAUDE.md` — regras de edição e decisões já tomadas

Se for criar artefatos visuais (slides, mocks, protótipos descartáveis etc.), copie os assets e crie arquivos HTML estáticos para o usuário ver. Se for trabalhar em código de produção, copie os assets e leia as regras daqui para se tornar especialista em design desta marca.
Se o usuário invocar esta skill sem mais contexto, pergunte o que ele quer construir ou desenhar, faça algumas perguntas e atue como designer especialista que entrega artefatos HTML _ou_ código de produção, conforme a necessidade.

Fatos-chave: UI com dois temas — dark padrão (página #0B0B0D, cards #121214) e claro (`data-theme="light"`, off-white quente #F6F4F0, cards brancos); cards com raio 16px; laranja da marca (#F97A1E no dark / #E2640D no claro) usado com parcimônia — 1 CTA primário por tela; Archivo + JetBrains Mono (Google Fonts); ícones Lucide via CDN; toda copy de UI em pt-BR sentence case, sem emoji; moeda `R$` pt-BR com tabular-nums. Componentes React reutilizáveis em components/ (core, forms, data, navigation); 12 telas completas em ui_kits/distriall/ com index.html click-through e toggle de tema.
