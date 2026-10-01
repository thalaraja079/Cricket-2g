import React from 'react';
import { Language } from '../types/cricket';
import { t } from '../utils/translations';
import { mockUpcomingMatches } from '../data/mockCricketData';
import { Calendar, Clock, MapPin, Bell } from 'lucide-react';

interface UpcomingMatchesProps {
  lang: Language;
}

export const UpcomingMatches: React.FC<UpcomingMatchesProps> = ({ lang }) => {
  const tr = t[lang];

  return (
    <div className="space-y-6">
      <div className="pb-2 border-b border-slate-800">
        <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center gap-2">
          <Calendar className="w-6 h-6 text-emerald-400" />
          <span>{tr.upcoming}</span>
        </h2>
        <p className="text-xs text-slate-400 mt-1">
          {lang === 'ta'
            ? 'அடுத்த வரவிருக்கும் சர்வதேச மற்றும் ஐபிஎல் போட்டிகளின் அட்டவணை'
            : 'Schedule of upcoming international and IPL 2026 fixtures'}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {mockUpcomingMatches.map((m) => (
          <div
            key={m.id}
            className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between space-y-4 shadow-lg"
          >
            <div className="flex items-center justify-between text-xs text-slate-400 pb-2 border-b border-slate-800/80">
              <span className="font-semibold text-emerald-400">{m.tournament} • {m.format}</span>
              <span className="px-2 py-0.5 rounded-full bg-slate-800 text-[11px] font-mono">
                {m.matchNumber}
              </span>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="text-2xl">{m.team1.logo}</span>
                  <div>
                    <h4 className="font-bold text-white text-sm">
                      {lang === 'ta' ? m.team1.nameTa : m.team1.name}
                    </h4>
                    <span className="text-[11px] text-slate-400 font-mono">{m.team1.shortName}</span>
                  </div>
                </div>
                <span className="text-xs font-black text-slate-500">VS</span>
                <div className="flex items-center gap-2.5 text-right">
                  <div>
                    <h4 className="font-bold text-white text-sm">
                      {lang === 'ta' ? m.team2.nameTa : m.team2.name}
                    </h4>
                    <span className="text-[11px] text-slate-400 font-mono">{m.team2.shortName}</span>
                  </div>
                  <span className="text-2xl">{m.team2.logo}</span>
                </div>
              </div>

              <div className="pt-2 text-xs text-slate-400 space-y-1">
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-amber-400" />
                  <span className="text-slate-300 font-semibold">{lang === 'ta' ? m.timeTa : m.time}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-slate-500" />
                  <span className="truncate">{lang === 'ta' ? m.venueTa : m.venue}</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => alert(lang === 'ta' ? 'போட்டிக்கான நினைவூட்டல் பதிவு செய்யப்பட்டது!' : 'Match reminder registered!')}
              className="w-full py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <Bell className="w-3.5 h-3.5 text-emerald-400" />
              <span>{lang === 'ta' ? 'நினைவூட்டல் அமை (Remind Me)' : 'Set Reminder'}</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
