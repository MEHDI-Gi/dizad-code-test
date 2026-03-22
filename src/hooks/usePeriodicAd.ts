import { useEffect, useRef } from "react";
import { useAd } from "./useAd";

const usePeriodicAd = () => {
  const ad = useAd();
  const intervalRef = useRef<any>(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      if (ad.isLoaded) {
        ad.show();
      }
    }, 600000);
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);
};

export { usePeriodicAd };