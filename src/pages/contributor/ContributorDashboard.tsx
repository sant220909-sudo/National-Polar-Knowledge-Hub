import React, { useState } from 'react';
import { store } from '../../services/storage';
import { User, ContentDraft, Resource } from '../../types';
import { StatusBadge } from '../../components/common/StatusBadge';
import { ScientistMissionLifecycle } from '../../components/common/ScientistMissionLifecycle';
import {
  Upload,
  FileEdit,
  Clock,
  CheckCircle2,
  AlertTriangle,
  FileText,
  ArrowRight,
  Sparkles,
  ExternalLink,
  PlusCircle,
  Layers,
  Calendar,
  MapPin,
  Database,
  BarChart3,
  Film,
  Image as ImageIcon,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';

interface ContributorDashboardProps {
  currentUser: User;
  onNavigate: (route: string) => void;
}

export const ContributorDashboard: React.FC<ContributorDashboardProps> = ({
  currentUser,
  onNavigate
}) => {
  const [activeTab, setActiveTab] = useState<'resources' | 'drafts'>('resources');

  const allResources = store.getResources();
  const allDrafts = store.getDrafts();

  // Metrics
  const myResources = allResources.filter((r) => r.uploadedBy === currentUser.id);
  const myDrafts = allDrafts.filter((d) => d.contributorId === currentUser.id);

  const underReviewCount = myDrafts.filter((d) => d.status === 'UNDER_REVIEW').length;
  const publishedCount = myDrafts.filter((d) => d.status === 'PUBLISHED').length;
  const editingCount = myDrafts.filter((d) => d.status === 'DRAFT' || d.status === 'READY_FOR_EDITING').length;
  const needsChangesCount = myDrafts.filter((d) => d.status === 'NEEDS_CHANGES').length;

  const getFileIcon = (type: string) => {
    switch (type.toUpperCase()) {
      case 'DOCUMENT':
        return <FileText className="w-4 h-4 text-rose-600" />;
      case 'DATASET':
        return <BarChart3 className="w-4 h-4 text-emerald-600" />;
      case 'IMAGE':
        return <ImageIcon className="w-4 h-4 text-sky-600" />;
      case 'VIDEO':
        return <Film className="w-4 h-4 text-purple-600" />;
      default:
        return <FileText className="w-4 h-4 text-slate-600" />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 rounded-2xl p-6 sm:p-8 text-white border border-slate-800 shadow-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-sky-500/20 text-sky-300 text-[11px] font-semibold border border-sky-400/30">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
            <span>Authorized Research Workspace</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
            My Research Workspace
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
            Welcome, <strong>{currentUser.name}</strong> ({currentUser.department}). Preserving original polar research records in the repository and creating audience-ready outreach content.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => onNavigate('/workspace/upload')}
            className="flex items-center gap-2 px-5 py-3 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs shadow-md transition active:scale-95"
          >
            <Upload className="w-4 h-4" />
            <span>Upload Scientific Resource</span>
          </button>
        </div>
      </div>

      {/* Mission Lifecycle: Expedition Phase Progression & Milestones */}
      <ScientistMissionLifecycle
        userId={currentUser.id}
        isEditable={true}
        onNavigateExpedition={(expId) => onNavigate(`/expeditions/${expId}`)}
      />

      {/* 5-Step Workflow Principle Banner */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-sky-600" />
            <span>Institutional Lifecycle: Repository to Public Knowledge</span>
          </span>
          <span className="text-[11px] text-sky-800 font-serif italic hidden sm:inline">
            “AI assists. Experts validate. The public learns.”
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 text-xs">
          <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
            <div className="font-bold text-sky-700 text-[11px]">1. Upload Resource</div>
            <p className="text-[10px] text-slate-500 mt-0.5">Attach documents, photos, datasets, or video</p>
          </div>
          <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
            <div className="font-bold text-sky-700 text-[11px]">2. Store in Repository</div>
            <p className="text-[10px] text-slate-500 mt-0.5">Preserved safely as permanent source resource</p>
          </div>
          <div className="p-2.5 rounded-xl bg-sky-50 border border-sky-200">
            <div className="font-bold text-sky-900 text-[11px]">3. Optional AI Content</div>
            <p className="text-[10px] text-sky-700 mt-0.5">Choose to generate derived outreach piece</p>
          </div>
          <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
            <div className="font-bold text-slate-700 text-[11px]">4. Contributor Edits</div>
            <p className="text-[10px] text-slate-500 mt-0.5">Refine AI draft & submit for admin review</p>
          </div>
          <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
            <div className="font-bold text-emerald-700 text-[11px]">5. Admin Validation</div>
            <p className="text-[10px] text-slate-500 mt-0.5">Approved & published to public portal</p>
          </div>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
        <div
          onClick={() => setActiveTab('resources')}
          className={`p-4 rounded-xl border cursor-pointer transition shadow-xs ${
            activeTab === 'resources'
              ? 'bg-sky-50/70 border-sky-400 ring-1 ring-sky-400'
              : 'bg-white border-slate-200 hover:border-slate-300'
          }`}
        >
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="font-semibold text-[11px] uppercase tracking-wider">My Stored Resources</span>
            <Database className="w-4 h-4 text-sky-600" />
          </div>
          <div className="text-2xl font-bold text-slate-900">{myResources.length || allResources.length}</div>
          <div className="text-[10px] text-slate-400 mt-0.5">Preserved in repository</div>
        </div>

        <div
          onClick={() => setActiveTab('drafts')}
          className={`p-4 rounded-xl border cursor-pointer transition shadow-xs ${
            activeTab === 'drafts'
              ? 'bg-sky-50/70 border-sky-400 ring-1 ring-sky-400'
              : 'bg-white border-slate-200 hover:border-slate-300'
          }`}
        >
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="font-semibold text-[11px] uppercase tracking-wider">Editing Drafts</span>
            <FileEdit className="w-4 h-4 text-slate-600" />
          </div>
          <div className="text-2xl font-bold text-slate-900">{editingCount}</div>
          <div className="text-[10px] text-slate-400 mt-0.5">Derived outreach drafts</div>
        </div>

        <div
          onClick={() => setActiveTab('drafts')}
          className="p-4 rounded-xl border border-slate-200 bg-white hover:border-amber-400 cursor-pointer transition shadow-xs"
        >
          <div className="flex items-center justify-between text-amber-700 mb-1">
            <span className="font-semibold text-[11px] uppercase tracking-wider">Under Admin Review</span>
            <Clock className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-2xl font-bold text-slate-900">{underReviewCount}</div>
          <div className="text-[10px] text-amber-600 mt-0.5">Awaiting sign-off</div>
        </div>

        <div
          onClick={() => setActiveTab('drafts')}
          className="p-4 rounded-xl border border-slate-200 bg-white hover:border-emerald-400 cursor-pointer transition shadow-xs"
        >
          <div className="flex items-center justify-between text-emerald-700 mb-1">
            <span className="font-semibold text-[11px] uppercase tracking-wider">Published Content</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-bold text-slate-900">{publishedCount}</div>
          <div className="text-[10px] text-emerald-600 mt-0.5">Live on public portal</div>
        </div>
      </div>

      {/* Main Tabbed Content Area */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-6">
        {/* Tab Headers */}
        <div className="flex items-center justify-between border-b border-slate-200 pb-3">
          <div className="flex items-center gap-3 text-xs">
            <button
              onClick={() => setActiveTab('resources')}
              className={`pb-2 font-semibold border-b-2 transition ${
                activeTab === 'resources'
                  ? 'border-sky-600 text-sky-950 font-bold'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              Preserved Scientific Resources ({allResources.length})
            </button>
            <button
              onClick={() => setActiveTab('drafts')}
              className={`pb-2 font-semibold border-b-2 transition ${
                activeTab === 'drafts'
                  ? 'border-sky-600 text-sky-950 font-bold'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              Derived Outreach Content Drafts ({allDrafts.length})
            </button>
          </div>

          {activeTab === 'resources' ? (
            <button
              onClick={() => onNavigate('/contributor/upload')}
              className="text-xs font-semibold text-sky-700 hover:text-sky-900 transition flex items-center gap-1"
            >
              <span>+ Upload Scientific Resource</span>
            </button>
          ) : (
            <button
              onClick={() => onNavigate('/contributor/resources')}
              className="text-xs font-semibold text-sky-700 hover:text-sky-900 transition flex items-center gap-1"
            >
              <span>View All Submissions</span>
            </button>
          )}
        </div>

        {/* TAB 1: SCIENTIFIC RESOURCES */}
        {activeTab === 'resources' && (
          <div className="space-y-3">
            <div className="text-xs text-slate-500 mb-2">
              Original research materials stored safely in the repository. Select any resource to view preserved files or generate audience-ready content.
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {allResources.map((res) => {
                const derivedCount = store.getDraftsByResourceId(res.id).length;
                return (
                  <div
                    key={res.id}
                    onClick={() => onNavigate(`/repository/${res.id}`)}
                    className="p-5 rounded-xl border border-slate-200 hover:border-sky-300 hover:shadow-xs transition cursor-pointer bg-white flex flex-col justify-between group space-y-3 text-xs"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-[11px] font-bold text-sky-900 bg-sky-50 px-2 py-0.5 rounded border border-sky-200">
                          {res.id}
                        </span>
                        <div className="flex items-center gap-1 text-[11px] font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                          <span>{res.status}</span>
                        </div>
                      </div>

                      <h3 className="font-bold text-sm text-slate-900 group-hover:text-sky-950 transition line-clamp-2">
                        {res.title}
                      </h3>

                      <p className="text-slate-500 line-clamp-2 leading-relaxed">
                        {res.description}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-slate-500 text-[11px]">
                      <div className="flex items-center gap-3">
                        <span className="flex items-center gap-1 font-medium text-slate-700">
                          {getFileIcon(res.type)}
                          <span>{res.files.length} file(s)</span>
                        </span>
                        <span>·</span>
                        <span>{res.region} ({res.year})</span>
                      </div>

                      <div className="flex items-center gap-1 text-sky-700 font-semibold group-hover:translate-x-0.5 transition">
                        <span>{derivedCount > 0 ? `${derivedCount} content piece(s)` : 'Open Resource'}</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 2: DERIVED OUTREACH CONTENT DRAFTS */}
        {activeTab === 'drafts' && (
          <div className="space-y-3">
            <div className="text-xs text-slate-500 mb-2">
              Audience-facing communication drafts generated from repository resources.
            </div>

            <div className="space-y-3">
              {allDrafts.map((draft) => (
                <div
                  key={draft.id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl border border-slate-200 hover:border-slate-300 bg-white transition gap-4 text-xs"
                >
                  <div className="space-y-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[11px] text-slate-500">{draft.id}</span>
                      <span className="text-slate-300">·</span>
                      <span className="font-semibold text-sky-800">{draft.contentType}</span>
                      <span className="text-slate-300">·</span>
                      <StatusBadge status={draft.status} size="sm" />
                      <span className="text-slate-300">·</span>
                      <span className="text-[11px] text-slate-500 truncate">
                        Source: <strong>{draft.resourceId}</strong>
                      </span>
                    </div>

                    <h3 className="font-bold text-slate-900 text-sm truncate">
                      {draft.title}
                    </h3>

                    <p className="text-[11px] text-slate-500 line-clamp-1">
                      {draft.summary}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => onNavigate(`/workspace/repository/${draft.resourceId}`)}
                      className="px-2.5 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-600 transition"
                      title="View original preserved source resource"
                    >
                      <span>Source Resource</span>
                    </button>

                    {draft.status === 'PUBLISHED' ? (
                      <button
                        onClick={() => onNavigate(`/content/${draft.id}`)}
                        className="px-3 py-1.5 rounded-lg bg-sky-50 text-sky-700 hover:bg-sky-100 border border-sky-200 transition font-medium flex items-center gap-1"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>View Live</span>
                      </button>
                    ) : (
                      <button
                        onClick={() => onNavigate(`/workspace/content/${draft.id}/edit`)}
                        className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white transition font-medium flex items-center gap-1"
                      >
                        <span>Edit Draft</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
