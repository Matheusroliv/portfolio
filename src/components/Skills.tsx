import { Card } from "@/components/ui/card";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { Cpu, Globe, LayoutDashboard, LayoutList, Server, Users } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  SiAmazon, SiAngular, SiBootstrap, SiCplusplus, SiCss3, SiDocker, SiGit, SiGithub,
  SiGithubactions, SiGraphql, SiHtml5, SiIonic, SiJasmine, SiJavascript, SiJest,
  SiJira, SiMongodb, SiMui, SiNestjs, SiNodedotjs, SiPostgresql, SiReact,
  SiSendgrid, SiStyledcomponents, SiTailwindcss, SiTwilio, SiTypescript
} from "react-icons/si";

export default function Skills() {
  const { t } = useTranslation();

  const allSkills = useMemo(
    () => [
      "JavaScript", "TypeScript", "React.js", "Angular", "Node.js", "React Native",
      "NestJS", "Ionic Framework", "REST APIs", "AWS", "Docker",
      "Tailwind CSS", "Material-UI", "styled-components", "Jest",
      "React Hooks", "AngularJS", "i18n", "GraphQL", "Karma", "Jasmine",
      "MongoDB", "PostgreSQL", "Twilio", "SendGrid",
      "Git", "GitHub", "CI / CD", "Jira", "Kanban", "Scrum",
      "Agile Methodologies", "Scrumban",
      "HTML5", "CSS", "Bootstrap", "Web Engineering",
      "Software Infrastructure", "Microsoft Excel", "C++",
    ],
    []
  );

  const icons: Record<string, JSX.Element> = {
    JavaScript: <SiJavascript />, TypeScript: <SiTypescript />, "React.js": <SiReact />, Angular: <SiAngular />,
    "Node.js": <SiNodedotjs />, "React Native": <SiReact />, NestJS: <SiNestjs />, "Ionic Framework": <SiIonic />,
    "REST APIs": <Server />, AWS: <SiAmazon />, Docker: <SiDocker />, "Tailwind CSS": <SiTailwindcss />,
    "Material-UI": <SiMui />, "styled-components": <SiStyledcomponents />, Jest: <SiJest />, "React Hooks": <SiReact />,
    AngularJS: <SiAngular />, i18n: <Globe />, GraphQL: <SiGraphql />, Jasmine: <SiJasmine />, MongoDB: <SiMongodb />,
    PostgreSQL: <SiPostgresql />, Twilio: <SiTwilio />, SendGrid: <SiSendgrid />, Git: <SiGit />, GitHub: <SiGithub />,
    "CI / CD": <SiGithubactions />, Jira: <SiJira />, Kanban: <LayoutDashboard />, Scrum: <Users />,
    "Agile Methodologies": <Globe />, Scrumban: <LayoutList />, HTML5: <SiHtml5 />, CSS: <SiCss3 />,
    Bootstrap: <SiBootstrap />, "Web Engineering": <Globe />, "Software Infrastructure": <Server />, "C++": <SiCplusplus />,
  };

  const INITIAL = 12;
  const STEP = 6;
  const TICK = 70;

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
    <section className="py-20 px-6 bg-muted/30">
      <div className="container mx-auto">
        <Card className="glass-card p-8 max-w-6xl mx-auto">
          <h3 className="text-2xl font-bold mb-6 text-center">
            {t("skills.title", "Tech Stack")}
          </h3>

          <div
            ref={parent}
            className="
              grid gap-4
              grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6
            "
          >
            {showing.map((tech, i) => (
              <div
                key={tech}
                className="
                  p-3 glass-card text-center text-sm font-medium
                  flex flex-col items-center gap-2
                  transition-transform duration-200 hover:scale-110
                  opacity-0 translate-y-2
                  data-[mounted=true]:opacity-100 data-[mounted=true]:translate-y-0
                "
                data-mounted="true"
                style={{ transitionDelay: `${(i % STEP) * 20}ms` }}
              >
                <span className="text-xl">{icons[tech] ?? <Cpu />}</span>
                {tech}
              </div>
            ))}
          </div>

          <div className="mt-8 flex justify-center gap-3">
            <button
              disabled={!canShowMore}
              onClick={() => setTarget(Math.min(allSkills.length, visibleCount + STEP))}
              className="
                px-4 py-2 rounded-md border
                disabled:opacity-40 disabled:cursor-not-allowed
                hover:scale-[1.02] transition
              "
            >
              {t("skills.show_more", "Show more")}
            </button>

            <button
              disabled={!canShowLess}
              onClick={() => setTarget(INITIAL)}
              className="
                px-4 py-2 rounded-md border
                disabled:opacity-40 disabled:cursor-not-allowed
                hover:scale-[1.02] transition
              "
            >
              {t("skills.show_less", "Show less")}
            </button>
          </div>
        </Card>
      </div>
    </section>
  );
}
