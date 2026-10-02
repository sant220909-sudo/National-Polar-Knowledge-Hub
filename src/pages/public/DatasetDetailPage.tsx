import React, { useState } from 'react';
import { store } from '../../services/storage';
import { Dataset, User } from '../../types';
import {
  Database,
  ArrowLeft,
  Download,
  Lock,
  CheckCircle2,
  FileSpreadsheet,
  Share2,
  Printer,
  Copy,
  ExternalLink,
  ShieldCheck,
  Calendar,
  MapPin,
  Compass,
  FileText,
  Clock,
  Layers,
  Info,
  Check
} from 'lucide-react';

interface DatasetDetailPageProps {
  datasetId: string;
  onNavigate: (route: string) => void;
  currentUser?: User;
}

export const DatasetDetailPage: React.FC<DatasetDetailPageProps> = ({
  datasetId,
  onNavigate,
  currentUser
}) => {
  const dataset =
    store.getDatasetById(datasetId) ||
    store.getDatasets()[0];

  const sourceResource = store.getResourceById(dataset.sourceResourceId);
  const relatedExpedition = store.getExpeditionById(dataset.relatedExpeditionId);

  // Publications linked to this dataset
  const relatedPublications = store.getPublications().filter((p) =>
    dataset.relatedPublicationIds?.includes(p.id) || p.relatedDatasetIds?.includes(dataset.id)
  );

  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [copiedCitation, setCopiedCitation] = useState(false);

  // Request Access Modal
  const [requestModalOpen, setRequestModalOpen] = useState(false);
  const [requesterName, setRequesterName] = useState('');
  const [requesterEmail, setRequesterEmail] = useState('');
  const [requesterInstitution, setRequesterInstitution] = useState('');
  const [requesterPurpose, setRequesterPurpose] = useState('');
  const [requestSubmitted, setRequestSubmitted] = useState(false);

  const handleDownload = () => {
    store.downloadDataset(dataset.id);
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 3500);
  };

  const handleRequestSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    store.requestDatasetAccess(dataset.id, {
      name: requesterName,
      email: requesterEmail,
      institution: requesterInstitution,
      purpose: requesterPurpose
    });
    setRequestSubmitted(true);
    setTimeout(() => {
      setRequestModalOpen(false);
      setRequestSubmitted(false);
      setRequesterName('');
      setRequesterEmail('');
      setRequesterInstitution('');
      setRequesterPurpose('');
    }, 2000);
  };

  const citationText = `${dataset.authors.join(', ')} (${dataset.year}). ${dataset.title} [Data set]. National Polar Data Center (NPDC), National Centre for Polar and Ocean Research, Ministry of Earth Sciences, Govt. of India. ID: ${dataset.id}`;

  const handleCopyCitation = () => {
    navigator.clipboard?.writeText(citationText);
    setCopiedCitation(true);
    setTimeout(() => setCopiedCitation(false), 3000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* 1. NAVIGATION BREADCRUMB */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => onNavigate('/datasets')}
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-slate-900 transition group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
          <span>Back to Datasets Archive</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopyCitation}
            className="px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 transition text-xs flex items-center gap-1.5 shadow-2xs"
          >
            {copiedCitation ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedCitation ? 'Citation Copied' : 'Cite Dataset'}</span>
          </button>
        </div>
      </div>

      {/* 2. DATASET HEADER & PROVENANCE STRIP */}
      <header className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
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

          <div className="flex items-center gap-2">
            <span
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${
                dataset.accessStatus === 'Available'
                  ? 'bg-emerald-100 text-emerald-800'
                  : 'bg-amber-100 text-amber-900'
              }`}
            >
              {dataset.accessStatus === 'Available' ? (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Open Access (Public)</span>
                </>
              ) : (
                <>
                  <Lock className="w-3.5 h-3.5 text-amber-700" />
                  <span>Restricted Access (Authorized Requests Only)</span>
                </>
              )}
            </span>
          </div>
        </div>

        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight font-serif">
          {dataset.title}
        </h1>

        <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-sans">
          {dataset.description}
        </p>

        {/* Authors & Institutional Metadata */}
        <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-600">
          <div>
            <span className="text-slate-400">Principal Investigators / Authors: </span>
            <span className="font-semibold text-slate-900">{dataset.authors.join(', ')}</span>
            <div className="text-[11px] text-slate-500 mt-0.5">
              Lead Institution: <span className="font-medium text-slate-700">{dataset.leadInstitution}</span>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            {dataset.accessStatus === 'Available' ? (
              <button
                onClick={handleDownload}
                className={`px-5 py-2.5 rounded-xl font-bold text-white transition flex items-center gap-2 shadow-md ${
                  downloadSuccess ? 'bg-emerald-600' : 'bg-sky-800 hover:bg-sky-700'
                }`}
              >
                <Download className="w-4 h-4" />
                <span>{downloadSuccess ? 'Dataset Delivered!' : `Download Dataset (${dataset.fileFormat})`}</span>
              </button>
            ) : (
              <button
                onClick={() => setRequestModalOpen(true)}
                className="px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 font-bold text-slate-950 transition flex items-center gap-2 shadow-md"
              >
                <Lock className="w-4 h-4" />
                <span>Request Authorized Access</span>
              </button>
            )}
          </div>
        </div>
      </header>

      {/* 3. TECHNICAL METADATA SPECIFICATIONS & RELATIONSHIPS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column (2 Cols): Parameters & Sample Preview */}
        <div className="lg:col-span-2 space-y-6">
          {/* Parameters Table */}
          <section className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Database className="w-4 h-4 text-sky-700" />
              <span>Observed Parameters & Variables</span>
            </h2>

            <div className="flex flex-wrap gap-2">
              {dataset.parameters.map((param, idx) => (
                <div
                  key={idx}
                  className="px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium text-slate-800 flex items-center gap-1.5"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-600"></span>
                  <span>{param}</span>
                </div>
              ))}
            </div>

            <div className="pt-2 text-xs text-slate-500 leading-relaxed">
              Standard calibration protocols adhere to World Meteorological Organization (WMO) and Scientific Committee on Antarctic Research (SCAR) standards.
            </div>
          </section>

          {/* Sample Data Table Preview */}
          {dataset.sampleDataPreview && dataset.sampleDataPreview.length > 0 && (
            <section className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <FileSpreadsheet className="w-4 h-4 text-emerald-700" />
                  <span>Dataset Preview (Top 5 Recorded Entries)</span>
                </h2>
                <span className="text-[11px] font-mono text-slate-400">
                  Format: {dataset.fileFormat}
                </span>
              </div>

              <div className="overflow-x-auto border border-slate-200 rounded-xl">
                <table className="min-w-full divide-y divide-slate-200 text-xs text-left">
                  <thead className="bg-slate-50 font-semibold text-slate-700 font-mono">
                    <tr>
                      {dataset.sampleColumns?.map((col) => (
                        <th key={col} className="px-3 py-2.5 whitespace-nowrap">
                          {col}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-mono text-[11px] text-slate-600 bg-white">
                    {dataset.sampleDataPreview.map((row, rIdx) => (
                      <tr key={rIdx} className="hover:bg-slate-50/80">
                        {dataset.sampleColumns?.map((col) => (
                          <td key={col} className="px-3 py-2 whitespace-nowrap">
                            {row[col] !== undefined ? String(row[col]) : '—'}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="text-[11px] text-slate-400 flex items-center gap-1.5">
                <Info className="w-3.5 h-3.5 shrink-0" />
                <span>Download full file for complete multi-year observational time-series.</span>
              </div>
            </section>
          )}

          {/* Citation & Attribution Box */}
          <section className="bg-slate-900 text-white rounded-2xl p-6 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase font-bold tracking-wider text-amber-400">
                Data Citation & Provenance
              </span>
              <button
                onClick={handleCopyCitation}
                className="text-xs text-sky-300 hover:text-white flex items-center gap-1 transition"
              >
                {copiedCitation ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedCitation ? 'Copied' : 'Copy Citation'}</span>
              </button>
            </div>
            <p className="text-xs text-slate-300 font-mono leading-relaxed bg-slate-950/80 p-3.5 rounded-xl border border-slate-800">
              {citationText}
            </p>
          </section>
        </div>

        {/* Right Column (1 Col): Repository Provenance & Linked Entities */}
        <div className="space-y-6">
          {/* File & Repository Dossier */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">
              Repository Specifications
            </h3>

            <dl className="space-y-3 text-xs">
              <div className="flex justify-between pb-2 border-b border-slate-100">
                <dt className="text-slate-500">Platform / Base</dt>
                <dd className="font-semibold text-slate-900 text-right">{dataset.platform}</dd>
              </div>

              <div className="flex justify-between pb-2 border-b border-slate-100">
                <dt className="text-slate-500">File Format</dt>
                <dd className="font-mono font-bold text-slate-900">{dataset.fileFormat}</dd>
              </div>

              <div className="flex justify-between pb-2 border-b border-slate-100">
                <dt className="text-slate-500">File Size</dt>
                <dd className="font-mono text-slate-900">{dataset.fileSize}</dd>
              </div>

              <div className="flex justify-between pb-2 border-b border-slate-100">
                <dt className="text-slate-500">Cloud Storage</dt>
                <dd className="font-mono text-[10px] text-slate-600 truncate max-w-[160px]" title={dataset.r2ObjectKey}>
                  Cloudflare R2 Encrypted
                </dd>
              </div>

              <div className="flex justify-between pb-2 border-b border-slate-100">
                <dt className="text-slate-500">License</dt>
                <dd className="font-medium text-slate-800 text-right">{dataset.license}</dd>
              </div>

              <div className="flex justify-between">
                <dt className="text-slate-500">Total Deliveries</dt>
                <dd className="font-semibold text-emerald-700">{dataset.downloadCount} downloads</dd>
              </div>
            </dl>
          </div>

          {/* Linked Repository Entities (Polar Knowledge Graph Connections) */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-sky-700" />
              <span>Linked Repository Entities</span>
            </h3>

            <div className="space-y-3 text-xs">
              {/* Linked Expedition */}
              {relatedExpedition && (
                <div
                  onClick={() => onNavigate(`/expeditions/${relatedExpedition.id}`)}
                  className="p-3 rounded-xl border border-slate-200 hover:border-sky-400 bg-slate-50/50 hover:bg-slate-50 transition cursor-pointer group"
                >
                  <div className="text-[10px] uppercase font-bold text-sky-800">Originating Expedition</div>
                  <div className="font-bold text-slate-900 group-hover:text-sky-800 transition mt-0.5">
                    {relatedExpedition.name}
                  </div>
                  <div className="text-[11px] text-slate-500 mt-1 flex items-center gap-1">
                    <span>{relatedExpedition.region}</span> · <span>Year: {relatedExpedition.year}</span>
                  </div>
                </div>
              )}

              {/* Linked Source Resource */}
              {sourceResource && (
                <div
                  onClick={() => onNavigate(`/repository/${sourceResource.id}`)}
                  className="p-3 rounded-xl border border-slate-200 hover:border-amber-400 bg-slate-50/50 hover:bg-slate-50 transition cursor-pointer group"
                >
                  <div className="text-[10px] uppercase font-bold text-amber-800">Source Scientific Resource</div>
                  <div className="font-bold text-slate-900 group-hover:text-amber-800 transition mt-0.5 truncate">
                    {sourceResource.title}
                  </div>
                  <div className="text-[10px] text-slate-500 font-mono mt-1">
                    ID: {sourceResource.id} · Type: {sourceResource.type}
                  </div>
                </div>
              )}

              {/* Linked Publications */}
              {relatedPublications.length > 0 && (
                <div className="space-y-2">
                  <div className="text-[10px] uppercase font-bold text-slate-500">Related Publications ({relatedPublications.length})</div>
                  {relatedPublications.map((pub) => (
                    <div
                      key={pub.id}
                      onClick={() => onNavigate(`/publications`)}
                      className="p-3 rounded-xl border border-slate-200 hover:border-sky-400 bg-slate-50/50 hover:bg-slate-50 transition cursor-pointer group"
                    >
                      <div className="font-bold text-slate-900 group-hover:text-sky-800 transition text-[11px] line-clamp-2">
                        {pub.title}
                      </div>
                      <div className="text-[10px] text-slate-500 mt-1">
                        {pub.journal} ({pub.year}) · DOI: {pub.doi}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Principle Note */}
          <div className="p-4 rounded-xl bg-sky-50 border border-sky-200 text-xs text-sky-950 space-y-1">
            <div className="font-bold flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-sky-800" />
              <span>Source-Grounded Integrity</span>
            </div>
            <p className="text-[11px] text-sky-800 leading-relaxed">
              Original scientific datasets remain preserved as the unalterable source of truth. Any derivative educational content retains strict cryptographic provenance to this record.
            </p>
          </div>
        </div>
      </div>

      {/* 4. REQUEST ACCESS MODAL */}
      {requestModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl border border-slate-200 max-w-lg w-full p-6 shadow-2xl space-y-5 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
                  <Lock className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">Request Access to Restricted Dataset</h3>
                  <p className="text-[11px] text-slate-500 font-mono">{dataset.id}</p>
                </div>
              </div>
              <button
                onClick={() => setRequestModalOpen(false)}
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
                <h4 className="text-base font-bold text-slate-900">Application Submitted</h4>
                <p className="text-xs text-slate-600 max-w-sm mx-auto">
                  Your research data request has been officially recorded in the National Polar Data Center queue. Our scientific board will review your credentials within 2 business days.
                </p>
              </div>
            ) : (
              <form onSubmit={handleRequestSubmit} className="space-y-4 text-xs">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-600 space-y-1">
                  <div className="font-semibold text-slate-900 text-[11px]">{dataset.title}</div>
                  <div className="text-[10px] text-slate-500 font-mono">
                    Format: {dataset.fileFormat} ({dataset.fileSize}) · Platform: {dataset.platform}
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="block font-semibold text-slate-700">Applicant Full Name</label>
                  <input
                    type="text"
                    required
                    value={requesterName}
                    onChange={(e) => setRequesterName(e.target.value)}
                    placeholder="e.g. Dr. Ramesh Chand"
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-sky-500 focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="block font-semibold text-slate-700">Institutional Email</label>
                    <input
                      type="email"
                      required
                      value={requesterEmail}
                      onChange={(e) => setRequesterEmail(e.target.value)}
                      placeholder="scientist@iisc.ac.in"
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
                      placeholder="e.g. IISc Bengaluru"
                      className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-sky-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="block font-semibold text-slate-700">Academic Project Title & Purpose</label>
                  <textarea
                    required
                    rows={3}
                    value={requesterPurpose}
                    onChange={(e) => setRequesterPurpose(e.target.value)}
                    placeholder="Specify project title, granting agency (e.g. SERB / MoES / CSIR), and research objectives..."
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-sky-500 focus:outline-none"
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setRequestModalOpen(false)}
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
