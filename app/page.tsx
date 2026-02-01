import dynamic from "next/dynamic";
import DarkThemeLayout from "../components/layouts/ui-layout/dark-theme-layout";
import RioLandingPage from "./rio-main";
import { Suspense } from "react";
import RioLoadingFallback from "./rio-loading-fallback-ui";

const Navbar = dynamic(() => import('@/components/reusables/navbar'), { ssr: true });
const MainHeader = dynamic(() => import('@/app/_components/hero-section/hero'), { ssr: true });
const TokenLeaderBoardLayout = dynamic(() => import('@/components/layouts/ui-layout/token-leaderboard-layout'), { ssr: true });

export default function Home() {
  return (
    <section>
      {/* <Navbar />
      <MainHeader />
      <DarkThemeLayout />
      <TokenLeaderBoardLayout /> */}
      <Suspense fallback={<RioLoadingFallback />}><RioLandingPage /></Suspense>
    </section>
  );
}