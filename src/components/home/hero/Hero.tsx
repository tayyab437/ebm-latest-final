import React from "react";
import { HeroBackground } from "./HeroBackground";
import { HeroContent } from "./HeroContent";
import { HeroDashboard } from "./HeroDashboard";

interface HeroProps {
  onStartLearning: () => void;
  onExploreCurriculum: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onStartLearning,
  onExploreCurriculum,
}) => {
  return (
    <section 
      id="hero" 
      className="relative min-h-[calc(100vh-76px)] flex items-center justify-center py-20 lg:py-28 overflow-hidden"
    >
      {/* Background with Grid & Ambient Blurs */}
      <HeroBackground />

      {/* Hero Container */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Side: Copy and Controls (45%) */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <HeroContent 
              onStartLearning={onStartLearning} 
              onExploreCurriculum={onExploreCurriculum} 
            />
          </div>

          {/* Right Side: Interactive App Mockup & Badges (55%) */}
          <div className="lg:col-span-7 flex items-center justify-center">
            <HeroDashboard />
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;

