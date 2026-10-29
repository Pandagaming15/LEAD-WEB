import React, { useState } from 'react';
import { X, Check, Vote, Sparkles, Copy, CheckCheck, RefreshCw, Printer } from 'lucide-react';
import confetti from 'canvas-confetti';
import { CANDIDATE_ROSTER, CAMPAIGN_SETTINGS } from '../data/campaignData';

interface SampleBallotModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SampleBallotModal: React.FC<SampleBallotModalProps> = ({ isOpen, onClose }) => {
  const [selectedIds, setSelectedIds] = useState<Set<string>>(
    new Set(CANDIDATE_ROSTER.map((c) => c.id))
  );
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleToggle = (id: string) => {
    const next = new Set(selectedIds);
    if (next.has(id)) {
      next.delete(id);
    } else {
      next.add(id);
    }
    setSelectedIds(next);
  };

  const handleSelectAll = () => {
    setSelectedIds(new Set(CANDIDATE_ROSTER.map((c) => c.id)));
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#ea580c', '#f59e0b', '#dc2626', '#ffffff'],
    });
  };

  const handleClear = () => {
    setSelectedIds(new Set());
  };

  const isStraightParty = selectedIds.size === CANDIDATE_ROSTER.length;

  const handleCopySummary = () => {
    const list = CANDIDATE_ROSTER.map((c) => {
      const isMarked = selectedIds.has(c.id);
      return `[${isMarked ? '✓' : ' '}] #${c.ballotNumber} ${c.position}: ${c.name}`;
    }).join('\n');

    const text = `🗳️ OFFICIAL SAMPLE BALLOT - LEAD PARTYLIST\n${CAMPAIGN_SETTINGS.schoolName} · ${CAMPAIGN_SETTINGS.councilName}\nDate: ${new Date(CAMPAIGN_SETTINGS.electionDate).toLocaleDateString()}\n\n${list}\n\n#VoteLEAD #LeadersInAction`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200 w-full max-w-full">
      <div 
        className="relative w-full max-w-3xl bg-gradient-to-b from-[#2d0f05] via-[#1c0803] to-[#250d04] border border-orange-500/60 rounded-3xl shadow-2xl shadow-orange-950 overflow-hidden text-neutral-100 max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        {/* Official Ballot Header with Dual Seals */}
        <div className="bg-gradient-to-r from-[#2c0e04] via-[#3a1306] to-[#2c0e04] p-4 sm:p-5 text-white border-b border-orange-500/40 relative">
          <div className="flex items-center justify-between gap-3">
            
            {/* School Logo */}
            <div className="flex flex-col items-center shrink-0">
              <div className="w-11 h-11 sm:w-13 sm:h-13 flex items-center justify-center drop-shadow-md">
                <img
                  src={CAMPAIGN_SETTINGS.schoolLogoSrc}
                  alt="CVE Colleges, Inc. Official Logo"
                  className="w-full h-full object-contain filter drop-shadow"
                  onError={(e) => {
                    const target = e.currentTarget;
                    if (CAMPAIGN_SETTINGS.schoolLogoPng && !target.src.endsWith('.png')) {
                      target.src = CAMPAIGN_SETTINGS.schoolLogoPng;
                    }
                  }}
                />
              </div>
              <span className="text-[8px] text-amber-200 uppercase font-semibold mt-1 hidden xs:block">CVE Colleges</span>
            </div>

            {/* Official Ballot Title & Heading */}
            <div className="text-center flex-1 px-2">
              <p className="text-[9px] sm:text-[10px] uppercase tracking-widest text-orange-300/80 font-bold">
                Republic of the Philippines · Quezon
              </p>
              <p className="text-[10px] sm:text-xs uppercase font-extrabold text-amber-200 tracking-wider">
                {CAMPAIGN_SETTINGS.schoolName}
              </p>
              <h3 className="text-base sm:text-xl font-black font-display uppercase tracking-tight text-white mt-0.5">
                Official Sample Ballot
              </h3>
              <p className="text-[9px] sm:text-[11px] text-orange-200/90 font-medium">
                {CAMPAIGN_SETTINGS.councilName} Elections · <span className="text-amber-300 font-bold">LEAD Partylist Slate</span>
              </p>
            </div>

            {/* SEC Logo & Close */}
            <div className="flex items-center gap-2 sm:gap-3 shrink-0">
              <div className="flex flex-col items-center">
                <div className="w-11 h-11 sm:w-13 sm:h-13 flex items-center justify-center drop-shadow-md">
                  <img
                    src={CAMPAIGN_SETTINGS.secLogoSrc}
                    alt="SEC Official Seal"
                    className="w-full h-full object-contain filter drop-shadow"
                    onError={(e) => {
                      const target = e.currentTarget;
                      if (CAMPAIGN_SETTINGS.secLogoPng && !target.src.endsWith('.png')) {
                        target.src = CAMPAIGN_SETTINGS.secLogoPng;
                      }
                    }}
                  />
                </div>
                <span className="text-[8px] text-amber-300 uppercase font-semibold mt-1 hidden xs:block">SEC Accredited</span>
              </div>

              <button
                onClick={onClose}
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center transition border border-white/20 cursor-pointer shrink-0 ml-1"
                aria-label="Close ballot"
              >
                <X className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>

          </div>
        </div>

        {/* Toolbar & Straight Slate Trigger */}
        <div className="p-3 sm:p-4 bg-[#230b04] border-b border-orange-800/40 flex flex-wrap items-center justify-between gap-2.5 text-xs">
          <div className="flex items-center gap-2">
            <span className="text-orange-200/80">Selected:</span>
            <span className="font-bold text-amber-300 font-mono text-sm">
              {selectedIds.size} / {CANDIDATE_ROSTER.length}
            </span>
            {isStraightParty && (
              <span className="px-2 py-0.5 rounded-full bg-emerald-950/90 text-emerald-300 border border-emerald-500/50 text-[10px] font-bold">
                ✓ Straight LEAD Slate
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleSelectAll}
              className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white font-bold transition flex items-center gap-1.5 cursor-pointer shadow-md shadow-orange-950 text-xs border border-amber-300/40"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-100" />
              <span>Vote Straight LEAD</span>
            </button>
            <button
              onClick={handleClear}
              className="px-2.5 py-1.5 rounded-lg bg-[#2e1005] hover:bg-[#3d1507] text-neutral-300 hover:text-white transition flex items-center gap-1 cursor-pointer border border-orange-700/40 text-xs"
              title="Reset ballot"
            >
              <RefreshCw className="w-3.5 h-3.5 text-amber-400" />
              <span>Reset</span>
            </button>
          </div>
        </div>

        {/* Ballot Grid */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-3 bg-[#180702]">
          <div className="p-2.5 sm:p-3 rounded-xl bg-orange-950/50 border border-orange-700/40 text-[11px] text-amber-200 text-center">
            👉 Tap on any candidate to toggle vote marker. Vote straight LEAD Partylist for full slate governance!
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-2.5">
            {CANDIDATE_ROSTER.map((candidate) => {
              const isMarked = selectedIds.has(candidate.id);

              return (
                <div
                  key={candidate.id}
                  onClick={() => handleToggle(candidate.id)}
                  className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                    isMarked
                      ? 'bg-gradient-to-r from-orange-950 via-[#361307] to-orange-950 border-orange-400 text-white shadow-md shadow-orange-950/60'
                      : 'bg-[#220a04]/90 border-orange-900/40 text-neutral-400 opacity-60 hover:opacity-90'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    {/* Ballot Oval / Checkbox */}
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition ${
                        isMarked
                          ? 'border-amber-400 bg-orange-600 text-white shadow-sm'
                          : 'border-neutral-500 bg-neutral-900'
                      }`}
                    >
                      {isMarked && <Check className="w-3 h-3 stroke-[3]" />}
                    </div>

                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] font-mono font-bold text-amber-300">
                          #{candidate.ballotNumber}
                        </span>
                        <span className="text-xs font-semibold text-orange-200 uppercase truncate">
                          {candidate.position}
                        </span>
                      </div>
                      <div className="text-xs sm:text-sm font-bold text-white truncate">
                        {candidate.name}
                      </div>
                    </div>
                  </div>

                  <span className="text-[10px] font-bold text-orange-400 font-display uppercase tracking-wider shrink-0">
                    LEAD
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-3.5 sm:p-5 bg-[#230b04] border-t border-orange-800/40 flex flex-wrap items-center justify-between gap-2.5">
          <div className="text-[11px] sm:text-xs text-orange-200/80">
            Election: <span className="text-amber-300 font-semibold">{new Date(CAMPAIGN_SETTINGS.electionDate).toLocaleDateString()}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopySummary}
              className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-[#321006] to-[#250d05] hover:from-orange-900/60 hover:to-amber-900/60 border border-orange-600/50 text-amber-200 hover:text-white transition flex items-center gap-1.5 text-xs font-semibold cursor-pointer shadow-sm"
            >
              {copied ? <CheckCheck className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied!' : 'Copy Ballot'}</span>
            </button>

            <button
              onClick={() => window.print()}
              className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white transition flex items-center gap-1.5 text-xs font-bold cursor-pointer shadow-lg shadow-orange-950 border border-amber-300/40"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Sheet</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
