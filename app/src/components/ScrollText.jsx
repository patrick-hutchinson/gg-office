import { useRef, useEffect, useState } from "react";

import { motion } from "framer-motion";

const ScrollText = ({ string, activeView }) => {
  const [ready, setReady] = useState(false);
  const containerRef = useRef();
  const textRef = useRef();

  const overflowRef = useRef(0);

  useEffect(() => {
    const container = containerRef.current;
    const text = textRef.current;
    if (!container || !text) return;

    const overflowAmount = text.scrollWidth - container.clientWidth;
    if (overflowAmount <= 0) {
      container.scrollLeft = 0;
      return;
    }

    overflowRef.current = overflowAmount;
    setReady(true); // trigger re-render so Framer Motion picks up the updated value
  }, [activeView, string]); // Added string to dependency to reset on text change

  return (
    <div
      className="scroll-text-container"
      ref={containerRef}
      style={{
        overflow: "hidden",
        whiteSpace: "nowrap",
        width: "100%",
      }}
    >
      <motion.div
        className="scroll-text"
        ref={textRef}
        style={{ display: "inline-block", willChange: "transform" }}
        initial="initial"
        animate={{ x: [0, -overflowRef.current, -overflowRef.current, 0] }} // extra frame for pause at end
        transition={{
          duration: overflowRef.current / 10 + 4, // total duration including pauses
          times: [0, 0.45, 0.55, 1], // first 45% scrolls, 10% pause, last 45% scrolls back
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        {string}
      </motion.div>
    </div>
  );
};

export default ScrollText;
