import { useEffect, useState } from "react";

export const useMediaQuery = (breakpoint: number): boolean => {
  const [matches, setMatches] = useState(() => window.innerWidth < breakpoint);

  useEffect(() => {
    const handleResize = () => {
      setMatches(window.innerWidth < breakpoint);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [breakpoint]);

  return matches;
};