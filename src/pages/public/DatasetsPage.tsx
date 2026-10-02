import React, { useState, useMemo } from 'react';
import { store } from '../../services/storage';
import { Dataset, PolarRegion, ResearchTopic } from '../../types';
import {
  Database,
  Search,
  Filter,
  Download,
  Lock,
  CheckCircle2,
  ExternalLink,
  Layers,
  ArrowRight,
  Shield,
  FileSpreadsheet,
  Calendar,
  MapPin,
  Compass,
  FileText,
  Clock,
  Sparkles,
  Info
} from 'lucide-react';

interface DatasetsPageProps {
  onNavigate: (route: string) => void;
  currentUserRole?: string;
}

export const DatasetsPage: React.FC<DatasetsPageProps> = ({
  onNavigate,
  currentUserRole
}) => {
  const allDatasets = store.getDatasets();

  // Search & Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState<string>('All');
  const [selectedDomain, setSelectedDomain] = useState<string>('All');
  const [selectedPlatform, setSelectedPlatform] = useState<string>('All');
  const [selectedParameter, setSelectedParameter] = useState<string>('All');
  const [selectedFormat, setSelectedFormat] = useState<string>('All');
  const [selectedAvailability, setSelectedAvailability] = useState<string>('All');
  const [downloadSuccessId, setDownloadSuccessId] = useState<string | null>(null);

  // Request Access Modal State
  const [requestModalDataset, setRequestModalDataset] = useState<Dataset | null>(null);
  const [requesterName, setRequesterName] = useState('');
  const [requesterEmail, setRequesterEmail] = useState('');
  const [requesterInstitution, setRequesterInstitution] = useState('');
  const [requesterPurpose, setRequesterPurpose] = useState('');
  const [requestSubmitted, setRequestSubmitted] = useState(false);

  // Distinct filter options extracted dynamically from datasets
  const regions = useMemo(() => {
    return ['All', ...Array.from(new Set(allDatasets.map((d) => d.region)))];
  }, [allDatasets]);

  const domains = useMemo(() => {
    return ['All', ...Array.from(new Set(allDatasets.map((d) => d.researchDomain)))];
  }, [allDatasets]);

  const platforms = useMemo(() => {
    return ['All', ...Array.from(new Set(allDatasets.map((d) => d.platform)))];
  }, [allDatasets]);

  const parameters = useMemo(() => {
    const set = new Set<string>();
    allDatasets.forEach((d) => d.parameters.forEach((p) => set.add(p)));
    return ['All', ...Array.from(set)];
  }, [allDatasets]);

  const formats = useMemo(() => {
    return ['All', ...Array.from(new Set(allDatasets.map((d) => d.fileFormat)))];
  }, [allDatasets]);

  // Filtered dataset list (Excludes any dataset originating from PRIVATE internal resources)
  const filteredDatasets = useMemo(() => {
    return allDatasets.filter((dataset) => {
      // Do not expose datasets tied to PRIVATE internal resources
      if (dataset.sourceResourceId) {
        const sourceRes = store.getResourceById(dataset.sourceResourceId);
        if (sourceRes && sourceRes.visibility === 'PRIVATE') {
          return false;
        }
      }

      // Query search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesQuery =
          dataset.id.toLowerCase().includes(q) ||
          dataset.title.toLowerCase().includes(q) ||
          dataset.description.toLowerCase().includes(q) ||
          dataset.platform.toLowerCase().includes(q) ||
          dataset.expeditionName.toLowerCase().includes(q) ||
          dataset.authors.some((a) => a.toLowerCase().includes(q)) ||
          dataset.parameters.some((p) => p.toLowerCase().includes(q));

        if (!matchesQuery) return false;
      }

      // Dropdown filters
      if (selectedRegion !== 'All' && dataset.region !== selectedRegion) return false;
      if (selectedDomain !== 'All' && dataset.researchDomain !== selectedDomain) return false;
      if (selectedPlatform !== 'All' && dataset.platform !== selectedPlatform) return false;
      if (selectedParameter !== 'All' && !dataset.parameters.includes(selectedParameter)) return false;
      if (selectedFormat !== 'All' && dataset.fileFormat !== selectedFormat) return false;
      if (selectedAvailability !== 'All' && dataset.accessStatus !== selectedAvailability) return false;

      return true;
    });
  }, [
    allDatasets,
    searchQuery,
    selectedRegion,
    selectedDomain,
    selectedPlatform,
    selectedParameter,
    selectedFormat,
    selectedAvailability
  ]);

  const handleDownload = (e: React.MouseEvent, dataset: Dataset) => {
    e.stopPropagation();
    store.downloadDataset(dataset.id);
    setDownloadSuccessId(dataset.id);
    setTimeout(() => setDownloadSuccessId(null), 3000);
  };

  const handleOpenRequest = (e: React.MouseEvent, dataset: Dataset) => {
    e.stopPropagation();
    setRequestModalDataset(dataset);
    setRequestSubmitted(false);
  };

  const handleRequestSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!requestModalDataset) return;
    store.requestDatasetAccess(requestModalDataset.id, {
      name: requesterName,
      email: requesterEmail,
      institution: requesterInstitution,
      purpose: requesterPurpose
    });
    setRequestSubmitted(true);
    setTimeout(() => {
      setRequestModalDataset(null);
      setRequesterName('');
      setRequesterEmail('');
      setRequesterInstitution('');
      setRequesterPurpose('');
    }, 2000);
  };

  const totalDownloads = allDatasets.reduce((acc, d) => acc + (d.downloadCount || 0), 0);
  const openAccessCount = allDatasets.filter((d) => d.accessStatus === 'Available').length;

  return (
    <div className="space-y-8 pb-16 bg-slate-50/50">
      {/* 1. INSTITUTIONAL REPOSITORY BANNER */}
      <section className="bg-slate-950 text-white border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/20 text-sky-300 text-xs font-semibold border border-sky-400/30">
              <Database className="w-3.5 h-3.5 text-sky-400" />
              <span>National Polar Data Center (NPDC) · PACER Scheme</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight font-serif">
              Scientific Datasets Archive
            </h1>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-sans">
              Official catalog of in-situ cryospheric, oceanographic, atmospheric, and paleoclimate observational datasets acquired by Indian research teams across Antarctica, the Arctic, Southern Ocean, and Himalayan Third Pole.
            </p>

            {/* Quick Repository Metrics */}
            <div className="pt-4 flex flex-wrap items-center gap-6 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
                <span className="font-semibold text-white">{allDatasets.length}</span>
                <span className="text-slate-400">Preserved Datasets</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-sky-400"></span>
                <span className="font-semibold text-white">{openAccessCount}</span>
                <span className="text-slate-400">Open Access Datasets</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span>
                <span className="font-semibold text-white">{totalDownloads}</span>
                <span className="text-slate-400">Authorized Deliveries</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. SEARCH & ADVANCED MULTI-FACETED FILTERS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
          {/* Search Input */}
          <div className="relative">
            <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search datasets by title, parameter (e.g. stable isotopes, salinity), platform, or researcher..."
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent text-sm bg-slate-50/50"
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
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 pt-2 text-xs">
            {/* Region */}
            <div>
              <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                Region
              </label>
              <select
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
                className="w-full px-2.5 py-2 rounded-lg border border-slate-200 bg-white text-slate-700 font-medium focus:ring-1 focus:ring-sky-500"
              >
                {regions.map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </div>

            {/* Research Domain */}
            <div>
              <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                Domain
              </label>
              <select
                value={selectedDomain}
                onChange={(e) => setSelectedDomain(e.target.value)}
                className="w-full px-2.5 py-2 rounded-lg border border-slate-200 bg-white text-slate-700 font-medium focus:ring-1 focus:ring-sky-500"
              >
                {domains.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </div>

            {/* Platform / Station */}
            <div>
              <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                Platform / Station
              </label>
              <select
                value={selectedPlatform}
                onChange={(e) => setSelectedPlatform(e.target.value)}
                className="w-full px-2.5 py-2 rounded-lg border border-slate-200 bg-white text-slate-700 font-medium focus:ring-1 focus:ring-sky-500"
              >
                {platforms.map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </select>
            </div>

            {/* Parameter */}
            <div>
              <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                Parameter
              </label>
              <select
                value={selectedParameter}
                onChange={(e) => setSelectedParameter(e.target.value)}
                className="w-full px-2.5 py-2 rounded-lg border border-slate-200 bg-white text-slate-700 font-medium focus:ring-1 focus:ring-sky-500 truncate"
              >
                {parameters.map((param) => (
                  <option key={param} value={param}>
                    {param}
                  </option>
                ))}
              </select>
            </div>

            {/* File Format */}
            <div>
              <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                Format
              </label>
              <select
                value={selectedFormat}
                onChange={(e) => setSelectedFormat(e.target.value)}
                className="w-full px-2.5 py-2 rounded-lg border border-slate-200 bg-white text-slate-700 font-medium focus:ring-1 focus:ring-sky-500"
              >
                {formats.map((f) => (
                  <option key={f} value={f}>
                    {f}
                  </option>
                ))}
              </select>
            </div>

            {/* Availability */}
            <div>
              <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                Availability
              </label>
              <select
                value={selectedAvailability}
                onChange={(e) => setSelectedAvailability(e.target.value)}
                className="w-full px-2.5 py-2 rounded-lg border border-slate-200 bg-white text-slate-700 font-medium focus:ring-1 focus:ring-sky-500"
              >
                <option value="All">All Statuses</option>
                <option value="Available">Available (Open Access)</option>
                <option value="Restricted">Restricted (Request Access)</option>
              </select>
            </div>
          </div>

          {/* Active Filter Indicators */}
          {(selectedRegion !== 'All' ||
            selectedDomain !== 'All' ||
            selectedPlatform !== 'All' ||
            selectedParameter !== 'All' ||
            selectedFormat !== 'All' ||
            selectedAvailability !== 'All' ||
            searchQuery) && (
            <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
              <span className="text-slate-500">
                Found <strong>{filteredDatasets.length}</strong> matching datasets
              </span>
              <button
                onClick={() => {
                  setSelectedRegion('All');
                  setSelectedDomain('All');
                  setSelectedPlatform('All');
                  setSelectedParameter('All');
                  setSelectedFormat('All');
                  setSelectedAvailability('All');
                  setSearchQuery('');
                }}
                className="text-amber-800 hover:text-amber-950 font-semibold"
              >
                Clear All Filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* 3. DATASETS LISTING */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {filteredDatasets.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-slate-400">
              <Database className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">No Datasets Match Your Criteria</h3>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              Try broadening your filter selections or clearing search keywords to view all datasets archived in the National Polar Repository.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredDatasets.map((dataset) => (
              <div
                key={dataset.id}
                onClick={() => onNavigate(`/datasets/${dataset.id}`)}
                className="bg-white rounded-2xl border border-slate-200 hover:border-sky-400 p-6 shadow-xs hover:shadow-md transition cursor-pointer group space-y-4"
              >
                {/* Header row: ID, Badges, Availability */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono text-xs font-bold px-2.5 py-0.5 rounded bg-slate-900 text-white">
                      {dataset.id}
                    </span>
                    <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-sky-100 text-sky-900">
                      {dataset.region}
                    </span>
                    <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700">
                      {dataset.researchDomain}
                    </span>
                    <span className="text-xs font-mono font-medium text-slate-500">
                      Year: {dataset.year}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                        dataset.accessStatus === 'Available'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-amber-100 text-amber-900'
                      }`}
                    >
                      {dataset.accessStatus === 'Available' ? (
                        <>
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                          <span>Open Access</span>
                        </>
                      ) : (
                        <>
                          <Lock className="w-3.5 h-3.5 text-amber-700" />
                          <span>Request Access</span>
                        </>
                      )}
                    </span>
                    <span className="text-xs text-slate-400 hidden sm:inline">
                      {dataset.downloadCount} deliveries
                    </span>
                  </div>
                </div>

                {/* Title & Description */}
                <div className="space-y-1.5">
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-sky-800 transition">
                    {dataset.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
                    {dataset.description}
                  </p>
                </div>

                {/* Parameters & Platform info */}
                <div className="flex flex-wrap items-center justify-between gap-4 pt-2 text-xs text-slate-500">
                  <div className="flex flex-wrap items-center gap-1.5">
                    <span className="font-semibold text-slate-700 mr-1">Parameters:</span>
                    {dataset.parameters.map((p, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-[11px]"
                      >
                        {p}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <span className="flex items-center gap-1 font-mono text-[11px]">
                      <FileSpreadsheet className="w-3.5 h-3.5 text-slate-400" />
                      <span>{dataset.fileFormat} ({dataset.fileSize})</span>
                    </span>

                    <span className="text-slate-300">|</span>

                    <span className="text-slate-600 font-medium">
                      {dataset.platform}
                    </span>
                  </div>
                </div>

                {/* Action Footer */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-slate-100 text-xs">
                  <div className="text-slate-500 text-[11px]">
                    Lead Authors: <span className="text-slate-800 font-medium">{dataset.authors.join(', ')}</span> · {dataset.leadInstitution}
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onNavigate(`/datasets/${dataset.id}`);
                      }}
                      className="px-3.5 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold transition"
                    >
                      View Metadata
                    </button>

                    {dataset.accessStatus === 'Available' ? (
                      <button
                        onClick={(e) => handleDownload(e, dataset)}
                        className={`px-4 py-1.5 rounded-lg font-bold text-white transition flex items-center gap-1.5 shadow-2xs ${
                          downloadSuccessId === dataset.id
                            ? 'bg-emerald-600 hover:bg-emerald-700'
                            : 'bg-sky-800 hover:bg-sky-700'
                        }`}
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>{downloadSuccessId === dataset.id ? 'Delivered' : 'Download Dataset'}</span>
                      </button>
                    ) : (
                      <button
                        onClick={(e) => handleOpenRequest(e, dataset)}
                        className="px-4 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-500 font-bold text-slate-950 transition flex items-center gap-1.5"
                      >
                        <Lock className="w-3.5 h-3.5" />
                        <span>Request Access</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* 4. REQUEST ACCESS MODAL FOR RESTRICTED DATASETS */}
      {requestModalDataset && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl border border-slate-200 max-w-lg w-full p-6 shadow-2xl space-y-5 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
                  <Lock className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">Formal Dataset Access Request</h3>
                  <p className="text-[11px] text-slate-500 font-mono">{requestModalDataset.id}</p>
                </div>
              </div>
              <button
                onClick={() => setRequestModalDataset(null)}
                className="text-slate-400 hover:text-slate-600 text-sm font-bold p-1"
              >
                ✕
              </button>
            </div>

            {requestSubmitted ? (
              <div className="py-8 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="text-base font-bold text-slate-900">Request Successfully Registered</h4>
                <p className="text-xs text-slate-600 max-w-sm mx-auto">
                  Your formal data access request for <strong>{requestModalDataset.title}</strong> has been logged with the National Polar Data Center (NPDC). Authorized scientists will review your academic intent.
                </p>
              </div>
            ) : (
              <form onSubmit={handleRequestSubmit} className="space-y-4 text-xs">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-600 space-y-1">
                  <div className="font-semibold text-slate-900 text-[11px]">{requestModalDataset.title}</div>
                  <div className="text-[10px] text-slate-500 font-mono">
                    Platform: {requestModalDataset.platform} · Format: {requestModalDataset.fileFormat} ({requestModalDataset.fileSize})
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="block font-semibold text-slate-700">Full Name</label>
                  <input
                    type="text"
                    required
                    value={requesterName}
                    onChange={(e) => setRequesterName(e.target.value)}
                    placeholder="e.g. Dr. Priya Rao"
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-sky-500 focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="block font-semibold text-slate-700">Official Institutional Email</label>
                    <input
                      type="email"
                      required
                      value={requesterEmail}
                      onChange={(e) => setRequesterEmail(e.target.value)}
                      placeholder="researcher@iitb.ac.in"
                      className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-sky-500 focus:outline-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="block font-semibold text-slate-700">Institution / University</label>
                    <input
                      type="text"
                      required
                      value={requesterInstitution}
                      onChange={(e) => setRequesterInstitution(e.target.value)}
                      placeholder="e.g. IIT Delhi / WIHG"
                      className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-sky-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="block font-semibold text-slate-700">Research Purpose / Proposal Abstract</label>
                  <textarea
                    required
                    rows={3}
                    value={requesterPurpose}
                    onChange={(e) => setRequesterPurpose(e.target.value)}
                    placeholder="Briefly state how this dataset will be used in your research project..."
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-sky-500 focus:outline-none"
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setRequestModalDataset(null)}
                    className="px-4 py-2 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-lg bg-sky-800 hover:bg-sky-700 text-white font-bold shadow-xs"
                  >
                    Submit Data Access Request
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
