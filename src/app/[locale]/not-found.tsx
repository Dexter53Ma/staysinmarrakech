import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

export default async function NotFound() {
  const t = await getTranslations("common");

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <span className="text-3xl font-bold text-gray-400">404</span>
        </div>
        <h2 className="text-xl font-bold text-gray-900 mb-2">{t("notFound")}</h2>
        <p className="text-gray-500 mb-6">
          {t("notFoundDesc")}
        </p>
        <Link
          href="/"
          className="inline-block bg-[#0d47a1] hover:bg-[#0a3a82] text-white font-bold py-2.5 px-6 rounded-lg transition-colors"
        >
          {t("home")}
        </Link>
      </div>
    </div>
  );
}
