/**
 * Large outlined "AZKA AZEEM" wordmark with an electric pulse travelling
 * around the letter outlines (SVG stroke-dash animation + soft red glow).
 */
export default function LightningWordmark({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 1200 210"
      className={`w-full ${className}`}
      role="img"
      aria-label="Azka Azeem"
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <linearGradient id="wm-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--foreground)" stopOpacity="0.12" />
          <stop offset="100%" stopColor="var(--primary)" stopOpacity="0.04" />
        </linearGradient>
        <filter id="wm-glow" x="-20%" y="-60%" width="140%" height="220%">
          <feGaussianBlur stdDeviation="6" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <g
        textAnchor="middle"
        fontFamily="var(--font-display)"
        fontSize="170"
        letterSpacing="6"
        x="600"
      >
        {/* Soft transparent fill */}
        <text x="600" y="160" fill="url(#wm-fill)">
          AZKA AZEEM
        </text>
        {/* Faint constant outline */}
        <text
          x="600"
          y="160"
          fill="none"
          stroke="var(--foreground)"
          strokeOpacity="0.22"
          strokeWidth="1.2"
        >
          AZKA AZEEM
        </text>
        {/* Travelling red pulse */}
        <text
          x="600"
          y="160"
          fill="none"
          stroke="var(--primary)"
          strokeWidth="2"
          filter="url(#wm-glow)"
          className="wm-pulse"
        >
          AZKA AZEEM
        </text>
        {/* Small white highlight, slightly offset in time */}
        <text
          x="600"
          y="160"
          fill="none"
          stroke="var(--foreground)"
          strokeWidth="1.4"
          filter="url(#wm-glow)"
          className="wm-pulse wm-pulse-white"
        >
          AZKA AZEEM
        </text>
      </g>
    </svg>
  );
}
