import { motion } from "framer-motion";

const ShimmerElement = ({ className = "" }) => (
  <div className={`${className} relative overflow-hidden`}>
    <motion.div
      className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-500 to-transparent"
      initial={{ x: "-100%" }}
      animate={{ x: "100%" }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  </div>
);

export default ShimmerElement;
