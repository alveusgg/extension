import { useRef, useState, useCallback } from "react";

interface ConditionalTiltCardProps extends TiltCardProps {
  disabled?: boolean;
}

export default function ConditionalTiltCard({
  children,
  disabled = false,
  maxTilt = 15,
  glareMaxOpacity = 0.3,
  className = "",
}: Readonly<ConditionalTiltCardProps>) {
  if (disabled) {
    return children;
  }

  return (
    <TiltCard
      maxTilt={maxTilt}
      glareMaxOpacity={glareMaxOpacity}
      className={className}
    >
      {children}
    </TiltCard>
  );
}

interface TiltCardProps {
  children: React.ReactNode;
  maxTilt?: number;
  glareMaxOpacity?: number;
  className?: string;
}

function TiltCard({
  children,
  maxTilt = 15,
  glareMaxOpacity = 0.3,
  className = "",
}: Readonly<TiltCardProps>) {
  const cardRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [tiltStyle, setTiltStyle] = useState<React.CSSProperties>({});
  const [glareStyle, setGlareStyle] = useState<React.CSSProperties>({});
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback(
    (e: { clientX: number; clientY: number }) => {
      if (!cardRef.current || !wrapperRef.current) return;

      const rect = cardRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const mouseX = (e.clientX - centerX) / (rect.width / 2);
      const mouseY = (e.clientY - centerY) / (rect.height / 2);

      const clampedMouseX = Math.max(-1.5, Math.min(1.5, mouseX));
      const clampedMouseY = Math.max(-1.5, Math.min(1.5, mouseY));

      const tiltX = clampedMouseY * maxTilt * -1;
      const tiltY = clampedMouseX * maxTilt;

      const glareX = (Math.max(-1, Math.min(1, mouseX)) + 1) * 50;
      const glareY = (Math.max(-1, Math.min(1, mouseY)) + 1) * 50;

      const distanceFromCenter = Math.sqrt(mouseX * mouseX + mouseY * mouseY);
      const normalizedDistance = Math.min(distanceFromCenter, 1);

      const glareOpacity = Math.pow(normalizedDistance, 0.8) * glareMaxOpacity;

      const glareSize = 70 + normalizedDistance * 40;

      setTiltStyle({
        transform: `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.02, 1.02, 1.02)`,
      });

      setGlareStyle({
        background: `radial-gradient(ellipse ${glareSize * 1.1}% ${glareSize * 0.9}% at ${glareX}% ${glareY}%,
          transparent 0%,
          transparent 70%,
          rgba(255,255,255,${glareOpacity / 4}) 80%,
          transparent 90%,
          rgba(255,255,255,${glareOpacity}) 100%)`,
        opacity: normalizedDistance > 0.1 ? 1 : normalizedDistance / 0.1, // Fade in smoothly
      });
    },
    [maxTilt, glareMaxOpacity],
  );

  const handleMouseEnter = useCallback(() => {
    if (!cardRef.current) return;
    setIsHovered(true);
    cardRef.current.style.transition = "none";
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (!cardRef.current) return;
    setIsHovered(false);

    cardRef.current.style.transition = "transform 0.5s ease-out";

    setTiltStyle({
      transform:
        "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)",
    });

    setGlareStyle({
      background: "none",
      opacity: 0,
    });
  }, []);

  return (
    <div className="relative inline-block">
      <div
        ref={wrapperRef}
        className="pointer-events-none absolute -inset-4"
        onMouseMove={isHovered ? handleMouseMove : undefined}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{ pointerEvents: isHovered ? "auto" : "none" }}
      />

      <div
        ref={cardRef}
        className={`relative overflow-visible will-change-transform ${className}`}
        style={tiltStyle}
        onMouseEnter={handleMouseEnter}
        onMouseMove={isHovered ? handleMouseMove : undefined}
      >
        {children}

        <div
          className="pointer-events-none absolute inset-0 overflow-hidden transition-opacity duration-300"
          style={glareStyle}
        />
      </div>
    </div>
  );
}
