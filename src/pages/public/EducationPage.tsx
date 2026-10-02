import React, { useState } from 'react';
import { store } from '../../services/storage';
import {
  GraduationCap,
  Clock,
  Sparkles,
  BookOpen,
  ArrowRight,
  HelpCircle,
  Lightbulb,
  Compass,
  CheckCircle2,
  ShieldCheck,
  X
} from 'lucide-react';

interface EducationPageProps {
  onNavigate: (route: string) => void;
}

export const EducationPage: React.FC<EducationPageProps> = ({ onNavigate }) => {
  const [selectedTopicModal, setSelectedTopicModal] = useState<any | null>(null);

  const publishedEducationDrafts = store
    .getDrafts()
    .filter((d) => {
      if (d.status !== 'PUBLISHED') return false;
      const res = store.getResourceById(d.resourceId);
      if (res && res.visibility === 'PRIVATE') return false;
      return d.contentDestination === 'Education' || d.contentType === 'Educational Content';
    });

  const educationalTopics = [
    {
      id: 'edu-01',
      title: 'What is Polar Science?',
      level: 'Beginner',
      levelColor: 'bg-emerald-100 text-emerald-800',
      time: '3 min read',
      image: 'https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?auto=format&fit=crop&q=80&w=800',
      summary: 'An exciting introduction into how scientists study the coldest, windiest places on Earth using satellites, ice drills, and remote sensor stations.',
      details: `### What is Polar Science?
Polar science is the study of everything that happens at the top and bottom of our globe—the Arctic Ocean in the north, and the continent of Antarctica in the south, plus the icy Himalayan mountains (called the Third Pole).

Scientists study:
- **Glaciology**: How snow turns into thick ice and flows like solid rivers.
- **Oceanography**: How icy seawater sinks to the bottom of the ocean and circulates around the whole planet.
- **Atmosphere**: How polar winds and solar auroras tell us about space weather and Earth's ozone layer.
- **Biology**: How penguins, seals, polar bears, and microscopic bacteria survive in sub-zero cold!`,
      funFact: 'Did you know? Antarctic winds can reach speeds of over 300 km/h—faster than a bullet train!'
    },
    {
      id: 'edu-02',
      title: 'Why are Polar Regions Important?',
      level: 'Beginner',
      levelColor: 'bg-emerald-100 text-emerald-800',
      time: '4 min read',
      image: 'https://images.unsplash.com/photo-1548263594-a71ea65a8598?auto=format&fit=crop&q=80&w=800',
      summary: 'Discover why the Arctic and Antarctic are Earth’s natural air conditioners and how they control weather and monsoons in India.',
      details: `### Earth's Planetary Thermostats
Because white snow reflects over 80% of incoming sunlight back into space, polar ice prevents our planet from overheating.

When polar ice melts:
1. Dark ocean water or ground is exposed.
2. The dark surface absorbs heat instead of reflecting it.
3. This creates a feedback loop that warms the planet even faster!

For India, the polar temperature difference controls the high-altitude jet streams that steer the Indian Summer Monsoon rains needed for agriculture.`,
      funFact: 'Antarctic ice acts like a mirror reflecting sunlight back into space—a phenomenon called the "Albedo Effect".'
    },
    {
      id: 'edu-03',
      title: 'Antarctica Explained: The Frozen Continent',
      level: 'Beginner',
      levelColor: 'bg-emerald-100 text-emerald-800',
      time: '4 min read',
      image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80&w=800',
      summary: 'Antarctica is not just ice—it is a massive continent buried under an ice sheet up to 4 kilometers thick, surrounded by the stormy Southern Ocean.',
      details: `### A Land of Superlatives
Antarctica is:
- The **coldest** place on Earth (-89.2°C recorded at Vostok).
- The **windiest** continent on Earth.
- The **driest** desert on Earth! (It receives so little precipitation that the inland ice plateau is technically a desert).

India operates two permanent research stations in Antarctica today: **Maitri** (built in 1989) and **Bharati** (built in 2012 in the Larsemann Hills).`,
      funFact: 'Antarctica is the only continent with no native human population, no countries, and no permanent cities!'
    },
    {
      id: 'edu-04',
      title: 'The Arctic & Himadri: Monitoring High-Latitude Ocean Change',
      level: 'Intermediate',
      levelColor: 'bg-sky-100 text-sky-800',
      time: '5 min read',
      image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=800',
      summary: 'Unlike Antarctica which is land surrounded by water, the Arctic is an ocean surrounded by continents. Learn about India’s Himadri station in Svalbard.',
      details: `### The High Arctic & Svalbard
The Arctic Ocean is covered by a floating layer of frozen sea ice. During summer, parts of this sea ice melt, and during the pitch-black winter, it refreezes.

India established its Arctic research station **Himadri** in 2008 at Ny-Ålesund, Norway (79° North). Here, Indian researchers monitor how warm currents from the Atlantic Ocean are entering Arctic fjords and changing marine life.`,
      funFact: 'In Ny-Ålesund, researchers must carry safety protection because polar bears outnumber people in the Svalbard archipelago!'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold">
          <GraduationCap className="w-4 h-4 text-amber-700" />
          <span>Student Knowledge & STEM Exploration</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
          Learn Polar Science
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
          Simplified articles, visual explainers, and interactive concepts for students, educators, and curious minds curious about Earth's icy frontiers.
        </p>
      </div>

      {/* Grid of Student Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {educationalTopics.map((topic) => (
          <div
            key={topic.id}
            className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-xl hover:border-amber-300 transition flex flex-col justify-between group"
          >
            <div>
              <div className="relative h-48 bg-slate-900 overflow-hidden">
                <img
                  src={topic.image}
                  alt={topic.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>

                <div className="absolute top-3 left-3 flex items-center gap-2">
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${topic.levelColor}`}>
                    {topic.level}
                  </span>
                </div>

                <div className="absolute bottom-3 left-3 flex items-center gap-1.5 text-white text-xs">
                  <Clock className="w-3.5 h-3.5 text-amber-300" />
                  <span>{topic.time}</span>
                </div>
              </div>

              <div className="p-5 space-y-3">
                <h3 className="text-base font-bold text-slate-900 group-hover:text-amber-900 leading-snug">
                  {topic.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                  {topic.summary}
                </p>

                <div className="p-3 rounded-xl bg-amber-50/60 border border-amber-200/60 text-amber-900 text-xs flex items-start gap-2">
                  <Lightbulb className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <p className="text-[11px] leading-tight">
                    <strong>Quick Fact:</strong> {topic.funFact}
                  </p>
                </div>
              </div>
            </div>

            <div className="p-5 pt-0">
              <button
                onClick={() => setSelectedTopicModal(topic)}
                className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-amber-600 text-white font-semibold text-xs transition flex items-center justify-center gap-1.5 shadow-xs"
              >
                <span>Read Student Explainer</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Verified Student Educational Articles from Scientist Workflow */}
      {publishedEducationDrafts.length > 0 && (
        <div className="space-y-4 pt-8 border-t border-slate-200">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-900">
            <GraduationCap className="w-4 h-4 text-emerald-600" />
            <span>Verified Student Learning Resources & Explanations ({publishedEducationDrafts.length})</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {publishedEducationDrafts.map((d) => (
              <div
                key={d.id}
                onClick={() => onNavigate(`/content/${d.id}`)}
                className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs hover:border-emerald-400 hover:shadow-lg transition cursor-pointer flex flex-col justify-between space-y-4 group"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                      {d.destinationSpecificType || 'Learning Resource'}
                    </span>
                    <span className="text-[10px] text-slate-400 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {d.readingTimeMin || 3} min read
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 group-hover:text-emerald-900 leading-snug">
                    {d.title}
                  </h3>

                  <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                    {d.summary}
                  </p>
                </div>

                <div className="space-y-3 pt-3 border-t border-slate-100">
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span>Source: <strong>{d.resourceId}</strong></span>
                    <span className="text-emerald-700 font-semibold flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                      <span>Explore</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Modal reader for educational topic */}
      {selectedTopicModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-fadeIn">
          <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[85vh]">
            <div className="p-5 bg-gradient-to-r from-amber-600 to-amber-700 text-white flex items-start justify-between">
              <div className="space-y-1">
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-white/20 text-white">
                  {selectedTopicModal.level} • {selectedTopicModal.time}
                </span>
                <h3 className="text-lg font-bold">{selectedTopicModal.title}</h3>
              </div>
              <button
                onClick={() => setSelectedTopicModal(null)}
                className="p-1 rounded-lg text-white/80 hover:text-white hover:bg-white/10"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed">
              <img
                src={selectedTopicModal.image}
                alt={selectedTopicModal.title}
                className="w-full h-48 rounded-xl object-cover"
              />

              <div className="space-y-3 whitespace-pre-line">
                {selectedTopicModal.details}
              </div>

              <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs">
                <strong>💡 Classroom Discussion Question:</strong> Why is protecting the polar regions not just a polar issue, but a critical planetary necessity for coastal cities across the globe?
              </div>
            </div>

            <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs">
              <span className="text-slate-500">Curated by Polar Science Outreach Cell</span>
              <button
                onClick={() => setSelectedTopicModal(null)}
                className="px-4 py-2 rounded-xl bg-slate-900 text-white font-medium hover:bg-slate-800"
              >
                Done Reading
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
