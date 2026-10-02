import React, { useState } from 'react';
import { store } from '../../services/storage';
import {
  Image as ImageIcon,
  Video,
  Play,
  Download,
  Calendar,
  MapPin,
  Compass,
  Filter,
  Eye
} from 'lucide-react';

interface MediaPageProps {
  onOpenMedia: (mediaId: string) => void;
  onNavigate: (route: string) => void;
}

export const MediaPage: React.FC<MediaPageProps> = ({ onOpenMedia, onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'all' | 'photos' | 'videos'>('all');
  const [selectedRegion, setSelectedRegion] = useState<string>('All');

  const allMedia = store.getMedia();

  const filteredMedia = allMedia.filter((m) => {
    // Exclude media belonging to PRIVATE resources
    if (m.resourceId) {
      const res = store.getResourceById(m.resourceId);
      if (res && res.visibility === 'PRIVATE') return false;
    }

    if (activeTab === 'photos' && m.type !== 'photo') return false;
    if (activeTab === 'videos' && m.type !== 'video') return false;
    if (selectedRegion !== 'All' && m.region !== selectedRegion) return false;
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-xs font-semibold text-teal-700 uppercase tracking-wider">
          <ImageIcon className="w-4 h-4 text-teal-600" />
          <span>Institutional Media Dissemination</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Polar Media & Visual Repository
        </h1>
        <p className="text-sm text-slate-600 max-w-3xl leading-relaxed">
          Archival photographs, station life moments, expedition telemetry captures, and high-definition video documentation from Indian campaigns across Antarctica, the Arctic, and the Southern Ocean.
        </p>
      </div>

      {/* Filter and Tab Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div className="flex items-center gap-2 text-xs">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-4 py-2 rounded-xl font-bold transition ${
              activeTab === 'all'
                ? 'bg-slate-900 text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            All Media ({allMedia.length})
          </button>
          <button
            onClick={() => setActiveTab('photos')}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl font-bold transition ${
              activeTab === 'photos'
                ? 'bg-slate-900 text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            <ImageIcon className="w-3.5 h-3.5" />
            <span>Photographs ({allMedia.filter((m) => m.type === 'photo').length})</span>
          </button>
          <button
            onClick={() => setActiveTab('videos')}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl font-bold transition ${
              activeTab === 'videos'
                ? 'bg-slate-900 text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            <Video className="w-3.5 h-3.5 text-rose-500" />
            <span>Videos ({allMedia.filter((m) => m.type === 'video').length})</span>
          </button>
        </div>

        {/* Region Filter */}
        <div className="flex items-center gap-2 text-xs">
          <span className="text-slate-500 font-medium">Region:</span>
          <select
            value={selectedRegion}
            onChange={(e) => setSelectedRegion(e.target.value)}
            className="p-2 rounded-xl border border-slate-200 bg-white text-slate-800 focus:border-sky-500 text-xs"
          >
            <option value="All">All Regions</option>
            <option value="Antarctica">Antarctica</option>
            <option value="Arctic">Arctic</option>
            <option value="Southern Ocean">Southern Ocean</option>
            <option value="Himalayas (Third Pole)">Himalayas</option>
          </select>
        </div>
      </div>

      {/* Grid of Media Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredMedia.map((item) => (
          <div
            key={item.id}
            onClick={() => onOpenMedia(item.id)}
            className="group bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-xl hover:border-sky-300 transition cursor-pointer flex flex-col justify-between"
          >
            <div className="relative aspect-4/3 bg-slate-900 overflow-hidden">
              <img
                src={item.thumbnail}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>

              {/* Tag & Type */}
              <div className="absolute top-3 left-3">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-900/80 backdrop-blur-md text-white border border-slate-700 flex items-center gap-1">
                  {item.type === 'video' ? (
                    <Video className="w-3 h-3 text-rose-400" />
                  ) : (
                    <ImageIcon className="w-3 h-3 text-sky-400" />
                  )}
                  {item.region}
                </span>
              </div>

              {/* Video Play overlay */}
              {item.type === 'video' && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-rose-600/90 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <Play className="w-5 h-5 fill-white ml-0.5" />
                  </div>
                </div>
              )}

              {item.duration && (
                <div className="absolute top-3 right-3 px-2 py-0.5 rounded bg-black/70 text-white text-[10px] font-mono">
                  {item.duration}
                </div>
              )}

              <div className="absolute bottom-3 left-3 right-3 text-white text-xs">
                <span className="font-mono text-[10px] text-sky-300">{item.year}</span>
              </div>
            </div>

            <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-sky-900 leading-snug line-clamp-2">
                  {item.title}
                </h4>
                <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                <span className="truncate max-w-[150px]">{item.expedition}</span>
                <span className="text-sky-700 font-semibold group-hover:underline flex items-center gap-1">
                  <Eye className="w-3.5 h-3.5" /> View
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
