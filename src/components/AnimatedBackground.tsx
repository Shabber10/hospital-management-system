import { motion } from "framer-motion";
import { useEffect, useState, useMemo } from "react";

export function AnimatedBackground() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [dimensions, setDimensions] = useState({ width: 1920, height: 1080 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };

    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    handleResize();
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Pre-calculate positions for orbs (memoized to prevent recalculation)
  const orbPositions = useMemo(() => {
    const seed = 42; // Fixed seed for consistent positions
    return Array.from({ length: 6 }, (_, i) => {
      const r1 = Math.sin(seed + i) * 0.5 + 0.5;
      const r2 = Math.cos(seed + i * 2) * 0.5 + 0.5;
      const r3 = Math.sin(seed + i * 3) * 0.5 + 0.5;
      const r4 = Math.cos(seed + i * 4) * 0.5 + 0.5;
      return {
        x: [
          r1 * dimensions.width,
          r2 * dimensions.width,
          r3 * dimensions.width,
        ],
        y: [
          r4 * dimensions.height,
          r1 * dimensions.height,
          r2 * dimensions.height,
        ],
      };
    });
  }, [dimensions.width, dimensions.height]);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
      {/* Animated gradient background */}
      <motion.div
        className="absolute inset-0 opacity-30"
        animate={{
          background: [
            "radial-gradient(circle at 20% 50%, rgba(79, 70, 229, 0.3) 0%, transparent 50%)",
            "radial-gradient(circle at 80% 50%, rgba(139, 92, 246, 0.3) 0%, transparent 50%)",
            "radial-gradient(circle at 50% 20%, rgba(79, 70, 229, 0.3) 0%, transparent 50%)",
            "radial-gradient(circle at 20% 50%, rgba(79, 70, 229, 0.3) 0%, transparent 50%)",
          ],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Floating orbs */}
      {orbPositions.map((pos, i) => (
        <motion.div
          key={`orb-${i}`}
          className="absolute rounded-full blur-3xl opacity-20"
          style={{
            width: `${100 + i * 50}px`,
            height: `${100 + i * 50}px`,
            background: i % 2 === 0 
              ? "rgba(79, 70, 229, 0.4)" 
              : "rgba(139, 92, 246, 0.4)",
          }}
          animate={{
            x: pos.x,
            y: pos.y,
          }}
          transition={{
            duration: 20 + i * 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Geometric shapes */}
      {Array.from({ length: 8 }, (_, i) => (
        <motion.div
          key={`shape-${i}`}
          className="absolute opacity-10"
          style={{
            width: `${30 + i * 10}px`,
            height: `${30 + i * 10}px`,
            left: `${(i * 12.5) % 100}%`,
            top: `${(i * 15) % 100}%`,
            background: i % 3 === 0 
              ? "rgba(79, 70, 229, 0.2)" 
              : i % 3 === 1
              ? "rgba(139, 92, 246, 0.2)"
              : "rgba(59, 130, 246, 0.2)",
            borderRadius: i % 2 === 0 ? "50%" : "20%",
          }}
          animate={{
            rotate: [0, 360],
            scale: [1, 1.2, 1],
            x: mousePosition.x * (i % 3 - 1) * 0.1,
            y: mousePosition.y * (i % 3 - 1) * 0.1,
          }}
          transition={{
            duration: 10 + i * 2,
            repeat: Infinity,
            ease: "linear",
            x: { duration: 0.3 },
            y: { duration: 0.3 },
          }}
        />
      ))}

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(79, 70, 229, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(79, 70, 229, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px",
        }}
      />

      {/* Animated lines */}
      {Array.from({ length: 3 }, (_, i) => {
        const baseX = 100 + i * 200;
        const baseY = 100 + i * 150;
        return (
          <motion.svg
            key={`line-${i}`}
            className="absolute inset-0 w-full h-full opacity-5"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            <motion.path
              d={`M ${baseX} ${baseY} Q ${300 + i * 100} ${200 + i * 100} ${500 + i * 150} ${300 + i * 200}`}
              stroke="rgba(79, 70, 229, 0.3)"
              strokeWidth="2"
              fill="none"
              animate={{
                d: [
                  `M ${baseX} ${baseY} Q ${300 + i * 100} ${200 + i * 100} ${500 + i * 150} ${300 + i * 200}`,
                  `M ${baseX + 50} ${baseY + 50} Q ${350 + i * 100} ${250 + i * 100} ${550 + i * 150} ${350 + i * 200}`,
                  `M ${baseX} ${baseY} Q ${300 + i * 100} ${200 + i * 100} ${500 + i * 150} ${300 + i * 200}`,
                ],
              }}
              transition={{
                duration: 10 + i * 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </motion.svg>
        );
      })}
    </div>
  );
}

