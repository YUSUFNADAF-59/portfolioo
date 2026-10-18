import { useEffect, useRef, useState } from "react";

export default function IntroVideo({ onDone }: { onDone: () => void }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [visible, setVisible] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const handleEnded = () => {
    setFadeOut(true);
    setTimeout(() => {
      setVisible(false);
      onDone();
    }, 600);
  };

  // Allow skipping by clicking
  const handleSkip = () => {
    handleEnded();
  };

  if (!visible) return null;

  return (
    <div
      onClick={handleSkip}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: "#000",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        opacity: fadeOut ? 0 : 1,
        transition: "opacity 0.6s ease",
      }}
    >
      <video
        ref={videoRef}
        key={isMobile ? "mobile" : "desktop"}
        src={isMobile ? "/mobile.mp4" : "/desktop.mp4"}
        autoPlay
        muted
        playsInline
        onEnded={handleEnded}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      />
    </div>
  );
}
