import Reveal from "@/components/Reveal";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Mail, MapPin, Phone, Send } from "lucide-react";
import { useTranslation } from "react-i18next";

const mailto =
  "mailto:matheusrdeoliv1@gmail.com?subject=Contato%20via%20Portfolio&body=Ol%C3%A1%20Matheus%2C%0D%0A";

export default function Contact() {
  const { t } = useTranslation();

  const items = [
    { icon: Mail, label: t("contact.email_label"), value: "matheusrdeoliv1@gmail.com", href: mailto },
    { icon: Phone, label: t("contact.phone_label"), value: "+55 (61) 98565-6805", href: "tel:+5561985656805" },
    { icon: MapPin, label: t("contact.location_label"), value: t("contact.location_value"), href: undefined },
  ];

  return (
    <section id="contact" className="relative scroll-mt-24 px-6 py-28">
      <div className="container mx-auto max-w-4xl">
        <Reveal dir="up">
          <div className="mx-auto mb-16 max-w-2xl text-center">
            <span className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
              {t("contact.eyebrow", "Contato")}
            </span>
            <h2 className="mt-3 text-4xl font-bold md:text-5xl">
              {t("contact.title_prefix", "Entre em")}{" "}
              <span className="gradient-text">{t("contact.title_highlight", "Contato")}</span>
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">{t("contact.subtitle")}</p>
          </div>
        </Reveal>

        <div className="grid gap-5 sm:grid-cols-3">
          {items.map((item, i) => {
            const Wrapper = item.href ? "a" : "div";
            return (
              <Reveal key={item.label} dir="up" delay={i * 0.1}>
                <Wrapper
                  {...(item.href ? { href: item.href } : {})}
                  className="glass-card glass-card-glow flex h-full flex-col items-center gap-3 p-6 text-center"
                >
                  <div className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br from-primary/20 to-accent-2/20 ring-1 ring-primary/20">
                    <item.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{item.label}</h3>
                    <p className="mt-1 break-words text-sm text-muted-foreground">{item.value}</p>
                  </div>
                </Wrapper>
              </Reveal>
            );
          })}
        </div>

        <Reveal dir="up" delay={0.35}>
          <div className="glass-card mt-12 flex flex-col items-center gap-6 p-10 text-center">
            <div>
              <h3 className="text-2xl font-bold">{t("contact.cta_title")}</h3>
              <p className="mt-2 text-muted-foreground">{t("contact.cta_body")}</p>
            </div>
            <Button asChild className="gradient-button h-12 rounded-full px-8 text-base">
              <a href={mailto}>
                <Send className="mr-2 h-4 w-4" />
                {t("contact.form.submit", "Enviar Mensagem")}
              </a>
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
