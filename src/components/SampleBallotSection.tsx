import React, { useState } from 'react';
import { Vote, Check, Sparkles, Copy, CheckCheck, RefreshCw } from 'lucide-react';
import confetti from 'canvas-confetti';
import { CANDIDATE_ROSTER, CAMPAIGN_SETTINGS } from '../data/campaignData';

interface SampleBallotSectionProps {
  onOpenFullModal: () => void;
}

export const SampleBallotSection: React.FC<SampleBallotSectionProps> = ({ onOpenFullModal }) => {
  const [selectedIds, setSelectedIds] = useState<Set<string>>(
    new Set(CANDIDATE_ROSTER.map((c) => c.id))
  );
  const [copied, setCopied] = useState(false);

  const handleToggle = (id: string) => {
    const next = new Set(selectedIds);
    if (next.has(id)) {
      next.delete(id);
    } else {
      next.add(id);
    }
    setSelectedIds(next);
  };

  const handleSelectStraightLead = () => {
    setSelectedIds(new Set(CANDIDATE_ROSTER.map((c) => c.id)));
    confetti({
      particleCount: 65,
      spread: 70,
      origin: { y: 0.7 },
      colors: ['#ea580c', '#f59e0b', '#dc2626', '#ffffff'],
    });
  };

  const handleReset = () => {
    setSelectedIds(new Set());
  };

  const isStraightParty = selectedIds.size === CANDIDATE_ROSTER.length;

  const handleCopy = () => {
    const list = CANDIDATE_ROSTER.map((c) => {
      const isMarked = selectedIds.has(c.id);
      return `[${isMarked ? '✓' : ' '}] #${c.ballotNumber} ${c.position}: ${c.name}`;
    }).join('\n');

    const text = `🗳️ MY LEAD PARTYLIST BALLOT CHEAT SHEET\n${CAMPAIGN_SETTINGS.schoolName} · ${CAMPAIGN_SETTINGS.councilName}\nElection Date: ${new Date(CAMPAIGN_SETTINGS.electionDate).toLocaleDateString()}\n\n${list}\n\n#VoteLEAD #LeadersInAction`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section id="sample-ballot" className="py-12 sm:py-20 bg-gradient-to-b from-[#240c04] via-[#1c0803] to-[#250d04] border-t border-orange-700/40 w-full max-w-full overflow-hidden">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-orange-700/30">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-300">
              <Vote className="w-4 h-4 text-orange-400" />
              <span>Interactive Voting Practice</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black font-display tracking-tight text-white uppercase">
              Official <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-300 to-orange-500">Sample Ballot</span>
            </h2>
            <p className="text-xs sm:text-sm text-orange-200/90 leading-relaxed">
              Tap candidates or click below to mark all 16 LEAD leaders with a single tap.
            </p>
          </div>

          {/* Straight Slate & Actions */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={handleSelectStraightLead}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-orange-600 via-amber-500 to-orange-600 hover:from-orange-500 hover:to-amber-400 text-white font-bold text-xs uppercase tracking-wider transition shadow-md shadow-orange-950 flex items-center gap-1.5 cursor-pointer active:scale-95 border border-amber-300/40"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-100" />
              <span>Vote Straight LEAD</span>
            </button>

            <button
              onClick={handleReset}
              className="px-3 py-2 rounded-xl bg-[#2b0e05] hover:bg-[#3d1306] border border-orange-700/50 text-neutral-200 text-xs font-semibold transition cursor-pointer flex items-center gap-1 shadow-sm"
              title="Reset ballot"
            >
              <RefreshCw className="w-3.5 h-3.5 text-amber-400" />
              <span>Clear</span>
            </button>

            <button
              onClick={handleCopy}
              className="px-3 py-2 rounded-xl bg-gradient-to-r from-[#321006] to-[#250d05] hover:from-orange-900/60 hover:to-amber-900/60 border border-orange-600/50 text-amber-200 text-xs font-semibold transition flex items-center gap-1 cursor-pointer shadow-sm"
            >
              {copied ? <CheckCheck className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied!' : 'Copy Sheet'}</span>
            </button>
          </div>
        </div>

        {/* Counter Banner */}
        <div className="py-3 flex flex-wrap items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2">
            <span className="text-orange-200/80">Marked:</span>
            <span className="font-bold font-mono text-sm text-amber-300">
              {selectedIds.size} / {CANDIDATE_ROSTER.length}
            </span>
            {isStraightParty && (
              <span className="px-2 py-0.5 rounded-full bg-emerald-950/80 text-emerald-300 border border-emerald-500/50 text-[10px] font-bold">
                ✓ Full Straight LEAD Active
              </span>
            )}
          </div>
          <button
            onClick={onOpenFullModal}
            className="text-xs font-semibold text-amber-300 hover:text-amber-200 hover:underline cursor-pointer"
          >
            Open Printable Sheet →
          </button>
        </div>

        {/* Ballot Paper Look */}
        <div className="bg-gradient-to-b from-[#2a0e05]/95 to-[#1c0803]/95 border border-orange-600/40 rounded-2xl p-3.5 sm:p-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between gap-3 pb-3 border-b border-orange-800/40">
            {/* School Logo */}
            <div className="w-9 h-9 sm:w-11 sm:h-11 flex items-center justify-center shrink-0 drop-shadow-md">
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

            <div className="text-center space-y-0.5 flex-1">
              <span className="text-[9px] sm:text-[10px] uppercase font-bold tracking-widest text-amber-400 font-mono block">
                {CAMPAIGN_SETTINGS.schoolName} · {CAMPAIGN_SETTINGS.councilName} ELECTIONS
              </span>
              <h3 className="text-base sm:text-xl font-black font-display text-white">
                OFFICIAL LEAD PARTYLIST BALLOT SLATE
              </h3>
            </div>

            {/* SEC Logo */}
            <div className="w-9 h-9 sm:w-11 sm:h-11 flex items-center justify-center shrink-0 drop-shadow-md">
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
          </div>

          {/* Grid of Ballot Candidates */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
            {CANDIDATE_ROSTER.map((candidate) => {
              const isMarked = selectedIds.has(candidate.id);

              return (
                <div
                  key={candidate.id}
                  onClick={() => handleToggle(candidate.id)}
                  className={`p-3 rounded-xl border transition-all cursor-pointer select-none flex items-start gap-2.5 ${
                    isMarked
                      ? 'bg-gradient-to-br from-orange-950 via-[#361307] to-orange-950 border-orange-400 text-white shadow-md shadow-orange-950/60'
                      : 'bg-[#200903]/80 border-orange-900/40 text-neutral-400 opacity-60 hover:opacity-90'
                  }`}
                >
                  {/* Oval check circle */}
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5 transition ${
                      isMarked
                        ? 'border-amber-400 bg-orange-600 text-white shadow-sm'
                        : 'border-neutral-500 bg-neutral-900'
                    }`}
                  >
                    {isMarked && <Check className="w-3 h-3 stroke-[3]" />}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-1">
                      <span className="text-[10px] font-mono font-bold text-amber-300">
                        #{candidate.ballotNumber}
                      </span>
                      <span className="text-[9px] font-bold uppercase tracking-wider text-orange-400">
                        LEAD
                      </span>
                    </div>

                    <div className="text-[11px] font-semibold text-orange-200 uppercase truncate">
                      {candidate.position}
                    </div>

                    <div className="text-xs sm:text-sm font-bold text-white truncate mt-0.5">
                      {candidate.name}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
