/**
 * Live Cricket API Connector with Google Search Grounding & 3P Cricket APIs
 */

import { CricketMatch } from '../types/cricket';

export interface CricketApiConfig {
  apiKey: string;
  provider: 'google_search' | 'bigballsdata' | 'cricketdata' | 'cricapi' | 'simulator';
  isLiveApiActive: boolean;
  autoRefreshIntervalSec: number;
}

const STORAGE_KEY = 'cricpulse_api_config';

export function getStoredApiConfig(): CricketApiConfig {
  if (typeof window === 'undefined') {
    return {
      apiKey: '',
      provider: 'google_search',
      isLiveApiActive: true,
      autoRefreshIntervalSec: 60,
    };
  }
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      return {
        apiKey: parsed.apiKey || '',
        provider: parsed.provider || 'google_search',
        isLiveApiActive: parsed.isLiveApiActive ?? true,
        autoRefreshIntervalSec: parsed.autoRefreshIntervalSec || 60,
      };
    }
  } catch {
    // ignore
  }
  return {
    apiKey: '',
    provider: 'google_search',
    isLiveApiActive: true,
    autoRefreshIntervalSec: 60,
  };
}

export function saveApiConfig(config: CricketApiConfig) {
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
  }
}

/**
 * Fetch top trending live cricket match from Google Search Grounding via server
 */
export async function fetchGoogleTrendingLiveMatch(forceRefresh: boolean = false): Promise<{
  success: boolean;
  match?: CricketMatch;
  source?: string;
  cached?: boolean;
  error?: string;
}> {
  try {
    const config = getStoredApiConfig();
    const headers: Record<string, string> = {};
    if (config.apiKey) {
      headers['x-gemini-api-key'] = config.apiKey.trim();
    }

    const url = `/api/cricket/trending-live${forceRefresh ? '?refresh=true' : ''}`;
    const res = await fetch(url, { headers });
    if (!res.ok) {
      const errData = await res.json().catch(() => ({}));
      return {
        success: false,
        error: errData.error || `HTTP ${res.status}: Failed to fetch Google Trending match`,
      };
    }
    const data = await res.json();
    if (data.success && data.match) {
      return {
        success: true,
        match: data.match as CricketMatch,
        source: data.source || 'googleSearch_grounding',
        cached: data.cached || data.fallbackCached,
      };
    }
    return {
      success: false,
      error: data.error || 'Invalid match payload from server',
    };
  } catch (err: any) {
    console.error('Error fetching Google Trending cricket:', err);
    return {
      success: false,
      error: err?.message || 'Network error fetching Google Trending match',
    };
  }
}

/**
 * Request Gemini AI Live Match Tactical Analysis
 */
export async function fetchLiveAiMatchAnalysis(
  matchTitle: string,
  currentScore: string,
  lang: 'ta' | 'en' = 'ta'
): Promise<{ success: boolean; analysis?: string; error?: string }> {
  try {
    const config = getStoredApiConfig();
    const headers: Record<string, string> = { 'Content-Type': 'application/json' };
    if (config.apiKey) {
      headers['x-gemini-api-key'] = config.apiKey.trim();
    }

    const res = await fetch('/api/cricket/ai-analysis', {
      method: 'POST',
      headers,
      body: JSON.stringify({ matchTitle, currentScore, lang }),
    });
    const data = await res.json();
    return data;
  } catch (err: any) {
    return {
      success: false,
      error: err?.message || 'Failed to connect to AI analysis service',
    };
  }
}

/**
 * Fetch matches from 3rd-party provider (CricAPI / BigBalls / CricketData)
 */
export async function fetchLiveMatchesFromProvider(
  provider: 'bigballsdata' | 'cricketdata' | 'cricapi',
  apiKey: string
) {
  if (!apiKey) return null;
  try {
    if (provider === 'bigballsdata') {
      const response = await fetch(
        `https://api.bigballsdata.com/v1/cricket/matches?api_key=${encodeURIComponent(apiKey)}`
      );
      if (!response.ok) return null;
      return await response.json();
    } else {
      const response = await fetch(
        `https://api.cricapi.com/v1/currentMatches?apikey=${encodeURIComponent(apiKey)}&offset=0`
      );
      if (!response.ok) return null;
      return await response.json();
    }
  } catch (err) {
    console.error(`Failed to fetch live matches from ${provider}:`, err);
    return null;
  }
}
