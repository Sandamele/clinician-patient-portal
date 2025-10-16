import { useEffect } from "react";
import { Spinner } from "@/components/ui/spinner";

export const Loader = () => {
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const bodyChildren = Array.from(document.body.children).filter(
      (child) => !child.classList.contains("loader-overlay"),
    );
    bodyChildren.forEach((el) => el.setAttribute("inert", "true"));

    (document.activeElement as HTMLElement)?.blur();
    return () => {
      document.body.style.overflow = originalOverflow;
      bodyChildren.forEach((el) => el.removeAttribute("inert"));
    };
  }, []);

  return (
    <div
      className="loader-overlay fixed inset-0 z-50 flex items-center justify-center bg-gray-50/30"
      style={{ pointerEvents: "all" }}
    >
      <Spinner className="w-30 h-30" />
    </div>
  );
};
