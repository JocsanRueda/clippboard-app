
export const Icon = ({width,height}: {width: number, height: number}) => {

  return (
    <div className="w-24 h-24 bg-gradient-to-br from-emerald-400 to-cyan-500 rounded-2xl mb-5 flex items-center justify-center shadow-lg pr-2">

      <svg viewBox="0 0 100 100" width={width*2} height={height*2} className="text-white drop-shadow-md" fill="none" stroke="currentColor" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" >
        {/* Letra T principal */}
        <path d="M25 25 H 55 M 40 25 V 75" />
        {/* Contorno del portapapeles generado a partir de la T */}
        <path d="M 55 25 H 75 A 5 5 0 0 1 80 30 V 75 A 5 5 0 0 1 75 80 H 40" strokeOpacity="0.6" />
        {/* Líneas de contenido simuladas */}
        <line x1="52" y1="45" x2="70" y2="45" strokeWidth="6" strokeOpacity="0.4" />
        <line x1="52" y1="60" x2="70" y2="60" strokeWidth="6" strokeOpacity="0.4" />
      </svg>
    </div>
  );
};
