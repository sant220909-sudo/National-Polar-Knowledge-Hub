import React, { useState } from 'react';
import { store } from '../../services/storage';
import { Resource, ResourceFile } from '../../types';
import {
  Compass,
  Calendar,
  MapPin,
  Users,
  Award,
  ArrowLeft,
  CheckCircle2,
  Clock,
  Circle,
  FileText,
  Image as ImageIcon,
  Video,
  ChevronRight,
  ExternalLink,
  ShieldCheck,
  Database,
  Download,
  BarChart3,
  Film
} from 'lucide-react';

interface ExpeditionDetailPageProps {
  expeditionId: string;
  onNavigate: (route: string) => void;
  onOpenMedia?: (mediaId: string) => void;
}

export const ExpeditionDetailPage: React.FC<ExpeditionDetailPageProps> = ({
  expeditionId,
  onNavigate,
  onOpenMedia
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'objectives' | 'activities' | 'files' | 'media'>('overview');
  const expedition = store.getExpeditionById(expeditionId) || store.getExpeditions()[0];

  const linkedResources = (expedition.relatedResourceIds || [])
    .map((rId) => store.getResourceById(rId))
    .filter((r): r is Resource => !!r);

  const allFiles = linkedResources.flatMap((r) =>
    r.files.map((f) => ({
      ...f,
      resourceTitle: r.title,
      resourceId: r.id
    }))
  );

  const inProgressStep = expedition.timeline.find((t) => t.status === 'in_progress');

  const relatedDrafts = store
    .getDrafts()
    .filter((d) => {
      if (d.status !== 'PUBLISHED') return false;
      const res = store.getResourceById(d.resourceId);
      if (res && res.visibility === 'PRIVATE') return false;
      return (
        expedition.relatedResourceIds.includes(d.resourceId) ||
        (d.contentDestination === 'Expedition' && res?.expeditionId === expedition.id)
      );
    });

  const relatedMedia = store.getMedia().filter((m) => m.region === expedition.region);

  const getFileIcon = (fileType: string) => {
    switch (fileType.toLowerCase()) {
      case 'pdf':
        return <FileText className="w-4 h-4 text-rose-600" />;
      case 'image':
      case 'photo':
        return <ImageIcon className="w-4 h-4 text-sky-600" />;
      case 'video':
      case 'mp4':
        return <Film className="w-4 h-4 text-purple-600" />;
      case 'data':
      case 'csv':
        return <BarChart3 className="w-4 h-4 text-emerald-600" />;
      default:
        return <FileText className="w-4 h-4 text-slate-600" />;
    }
  };

  return (
    <div className="pb-16 space-y-8">
      {/* Back Button */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <button
          onClick={() => onNavigate('/expeditions')}
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-slate-900 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Expeditions Archive</span>
        </button>
      </div>

      {/* Hero Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-slate-950 text-white border border-slate-800 shadow-xl">
          <div className="relative h-72 sm:h-96 w-full">
            <img
              src={expedition.bannerImage}
              alt={expedition.name}
              className="w-full h-full object-cover opacity-60"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent"></div>

            {/* Badges on Top */}
            <div className="absolute top-6 left-6 flex items-center gap-2 flex-wrap">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-slate-900/90 text-white border border-slate-700 backdrop-blur-md">
                {expedition.region}
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/90 text-white">
                ● Status: {expedition.status}
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-mono bg-sky-950 text-sky-300 border border-sky-500/30">
                {expedition.expeditionNumber}
              </span>
            </div>

            {/* Title & Metadata Overlaid */}
            <div className="absolute bottom-6 left-6 right-6 space-y-3">
              <h1 className="text-2xl sm:text-4xl font-extrabold text-white leading-tight font-sans">
                {expedition.name}
              </h1>

              <div className="flex flex-wrap items-center gap-4 text-xs text-slate-300 pt-1">
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-sky-400" />
                  <strong>Station:</strong> {expedition.leadStation}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1.5">
                  <Users className="w-4 h-4 text-sky-400" />
                  <strong>Leader:</strong> {expedition.expeditionLeader} ({expedition.teamSize} personnel)
                </span>
                <span>•</span>
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-sky-400" />
                  <strong>Duration:</strong> {expedition.duration}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Visual Timeline Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <span className="text-[10px] uppercase font-bold tracking-wider text-sky-700">
                Mission Lifecycle
              </span>
              <h3 className="text-base font-bold text-slate-900">
                Expedition Phase Progression & Milestones
              </h3>
            </div>
            <span className="text-xs text-slate-500 font-mono">
              Planning → Publication
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-6 gap-3 pt-2">
            {expedition.timeline.map((step, idx) => (
              <div
                key={step.phase}
                className={`p-3 rounded-xl border text-xs flex flex-col justify-between ${
                  step.status === 'completed'
                    ? 'bg-emerald-50/60 border-emerald-200 text-emerald-900'
                    : step.status === 'in_progress'
                    ? 'bg-sky-50 border-sky-300 text-sky-950 ring-2 ring-sky-400/80 shadow-xs'
                    : 'bg-slate-50 border-slate-200 text-slate-500'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] uppercase font-bold tracking-wider opacity-75">
                      Phase {idx + 1}
                    </span>
                    {step.status === 'completed' ? (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    ) : step.status === 'in_progress' ? (
                      <Clock className="w-3.5 h-3.5 text-sky-600 animate-spin" />
                    ) : (
                      <Circle className="w-3.5 h-3.5 text-slate-400" />
                    )}
                  </div>
                  <h5 className="font-bold leading-tight">{step.phase}</h5>
                  <p className="text-[11px] font-semibold opacity-90 mt-0.5">{step.title}</p>
                </div>
                <div className="mt-2 pt-1 border-t border-black/5 text-[10px] flex items-center justify-between opacity-85">
                  <span className="font-mono">{step.date}</span>
                  {step.status === 'in_progress' && (
                    <span className="text-[9px] font-bold text-sky-800 bg-sky-100 px-1 py-0.2 rounded">
                      IN PROGRESS
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* In-Progress Active Field Milestone Callout */}
          {inProgressStep && (
            <div className="p-3.5 bg-sky-50/80 border border-sky-300 rounded-xl text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs">
              <div className="flex items-center gap-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-sky-500 animate-ping shrink-0" />
                <div>
                  <div className="font-bold text-sky-950 flex items-center gap-1.5 flex-wrap">
                    <span className="uppercase text-[10px] tracking-wider text-sky-700">Active Field Phase:</span>
                    <span>{inProgressStep.phase} — {inProgressStep.title}</span>
                    <span className="text-slate-500 font-normal">({inProgressStep.date})</span>
                  </div>
                  <p className="text-[11px] text-slate-700 mt-0.5">{inProgressStep.description}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-sky-100 text-sky-900 font-bold border border-sky-300">
                  🔴 Real-time Operations Active
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Tabs & Deep Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Column */}
          <div className="lg:col-span-8 space-y-6">
            {/* Tabs */}
            <div className="flex items-center gap-2 border-b border-slate-200 pb-2 text-xs overflow-x-auto">
              <button
                onClick={() => setActiveTab('overview')}
                className={`px-4 py-2 rounded-xl font-bold transition whitespace-nowrap ${
                  activeTab === 'overview'
                    ? 'bg-slate-900 text-white'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                Mission Overview
              </button>
              <button
                onClick={() => setActiveTab('objectives')}
                className={`px-4 py-2 rounded-xl font-bold transition whitespace-nowrap ${
                  activeTab === 'objectives'
                    ? 'bg-slate-900 text-white'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                Scientific Objectives
              </button>
              <button
                onClick={() => setActiveTab('activities')}
                className={`px-4 py-2 rounded-xl font-bold transition whitespace-nowrap ${
                  activeTab === 'activities'
                    ? 'bg-slate-900 text-white'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                Field Research Activities
              </button>
              <button
                onClick={() => setActiveTab('files')}
                className={`px-4 py-2 rounded-xl font-bold transition whitespace-nowrap flex items-center gap-1.5 ${
                  activeTab === 'files'
                    ? 'bg-slate-900 text-white'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <Database className="w-3.5 h-3.5" />
                <span>Field Files & Telemetry ({allFiles.length})</span>
              </button>
              <button
                onClick={() => setActiveTab('media')}
                className={`px-4 py-2 rounded-xl font-bold transition whitespace-nowrap ${
                  activeTab === 'media'
                    ? 'bg-slate-900 text-white'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                Media & Gallery ({relatedMedia.length})
              </button>
            </div>

            {/* Tab: Overview */}
            {activeTab === 'overview' && (
              <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed shadow-xs">
                <h3 className="text-base sm:text-lg font-bold text-slate-900">
                  Expedition Context & Operational Framework
                </h3>
                <p>{expedition.overview}</p>

                <div className="p-4 rounded-xl bg-sky-50 border border-sky-200 text-sky-900 space-y-1">
                  <div className="font-bold flex items-center gap-1.5 text-xs text-sky-950">
                    <ShieldCheck className="w-4 h-4 text-sky-600" />
                    Environmental Preservation & Treaty Compliance
                  </div>
                  <p className="text-xs text-sky-800 leading-normal">
                    This scientific expedition operates in strict compliance with the Protocol on Environmental Protection to the Antarctic Treaty (Madrid Protocol). All human presence operates under zero-waste return protocols.
                  </p>
                </div>
              </div>
            )}

            {/* Tab: Objectives */}
            {activeTab === 'objectives' && (
              <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4 shadow-xs">
                <h3 className="text-base font-bold text-slate-900">
                  Primary Scientific & Technical Objectives
                </h3>
                <div className="space-y-3">
                  {expedition.objectives.map((obj, i) => (
                    <div
                      key={i}
                      className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/60 flex items-start gap-3 text-xs sm:text-sm text-slate-800"
                    >
                      <div className="w-6 h-6 rounded-lg bg-sky-600 text-white flex items-center justify-center font-bold text-xs shrink-0">
                        {i + 1}
                      </div>
                      <p className="leading-relaxed">{obj}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tab: Activities */}
            {activeTab === 'activities' && (
              <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4 shadow-xs">
                <h3 className="text-base font-bold text-slate-900">
                  Key Field Activities Conducted
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  {expedition.researchActivities.map((act, i) => (
                    <div
                      key={i}
                      className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 flex items-center gap-3 text-slate-800"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span className="font-medium">{act}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tab: Files, Datasets & In-Progress Telemetry */}
            {activeTab === 'files' && (
              <div className="space-y-5">
                {/* Active In-Progress Telemetry Banner */}
                {inProgressStep && (
                  <div className="bg-gradient-to-r from-sky-900 via-slate-900 to-sky-950 rounded-2xl p-5 text-white border border-sky-800 shadow-md space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      <span className="text-[10px] font-mono uppercase tracking-wider text-sky-300 font-bold">
                        Active Telemetry & Field Deployment
                      </span>
                    </div>
                    <h4 className="text-base font-bold text-white">
                      {inProgressStep.phase}: {inProgressStep.title}
                    </h4>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {inProgressStep.description} Continuous telemetry relays to the National Polar Data Center (NPDC) at NCPOR Goa via GSAT-11 / Inmarsat satellite terminals.
                    </p>
                  </div>
                )}

                {/* Primary Preserved Files List */}
                <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4 shadow-xs">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <div>
                      <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                        <Database className="w-4 h-4 text-sky-700" />
                        <span>Preserved Scientific Data Files ({allFiles.length})</span>
                      </h3>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Permanent source files, drilling logs, numerical datasets, and reports linked to this expedition.
                      </p>
                    </div>
                    <span className="text-xs font-mono px-2.5 py-1 rounded bg-sky-50 text-sky-800 border border-sky-200 font-bold">
                      {allFiles.length} file(s) attached
                    </span>
                  </div>

                  {allFiles.length > 0 ? (
                    <div className="space-y-3">
                      {allFiles.map((file, idx) => (
                        <div
                          key={idx}
                          className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:border-sky-300 transition flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                        >
                          <div className="flex items-start gap-3">
                            <div className="p-2.5 rounded-xl bg-white border border-slate-200 shadow-2xs shrink-0 mt-0.5">
                              {getFileIcon(file.fileType)}
                            </div>
                            <div className="space-y-1">
                              <div className="font-bold text-slate-900 flex items-center gap-2 flex-wrap">
                                <span>{file.filename}</span>
                                <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-slate-200/70 text-slate-700 uppercase font-semibold">
                                  {file.fileType}
                                </span>
                                <span className="text-[10px] text-slate-400 font-mono">
                                  {file.sizeMb} MB
                                </span>
                              </div>
                              {file.caption && (
                                <p className="text-[11px] text-slate-600 line-clamp-2">
                                  {file.caption}
                                </p>
                              )}
                              <div className="text-[10px] text-slate-400 flex items-center gap-2 pt-0.5">
                                <span>Source: {file.resourceTitle}</span>
                                <span>·</span>
                                <span className="font-mono text-sky-700">[{file.resourceId}]</span>
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                            <a
                              href={file.url}
                              target="_blank"
                              rel="noreferrer"
                              download={file.filename}
                              className="px-3 py-1.5 rounded-lg bg-sky-700 hover:bg-sky-800 text-white font-bold text-xs flex items-center gap-1.5 shadow-2xs transition"
                            >
                              <Download className="w-3.5 h-3.5" />
                              <span>Download / Inspect</span>
                            </a>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="p-8 text-center bg-slate-50 rounded-xl border border-dashed border-slate-300 space-y-2">
                      <Database className="w-8 h-8 text-slate-400 mx-auto" />
                      <p className="text-xs font-semibold text-slate-700">No primary files linked to this record yet</p>
                      <p className="text-[11px] text-slate-500 max-w-sm mx-auto">
                        Field researchers can deposit raw datasets, ice core stratigraphies, and reports in the Scientific Repository and associate them with this expedition.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Tab: Media */}
            {activeTab === 'media' && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {relatedMedia.map((m) => (
                    <div
                      key={m.id}
                      onClick={() => onOpenMedia && onOpenMedia(m.id)}
                      className="group bg-white rounded-2xl border border-slate-200 overflow-hidden cursor-pointer shadow-xs hover:border-sky-300"
                    >
                      <div className="relative h-40 bg-slate-900">
                        <img
                          src={m.thumbnail}
                          alt={m.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                        />
                        <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/60 text-white text-[10px]">
                          {m.type === 'video' ? 'Video' : 'Photo'}
                        </div>
                      </div>
                      <div className="p-3">
                        <h5 className="text-xs font-bold text-slate-900 truncate">
                          {m.title}
                        </h5>
                        <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">
                          {m.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Related Verified Publications & Articles */}
            {relatedDrafts.length > 0 && (
              <div className="space-y-3 pt-4">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-800">
                  <FileText className="w-4 h-4 text-sky-600" />
                  <span>Verified Publications & Articles from this Expedition</span>
                </div>

                <div className="space-y-3">
                  {relatedDrafts.map((d) => (
                    <div
                      key={d.id}
                      onClick={() => onNavigate(`/content/${d.id}`)}
                      className="p-4 rounded-2xl bg-white border border-slate-200 hover:border-sky-300 hover:shadow-md cursor-pointer transition flex items-start justify-between gap-4 group"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-sky-100 text-sky-800">
                            {d.contentType}
                          </span>
                          <span className="text-[11px] text-emerald-700 font-medium flex items-center gap-1">
                            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                            Institutional Release
                          </span>
                        </div>
                        <h4 className="text-sm font-bold text-slate-900 group-hover:text-sky-900">
                          {d.title}
                        </h4>
                        <p className="text-xs text-slate-600 line-clamp-2">
                          {d.summary}
                        </p>
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-sky-600 group-hover:translate-x-1 transition shrink-0 mt-2" />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Sidebar: Key Dossier */}
          <div className="lg:col-span-4 space-y-5">
            <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-4 shadow-xs text-xs">
              <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px] pb-2 border-b border-slate-100">
                Expedition Dossier & Metadata
              </h4>

              <div className="space-y-3 text-slate-600">
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase">Expedition Code</span>
                  <span className="font-mono font-bold text-slate-800">{expedition.expeditionNumber}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase">Deployment Year</span>
                  <span className="font-semibold text-slate-800">{expedition.year}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase">Geographic Region</span>
                  <span className="font-semibold text-slate-800">{expedition.region}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase">Primary Operating Base</span>
                  <span className="font-semibold text-slate-800">{expedition.leadStation}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase">Expedition Leader</span>
                  <span className="font-semibold text-slate-800">{expedition.expeditionLeader}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase">Deploying Directorate</span>
                  <span className="font-semibold text-slate-800">NCPOR / Ministry of Earth Sciences</span>
                </div>
              </div>
            </div>

            {/* Verification Guarantee */}
            <div className="rounded-2xl border border-emerald-200 bg-gradient-to-br from-emerald-50/60 to-white p-4 space-y-2 text-xs">
              <div className="flex items-center gap-2 font-bold text-emerald-900">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Verified Expedition Record</span>
              </div>
              <p className="text-slate-600 leading-relaxed text-[11px]">
                All station telemetry, crew rosters, and research milestones are archived in conformity with international polar data standards.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
