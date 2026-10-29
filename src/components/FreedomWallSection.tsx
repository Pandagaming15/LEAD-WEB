import React, { useState, useEffect } from 'react';
import { Heart, Send, CheckCircle2, MessageSquareQuote, Flame } from 'lucide-react';
import confetti from 'canvas-confetti';
import { CAMPAIGN_SETTINGS } from '../data/campaignData';

interface PledgeMessage {
  id: string;
  name: string;
  course: string;
  message: string;
  timestamp: string;
  likes: number;
}

export const FreedomWallSection: React.FC = () => {
  // Starts clean with 0 defaults as requested
  const [pledges, setPledges] = useState<PledgeMessage[]>([]);
  const [pledgeCount, setPledgeCount] = useState<number>(0);
  const [hasPledged, setHasPledged] = useState<boolean>(false);
  const [name, setName] = useState('');
  const [course, setCourse] = useState('');
  const [message, setMessage] = useState('');

  // Load from localStorage if present
  useEffect(() => {
    try {
      const saved = localStorage.getItem('lead_campaign_pledges');
      const savedCount = localStorage.getItem('lead_campaign_pledge_count');
      const pledgedStatus = localStorage.getItem('lead_user_pledged');
      if (saved) setPledges(JSON.parse(saved));
      if (savedCount) setPledgeCount(parseInt(savedCount, 10));
      if (pledgedStatus) setHasPledged(true);
    } catch {
      // Ignore
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    const newPledge: PledgeMessage = {
      id: `p_${Date.now()}`,
      name: name.trim(),
      course: course.trim() || 'Student Supporter',
      message: message.trim(),
      timestamp: 'Just now',
      likes: 1,
    };

    const updated = [newPledge, ...pledges];
    const newCount = pledgeCount + 1;

    setPledges(updated);
    setPledgeCount(newCount);
    setHasPledged(true);
    setName('');
    setCourse('');
    setMessage('');

    try {
      localStorage.setItem('lead_campaign_pledges', JSON.stringify(updated));
      localStorage.setItem('lead_campaign_pledge_count', newCount.toString());
      localStorage.setItem('lead_user_pledged', 'true');
    } catch {
      // Ignore
    }

    confetti({
      particleCount: 60,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#ea580c', '#f59e0b', '#ef4444', '#ffffff'],
    });
  };

  const handleLike = (id: string) => {
    const updated = pledges.map((p) => {
      if (p.id === id) {
        return { ...p, likes: p.likes + 1 };
      }
      return p;
    });
    setPledges(updated);
    try {
      localStorage.setItem('lead_campaign_pledges', JSON.stringify(updated));
    } catch {
      // Ignore
    }
  };

  return (
    <section id="freedom-wall" className="py-12 sm:py-20 bg-gradient-to-b from-[#250d04] via-[#1a0702] to-[#240c04] border-t border-orange-700/40 w-full max-w-full overflow-hidden">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        
        {/* Header & Pledge Counter */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-300">
            <Flame className="w-4 h-4 text-orange-400 fill-orange-400" />
            <span>Student Voices</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black font-display tracking-tight text-white uppercase">
            Freedom Wall & <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-300 to-orange-500">Student Pledges</span>
          </h2>
          <p className="text-xs sm:text-sm text-orange-200/90 leading-relaxed">
            Pledge your support and write a message for the LEAD Partylist slate!
          </p>

          {/* Simple Clean Counter */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-orange-950/80 border border-orange-500/50 text-xs text-amber-200 shadow-md">
            <Heart className="w-4 h-4 text-red-500 fill-red-500" />
            <span className="font-bold text-white font-mono text-sm">{pledgeCount}</span>
            <span>Students Pledged</span>
          </div>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-start">
          
          {/* Form */}
          <div className="lg:col-span-5 bg-gradient-to-b from-[#2e1006]/95 via-[#200903]/95 to-[#2c0e05]/95 rounded-2xl border border-orange-600/50 p-4 sm:p-6 shadow-xl">
            <h3 className="text-base sm:text-lg font-bold font-display text-white mb-1 flex items-center gap-2">
              <MessageSquareQuote className="w-4 h-4 text-orange-400" />
              <span>Leave Your Cheer</span>
            </h3>
            <p className="text-xs text-orange-200/80 mb-4">
              Write a message of support for Shine Vizagar and the slate.
            </p>

            {hasPledged ? (
              <div className="p-4 rounded-xl bg-gradient-to-b from-orange-950/70 to-emerald-950/30 border border-emerald-500/50 text-center space-y-2">
                <div className="w-10 h-10 rounded-full bg-emerald-950 flex items-center justify-center text-emerald-400 mx-auto border border-emerald-500/50">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <h4 className="text-sm font-bold text-white">
                  Pledge Recorded!
                </h4>
                <p className="text-xs text-neutral-300">
                  Thank you for standing with LEAD Partylist on Election Day.
                </p>
                <button
                  onClick={() => setHasPledged(false)}
                  className="text-xs font-semibold text-amber-300 hover:underline cursor-pointer pt-1 block mx-auto"
                >
                  Write another cheer
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-neutral-200 mb-1">
                    Your Name or Alias *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Maria / Proud 2nd Year"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-[#1b0803]/90 border border-orange-700/60 text-white placeholder-orange-300/40 text-xs focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-200 mb-1">
                    Course / Year (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. BS Hospitality Management"
                    value={course}
                    onChange={(e) => setCourse(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-[#1b0803]/90 border border-orange-700/60 text-white placeholder-orange-300/40 text-xs focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-200 mb-1">
                    Your Campaign Message *
                  </label>
                  <textarea
                    required
                    rows={3}
                    placeholder="Leave an encouraging message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-[#1b0803]/90 border border-orange-700/60 text-white placeholder-orange-300/40 text-xs focus:outline-none focus:border-amber-400"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-gradient-to-r from-orange-600 via-amber-500 to-orange-600 hover:from-orange-500 hover:to-amber-400 text-white font-bold text-xs uppercase tracking-wider transition shadow-md shadow-orange-950 flex items-center justify-center gap-1.5 cursor-pointer active:scale-98 border border-amber-300/40"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Post to Freedom Wall</span>
                </button>
              </form>
            )}
          </div>

          {/* Feed */}
          <div className="lg:col-span-7 space-y-3">
            <div className="text-xs text-orange-200/80 font-semibold">
              Student Cheers ({pledges.length})
            </div>

            {pledges.length === 0 ? (
              <div className="text-center py-10 px-4 bg-gradient-to-b from-[#2a0e05]/80 to-[#1d0803]/80 rounded-2xl border border-orange-800/40 text-neutral-300 space-y-2">
                <Heart className="w-8 h-8 text-orange-400/60 mx-auto" />
                <p className="text-xs font-semibold text-white">
                  Be the first to post a cheer on the Freedom Wall!
                </p>
                <p className="text-[11px] text-orange-200/70">
                  Fill out the quick form to pledge your vote for LEAD.
                </p>
              </div>
            ) : (
              <div className="space-y-3 max-h-[460px] overflow-y-auto pr-1">
                {pledges.map((item) => (
                  <div
                    key={item.id}
                    className="bg-gradient-to-b from-[#2d0e05]/90 to-[#1e0903]/90 rounded-xl border border-orange-700/40 p-3.5 sm:p-4 shadow-sm"
                  >
                    <div className="flex items-start justify-between gap-2 mb-1.5">
                      <div>
                        <h4 className="text-xs sm:text-sm font-bold text-white font-display">
                          {item.name}
                        </h4>
                        <p className="text-[10px] text-amber-300">
                          {item.course}
                        </p>
                      </div>
                      <span className="text-[10px] text-orange-300/60">
                        {item.timestamp}
                      </span>
                    </div>

                    <p className="text-xs text-neutral-200 leading-relaxed font-normal">
                      &ldquo;{item.message}&rdquo;
                    </p>

                    <div className="mt-2 pt-2 border-t border-orange-850/40 flex items-center justify-between">
                      <span className="text-[10px] font-bold text-orange-400 font-display">
                        #VoteLEAD
                      </span>

                      <button
                        type="button"
                        onClick={() => handleLike(item.id)}
                        className="flex items-center gap-1 px-2 py-0.5 rounded-lg bg-orange-950/70 hover:bg-orange-900 border border-orange-700/40 text-neutral-200 text-[11px] cursor-pointer"
                      >
                        <Heart className="w-3 h-3 text-red-500 fill-red-500/60" />
                        <span>{item.likes}</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

      </div>
    </section>
  );
};
