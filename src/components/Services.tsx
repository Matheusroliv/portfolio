import { SectionHeader, Spotlight } from "@/components/fx";
import { motion } from "framer-motion";
import { ArrowUpRight, Boxes, Globe, GraduationCap, RefreshCw, Server, Smartphone } from "lucide-react";
import { useTranslation } from "react-i18next";

const items = [
  { key: "web", icon: Globe, grad: "from-primary to-accent-2" },
  { key: "mobile", icon: Smartphone, grad: "from-accent-3 to-primary" },
  { key: "api", icon: Server, grad: "from-accent-2 to-warm" },
  { key: "saas", icon: Boxes, grad: "from-warm to-accent-2" },
  { key: "migration", icon: RefreshCw, grad: "from-primary to-accent-3" },
  { key: "consulting", icon: GraduationCap, grad: "from-accent-3 to-warm" },
];

export default function Services() {
  const { t } = useTranslation();

  return (
    <section id="services" className="relative scroll-mt-24 px-6 py-28">
      <div className="container mx-auto max-w-6xl">
        <SectionHeader eyebrow={t("services.eyebrow")} prefix={t("services.title_prefix")} highlight={t("services.title")} subtitle={t("services.subtitle")} />

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map(({ key, icon: Icon, grad }, i) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 50, rotate: i % 2 ? 2 : -2 }}
              whileInView={{ opacity: 1, y: 0, rotate: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: (i % 3) * 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              <Spotlight className="group h-full p-7">
                <div className="mb-8 flex items-start justify-between">
                  <div className={`grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br ${grad} text-primary-foreground shadow-lg transition-transform duration-500 group-hover:rotate-[-10deg] group-hover:scale-110`}>
                    <Icon className="h-7 w-7" />
                  </div>
                  <span className="font-mono text-5xl font-black text-foreground/[0.06] transition-colors duration-500 group-hover:text-primary/30">
                    0{i + 1}
                  </span>
                </div>
                <h3 className="flex items-center gap-2 text-xl font-bold">
                  {t(`services.items.${key}.title`)}
                  <ArrowUpRight className="h-5 w-5 -translate-x-2 text-primary opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100" />
                </h3>
                <p className="mt-3 leading-relaxed text-muted-foreground">{t(`services.items.${key}.description`)}</p>
                <div className={`mt-6 h-1 w-10 rounded-full bg-gradient-to-r ${grad} transition-all duration-500 group-hover:w-full`} />
              </Spotlight>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
