import React, { useState } from 'react';
import { store } from '../../services/storage';
import { User, ContentStatus } from '../../types';
import { StatusBadge } from '../../components/common/StatusBadge';
import {
  FileText,
  Filter,
  FileEdit,
  ExternalLink,
  Clock,
  ArrowRight,
  AlertTriangle,
  Upload,
  Calendar,
  Database,
  BarChart3,
  Image as ImageIcon,
  Film,
  Sparkles,
  ChevronRight,
  CheckCircle2,
  XCircle,
  MessageSquare
} from 'lucide-react';

interface MySubmissionsPageProps {
  currentUser: User;
  onNavigate: (route: string) => void;
  mode?: 'content' | 'reviews' | 'resources';
}

export const MySubmissionsPage: React.FC<MySubmissionsPageProps> = ({
  currentUser,
  onNavigate,
  mode = 'content'
}) => {
  const [activeTab, setActiveTab] = useState<'content' | 'reviews' | 'resources'>(mode);
  const [statusFilter, setStatusFilter] = useState<string>('All');

  const allResources = store.getResources();
  const allDrafts = store.getDrafts();

  // Filter items authored/deposited by current user
  const myResources = allResources.filter((r) => r.uploadedBy === currentUser.id);
  const myDrafts = allDrafts.filter((d) => d.contributorId === currentUser.id);

  const filteredDrafts = myDrafts.filter((d) => {
    if (statusFilter === 'All') return true;
    return d.status === statusFilter;
  });

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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-serif">
            {activeTab === 'reviews'
              ? 'Editorial Review Status'
              : activeTab === 'resources'
              ? 'My Preserved Scientific Resources'
              : 'My Outreach Content'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            {activeTab === 'reviews'
              ? 'Track peer-review assessments, reviewer remarks, and publication sign-offs.'
              : activeTab === 'resources'
              ? 'Primary field datasets and reports preserved in the scientific repository.'
              : 'Audience-facing articles and summaries derived from your repository resources.'}
          </p>
        </div>

        <button
          onClick={() => onNavigate('/workspace/upload')}
          className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-sky-800 hover:bg-sky-900 text-white font-bold text-xs shadow-sm transition shrink-0"
        >
          <Upload className="w-3.5 h-3.5" />
          <span>Upload Scientific Resource</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-xl w-fit text-xs font-semibold">
        <button
          onClick={() => setActiveTab('content')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${
            activeTab === 'content'
              ? 'bg-white text-slate-900 shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <FileText className="w-3.5 h-3.5 text-indigo-600" />
          <span>My Content ({myDrafts.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('reviews')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${
            activeTab === 'reviews'
              ? 'bg-white text-slate-900 shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Clock className="w-3.5 h-3.5 text-amber-600" />
          <span>Review Status ({myDrafts.filter((d) => d.status === 'UNDER_REVIEW' || d.status === 'NEEDS_CHANGES').length})</span>
        </button>

        <button
          onClick={() => setActiveTab('resources')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${
            activeTab === 'resources'
              ? 'bg-white text-slate-900 shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Database className="w-3.5 h-3.5 text-sky-600" />
          <span>My Stored Resources ({myResources.length})</span>
        </button>
      </div>

      {/* ======================================================== */}
      {/* 1. MY CONTENT TAB */}
      {/* ======================================================== */}
      {activeTab === 'content' && (
        <div className="space-y-4">
          {/* Filter Bar */}
          <div className="flex items-center justify-between gap-4 text-xs bg-white p-3 rounded-xl border border-slate-200">
            <span className="text-slate-600 font-medium">Filter by Status:</span>
            <div className="flex items-center gap-2 overflow-x-auto">
              {['All', 'DRAFT', 'READY_FOR_EDITING', 'UNDER_REVIEW', 'NEEDS_CHANGES', 'PUBLISHED'].map((st) => (
                <button
                  key={st}
                  onClick={() => setStatusFilter(st)}
                  className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition ${
                    statusFilter === st
                      ? 'bg-slate-900 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {st === 'All' ? 'All Pieces' : st}
                </button>
              ))}
            </div>
          </div>

          {filteredDrafts.length === 0 ? (
            <div className="p-12 text-center bg-white rounded-xl border border-slate-200 text-slate-500 space-y-3">
              <FileText className="w-10 h-10 mx-auto text-slate-300" />
              <div className="font-semibold text-slate-700">No content found matching filter.</div>
              <p className="text-xs max-w-sm mx-auto">
                Open any of your deposited scientific resources and click &ldquo;Generate Outreach Content&rdquo; to create a new derived communication piece.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredDrafts.map((draft) => (
                <div
                  key={draft.id}
                  className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[10px] text-slate-500 font-semibold">{draft.id}</span>
                      <StatusBadge status={draft.status} />
                    </div>

                    <h3 className="font-bold text-slate-900 text-sm leading-snug">{draft.title}</h3>
                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">{draft.summary}</p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                    <div className="text-[11px] text-slate-500">
                      <span>Source: </span>
                      <button
                        onClick={() => onNavigate(`/workspace/repository/${draft.resourceId}`)}
                        className="font-mono font-semibold text-sky-800 hover:underline"
                      >
                        {draft.resourceId}
                      </button>
                    </div>

                    <div className="flex items-center gap-2">
                      {draft.status === 'PUBLISHED' ? (
                        <button
                          onClick={() => onNavigate(`/content/${draft.id}`)}
                          className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs transition"
                        >
                          View Live
                        </button>
                      ) : (
                        <button
                          onClick={() => onNavigate(`/workspace/content/${draft.id}/edit`)}
                          className="px-3 py-1.5 rounded-lg bg-sky-800 hover:bg-sky-900 text-white font-semibold text-xs transition flex items-center gap-1.5"
                        >
                          <FileEdit className="w-3.5 h-3.5" />
                          <span>Edit Draft</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ======================================================== */}
      {/* 2. REVIEW STATUS TAB */}
      {/* ======================================================== */}
      {activeTab === 'reviews' && (
        <div className="space-y-4">
          <div className="bg-amber-50/70 border border-amber-200 rounded-xl p-4 text-xs text-amber-900 leading-relaxed">
            <strong>Editorial Governance:</strong> All outreach articles derived from repository resources undergo human peer-review by the Institutional Editorial Directorate before release to the public portal.
          </div>

          <div className="space-y-3">
            {myDrafts
              .filter((d) => d.status !== 'DRAFT')
              .map((draft) => (
                <div
                  key={draft.id}
                  className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-4"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[10px] text-slate-500 font-bold">{draft.id}</span>
                        <span className="text-slate-300">·</span>
                        <span className="text-xs font-semibold text-slate-700">{draft.contentType}</span>
                      </div>
                      <h3 className="font-bold text-slate-900 text-base mt-0.5">{draft.title}</h3>
                    </div>
                    <StatusBadge status={draft.status} />
                  </div>

                  {/* Reviewer Feedback if NEEDS_CHANGES or REJECTED */}
                  {draft.reviewerComments && (
                    <div className="p-3.5 rounded-lg bg-rose-50 border border-rose-200 text-xs text-rose-900 space-y-1">
                      <div className="font-bold flex items-center gap-1.5 text-rose-800">
                        <MessageSquare className="w-3.5 h-3.5" />
                        <span>Administrator Reviewer Feedback ({draft.reviewerName || 'Editorial Board'}):</span>
                      </div>
                      <p className="italic text-rose-800 leading-relaxed">&ldquo;{draft.reviewerComments}&rdquo;</p>
                    </div>
                  )}

                  <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500 pt-1">
                    <div className="flex items-center gap-3">
                      <span>Source: <strong className="font-mono text-sky-900">{draft.resourceId}</strong></span>
                      <span>·</span>
                      <span>Target: {draft.targetAudience}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      {draft.status === 'NEEDS_CHANGES' && (
                        <button
                          onClick={() => onNavigate(`/workspace/content/${draft.id}/edit`)}
                          className="px-4 py-2 rounded-lg bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs shadow-xs transition flex items-center gap-1.5"
                        >
                          <FileEdit className="w-3.5 h-3.5" />
                          <span>Address Feedback & Edit</span>
                        </button>
                      )}

                      {draft.status === 'UNDER_REVIEW' && (
                        <span className="text-amber-700 font-medium italic flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" />
                          <span>Pending Administrator Verification</span>
                        </span>
                      )}

                      {draft.status === 'PUBLISHED' && (
                        <button
                          onClick={() => onNavigate(`/content/${draft.id}`)}
                          className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs transition"
                        >
                          View on Public Portal
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* 3. MY STORED RESOURCES TAB */}
      {/* ======================================================== */}
      {activeTab === 'resources' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {myResources.map((res) => (
              <div
                key={res.id}
                className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between space-y-4"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] text-sky-900 font-bold bg-sky-50 px-2 py-0.5 rounded border border-sky-100">
                      {res.id}
                    </span>
                    <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">
                      {res.status}
                    </span>
                  </div>

                  <h3 className="font-bold text-slate-900 text-sm leading-snug">{res.title}</h3>
                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">{res.description}</p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <div className="flex items-center gap-2">
                    {getFileIcon(res.type)}
                    <span>{res.files.length} attached file(s)</span>
                  </div>

                  <button
                    onClick={() => onNavigate(`/workspace/repository/${res.id}`)}
                    className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs transition flex items-center gap-1"
                  >
                    <span>Open Resource</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
