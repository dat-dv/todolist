import { useId } from "react";

export type DashedDividerProps = React.HTMLAttributes<HTMLDivElement> & {
  maxWidth?: string;
  segments?: number;
  maxDash?: number;
  minDash?: number;
  gap?: number;
  thickness?: number;
  color?: string;
  baseColor?: string;
  fade?: boolean;
  fadeWidth?: string;
  falloff?: number;
  power?: number;
};

const DashedDivider: React.FC<DashedDividerProps> = ({
  className = "",
  maxWidth,
  segments,
  maxDash = 44,
  minDash = 6,
  gap = 8,
  thickness = 3,
  color = "#23243D",
  baseColor = "#e6e7eb",
  fade = true,
  fadeWidth = "3%",
  falloff = 0.98,
  power = 1.8,
  ...rest
}) => {
  const viewW = 1000;
  const viewH = Math.max(2, thickness);
  const center = viewW / 2;

  const uid = useId?.() ?? `dashed-${Math.random().toString(36).slice(2, 9)}`;
  const maskId = `fadeMask-${uid}`;
  const baseGradId = `baseGrad-${uid}`;
  const fadeGradId = `fadeGrad-${uid}`;

  const padding = Math.max(maxDash, 32);
  const usableW = viewW - padding * 2;

  let count: number;
  if (segments && segments > 1) {
    count = segments;
  } else {
    count = Math.max(3, Math.floor(usableW / (minDash + gap)));
    count = Math.min(count, 180);
  }

  const positions = Array.from({ length: count }).map((_, i) => {
    const t = count === 1 ? 0.5 : i / (count - 1);
    return padding + t * usableW;
  });

  const edgeFactor = (posX: number) => {
    const dx = Math.abs(posX - center) / (viewW / 2);
    return Math.min(1, Math.pow(dx, power) * falloff);
  };

  const rawSegments = positions.map((x) => {
    const f = edgeFactor(x);
    const width = minDash + (maxDash - minDash) * (1 - f);
    const opacity = 0.95 - 0.75 * f;
    return { x, width, opacity };
  });

  const adjusted: { x: number; width: number; opacity: number }[] =
    rawSegments.map((r) => ({ ...r }));
  for (let i = 1; i < adjusted.length; i++) {
    const prev = adjusted[i - 1];
    const cur = adjusted[i];
    const prevRight = prev.x + prev.width / 2;
    const curLeft = cur.x - cur.width / 2;
    const distance = curLeft - prevRight;
    if (distance < gap) {
      const deficit = gap - distance;
      const reducePrev = Math.min(prev.width - minDash, deficit * 0.4);
      const reduceCur = Math.min(cur.width - minDash, deficit * 0.6);
      prev.width = Math.max(minDash, prev.width - reducePrev);
      cur.width = Math.max(minDash, cur.width - reduceCur);
      adjusted[i - 1] = prev;
      adjusted[i] = cur;
      const newPrevRight = prev.x + prev.width / 2;
      const newCurLeft = cur.x - cur.width / 2;
      if (newCurLeft - newPrevRight < gap) {
        const extra = gap - (newCurLeft - newPrevRight);
        cur.width = Math.max(minDash, cur.width - extra);
        adjusted[i] = cur;
      }
    }
  }

  return (
    <div
      className={`w-full flex justify-center ${className}`}
      {...rest}
      style={maxWidth ? { maxWidth } : undefined}
    >
      <svg
        viewBox={`0 0 ${viewW} ${viewH}`}
        preserveAspectRatio="none"
        className="w-full block"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
      >
        <defs>
          <linearGradient id={baseGradId} x1="0" x2="1">
            <stop offset="0%" stopColor={baseColor} stopOpacity="0.9" />
            <stop offset="50%" stopColor={baseColor} stopOpacity="0.95" />
            <stop offset="100%" stopColor={baseColor} stopOpacity="0.9" />
          </linearGradient>

          {fade && (
            <>
              <linearGradient id={fadeGradId} x1="0" x2="1">
                <stop offset="0%" stopColor="white" stopOpacity="0" />
                <stop offset={fadeWidth} stopColor="white" stopOpacity="1" />
                <stop
                  offset={`${100 - parseFloat(fadeWidth)}%`}
                  stopColor="white"
                  stopOpacity="1"
                />
                <stop offset="100%" stopColor="white" stopOpacity="0" />
              </linearGradient>

              <mask id={maskId}>
                <rect
                  x="0"
                  y="0"
                  width={viewW}
                  height={viewH}
                  fill={`url(#${fadeGradId})`}
                />
              </mask>
            </>
          )}
        </defs>

        <rect
          x="0"
          y={(viewH - thickness) / 2}
          width={viewW}
          height={thickness}
          rx={thickness / 2}
          fill={`url(#${baseGradId})`}
          opacity={0.7}
        />

        <g mask={fade ? `url(#${maskId})` : undefined}>
          {adjusted.map((s, i) => {
            const rx = thickness / 2;
            const rectX = s.x - s.width / 2;
            const rectY = (viewH - thickness) / 2;
            return (
              <rect
                key={i}
                x={rectX}
                y={rectY}
                width={s.width}
                height={thickness}
                rx={rx}
                fill={color}
                opacity={s.opacity}
              />
            );
          })}
        </g>
      </svg>
    </div>
  );
};

export default DashedDivider;
