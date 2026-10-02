import React from 'react';
import { Compass, ShieldCheck, Sparkles, UserCheck, BookOpen, Layers, Globe, CheckCircle2 } from 'lucide-react';

interface AboutPageProps {
  onNavigate: (route: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12 text-slate-800">
      {/* Header */}
      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-100 text-sky-900 text-xs font-bold">
          <Compass className="w-4 h-4 text-sky-700" />
          <span>Institutional Charter & Mandate</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
          About the Polar Knowledge Portal
        </h1>
        <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-serif">
          The Integrated Polar Science Outreach, Knowledge Repository and Media Dissemination Portal serves as the centralized digital repository archiving India’s four-decade scientific legacy across the Cryosphere.
        </p>
      </div>

      {/* Principle Callout Box */}
      <div className="rounded-3xl bg-gradient-to-r from-slate-950 via-blue-950 to-slate-900 text-white p-8 border border-sky-400/30 shadow-xl space-y-4">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-sky-500/20 text-sky-400 border border-sky-400/30">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <div>
            <h3 className="text-xl font-bold">The Polar Outreach Principle</h3>
            <p className="text-sm text-sky-300 font-serif italic mt-0.5">
              “AI assists. Experts validate. The public learns.”
            </p>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          In an era of rapid scientific publishing and artificial intelligence, the integrity of public knowledge is paramount. This platform implements a strict human-in-the-loop validation pipeline: raw scientific expedition reports and sensor streams are analyzed by AI to generate drafted summaries, which are rigorously audited and revised by credentialed polar researchers, and must be approved by the institutional administrator before publication.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 text-xs">
          <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-700">
            <div className="font-bold text-sky-400 flex items-center gap-1.5 mb-1">
              <Sparkles className="w-3.5 h-3.5" /> 1. AI Synthesis
            </div>
            <div className="text-slate-400">Extracts dense scientific jargon into accessible drafts.</div>
          </div>
          <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-700">
            <div className="font-bold text-sky-400 flex items-center gap-1.5 mb-1">
              <UserCheck className="w-3.5 h-3.5" /> 2. Expert Validation
            </div>
            <div className="text-slate-400">Field scientists edit for factual rigor & nuances.</div>
          </div>
          <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-700">
            <div className="font-bold text-sky-400 flex items-center gap-1.5 mb-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> 3. Institutional Sign-Off
            </div>
            <div className="text-slate-400">Administrator verifies treaty compliance & authorizes.</div>
          </div>
        </div>
      </div>

      {/* India's Polar Research Presence */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-slate-900 border-b border-slate-200 pb-2">
          India's Polar Research Infrastructure
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
          <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-2">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-slate-900 text-base">Bharati Research Station</h4>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-sky-100 text-sky-800">Antarctica (69°S)</span>
            </div>
            <p className="text-slate-600 leading-relaxed">
              Commissioned in 2012 in the Larsemann Hills, East Antarctica. Features state-of-the-art environmental laboratories constructed on stilts to minimize snow accumulation, operating under strict zero-waste mandates.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-2">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-slate-900 text-base">Maitri Research Station</h4>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-sky-100 text-sky-800">Antarctica (70°S)</span>
            </div>
            <p className="text-slate-600 leading-relaxed">
              India's second permanent Antarctic station established in 1989 in the rocky Schirmacher Oasis. Dedicated to geological, meteorological, geomagnetic, and human physiological research.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-2">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-slate-900 text-base">Himadri Research Station</h4>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-teal-100 text-teal-800">Arctic (79°N)</span>
            </div>
            <p className="text-slate-600 leading-relaxed">
              Established in 2008 at the international research base in Ny-Ålesund, Svalbard, Norway. Studies Arctic atmospheric aerosols, glacial retreat, and teleconnections with the Indian Summer Monsoon.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-2">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-slate-900 text-base">IndARC Underwater Mooring</h4>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-teal-100 text-teal-800">Arctic Fjord (192m)</span>
            </div>
            <p className="text-slate-600 leading-relaxed">
              India's first permanent multi-sensor underwater mooring anchored in Kongsfjorden, Svalbard. Continuous hydrographic time-series capturing Atlantic water intrusion into the Arctic.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-2 sm:col-span-2">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-slate-900 text-base">Himansh High-Altitude Observatory</h4>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-100 text-amber-800">Himalayas (4,080m MSL)</span>
            </div>
            <p className="text-slate-600 leading-relaxed">
              Situated in the Chandra Basin of Himachal Pradesh, Himansh provides continuous in-situ glaciological observations of the Third Pole glaciers that nourish the rivers of northern India.
            </p>
          </div>
        </div>
      </div>

      {/* Institutional CTA */}
      <div className="p-8 rounded-3xl bg-slate-100 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div>
          <h3 className="text-lg font-bold text-slate-900">Are you an authorized polar researcher?</h3>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Sign in with institutional credentials to upload campaign reports, generate AI-assisted briefs, and submit for peer review.
          </p>
        </div>
        <button
          onClick={() => onNavigate('/login')}
          className="px-6 py-3 rounded-xl bg-slate-900 hover:bg-sky-950 text-white font-semibold text-xs sm:text-sm shrink-0 shadow-xs transition"
        >
          Researcher & Admin Login
        </button>
      </div>
    </div>
  );
};
