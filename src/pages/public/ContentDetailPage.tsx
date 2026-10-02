import React, { useState, useEffect, useRef } from 'react';
import { store } from '../../services/storage';
import { useLanguage } from '../../context/LanguageContext';
import {
  getArticleHindiContent,
  translateEnglishToHindi
} from '../../services/translationService';
import {
  ArrowLeft,
  Calendar,
  Clock,
  MapPin,
  Share2,
  Bookmark,
  Printer,
  ShieldCheck,
  CheckCircle2,
  Check,
  ExternalLink,
  Info,
  Lock,
  Camera,
  Languages
} from 'lucide-react';

interface ContentDetailPageProps {
  contentId: string;
  onNavigate: (route: string) => void;
  onOpenLogin?: () => void;
}

export const ContentDetailPage: React.FC<ContentDetailPageProps> = ({
  contentId,
  onNavigate,
  onOpenLogin
}) => {
  const [copied, setCopied] = useState(false);
  const [readingProgress, setReadingProgress] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showSourceInfoModal, setShowSourceInfoModal] = useState(false);
  const articleContainerRef = useRef<HTMLDivElement>(null);

  const currentUser = store.getCurrentUser();
  const isStaff = currentUser.role === 'ADMINISTRATOR' || currentUser.role === 'CONTENT_CONTRIBUTOR';

  const draft =
    store.getDraftById(contentId) ||
    store.getDrafts().find((d) => d.status === 'PUBLISHED') ||
    store.getDrafts()[0];
  const resource = store.getResourceById(draft.resourceId);

  // Language translation support (User Request: small button to convert to Hindi)
  const { isHindi: globalIsHindi } = useLanguage();
  const [localHindiOverride, setLocalHindiOverride] = useState<boolean | null>(null);
  const isHindiActive = localHindiOverride !== null ? localHindiOverride : globalIsHindi;

  const hindiData = getArticleHindiContent(draft.id);
  const displayTitle = isHindiActive ? (hindiData?.title || translateEnglishToHindi(draft.title)) : draft.title;
  const displaySummary = isHindiActive ? (hindiData?.summary || translateEnglishToHindi(draft.summary)) : draft.summary;
  const displayBody = isHindiActive ? (hindiData?.body || translateEnglishToHindi(draft.body)) : draft.body;
  const displayKeyFindings = isHindiActive && hindiData?.keyFindings ? hindiData.keyFindings : draft.keyFindings;

  // Find approved media items curated/associated with this resource
  const approvedMedia = store.getMedia().filter((m) => m.resourceId === draft.resourceId);

  const [isBookmarked, setIsBookmarked] = useState(store.isBookmarked(draft.id));

  // Calculate reading progress as user scrolls
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight <= 0) {
        setReadingProgress(0);
        return;
      }

      const currentScroll = window.scrollY;
      const progress = Math.min(100, Math.max(0, (currentScroll / totalHeight) * 100));
      setReadingProgress(progress);
      setIsScrolled(currentScroll > 260);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleBookmarkToggle = () => {
    const updated = store.toggleBookmark(draft.id);
    setIsBookmarked(updated);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div ref={articleContainerRef} className="relative min-h-screen bg-slate-50/50 pb-20">
      {/* 1. Subtle Reading Progress Bar Pinned to Viewport Top */}
      <div
        className="fixed top-0 left-0 right-0 z-50 h-1 bg-slate-200/50 backdrop-blur-xs"
        role="progressbar"
        aria-valuenow={Math.round(readingProgress)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Article reading progress"
      >
        <div
          className="h-full bg-gradient-to-r from-sky-600 via-sky-500 to-blue-700 transition-all duration-75 shadow-xs"
          style={{ width: `${readingProgress}%` }}
        />
      </div>

      {/* 2. Floating Minimal Reading Bar (appears on scroll) */}
      <div
        className={`fixed top-1 left-0 right-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200/80 transition-all duration-200 ${
          isScrolled
            ? 'opacity-100 translate-y-0 shadow-xs'
            : 'opacity-0 -translate-y-2 pointer-events-none'
        }`}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 h-12 flex items-center justify-between text-xs">
          <div className="flex items-center gap-3 min-w-0">
            <button
              onClick={() => onNavigate('/research')}
              className="p-1 rounded-md text-slate-500 hover:text-slate-900 transition shrink-0"
              title="Back to Research"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <div className="truncate">
              <span className="font-medium text-slate-900 truncate block">
                {draft.title}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0 text-slate-500">
            {/* Small button to convert article to Hindi (User Request) */}
            <button
              onClick={() => setLocalHindiOverride(!isHindiActive)}
              className={`px-2 py-1 rounded-md text-[11px] font-bold transition flex items-center gap-1 border shadow-2xs cursor-pointer ${
                isHindiActive
                  ? 'bg-amber-100 hover:bg-amber-200 text-amber-950 border-amber-300'
                  : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200'
              }`}
              title={isHindiActive ? "Read in English (अंग्रेजी में पढ़ें)" : "शोध पत्र को हिंदी में पढ़ें (Read in Hindi)"}
            >
              <Languages className="w-3 h-3 text-amber-700" />
              <span>{isHindiActive ? 'English' : 'हिंदी'}</span>
            </button>

            <span className="text-[11px] font-mono hidden sm:inline">
              {Math.round(readingProgress)}% read
            </span>

            <button
              onClick={handleBookmarkToggle}
              className={`p-1.5 rounded-md transition ${
                isBookmarked
                  ? 'text-sky-800 bg-sky-50'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
              title={isBookmarked ? 'Remove bookmark' : 'Bookmark story'}
            >
              <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-sky-800' : ''}`} />
            </button>

            <button
              onClick={handleShare}
              className="p-1.5 rounded-md text-slate-500 hover:text-slate-900 transition"
              title="Share URL"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Main Public Article Container */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12 space-y-8">
        {/* Navigation Breadcrumb & Back */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => onNavigate('/research')}
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-slate-900 transition group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
            <span>{isHindiActive ? 'शोध सूची पर वापस जाएं' : 'Back to Research'}</span>
          </button>

          <div className="flex items-center gap-2">
            {/* Small button to convert article to Hindi (User Request) */}
            <button
              onClick={() => setLocalHindiOverride(!isHindiActive)}
              className={`px-3 py-1.5 rounded-xl border text-xs font-bold transition flex items-center gap-1.5 shadow-2xs cursor-pointer ${
                isHindiActive
                  ? 'bg-amber-100 hover:bg-amber-200 text-amber-950 border-amber-300 ring-2 ring-amber-400/20'
                  : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200'
              }`}
              title={isHindiActive ? "Read in English (अंग्रेजी में पढ़ें)" : "शोध पत्र को हिंदी में पढ़ें (Convert to Hindi)"}
            >
              <Languages className="w-3.5 h-3.5 text-amber-700" />
              <span>{isHindiActive ? 'A English में पढ़ें' : '🇮🇳 अ हिंदी में पढ़ें'}</span>
            </button>

            <button
              onClick={handleShare}
              className="p-2 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 transition text-xs flex items-center gap-1.5"
              title="Share article"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5" />}
              <span className="hidden sm:inline">{copied ? 'Copied' : 'Share'}</span>
            </button>

            <button
              onClick={handlePrint}
              className="p-2 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 transition text-xs flex items-center gap-1.5"
              title="Print article"
            >
              <Printer className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Print</span>
            </button>
          </div>
        </div>

        {/* Article Headline Header */}
        <header className="space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-sky-100 text-sky-900">
              {draft.contentType}
            </span>
            {resource && (
              <span className="text-xs text-slate-600 font-medium flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                {resource.region} ({resource.year})
              </span>
            )}
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight font-serif">
            {displayTitle}
          </h1>

          {/* Author Byline & Institutional Validation Seal */}
          <div className="flex flex-wrap items-center justify-between gap-4 py-3 border-y border-slate-200 text-xs text-slate-600">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-xs">
                {draft.contributorName.charAt(0)}
              </div>
              <div>
                <div className="font-semibold text-slate-900">{draft.contributorName}</div>
                <div className="text-[11px] text-slate-500">
                  {isHindiActive ? 'योगदानकर्ता ध्रुवीय वैज्ञानिक • NCPOR / MoES' : 'Contributing Polar Scientist • NCPOR / MoES'}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4 text-slate-500 text-xs">
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                <span>
                  {draft.publishedAt
                    ? new Date(draft.publishedAt).toLocaleDateString(undefined, {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })
                    : 'Recent'}
                </span>
              </span>

              <span aria-hidden="true" className="text-slate-300">·</span>

              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                <span>{draft.readingTimeMin} {isHindiActive ? 'मिनट अध्ययन' : 'min read'}</span>
              </span>

              <span aria-hidden="true" className="text-slate-300">·</span>

              <span className="inline-flex items-center gap-1 text-emerald-700 font-medium">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>{isHindiActive ? 'सहकर्मी सत्यापित' : 'Peer Verified'}</span>
              </span>
            </div>
          </div>
        </header>

        {/* Executive Scientific Summary */}
        <section aria-labelledby="summary-heading" className="border-l-3 border-sky-800 pl-4 sm:pl-6 py-1 space-y-1">
          <h2 id="summary-heading" className="text-[11px] uppercase tracking-wider font-semibold text-sky-900">
            {isHindiActive ? 'वैज्ञानिक कार्यकारी सारांश (Executive Summary)' : 'Executive Summary'}
          </h2>
          <p className="text-base text-slate-800 leading-relaxed font-serif">
            {displaySummary}
          </p>
        </section>

        {/* Key Findings List */}
        {displayKeyFindings && displayKeyFindings.length > 0 && (
          <section aria-labelledby="findings-heading" className="bg-white rounded-xl border border-slate-200 p-5 sm:p-6 shadow-xs space-y-3">
            <h2 id="findings-heading" className="text-xs uppercase font-bold tracking-wider text-slate-900 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>{isHindiActive ? 'प्रमुख वैज्ञानिक प्रेक्षण एवं निष्कर्ष (Key Scientific Observations)' : 'Key Scientific Observations'}</span>
            </h2>
            <div className="space-y-2">
              {displayKeyFindings.map((finding, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-2.5 text-xs text-slate-700 leading-relaxed"
                >
                  <span className="font-semibold text-sky-800 shrink-0">{idx + 1}.</span>
                  <p>{finding}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* APPROVED VISUAL MEDIA: Show only approved photographs/media associated with this story */}
        {approvedMedia.length > 0 && (
          <figure className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
            <img
              src={approvedMedia[0].url}
              alt={approvedMedia[0].title}
              className="w-full max-h-96 object-cover object-center"
            />
            <figcaption className="p-4 bg-slate-50 border-t border-slate-200 text-xs text-slate-600 flex items-start gap-2.5">
              <Camera className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-slate-800">{approvedMedia[0].title}: </span>
                <span>{approvedMedia[0].caption || draft.imageCaption}</span>
                <div className="text-[11px] text-slate-500 mt-1">
                  Credit: {approvedMedia[0].photographerOrCredit} · {approvedMedia[0].location}
                </div>
              </div>
            </figcaption>
          </figure>
        )}

        {/* Clean Article Body */}
        <article className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-10 shadow-xs space-y-5 text-sm sm:text-base leading-relaxed text-slate-800 font-sans">
          {displayBody.split('\n\n').map((paragraph, index) => {
            if (paragraph.startsWith('### ')) {
              return (
                <h3
                  key={index}
                  className="text-lg sm:text-xl font-bold text-slate-900 mt-6 mb-2 border-b border-slate-100 pb-2 tracking-tight font-serif"
                >
                  {paragraph.replace('### ', '')}
                </h3>
              );
            }
            if (paragraph.startsWith('1. ') || paragraph.startsWith('- ')) {
              const lines = paragraph.split('\n');
              return (
                <ul key={index} className="list-disc pl-5 space-y-1.5 text-slate-700 text-sm">
                  {lines.map((l, i) => (
                    <li key={i}>{l.replace(/^[-*0-9.]+\s*/, '')}</li>
                  ))}
                </ul>
              );
            }
            if (paragraph.startsWith('*Notice:')) {
              return (
                <div
                  key={index}
                  className="mt-6 p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-500 italic"
                >
                  {paragraph}
                </div>
              );
            }
            return (
              <p key={index} className="text-slate-700 leading-relaxed">
                {paragraph}
              </p>
            );
          })}
        </article>

        {/* Controlled Provenance & Citation Box (No raw datasets/files exposed to public) */}
        {resource && (
          <section className="rounded-xl border border-slate-200 bg-slate-100/70 p-5 text-xs text-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500 block">
                Scientific Citation & Archival Provenance
              </span>
              <p className="font-medium text-slate-900">
                National Polar Science Archive · Record ref #{resource.id} ({resource.region}, {resource.year})
              </p>
              <p className="text-[11px] text-slate-500">
                Field observations conducted at {resource.stationOrVessel || 'NCPOR Field Base'}. Primary research reports and sensor datasets are securely preserved in the internal NCPOR Scientific Repository.
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => setShowSourceInfoModal(true)}
                className="px-3 py-1.5 rounded-lg bg-white border border-slate-300 hover:bg-slate-50 text-slate-800 font-medium transition text-xs flex items-center gap-1 shadow-2xs"
              >
                <Info className="w-3.5 h-3.5 text-slate-500" />
                <span>Citation Info</span>
              </button>

              {isStaff ? (
                <button
                  onClick={() =>
                    onNavigate(
                      currentUser.role === 'ADMINISTRATOR'
                        ? `/admin/repository`
                        : `/workspace/repository`
                    )
                  }
                  className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-medium transition text-xs flex items-center gap-1"
                >
                  <span>Staff Workspace</span>
                  <ExternalLink className="w-3 h-3 text-sky-400" />
                </button>
              ) : (
                <button
                  onClick={onOpenLogin}
                  className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-medium transition text-xs flex items-center gap-1"
                >
                  <Lock className="w-3 h-3 text-sky-400" />
                  <span>Staff Login</span>
                </button>
              )}
            </div>
          </section>
        )}

        {/* Institutional Verification Sign-Off Footer */}
        <footer className="bg-slate-900 text-white rounded-xl p-5 border border-slate-800 space-y-2 text-xs">
          <div className="text-[11px] font-semibold text-sky-400 uppercase tracking-wider">
            Institutional Verification Sign-Off
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-slate-300 pt-1">
            <div>
              <span className="text-slate-500 block text-[10px] uppercase">Author / Contributor</span>
              <span className="font-medium text-white">{draft.contributorName}</span>
            </div>
            <div>
              <span className="text-slate-500 block text-[10px] uppercase">Reviewing Directorate</span>
              <span className="font-medium text-white">
                {draft.reviewerName || 'Dr. Sunita Rao (Chief Reviewer)'}
              </span>
            </div>
            <div>
              <span className="text-slate-500 block text-[10px] uppercase">Review Endorsement</span>
              <span className="text-emerald-400">
                {draft.reviewerComments || 'Peer-validated for public dissemination'}
              </span>
            </div>
          </div>
        </footer>
      </main>

      {/* SOURCE CITATION INFORMATION MODAL (Concise academic citation without raw datasets/files) */}
      {showSourceInfoModal && resource && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-fadeIn">
          <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden text-xs">
            <div className="bg-slate-900 px-6 py-4 text-white flex items-center justify-between border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Info className="w-4 h-4 text-sky-400" />
                <h3 className="font-bold text-sm">Archival Citation & Origin Information</h3>
              </div>
              <button
                onClick={() => setShowSourceInfoModal(false)}
                className="text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <span className="text-[10px] font-mono text-sky-900 uppercase tracking-wider bg-sky-50 px-2 py-0.5 rounded border border-sky-200">
                  {resource.id}
                </span>
                <h4 className="text-sm font-bold text-slate-900 mt-1">{resource.title}</h4>
                <p className="text-slate-600 mt-1 leading-relaxed text-[11px]">
                  {resource.description}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200 text-[11px]">
                <div>
                  <span className="text-slate-400 uppercase text-[9px] block">Research Domain</span>
                  <span className="font-medium text-slate-800">{resource.topic}</span>
                </div>
                <div>
                  <span className="text-slate-400 uppercase text-[9px] block">Region & Year</span>
                  <span className="font-medium text-slate-800">{resource.region} ({resource.year})</span>
                </div>
                <div>
                  <span className="text-slate-400 uppercase text-[9px] block">Lead Researchers</span>
                  <span className="font-medium text-slate-800">{resource.researchers.join(', ')}</span>
                </div>
                <div>
                  <span className="text-slate-400 uppercase text-[9px] block">Station / Platform</span>
                  <span className="font-medium text-slate-800">{resource.stationOrVessel || 'NCPOR'}</span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-sky-50/70 border border-sky-200 text-[11px] text-slate-600 space-y-1">
                <p className="font-semibold text-sky-950">Data Access Policy:</p>
                <p>
                  In accordance with NCPOR polar data stewardship guidelines, raw numerical telemetry and internal drill logs are reserved for accredited researchers. Authorized staff can log in using Staff Login to access the internal Scientific Repository.
                </p>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  onClick={() => setShowSourceInfoModal(false)}
                  className="px-4 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-medium text-xs"
                >
                  Close Window
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
