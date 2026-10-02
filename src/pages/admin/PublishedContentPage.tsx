import React, { useState } from 'react';
import { store } from '../../services/storage';
import { ContentDraft, User } from '../../types';
import { StatusBadge } from '../../components/common/StatusBadge';
import {
  CheckCircle2,
  ExternalLink,
  RotateCcw,
  Search,
  ShieldCheck,
  Calendar,
  FileText
} from 'lucide-react';

interface PublishedContentPageProps {
  currentUser: User;
  onNavigate: (route: string) => void;
}

export const PublishedContentPage: React.FC<PublishedContentPageProps> = ({
  currentUser,
  onNavigate
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const drafts = store.getDrafts();
  const publishedDrafts = drafts.filter((d) => d.status === 'PUBLISHED');

  const filtered = publishedDrafts.filter(
    (d) =>
      !searchTerm ||
      d.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.contributorName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleUnpublish = (draftId: string) => {
    store.unpublishDraft(draftId);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 uppercase tracking-wider mb-1">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Public Repository Catalog</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Published Scientific Content
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Active verified publications currently accessible on the public Knowledge Repository.
          </p>
        </div>

        <div className="relative">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search published articles..."
            className="pl-3 pr-8 py-2 rounded-xl border border-slate-300 text-xs text-slate-800 placeholder-slate-400 focus:border-sky-500"
          />
        </div>
      </div>

      {/* Grid of Published Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((draft) => (
          <div
            key={draft.id}
            className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs flex flex-col justify-between space-y-4 hover:border-emerald-300 transition"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200">
                    {draft.contentType}
                  </span>
                  <span className="text-[10px] font-mono font-bold text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded">
                    {draft.version || 'v1'}
                  </span>
                </div>
                <StatusBadge status="PUBLISHED" size="sm" />
              </div>

              <h3 className="text-base font-bold text-slate-900 leading-snug">
                {draft.title}
              </h3>

              <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                {draft.summary}
              </p>

              {/* Source Resource Provenance */}
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-[11px] space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400 font-semibold uppercase text-[9px] tracking-wider">Source Resource</span>
                  <button
                    onClick={() => onNavigate(`/workspace/repository/${draft.resourceId}`)}
                    className="font-mono text-sky-700 hover:text-sky-900 font-bold hover:underline flex items-center gap-1"
                  >
                    <span>{draft.resourceId}</span>
                    <ExternalLink className="w-2.5 h-2.5" />
                  </button>
                </div>
                <div className="text-slate-700 font-medium truncate">
                  {draft.resourceTitle || 'Expedition Scientific Record'}
                </div>
              </div>

              {/* Author, Approved By, Destination */}
              <div className="pt-2 border-t border-slate-100 text-[11px] text-slate-600 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Author / Scientist:</span>
                  <strong className="text-slate-800">{draft.contributorName}</strong>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Approved By:</span>
                  <strong className="text-slate-800">{draft.approvedBy || draft.reviewerName || 'Administrator'}</strong>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Publication Date:</span>
                  <strong className="text-slate-800">
                    {new Date(draft.publishedAt || draft.updatedAt).toLocaleDateString()}
                  </strong>
                </div>
                <div className="flex items-center justify-between pt-1 border-t border-slate-100/60">
                  <span className="text-slate-400">Destination:</span>
                  <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 text-[10px]">
                    {draft.publicationDestination || (draft.contentType === 'Media Caption' ? 'Media Catalogue' : 'Portal (Research)')}
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
              {draft.contentType === 'Media Caption' ? (
                <button
                  onClick={() => onNavigate('/media')}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 text-white text-xs font-semibold hover:bg-sky-900 transition"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>View in Media Gallery</span>
                </button>
              ) : (
                <button
                  onClick={() => onNavigate(`/content/${draft.id}`)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 text-white text-xs font-semibold hover:bg-sky-900 transition"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>View Public Page</span>
                </button>
              )}

              <button
                onClick={() => handleUnpublish(draft.id)}
                className="text-xs text-rose-600 hover:text-rose-800 font-medium px-2 py-1 rounded-lg hover:bg-rose-50 transition"
              >
                Unpublish
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
