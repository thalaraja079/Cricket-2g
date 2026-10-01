import { CricketMatch, BallEvent, Language } from '../types/cricket';

class NotificationService {
  public isSupported(): boolean {
    return typeof window !== 'undefined' && 'Notification' in window;
  }

  public getPermission(): NotificationPermission {
    if (!this.isSupported()) return 'denied';
    return Notification.permission;
  }

  public async requestPermission(): Promise<NotificationPermission> {
    if (!this.isSupported()) return 'denied';
    try {
      return await Notification.requestPermission();
    } catch {
      return 'denied';
    }
  }

  public notifyWicket(match: CricketMatch, ball: BallEvent, lang: Language) {
    if (this.getPermission() !== 'granted') return;
    const title = lang === 'ta' ? '🚨 விக்கெட் வீழ்ந்தது!' : '🚨 WICKET DOWN!';
    const body = lang === 'ta'
      ? `${match.titleTa}: ${ball.commentaryTa}`
      : `${match.title}: ${ball.commentaryEn}`;

    try {
      new Notification(title, {
        body,
        icon: '/favicon.ico',
      });
    } catch {
      // ignore
    }
  }

  public notifyMatchResult(match: any, lang: Language) {
    if (this.getPermission() !== 'granted') return;
    const title = lang === 'ta' ? '🏆 போட்டி முடிந்தது!' : '🏆 MATCH CONCLUDED!';
    const body = lang === 'ta' ? match.statusTextTa || match.titleTa : match.statusText || match.title;

    try {
      new Notification(title, {
        body,
        icon: '/favicon.ico',
      });
    } catch {
      // ignore
    }
  }
}

export const notificationService = new NotificationService();
