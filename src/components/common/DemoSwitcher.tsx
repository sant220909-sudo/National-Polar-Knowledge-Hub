import React, { useState } from 'react';
import { store } from '../../services/storage';
import { User, UserRole } from '../../types';
import {
  Compass,
  UserCheck,
  Shield,
  RotateCcw,
  Sparkles,
  ChevronDown,
  ChevronUp,
  X,
  ArrowRight,
  HelpCircle
} from 'lucide-react';

interface DemoSwitcherProps {
  currentUser: User;
  onNavigate: (route: string) => void;
  onOpenLoginModal?: () => void;
}

export const DemoSwitcher: React.FC<DemoSwitcherProps> = ({
  currentUser,
  onNavigate,
  onOpenLoginModal
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showGuide, setShowGuide] = useState(false);

  const handleSelectRole = (role: UserRole) => {
    store.switchRole(role);
    if (role === 'ADMINISTRATOR') {
      onNavigate('/admin/dashboard');
    } else if (role === 'CONTENT_CONTRIBUTOR') {
      onNavigate('/contributor/dashboard');
    } else {
      onNavigate('/');
    }
  };

  const handleReset = () => {
    if (window.confirm('Reset all demo resources, drafts, and reviews to default state?')) {
      store.resetAllToDefault();
      onNavigate('/');
      setIsExpanded(false);
    }
  };

  return (
    <aside aria-label="Prototype Evaluator Controls" className="fixed bottom-4 right-4 z-40">
      {/* Expanded Popover Card */}
      {isExpanded && (
        <div className="mb-2 w-80 sm:w-96 bg-slate-900/95 text-slate-100 rounded-2xl shadow-2xl border border-sky-500/30 backdrop-blur-md overflow-hidden animate-fadeIn text-xs">
          {/* Header */}
          <div className="px-4 py-3 bg-slate-950/80 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="font-semibold text-sky-300 tracking-wide uppercase text-[11px]">
                Evaluator Role Switcher
              </span>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={handleReset}
                title="Reset demo data"
                className="p-1 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 transition"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setIsExpanded(false)}
                className="p-1 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Quick Role Switcher Buttons */}
          <div className="p-3 space-y-1.5">
            <div className="text-[11px] text-slate-400 mb-1">
              Switch role immediately to inspect views & permissions:
            </div>

            <button
              onClick={() => handleSelectRole('PUBLIC_USER')}
              className={`w-full flex items-center justify-between p-2 rounded-xl transition ${
                currentUser.role === 'PUBLIC_USER'
                  ? 'bg-sky-600 text-white font-medium shadow-xs'
                  : 'bg-slate-800/80 text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Compass className="w-4 h-4 text-sky-300" />
                <div className="text-left">
                  <div className="font-semibold text-xs">Public Visitor</div>
                  <div className="text-[10px] opacity-80">Open access knowledge repository</div>
                </div>
              </div>
              {currentUser.role === 'PUBLIC_USER' && (
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/20 font-mono">Active</span>
              )}
            </button>

            <button
              onClick={() => handleSelectRole('CONTENT_CONTRIBUTOR')}
              className={`w-full flex items-center justify-between p-2 rounded-xl transition ${
                currentUser.role === 'CONTENT_CONTRIBUTOR'
                  ? 'bg-sky-600 text-white font-medium shadow-xs'
                  : 'bg-slate-800/80 text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <UserCheck className="w-4 h-4 text-emerald-300" />
                <div className="text-left">
                  <div className="font-semibold text-xs">Contributor (Dr. Rahul Sharma)</div>
                  <div className="text-[10px] opacity-80">Upload, AI draft synthesis & editing</div>
                </div>
              </div>
              {currentUser.role === 'CONTENT_CONTRIBUTOR' && (
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/20 font-mono">Active</span>
              )}
            </button>

            <button
              onClick={() => handleSelectRole('ADMINISTRATOR')}
              className={`w-full flex items-center justify-between p-2 rounded-xl transition ${
                currentUser.role === 'ADMINISTRATOR'
                  ? 'bg-sky-600 text-white font-medium shadow-xs'
                  : 'bg-slate-800/80 text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Shield className="w-4 h-4 text-amber-300" />
                <div className="text-left">
                  <div className="font-semibold text-xs">Admin (Dr. Sunita Rao)</div>
                  <div className="text-[10px] opacity-80">Review queue, approve & publish</div>
                </div>
              </div>
              {currentUser.role === 'ADMINISTRATOR' && (
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/20 font-mono">Active</span>
              )}
            </button>
          </div>

          {/* Workflow Guide Drawer */}
          <div className="border-t border-slate-800 p-3 bg-slate-950/40">
            <button
              onClick={() => setShowGuide(!showGuide)}
              className="w-full flex items-center justify-between text-slate-400 hover:text-sky-300 text-[11px] transition"
            >
              <span className="flex items-center gap-1.5 font-medium">
                <HelpCircle className="w-3.5 h-3.5 text-sky-400" />
                <span>End-to-End Workflow Guide</span>
              </span>
              {showGuide ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
            </button>

            {showGuide && (
              <div className="mt-2.5 pt-2 border-t border-slate-800/80 space-y-1.5 text-[11px]">
                <div
                  onClick={() => {
                    store.switchRole('CONTENT_CONTRIBUTOR');
                    onNavigate('/contributor/upload');
                    setIsExpanded(false);
                  }}
                  className="cursor-pointer p-1.5 rounded-lg bg-slate-800/60 hover:bg-sky-950 text-slate-300 flex items-center justify-between"
                >
                  <span className="font-medium text-sky-300">1. Upload Scientific Resource</span>
                  <ArrowRight className="w-3 h-3 text-slate-400" />
                </div>
                <div
                  onClick={() => {
                    store.switchRole('ADMINISTRATOR');
                    onNavigate('/admin/reviews');
                    setIsExpanded(false);
                  }}
                  className="cursor-pointer p-1.5 rounded-lg bg-slate-800/60 hover:bg-indigo-950 text-slate-300 flex items-center justify-between"
                >
                  <span className="font-medium text-indigo-300">2. Admin Review & Publish</span>
                  <ArrowRight className="w-3 h-3 text-slate-400" />
                </div>
                <div
                  onClick={() => {
                    store.switchRole('PUBLIC_USER');
                    onNavigate('/explore');
                    setIsExpanded(false);
                  }}
                  className="cursor-pointer p-1.5 rounded-lg bg-slate-800/60 hover:bg-emerald-950 text-slate-300 flex items-center justify-between"
                >
                  <span className="font-medium text-emerald-300">3. Public Repository Discovery</span>
                  <ArrowRight className="w-3 h-3 text-slate-400" />
                </div>
              </div>
            )}
          </div>

          {/* Footer Charter */}
          <div className="px-4 py-2 bg-slate-950 text-slate-400 text-[10px] flex items-center justify-between border-t border-slate-800/80">
            <span className="font-serif italic text-sky-300">
              “AI assists. Experts validate. The public learns.”
            </span>
            {onOpenLoginModal && (
              <button
                onClick={() => {
                  setIsExpanded(false);
                  onOpenLoginModal();
                }}
                className="text-sky-400 hover:text-sky-200 underline font-medium"
              >
                Login Dialog
              </button>
            )}
          </div>
        </div>
      )}

      {/* Floating Toggle Pill */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center gap-2 px-3 py-2 rounded-full bg-slate-900/90 text-white hover:bg-slate-900 border border-slate-700/80 shadow-lg backdrop-blur-md transition-all hover:scale-105 active:scale-95 group text-xs font-medium"
        title="Toggle Evaluator Demo Controls"
      >
        <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0"></span>
        <span className="text-slate-300 group-hover:text-white">
          {currentUser.role === 'ADMINISTRATOR'
            ? 'Admin: Dr. Sunita Rao'
            : currentUser.role === 'CONTENT_CONTRIBUTOR'
            ? 'Contributor: Dr. Sharma'
            : 'Public Visitor'}
        </span>
        <ChevronUp
          className={`w-3.5 h-3.5 text-slate-400 group-hover:text-sky-300 transition-transform ${
            isExpanded ? 'rotate-180' : ''
          }`}
        />
      </button>
    </aside>
  );
};
