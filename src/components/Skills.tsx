import Reveal from "@/components/Reveal";
import { Card } from "@/components/ui/card";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { Cpu, Globe, LayoutDashboard, LayoutList, Minus, Plus, Server, Users } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  SiAmazon, SiAngular, SiBootstrap, SiCplusplus, SiCss3, SiDart, SiDocker, SiFlutter,
  SiGit, SiGithub, SiGithubactions, SiGraphql, SiHtml5, SiIonic, SiJasmine, SiJavascript,
  SiJest, SiJira, SiMongodb, SiMui, SiNestjs, SiNodedotjs, SiPostgresql, SiReact,
  SiReactivex, SiSass, SiSendgrid, SiStyledcomponents, SiTailwindcss, SiTwilio,
  SiTypescript, SiVuedotjs
} from "react-icons/si";

const icons: Record<string, JSX.Element> = {
  JavaScript: <SiJavascript />, TypeScript: <SiTypescript />, Dart: <SiDart />, "React.js": <SiReact />,
  Angular: <SiAngular />, "Vue.js": <SiVuedotjs />, Flutter: <SiFlutter />, RxJS: <SiReactivex />, SCSS: <SiSass />,
  "Node.js": <SiNodedotjs />, "React Native": <SiReact />, NestJS: <SiNestjs />, "Ionic Framework": <SiIonic />,
  "REST APIs": <Server />, AWS: <SiAmazon />, Docker: <SiDocker />, "Tailwind CSS": <SiTailwindcss />,
  "Material-UI": <SiMui />, "styled-components": <SiStyledcomponents />, Jest: <SiJest />, "React Hooks": <SiReact />,
  AngularJS: <SiAngular />, i18n: <Globe />, GraphQL: <SiGraphql />, Jasmine: <SiJasmine />, MongoDB: <SiMongodb />,
  PostgreSQL: <SiPostgresql />, Twilio: <SiTwilio />, SendGrid: <SiSendgrid />, Git: <SiGit />, GitHub: <SiGithub />,
  "CI / CD": <SiGithubactions />, Jira: <SiJira />, Kanban: <LayoutDashboard />, Scrum: <Users />,
  "Agile Methodologies": <Globe />, Scrumban: <LayoutList />, HTML5: <SiHtml5 />, CSS: <SiCss3 />,
  Bootstrap: <SiBootstrap />, "Web Engineering": <Globe />, "Software Infrastructure": <Server />, "C++": <SiCplusplus />,
};

const marqueeIcons = [
  "TypeScript", "Angular", "React.js", "Vue.js", "React Native", "Flutter", "Ionic Framework",
  "Node.js", "NestJS", "Tailwind CSS", "GraphQL", "Docker", "AWS", "PostgreSQL", "MongoDB", "Jest",
];

export default function Skills() {
  const { t } = useTranslation();

  const allSkills = useMemo(
    () => [
      "TypeScript", "JavaScript", "Angular", "React.js", "Vue.js", "React Native",
      "Flutter", "Ionic Framework", "Dart", "RxJS", "React Hooks", "AngularJS",
      "NestJS", "Node.js", "REST APIs", "GraphQL", "AWS", "Docker",
      "Tailwind CSS", "SCSS", "Material-UI", "styled-components", "Bootstrap",
      "Jest", "Karma", "Jasmine", "i18n",
      "MongoDB", "PostgreSQL", "Twilio", "SendGrid",
      "Git", "GitHub", "CI / CD", "Jira", "Kanban", "Scrum",
      "Agile Methodologies", "Scrumban",
      "HTML5", "CSS", "Web Engineering",
      "Software Infrastructure", "C++",
    ],
    []
  );

  const INITIAL = 12;
  const STEP = 6;
  const TICK = 60;

  const [visibleCount, setVisibleCount] = useState(INITIAL);
  const [target, setTarget] = useState(INITIAL);
  const [parent] = useAutoAnimate({ duration: 220, easing: "ease-in-out" });

  useEffect(() => {
    if (visibleCount === target) return;
    const dir = target > visibleCount ? 1 : -1;
    const id = setInterval(() => {
      setVisibleCount((curr) => {
        const next = curr + dir;
        if ((dir > 0 && next >= target) || (dir < 0 && next <= target)) {
          clearInterval(id);
          return target;
        }
        return next;
      });
    }, TICK);
    return () => clearInterval(id);
  }, [target, visibleCount]);

  const showing = allSkills.slice(0, visibleCount);
  const canShowMore = visibleCount < allSkills.length;
  const canShowLess = visibleCount > INITIAL;

  return (
    <section id="skills" className="relative scroll-mt-24 px-6 py-28">
      <div className="container mx-auto max-w-6xl">
        <Reveal dir="up">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <span className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
              {t("skills.eyebrow", "Stack")}
            </span>
            <h2 className="mt-3 text-4xl font-bold md:text-5xl">
              {t("skills.title_prefix", "Minhas")}{" "}
              <span className="gradient-text">{t("skills.title", "Tecnologias")}</span>
            </h2>
          </div>
        </Reveal>

        {/* infinite marquee */}
        <div className="marquee-mask relative mb-12 overflow-hidden py-2">
          <div className="marquee-track gap-4">
            {[...marqueeIcons, ...marqueeIcons].map((tech, i) => (
              <div
                key={`${tech}-${i}`}
                className="glass-card flex shrink-0 items-center gap-2.5 px-5 py-3 text-sm font-medium"
              >
                <span className="text-xl text-primary">{icons[tech] ?? <Cpu />}</span>
                {tech}
              </div>
            ))}
          </div>
        </div>

        <Reveal dir="up" delay={0.1}>
          <Card className="glass-card border-0 bg-transparent p-6 md:p-8">
            <div
              ref={parent}
              className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6"
            >
              {showing.map((tech, i) => (
                <div
                  key={tech}
                  className="glass-card glass-card-glow flex flex-col items-center gap-2 p-4 text-center text-sm font-medium"
                  style={{ transitionDelay: `${(i % STEP) * 20}ms` }}
                >
                  <span className="text-2xl text-primary">{icons[tech] ?? <Cpu />}</span>
                  {tech}
                </div>
              ))}
            </div>

            <div className="mt-8 flex justify-center gap-3">
              <button
                disabled={!canShowMore}
                onClick={() => setTarget(Math.min(allSkills.length, visibleCount + STEP))}
                aria-label={t("skills.show_more", "Show more")}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border transition hover:scale-105 hover:border-primary hover:text-primary disabled:cursor-not-allowed disabled:opacity-40"
              >
                <Plus className="h-5 w-5" />
              </button>
              <button
                disabled={!canShowLess}
                onClick={() => setTarget(INITIAL)}
                aria-label={t("skills.show_less", "Show less")}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border transition hover:scale-105 hover:border-primary hover:text-primary disabled:cursor-not-allowed disabled:opacity-40"
              >
                <Minus className="h-5 w-5" />
              </button>
            </div>
          </Card>
        </Reveal>
      </div>
    </section>
  );
}
