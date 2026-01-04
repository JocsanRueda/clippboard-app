import React, { useEffect, useState } from "react";

interface CopyToastProps {
  onComplete: () => void;
  text?: string;
}

// Toast component to show copy confirmation
const CopyToast: React.FC<CopyToastProps> = ({
  onComplete,
  text
}) => {
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {

    // eslint-disable-next-line no-undef
    const exitTimer = setTimeout(() => setIsExiting(true), 1500);
    // eslint-disable-next-line no-undef
    const removeTimer = setTimeout(() => onComplete(), 1800);

    return () => {
      // eslint-disable-next-line no-undef
      clearTimeout(exitTimer);
      // eslint-disable-next-line no-undef
      clearTimeout(removeTimer);
    };
  }, [onComplete]);

  return (
    <div
      className={`
        flex items-center gap-0.5 px-2 py-1.5
        bg-secondary  backdrop-blur-md 
        border border-width-selected dark:border-tertiary-dark hover:border-tertiary-light rounded-md 
        shadow-[0_4px_12px_rgba(0,0,0,0.5)]
        pointer-events-none transition-all duration-300 ease-in-out
        ${isExiting ? "opacity-0 translate-x-2" : "opacity-100 translate-x-0"}
      `}
      style={{
        animation: "toast-in 0.25s ease-out forwards"
      }}
    >

      {/* <svg
        className="w-3 h-3 text-teal-400"
        fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
      </svg> */}

      <span className="text-xs font-medium text-teal-50/90 tracking-tight">
        {text}
      </span>

      <style>{`
        @keyframes toast-in {
          0% { opacity: 0; transform: scale(0.9) translateX(10px); }
          100% { opacity: 1; transform: scale(1) translateX(0); }
        }
      `}</style>
    </div>
  );
};

export default CopyToast;
