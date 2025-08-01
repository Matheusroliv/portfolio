import { Card } from "@/components/ui/card";
import { Cpu, Globe, LayoutDashboard, LayoutList, Server, Users } from "lucide-react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  SiAmazon,
  SiAngular,
  SiBootstrap,
  SiCplusplus,
  SiCss3,
  SiDocker,
  SiGit, SiGithub, SiGithubactions,
  SiGraphql,
  SiHtml5,
  SiIonic,
  SiJasmine,
  SiJavascript,
  SiJest,
  SiJira,
  SiMongodb,
  SiMui,
  SiNestjs,
  SiNodedotjs,
  SiPostgresql,
  SiReact,
  SiSendgrid,
  SiStyledcomponents,
  SiTailwindcss,
  SiTwilio,
  SiTypescript
} from "react-icons/si";
import Reveal from "./Reveal";

export default function Skills() {
  const { t } = useTranslation();
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    const id = setTimeout(() => setAnimated(true), 400);
    return () => clearTimeout(id);
  }, []);

  const icons: Record<string, JSX.Element> = {
    JavaScript: <SiJavascript />,
    TypeScript: <SiTypescript />,
    "React.js": <SiReact />,
    Angular: <SiAngular />,
    "Node.js": <SiNodedotjs />,
    "React Native": <SiReact />,
    NestJS: <SiNestjs />,
    "Ionic Framework": <SiIonic />,
    "REST APIs": <Server />,
    AWS: <SiAmazon />,
    Docker: <SiDocker />,
    "Tailwind CSS": <SiTailwindcss />,
    "Material-UI": <SiMui />,
    "styled-components": <SiStyledcomponents />,
    Jest: <SiJest />,
    "React Hooks": <SiReact />,
    AngularJS: <SiAngular />,
    i18n: <Globe />,
    GraphQL: <SiGraphql />,
    Jasmine: <SiJasmine />,
    MongoDB: <SiMongodb />,
    PostgreSQL: <SiPostgresql />,
    Twilio: <SiTwilio />,
    SendGrid: <SiSendgrid />,
    Git: <SiGit />,
    GitHub: <SiGithub />,
    "CI / CD": <SiGithubactions />,
    Jira: <SiJira />,
    Kanban: <LayoutDashboard />,
    Scrum: <Users />,
    "Agile Methodologies": <Globe />,
    Scrumban: <LayoutList />,
    HTML5: <SiHtml5 />,
    CSS: <SiCss3 />,
    Bootstrap: <SiBootstrap />,
    "Web Engineering": <Globe />,
    "Software Infrastructure": <Server />,
    "C++": <SiCplusplus />
  };

  const skills = [
    "JavaScript", "TypeScript", "React.js", "Angular", "Node.js", "React Native",
    "NestJS", "Ionic Framework", "REST APIs", "AWS", "Docker",
    "Tailwind CSS", "Material-UI", "styled-components", "Jest",
    "React Hooks", "AngularJS", "i18n", "GraphQL", "Karma", "Jasmine",
    "MongoDB", "PostgreSQL", "Twilio", "SendGrid",
    "Git", "GitHub", "CI / CD", "Jira", "Kanban", "Scrum",
    "Agile Methodologies", "Scrumban",
    "HTML5", "CSS", "Bootstrap", "Web Engineering",
    "Software Infrastructure", "Microsoft Excel", "C++"
  ];

  return (
    <section className="py-20 px-6 bg-muted/30">
      <div className="container mx-auto">
        <Card className="glass-card p-8 max-w-6xl mx-auto">
          <h3 className="text-2xl font-bold mb-6 text-center">
            {t("skills.title", "Tech Stack")}
          </h3>

          <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
            {skills.map((tech, i) => (
              <Reveal key={tech} dir="up" delay={i * 0.02}>
                <div
                  className="
      p-3 glass-card text-center text-sm font-medium
      flex flex-col items-center gap-2
      hover:scale-110 transition-transform
    "
                >
                  <span className="text-xl">{icons[tech] ?? <Cpu />}</span>
                  {tech}
                </div>
              </Reveal>
            ))}
          </div>
        </Card>
      </div>
    </section>
  );
}