import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";

export default function SeoTitle() {
  const { t } = useTranslation();
  return (
    <Helmet>
      <title>{t("title")}</title>
    </Helmet>
  );
}
