import React, { useState } from 'react';
import { X, Heart, Share2, Check, User } from 'lucide-react';
import { Candidate, CAMPAIGN_SETTINGS } from '../data/campaignData';

interface CandidateDetailModalProps {
  candidate: Candidate | null;
  onClose: () => void;
  onCheer: (id: string) => void;
  cheerCount: number;
}

export const CandidateDetailModal: React.FC<CandidateDetailModalProps> = ({
  candidate,
  onClose,
  onCheer,
  cheerCount,
}) => {
  const [copiedLink, setCopiedLink] = useState(false);

  if (!candidate) return null;

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `Vote for ${candidate.name} - LEAD Partylist`,
        text: `Support ${candidate.name} for ${candidate.position} in the upcoming SEC elections! #VoteLEAD`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(
        `Support ${candidate.name} for ${candidate.position}! Check out ${CAMPAIGN_SETTINGS.partylistName}: ${window.location.href}`
      );
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200 w-full max-w-full">
      <div 
        className="relative w-full max-w-md bg-gradient-to-b from-[#2d0f05] via-[#1c0803] to-[#250d04] border border-orange-500/60 rounded-3xl shadow-2xl shadow-orange-950 overflow-hidden text-neutral-100 max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Ribbon */}
        <div className="relative bg-gradient-to-r from-orange-600 via-amber-600 to-orange-700 p-5 sm:p-6 text-white overflow-hidden border-b border-orange-400/40">
          <div className="relative z-10 flex items-start justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-black/30 backdrop-blur-md text-[10px] sm:text-xs font-bold uppercase tracking-wider text-amber-200 border border-white/20 mb-2">
                <span>Ballot #{candidate.ballotNumber}</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black font-display tracking-tight text-white uppercase">
                {candidate.name}
              </h2>
              <p className="text-xs sm:text-sm text-amber-200 font-semibold mt-0.5">
                Running for {candidate.position}
              </p>
              <div className="flex items-center gap-1.5 mt-2 text-[10px] sm:text-[11px] text-amber-100/90 font-medium">
                <img
                  src={CAMPAIGN_SETTINGS.schoolLogoSrc}
                  alt={CAMPAIGN_SETTINGS.schoolName}
                  className="w-3.5 h-3.5 object-contain drop-shadow-sm"
                  onError={(e) => {
                    const target = e.currentTarget;
                    if (CAMPAIGN_SETTINGS.schoolLogoPng && !target.src.endsWith('.png')) {
                      target.src = CAMPAIGN_SETTINGS.schoolLogoPng;
                    }
                  }}
                />
                <span>{CAMPAIGN_SETTINGS.schoolName}</span>
                <span className="text-white/40">·</span>
                <img
                  src={CAMPAIGN_SETTINGS.secLogoSrc}
                  alt="SEC"
                  className="w-3.5 h-3.5 object-contain"
                  onError={(e) => {
                    const target = e.currentTarget;
                    if (CAMPAIGN_SETTINGS.secLogoPng && !target.src.endsWith('.png')) {
                      target.src = CAMPAIGN_SETTINGS.secLogoPng;
                    }
                  }}
                />
                <span className="text-amber-300 font-semibold">SEC Certified</span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center transition border border-white/20 cursor-pointer shrink-0"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Body Content */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-4 text-neutral-200">
          
          {/* Candidate Photo Centered in Frame */}
          <div className="relative w-full aspect-square sm:aspect-[4/3] rounded-2xl overflow-hidden bg-[#1f0a04] border border-orange-600/40 shadow-inner">
            {candidate.photoUrl ? (
              <img
                src={candidate.photoUrl}
                alt={candidate.name}
                className="w-full h-full object-cover object-center"
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center text-center p-3">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-orange-600 to-amber-700 flex items-center justify-center text-amber-200 mb-2">
                  <User className="w-8 h-8" />
                </div>
              </div>
            )}
          </div>

          {/* Official Ballot Mark Card */}
          <div className="p-3.5 rounded-xl bg-gradient-to-r from-orange-950/70 to-amber-950/60 border border-orange-500/50 flex items-center justify-between gap-3 text-xs">
            <div>
              <span className="font-bold text-white block">Official Ballot Mark</span>
              <span className="text-amber-200/90 text-[11px]">LEAD Partylist · Official Slate</span>
            </div>
            <div className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-orange-600 to-amber-600 text-white font-black font-display text-xs sm:text-sm tracking-wider shrink-0 shadow-sm border border-amber-300/40 truncate max-w-[180px]">
              [✓] #{candidate.ballotNumber} {candidate.name.split(' ')[0].toUpperCase()}
            </div>
          </div>

          {copiedLink && (
            <div className="p-2.5 rounded-xl bg-emerald-950/80 border border-emerald-500/50 text-emerald-300 text-xs text-center font-semibold animate-in fade-in">
              ✓ Campaign link copied to clipboard!
            </div>
          )}

        </div>

        {/* Footer Actions */}
        <div className="p-4 sm:p-5 bg-[#1b0803] border-t border-orange-800/40 flex items-center justify-between gap-3">
          <button
            onClick={() => onCheer(candidate.id)}
            className="flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-xl bg-orange-950/80 hover:bg-orange-900 border border-orange-600/50 text-orange-200 hover:text-white transition active:scale-95 cursor-pointer text-xs font-semibold shadow-sm"
          >
            <Heart className="w-4 h-4 text-red-500 fill-red-500/60" />
            <span>Cheer Candidate</span>
            <span className="px-1.5 py-0.5 rounded-md bg-orange-800 text-[10px] font-bold text-amber-200">
              {cheerCount}
            </span>
          </button>

          <button
            onClick={handleShare}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white transition active:scale-95 cursor-pointer text-xs font-bold shadow-lg shadow-orange-950 border border-amber-400/30"
          >
            {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-200" /> : <Share2 className="w-3.5 h-3.5" />}
            <span>{copiedLink ? 'Copied' : 'Share'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
