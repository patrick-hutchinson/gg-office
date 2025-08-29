import { useRef, useEffect, useState } from "react";

import { motion } from "framer-motion";

const ScrollText = ({ string, activeView }) => {
  const containerRef = useRef();
  const textRef = useRef();

  const [overflow, setOverflow] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    const text = textRef.current;
    if (!container || !text) return;

    const overflowAmount = text.scrollWidth - container.clientWidth;
    if (overflowAmount <= 0) {
      container.scrollLeft = 0;
      return;
    }

    console.log(overflowAmount, "overflow");
    setOverflow(overflowAmount);
  }, [activeView, string]); // Added string to dependency to reset on text change

  // const scrollVariants = {
  //   initial: { transform: `translateX(0px)` },
  //   animate: { transform: `translateX(${-overflow}px)` },
  // };

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
        style={{
          display: "inline-block",
          transform: `translateX(${-overflow}px)`,
        }}
        initial="initial"
        animate={{ x: [0, -overflow, 0] }} // move right -> left -> right
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} // 2s each way
        // variants={scrollVariants}
      >
        {string}
      </motion.div>
    </div>
  );
};

export default ScrollText;
