import React, { useState } from 'react';
import { store } from '../../services/storage';
import { ScrollReveal } from '../../components/common/ScrollReveal';
import { Compass, Calendar, MapPin, Users, ArrowRight, ShieldCheck, Sparkles, Clock, BookOpen } from 'lucide-react';

interface ExpeditionsPageProps {
  onNavigate: (route: string) => void;
}

export const ExpeditionsPage: React.FC<ExpeditionsPageProps> = ({ onNavigate }) => {
  const [selectedRegion, setSelectedRegion] = useState<string>('All');
  const expeditions = store.getExpeditions();

  const publishedExpeditionStories = store
    .getDrafts()
    .filter((d) => {
      if (d.status !== 'PUBLISHED') return false;
      const res = store.getResourceById(d.resourceId);
      if (res && res.visibility === 'PRIVATE') return false;
      return d.contentDestination === 'Expedition' || d.contentType === 'Expedition Story';
    });

  const filtered = expeditions.filter((e) => {
    if (selectedRegion === 'All') return true;
    return e.region === selectedRegion;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <ScrollReveal variant="fadeDown">
        <div className="space-y-3 pb-4 border-b border-slate-200">
          <div className="flex items-center gap-2 text-xs font-semibold text-amber-700 uppercase tracking-wider">
            <span className="text-base leading-none">🇮🇳</span>
            <Compass className="w-4 h-4 text-amber-600" />
            <span>भारत का राष्ट्रीय ध्रुवीय अभियान अभिलेखागार (National Mission Archive)</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-serif">
            भारतीय ध्रुवीय वैज्ञानिक अभियान (Indian Polar Expeditions)
          </h1>
          <p className="text-sm text-slate-600 max-w-3xl leading-relaxed">
            Official chronicles, field logistics, and scientific debriefs of expeditions led by the National Centre for Polar and Ocean Research (NCPOR, MoES) to Antarctica, the Arctic (Svalbard), the Southern Ocean, and the Himalayan Cryosphere.
          </p>
        </div>
      </ScrollReveal>

      {/* Region Filter Tabs */}
      <ScrollReveal variant="fadeUp">
        <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-200">
          {['All', 'Antarctica', 'Arctic', 'Southern Ocean', 'Himalayas'].map((region) => (
            <button
              key={region}
              onClick={() => setSelectedRegion(region)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition shrink-0 ${
                selectedRegion === region
                  ? 'bg-amber-600 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {region === 'All'
                ? 'All Polar Frontiers (सभी अभियान)'
                : region === 'Antarctica'
                ? 'Antarctica (अंटार्कटिका)'
                : region === 'Arctic'
                ? 'Arctic (आर्कटिक)'
                : region === 'Southern Ocean'
                ? 'Southern Ocean (दक्षिण महासागर)'
                : 'Himalayas (हिमालय - तीसरा ध्रुव)'}
            </button>
          ))}
        </div>
      </ScrollReveal>

      {/* Expeditions List Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((exp, idx) => (
          <ScrollReveal key={exp.id} variant="fadeUp" delay={0.07 * idx}>
            <div
              onClick={() => onNavigate(`/expeditions/${exp.id}`)}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-xl hover:border-sky-300 transition cursor-pointer flex flex-col group h-full"
            >
              <div className="relative h-52 overflow-hidden bg-slate-900">
                <img
                  src={exp.bannerImage}
                  alt={exp.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>
                <div className="absolute top-3 left-3 flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-slate-900/80 backdrop-blur-md text-white border border-slate-700">
                    {exp.region}
                  </span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/90 text-white">
                    {exp.status}
                  </span>
                </div>
                <div className="absolute bottom-3 left-3 right-3 text-white text-xs">
                  <div className="font-mono text-[10px] text-sky-300">{exp.expeditionNumber} • {exp.year}</div>
                  <div className="text-xs font-semibold">{exp.leadStation}</div>
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="text-base font-bold text-slate-900 group-hover:text-sky-900 leading-snug">
                    {exp.name}
                  </h3>
                  <p className="text-xs text-slate-600 mt-2 line-clamp-3 leading-relaxed">
                    {exp.overview}
                  </p>
                </div>

                <div className="space-y-3 pt-3 border-t border-slate-100 text-xs">
                  <div className="flex items-center justify-between text-slate-500">
                    <span className="flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-slate-400" />
                      <span>{exp.teamSize} Researchers & Crew</span>
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      <span>{exp.duration}</span>
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-sky-700 font-semibold group-hover:translate-x-1 transition">
                    <span>View Complete Expedition Archive</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
      {/* Published Expedition Chronicles & Outreaches */}
      {publishedExpeditionStories.length > 0 && (
        <ScrollReveal variant="fadeUp">
          <div className="space-y-6 pt-10 border-t border-slate-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2 text-xs font-semibold text-sky-700 uppercase tracking-wider">
                  <Sparkles className="w-4 h-4 text-sky-600" />
                  <span>Field Chronicles & Outreach Dispatches</span>
                </div>
                <h2 className="text-2xl font-bold text-slate-900 font-serif mt-1">
                  Verified Expedition Articles & Field Updates
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Synthesized from primary polar scientific datasets, verified by field researchers, and approved for public knowledge dissemination.
                </p>
              </div>
              <span className="text-xs font-mono px-3 py-1 bg-sky-50 text-sky-800 rounded-full border border-sky-200 self-start sm:self-auto">
                {publishedExpeditionStories.length} Dispatched Story{publishedExpeditionStories.length !== 1 ? 'ies' : ''}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {publishedExpeditionStories.map((story, sIdx) => (
                <ScrollReveal key={story.id} variant="zoomIn" delay={0.09 * sIdx}>
                  <div
                    onClick={() => onNavigate(`/content/${story.id}`)}
                    className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-xl hover:border-sky-300 transition cursor-pointer flex flex-col group h-full"
                  >
                    <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between gap-2">
                          <span className="px-2.5 py-0.5 rounded-md text-[10px] font-bold bg-sky-100 text-sky-800 border border-sky-200">
                            {story.destinationSpecificType || story.contentType}
                          </span>
                          <span className="text-[10px] text-slate-400 font-mono">
                            {story.readingTimeMin || 4} min read
                          </span>
                        </div>

                        <h3 className="text-base font-bold text-slate-900 group-hover:text-sky-700 transition leading-snug">
                          {story.title}
                        </h3>

                        <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                          {story.summary}
                        </p>
                      </div>

                      <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                        <div className="text-[11px] text-slate-500">
                          <span>By {story.contributorName}</span>
                        </div>
                        <div className="flex items-center gap-1 text-sky-700 font-semibold group-hover:translate-x-1 transition">
                          <span>Read Story</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </div>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </ScrollReveal>
      )}
    </div>
  );
};
