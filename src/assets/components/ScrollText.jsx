import { useRef, useEffect } from "react";

const ScrollText = ({ string }) => {
  const containerRef = useRef();
  const textRef = useRef();

  useEffect(() => {
    const container = containerRef.current;
    const text = textRef.current;
    if (!container || !text) return;

    const overflowAmount = text.scrollWidth - container.clientWidth;
    if (overflowAmount <= 0) {
      // No overflow, reset scrollLeft to 0 and do nothing
      container.scrollLeft = 0;
      return;
    }

    let scrollPos = 0;
    let direction = 1; // 1 = forward, -1 = backward
    const speed = 1;
    const interval = 20;

    const scroll = () => {
      scrollPos += direction * speed;

      if (scrollPos >= overflowAmount) {
        scrollPos = overflowAmount;
        direction = -1;
      } else if (scrollPos <= 0) {
        scrollPos = 0;
        direction = 1;
      }

      container.scrollLeft = scrollPos;
    };

    const scrollInterval = setInterval(scroll, interval);
    return () => clearInterval(scrollInterval);
  }, [string]); // rerun if string changes

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
