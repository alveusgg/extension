import {
  useRef,
  useState,
  useCallback,
  forwardRef,
  type CSSProperties,
} from "react";
import { classes } from "../utils/classes";

interface ConditionalTiltCardProps extends TiltCardProps {
  disabled?: boolean;
}

const ConditionalTiltCard = forwardRef<
  HTMLDivElement,
  ConditionalTiltCardProps
>(function ConditionalTiltCard(
  {
    children,
    disabled = true,
    maxTilt = 15,
    glareMaxOpacity = 0.4,
    className = "",
    ...extras
  },
  ref,
) {
  if (disabled) {
    return (
      <div ref={ref} className={className} {...extras}>
        {children}
      </div>
    );
  }

  return (
    <TiltCard
      ref={ref}
      maxTilt={maxTilt}
      glareMaxOpacity={glareMaxOpacity}
      className={className}
      {...extras}
    >
      {children}
    </TiltCard>
  );
});

interface TiltCardProps {
  children: React.ReactNode;
  maxTilt?: number;
  glareMaxOpacity?: number;
  className?: string;
}

const TiltCard = forwardRef<HTMLDivElement, TiltCardProps>(function TiltCard(
  { children, maxTilt = 15, glareMaxOpacity = 0.4, className = "", ...extras },
  ref,
) {
  const cardRef = useRef<HTMLDivElement>(null);

  const callbackRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (ref) {
        if (typeof ref === "function") ref(node);
        else ref.current = node;
      }
      cardRef.current = node;
    },
    [ref],
  );

  const [tiltStyle, setTiltStyle] = useState<CSSProperties>({});
  const [glareStyle, setGlareStyle] = useState<CSSProperties>({});
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback(
    (e: { clientX: number; clientY: number }) => {
      if (!cardRef.current) return;

      const rect = cardRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const mouseX = (e.clientX - centerX) / (rect.width / 2);
      const mouseY = (e.clientY - centerY) / (rect.height / 2);

      const clampedMouseX = Math.max(-1.5, Math.min(1.5, mouseX));
      const clampedMouseY = Math.max(-1.5, Math.min(1.5, mouseY));

      const tiltX = clampedMouseY * maxTilt;
      const tiltY = clampedMouseX * maxTilt * -1;

      const lightSourceX = -0.3;
      const lightSourceY = -0.5;

      const normalX = (tiltY / maxTilt) * 0.1;
      const normalY = (-tiltX / maxTilt) * 0.1;

      const incidentX = lightSourceX;
      const incidentY = lightSourceY;

      const dotProduct = incidentX * normalX + incidentY * normalY;
      const reflectedX = incidentX - 2 * dotProduct * normalX;
      const reflectedY = incidentY - 2 * dotProduct * normalY;

      const glareX = 50 + reflectedX * 40 + mouseX * 15;
      const glareY = 50 + reflectedY * 40 + mouseY * 15;

      const distanceFromCenter = Math.sqrt(mouseX * mouseX + mouseY * mouseY);
      const normalizedDistance = Math.min(distanceFromCenter, 1.2);

      const angleFactor = Math.abs(tiltX) + Math.abs(tiltY);
      const baseOpacity = Math.max(0, (angleFactor / maxTilt) * 0.7);
      const distanceOpacity = Math.pow(1 - normalizedDistance / 1.2, 1.5);
      const glareOpacity = baseOpacity * distanceOpacity * glareMaxOpacity;

      const tiltMagnitude = Math.sqrt(tiltX * tiltX + tiltY * tiltY);
      const sizeMultiplier = 1 + (tiltMagnitude / maxTilt) * 0.8;
      const glareSize = 40 * sizeMultiplier;

      setTiltStyle({
        transform: `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.02, 1.02, 1.02)`,
        transformOrigin: "50% 50%",
      });

      const primaryGlare = `radial-gradient(ellipse ${glareSize * 1.8}% ${glareSize * 0.6}% at ${glareX}% ${glareY}%,
        rgba(255, 255, 255, ${glareOpacity * 0.8}) 0%,
        rgba(255, 255, 255, ${glareOpacity * 0.4}) 30%,
        transparent 70%)`;

      const secondaryGlare = `radial-gradient(ellipse ${glareSize * 3}% ${glareSize * 1.2}% at ${glareX}% ${glareY}%,
        transparent 0%,
        rgba(255, 255, 255, ${glareOpacity * 0.15}) 40%,
        transparent 80%)`;

      const colorGlare = `radial-gradient(ellipse ${glareSize * 1.2}% ${glareSize * 0.4}% at ${glareX}% ${glareY}%,
        rgba(200, 230, 255, ${glareOpacity * 0.3}) 0%,
        transparent 60%)`;

      setGlareStyle({
        background: `${primaryGlare}, ${secondaryGlare}, ${colorGlare}`,
        opacity: glareOpacity > 0.02 ? 1 : glareOpacity / 0.02,
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

    cardRef.current.style.transition = "all 0.5s ease-out";

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
    <div
      ref={callbackRef}
      className={classes("overflow-visible will-change-transform", className)}
      style={tiltStyle}
      onMouseEnter={handleMouseEnter}
      onMouseMove={isHovered ? handleMouseMove : undefined}
      onMouseLeave={handleMouseLeave}
      {...extras}
    >
      {children}

      <div
        className="pointer-events-none absolute inset-0 overflow-hidden transition-all duration-75 ease-out"
        style={glareStyle}
      />
    </div>
  );
});

export default ConditionalTiltCard;
