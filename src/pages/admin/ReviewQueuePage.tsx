import React, { useState } from 'react';
import { store } from '../../services/storage';
import { User, ContentDraft } from '../../types';
import { StatusBadge } from '../../components/common/StatusBadge';
import {
  Clock,
  CheckCircle2,
  AlertTriangle,
  FileText,
  ArrowRight,
  Filter,
  Search,
  ExternalLink,
  ShieldCheck
} from 'lucide-react';

interface ReviewQueuePageProps {
  currentUser: User;
  onNavigate: (route: string) => void;
}

export const ReviewQueuePage: React.FC<ReviewQueuePageProps> = ({
  currentUser,
  onNavigate
}) => {
  const [filterStatus, setFilterStatus] = useState<string>('UNDER_REVIEW');
  const [searchTerm, setSearchTerm] = useState('');

  const allDrafts = store.getDrafts();

  const filteredDrafts = allDrafts.filter((d) => {
    if (filterStatus !== 'ALL' && d.status !== filterStatus) return false;
    if (
      searchTerm &&
      !d.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !d.contributorName.toLowerCase().includes(searchTerm.toLowerCase())
    ) {
      return false;
    }
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-700 uppercase tracking-wider mb-1">
            <Clock className="w-4 h-4 text-amber-600" />
            <span>Administrator Editorial Queue</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Review & Publication Queue
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Audit submitted drafts against primary field datasets and approve for public repository dissemination.
          </p>
        </div>
      </div>

      {/* Filter Tabs & Search */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          <button
            onClick={() => setFilterStatus('UNDER_REVIEW')}
            className={`px-3.5 py-1.5 rounded-xl font-bold transition flex items-center gap-1.5 ${
              filterStatus === 'UNDER_REVIEW'
                ? 'bg-amber-500 text-slate-950 shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            <span>Under Review ({allDrafts.filter((d) => d.status === 'UNDER_REVIEW').length})</span>
          </button>

          <button
            onClick={() => setFilterStatus('REQUIRES_REAPPROVAL')}
            className={`px-3.5 py-1.5 rounded-xl font-bold transition flex items-center gap-1.5 ${
              filterStatus === 'REQUIRES_REAPPROVAL'
                ? 'bg-amber-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>Requires Re-approval ({allDrafts.filter((d) => d.status === 'REQUIRES_REAPPROVAL').length})</span>
          </button>

          <button
            onClick={() => setFilterStatus('NEEDS_CHANGES')}
            className={`px-3.5 py-1.5 rounded-xl font-bold transition flex items-center gap-1.5 ${
              filterStatus === 'NEEDS_CHANGES'
                ? 'bg-rose-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>Needs Changes ({allDrafts.filter((d) => d.status === 'NEEDS_CHANGES').length})</span>
          </button>

          <button
            onClick={() => setFilterStatus('READY_TO_PUBLISH')}
            className={`px-3.5 py-1.5 rounded-xl font-bold transition flex items-center gap-1.5 ${
              filterStatus === 'READY_TO_PUBLISH'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Ready to Publish ({allDrafts.filter((d) => d.status === 'READY_TO_PUBLISH').length})</span>
          </button>

          <button
            onClick={() => setFilterStatus('PUBLISHED')}
            className={`px-3.5 py-1.5 rounded-xl font-bold transition flex items-center gap-1.5 ${
              filterStatus === 'PUBLISHED'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Published ({allDrafts.filter((d) => d.status === 'PUBLISHED').length})</span>
          </button>

          <button
            onClick={() => setFilterStatus('ALL')}
            className={`px-3.5 py-1.5 rounded-xl font-bold transition ${
              filterStatus === 'ALL'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            All Submissions
          </button>
        </div>

        <div className="relative">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by title or author..."
            className="pl-3 pr-8 py-1.5 rounded-xl border border-slate-300 text-xs text-slate-800 placeholder-slate-400 focus:border-sky-500"
          />
        </div>
      </div>

      {/* Submissions Table / Cards */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 border-b border-slate-100 uppercase tracking-wider text-[10px] font-bold">
              <tr>
                <th className="px-6 py-4">Content / Title</th>
                <th className="px-6 py-4">Contributor</th>
                <th className="px-6 py-4">Format</th>
                <th className="px-6 py-4">Last Modified</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredDrafts.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-slate-400">
                    No items found matching the selected filter criteria.
                  </td>
                </tr>
              ) : (
                filteredDrafts.map((draft) => (
                  <tr key={draft.id} className="hover:bg-slate-50/80 transition">
                    <td className="px-6 py-4 max-w-sm">
                      <div className="font-bold text-slate-900 line-clamp-1 text-xs sm:text-sm">
                        {draft.title}
                      </div>
                      <div className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                        {draft.summary}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="font-semibold text-slate-800">{draft.contributorName}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="font-medium text-slate-700 bg-slate-100 px-2.5 py-1 rounded-md text-[11px]">
                        {draft.contentType}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-slate-500 font-mono text-[11px]">
                      {new Date(draft.updatedAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <StatusBadge status={draft.status} />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      {draft.status === 'PUBLISHED' ? (
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => onNavigate(`/content/${draft.id}`)}
                            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100 font-semibold transition"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                            <span>View Live</span>
                          </button>
                          <button
                            onClick={() => onNavigate(`/admin/reviews/${draft.id}`)}
                            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200 font-semibold transition"
                          >
                            <span>Inspect</span>
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => onNavigate(`/admin/reviews/${draft.id}`)}
                          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-900 hover:bg-amber-600 text-white font-bold text-xs transition shadow-2xs"
                        >
                          <span>Review Draft</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
