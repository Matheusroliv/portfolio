import { Helmet } from "react-helmet-async"
import { useTranslation } from "react-i18next"

const SITE_URL = "https://portfolio-matheusrolivs-projects.vercel.app"

export default function SeoTitle() {
  const { t, i18n, ready } = useTranslation()

  const title = ready ? t("title") : "Matheus Oliveira • Portfolio"
  const description = ready ? t("hero.bio") : ""
  const lang = i18n.resolvedLanguage === "en" ? "en" : "pt-BR"

  return (
    <Helmet>
      <html lang={lang} />
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:locale" content={lang === "en" ? "en_US" : "pt_BR"} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <link rel="canonical" href={`${SITE_URL}/`} />
    </Helmet>
  )
}
