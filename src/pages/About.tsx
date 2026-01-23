import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
// Asegúrate de tener instalados estos iconos: npm install react-icons
import { getVersion } from "@tauri-apps/api/app";
import { getName } from "@tauri-apps/api/app";
import { FaGithub, FaGlobe, FaReact, FaRust } from "react-icons/fa6";
import { WEB_URLS } from "@/constants/constant";

export function About() {
  const { t } = useTranslation();

  const [version,setVersion]= useState<string>("");
  const [appName,setAppName]= useState<string>("");

  useEffect(() => {
    const loadAppInfo = async () => {
      try {
        const version = await getVersion();
        const name = await getName();
        setAppName(name);

        setVersion(version);
      } catch (error) {
        console.error("Error al obtener la versión:", error);
      }
    };

    loadAppInfo();
  }, []);

  return (

    <div className="h-full w-full flex flex-col bg-gray-100 dark:bg-primary text-gray-800 dark:text-gray-200 transition-colors duration-200 overflow-y-auto scrollbar-thin">

      <div className="flex-1 flex flex-col items-center justify-center p-6 gap-8 pb-12">

        <div className="bg-white dark:bg-secondary p-8 rounded-2xl shadow-sm border border-gray-300 dark:border-tertiary-dark flex flex-col items-center text-center max-w-md w-full transition-colors duration-200">

          <div className="w-24 h-24 bg-gradient-to-br from-emerald-400 to-cyan-500 rounded-2xl mb-5 flex items-center justify-center shadow-lg">
            <span className="text-4xl font-bold text-white">T</span>
          </div>

          <h1 className="text-3xl font-bold mb-2 dark:text-white">{appName}</h1>

          <div className="inline-block px-3 py-1 bg-gray-100 dark:bg-tertiary dark:text-quaternary rounded-md text-sm font-mono mb-6 border border-gray-200 dark:border-tertiary-light">
            {version}
          </div>

          <p className="text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            {t("app_description", "Tu gestor de portapapeles y atajos definitivo. Optimiza tu flujo de trabajo con velocidad y privacidad.")}
          </p>

          <div className="grid  grid-cols-1 xxs:grid-cols-2 gap-4  justify-center items-center">
            <a href={WEB_URLS.GITHUB} target="_blank" rel="noopener noreferrer">
              <SocialButton
                icon={<FaGithub className="w-5 h-5" />}
                label="GitHub"

              />
            </a>
            <a href={WEB_URLS.PERSONAL_WEBSITE} target="_blank" rel="noopener noreferrer">
              <SocialButton
                icon={<FaGlobe className="w-5 h-5" />}
                label="Website"

              />
            </a>
          </div>
        </div>

        <div className="text-center flex flex-col gap-3 text-sm text-gray-500 dark:text-gray-400">
          <div className="flex items-center justify-center gap-2 font-medium ml-auto">
            <span>Hecho con</span>
            {/* Usando colores de marca de Rust y React */}
            <FaRust className="text-[#DEA584] w-5 h-5 inline" title="Rust" />
            <span>&</span>
            <FaReact className="text-[#61DAFB] w-5 h-5 inline animate-spin-slow" title="React" />
          </div>
          <p className="text-xs opacity-75">
            © {new Date().getFullYear()} Jocsan Rueda <br/> Distribuido bajo licencia MIT.
          </p>
        </div>

      </div>
    </div>
  );
}

interface SocialButtonProps {
  icon: React.ReactNode;
  label: string;

}

function SocialButton({ icon, label }: SocialButtonProps) {
  return (
    <button

      className="flex items-center justify-center gap-2 px-3 py-2.5 bg-gray-100 dark:bg-tertiary dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-tertiary-light rounded-lg transition-all duration-200 font-medium border border-transparent hover:border-gray-300 dark:hover:border-tertiary-light active:scale-95 max-w-40  "
    >
      {icon}
      <span>{label}</span>
    </button>
  );
}

export default About;
