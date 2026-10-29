import React, { useState } from 'react';
import { ShieldCheck, HeartHandshake, Zap, Sparkles, CheckCircle2 } from 'lucide-react';
import { PLATFORM_PILLARS } from '../data/campaignData';

export const PlatformSection: React.FC = () => {
  const [activeLetter, setActiveLetter] = useState<'L' | 'E' | 'A' | 'D'>('L');

  const icons = {
    L: ShieldCheck,
    E: HeartHandshake,
    A: Zap,
    D: Sparkles,
  };

  const currentPillar = PLATFORM_PILLARS.find((p) => p.letter === activeLetter) || PLATFORM_PILLARS[0];
  const CurrentIcon = icons[currentPillar.letter];

  return (
    <section id="platform" className="py-12 sm:py-20 bg-[#120703] border-t border-orange-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header - Clean solid colors without bg-clip-text to prevent Android GPU glitch */}
        <div className="text-center max-w-2xl mx-auto space-y-2 mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-orange-400">
            <span>Our Blueprint</span>
            <span className="text-neutral-600">·</span>
            <span>The L.E.A.D. Framework</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black font-display tracking-tight text-white uppercase">
            Four Pillars of <span className="text-orange-400">Action &amp; Dedication</span>
          </h2>
          <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
            Concrete, measurable initiatives built directly from student consultations.
          </p>
        </div>

        {/* L-E-A-D Interactive Segmented Tabs - Mobile Friendly Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 max-w-3xl mx-auto mb-6 sm:mb-8">
          {PLATFORM_PILLARS.map((pillar) => {
            const Icon = icons[pillar.letter];
            const isSelected = activeLetter === pillar.letter;

            return (
              <button
                key={pillar.letter}
                onClick={() => setActiveLetter(pillar.letter)}
                className={`p-3 sm:p-4 rounded-xl border text-left transition-colors cursor-pointer select-none ${
                  isSelected
                    ? 'bg-orange-600 border-orange-400 text-white shadow-lg shadow-orange-950'
                    : 'bg-[#180a05] hover:bg-orange-950/60 border-orange-900/40 text-neutral-300'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className={`text-xl sm:text-2xl font-black font-display ${isSelected ? 'text-white' : 'text-orange-500'}`}>
                    {pillar.letter}
                  </span>
                  <Icon className={`w-4 h-4 sm:w-5 sm:h-5 ${isSelected ? 'text-amber-200' : 'text-neutral-500'}`} />
                </div>
                <div className="text-xs sm:text-sm font-bold font-display uppercase tracking-wide">
                  {pillar.keyword}
                </div>
                <div className={`text-[10px] mt-0.5 truncate ${isSelected ? 'text-orange-100' : 'text-neutral-400'}`}>
                  {pillar.title.split(' ')[0]} Agenda
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Pillar Showcase Card */}
        <div className="max-w-3xl mx-auto bg-[#170a05] rounded-2xl border border-orange-700/40 p-5 sm:p-8 shadow-xl text-neutral-200 space-y-4 sm:space-y-6">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="w-12 h-12 rounded-xl bg-orange-600 flex items-center justify-center text-white shadow-md shadow-orange-950 shrink-0">
              <CurrentIcon className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-orange-400">
                Pillar {currentPillar.letter} · {currentPillar.keyword}
              </span>
              <h3 className="text-lg sm:text-2xl font-black font-display text-white">
                {currentPillar.title}
              </h3>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-neutral-200 leading-relaxed font-normal">
            {currentPillar.summary}
          </p>

          <div className="space-y-2.5 pt-1">
            <h4 className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-amber-300">
              Flagship Campus Programs:
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {currentPillar.initiatives.map((item, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl bg-black/40 border border-orange-900/40 space-y-1.5 flex flex-col justify-between text-xs"
                >
                  <div className="flex items-center gap-1.5 text-orange-400">
                    <CheckCircle2 className="w-3.5 h-3.5 shrink-0 text-orange-500" />
                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-200 font-display">
                      Action #{idx + 1}
                    </span>
                  </div>
                  <p className="text-[11px] sm:text-xs text-neutral-300 leading-relaxed">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
