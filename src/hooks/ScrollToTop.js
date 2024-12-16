import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();
  console.log(pathname);

  useEffect(() => {
    if (pathname === "/" || pathname.includes('/projects/')) {
      window.scrollTo({
        top: window.innerHeight * 0,
        behavior: "smooth",
      });
    }else {
      window.scrollTo({
        top: window.innerHeight * 0.67,
        behavior: "smooth",
      });
    }
  }, [pathname]);

  return null;
};

export default ScrollToTop;
