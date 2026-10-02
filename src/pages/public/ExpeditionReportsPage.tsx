import React, { useState, useMemo } from 'react';
import { store } from '../../services/storage';
import { ExpeditionReport, PolarRegion, ResearchTopic } from '../../types';
import {
  FileText,
  Search,
  Filter,
  Download,
  Calendar,
  MapPin,
  Compass,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Lock,
  Eye,
  FileCheck,
  Layers,
  ChevronRight,
  BookOpen
} from 'lucide-react';

interface ExpeditionReportsPageProps {
  onNavigate: (route: string) => void;
}

export const ExpeditionReportsPage: React.FC<ExpeditionReportsPageProps> = ({
  onNavigate
}) => {
  const allReports = store.getExpeditionReports();

  // Search & Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState<string>('All');
  const [selectedExpedition, setSelectedExpedition] = useState<string>('All');
  const [selectedDomain, setSelectedDomain] = useState<string>('All');
  const [selectedReportType, setSelectedReportType] = useState<string>('All');
  const [downloadSuccessId, setDownloadSuccessId] = useState<string | null>(null);

  // Filter options
  const regions = useMemo(() => {
    return ['All', ...Array.from(new Set(allReports.map((r) => r.region)))];
  }, [allReports]);

  const expeditions = useMemo(() => {
    return ['All', ...Array.from(new Set(allReports.map((r) => r.expeditionName)))];
  }, [allReports]);

  const domains = useMemo(() => {
    return ['All', ...Array.from(new Set(allReports.map((r) => r.researchDomain)))];
  }, [allReports]);

  const reportTypes = useMemo(() => {
    return ['All', ...Array.from(new Set(allReports.map((r) => r.reportType)))];
  }, [allReports]);

  const filteredReports = useMemo(() => {
    return allReports.filter((report) => {
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matches =
          report.id.toLowerCase().includes(q) ||
          report.officialTitle.toLowerCase().includes(q) ||
          report.summary.toLowerCase().includes(q) ||
          report.authors.some((a) => a.toLowerCase().includes(q)) ||
          report.platform.toLowerCase().includes(q) ||
          report.expeditionName.toLowerCase().includes(q);
        if (!matches) return false;
      }

      if (selectedRegion !== 'All' && report.region !== selectedRegion) return false;
      if (selectedExpedition !== 'All' && report.expeditionName !== selectedExpedition) return false;
      if (selectedDomain !== 'All' && report.researchDomain !== selectedDomain) return false;
      if (selectedReportType !== 'All' && report.reportType !== selectedReportType) return false;

      return true;
    });
  }, [
    allReports,
    searchQuery,
    selectedRegion,
    selectedExpedition,
    selectedDomain,
    selectedReportType
  ]);

  const handleDownload = (e: React.MouseEvent, report: ExpeditionReport) => {
    e.stopPropagation();
    store.downloadReport(report.id);
    setDownloadSuccessId(report.id);
    setTimeout(() => setDownloadSuccessId(null), 3000);
  };

  return (
    <div className="space-y-8 pb-16 bg-slate-50/50">
      {/* 1. ARCHIVE BANNER */}
      <section className="bg-slate-950 text-white border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-semibold border border-amber-400/30">
              <FileCheck className="w-3.5 h-3.5 text-amber-400" />
              <span>National Centre for Polar and Ocean Research · Reports Archive</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight font-serif">
              Expedition Reports Archive
            </h1>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-sans">
              Official annual scientific expedition reports, cruise technical summaries, and field campaign dossiers documenting sovereign scientific achievements across Antarctica, the Arctic, and the Southern Ocean.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4 text-xs">
              <button
                onClick={() => onNavigate('/expeditions')}
                className="inline-flex items-center gap-1.5 text-amber-300 hover:text-white transition font-semibold"
              >
                <span>View Expeditions Tracker</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <span className="text-slate-600">·</span>
              <button
                onClick={() => onNavigate('/datasets')}
                className="inline-flex items-center gap-1.5 text-sky-300 hover:text-white transition font-semibold"
              >
                <span>Explore Associated Datasets</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. SEARCH & FILTER CONTROLS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
          {/* Search Input */}
          <div className="relative">
            <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search reports by title, author, expedition, or research focus..."
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent text-sm bg-slate-50/50"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600"
              >
                Clear
              </button>
            )}
          </div>

          {/* Filter Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div>
              <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                Region
              </label>
              <select
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
                className="w-full px-2.5 py-2 rounded-lg border border-slate-200 bg-white text-slate-700 font-medium focus:ring-1 focus:ring-amber-500"
              >
                {regions.map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                Expedition
              </label>
              <select
                value={selectedExpedition}
                onChange={(e) => setSelectedExpedition(e.target.value)}
                className="w-full px-2.5 py-2 rounded-lg border border-slate-200 bg-white text-slate-700 font-medium focus:ring-1 focus:ring-amber-500 truncate"
              >
                {expeditions.map((e) => (
                  <option key={e} value={e}>
                    {e}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                Domain
              </label>
              <select
                value={selectedDomain}
                onChange={(e) => setSelectedDomain(e.target.value)}
                className="w-full px-2.5 py-2 rounded-lg border border-slate-200 bg-white text-slate-700 font-medium focus:ring-1 focus:ring-amber-500"
              >
                {domains.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                Report Type
              </label>
              <select
                value={selectedReportType}
                onChange={(e) => setSelectedReportType(e.target.value)}
                className="w-full px-2.5 py-2 rounded-lg border border-slate-200 bg-white text-slate-700 font-medium focus:ring-1 focus:ring-amber-500 truncate"
              >
                {reportTypes.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* 3. REPORTS LISTING */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-4">
          {filteredReports.map((report) => (
            <div
              key={report.id}
              onClick={() => onNavigate(`/expeditions/reports/${report.id}`)}
              className="bg-white rounded-2xl border border-slate-200 hover:border-amber-400 p-6 shadow-xs hover:shadow-md transition cursor-pointer group space-y-4"
            >
              {/* Header row */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-mono text-xs font-bold px-2.5 py-0.5 rounded bg-slate-900 text-white">
                    {report.id}
                  </span>
                  <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900">
                    {report.region}
                  </span>
                  <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700">
                    {report.reportType}
                  </span>
                  <span className="text-xs font-mono font-medium text-slate-500">
                    Year: {report.year}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span
                    className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                      report.availability === 'Available'
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-slate-100 text-slate-700'
                    }`}
                  >
                    {report.availability === 'Available' ? (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Public Access</span>
                      </>
                    ) : (
                      <>
                        <Lock className="w-3.5 h-3.5 text-slate-500" />
                        <span>Authorized Access</span>
                      </>
                    )}
                  </span>
                  <span className="text-xs text-slate-400 hidden sm:inline">
                    {report.downloadCount} downloads
                  </span>
                </div>
              </div>

              {/* Title & Short Summary */}
              <div className="space-y-1.5">
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-amber-800 transition">
                  {report.officialTitle}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
                  {report.summary}
                </p>
              </div>

              {/* Authors, Platform & Metadata */}
              <div className="flex flex-wrap items-center justify-between gap-4 pt-2 text-xs text-slate-500">
                <div>
                  <span className="font-semibold text-slate-700">Expedition:</span>{' '}
                  <span className="text-slate-800 font-medium">{report.expeditionName}</span> ·{' '}
                  <span className="text-slate-500">{report.platform}</span>
                </div>

                <div className="flex items-center gap-3">
                  <span className="font-mono text-[11px] text-slate-600">
                    PDF ({report.fileSize})
                  </span>
                  <span className="text-slate-300">|</span>
                  <span className="text-slate-500">
                    Authors: {report.authors.join(', ')}
                  </span>
                </div>
              </div>

              {/* Actions Footer */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-slate-100 text-xs">
                <div className="text-slate-500 text-[11px]">
                  Preserved in National Polar Scientific Repository under MoES Data Policy.
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onNavigate(`/expeditions/reports/${report.id}`);
                    }}
                    className="px-3.5 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold transition"
                  >
                    View Details
                  </button>

                  <button
                    onClick={(e) => handleDownload(e, report)}
                    className={`px-4 py-1.5 rounded-lg font-bold text-white transition flex items-center gap-1.5 shadow-2xs ${
                      downloadSuccessId === report.id
                        ? 'bg-emerald-600'
                        : 'bg-amber-800 hover:bg-amber-700'
                    }`}
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>{downloadSuccessId === report.id ? 'Downloaded' : 'Download Report'}</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
