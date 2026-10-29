import React, { useState, useEffect } from 'react';
import { Users, Layers, GraduationCap, MapPin, ArrowRight, CheckCircle2, Flame, Vote, Sparkles, Music2 } from 'lucide-react';
import { CAMPAIGN_SETTINGS } from '../data/campaignData';

interface HeroSectionProps {
  onOpenBallotModal: () => void;
  onExploreCandidates: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenBallotModal, onExploreCandidates }) => {
  const [isPlayingJingle, setIsPlayingJingle] = useState(false);

  useEffect(() => {
    const handleState = (e: Event) => {
      const customEvent = e as CustomEvent<{ isPlaying: boolean }>;
      setIsPlayingJingle(customEvent.detail?.isPlaying ?? false);
    };
    window.addEventListener('lead-jingle-state', handleState);
    return () => window.removeEventListener('lead-jingle-state', handleState);
  }, []);
  return (
    <section className="relative w-full max-w-full overflow-hidden bg-[#160602] text-white">
      
      {/* =========================================================================
          FACEBOOK COVER PHOTO: FULLY VISIBLE & UNOBSTRUCTED GROUP PHOTO
         ========================================================================= */}
      <div className="relative w-full h-[240px] xs:h-[290px] sm:h-[380px] md:h-[460px] lg:h-[520px] bg-[#0d0402] overflow-hidden">
        <img
          src={CAMPAIGN_SETTINGS.pubmatBannerSrc}
          alt="LEAD Partylist Official Candidates Cover Photo"
          fetchPriority="high"
          decoding="async"
          className="w-full h-full object-cover object-top sm:object-[center_12%] transition-transform duration-500 hover:scale-[1.01]"
        />

        {/* Subtle Bottom Edge Shadow Transition */}
        <div className="absolute inset-x-0 bottom-0 h-20 sm:h-28 bg-gradient-to-t from-[#160602] via-[#160602]/70 to-transparent pointer-events-none" />
      </div>

      {/* =========================================================================
          FACEBOOK PAGE PROFILE BAR: LEFT-ALIGNED IDENTITY & ACTION BUTTONS
         ========================================================================= */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 -mt-12 sm:-mt-16 pb-8 sm:pb-12">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-5 sm:gap-6 pb-6 sm:pb-8 border-b border-neutral-800/80">
          
          {/* Left: Avatar + Left-Aligned Page Info */}
          <div className="flex flex-col sm:flex-row items-start sm:items-end gap-3.5 sm:gap-5">
            
            {/* Page Avatar Badge (Overlapping cover photo like Facebook) */}
            <div className="relative w-24 h-24 sm:w-32 sm:h-32 md:w-36 md:h-36 rounded-2xl bg-gradient-to-br from-[#2a0e05] via-[#3a1306] to-[#1c0803] p-1.5 shadow-2xl shadow-black ring-4 ring-[#160602] overflow-hidden shrink-0 flex items-center justify-center border border-orange-500/40">
              <div className="w-full h-full rounded-xl bg-gradient-to-b from-orange-950/90 to-[#120502] flex flex-col items-center justify-center p-2 text-center border border-orange-500/30">
                <Flame className="w-6 h-6 sm:w-8 sm:h-8 text-orange-400 fill-orange-400 animate-pulse" />
                <span className="text-sm sm:text-lg font-black font-display text-white tracking-wider mt-0.5">
                  LEAD
                </span>
                <span className="text-[8px] sm:text-[9px] font-bold text-amber-300 tracking-widest uppercase">
                  PARTYLIST
                </span>
              </div>
            </div>

            {/* Left-Aligned Page Title, Motto & Details */}
            <div className="space-y-1.5 text-left">
              
              {/* Slate Category Pill with School & SEC Logos */}
              <div className="inline-flex items-center gap-2 text-[10px] sm:text-xs font-semibold text-orange-400 uppercase tracking-wide flex-wrap">
                <span className="flex items-center gap-1.5">
                  <img src={CAMPAIGN_SETTINGS.schoolLogoSrc} alt="CVE Colleges, Inc." className="w-4 h-4 object-contain drop-shadow-sm" />
                  <span>{CAMPAIGN_SETTINGS.schoolName}</span>
                </span>
                <span className="text-neutral-600">·</span>
                <span className="flex items-center gap-1.5">
                  <img src={CAMPAIGN_SETTINGS.secLogoSrc} alt="SEC Logo" className="w-4 h-4 object-contain drop-shadow-sm" />
                  <span>SEC Elections 2026</span>
                </span>
              </div>

              {/* Title with Verified Checkmark */}
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-2xl sm:text-4xl md:text-5xl font-black font-display tracking-tight text-white uppercase leading-none">
                  LEAD <span className="text-orange-500">PARTYLIST</span>
                </h1>
                <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6 text-orange-400 fill-orange-400/20 shrink-0" />
              </div>

              {/* Tagline / Subtitle */}
              <p className="text-xs sm:text-sm md:text-base font-semibold text-neutral-300 font-display italic">
                &ldquo;{CAMPAIGN_SETTINGS.partylistAcronym}&rdquo;
              </p>

              {/* Short Bio */}
              <p className="text-xs sm:text-sm text-neutral-400 max-w-2xl leading-relaxed pt-0.5">
                16 committed student servants dedicated to honest leadership, active student rights, and inclusive college life at {CAMPAIGN_SETTINGS.schoolName}.
              </p>

            </div>

          </div>

          {/* Right: Primary Page Action Buttons (Vote, Jingle & Explore) */}
          <div className="flex flex-col xs:flex-row items-stretch sm:items-center gap-2 sm:gap-2.5 shrink-0 lg:self-end flex-wrap">
            <button
              onClick={onOpenBallotModal}
              className="px-4 py-2.5 sm:px-5 sm:py-3 rounded-xl bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-500 hover:to-orange-500 text-white font-bold text-xs sm:text-sm transition shadow-lg shadow-orange-950/70 flex items-center justify-center gap-2 cursor-pointer active:scale-95 border border-orange-400/40"
            >
              <Vote className="w-4 h-4 text-white" />
              <span>Vote Straight LEAD</span>
            </button>

            {/* Campaign Jingle Trigger Button */}
            <button
              type="button"
              onClick={() => window.dispatchEvent(new CustomEvent('lead-jingle-toggle'))}
              className={`px-3.5 py-2.5 sm:px-4 sm:py-3 rounded-xl font-bold text-xs sm:text-sm transition flex items-center justify-center gap-2 cursor-pointer active:scale-95 border ${
                isPlayingJingle
                  ? 'bg-orange-950/90 hover:bg-orange-900 border-orange-500/60 text-amber-300 shadow-md'
                  : 'bg-[#2e1005] hover:bg-[#3f1607] text-amber-200 hover:text-white border-amber-500/50 shadow-md'
              }`}
              title={isPlayingJingle ? 'Pause Campaign Song' : 'Play Official Campaign Song'}
            >
              {isPlayingJingle ? (
                <>
                  <div className="flex items-end gap-0.5 h-3.5 w-3.5" aria-hidden="true">
                    <span className="w-0.5 bg-amber-400 rounded-full animate-pulse h-2" />
                    <span className="w-0.5 bg-orange-400 rounded-full animate-pulse h-3.5 delay-75" />
                    <span className="w-0.5 bg-amber-300 rounded-full animate-pulse h-2.5 delay-150" />
                  </div>
                  <span>Song Playing 🎵</span>
                </>
              ) : (
                <>
                  <Music2 className="w-4 h-4 text-amber-400" />
                  <span>Play Jingle 🎵</span>
                </>
              )}
            </button>

            <button
              onClick={onExploreCandidates}
              className="px-4 py-2.5 sm:px-5 sm:py-3 rounded-xl bg-[#220a03] hover:bg-[#300e05] text-neutral-200 hover:text-white font-semibold text-xs sm:text-sm border border-neutral-700 hover:border-orange-500/50 transition flex items-center justify-center gap-2 cursor-pointer active:scale-95 group"
            >
              <span>Explore Candidates</span>
              <ArrowRight className="w-4 h-4 text-neutral-400 group-hover:text-white group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>

        </div>

        {/* Bottom Metadata Bar (Like Facebook Page details) */}
        <div className="pt-4 flex flex-wrap items-center justify-start gap-4 sm:gap-6 text-xs text-neutral-400">
          <div className="flex items-center gap-1.5">
            <Users className="w-4 h-4 text-orange-400" />
            <span className="text-neutral-200 font-medium">16 Official Leaders</span>
          </div>
          <span className="text-neutral-700">•</span>
          <div className="flex items-center gap-1.5">
            <Layers className="w-4 h-4 text-orange-400" />
            <span className="text-neutral-200 font-medium">4 Core Pillars</span>
          </div>
          <span className="text-neutral-700">•</span>
          <div className="flex items-center gap-1.5">
            <GraduationCap className="w-4 h-4 text-orange-400" />
            <span className="text-neutral-200 font-medium">{CAMPAIGN_SETTINGS.schoolName}</span>
          </div>
          <span className="text-neutral-700">•</span>
          <div className="flex items-center gap-1.5">
            <MapPin className="w-4 h-4 text-orange-400" />
            <span className="text-neutral-200 font-medium">Pagbilao Quezon, Philippines</span>
          </div>
        </div>

      </div>

    </section>
  );
};
