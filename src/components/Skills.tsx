import { SectionHeader } from "@/components/fx"
import { motion } from "framer-motion"
import { KeyRound, Server, ShieldCheck } from "lucide-react"
import type { ReactNode } from "react"
import { useTranslation } from "react-i18next"
import {
  SiAmazons3, SiAngular, SiDart, SiFlutter, SiGit, SiIonic, SiJavascript, SiJest, SiMongodb, SiNestjs,
  SiNodedotjs, SiPostgresql, SiReact, SiReactivex, SiSass, SiTypescript, SiVuedotjs,
} from "react-icons/si"

type Skill = [string, ReactNode, string]

const groups: Record<string, Skill[]> = {
  front: [
    ["TypeScript", <SiTypescript />, "211 60% 48%"], ["Angular", <SiAngular />, "348 83% 47%"], ["React", <SiReact />, "193 95% 60%"],
    ["Vue", <SiVuedotjs />, "153 47% 49%"], ["RxJS", <SiReactivex />, "330 70% 50%"], ["JavaScript", <SiJavascript />, "50 90% 50%"], ["SCSS", <SiSass />, "330 50% 60%"],
  ],
  mobile: [["React Native", <SiReact />, "193 95% 60%"], ["Flutter", <SiFlutter />, "199 100% 47%"], ["Ionic", <SiIonic />, "206 100% 55%"], ["Dart", <SiDart />, "199 85% 45%"]],
  back: [
    ["NestJS", <SiNestjs />, "340 82% 52%"], ["Node.js", <SiNodedotjs />, "120 40% 45%"], ["REST APIs", <Server />, "262 83% 58%"],
    ["PostgreSQL", <SiPostgresql />, "210 50% 45%"], ["MongoDB", <SiMongodb />, "120 60% 40%"],
  ],
  quality: [
    ["JWT · 2FA", <KeyRound />, "262 83% 58%"], ["LGPD", <ShieldCheck />, "160 60% 45%"], ["AWS S3", <SiAmazons3 />, "10 80% 55%"],
    ["Jest", <SiJest />, "0 60% 45%"], ["Git", <SiGit />, "10 85% 55%"],
  ],
}

export default function Skills() {
  const { t } = useTranslation()

  return (
    <section id="stack" className="scroll-mt-24 px-6 py-28">
      <div className="container mx-auto max-w-6xl">
        <SectionHeader eyebrow={t("stack.eyebrow")} prefix={t("stack.prefix")} highlight={t("stack.highlight")} subtitle={t("stack.subtitle")} />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {Object.entries(groups).map(([g, list], i) => (
            <motion.div
              key={g}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className="glass-card p-6"
            >
              <h3 className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">{t(`stack.groups.${g}`)}</h3>
              <ul className="space-y-1">
                {list.map(([name, icon, hue]) => (
                  <li
                    key={name}
                    style={{ "--chip": hue } as React.CSSProperties}
                    className="group flex items-center gap-3 rounded-lg px-2 py-2 text-sm font-medium transition-colors hover:bg-[hsl(var(--chip)/0.1)]"
                  >
                    <span className="text-lg text-muted-foreground transition-colors group-hover:text-[hsl(var(--chip))]">{icon}</span>
                    {name}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
