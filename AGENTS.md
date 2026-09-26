# AGENTS.md — Portfólio Matheus Oliveira

Guia para agentes de IA (e humanos) que trabalham neste repositório.

## O que é

Portfólio pessoal single-page cujo foco é a galeria de sites em `/#sites` e
`/sites/:slug`. SPA em **Vite + React 18 + TypeScript**, **Tailwind CSS 3** +
**shadcn/ui**, internacionalizado (pt/en) e com tema claro/escuro. Estética:
**dark aurora + glassmorphism**, accent **violeta**, micro-interações via
**Framer Motion**. O hero tem uma cena **Three.js** (`DevScene`): avatar na
cadeira, digitando.

O produto do portfólio é mostrar sites completos rodando dentro dele. Cada site
só carrega quando o card é aberto (`import()` dinâmico).

## Comandos

| comando | descrição |
|---------|-----------|
| `npm run dev` | dev server (Vite) em `http://localhost:8080` |
| `npm run build` | build de produção (`dist/`) |
| `npm run build:dev` | build em modo development |
| `npm run preview` | serve o build gerado |
| `npm run lint` | ESLint |

Gerenciador: o repo tem `bun.lockb` **e** `package-lock.json`. Use **npm**.
Não misture os dois. Não adicione dependência sem pedido explícito.

## Rotas

| path | o que faz |
|------|-----------|
| `/` | landing: Hero, Sites, Serviços, Experiência, Stack, Contato |
| `/#sites` | ancora da galeria (o voltar dos sites cai aqui) |
| `/sites` | redireciona para `/#sites` |
| `/sites/:slug/*` | site embutido (`SiteViewer`: barra de voltar + loader + chunk lazy) |
| `*` | 404 |

A navbar some em `/sites/:slug`. A barra fina de "Voltar ao portfólio" é do
`SiteViewer`, não do site embutido.

## Estrutura

```
index.html              # meta SEO/OG; JSON-LD entra em runtime via Helmet
public/                 # favicons, robots.txt, sitemap.xml, CV, foto
src/
  App.tsx               # providers + rotas
  index.css             # tokens HSL, glass-card, gradient-text, gradient-button
  i18n.ts               # pt padrão, en fallback
  locales/{pt,en}.json  # strings da casca do portfólio (as duas línguas, mesmas chaves)
  pages/                # Index, SiteViewer, NotFound
  components/           # Navbar, Hero, DevScene, SiteGrid, Services, Experience, Skills, Contact, Footer
  components/ui/        # shadcn (gerado — não editar à mão)
  sites/registry.ts     # lista de sites; cada um com load() lazy
  sites/<slug>/         # site completo, identidade própria, CSS com escopo
  contexts/             # ThemeContext, LocaleContext
  lib/contact.ts        # WhatsApp, e-mail, telefone
```

Landing, nesta ordem: `Hero` → `SiteGrid` → `Services` → `Experience` → `Skills` → `Contact` → `Footer`.

## Como adicionar um site

1. Pasta `src/sites/<slug>/` com `index.tsx` default export (o site inteiro).
2. Entrada em `src/sites/registry.ts`: `slug`, `name`, `cover`, `bg`, `accent`, `tags`, `Logo`, `load: () => import("./<slug>")`.
3. Chave `sites.items.<slug>` em `pt.json` e `en.json` (texto do card, não o conteúdo interno).
4. URL em `public/sitemap.xml`.

O conteúdo interno de um site demonstrativo pode ficar só em português (o Navalha é assim). A casca do portfólio (nav, hero, galeria, loader, voltar) é sempre pt **e** en.

## Convenções

- **Textos da casca:** nunca hardcode. Chave em `src/locales/pt.json` e `src/locales/en.json`, uso com `t("chave")`. As duas línguas têm as mesmas chaves.
- **Cores da casca:** tokens HSL em `src/index.css` (`--background`, `--primary`, `--accent-2`, `--accent-3`) e classes `glass-card`, `gradient-text`, `gradient-button`, `glow-blob`. Sem hex solto nos componentes do portfólio.
- **Sites embutidos:** paleta e fontes próprias, CSS com escopo (Navalha usa `.nv` e a cor `nv` no Tailwind). Não vazam para o portfólio.
- **Tema:** classe `.dark` no `<html>` via `ThemeContext`. Claro e escuro têm que funcionar.
- **Animações:** Framer Motion para entrada. O CSS global zera animação quando `prefers-reduced-motion: reduce`.
- **DevScene:** digitar, piscar, olhar e acenar continuam mesmo com reduced motion. Só o balanço da cadeira, o holograma flutuando e o vapor da caneca param. A cena é lazy, pausa fora da tela e dá dispose no cleanup.
- **Aliases:** `@/` → `src/`.
- **Contato:** WhatsApp, e-mail e telefone vêm de `src/lib/contact.ts`. CV em `public/curriculo-matheus-oliveira.pdf`.

## SEO

- Meta base, Open Graph, Twitter, canonical e hreflang: `index.html`.
- `<title>` e description por idioma: `SeoTitle` (react-helmet-async), com JSON-LD `Person` + `WebSite`.
- Ao criar rota pública, atualize `public/sitemap.xml` e `public/robots.txt`.

## Antes de concluir

1. `npm run build` sem erro de TypeScript.
2. `npm run lint` sem erro novo (os dois erros antigos em `components/ui/command.tsx` e `textarea.tsx` já existiam).
3. Conferir claro/escuro e pt/en na casca do portfólio.
