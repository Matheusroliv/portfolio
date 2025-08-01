import { Helmet } from "react-helmet-async"
import { useTranslation } from "react-i18next"

export default function SeoTitle() {
  const { t, ready } = useTranslation()

  const title = ready ? t("title") : "Matheus Oliveira • Portfolio"

  return (
    <Helmet>
      <title>{title}</title>
    </Helmet>
  )
}
