import React from 'react';
import { MediaItem } from '../../types';
import { X, Video, Image as ImageIcon, Download, Share2, Compass, Calendar, MapPin, UserCheck } from 'lucide-react';

interface MediaModalProps {
  item: MediaItem | null;
  onClose: () => void;
  onNavigateExpedition?: (expeditionName: string) => void;
}

export const MediaModal: React.FC<MediaModalProps> = ({
  item,
  onClose,
  onNavigateExpedition
}) => {
  if (!item) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/85 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-4xl bg-slate-900 rounded-2xl border border-slate-700 overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
        {/* Top bar */}
        <div className="flex items-center justify-between p-3 sm:p-4 bg-slate-950/80 border-b border-slate-800 text-white">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-sky-500/20 text-sky-400">
              {item.type === 'video' ? <Video className="w-4 h-4" /> : <ImageIcon className="w-4 h-4" />}
            </span>
            <span className="text-xs font-semibold uppercase tracking-wider text-sky-300">
              {item.type === 'video' ? 'Polar Expedition Video' : 'Archival High-Res Photograph'}
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Media Frame */}
        <div className="flex-1 bg-black flex items-center justify-center overflow-hidden min-h-[260px] sm:min-h-[400px]">
          {item.type === 'video' ? (
            <video
              src={item.url}
              controls
              autoPlay
              className="max-h-[50vh] sm:max-h-[60vh] w-full object-contain"
            />
          ) : (
            <img
              src={item.url}
              alt={item.title}
              className="max-h-[50vh] sm:max-h-[60vh] w-full object-contain"
            />
          )}
        </div>

        {/* Details Footer */}
        <div className="p-4 sm:p-6 bg-slate-900 border-t border-slate-800 text-white space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <h3 className="text-base sm:text-lg font-bold text-white leading-snug">
              {item.title}
            </h3>
            <span className="text-xs font-mono px-2.5 py-1 rounded bg-slate-800 text-sky-300 border border-slate-700 shrink-0">
              {item.region} • {item.year}
            </span>
          </div>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            {item.description}
          </p>

          <div className="pt-2 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400">
            <div className="flex items-center gap-4 flex-wrap">
              <span className="flex items-center gap-1.5 text-sky-300 font-medium">
                <Compass className="w-3.5 h-3.5 text-sky-400" />
                {item.expedition}
              </span>
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-slate-500" />
                {item.location}
              </span>
              <span className="flex items-center gap-1.5">
                <UserCheck className="w-3.5 h-3.5 text-slate-500" />
                {item.credit}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <a
                href={item.url}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs transition"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Original File</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
