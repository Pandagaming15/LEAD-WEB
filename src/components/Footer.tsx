import React, { useState } from 'react';
import { Shield, GraduationCap, ArrowUp, Heart } from 'lucide-react';
import { CAMPAIGN_SETTINGS } from '../data/campaignData';

export const Footer: React.FC = () => {
  const [schoolLogoError, setSchoolLogoError] = useState(false);
  const [secLogoError, setSecLogoError] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-gradient-to-b from-[#220a03] to-[#120401] border-t border-orange-700/50 text-neutral-300 text-xs w-full max-w-full overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-8 sm:pb-12 border-b border-orange-800/40">
          
          {/* Col 1: Brand & Logos */}
          <div className="md:col-span-6 space-y-3">
            <div className="flex items-center gap-3">
              {/* School Logo */}
              <div className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center text-orange-400 shrink-0 drop-shadow-md">
                {!schoolLogoError ? (
                  <img
                    src={CAMPAIGN_SETTINGS.schoolLogoSrc}
                    alt={`${CAMPAIGN_SETTINGS.schoolName} Logo`}
                    className="w-full h-full object-contain filter drop-shadow"
                    onError={(e) => {
                      const target = e.currentTarget;
                      if (CAMPAIGN_SETTINGS.schoolLogoPng && !target.src.endsWith('.png')) {
                        target.src = CAMPAIGN_SETTINGS.schoolLogoPng;
                      } else {
                        setSchoolLogoError(true);
                      }
                    }}
                  />
                ) : (
                  <GraduationCap className="w-5 h-5 text-amber-300" />
                )}
              </div>

              {/* SEC Logo */}
              <div className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center text-amber-300 shrink-0 drop-shadow-md">
                {!secLogoError ? (
                  <img
                    src={CAMPAIGN_SETTINGS.secLogoSrc}
                    alt="SEC Seal"
                    className="w-full h-full object-contain filter drop-shadow"
                    onError={(e) => {
                      const target = e.currentTarget;
                      if (CAMPAIGN_SETTINGS.secLogoPng && !target.src.endsWith('.png')) {
                        target.src = CAMPAIGN_SETTINGS.secLogoPng;
                      } else {
                        setSecLogoError(true);
                      }
                    }}
                  />
                ) : (
                  <Shield className="w-5 h-5 text-amber-300" />
                )}
              </div>

              <div>
                <span className="text-base sm:text-lg font-black font-display text-white tracking-tight uppercase block leading-none">
                  LEAD <span className="text-orange-400">PARTYLIST</span>
                </span>
                <span className="text-[10px] text-amber-200/90 uppercase font-semibold">
                  {CAMPAIGN_SETTINGS.schoolName}
                </span>
              </div>
            </div>

            <p className="text-xs text-orange-200/90 max-w-sm leading-relaxed">
              {CAMPAIGN_SETTINGS.partylistAcronym} ({CAMPAIGN_SETTINGS.partylistName}). Dedicated to bold action, honest transparency, and genuine student advocacy.
            </p>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="md:col-span-3 space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-300 font-display block mb-2">
              Quick Navigation
            </span>
            <ul className="space-y-1.5 text-xs text-neutral-200">
              <li>
                <a href="#candidates" className="hover:text-amber-300 transition">
                  Candidates Slate (16)
                </a>
              </li>
              <li>
                <a href="#sample-ballot" className="hover:text-amber-300 transition">
                  Sample Ballot &amp; Practice
                </a>
              </li>
              <li>
                <a href="#freedom-wall" className="hover:text-amber-300 transition">
                  Student Freedom Wall
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Election Notice & Back to Top */}
          <div className="md:col-span-3 space-y-3 flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-300 font-display block mb-1">
                Election Day Notice
              </span>
              <p className="text-xs text-orange-100/90 leading-relaxed">
                Voting will be held on <strong className="text-amber-300">November 20, 2026</strong>. Bring your valid Student ID.
              </p>
            </div>

            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-orange-950/80 hover:bg-orange-900 border border-orange-600/50 text-amber-200 text-xs font-semibold transition self-start cursor-pointer shadow-sm"
            >
              <ArrowUp className="w-3.5 h-3.5" />
              <span>Back to Top</span>
            </button>
          </div>

        </div>

        {/* Bottom Strip */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-orange-200/70">
          <div>
            © 2026 {CAMPAIGN_SETTINGS.partylistName}. All rights reserved.
          </div>
          <div className="flex items-center gap-1 text-amber-300">
            <span>Built with</span>
            <Heart className="w-3 h-3 text-red-500 fill-red-500 inline" />
            <span>for {CAMPAIGN_SETTINGS.schoolName} Students</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
