import React, { useState, useEffect } from 'react';
import { Language } from '../types/cricket';
import { notificationService } from '../services/notificationService';
import { Bell, Check, X } from 'lucide-react';

interface PushNotificationBannerProps {
  lang: Language;
}

export const PushNotificationBanner: React.FC<PushNotificationBannerProps> = ({ lang }) => {
  const [permission, setPermission] = useState<NotificationPermission>('default');
  const [isDismissed, setIsDismissed] = useState<boolean>(false);

  useEffect(() => {
    if (notificationService.isSupported()) {
      setPermission(notificationService.getPermission());
    }
  }, []);

  if (!notificationService.isSupported() || permission === 'granted' || isDismissed) {
    return null;
  }

  const handleEnable = async () => {
    const res = await notificationService.requestPermission();
    setPermission(res);
  };

  return (
    <div className="p-3.5 sm:p-4 rounded-2xl bg-gradient-to-r from-emerald-950/60 via-slate-900 to-slate-900 border border-emerald-500/30 flex items-center justify-between flex-wrap gap-3 shadow-lg">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
          <Bell className="w-5 h-5" />
        </div>
        <div>
          <h4 className="text-xs sm:text-sm font-bold text-white">
            {lang === 'ta' ? 'நேரலை விக்கெட் & போட்டி அறிவிப்புகள்' : 'Instant Wicket & Match Alerts'}
          </h4>
          <p className="text-[11px] text-slate-300">
            {lang === 'ta'
              ? 'முக்கிய விக்கெட்டுகள் மற்றும் முடிவு தருணங்களில் உடனடி நோட்டிபிகேஷன் பெறுக'
              : 'Get immediate browser notifications on key wickets, boundaries, and match results'}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={handleEnable}
          className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
        >
          <Check className="w-3.5 h-3.5" />
          <span>{lang === 'ta' ? 'அனுமதி (Enable)' : 'Enable Alerts'}</span>
        </button>
        <button
          onClick={() => setIsDismissed(true)}
          className="p-1.5 rounded-lg text-slate-400 hover:text-white transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
