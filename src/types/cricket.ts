export type Language = 'ta' | 'en';

export type MatchStatus = 'LIVE' | 'UPCOMING' | 'COMPLETED';

export interface CricketTeam {
  id: string;
  name: string;
  nameTa: string;
  shortName: string;
  color: string;
  secondaryColor: string;
  logo: string;
}

export interface BatsmanStats {
  id: string;
  name: string;
  nameTa: string;
  role: string;
  runs: number;
  balls: number;
  fours: number;
  sixes: number;
  strikeRate: number;
  isStriker?: boolean;
  isOut?: boolean;
  dismissalInfo?: string;
  dismissalInfoTa?: string;
}

export interface BowlerStats {
  id: string;
  name: string;
  nameTa: string;
  role: string;
  overs: number;
  ballsCurrentOver: number;
  maidens: number;
  runs: number;
  wickets: number;
  economy: number;
  isCurrentBowler?: boolean;
}

export interface FallOfWicket {
  wicketNo: number;
  score: number;
  batsmanName: string;
  over: number;
}

export interface ExtrasData {
  total: number;
  byes: number;
  legByes: number;
  wides: number;
  noBalls: number;
}

export interface BallEvent {
  id?: string;
  ballNumber?: number;
  overNumber?: number;
  ball?: number;
  over?: number;
  runs: number;
  isFour: boolean;
  isSix: boolean;
  isWicket: boolean;
  wicketType?: string;
  batsmanName?: string;
  bowlerName?: string;
  isExtra?: boolean;
  extraType?: 'wide' | 'no-ball' | 'bye' | 'leg-bye';
  commentaryEn: string;
  commentaryTa: string;
  speedKph?: number;
  speedKmph?: number;
  timestamp: string;
}

export interface InningsData {
  teamId: string;
  teamName: string;
  teamShort: string;
  totalRuns: number;
  wickets: number;
  overs: number;
  balls: number;
  batsmen: BatsmanStats[];
  bowlers: BowlerStats[];
  extras: ExtrasData;
  fallOfWickets: FallOfWicket[];
  currentPartnership?: {
    runs: number;
    balls: number;
  };
  lastWicket?: {
    player: string;
    runs: number;
    scoreAtDismissal: string;
  };
}

export interface CricketMatch {
  id: string;
  title: string;
  titleTa: string;
  tournament: string;
  matchNumber: string;
  status: MatchStatus;
  statusText?: string;
  statusTextTa?: string;
  tossResult?: string;
  tossResultTa?: string;
  winProbabilityTeam1?: number;
  winProbabilityTeam2?: number;
  currentInningsNumber?: 1 | 2;
  format: string;
  venue: string;
  venueTa: string;
  city: string;
  cityTa: string;
  pitchReport?: string;
  pitchReportTa?: string;
  weather?: {
    tempC: number;
    condition: string;
    conditionTa: string;
    rainChance: number;
    humidity?: number;
    windKph?: number;
  };
  team1: CricketTeam;
  team2: CricketTeam;
  innings1: InningsData;
  innings2?: InningsData;
  target?: number;
  targetRuns?: number;
  requiredRunRate?: number;
  currentRunRate?: number;
  recentBalls: BallEvent[];
  isGoogleTrending?: boolean;
  trendingReason?: string;
  trendingReasonTa?: string;
}

export interface PointsTableTeam {
  position: number;
  teamId: string;
  name: string;
  nameTa: string;
  teamName?: string;
  teamNameTa?: string;
  shortName: string;
  logo: string;
  color?: string;
  played: number;
  won: number;
  lost: number;
  tied: number;
  noResult: number;
  netRunRate: number;
  points: number;
  form?: ('W' | 'L' | 'D')[];
  recentForm: ('W' | 'L' | 'D')[];
}

export interface UpcomingMatch {
  id: string;
  tournament: string;
  matchNumber: string;
  team1: CricketTeam;
  team2: CricketTeam;
  date: string;
  time: string;
  timeTa: string;
  venue: string;
  venueTa: string;
  format: string;
  countdownHours: number;
}

export interface LeaderboardBatter {
  rank: number;
  name: string;
  nameTa: string;
  player?: string;
  playerTa?: string;
  team: string;
  teamShort: string;
  teamColor?: string;
  runs: number;
  matches: number;
  avg: number;
  strikeRate: number;
  highscore: string;
  fours?: number;
  sixes?: number;
}

export interface LeaderboardBowler {
  rank: number;
  name: string;
  nameTa: string;
  player?: string;
  playerTa?: string;
  team: string;
  teamShort: string;
  teamColor?: string;
  wickets: number;
  matches: number;
  economy: number;
  avg: number;
  bestBowling: string;
  bestFigures?: string;
}

export interface PlayerLeaderboard {
  orangeCap: LeaderboardBatter[];
  purpleCap: LeaderboardBowler[];
}

export interface RecentResult {
  id: string;
  tournament: string;
  matchNumber: string;
  team1: CricketTeam;
  team2: CricketTeam;
  score1: string;
  score2: string;
  winnerTeamId: string;
  winMarginEn: string;
  winMarginTa: string;
  playerOfMatchEn: string;
  playerOfMatchTa: string;
  date: string;
  dateTa: string;
}
