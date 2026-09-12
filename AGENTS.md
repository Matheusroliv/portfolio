# AGENTS.md — Portfólio Matheus Oliveira

Guia para agentes de IA (e humanos) que trabalham neste repositório.

## O que é

Portfólio pessoal single-page (com uma página extra de `/games`). SPA em
**Vite + React 18 + TypeScript**, estilizado com **Tailwind CSS 3** + **shadcn/ui**,
internacionalizado (pt/en) e com tema claro/escuro. Estética: **dark aurora + glassmorphism**,
accent **violeta**, com micro-interações via **Framer Motion**.

## Comandos

| comando | descrição |
|---------|-----------|
| `npm run dev` | dev server (Vite) em `http://localhost:8080` |
| `npm run build` | build de produção (`dist/`) |
| `npm run build:dev` | build em modo development |
| `npm run preview` | serve o build gerado |
| `npm run lint` | ESLint |

Gerenciador: o repo tem `bun.lockb` **e** `package-lock.json`. Use **npm** por padrão
(é o que está sincronizado). Não misture os dois.

## Estrutura

```
index.html            # meta tags SEO/OG, JSON-LD é injetado em runtime via Helmet
public/               # favicons, robots.txt, sitemap.xml, og-image
src/
  main.tsx            # entrypoint (HelmetProvider)
  App.tsx             # providers (Theme, Locale, Query, Tooltip) + rotas
  index.css           # design system: tokens CSS, utilitários (glass/gradient/glow), keyframes
  i18n.ts             # config i18next (pt padrão, en fallback)
  locales/{pt,en}.json# TODAS as strings visíveis vivem aqui
  pages/              # Index (landing), games, NotFound
  components/         # Hero, About, Skills, Contact, Footer, Navbar, Reveal, Seo...
  components/ui/      # shadcn/ui (gerado — evite editar à mão)
  components/games/   # TicTacToe, Snake, Checkers, PegSolitaire
  contexts/           # ThemeContext, LocaleContext
  hooks/              # use-in-view, use-mobile, use-toast
```

## Convenções importantes

- **Textos:** nunca hardcode strings de UI. Adicione a chave em `src/locales/pt.json`
  **e** `src/locales/en.json` e use `t("chave")`. As duas línguas devem ter as mesmas chaves.
- **Design system:** cores só via tokens HSL em `src/index.css` (`--background`, `--primary`,
  `--accent-2`, etc.) e classes utilitárias (`glass-card`, `gradient-text`, `text-glow`,
  `gradient-button`, `aurora-bg`). Não espalhe hex soltos pelos componentes.
- **Tema:** classe `.dark` no `<html>`, controlada por `ThemeContext`. Todo estilo precisa
  funcionar em claro **e** escuro.
- **Animações:** Framer Motion para orquestração/entrada; CSS keyframes (em `index.css`)
  para efeitos contínuos (aurora, glow, marquee). Respeite `prefers-reduced-motion`.
- **Aliases:** import com `@/` → `src/`.
- **Games:** o CSS dos jogos (snake/tictactoe/checkers/confetti) vive em `@layer utilities`
  do `index.css`. Não remova.

## SEO / GEO / AEO

- Meta base + OpenGraph + Twitter + canonical + hreflang: `index.html`.
- `<title>` e `<meta description>` por idioma: componente `SeoTitle` (react-helmet-async).
- Dados estruturados JSON-LD (`Person` + `WebSite`): injetados via Helmet em `SeoTitle`.
  São o que alimenta respostas de LLMs (GEO/AEO) e rich results.
- `public/sitemap.xml` e `public/robots.txt` devem ser mantidos atualizados ao criar rotas.

## Verificação antes de concluir

1. `npm run build` deve passar sem erros de TS.
2. `npm run lint` sem novos erros.
3. Conferir claro/escuro e pt/en na UI.
