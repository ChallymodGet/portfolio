import SmoothScroll from "@/components/animations/SmoothScroll";
import CustomCursor from "@/components/animations/CustomCursor";
import EasterEggs from "@/components/animations/EasterEggs";
import ThemeToggle from "@/components/animations/ThemeToggle";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ThemeToggle />
      <EasterEggs />
      <CustomCursor />
      <SmoothScroll>{children}</SmoothScroll>
    </>
  );
}
