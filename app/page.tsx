import dynamic from "next/dynamic";
import RioSubHero from "./_components/hero-section/rio-sub-hero";
import HowItWorks from "./_components/hero-section/how-it-works";

const Navbar = dynamic(() => import('@/components/reusables/navbar'), { ssr: true });
const MainHeader = dynamic(() => import('@/app/_components/hero-section/hero'), { ssr: true });
const TokenLeaderBoardLayout = dynamic(() => import('@/components/layouts/ui-layout/token-leaderboard-layout'), { ssr: true });

export default function Home() {
  return (
  <section>
    <Navbar />
    <MainHeader />
    <HowItWorks />
    <TokenLeaderBoardLayout />
  </section>
  );
}
 