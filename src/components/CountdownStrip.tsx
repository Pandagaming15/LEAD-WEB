import React, { useState, useEffect } from 'react';
import { Clock, CheckSquare } from 'lucide-react';
import { CAMPAIGN_SETTINGS } from '../data/campaignData';

export const CountdownStrip: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  }>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const target = new Date(CAMPAIGN_SETTINGS.electionDate).getTime();

    const calculate = () => {
      const now = new Date().getTime();
      const difference = target - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculate();
    const timer = setInterval(calculate, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-gradient-to-r from-[#2a0d04] via-[#3d1306] to-[#2a0d04] border-y border-orange-600/40 py-4 sm:py-6 px-3 sm:px-6 lg:px-8 w-full max-w-full overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3 sm:gap-6">
        
        {/* Left: Info */}
        <div className="flex items-center gap-2.5 sm:gap-3 text-center md:text-left">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-orange-500 to-amber-600 flex items-center justify-center text-white shadow-md shadow-orange-950 shrink-0">
            <Clock className="w-4 h-4 sm:w-5 sm:h-5 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center justify-center md:justify-start gap-1.5 text-[10px] sm:text-xs font-bold uppercase tracking-wider text-amber-300">
              <span>Election Countdown</span>
              <span className="text-orange-300">·</span>
              <span className="text-white">Nov 20, 2026</span>
            </div>
            <h3 className="text-xs sm:text-base font-bold font-display text-white">
              Every Vote Counts for Genuine Student Leadership
            </h3>
          </div>
        </div>

        {/* Center: Ticking Clock */}
        <div className="flex items-center gap-1 sm:gap-2.5">
          <div className="flex flex-col items-center justify-center w-12 sm:w-16 py-1 sm:py-2 rounded-xl bg-[#200903]/90 border border-orange-600/50 text-center shadow-inner">
            <span className="text-base sm:text-2xl font-black font-display text-white tabular-nums">
              {String(timeLeft.days).padStart(2, '0')}
            </span>
            <span className="text-[8px] sm:text-[10px] font-semibold uppercase text-amber-200">
              Days
            </span>
          </div>

          <span className="text-xs sm:text-lg font-bold text-orange-400">:</span>

          <div className="flex flex-col items-center justify-center w-12 sm:w-16 py-1 sm:py-2 rounded-xl bg-[#200903]/90 border border-orange-600/50 text-center shadow-inner">
            <span className="text-base sm:text-2xl font-black font-display text-white tabular-nums">
              {String(timeLeft.hours).padStart(2, '0')}
            </span>
            <span className="text-[8px] sm:text-[10px] font-semibold uppercase text-amber-200">
              Hours
            </span>
          </div>

          <span className="text-xs sm:text-lg font-bold text-orange-400">:</span>

          <div className="flex flex-col items-center justify-center w-12 sm:w-16 py-1 sm:py-2 rounded-xl bg-[#200903]/90 border border-orange-600/50 text-center shadow-inner">
            <span className="text-base sm:text-2xl font-black font-display text-white tabular-nums">
              {String(timeLeft.minutes).padStart(2, '0')}
            </span>
            <span className="text-[8px] sm:text-[10px] font-semibold uppercase text-amber-200">
              Mins
            </span>
          </div>

          <span className="text-xs sm:text-lg font-bold text-orange-400">:</span>

          <div className="flex flex-col items-center justify-center w-12 sm:w-16 py-1 sm:py-2 rounded-xl bg-[#200903]/90 border border-orange-600/50 text-center shadow-inner">
            <span className="text-base sm:text-2xl font-black font-display text-amber-300 tabular-nums">
              {String(timeLeft.seconds).padStart(2, '0')}
            </span>
            <span className="text-[8px] sm:text-[10px] font-semibold uppercase text-amber-200">
              Secs
            </span>
          </div>
        </div>

        {/* Right Action */}
        <div className="shrink-0">
          <a
            href="#sample-ballot"
            className="px-3 py-1.5 text-xs font-semibold text-amber-200 bg-orange-950/60 hover:bg-orange-900/60 border border-orange-500/50 rounded-xl transition flex items-center gap-1.5 cursor-pointer shadow-sm"
          >
            <CheckSquare className="w-3.5 h-3.5 text-amber-300" />
            <span>Practice Ballot</span>
          </a>
        </div>

      </div>
    </div>
  );
};
