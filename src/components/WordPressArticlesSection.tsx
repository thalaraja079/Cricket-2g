import React, { useState } from 'react';
import { Language } from '../types/cricket';
import { Newspaper, Calendar, User, ArrowRight, Sparkles, BookOpen, Share2, Heart } from 'lucide-react';

interface WordPressArticlesSectionProps {
  lang: Language;
}

interface Article {
  id: string;
  titleTa: string;
  titleEn: string;
  excerptTa: string;
  excerptEn: string;
  categoryTa: string;
  categoryEn: string;
  authorTa: string;
  authorEn: string;
  dateTa: string;
  dateEn: string;
  readTimeTa: string;
  readTimeEn: string;
  image: string;
  likes: number;
}

const SAMPLE_ARTICLES: Article[] = [
  {
    id: 'art-1',
    titleTa: 'சாம்பியன்ஸ் டிராபி 2026: இந்திய அணியின் வரலாற்றுச் சிறப்புமிக்க வெற்றி - முழு போட்டி ஆய்வு!',
    titleEn: 'Champions Trophy 2026: Team India\'s historic victory - Full tactical match breakdown',
    excerptTa: 'தொடக்க ஆட்டக்காரர்களின் அதிரடி மற்றும் பும்ராவின் அசுர பந்துவீச்சால் இந்திய அணி மீண்டும் ஒரு சர்வதேச கோப்பையை வென்று வரலாறு படைத்தது.',
    excerptEn: 'Aggressive opening fireworks coupled with Jasprit Bumrah\'s lethal yorkers powered India to yet another historic international triumph.',
    categoryTa: 'போட்டி அறிக்கை',
    categoryEn: 'Match Report',
    authorTa: 'விளையாட்டு நிருபர்',
    authorEn: 'Senior Cricket Editor',
    dateTa: 'இன்று • 2 மணி நேரத்திற்கு முன்',
    dateEn: 'Today • 2 hrs ago',
    readTimeTa: '4 நிமிடம்',
    readTimeEn: '4 min read',
    image: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=800&q=80',
    likes: 342,
  },
  {
    id: 'art-2',
    titleTa: 'IPL 2026 மெகா ஏலம்: இளம் நட்சத்திரங்களை குறிவைக்கும் சென்னை சூப்பர் கிங்ஸ் & மும்பை இந்தியன்ஸ்!',
    titleEn: 'IPL 2026 Mega Auction: CSK & MI targeting dynamic young power-hitters',
    excerptTa: 'அடுத்த ஐபிஎல் சீசனுக்கான தக்கவைப்புப் பட்டியல் வெளியாகி உள்ள நிலையில், ஏலத்தில் அதிக தொகைக்கு வாங்கப்பட வாய்ப்புள்ள 5 வீரர்கள் யார்?',
    excerptEn: 'With franchise retentions officially finalized, here are the top 5 high-impact all-rounders set to trigger intense bidding wars.',
    categoryTa: 'IPL 2026',
    categoryEn: 'IPL 2026 Special',
    authorTa: 'CricPulse Desk',
    authorEn: 'CricPulse Desk',
    dateTa: 'நேற்று',
    dateEn: 'Yesterday',
    readTimeTa: '3 நிமிடம்',
    readTimeEn: '3 min read',
    image: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&w=800&q=80',
    likes: 289,
  },
  {
    id: 'art-3',
    titleTa: 'ரோஹித் சர்மா மற்றும் விராட் கோலி புதிய உலக சாதனை: சர்வதேச கிரிக்கெட்டில் மாபெரும் மைல்கல்!',
    titleEn: 'Rohit Sharma & Virat Kohli scale new world milestone in international cricket',
    excerptTa: 'சர்வதேச கிரிக்கெட் வரலாற்றில் மிகக் குறைந்த இன்னிங்ஸ்களில் அதிக ரன்கள் சேர்த்த இணை என்ற புதிய பெருமையை மீண்டும் ஒருமுறை இந்திய ஜோடி பதிவு செய்தது.',
    excerptEn: 'The legendary Indian duo shattered another historic partnership record, cementing their enduring dominance on the world stage.',
    categoryTa: 'சாதனைகள்',
    categoryEn: 'World Records',
    authorTa: 'சுரேஷ் குமார்',
    authorEn: 'Suresh Kumar',
    dateTa: '2 நாட்களுக்கு முன்',
    dateEn: '2 days ago',
    readTimeTa: '5 நிமிடம்',
    readTimeEn: '5 min read',
    image: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=800&q=80',
    likes: 512,
  },
  {
    id: 'art-4',
    titleTa: 'ஆடுகள ஆய்வு & தட்பவெப்ப நிலை: டி20 போட்டிகளில் சுழற்பந்து வீச்சாளர்களின் தாக்கம் எப்படி இருக்கும்?',
    titleEn: 'Pitch Analysis: How high-speed turn will shape upcoming T20 subcontinent fixtures',
    excerptTa: 'ஆடுகளத்தின் தன்மை மற்றும் மாலை நேர பனிப்பொழிவு (Dew factor) ஆகியவற்றின் அடிப்படையில் இரண்டாவது பேட்டிங் செய்யும் அணிக்கு கிடைக்கும் நன்மைகள்.',
    excerptEn: 'Deep-dive into surface grip, moisture absorption, and dew impact favoring chasing teams under heavy floodlights.',
    categoryTa: 'ஆடுகள ஆய்வு',
    categoryEn: 'Pitch Report',
    authorTa: 'கிரிக்கெட் நிபுணர்',
    authorEn: 'Pitch Analyst',
    dateTa: 'செப் 29, 2026',
    dateEn: 'Sep 29, 2026',
    readTimeTa: '4 நிமிடம்',
    readTimeEn: '4 min read',
    image: 'https://images.unsplash.com/photo-1517649763962-0c623266ddc0?auto=format&fit=crop&w=800&q=80',
    likes: 198,
  }
];

export const WordPressArticlesSection: React.FC<WordPressArticlesSectionProps> = ({ lang }) => {
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [likedArticles, setLikedArticles] = useState<Record<string, boolean>>({});

  const toggleLike = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setLikedArticles(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <section className="space-y-6 pt-4 border-t border-slate-800/80">
      
      {/* WordPress Website Banner: Showing user exactly how it connects to gray-cormorant-150281.hostingersite.com */}
      <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-blue-950/60 via-slate-900 to-indigo-950/60 border border-blue-500/30 flex items-center justify-between flex-wrap gap-4 shadow-xl">
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold text-xl shrink-0 shadow-inner">
            W
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-white text-sm sm:text-base">
                {lang === 'ta' ? 'WordPress வலைத்தள நேரலை முன்னோட்டம்' : 'WordPress Live Site Preview'}
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-bold border border-emerald-500/30">
                gray-cormorant-150281.hostingersite.com
              </span>
            </div>
            <p className="text-xs text-slate-300 mt-0.5">
              {lang === 'ta'
                ? 'உங்கள் வேர்ட்பிரஸ் தீமில் (index.php) மேலே நேரலை ஸ்கோரும், கீழே இந்த புதிய செய்திகள்/கட்டுரைகளும் இவ்வாறுதான் தோன்றும்!'
                : 'This is the exact layout of your WordPress theme: Live Scores on top + Articles & News below!'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs px-3 py-1.5 rounded-lg bg-slate-800 text-slate-300 border border-slate-700 flex items-center gap-1.5">
            <BookOpen className="w-3.5 h-3.5 text-blue-400" />
            <span>{lang === 'ta' ? 'வலைப்பதிவு & செய்திகள்' : 'Blog & News Module'}</span>
          </span>
        </div>
      </div>

      {/* Section Title Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <Newspaper className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-extrabold text-white flex items-center gap-2">
              <span>{lang === 'ta' ? 'சமீபத்திய கிரிக்கெட் செய்திகள் & கட்டுரைகள்' : 'Latest Cricket Articles & News'}</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-400 font-bold uppercase">
                WordPress Posts
              </span>
            </h2>
            <p className="text-xs text-slate-400">
              {lang === 'ta'
                ? 'WordPress Admin ➜ Posts ➜ Add New சென்று நீங்கள் சேர்க்கும் கட்டுரைகள் இங்கே தானாகத் தோன்றும்'
                : 'Articles you publish in WordPress Admin (Posts ➜ Add New) display automatically here'}
            </p>
          </div>
        </div>

        <span className="hidden sm:inline-block text-xs text-slate-400">
          {lang === 'ta' ? '4 புதிய கட்டுரைகள்' : '4 New Articles'}
        </span>
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {SAMPLE_ARTICLES.map(article => {
          const isLiked = likedArticles[article.id];
          return (
            <article
              key={article.id}
              onClick={() => setSelectedArticle(article)}
              className="group rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-blue-500/50 hover:bg-slate-800/80 transition-all duration-300 overflow-hidden shadow-lg flex flex-col cursor-pointer hover:shadow-2xl hover:-translate-y-1"
            >
              {/* Thumbnail Container */}
              <div className="relative h-48 w-full overflow-hidden bg-slate-950">
                <img
                  src={article.image}
                  alt={lang === 'ta' ? article.titleTa : article.titleEn}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                
                {/* Category Badge */}
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-blue-600/90 text-white backdrop-blur-md shadow-md">
                    {lang === 'ta' ? article.categoryTa : article.categoryEn}
                  </span>
                </div>

                {/* Read Time */}
                <div className="absolute top-3 right-3">
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold bg-slate-950/80 text-slate-300 backdrop-blur-md border border-slate-700/60">
                    {lang === 'ta' ? article.readTimeTa : article.readTimeEn}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
                <div className="space-y-2">
                  <h3 className="font-bold text-white text-base sm:text-lg leading-snug group-hover:text-blue-400 transition-colors line-clamp-2">
                    {lang === 'ta' ? article.titleTa : article.titleEn}
                  </h3>
                  <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                    {lang === 'ta' ? article.excerptTa : article.excerptEn}
                  </p>
                </div>

                {/* Metadata & Actions */}
                <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1">
                      <User className="w-3.5 h-3.5 text-slate-400" />
                      <span>{lang === 'ta' ? article.authorTa : article.authorEn}</span>
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      <span>{lang === 'ta' ? article.dateTa : article.dateEn}</span>
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={(e) => toggleLike(article.id, e)}
                      className={`p-1.5 rounded-lg border transition-colors ${
                        isLiked 
                          ? 'bg-rose-500/20 text-rose-400 border-rose-500/40' 
                          : 'bg-slate-800/80 text-slate-400 border-slate-700 hover:text-white'
                      }`}
                      title="Like article"
                    >
                      <Heart className={`w-3.5 h-3.5 ${isLiked ? 'fill-rose-400' : ''}`} />
                    </button>
                    <span className="text-blue-400 font-bold group-hover:translate-x-1 transition-transform inline-flex items-center gap-0.5">
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {/* Article Detail Reader Modal (If user clicks an article) */}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in">
          <div className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-2xl bg-slate-900 border border-slate-700 p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-blue-600 text-white">
                {lang === 'ta' ? selectedArticle.categoryTa : selectedArticle.categoryEn}
              </span>
              <button
                onClick={() => setSelectedArticle(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              >
                ✕
              </button>
            </div>

            <div className="rounded-xl overflow-hidden h-56 w-full">
              <img
                src={selectedArticle.image}
                alt={selectedArticle.titleEn}
                className="w-full h-full object-cover"
              />
            </div>

            <h2 className="text-xl font-black text-white leading-tight">
              {lang === 'ta' ? selectedArticle.titleTa : selectedArticle.titleEn}
            </h2>

            <div className="flex items-center gap-4 text-xs text-slate-400 py-1 border-y border-slate-800">
              <span>{lang === 'ta' ? selectedArticle.authorTa : selectedArticle.authorEn}</span>
              <span>•</span>
              <span>{lang === 'ta' ? selectedArticle.dateTa : selectedArticle.dateEn}</span>
              <span>•</span>
              <span>{lang === 'ta' ? selectedArticle.readTimeTa : selectedArticle.readTimeEn}</span>
            </div>

            <div className="text-sm text-slate-200 leading-relaxed space-y-3">
              <p>{lang === 'ta' ? selectedArticle.excerptTa : selectedArticle.excerptEn}</p>
              <p>
                {lang === 'ta'
                  ? 'கிரிக்கெட் உலகின் மிக முக்கியமான திருப்பமாக இது பார்க்கப்படுகிறது. சர்வதேச கிரிக்கெட் கவுன்சில் (ICC) மற்றும் உலகெங்கிலும் உள்ள கிரிக்கெட் வல்லுநர்கள் இந்த ஆட்டத்தை மிக உன்னிப்பாக கவனித்து வருகின்றனர். மேலும் விவரங்கள் தொடர்ந்து புதுப்பிக்கப்படும்.'
                  : 'This historic tactical milestone marks an evolving era for world cricket. Match analysts and ICC technical committees have lauded the depth, balance, and strategic discipline demonstrated throughout.'}
              </p>
            </div>

            <div className="pt-3 border-t border-slate-800 flex justify-end">
              <button
                onClick={() => setSelectedArticle(null)}
                className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs"
              >
                {lang === 'ta' ? 'மூடு (Close)' : 'Close'}
              </button>
            </div>
          </div>
        </div>
      )}

    </section>
  );
};
