import { Magnetic, SectionHeader, Spotlight } from "@/components/fx";
import { Button } from "@/components/ui/button";
import { EMAIL, MAILTO, PHONE_DISPLAY, WHATSAPP_URL } from "@/lib/contact";
import { motion } from "framer-motion";
import { Copy, Mail, MapPin } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { FaWhatsapp } from "react-icons/fa";

export default function Contact() {
  const { t } = useTranslation();
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText(EMAIL).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    });
  };

  const items = [
    { icon: FaWhatsapp, label: t("contact.whatsapp_label"), value: PHONE_DISPLAY, href: WHATSAPP_URL, color: "text-emerald-500" },
    { icon: Mail, label: t("contact.email_label"), value: EMAIL, href: MAILTO, color: "text-accent-2" },
    { icon: MapPin, label: t("contact.location_label"), value: t("contact.location_value"), href: undefined, color: "text-warm" },
  ];

  return (
    <section id="contact" className="relative scroll-mt-24 overflow-hidden px-6 py-28">
      <div className="glow-blob left-1/2 top-1/2 h-[480px] w-[480px] -translate-x-1/2 -translate-y-1/2 bg-primary/30" />
      <div className="container relative mx-auto max-w-4xl">
        <SectionHeader eyebrow={t("contact.eyebrow")} prefix={t("contact.title_prefix")} highlight={t("contact.title_highlight")} subtitle={t("contact.subtitle")} />

        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="conic-border rounded-[2rem]"
        >
          <div className="glass-card flex flex-col items-center gap-8 rounded-[2rem] bg-card/90 p-10 text-center md:p-16">
            <motion.span
              animate={{ rotate: [0, 14, -10, 14, 0] }}
              transition={{ repeat: Infinity, repeatDelay: 2.5, duration: 1.2 }}
              className="text-6xl"
            >
              👋
            </motion.span>
            <div>
              <h3 className="text-3xl font-black md:text-5xl">
                {t("contact.cta_title_1")} <span className="gradient-text">{t("contact.cta_title_hl")}</span>
              </h3>
              <p className="mx-auto mt-4 max-w-lg text-lg text-muted-foreground">{t("contact.cta_body")}</p>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Magnetic strength={0.3}>
                <Button asChild className="gradient-button h-14 rounded-full px-10 text-lg">
                  <a href={WHATSAPP_URL} target="_blank" rel="noreferrer">
                    <FaWhatsapp className="mr-2 h-6 w-6" />
                    {t("contact.whatsapp_cta")}
                  </a>
                </Button>
              </Magnetic>
              <Magnetic strength={0.3}>
                <Button
                  variant="outline"
                  onClick={copyEmail}
                  className="h-14 rounded-full border-primary/40 bg-background/30 px-8 text-base backdrop-blur hover:border-primary hover:bg-primary/10 hover:text-primary"
                >
                  <Copy className="mr-2 h-4 w-4" />
                  {copied ? t("contact.copied") : t("contact.copy_email")}
                </Button>
              </Magnetic>
            </div>
          </div>
        </motion.div>

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {items.map(({ icon: Icon, label, value, href, color }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 + i * 0.1, duration: 0.6 }}
            >
              <Spotlight
                as={href ? "a" : "div"}
                {...(href ? { href, target: "_blank", rel: "noreferrer" } : {})}
                className="flex h-full items-center gap-4 p-5"
              >
                <span className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-muted ${color}`}>
                  <Icon className="h-5 w-5" />
                </span>
                <div className="min-w-0">
                  <div className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">{label}</div>
                  <div className="truncate text-sm font-medium">{value}</div>
                </div>
              </Spotlight>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
