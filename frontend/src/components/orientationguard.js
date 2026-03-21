import { useEffect, useState } from "react";

export default function OrientationGuard({ children }) {
  const [isPortrait, setIsPortrait] = useState(false);

  useEffect(() => {
    const checkOrientation = () => {
      setIsPortrait(window.innerHeight > window.innerWidth);
    };

    checkOrientation();

    window.addEventListener("resize", checkOrientation);
    window.addEventListener("orientationchange", checkOrientation);

    return () => {
      window.removeEventListener("resize", checkOrientation);
      window.removeEventListener("orientationchange", checkOrientation);
    };
  }, []);

  if (isPortrait) {
    return (
      <div
        style={{
          position: "fixed",
          inset: 0,
          background: "black",
          color: "white",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "6vw",
          zIndex: 999999,
          textAlign: "center"
        }}
      >
        Please rotate your phone to landscape ↻
      </div>
    );
  }

  return children;
}