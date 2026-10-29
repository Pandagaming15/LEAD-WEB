import React, { useState } from 'react';
import { Search, ChevronRight, Heart, User, Flame } from 'lucide-react';
import { Candidate, CANDIDATE_ROSTER, CAMPAIGN_SETTINGS } from '../data/campaignData';

interface CandidateRosterSectionProps {
  onSelectCandidate: (candidate: Candidate) => void;
  cheersMap: Record<string, number>;
  onCheer: (id: string) => void;
}

export const CandidateRosterSection: React.FC<CandidateRosterSectionProps> = ({
  onSelectCandidate,
  cheersMap,
  onCheer,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = [
    'All',
    'Executive Council',
    'Councilors',
    'Representatives',
  ];

  const filteredCandidates = CANDIDATE_ROSTER.filter((candidate) => {
    const matchesCategory = selectedCategory === 'All' || candidate.category === selectedCategory;
    const matchesSearch =
      candidate.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      candidate.position.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="candidates" className="py-12 sm:py-20 px-3 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full max-w-full overflow-hidden">
      
      {/* Section Header */}
      <div className="pb-6 sm:pb-8 border-b border-orange-700/30">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-300">
            <Flame className="w-4 h-4 fill-orange-400 text-orange-400" />
            <span>Official 2026 Slate · 16 Student Leaders</span>
          </div>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-black font-display tracking-tight text-white uppercase">
            Meet the <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-300 to-orange-500">LEAD Slate</span>
          </h2>
          <p className="text-xs sm:text-sm text-orange-200/90 leading-relaxed">
            Subok na lider-estudyante ng {CAMPAIGN_SETTINGS.schoolName} na handang maglingkod nang buong tapat at husay sa {CAMPAIGN_SETTINGS.councilName}. Kilalanin ang bawat isa at magpaabot ng inyong suporta!
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="pt-5 pb-6 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {/* Category Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
          {categories.map((category) => {
            const isActive = selectedCategory === category;
            return (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-xl whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? 'bg-gradient-to-r from-orange-600 to-amber-600 text-white shadow-md shadow-orange-950 font-bold border border-amber-400/40'
                    : 'bg-[#290d04]/80 hover:bg-[#381306]/90 text-neutral-200 border border-orange-800/40'
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-64 shrink-0">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-orange-400" />
          <input
            type="text"
            placeholder="Search candidate name or position..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-[#280c04]/90 border border-orange-700/50 text-white placeholder-orange-300/50 focus:outline-none focus:border-amber-400 shadow-inner"
          />
        </div>
      </div>

      {/* Candidate Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {filteredCandidates.map((candidate) => {
          const cheers = cheersMap[candidate.id] || 0;

          return (
            <div
              key={candidate.id}
              onClick={() => onSelectCandidate(candidate)}
              className="group relative bg-gradient-to-b from-[#2a0e05]/95 via-[#1d0803]/95 to-[#260c04]/95 rounded-2xl border border-orange-700/40 hover:border-orange-400/90 shadow-xl shadow-black/60 hover:shadow-2xl hover:shadow-orange-950/80 transition-all duration-300 sm:hover:-translate-y-1.5 flex flex-col justify-between overflow-hidden cursor-pointer active:scale-98"
            >
              {/* Top Card Gradient Glow Bar */}
              <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-orange-500 via-amber-400 to-orange-600 opacity-70 group-hover:opacity-100 transition-opacity" />

              {/* Card Header & Avatar */}
              <div className="p-4 sm:p-5 pb-3">
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="px-2.5 py-0.5 rounded-lg bg-orange-950/90 border border-orange-500/50 text-[11px] font-black text-amber-300 font-display shadow-sm">
                    Ballot #{candidate.ballotNumber}
                  </div>
                </div>

                {/* Candidate Photo Centered in Frame */}
                <div className="relative w-full aspect-[4/5] rounded-xl bg-gradient-to-b from-[#3b1508]/80 via-[#200903]/90 to-[#3b1508]/80 border border-orange-700/40 overflow-hidden mb-3 group-hover:border-orange-400/70 transition shadow-inner">
                  {candidate.photoUrl ? (
                    <img
                      src={candidate.photoUrl}
                      alt={candidate.name}
                      className="w-full h-full object-cover object-center transition duration-500 group-hover:scale-105 group-hover:brightness-105"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-center p-3">
                      <div className="w-14 h-14 rounded-full bg-gradient-to-br from-orange-600/40 to-amber-700/30 border border-orange-500/40 flex items-center justify-center text-amber-300">
                        <User className="w-7 h-7 text-orange-300" />
                      </div>
                    </div>
                  )}

                  {/* Gentle hover shine gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1b0803]/80 via-transparent to-transparent opacity-40 group-hover:opacity-20 transition pointer-events-none" />
                </div>

                {/* Candidate Name & Position */}
                <div>
                  <h3 className="text-base sm:text-lg font-bold font-display text-white group-hover:text-amber-300 transition-colors line-clamp-1">
                    {candidate.name}
                  </h3>
                  <div className="text-xs sm:text-sm font-bold text-orange-400 mt-0.5 line-clamp-1">
                    {candidate.position}
                  </div>
                </div>
              </div>

              {/* Card Footer: Cheer Button & Profile Link */}
              <div className="p-3.5 pt-2 border-t border-orange-800/40 bg-[#190703]/60 flex items-center justify-between gap-2 text-xs">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onCheer(candidate.id);
                  }}
                  className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-orange-950/80 hover:bg-orange-900 border border-orange-600/50 text-orange-200 hover:text-white transition cursor-pointer text-[11px] font-semibold active:scale-95 shadow-sm"
                  title="Send cheer"
                >
                  <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500/50 group-hover:fill-red-500" />
                  <span>Cheer</span>
                  <span className="text-amber-300 font-bold">{cheers}</span>
                </button>

                <div className="inline-flex items-center gap-0.5 text-[11px] font-semibold text-amber-300 group-hover:text-amber-200 transition">
                  <span>Profile</span>
                  <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredCandidates.length === 0 && (
        <div className="text-center py-12 bg-gradient-to-b from-[#250d05] to-[#1a0702] rounded-2xl border border-orange-800/40">
          <p className="text-orange-200/80 text-xs sm:text-sm">No candidate matching &quot;{searchQuery}&quot; was found.</p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('All');
            }}
            className="mt-2 px-3 py-1.5 text-xs font-semibold text-amber-300 hover:underline cursor-pointer"
          >
            Clear search
          </button>
        </div>
      )}

    </section>
  );
};
