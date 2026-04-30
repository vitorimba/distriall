# Checklist de Seguranca para Vibe Coders

Guia simplificado para quem constroi apps usando Lovable, Bolt, Cursor, Supabase, Vercel e outras ferramentas AI.
Sem jargao complicado. Acoes praticas. Resultados imediatos.

---

## URGENTE — Faca AGORA (se o app ja esta no ar)

### RLS (Row Level Security) — Protecao de Dados no Banco
- [ ] RLS esta HABILITADO em TODAS as tabelas do Supabase?
  - Como verificar: Supabase Dashboard → Table Editor → cada tabela → "RLS Enabled"
  - Se nao: seus dados estao expostos para qualquer pessoa com a URL
- [ ] Cada tabela tem policies definidas? (quem pode ler/escrever o que)
  - Minimo: `auth.uid() = user_id` para que cada usuario so veja seus dados
- [ ] A service_role key NAO esta no frontend? (somente anon key no client)
  - Buscar no codigo: se encontrar `service_role` no frontend, remova AGORA

### Autenticacao (Login)
- [ ] Voce usa Supabase Auth, Auth0, Clerk ou similar? (nunca faca auth do zero)
- [ ] Email de confirmacao habilitado?
- [ ] O usuario precisa de senha para entrar? Senha tem regras minimas?

---

## ALTO — Faca essa semana

### Autorizacao (Permissoes)
- [ ] Autenticacao e autorizacao sao coisas DIFERENTES
  - Autenticacao = "quem e voce?" (login)
  - Autorizacao = "o que voce pode fazer?" (permissoes)
- [ ] Verificacoes de permissao estao no SERVIDOR (nao so no frontend)?
  - Frontend pode ser burlado. Servidor nao.
- [ ] Um usuario consegue ver/editar dados de OUTRO usuario?
  - Teste: logue como user A, tente acessar dados do user B mudando o ID na URL

### API / Endpoints
- [ ] Todas as rotas da API exigem login? (exceto as publicas de proposito)
- [ ] Existe rate limiting? (limite de requests por minuto)
  - Sem isso, um bot pode fazer milhoes de requests
- [ ] A API retorna so os dados necessarios? (nao manda tudo do banco)
- [ ] Inputs sao validados? (tamanho, tipo, formato)

### Secrets e Chaves
- [ ] Arquivo `.env` existe e esta no `.gitignore`?
- [ ] Nenhuma API key ou senha aparece no codigo?
  - Buscar no codigo por: `sk_`, `secret`, `password`, `apikey`
- [ ] Chaves do Stripe/pagamento so no servidor?

---

## MEDIO — Faca esse mes

### LGPD / Privacidade (voce pode levar multa!)
- [ ] Tem politica de privacidade no app/site?
  - Obrigatorio por lei no Brasil. Pode ser simples, mas tem que existir.
- [ ] Pede consentimento antes de coletar dados?
- [ ] O usuario pode deletar sua conta e dados?
- [ ] Voce coleta APENAS os dados necessarios?
  - Nao peca CPF se nao precisa. Nao peca telefone se nao vai ligar.
- [ ] Se usa Google Analytics, pede consentimento primeiro?

### HTTPS e Infraestrutura
- [ ] O app usa HTTPS? (cadeado no browser)
  - Vercel e Netlify fazem isso automaticamente
- [ ] Cloudflare (ou similar) na frente do app?
  - Plano gratuito ja protege contra DDoS
  - Ativa WAF basico
- [ ] Headers de seguranca configurados?
  - Testar em: https://securityheaders.com

### Sessao e Cookies
- [ ] Sessao expira apos inatividade? (nao ficar logado para sempre)
- [ ] Logout funciona de verdade? (invalida a sessao no servidor)
- [ ] Cookies com flags de seguranca? (HttpOnly, Secure, SameSite)

---

## BAIXO — Faca quando puder (mas faca!)

### Monitoramento
- [ ] Voce sabe se alguem esta tentando invadir seu app?
  - Sentry, LogRocket ou similar para monitorar erros
  - Logs de login com falha
- [ ] Backups do banco de dados ativados?
  - Supabase: verificar se point-in-time recovery esta ativo

### Dependencias
- [ ] Roda `npm audit` ou `pnpm audit` regularmente?
  - Mostra vulnerabilidades conhecidas nas suas dependencias
- [ ] Atualiza dependencias regularmente?

### Upload de Arquivos
- [ ] Se aceita upload: valida tipo e tamanho do arquivo?
- [ ] Arquivos nao sao salvos em pastas publicas?
- [ ] Nomes de arquivos sao sanitizados? (sem caracteres especiais)

### Pagamentos (se aplicavel)
- [ ] Usa Stripe, Mercado Pago ou gateway reconhecido?
  - NUNCA processe cartao de credito diretamente
- [ ] Verificacao de pagamento e feita no SERVIDOR via webhook?
- [ ] Nao confia no frontend para confirmar pagamento?

---

## Para Apps com Supabase (Checklist Especifico)

### Dashboard
- [ ] MFA (2FA) habilitado na conta do Supabase
- [ ] Team members com acesso minimo necessario
- [ ] Nao compartilha credenciais de dashboard

### Banco de Dados
- [ ] RLS habilitado em TODAS tabelas (repetindo porque e critico!)
- [ ] Policies testadas (tentar acessar como usuario diferente)
- [ ] Funcoes de banco com `SECURITY DEFINER` revisadas
- [ ] Nao usar `SELECT *` em queries (selecionar so campos necessarios)

### Storage
- [ ] Buckets com policies de acesso definidas
- [ ] Uploads validam tipo MIME no servidor
- [ ] Tamanho maximo de upload configurado
- [ ] Bucket publico so para arquivos realmente publicos

### Edge Functions
- [ ] Secrets configurados via dashboard (nao hardcoded)
- [ ] CORS configurado corretamente
- [ ] Validacao de input em cada function

---

## Para Apps com Vercel / Netlify

- [ ] Variaveis de ambiente configuradas no dashboard (nao no codigo)
- [ ] Preview deployments nao expoe dados de producao
- [ ] Build logs revisados (nao vazam secrets)
- [ ] Dominio customizado com SSL configurado

---

## Como Usar Este Checklist

1. **Comece pelo URGENTE** — Se algum item urgente nao esta feito, pare tudo e corrija
2. **Depois ALTO** — Esses protegem seu app de 80% dos ataques
3. **Depois MEDIO** — Protecao legal (LGPD) e infraestrutura
4. **Por ultimo BAIXO** — Melhoria continua

### Grau de Seguranca

| Items concluidos | Grau | Significado |
|-----------------|------|-------------|
| 90%+ | A | App bem protegido |
| 75-89% | B | Bom, mas revise os gaps |
| 60-74% | C | OK, mas riscos existem |
| 40-59% | D | Preocupante, corrija logo |
| < 40% | F | Perigo! Corrija AGORA |

---

## Links Uteis

- [Supabase RLS Guide](https://supabase.com/docs/guides/auth/row-level-security)
- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Security Headers Check](https://securityheaders.com)
- [SSL Labs Test](https://www.ssllabs.com/ssltest/)
- [LGPD Texto Completo](https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709.htm)
- [Gerador de Politica de Privacidade](https://www.iubenda.com/pt-br/)
