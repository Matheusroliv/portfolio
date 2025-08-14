import Reveal from "@/components/Reveal";
import { Card } from "@/components/ui/card";
import { Mail, MapPin, Phone } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const { t } = useTranslation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setFormData({ name: "", email: "", message: "" });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setFormData((p) => ({ ...p, [e.target.name]: e.target.value }));

  return (
    <section id="contact" className="py-20 px-1 bg-muted/30 scroll-mt-24">
      <div className="container mx-auto">
        <Reveal dir="up">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              {t("contact.title_prefix", "Entre em")} {" "}
              <span className="gradient-text">{t("contact.title_highlight", "Contato")}</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t("contact.subtitle", "Tem um projeto em mente? Vamos conversar e transformar suas ideias em realidade.")}
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 gap-12 justify-items-center">
          <div className="space-y-8 w-full max-w-xl">
            {[
              { icon: Mail, label: t("contact.email_label", "Email"), value: "matheusrdeoliv1@gmail.com" },
              { icon: Phone, label: t("contact.phone_label", "Telefone"), value: "+55 (61) 98565-6805" },
              { icon: MapPin, label: t("contact.location_label", "Localização"), value: t("contact.location_value", "Brasil") }
            ].map((item, i) => (
              <Reveal key={item.label} dir="left" delay={i * 0.15}>
                <Card className="glass-card p-6 w-full hover:scale-105 transition-transform">
                  <div className="flex items-center gap-4">
                    <div className="p-3 glass-card">
                      <item.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{item.label}</h3>
                      <p className="text-muted-foreground">{item.value}</p>
                    </div>
                  </div>
                </Card>
              </Reveal>
            ))}

            <Reveal dir="up" delay={0.45}>
              <div className="text-center pt-8">
                <h3 className="text-xl font-semibold mb-4">{t("contact.cta_title", "Vamos trabalhar juntos?")}</h3>
                <p className="text-muted-foreground">
                  {t("contact.cta_body", "Estou sempre aberto a trocar ideias e colaborar em novos projetos criativos. 🚀")}
                </p>
              </div>
            </Reveal>
          </div>

          {/* <Reveal dir="right" delay={0.2}>
            <Card className="glass-card p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">
                    {t("contact.form.name_label", "Nome")}
                  </label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder={t("contact.form.name_placeholder", "Seu nome completo")}
                    required
                    className="bg-background/50 border-border"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    {t("contact.form.email_label", "Email")}
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder={t("contact.form.email_placeholder", "seu@email.com")}
                    required
                    className="bg-background/50 border-border"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2">
                    {t("contact.form.message_label", "Mensagem")}
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder={t("contact.form.message_placeholder", "Conte-me sobre seu projeto...")}
                    rows={6}
                    required
                    className="bg-background/50 border-border resize-none"
                  />
                </div>

                <Button type="submit" className="w-full gradient-button py-3">
                  <Send className="w-4 h-4 mr-2" />
                  {t("contact.form.submit", "Enviar Mensagem")}
                </Button>
              </form>
            </Card>
          </Reveal> */}
        </div>
      </div>
    </section>
  );
}
