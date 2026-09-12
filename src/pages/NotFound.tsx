import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

const NotFound = () => {
  const location = useLocation();
  const { t } = useTranslation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center pt-24">
      <div className="glass-card text-center text-foreground px-12 py-10">
        <h1 className="text-7xl font-bold mb-4 gradient-text">{t("notfound.title", "404")}</h1>
        <p className="text-xl text-muted-foreground mb-6">{t("notfound.message", "Oops! Page not found")}</p>
        <Link to="/" className="text-primary hover:underline">
          {t("notfound.back_home", "Return to Home")}
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
