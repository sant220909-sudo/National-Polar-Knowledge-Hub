import React, { useState, useMemo } from 'react';
import { store } from '../../services/storage';
import { Publication, ExpeditionReport, ContentDraft } from '../../types';
import {
  Layers,
  MapPin,
  ArrowRight,
  ShieldCheck,
  Search,
  Clock,
  BookOpen,
  FileText,
  Download,
  ExternalLink,
  Copy,
  Check,
  Filter,
  Calendar,
  Database,
  Lock,
  ChevronRight,
  Eye,
  Sparkles
} from 'lucide-react';

interface ResearchPageProps {
  onNavigate: (route: string) => void;
  mode?: 'publications' | 'reports' | 'research' | string;
}

export const ResearchPage: React.FC<ResearchPageProps> = ({ onNavigate, mode = 'publications' }) => {
  // Active Tab: 'publications' | 'reports' | 'outreach'
  const initialTab = mode === 'publications' ? 'publications' : mode === 'reports' ? 'reports' : 'publications';
  const [activeTab, setActiveTab] = useState<'publications' | 'reports' | 'outreach'>(initialTab);

  // Common Search & Topic filter
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTopic, setSelectedTopic] = useState('All');
  const [selectedRegion, setSelectedRegion] = useState('All');
  const [copiedDoi, setCopiedDoi] = useState<string | null>(null);
  const [downloadSuccessId, setDownloadSuccessId] = useState<string | null>(null);

  // Data sets from storage
  const allPublications = store.getPublications();
  const allReports = store.getExpeditionReports();
  const publishedDrafts = store.getDrafts().filter((d) => d.status === 'PUBLISHED');

  // Filter Publications
  const filteredPublications = useMemo(() => {
    return allPublications.filter((pub) => {
      const matchesSearch =
        !searchTerm ||
        pub.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pub.authors.some((a) => a.toLowerCase().includes(searchTerm.toLowerCase())) ||
        pub.journal.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pub.doi.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pub.keywords.some((k) => k.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchesTopic = selectedTopic === 'All' || pub.researchDomain === selectedTopic;
      const matchesRegion = selectedRegion === 'All' || pub.region === selectedRegion;

      return matchesSearch && matchesTopic && matchesRegion;
    });
  }, [allPublications, searchTerm, selectedTopic, selectedRegion]);

  // Filter Expedition Reports
  const filteredReports = useMemo(() => {
    return allReports.filter((rep) => {
      const matchesSearch =
        !searchTerm ||
        rep.officialTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
        rep.authors.some((a) => a.toLowerCase().includes(searchTerm.toLowerCase())) ||
        rep.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
        rep.expeditionName.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesTopic = selectedTopic === 'All' || rep.researchDomain === selectedTopic;
      const matchesRegion = selectedRegion === 'All' || rep.region === selectedRegion;

      return matchesSearch && matchesTopic && matchesRegion;
    });
  }, [allReports, searchTerm, selectedTopic, selectedRegion]);

  // Filter Outreach Articles
  const filteredOutreach = useMemo(() => {
    return publishedDrafts.filter((draft) => {
      // Must not be private source resource
      const res = store.getResourceById(draft.resourceId);
      if (res && res.visibility === 'PRIVATE') return false;

      // Filter by Research destination if set (or legacy Website Article)
      if (draft.contentDestination && draft.contentDestination !== 'Research') return false;

      const matchesSearch =
        !searchTerm ||
        draft.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        draft.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
        draft.keywords.some((k) => k.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchesTopic = selectedTopic === 'All' || (res && res.topic === selectedTopic);
      const matchesRegion = selectedRegion === 'All' || (res && res.region === selectedRegion);

      return matchesSearch && matchesTopic && matchesRegion;
    });
  }, [publishedDrafts, searchTerm, selectedTopic, selectedRegion]);

  const handleCopyCitation = (pub: Publication) => {
    navigator.clipboard.writeText(pub.citation);
    setCopiedDoi(pub.id);
    setTimeout(() => setCopiedDoi(null), 2500);
  };

  const handleDownloadReport = (rep: ExpeditionReport) => {
    store.downloadReport(rep.id);
    setDownloadSuccessId(rep.id);
    setTimeout(() => setDownloadSuccessId(null), 3000);
  };

  const handleAccessPublication = (pub: Publication) => {
    store.accessPublication(pub.id);
    setDownloadSuccessId(pub.id);
    setTimeout(() => setDownloadSuccessId(null), 3000);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Breadcrumb & Institutional Header */}
        <div className="space-y-4 pb-6 border-b border-slate-200">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <button onClick={() => onNavigate('/')} className="hover:text-sky-700">Home</button>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="font-semibold text-slate-800">Scientific Research & Publications</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-100 text-sky-900 text-xs font-semibold mb-2">
                <BookOpen className="w-3.5 h-3.5 text-sky-700" />
                <span>NCPOR National Scientific Knowledge Repository</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-serif">
                Polar Science Publications & Research Repository
              </h1>
              <p className="mt-2 text-sm sm:text-base text-slate-600 max-w-3xl leading-relaxed">
                Peer-reviewed research papers, official expedition scientific reports, and expert-verified public outreach insights produced under the PACER scheme across Antarctica, the Arctic, the Southern Ocean, and the Himalayas.
              </p>
            </div>

            {/* Quick Repository Metrics */}
            <div className="flex items-center gap-3 bg-white p-3 rounded-2xl border border-slate-200 shadow-xs shrink-0 text-center">
              <div className="px-3 border-r border-slate-100">
                <div className="text-xl font-bold text-sky-800">{allPublications.length}</div>
                <div className="text-[10px] text-slate-500 uppercase font-semibold">Publications</div>
              </div>
              <div className="px-3 border-r border-slate-100">
                <div className="text-xl font-bold text-slate-800">{allReports.length}</div>
                <div className="text-[10px] text-slate-500 uppercase font-semibold">Field Reports</div>
              </div>
              <div className="px-3">
                <div className="text-xl font-bold text-emerald-700">{publishedDrafts.length}</div>
                <div className="text-[10px] text-slate-500 uppercase font-semibold">Outreach Briefs</div>
              </div>
            </div>
          </div>
        </div>

        {/* Top Navigation Tabs */}
        <div className="flex border-b border-slate-200 gap-4 sm:gap-8">
          <button
            onClick={() => setActiveTab('publications')}
            className={`pb-3 text-sm font-bold transition flex items-center gap-2 border-b-2 ${
              activeTab === 'publications'
                ? 'border-sky-600 text-sky-950'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Peer-Reviewed Publications</span>
            <span className="px-2 py-0.5 rounded-full text-[10px] bg-slate-200 text-slate-700 font-mono">
              {allPublications.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('reports')}
            className={`pb-3 text-sm font-bold transition flex items-center gap-2 border-b-2 ${
              activeTab === 'reports'
                ? 'border-sky-600 text-sky-950'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Official Expedition Reports</span>
            <span className="px-2 py-0.5 rounded-full text-[10px] bg-slate-200 text-slate-700 font-mono">
              {allReports.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('outreach')}
            className={`pb-3 text-sm font-bold transition flex items-center gap-2 border-b-2 ${
              activeTab === 'outreach'
                ? 'border-sky-600 text-sky-950'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>Public Outreach Insights</span>
            <span className="px-2 py-0.5 rounded-full text-[10px] bg-amber-100 text-amber-900 font-mono">
              {publishedDrafts.length}
            </span>
          </button>
        </div>

        {/* Search & Filter Bar */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by title, author, DOI, journal, keywords..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm bg-white placeholder-slate-400 focus:border-sky-500 focus:outline-hidden"
              />
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <select
                value={selectedTopic}
                onChange={(e) => setSelectedTopic(e.target.value)}
                className="p-2.5 rounded-xl border border-slate-300 bg-white text-xs sm:text-sm text-slate-800 focus:border-sky-500"
              >
                <option value="All">All Disciplines</option>
                <option value="Glaciology">Glaciology & Ice Cores</option>
                <option value="Oceanography">Oceanography & Hydroacoustics</option>
                <option value="Atmospheric Science">Atmospheric Science</option>
                <option value="Marine Biology">Marine Biology</option>
                <option value="Polar Technology & Logistics">Logistics & Engineering</option>
              </select>

              <select
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
                className="p-2.5 rounded-xl border border-slate-300 bg-white text-xs sm:text-sm text-slate-800 focus:border-sky-500"
              >
                <option value="All">All Regions</option>
                <option value="Antarctica">Antarctica</option>
                <option value="Arctic">Arctic</option>
                <option value="Southern Ocean">Southern Ocean</option>
                <option value="Himalayas (Third Pole)">Himalayas (Third Pole)</option>
              </select>

              {(searchTerm || selectedTopic !== 'All' || selectedRegion !== 'All') && (
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedTopic('All');
                    setSelectedRegion('All');
                  }}
                  className="text-xs text-rose-600 hover:text-rose-800 font-semibold px-2 py-1"
                >
                  Clear Filters
                </button>
              )}
            </div>
          </div>
        </div>

        {/* TAB 1: PEER-REVIEWED PUBLICATIONS */}
        {activeTab === 'publications' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between text-xs text-slate-500">
              <span>Showing {filteredPublications.length} Peer-Reviewed Articles</span>
              <span>Indexed with persistent Digital Object Identifiers (DOIs)</span>
            </div>

            {filteredPublications.length === 0 ? (
              <div className="p-12 text-center bg-white rounded-2xl border border-slate-200 text-slate-500 space-y-2">
                <BookOpen className="w-10 h-10 text-slate-300 mx-auto" />
                <p className="text-sm font-semibold text-slate-700">No publications matched your query.</p>
                <p className="text-xs text-slate-500">Try adjusting your keyword search or discipline filters.</p>
              </div>
            ) : (
              <div className="space-y-5">
                {filteredPublications.map((pub) => (
                  <div
                    key={pub.id}
                    className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 hover:border-slate-300 hover:shadow-md transition space-y-4"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-mono text-xs font-bold px-2.5 py-0.5 rounded-md bg-sky-50 text-sky-800 border border-sky-200">
                          {pub.id}
                        </span>
                        <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 font-semibold border border-emerald-200">
                          {pub.accessStatus}
                        </span>
                        <span className="text-xs font-medium text-slate-500 flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-slate-400" />
                          {pub.region} ({pub.year})
                        </span>
                        <span className="text-xs text-slate-300">•</span>
                        <span className="text-xs font-medium text-slate-600">
                          {pub.researchDomain}
                        </span>
                      </div>

                      <div className="text-xs font-mono text-slate-400">
                        Downloads: {pub.downloadCount || 0}
                      </div>
                    </div>

                    <div>
                      <h2 className="text-lg sm:text-xl font-bold text-slate-900 leading-snug font-serif">
                        {pub.title}
                      </h2>
                      <p className="text-xs sm:text-sm text-sky-900 font-medium mt-1">
                        {pub.journal} · Year {pub.year}
                      </p>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Authors: <strong className="text-slate-700">{pub.authors.join(', ')}</strong>
                      </p>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed bg-slate-50/70 p-4 rounded-xl border border-slate-100">
                      {pub.abstract}
                    </p>

                    {/* Keywords & Linked Datasets */}
                    <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                      <div className="flex flex-wrap items-center gap-1.5">
                        {pub.keywords.map((kw) => (
                          <span
                            key={kw}
                            className="text-[11px] px-2 py-0.5 rounded-md bg-slate-100 text-slate-600"
                          >
                            #{kw}
                          </span>
                        ))}
                      </div>

                      {pub.relatedDatasetIds && pub.relatedDatasetIds.length > 0 && (
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-slate-500 font-medium">Related Dataset:</span>
                          {pub.relatedDatasetIds.map((dId) => (
                            <button
                              key={dId}
                              onClick={() => onNavigate(`/datasets/${dId}`)}
                              className="text-xs font-mono font-bold text-indigo-700 hover:text-indigo-900 px-2 py-0.5 rounded-md bg-indigo-50 border border-indigo-200 flex items-center gap-1"
                            >
                              <Database className="w-3 h-3" />
                              <span>{dId}</span>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Action Bar */}
                    <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-100">
                      <div className="flex items-center gap-2 text-xs text-slate-500">
                        <span className="font-semibold text-slate-700">DOI:</span>
                        <a
                          href={`https://doi.org/${pub.doi}`}
                          target="_blank"
                          rel="noreferrer"
                          className="font-mono text-sky-700 hover:underline flex items-center gap-1"
                        >
                          <span>{pub.doi}</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleCopyCitation(pub)}
                          className="px-3 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-700 flex items-center gap-1.5 transition"
                        >
                          {copiedDoi === pub.id ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-emerald-600" />
                              <span className="text-emerald-700">Citation Copied</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5 text-slate-500" />
                              <span>Copy Citation</span>
                            </>
                          )}
                        </button>

                        <button
                          onClick={() => handleAccessPublication(pub)}
                          className="px-4 py-1.5 rounded-xl bg-slate-900 hover:bg-sky-800 text-white text-xs font-semibold flex items-center gap-1.5 transition shadow-xs"
                        >
                          {downloadSuccessId === pub.id ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-emerald-400" />
                              <span>Access Granted</span>
                            </>
                          ) : (
                            <>
                              <Download className="w-3.5 h-3.5" />
                              <span>Download PDF</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 2: EXPEDITION SCIENTIFIC REPORTS */}
        {activeTab === 'reports' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between text-xs text-slate-500">
              <span>Showing {filteredReports.length} Official Expedition Reports</span>
              <span>Direct field reports preserved from Antarctic & Arctic seasons</span>
            </div>

            {filteredReports.length === 0 ? (
              <div className="p-12 text-center bg-white rounded-2xl border border-slate-200 text-slate-500 space-y-2">
                <FileText className="w-10 h-10 text-slate-300 mx-auto" />
                <p className="text-sm font-semibold text-slate-700">No expedition reports matched your query.</p>
                <p className="text-xs text-slate-500">Try adjusting your search criteria.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredReports.map((rep) => (
                  <div
                    key={rep.id}
                    className="bg-white rounded-2xl border border-slate-200 p-6 hover:border-slate-300 hover:shadow-md transition flex flex-col justify-between space-y-4"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-mono text-xs font-bold px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-800">
                          {rep.id}
                        </span>
                        <span className="text-xs px-2.5 py-0.5 rounded-full bg-sky-50 text-sky-800 font-semibold border border-sky-200">
                          {rep.reportType}
                        </span>
                      </div>

                      <h3 className="text-base font-bold text-slate-900 leading-snug font-serif">
                        {rep.officialTitle}
                      </h3>

                      <div className="text-xs text-slate-500 space-y-1">
                        <div className="flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5 text-slate-400" />
                          <span>{rep.region} · Platform: {rep.platform}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-slate-400" />
                          <span>Expedition: {rep.expeditionName} ({rep.year})</span>
                        </div>
                      </div>

                      <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                        {rep.summary}
                      </p>

                      {/* Table of contents snippet */}
                      {rep.toc && rep.toc.length > 0 && (
                        <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 text-[11px] space-y-1 text-slate-700">
                          <span className="font-bold text-slate-900 block text-[10px] uppercase">Table of Contents:</span>
                          {rep.toc.slice(0, 3).map((item, i) => (
                            <div key={i} className="truncate">• {item}</div>
                          ))}
                          {rep.toc.length > 3 && (
                            <div className="text-slate-400 text-[10px]">+{rep.toc.length - 3} more sections</div>
                          )}
                        </div>
                      )}
                    </div>

                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-xs text-slate-500">Size: {rep.fileSize} (PDF)</span>
                      <button
                        onClick={() => handleDownloadReport(rep)}
                        className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-sky-800 text-white text-xs font-semibold flex items-center gap-1.5 transition"
                      >
                        {downloadSuccessId === rep.id ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                            <span>Downloaded</span>
                          </>
                        ) : (
                          <>
                            <Download className="w-3.5 h-3.5" />
                            <span>Download Report</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 3: PUBLIC OUTREACH INSIGHTS */}
        {activeTab === 'outreach' && (
          <div className="space-y-6">
            {/* Provenance Explainer Banner */}
            <div className="bg-gradient-to-r from-sky-900 via-slate-900 to-indigo-950 text-white p-5 rounded-2xl border border-sky-800 flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="space-y-1 text-center md:text-left">
                <div className="flex items-center gap-2 justify-center md:justify-start">
                  <ShieldCheck className="w-5 h-5 text-emerald-400" />
                  <span className="font-bold text-sm tracking-wide">Scientific Knowledge Provenance</span>
                </div>
                <p className="text-xs text-sky-200 max-w-2xl leading-relaxed">
                  Every public outreach article originates from field reports in the National Repository. Drafted with AI assistance, vetted and verified by polar scientists, and officially approved by administration before public release.
                </p>
              </div>
              <div className="flex items-center gap-2 text-[11px] font-mono shrink-0 bg-white/10 px-3 py-1.5 rounded-xl border border-white/20">
                <span>Original Resource → AI Draft → Scientist Review → Admin Approval → Published</span>
              </div>
            </div>

            <div className="space-y-5">
              {filteredOutreach.length === 0 ? (
                <div className="p-12 text-center bg-white rounded-2xl border border-slate-200 text-slate-500 space-y-2">
                  <p className="text-sm font-semibold text-slate-700">No published research briefs match your query.</p>
                  <p className="text-xs text-slate-500">Try adjusting your keyword search or discipline filter.</p>
                </div>
              ) : (
                filteredOutreach.map((draft) => {
                  const res = store.getResourceById(draft.resourceId);
                  return (
                    <article
                      key={draft.id}
                      onClick={() => onNavigate(`/content/${draft.id}`)}
                      className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 hover:border-slate-300 hover:shadow-md transition cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-6 group"
                    >
                      <div className="space-y-3 max-w-3xl">
                        <div className="flex items-center gap-2.5 flex-wrap">
                          <span className="text-[11px] font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-sky-50 text-sky-800 border border-sky-100">
                            {draft.contentType}
                          </span>
                          {res && (
                            <span className="text-xs text-slate-600 font-medium flex items-center gap-1">
                              <MapPin className="w-3.5 h-3.5 text-slate-400" />
                              {res.region} ({res.year})
                            </span>
                          )}
                          <span className="text-xs text-slate-300">•</span>
                          <span className="text-xs text-slate-500 flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5 text-slate-400" />
                            <span>{draft.readingTimeMin} min read</span>
                          </span>
                        </div>

                        <h2 className="text-lg sm:text-xl font-bold text-slate-900 group-hover:text-sky-800 transition leading-snug font-serif">
                          {draft.title}
                        </h2>

                        <p className="text-xs sm:text-sm text-slate-600 line-clamp-2 leading-relaxed">
                          {draft.summary}
                        </p>

                        <div className="flex items-center gap-4 text-xs text-slate-500 pt-1">
                          <span>Contributing Scientist: <strong className="text-slate-800">{draft.contributorName}</strong></span>
                          <span className="text-slate-300">•</span>
                          <span className="text-emerald-700 font-semibold flex items-center gap-1">
                            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                            <span>Peer Reviewed & Verified</span>
                          </span>
                        </div>
                      </div>

                      <div className="shrink-0 flex items-center">
                        <span className="px-4 py-2.5 rounded-xl bg-slate-900 text-white font-semibold text-xs group-hover:bg-sky-800 transition flex items-center gap-1.5 shadow-xs">
                          <span>Read Article</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </span>
                      </div>
                    </article>
                  );
                })
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
