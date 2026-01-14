import { EmptyStateGhostTesseract } from "@/svg/Tau";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export function NoResult(){

  const { t } = useTranslation();

  const [proportion, setProportion]= useState<number>(200);

  useEffect(() => {
    const updateDimensions = () => {
      const width= window.innerWidth;

      const svgProportion= Math.min(250, width * 0.5);

      setProportion(svgProportion);
    };
    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  return(

    <div className="flex flex-col justify-center items-center gap-3 h-full ">
      <EmptyStateGhostTesseract width={proportion} height={proportion} message={t("no_history")} />

    </div>
  );
}
