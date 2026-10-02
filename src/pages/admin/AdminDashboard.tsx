import React from 'react';
import { store } from '../../services/storage';
import { User, ContentDraft } from '../../types';
import { StatusBadge } from '../../components/common/StatusBadge';
import {
  Shield,
  Database,
  Layers,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Users,
  FileEdit,
  ArrowRight,
  TrendingUp,
  Activity,
  Sparkles,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  Send
} from 'lucide-react';

interface AdminDashboardProps {
  currentUser: User;
  onNavigate: (route: string) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  currentUser,
  onNavigate
}) => {
  const users = store.getUsers();
  const resources = store.getResources();
  const drafts = store.getDrafts();
  const activities = store.getActivities();

  // Metrics
  const totalContributors = users.filter((u) => u.role === 'CONTENT_CONTRIBUTOR').length;
  const totalScientificResources = resources.length;
  const pendingReviews = drafts.filter((d) => d.status === 'UNDER_REVIEW').length;
  const publishedContent = drafts.filter((d) => d.status === 'PUBLISHED').length;
  const draftsCount = drafts.filter((d) => d.status === 'DRAFT' || d.status === 'READY_FOR_EDITING').length;
  const needsChangesCount = drafts.filter((d) => d.status === 'NEEDS_CHANGES').length;

  const pendingDrafts = drafts.filter((d) => d.status === 'UNDER_REVIEW');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-slate-950 via-blue-950 to-slate-900 rounded-2xl p-6 sm:p-8 text-white border border-slate-800 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-sky-500/20 text-sky-300 text-[11px] font-semibold border border-sky-400/30">
            <Shield className="w-3.5 h-3.5" />
            <span>National Polar Directorate • Editorial Board</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Administrator Portal: {currentUser.name}
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl leading-relaxed">
            Preserve scientific repository resources, manage authorized contributors, review AI-synthesized public outreach drafts, and authorize open dissemination under NCPOR scientific standards.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <button
            onClick={() => onNavigate('/admin/repository')}
            className="flex items-center gap-2 px-4 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs border border-slate-700 transition"
          >
            <Database className="w-4 h-4 text-sky-400" />
            <span>Scientific Repository</span>
          </button>

          <button
            onClick={() => onNavigate('/admin/publishing')}
            className="flex items-center gap-2 px-4 py-3 rounded-xl bg-indigo-700 hover:bg-indigo-600 text-white font-semibold text-xs border border-indigo-600 transition shadow-sm"
          >
            <Send className="w-4 h-4" />
            <span>Publishing Center</span>
          </button>

          <button
            onClick={() => onNavigate('/admin/reviews')}
            className="flex items-center gap-2 px-5 py-3 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs shadow-md transition active:scale-95"
          >
            <Clock className="w-4 h-4" />
            <span>Review Queue ({pendingReviews})</span>
          </button>
        </div>
      </div>

      {/* Operational Principle Banner */}
      <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between gap-4 text-xs text-slate-300">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-sky-500/20 text-sky-400 shrink-0">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div>
            <span className="font-bold text-white">Institutional Dissemination Protocol: </span>
            <span className="text-sky-200">
              “AI assists. Experts validate. The public learns.” Original resources are preserved first. Derived outreach content requires administrator sign-off.
            </span>
          </div>
        </div>
        <span className="text-[11px] font-mono text-slate-400 shrink-0 hidden md:inline">
          NCPOR Verified
        </span>
      </div>

      {/* Statistics Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
        <div
          onClick={() => onNavigate('/admin/repository')}
          className="bg-white p-5 rounded-2xl border border-slate-200 hover:border-sky-300 cursor-pointer transition shadow-xs"
        >
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="font-semibold text-[11px] uppercase tracking-wider">Scientific Resources</span>
            <Database className="w-4 h-4 text-sky-600" />
          </div>
          <div className="text-2xl font-bold text-slate-900">{totalScientificResources}</div>
          <div className="text-[10px] text-slate-400 mt-1">Preserved in repository</div>
        </div>

        <div
          onClick={() => onNavigate('/admin/reviews')}
          className="bg-white p-5 rounded-2xl border border-amber-300 hover:border-amber-400 cursor-pointer transition shadow-xs bg-amber-50/20"
        >
          <div className="flex items-center justify-between text-amber-700 mb-1">
            <span className="font-semibold text-[11px] uppercase tracking-wider">Pending Reviews</span>
            <Clock className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-2xl font-bold text-amber-900">{pendingReviews}</div>
          <div className="text-[10px] text-amber-600 mt-1 font-semibold">Action required</div>
        </div>

        <div
          onClick={() => onNavigate('/admin/published')}
          className="bg-white p-5 rounded-2xl border border-emerald-200 hover:border-emerald-300 cursor-pointer transition shadow-xs bg-emerald-50/20"
        >
          <div className="flex items-center justify-between text-emerald-700 mb-1">
            <span className="font-semibold text-[11px] uppercase tracking-wider">Published Content</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-bold text-emerald-900">{publishedContent}</div>
          <div className="text-[10px] text-emerald-600 mt-1">Live in public portal</div>
        </div>

        <div
          onClick={() => onNavigate('/admin/contributors')}
          className="bg-white p-5 rounded-2xl border border-slate-200 hover:border-slate-300 cursor-pointer transition shadow-xs"
        >
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="font-semibold text-[11px] uppercase tracking-wider">Contributors</span>
            <Users className="w-4 h-4 text-slate-600" />
          </div>
          <div className="text-2xl font-bold text-slate-900">{totalContributors}</div>
          <div className="text-[10px] text-slate-400 mt-1">Active researchers</div>
        </div>
      </div>

      {/* Main Review Queue Highlight */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-amber-600" />
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
              Priority Review Queue ({pendingDrafts.length})
            </h2>
          </div>
          <button
            onClick={() => onNavigate('/admin/reviews')}
            className="text-xs font-semibold text-sky-700 hover:text-sky-900 transition flex items-center gap-1"
          >
            <span>View Full Queue</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {pendingDrafts.length === 0 ? (
          <div className="text-center py-10 text-slate-400 text-xs">
            Review queue is clear. All submitted drafts have been processed.
          </div>
        ) : (
          <div className="space-y-3">
            {pendingDrafts.map((draft) => (
              <div
                key={draft.id}
                className="p-4 rounded-xl border border-slate-200 hover:border-sky-300 transition flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs"
              >
                <div className="space-y-1 max-w-3xl">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-mono text-[11px] font-bold text-slate-600">{draft.id}</span>
                    <span className="text-slate-300">·</span>
                    <span className="font-semibold text-sky-800">{draft.contentType}</span>
                    <span className="text-slate-300">·</span>
                    <StatusBadge status={draft.status} size="sm" />
                    <span className="text-slate-300">·</span>
                    <button
                      onClick={() => onNavigate(`/repository/${draft.resourceId}`)}
                      className="text-[11px] text-slate-500 hover:text-sky-800 underline truncate"
                    >
                      Source: {draft.resourceId}
                    </button>
                  </div>

                  <h3 className="font-bold text-sm text-slate-900">
                    {draft.title}
                  </h3>

                  <p className="text-[11px] text-slate-600 line-clamp-1">
                    {draft.summary}
                  </p>

                  <div className="text-[11px] text-slate-400 flex items-center gap-3 pt-0.5">
                    <span>Contributor: {draft.contributorName}</span>
                    <span>· Submitted: {new Date(draft.updatedAt).toLocaleDateString()}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => onNavigate(`/repository/${draft.resourceId}`)}
                    className="px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-700 transition"
                  >
                    <span>Inspect Source</span>
                  </button>

                  <button
                    onClick={() => onNavigate(`/admin/reviews/${draft.id}`)}
                    className="px-4 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-medium transition flex items-center gap-1 shadow-xs"
                  >
                    <span>Review & Validate</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Activity Log */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-sky-600" />
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
              Recent Repository & Review Activity
            </h2>
          </div>
        </div>

        <div className="space-y-3">
          {activities.slice(0, 5).map((act) => (
            <div
              key={act.id}
              className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs"
            >
              <div className="w-7 h-7 rounded-lg bg-sky-100 text-sky-800 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                {act.userRole === 'ADMINISTRATOR' ? 'AD' : 'CR'}
              </div>
              <div className="space-y-0.5 min-w-0 flex-1">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-slate-900">{act.userName}</span>
                  <span className="text-[10px] text-slate-400 font-mono">
                    {new Date(act.timestamp).toLocaleDateString()}
                  </span>
                </div>
                <div className="text-[11px] text-slate-700 font-medium truncate">
                  {act.action.replace(/_/g, ' ')}: {act.targetTitle}
                </div>
                {act.details && (
                  <p className="text-[11px] text-slate-500 italic">
                    "{act.details}"
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
