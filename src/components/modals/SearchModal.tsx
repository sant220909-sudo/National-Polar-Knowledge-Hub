import React, { useState, useEffect, useRef } from 'react';
import { store } from '../../services/storage';
import { Resource, ContentDraft, Expedition, MediaItem } from '../../types';
import {
  Search,
  X,
  Compass,
  FileText,
  BookOpen,
  Image as ImageIcon,
  Video,
  Database,
  ArrowRight,
  ShieldCheck,
  Tag,
  BarChart3,
  Film
} from 'lucide-react';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (route: string) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onNavigate
}) => {
  const [query, setQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<'all' | 'published' | 'repository' | 'expeditions' | 'media'>('all');
  const inputRef = useRef<HTMLInputElement>(null);

  const currentUser = store.getCurrentUser();
  const isStaff = currentUser.role === 'ADMINISTRATOR' || currentUser.role === 'CONTENT_CONTRIBUTOR';

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const publishedDrafts = store.getDrafts().filter((d) => d.status === 'PUBLISHED');
  const expeditions = store.getExpeditions();
  const mediaItems = store.getMedia();
  const allResources = store.getResources();

  const cleanQ = query.trim().toLowerCase();

  // Search drafts
  const matchedDrafts = publishedDrafts.filter(
    (d) =>
      cleanQ === '' ||
      d.title.toLowerCase().includes(cleanQ) ||
      d.summary.toLowerCase().includes(cleanQ) ||
      d.keywords.some((k) => k.toLowerCase().includes(cleanQ)) ||
      d.contributorName.toLowerCase().includes(cleanQ)
  );

  // Search repository resources (staff only)
  const matchedResources = allResources.filter(
    (r) =>
      cleanQ === '' ||
      r.id.toLowerCase().includes(cleanQ) ||
      r.title.toLowerCase().includes(cleanQ) ||
      r.description.toLowerCase().includes(cleanQ) ||
      r.topic.toLowerCase().includes(cleanQ) ||
      r.researchers.some((res) => res.toLowerCase().includes(cleanQ)) ||
      r.keywords.some((k) => k.toLowerCase().includes(cleanQ))
  );

  // Search expeditions
  const matchedExpeditions = expeditions.filter(
    (e) =>
      cleanQ === '' ||
      e.name.toLowerCase().includes(cleanQ) ||
      e.region.toLowerCase().includes(cleanQ) ||
      e.leadStation.toLowerCase().includes(cleanQ) ||
      e.overview.toLowerCase().includes(cleanQ)
  );

  // Search media
  const matchedMedia = mediaItems.filter(
    (m) =>
      cleanQ === '' ||
      m.title.toLowerCase().includes(cleanQ) ||
      m.region.toLowerCase().includes(cleanQ) ||
      (m.caption && m.caption.toLowerCase().includes(cleanQ))
  );

  const handleSelect = (route: string) => {
    onNavigate(route);
    onClose();
  };

  const totalMatches =
    matchedDrafts.length +
    matchedExpeditions.length +
    matchedMedia.length +
    (isStaff ? matchedResources.length : 0);

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-10 sm:pt-16 px-3 sm:px-4 bg-slate-950/70 backdrop-blur-xs animate-fadeIn">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[88vh]">
        {/* Search Input Bar */}
        <div className="p-3 sm:p-4 border-b border-slate-200 flex items-center gap-2 sm:gap-3 bg-white">
          <Search className="w-5 h-5 text-slate-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={
              isStaff
                ? 'Search repository, datasets, publications, expeditions...'
                : 'Search articles, expeditions, media... (Ctrl+K)'
            }
            className="w-full bg-transparent text-sm sm:text-base text-slate-900 placeholder-slate-400 focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 hover:bg-slate-100 rounded-md text-slate-400 hover:text-slate-600 transition"
              title="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="p-1.5 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition shrink-0"
            title="Close (Esc)"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter Tabs (single row, compact) */}
        <div className="px-3 sm:px-4 py-2 bg-slate-50 border-b border-slate-200 flex items-center gap-1.5 overflow-x-auto text-xs whitespace-nowrap">
          {[
            { key: 'all', label: 'All', count: totalMatches, className: '' } as const,
            { key: 'published', label: 'Publications', count: matchedDrafts.length, className: '' } as const,
            ...(isStaff
              ? [{ key: 'repository', label: 'Repository', count: matchedResources.length, className: '' } as const]
              : []),
            { key: 'expeditions', label: 'Expeditions', count: matchedExpeditions.length, className: '' } as const,
            { key: 'media', label: 'Media', count: matchedMedia.length, className: '' } as const
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveFilter(tab.key)}
              className={`px-2.5 py-1 rounded-md font-medium transition flex items-center gap-1.5 shrink-0 ${
                activeFilter === tab.key
                  ? 'bg-slate-900 text-white'
                  : 'text-slate-600 hover:bg-slate-200/70'
              }`}
            >
              <span>{tab.label}</span>
              <span
                className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                  activeFilter === tab.key ? 'bg-white/15 text-slate-100' : 'bg-slate-200 text-slate-600'
                }`}
              >
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* Search Results List */}
        <div className="p-3 sm:p-4 overflow-y-auto space-y-4 flex-1 text-xs">
          {/* REPOSITORY RESOURCES (Staff / Admin / Contributor) */}
          {(activeFilter === 'all' || activeFilter === 'repository') && isStaff && matchedResources.length > 0 && (
            <div className="space-y-2">
              <span className="font-semibold text-slate-400 uppercase tracking-wider text-[10px] flex items-center gap-1.5">
                <Database className="w-3.5 h-3.5 text-sky-600" />
                <span>Repository Resources ({matchedResources.length})</span>
              </span>
              <div className="space-y-1.5">
                {matchedResources.map((res) => (
                  <div
                    key={res.id}
                    onClick={() => handleSelect(`/repository/${res.id}`)}
                    className="p-2.5 rounded-xl border border-slate-200 hover:border-sky-400 hover:bg-sky-50/40 cursor-pointer transition flex items-center justify-between group"
                  >
                    <div className="min-w-0 pr-3">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[10px] font-bold text-sky-800 bg-sky-50 px-1.5 py-0.5 rounded border border-sky-200 shrink-0">
                          {res.id}
                        </span>
                        <span className="font-semibold text-slate-900 group-hover:text-sky-950 truncate">
                          {res.title}
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-500 mt-0.5 flex items-center gap-2 flex-wrap">
                        <span>{res.topic}</span>
                        <span className="text-slate-300">·</span>
                        <span>{res.region} ({res.year})</span>
                        <span className="text-slate-300 hidden sm:inline">·</span>
                        <span className="hidden sm:inline">{res.files.length} files</span>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-sky-600 shrink-0" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* PUBLISHED OUTREACH ARTICLES */}
          {(activeFilter === 'all' || activeFilter === 'published') && matchedDrafts.length > 0 && (
            <div className="space-y-2">
              <span className="font-semibold text-slate-400 uppercase tracking-wider text-[10px] flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-indigo-600" />
                <span>Publications ({matchedDrafts.length})</span>
              </span>
              <div className="space-y-1.5">
                {matchedDrafts.map((d) => (
                  <div
                    key={d.id}
                    onClick={() => handleSelect(`/content/${d.id}`)}
                    className="p-2.5 rounded-xl border border-slate-200 hover:border-indigo-400 hover:bg-indigo-50/30 cursor-pointer transition flex items-center justify-between group"
                  >
                    <div className="min-w-0 pr-3">
                      <div className="font-semibold text-slate-900 group-hover:text-indigo-950 truncate">
                        {d.title}
                      </div>
                      <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                        {d.summary}
                      </p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-indigo-600 shrink-0" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* EXPEDITIONS */}
          {(activeFilter === 'all' || activeFilter === 'expeditions') && matchedExpeditions.length > 0 && (
            <div className="space-y-2">
              <span className="font-semibold text-slate-400 uppercase tracking-wider text-[10px] flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5 text-teal-600" />
                <span>Expeditions ({matchedExpeditions.length})</span>
              </span>
              <div className="space-y-1.5">
                {matchedExpeditions.map((e) => (
                  <div
                    key={e.id}
                    onClick={() => handleSelect(`/expeditions/${e.id}`)}
                    className="p-2.5 rounded-xl border border-slate-200 hover:border-teal-400 hover:bg-teal-50/30 cursor-pointer transition flex items-center justify-between group"
                  >
                    <div className="min-w-0 pr-3">
                      <div className="font-semibold text-slate-900 group-hover:text-teal-950 truncate">
                        {e.name}
                      </div>
                      <div className="text-[11px] text-slate-500 flex items-center gap-1.5 flex-wrap">
                        <span>{e.region}</span>
                        <span className="text-slate-300">·</span>
                        <span>{e.status}</span>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-teal-600 shrink-0" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* MEDIA */}
          {(activeFilter === 'all' || activeFilter === 'media') && matchedMedia.length > 0 && (
            <div className="space-y-2">
              <span className="font-semibold text-slate-400 uppercase tracking-wider text-[10px] flex items-center gap-1.5">
                <Film className="w-3.5 h-3.5 text-amber-600" />
                <span>Media & Gallery ({matchedMedia.length})</span>
              </span>
              <div className="space-y-1.5">
                {matchedMedia.map((m) => (
                  <div
                    key={m.id}
                    onClick={() => handleSelect(m.id.startsWith('MED-') ? '/media' : '/media')}
                    className="p-2.5 rounded-xl border border-slate-200 hover:border-amber-400 hover:bg-amber-50/40 cursor-pointer transition flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-3 min-w-0 pr-3">
                      <div className="w-10 h-10 rounded-lg bg-slate-900 shrink-0 overflow-hidden">
                        <img
                          src={m.thumbnail}
                          alt={m.title}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            (e.currentTarget as HTMLImageElement).style.display = 'none';
                          }}
                        />
                      </div>
                      <div className="min-w-0">
                        <div className="font-semibold text-slate-900 group-hover:text-amber-900 truncate">
                          {m.title}
                        </div>
                        <div className="text-[11px] text-slate-500 flex items-center gap-1.5">
                          {m.mediaType === 'video' && <Video className="w-3 h-3" />}
                          {m.mediaType === 'image' && <ImageIcon className="w-3 h-3" />}
                          <span>{m.region}</span>
                        </div>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-amber-600 shrink-0" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* No results */}
          {totalMatches === 0 && (
            <div className="text-center py-12 text-slate-400 space-y-1">
              <Search className="w-8 h-8 mx-auto text-slate-300" />
              <div className="font-medium text-slate-500">No matching records found</div>
              {query && (
                <div className="text-[11px] text-slate-400">
                  Try a different keyword or clear the search
                </div>
              )}
            </div>
          )}
        </div>

        {/* Keyboard shortcut hint */}
        <div className="px-3 sm:px-4 py-2 border-t border-slate-100 bg-slate-50/60 text-[10px] text-slate-400 flex items-center justify-between">
          <span>Tip: press <kbd className="px-1.5 py-0.5 rounded bg-white border border-slate-200 font-mono text-slate-600">Esc</kbd> to close</span>
          <span className="hidden sm:inline"><kbd className="px-1.5 py-0.5 rounded bg-white border border-slate-200 font-mono text-slate-600">Ctrl</kbd> + <kbd className="px-1.5 py-0.5 rounded bg-white border border-slate-200 font-mono text-slate-600">K</kbd> to search anywhere</span>
        </div>
      </div>
    </div>
  );
};
