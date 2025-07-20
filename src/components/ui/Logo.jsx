import { useEffect, useState } from "react";
import { motion } from "framer-motion";

function Logo({ size = "lg" }) {
  const [responsiveSize, setResponsiveSize] = useState(size);

  useEffect(() => {
    const checkSize = () => {
      const isSmall = window.innerWidth < 640;
      setResponsiveSize(isSmall ? "sm" : size);
    };

    checkSize();

    window.addEventListener("resize", checkSize);
    return () => window.removeEventListener("resize", checkSize);
  }, [size]);

  const sizeClasses = responsiveSize === "sm" ? "text-2xl" : "text-4xl";

  return (
    <motion.h1
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`text-center font-extrabold ${sizeClasses} bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text tracking-tight text-transparent drop-shadow-md`}
    >
      Get It Done
    </motion.h1>
  );
}

export default Logo;
