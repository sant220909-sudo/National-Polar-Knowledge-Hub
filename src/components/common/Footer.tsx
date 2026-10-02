import React from 'react';
import { Compass, ShieldCheck, Sparkles, ExternalLink, Globe, Heart, Lock } from 'lucide-react';

interface FooterProps {
  onNavigate: (route: string) => void;
  onOpenLogin: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenLogin }) => {
  return (
    <footer className="bg-slate-950 text-slate-400 text-xs border-t border-slate-800">
      {/* Principle Banner */}
      <div className="bg-gradient-to-r from-blue-950 via-slate-900 to-sky-950 border-b border-sky-900/40 py-6 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-sky-500/20 text-sky-400 border border-sky-500/30">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-semibold text-white tracking-wide">
                Institutional Science Dissemination Principle
              </p>
              <p className="text-xs text-sky-300 font-serif italic mt-0.5">
                “AI assists. Experts validate. The public learns.”
              </p>
            </div>
          </div>
          <div className="text-xs text-slate-300 max-w-md">
            Every public educational brief, article, and caption on this portal originates from field reports, is synthesized by AI under human review, and is vetted by authorized polar researchers and approved by the institutional administrator.
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {/* Col 1: Identity */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-sky-600 flex items-center justify-center text-white">
                <Compass className="w-5 h-5" />
              </div>
              <span className="text-base font-bold text-white tracking-tight">
                Polar Knowledge Portal
              </span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              Integrated scientific repository, research archive, and media dissemination platform archiving India’s polar expeditions to Antarctica, the Arctic, the Southern Ocean, and the Himalayan Cryosphere.
            </p>
            <div className="pt-2">
              <div className="text-[11px] uppercase tracking-wider text-sky-400 font-semibold mb-1">
                Institutional Mandate
              </div>
              <p className="text-slate-400 text-[11px]">
                National Centre for Polar and Ocean Research (NCPOR), Ministry of Earth Sciences, Government of India.
              </p>
            </div>
          </div>

          {/* Col 2: Research Stations */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Polar Research Stations
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => onNavigate('/expeditions')} className="hover:text-sky-300 transition flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-400"></span>
                  Bharati Station (Larsemann Hills)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/expeditions')} className="hover:text-sky-300 transition flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-400"></span>
                  Maitri Station (Schirmacher Oasis)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/expeditions')} className="hover:text-sky-300 transition flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-400"></span>
                  Himadri Station (Ny-Ålesund, Arctic)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/expeditions')} className="hover:text-sky-300 transition flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-400"></span>
                  IndARC Mooring (Kongsfjorden)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/expeditions')} className="hover:text-sky-300 transition flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                  Himansh Observatory (Spiti, Himalayas)
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Portal Navigation */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Public Dissemination
            </h4>
            <ul className="space-y-2 text-xs">
              <li><button onClick={() => onNavigate('/expeditions')} className="hover:text-sky-300 transition">Expeditions Archive</button></li>
              <li><button onClick={() => onNavigate('/research')} className="hover:text-sky-300 transition">Research & Publications</button></li>
              <li><button onClick={() => onNavigate('/datasets')} className="hover:text-sky-300 transition">Scientific Datasets</button></li>
              <li><button onClick={() => onNavigate('/activities')} className="hover:text-sky-300 transition">Institutional Activities</button></li>
              <li><button onClick={() => onNavigate('/media')} className="hover:text-sky-300 transition">Media & Visual Archive</button></li>
              <li><button onClick={() => onNavigate('/education')} className="hover:text-sky-300 transition">Polar Education Zone</button></li>
              <li><button onClick={() => onNavigate('/about')} className="hover:text-sky-300 transition">About the Portal</button></li>
            </ul>
          </div>

          {/* Col 4: Staff Access & Governance */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Staff & Governance
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={onOpenLogin}
                  className="hover:text-sky-300 transition flex items-center gap-1.5 font-semibold text-slate-300"
                >
                  <Lock className="w-3.5 h-3.5 text-sky-400" />
                  <span>Staff Login</span>
                </button>
              </li>
              <li><button onClick={() => onNavigate('/about')} className="hover:text-sky-300 transition">AI Dissemination Ethics</button></li>
              <li><button onClick={() => onNavigate('/about')} className="hover:text-sky-300 transition">Antarctic Treaty Guidelines</button></li>
              <li><button onClick={() => onNavigate('/about')} className="hover:text-sky-300 transition">Open Data Protocol</button></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 mt-8 border-t border-slate-800/80 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-slate-400">
          <div className="space-y-1 text-center md:text-left">
            <div className="font-semibold text-slate-300">
              © 2026 भारतीय ध्रुवीय ज्ञान पोर्टल • राष्ट्रीय ध्रुवीय एवं महासागर अनुसंधान केंद्र (NCPOR)
            </div>
            <div className="text-slate-500 text-[10px]">
              Headland Sada, Vasco da Gama, Goa - 403804, India • An Autonomous R&D Institute under Ministry of Earth Sciences, Govt. of India
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 text-xs">
            <a href="https://www.india.gov.in" target="_blank" rel="noreferrer" className="hover:text-amber-400 text-slate-400 transition flex items-center gap-1 font-semibold">
              <span>National Portal of India</span>
              <ExternalLink className="w-2.5 h-2.5" />
            </a>
            <span className="text-slate-700">•</span>
            <a href="https://moes.gov.in" target="_blank" rel="noreferrer" className="hover:text-amber-400 text-slate-400 transition flex items-center gap-1 font-semibold">
              <span>Ministry of Earth Sciences</span>
              <ExternalLink className="w-2.5 h-2.5" />
            </a>
            <span className="text-slate-700">•</span>
            <a href="https://ncpor.res.in" target="_blank" rel="noreferrer" className="hover:text-amber-400 text-slate-400 transition flex items-center gap-1 font-semibold">
              <span>NCPOR Portal</span>
              <ExternalLink className="w-2.5 h-2.5" />
            </a>
          </div>
        </div>

        {/* Official Tricolour Base Accent */}
        <div className="mt-8 pt-4 border-t border-slate-900 flex items-center justify-center">
          <div className="h-1 w-48 rounded-full bg-gradient-to-r from-[#FF9933] via-white to-[#138808]" />
        </div>
      </div>
    </footer>
  );
};
