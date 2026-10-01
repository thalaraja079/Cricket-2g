import React from 'react';
import { Language } from '../types/cricket';
import { t } from '../utils/translations';
import { mockRecentResults } from '../data/mockCricketData';
import { CheckCircle2, Award, Calendar } from 'lucide-react';

interface RecentResultsProps {
  lang: Language;
}

export const RecentResults: React.FC<RecentResultsProps> = ({ lang }) => {
  const tr = t[lang];

  return (
    <div className="space-y-6">
      <div className="pb-2 border-b border-slate-800">
        <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center gap-2">
          <CheckCircle2 className="w-6 h-6 text-blue-400" />
          <span>{tr.completed}</span>
        </h2>
        <p className="text-xs text-slate-400 mt-1">
          {lang === 'ta'
            ? 'சமீபத்தில் முடிவடைந்த போட்டிகளின் அதிகாரப்பூர்வ முடிவுகள் மற்றும் சிறப்பாட்டக்காரர் விவரங்கள்'
            : 'Recent match results, scores, and Player of the Match awards'}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {mockRecentResults.map((r) => (
          <div
            key={r.id}
            className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-slate-700 transition-all space-y-3.5 shadow-lg"
          >
            <div className="flex items-center justify-between text-xs text-slate-400 pb-2 border-b border-slate-800/80">
              <span className="font-semibold text-blue-400">{r.tournament} • {r.matchNumber}</span>
              <span className="flex items-center gap-1 text-slate-400">
                <Calendar className="w-3.5 h-3.5" />
                <span>{lang === 'ta' ? r.dateTa : r.date}</span>
              </span>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xl">{r.team1.logo}</span>
                  <span className="font-bold text-white text-sm">
                    {lang === 'ta' ? r.team1.nameTa : r.team1.name}
                  </span>
                </div>
                <span className="font-mono font-bold text-white text-sm">{r.score1}</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xl">{r.team2.logo}</span>
                  <span className="font-bold text-white text-sm">
                    {lang === 'ta' ? r.team2.nameTa : r.team2.name}
                  </span>
                </div>
                <span className="font-mono font-bold text-white text-sm">{r.score2}</span>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between flex-wrap gap-2 text-xs">
              <span className="text-emerald-400 font-bold">
                {lang === 'ta' ? r.winMarginTa : r.winMarginEn}
              </span>
              <span className="text-amber-300 flex items-center gap-1">
                <Award className="w-3.5 h-3.5" />
                <span>{lang === 'ta' ? r.playerOfMatchTa : r.playerOfMatchEn}</span>
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
