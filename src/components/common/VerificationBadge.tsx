import React from 'react';
import { ShieldCheck, UserCheck, Sparkles, CheckCircle2 } from 'lucide-react';

interface VerificationBadgeProps {
  reviewerName?: string;
  contributorName?: string;
  publishedAt?: string;
  variant?: 'banner' | 'card' | 'inline';
}

export const VerificationBadge: React.FC<VerificationBadgeProps> = ({
  reviewerName = 'Directorate of Polar Science',
  contributorName = 'Authorized Research Contributor',
  publishedAt,
  variant = 'card'
}) => {
  if (variant === 'inline') {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-800 text-xs font-medium border border-emerald-200 shadow-xs">
        <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
        Verified Institutional Content
      </span>
    );
  }

  if (variant === 'banner') {
    return (
      <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white rounded-xl p-4 sm:p-5 border border-sky-400/30 shadow-lg">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-sky-500/20 text-sky-400 border border-sky-400/30">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-base tracking-wide text-white">Verified Institutional Content</span>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  PEER VALIDATED
                </span>
              </div>
              <p className="text-xs text-sky-200/80 mt-0.5">
                AI-assisted draft reviewed by authorized contributor ({contributorName}) and approved by administrator ({reviewerName}).
              </p>
            </div>
          </div>
          <div className="text-xs text-slate-300 bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700 whitespace-nowrap">
            <span className="text-slate-400">Governance: </span>
            <span className="text-sky-300 font-medium">NCPOR Standards</span>
          </div>
        </div>
      </div>
    );
  }

  // Card variant
  return (
    <div className="rounded-xl border border-emerald-200/80 bg-gradient-to-br from-emerald-50/70 via-sky-50/40 to-slate-50 p-4 shadow-xs">
      <div className="flex items-start gap-3">
        <div className="p-2 rounded-lg bg-emerald-600 text-white shadow-xs shrink-0">
          <ShieldCheck className="w-5 h-5" />
        </div>
        <div className="space-y-1">
          <div className="flex items-center gap-2 flex-wrap">
            <h4 className="text-sm font-semibold text-slate-900">Verified Institutional Content</h4>
            <span className="text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-200">
              Official Release
            </span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            This publication underwent rigorous multi-stage validation: AI synthesis provided the initial drafting baseline, which was subsequently verified and edited by <strong className="text-slate-800">{contributorName}</strong> and officially approved by <strong className="text-slate-800">{reviewerName}</strong>.
          </p>
          <div className="pt-2 flex items-center gap-4 text-[11px] text-slate-500 font-medium">
            <span className="flex items-center gap-1 text-slate-600">
              <Sparkles className="w-3 h-3 text-purple-600" /> AI Assisted
            </span>
            <span>•</span>
            <span className="flex items-center gap-1 text-slate-600">
              <UserCheck className="w-3 h-3 text-sky-600" /> Expert Verified
            </span>
            <span>•</span>
            <span className="flex items-center gap-1 text-emerald-700">
              <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Admin Approved
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
