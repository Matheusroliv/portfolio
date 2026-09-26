# Matheus Oliveira

Portfólio de desenvolvedor full stack. O site apresenta o trabalho, a trajetória e os projetos como sites completos, cada um com identidade própria, abertos dentro da mesma página.

[portfolio-matheusrolivs-projects.vercel.app](https://portfolio-matheusrolivs-projects.vercel.app/)

## O site

A página abre com uma apresentação e uma cena 3D: um avatar na cadeira, digitando. Abaixo, a galeria de sites é o centro do portfólio. Abrir um card ocupa a tela, carrega o projeto e troca a linguagem visual por completo. Uma barra no topo mantém o vínculo com o portfólio e o caminho de volta.

O primeiro projeto é o Navalha, site de uma barbearia: serviços, valores, equipe, horários e agendamento, com visual próprio e uma cena 3D.

O restante da página cobre serviços, experiência, stack e contato (WhatsApp, e-mail, LinkedIn, GitHub e currículo em PDF). O texto da casca existe em português e inglês, com tema claro e escuro.

## Tecnologias

| Tecnologia | Por que está aqui |
|------------|-------------------|
| React 18 | A landing e cada site embutido são interfaces de componente, com estado local (tema, idioma, agendamento) sem um backend. |
| TypeScript | O portfólio e os sites crescem no mesmo repositório. Tipos pegam rota, conteúdo e props antes do build. |
| Vite | Dev server rápido e build estático, adequado para publicar no Vercel. |
| Tailwind CSS | O visual (claro, escuro, vidro, accent violeta) sai de tokens, não de folhas soltas. Cada site embutido pode ter a própria paleta sem vazar para o resto. |
| React Router | Cada projeto tem URL real (`/sites/navalha` e as telas internas) e continua dentro do portfólio. |
| Framer Motion | A abertura do card, o loader e as trocas de tela são a sensação de “entrar em outro site”. |
| Three.js | A cena do hero e a do Navalha. O peso da biblioteca só entra quando a cena é aberta. |
| i18next | Português e inglês na casca do portfólio, com o mesmo conjunto de textos. |
| react-helmet-async | Título, descrição e dados estruturados por idioma, para busca e pré-visualização do link. |
