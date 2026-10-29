import React, { useState } from 'react';
import { Vote, Menu, X, Music2 } from 'lucide-react';
import { CAMPAIGN_SETTINGS } from '../data/campaignData';

interface HeaderProps {
  onOpenBallotModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenBallotModal }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-[#0d0402]/95 backdrop-blur-md border-b border-neutral-800/80 transition-all w-full max-w-full overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4 h-16 sm:h-20">
          
          {/* Zone 1: Pure Brand Logo with User's Original School & SEC Logos */}
          <a href="#" className="flex items-center gap-2 sm:gap-2.5 focus:outline-none min-w-0">
            <img
              src={CAMPAIGN_SETTINGS.schoolLogoSrc}
              alt="CVE Colleges, Inc. Official Logo"
              className="w-8 h-8 sm:w-9 sm:h-9 object-contain shrink-0 drop-shadow-md"
            />
            <img
              src={CAMPAIGN_SETTINGS.secLogoSrc}
              alt="Student Executive Council Logo"
              className="w-8 h-8 sm:w-9 sm:h-9 object-contain shrink-0 drop-shadow-md"
            />
            <span className="text-xl sm:text-2xl font-black tracking-tight text-white font-display uppercase truncate">
              LEAD <span className="text-orange-500">PARTYLIST</span>
            </span>
          </a>

          {/* Zone 2: Navigation Links */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-semibold text-neutral-300">
            <a href="#candidates" className="hover:text-white transition-colors whitespace-nowrap">
              Candidates
            </a>
            <a href="#platform" className="hover:text-white transition-colors whitespace-nowrap">
              4-Pillar Platform
            </a>
            <a href="#sample-ballot" className="hover:text-white transition-colors whitespace-nowrap">
              Sample Ballot
            </a>
            <a href="#freedom-wall" className="hover:text-white transition-colors whitespace-nowrap">
              Freedom Wall
            </a>
          </nav>

          {/* Zone 3: Primary Action & Mobile Menu Toggle */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Quick Jingle Audio Toggle */}
            <button
              onClick={() => window.dispatchEvent(new CustomEvent('lead-jingle-toggle'))}
              type="button"
              className="p-2 sm:px-3 sm:py-2 rounded-xl bg-[#290d04] hover:bg-[#3d1406] text-amber-300 hover:text-white border border-orange-600/40 transition flex items-center gap-1.5 text-xs font-bold cursor-pointer active:scale-95 shadow-sm"
              title="Toggle LEAD Campaign Jingle"
              aria-label="Toggle LEAD Campaign Jingle"
            >
              <Music2 className="w-4 h-4 text-amber-400 animate-pulse" />
              <span className="hidden lg:inline text-[11px]">Jingle</span>
            </button>

            <button
              onClick={onOpenBallotModal}
              className="inline-flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-red-600 via-orange-600 to-orange-500 hover:from-red-500 hover:to-orange-400 rounded-xl shadow-lg shadow-orange-950/60 transition active:scale-95 cursor-pointer whitespace-nowrap"
            >
              <Vote className="w-4 h-4 text-white" />
              <span>Vote Straight LEAD</span>
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg bg-neutral-900 text-neutral-300 hover:text-white border border-neutral-700/50 cursor-pointer"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-orange-400" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-neutral-800 space-y-1 bg-[#120603]/98 rounded-b-2xl px-2">
            <nav className="flex flex-col space-y-1 text-sm font-semibold text-neutral-200">
              <a
                href="#candidates"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg hover:bg-neutral-800 hover:text-orange-400 transition"
              >
                Candidates (16 Leaders)
              </a>
              <a
                href="#platform"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg hover:bg-neutral-800 hover:text-orange-400 transition"
              >
                4-Pillar Platform
              </a>
              <a
                href="#sample-ballot"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg hover:bg-neutral-800 hover:text-orange-400 transition"
              >
                Sample Ballot Mockup
              </a>
              <a
                href="#freedom-wall"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg hover:bg-neutral-800 hover:text-orange-400 transition"
              >
                Freedom Wall &amp; Student Cheers
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};
