import { SectionHeader } from "@/components/fx";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { Cpu, Globe, LayoutDashboard, Server, Users } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  SiAmazon, SiAngular, SiBootstrap, SiCplusplus, SiCss3, SiDart, SiDocker, SiFlutter, SiGit, SiGithub,
  SiGithubactions, SiGraphql, SiHtml5, SiIonic, SiJasmine, SiJavascript, SiJest, SiJira, SiMongodb, SiMui,
  SiNestjs, SiNodedotjs, SiPostgresql, SiReact, SiReactivex, SiSass, SiSendgrid, SiStyledcomponents,
  SiTailwindcss, SiTwilio, SiTypescript, SiVuedotjs,
} from "react-icons/si";

type Skill = { name: string; icon: JSX.Element; hue: string };
const s = (name: string, icon: JSX.Element, hue: string): Skill => ({ name, icon, hue });

/* brand hues as HSL so chips glow in their real identity color */
const groups: Record<string, Skill[]> = {
  frontend: [
    s("Angular", <SiAngular />, "348 83% 47%"), s("React.js", <SiReact />, "193 95% 68%"), s("Vue.js", <SiVuedotjs />, "153 47% 49%"),
    s("TypeScript", <SiTypescript />, "211 60% 48%"), s("JavaScript", <SiJavascript />, "53 93% 54%"), s("RxJS", <SiReactivex />, "330 70% 50%"),
    s("AngularJS", <SiAngular />, "0 70% 50%"), s("HTML5", <SiHtml5 />, "13 77% 52%"), s("CSS", <SiCss3 />, "228 78% 50%"),
    s("SCSS", <SiSass />, "330 50% 60%"), s("Tailwind CSS", <SiTailwindcss />, "189 94% 43%"), s("Material-UI", <SiMui />, "207 90% 54%"),
    s("styled-components", <SiStyledcomponents />, "340 60% 60%"), s("Bootstrap", <SiBootstrap />, "263 57% 52%"), s("i18n", <Globe />, "200 80% 55%"),
  ],
  mobile: [
    s("React Native", <SiReact />, "193 95% 68%"), s("Flutter", <SiFlutter />, "199 100% 47%"), s("Ionic Framework", <SiIonic />, "206 100% 55%"),
    s("Dart", <SiDart />, "199 85% 45%"),
  ],
  backend: [
    s("NestJS", <SiNestjs />, "340 82% 52%"), s("Node.js", <SiNodedotjs />, "120 40% 45%"), s("REST APIs", <Server />, "262 83% 58%"),
    s("GraphQL", <SiGraphql />, "319 100% 44%"), s("PostgreSQL", <SiPostgresql />, "210 50% 40%"), s("MongoDB", <SiMongodb />, "120 60% 40%"),
    s("AWS", <SiAmazon />, "36 100% 50%"), s("Docker", <SiDocker />, "200 90% 50%"), s("Twilio", <SiTwilio />, "0 85% 55%"),
    s("SendGrid", <SiSendgrid />, "210 100% 50%"), s("C++", <SiCplusplus />, "210 70% 45%"),
  ],
  tools: [
    s("Git", <SiGit />, "10 85% 55%"), s("GitHub", <SiGithub />, "0 0% 60%"), s("CI / CD", <SiGithubactions />, "210 90% 55%"),
    s("Jest", <SiJest />, "0 60% 45%"), s("Jasmine", <SiJasmine />, "300 50% 50%"), s("Jira", <SiJira />, "216 100% 50%"),
    s("Scrum", <Users />, "160 60% 45%"), s("Kanban", <LayoutDashboard />, "40 90% 55%"), s("Web Engineering", <Cpu />, "262 83% 58%"),
  ],
};
const tabs = Object.keys(groups);
const marquee = [...groups.frontend.slice(0, 8), ...groups.mobile, ...groups.backend.slice(0, 6)];

function Chip({ sk, i }: { sk: Skill; i: number }) {
  return (
    <motion.li
      layout
      initial={{ opacity: 0, scale: 0.6, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.6, y: -20 }}
      transition={{ type: "spring", stiffness: 300, damping: 22, delay: i * 0.03 }}
      whileHover={{ y: -8, scale: 1.06 }}
      style={{ "--chip": sk.hue } as React.CSSProperties}
      className="group glass-card flex cursor-default flex-col items-center gap-2.5 p-5 text-center text-sm font-medium transition-shadow duration-300 hover:border-[hsl(var(--chip)/0.6)] hover:shadow-[0_18px_40px_-16px_hsl(var(--chip)/0.7)]"
    >
      <span className="text-3xl text-muted-foreground transition-all duration-300 group-hover:scale-110 group-hover:text-[hsl(var(--chip))] group-hover:drop-shadow-[0_0_14px_hsl(var(--chip)/0.8)]">
        {sk.icon}
      </span>
      {sk.name}
    </motion.li>
  );
}

export default function Skills() {
  const { t } = useTranslation();
  const [tab, setTab] = useState(tabs[0]);

  return (
    <section id="skills" className="relative scroll-mt-24 overflow-hidden py-28">
      <div className="container mx-auto max-w-6xl px-6">
        <SectionHeader eyebrow={t("skills.eyebrow")} prefix={t("skills.title_prefix")} highlight={t("skills.title")} subtitle={t("skills.subtitle")} />
      </div>

      {/* two marquees, opposite directions, tilted */}
      <div className="marquee-mask -rotate-2 space-y-4 py-4">
        {[marquee, [...marquee].reverse()].map((row, r) => (
          <div key={r} className={`${r ? "marquee-track-reverse" : "marquee-track"} gap-4`}>
            {[...row, ...row].map((sk, i) => (
              <div
                key={i}
                style={{ "--chip": sk.hue } as React.CSSProperties}
                className="glass-card flex shrink-0 items-center gap-2.5 px-5 py-3 text-sm font-medium"
              >
                <span className="text-xl text-[hsl(var(--chip))]">{sk.icon}</span>
                {sk.name}
              </div>
            ))}
          </div>
        ))}
      </div>

      <div className="container mx-auto mt-16 max-w-6xl px-6">
        <LayoutGroup>
          <div className="mb-8 flex flex-wrap justify-center gap-2">
            {tabs.map((k) => (
              <button
                key={k}
                onClick={() => setTab(k)}
                className={`relative rounded-full px-5 py-2.5 text-sm font-semibold transition-colors ${tab === k ? "text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}
              >
                {tab === k && (
                  <motion.span
                    layoutId="skills-tab"
                    className="gradient-button absolute inset-0 -z-10 rounded-full"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                {t(`skills.categories.${k}`)}
                <span className="ml-2 rounded-full bg-foreground/10 px-1.5 text-[10px]">{groups[k].length}</span>
              </button>
            ))}
          </div>

          <motion.ul layout className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            <AnimatePresence mode="popLayout">
              {groups[tab].map((sk, i) => (
                <Chip key={sk.name} sk={sk} i={i} />
              ))}
            </AnimatePresence>
          </motion.ul>
        </LayoutGroup>
      </div>
    </section>
  );
}
