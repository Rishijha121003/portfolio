import { useId } from 'react';

/**
 * Lightweight SVG vector wireframe terrain horizon matching the futuristic Midnight Blue + Cyan identity.
 */
export function DigitalTerrain({ className }: { className?: string }) {
  const rawId = useId();
  const idPrefix = rawId.replace(/:/g, '_');
  const maskId = `${idPrefix}-terrain-fade`;

  return (
    <div className={className} aria-hidden="true">
      <svg
        viewBox="0 0 1200 280"
        width="100%"
        height="100%"
        preserveAspectRatio="none"
        fill="none"
      >
        <defs>
          <linearGradient id={maskId} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#fff" stopOpacity="0" />
            <stop offset="35%" stopColor="#fff" stopOpacity="0.3" />
            <stop offset="80%" stopColor="#fff" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#fff" stopOpacity="0.2" />
          </linearGradient>
        </defs>

        <g mask={`url(#${maskId})`}>
          {/* Main Ridge Contour 1 (Highest, with peak under monogram) */}
          <path
            d="
              M 0 210
              Q 150 200, 260 170
              T 480 190
              Q 620 180, 750 115
              T 940 145
              Q 1060 165, 1200 180
            "
            stroke="#55C7E8"
            strokeWidth="1.5"
            strokeOpacity="0.55"
          />

          {/* Ridge Contour 2 */}
          <path
            d="
              M 0 225
              Q 140 215, 270 190
              T 500 205
              Q 640 195, 760 140
              T 950 170
              Q 1070 185, 1200 200
            "
            stroke="#55C7E8"
            strokeWidth="1.2"
            strokeOpacity="0.45"
          />

          {/* Ridge Contour 3 */}
          <path
            d="
              M 0 240
              Q 160 230, 290 210
              T 520 220
              Q 660 210, 780 165
              T 970 195
              Q 1090 205, 1200 220
            "
            stroke="#55C7E8"
            strokeWidth="1"
            strokeOpacity="0.35"
          />

          {/* Ridge Contour 4 */}
          <path
            d="
              M 0 255
              Q 180 245, 310 230
              T 540 235
              Q 680 225, 800 190
              T 990 218
              Q 1110 225, 1200 240
            "
            stroke="#55C7E8"
            strokeWidth="0.8"
            strokeOpacity="0.25"
          />

          {/* Ridge Contour 5 (Base) */}
          <path
            d="
              M 0 270
              Q 200 260, 330 250
              T 560 250
              Q 700 240, 820 215
              T 1010 240
              Q 1130 245, 1200 260
            "
            stroke="#55C7E8"
            strokeWidth="0.8"
            strokeOpacity="0.18"
          />

          {/* Perspective grid ribs & triangulations */}
          {[
            [60, 208, 60, 275],
            [130, 203, 140, 275],
            [200, 185, 220, 275],
            [260, 170, 290, 275],
            [330, 178, 360, 275],
            [400, 184, 430, 275],
            [470, 189, 500, 275],
            [540, 184, 570, 275],
            [610, 175, 640, 275],
            [680, 145, 710, 275],
            [750, 115, 770, 275],
            [810, 128, 830, 275],
            [880, 138, 900, 275],
            [950, 150, 970, 275],
            [1020, 162, 1040, 275],
            [1090, 170, 1110, 275],
            [1160, 176, 1175, 275],
          ].map(([x1, y1, x2, y2], i) => (
            <line
              key={`rib-${i}`}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="#55C7E8"
              strokeWidth="0.75"
              strokeOpacity="0.22"
            />
          ))}

          {/* Glowing node point on prominent mountain peak */}
          <circle cx="750" cy="115" r="2.5" fill="#79DDF3" />
          <circle
            cx="750"
            cy="115"
            r="6"
            stroke="#55C7E8"
            strokeWidth="0.8"
            strokeOpacity="0.5"
          />
        </g>
      </svg>
    </div>
  );
}

