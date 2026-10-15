/** Gradients shared by every shape on the page (referenced as url(#id)). */
export function SvgDefs() {
  return (
    <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id="gSoft" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#F7F7F7" />
          <stop offset="1" stopColor="#D9D9D9" />
        </linearGradient>
        <linearGradient id="gPastel" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#FFC29E" />
          <stop offset="0.55" stopColor="#FF9FC2" />
          <stop offset="1" stopColor="#F06AAE" />
        </linearGradient>
        <linearGradient id="gWhite" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#FFFFFF" stopOpacity="0.95" />
          <stop offset="1" stopColor="#FFFFFF" stopOpacity="0.6" />
        </linearGradient>
        <linearGradient id="gHot" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#FF8A4C" />
          <stop offset="0.5" stopColor="#FF5E8A" />
          <stop offset="1" stopColor="#E0338E" />
        </linearGradient>
      </defs>
    </svg>
  );
}
