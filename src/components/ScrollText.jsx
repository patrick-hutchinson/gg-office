import { useRef, useEffect } from "react";

const ScrollText = ({ string, activeView }) => {
  const containerRef = useRef();
  const textRef = useRef();
  const pauseTimeout = useRef(null); // to store timeout ID

  useEffect(() => {
    const container = containerRef.current;
    const text = textRef.current;
    if (!container || !text) return;

    const overflowAmount = text.scrollWidth - container.clientWidth;
    if (overflowAmount <= 0) {
      container.scrollLeft = 0;
      return;
    }

    let scrollPos = 0;
    let direction = 1; // 1 = forward, -1 = backward
    const speed = 0.5;
    const interval = 20;
    let isPaused = false;

    const scroll = () => {
      if (isPaused) return;

      scrollPos += direction * speed;

      if (scrollPos >= overflowAmount) {
        scrollPos = overflowAmount;
        isPaused = true;
        pauseTimeout.current = setTimeout(() => {
          direction = -1;
          isPaused = false;
        }, 1000);
      } else if (scrollPos <= 0) {
        scrollPos = 0;
        isPaused = true;
        pauseTimeout.current = setTimeout(() => {
          direction = 1;
          isPaused = false;
        }, 1000);
      }

      container.scrollLeft = scrollPos;
    };

    const scrollInterval = setInterval(scroll, interval);

    return () => {
      clearInterval(scrollInterval);
      if (pauseTimeout.current) clearTimeout(pauseTimeout.current);
    };
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
      <div
        className="scroll-text"
        ref={textRef}
        style={{
          display: "inline-block",
        }}
      >
        {string}
      </div>
    </div>
  );
};

export default ScrollText;
