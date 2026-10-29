import React, { useState } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { CountdownStrip } from './components/CountdownStrip';
import { CandidateRosterSection } from './components/CandidateRosterSection';
import { SampleBallotSection } from './components/SampleBallotSection';
import { FreedomWallSection } from './components/FreedomWallSection';
import { Footer } from './components/Footer';
import { CampaignJinglePlayer } from './components/CampaignJinglePlayer';
import { CandidateDetailModal } from './components/CandidateDetailModal';
import { SampleBallotModal } from './components/SampleBallotModal';
import { PlatformSection } from './components/PlatformSection';
import { Candidate, CANDIDATE_ROSTER } from './data/campaignData';

export default function App() {
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);
  const [ballotModalOpen, setBallotModalOpen] = useState(false);

  // Candidate cheers state (persisted in localStorage)
  const [cheersMap, setCheersMap] = useState<Record<string, number>>(() => {
    try {
      const saved = localStorage.getItem('lead_candidate_cheers');
      if (saved) return JSON.parse(saved);
    } catch {
      // Ignore
    }
    const initial: Record<string, number> = {};
    CANDIDATE_ROSTER.forEach((c, idx) => {
      initial[c.id] = 120 + (idx * 17) % 85;
    });
    return initial;
  });

  const handleCheer = (id: string) => {
    setCheersMap((prev) => {
      const next = {
        ...prev,
        [id]: (prev[id] || 0) + 1,
      };
      try {
        localStorage.setItem('lead_candidate_cheers', JSON.stringify(next));
      } catch {
        // Ignore
      }
      return next;
    });
  };

  const handleExploreCandidates = () => {
    const el = document.getElementById('candidates');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#240b03] via-[#160602] to-[#200a03] text-neutral-100 flex flex-col font-sans selection:bg-orange-600 selection:text-white w-full max-w-full overflow-x-hidden relative">
      {/* Subtle warm ambient radial highlights behind page */}
      <div className="fixed top-0 left-1/4 w-[600px] h-[600px] bg-orange-600/10 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="fixed top-1/2 right-10 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-[130px] pointer-events-none -z-10" />
      <div className="fixed bottom-10 left-10 w-[500px] h-[500px] bg-red-600/10 rounded-full blur-[140px] pointer-events-none -z-10" />

      {/* Top Bar Navigation */}
      <Header
        onOpenBallotModal={() => setBallotModalOpen(true)}
      />

      {/* Main Campaign Content */}
      <main className="flex-1 w-full max-w-full overflow-x-hidden">
        {/* Hero with Pubmat Background & Glowing Showcase */}
        <HeroSection
          onOpenBallotModal={() => setBallotModalOpen(true)}
          onExploreCandidates={handleExploreCandidates}
        />

        {/* Live Election Countdown Strip */}
        <CountdownStrip />

        {/* Official 16 Candidates Slate with Photo Showcase & Customization Notes */}
        <CandidateRosterSection
          onSelectCandidate={(c) => setSelectedCandidate(c)}
          cheersMap={cheersMap}
          onCheer={handleCheer}
        />

        {/* Core advocacy / 4-pillar platform */}
        <PlatformSection />

        {/* Interactive Sample Ballot Mockup & Cheat Sheet */}
        <SampleBallotSection
          onOpenFullModal={() => setBallotModalOpen(true)}
        />

        {/* Freedom Wall & Real Student Cheers */}
        <FreedomWallSection />
      </main>

      {/* Campaign Footer */}
      <Footer />

      {/* Invisible Background Music Engine (No buttons shown) */}
      <CampaignJinglePlayer />

      {/* Modals */}
      <CandidateDetailModal
        candidate={selectedCandidate}
        onClose={() => setSelectedCandidate(null)}
        onCheer={handleCheer}
        cheerCount={selectedCandidate ? cheersMap[selectedCandidate.id] || 0 : 0}
      />

      <SampleBallotModal
        isOpen={ballotModalOpen}
        onClose={() => setBallotModalOpen(false)}
      />
    </div>
  );
}
