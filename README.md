# Portfólio — Matheus Oliveira

Portfólio single-page de um desenvolvedor full stack. O foco é a galeria de
sites: cada projeto abre completo dentro da página, com a própria identidade,
e um botão no topo volta para o portfólio.

No ar: [portfolio-matheusrolivs-projects.vercel.app](https://portfolio-matheusrolivs-projects.vercel.app/)

## Stack

Vite, React 18, TypeScript, Tailwind CSS 3, shadcn/ui, React Router 6,
Framer Motion, Three.js, i18next (pt/en) e tema claro/escuro.

## Scripts

Use **npm** (`package-lock.json`). O `bun.lockb` não está sincronizado.

| comando | o que faz |
|---------|-----------|
| `npm run dev` | dev server em `http://localhost:8080` |
| `npm run build` | build de produção em `dist/` |
| `npm run preview` | serve o build |
| `npm run lint` | ESLint |

## O que tem na página

1. **Hero** — apresentação e uma cena 3D (avatar na cadeira, digitando). Clique no avatar para ele acenar.
2. **Sites** — cards dos projetos. O clique expande o card, mostra um loader e abre o site. Hoje: Navalha (barbearia).
3. **Serviços, experiência, stack e contato** — dados do currículo, WhatsApp e download do PDF.

`/sites` redireciona para `/#sites`. Cada site vive em `/sites/<slug>`.

## Adicionar um site

1. Crie `src/sites/<slug>/` com um `index.tsx` que exporte o site.
2. Registre em `src/sites/registry.ts` (`slug`, capa, cores, logo e `load: () => import("./<slug>")`). O chunk só baixa quando o card abre.
3. Coloque a descrição do card em `src/locales/pt.json` e `src/locales/en.json` (`sites.items.<slug>`).
4. Inclua a URL em `public/sitemap.xml`.

O Navalha (`src/sites/navalha/`) é o modelo: rotas internas, CSS com escopo `.nv` e cena Three.js própria.

Detalhes de convenção para quem for editar o código: `AGENTS.md`.
