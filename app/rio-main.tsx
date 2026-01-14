"use client";


import 'aos/dist/aos.css';
import Navbar from '@/components/Frontend Components/Navbar';
import Hero from '@/components/Frontend Components/Hero';
import Ido from '@/components/Frontend Components/Ido';
import Gallery from '@/components/Frontend Components/Gallery';
import Tokenomics from '@/components/Frontend Components/Tokenomics';
import Roadmap from '@/components/Frontend Components/Roadmap';
import Leaderboard from '@/components/Frontend Components/Leaderboard';
import Chart from '@/components/Frontend Components/Chart';
import Footer from '@/components/Frontend Components/Footer';
import Participation from '@/components/Frontend Components/Participation';

export default function RioLandingPage() {


  return (
    <>
      {/* Injecting Fonts and Custom CSS */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;500;700&family=Syncopate:wght@400;700&display=swap');
        
        :root {
          --rio-blue: #00D2FF;
          --rio-green: #3AFFAD;
        }

        body {
          font-family: 'Space Grotesk', sans-serif;
          background-color: #020617;
          color: #f8fafc;
          overflow-x: hidden;
        }

        .font-sync { font-family: 'Syncopate', sans-serif; }

        /* Glassmorphism Ultra */
        .glass-premium {
          background: rgba(15, 23, 42, 0.7);
          backdrop-filter: blur(20px) saturate(180%);
          border: 1px solid rgba(255, 255, 255, 0.08);
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
        }

        /* Animated Tropical Vine Roadmap */
        .roadmap-vine {
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          width: 4px;
          height: 100%;
          background: linear-gradient(to bottom, transparent, var(--rio-green), var(--rio-blue), transparent);
          box-shadow: 0 0 15px rgba(58, 255, 173, 0.5);
        }

        /* Hero Text Gradient */
        .text-gradient {
          background: linear-gradient(90deg, #00D2FF, #3AFFAD);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .btn-glow:hover {
          box-shadow: 0 0 30px rgba(0, 210, 255, 0.4);
          transform: translateY(-2px);
        }

        /* Character Hover Effect */
        .flock-card:hover img {
          transform: scale(1.1) rotate(2deg);
          filter: brightness(1.2);
        }

        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        .animate-float { animation: float 6s ease-in-out infinite; }
      `}</style>

      <Navbar />
      <Hero />
      <Ido />
      <Participation />
      <Gallery />
      <Tokenomics />
      <Roadmap />
      <Leaderboard />
      <Chart />
      <Footer />


    </>
  );
}