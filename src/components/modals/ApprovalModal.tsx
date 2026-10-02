import React, { useState } from 'react';
import { ContentDraft, Resource } from '../../types';
import {
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  UserCheck,
  FileText,
  X
} from 'lucide-react';

interface ApprovalModalProps {
  isOpen: boolean;
  draft: ContentDraft;
  resource?: Resource;
  onClose: () => void;
  onConfirmApprove?: (comments?: string) => void;
  onConfirm?: (comments?: string) => void;
}

export const ApprovalModal: React.FC<ApprovalModalProps> = ({
  isOpen,
  draft,
  resource,
  onClose,
  onConfirmApprove,
  onConfirm
}) => {
  const [comments, setComments] = useState('');
  const [checkAccuracy, setCheckAccuracy] = useState(true);
  const [checkTreaty, setCheckTreaty] = useState(true);
  const [checkLanguage, setCheckLanguage] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const allChecked = checkAccuracy && checkTreaty && checkLanguage;

  const handleApprove = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      const cb = onConfirmApprove || onConfirm;
      if (cb) {
        cb(comments || 'Reviewed and verified against expedition primary data.');
      }
      setIsSubmitting(false);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-fadeIn">
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-950 via-slate-900 to-sky-950 p-5 text-white flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-bold tracking-tight">
                Approve Scientific Outreach Draft
              </h3>
              <p className="text-xs text-sky-200/80 mt-0.5">
                Peer Review Sign-off · Moves to Publishing Center (Ready to Publish)
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Details Summary */}
        <div className="p-5 space-y-4 max-h-[75vh] overflow-y-auto text-xs">
          <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-3.5 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-sky-100 text-sky-800">
                {draft.contentType}
              </span>
              <span className="text-[11px] text-slate-500 font-mono">
                ID: {draft.id}
              </span>
            </div>

            <h4 className="text-sm font-semibold text-slate-900 leading-snug">
              {draft.title}
            </h4>

            <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-600 pt-1 border-t border-slate-200/60">
              <div>
                <span className="text-slate-400">Contributor: </span>
                <strong className="text-slate-800">{draft.contributorName}</strong>
              </div>
              <div>
                <span className="text-slate-400">Target Audience: </span>
                <strong className="text-slate-800">{draft.targetAudience}</strong>
              </div>
              <div>
                <span className="text-slate-400">Source Resource: </span>
                <strong className="text-slate-800">{resource?.title || 'Expedition Report'}</strong>
              </div>
              <div>
                <span className="text-slate-400">Last Modified: </span>
                <strong className="text-slate-800">{new Date(draft.updatedAt).toLocaleDateString()}</strong>
              </div>
            </div>

            {/* AI assisted badge */}
            <div className="flex items-center gap-2 p-2 rounded-lg bg-purple-50 text-purple-800 text-[11px] border border-purple-200">
              <Sparkles className="w-3.5 h-3.5 text-purple-600 shrink-0" />
              <span>
                AI-assisted draft verified & revised by authorized contributor. Ready for institutional release.
              </span>
            </div>
          </div>

          {/* Verification Checklist */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-900 block">
              Institutional Reviewer Compliance Checklist:
            </label>
            <div className="space-y-2 bg-white rounded-xl border border-slate-200 p-3">
              <label className="flex items-start gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={checkAccuracy}
                  onChange={(e) => setCheckAccuracy(e.target.checked)}
                  className="mt-0.5 rounded text-sky-600 focus:ring-sky-500"
                />
                <span className="text-slate-700 leading-tight">
                  <strong>Scientific Factual Rigor:</strong> Data figures, dates, station locations, and scientific methodologies match verified expedition logs.
                </span>
              </label>

              <label className="flex items-start gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={checkTreaty}
                  onChange={(e) => setCheckTreaty(e.target.checked)}
                  className="mt-0.5 rounded text-sky-600 focus:ring-sky-500"
                />
                <span className="text-slate-700 leading-tight">
                  <strong>Environmental & Treaty Compliance:</strong> Compliant with Antarctic Treaty System (ATS) and Svalbard Open Science mandates.
                </span>
              </label>

              <label className="flex items-start gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={checkLanguage}
                  onChange={(e) => setCheckLanguage(e.target.checked)}
                  className="mt-0.5 rounded text-sky-600 focus:ring-sky-500"
                />
                <span className="text-slate-700 leading-tight">
                  <strong>Public Accessibility:</strong> Language is clear, dignified, engaging, and accurately communicates scientific uncertainty without sensationalism.
                </span>
              </label>
            </div>
          </div>

          {/* Optional Reviewer Endorsement Note */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-900 block">
              Reviewer Endorsement / Archival Note (Optional):
            </label>
            <textarea
              rows={2}
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              placeholder="e.g. Meticulously edited. Approved for public portal and educational outreach."
              className="w-full rounded-xl border border-slate-300 p-2.5 text-xs text-slate-800 placeholder-slate-400 focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
            />
          </div>

          <div className="p-3.5 rounded-xl bg-indigo-50 border border-indigo-200 text-indigo-900 flex items-start gap-2.5">
            <ShieldCheck className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
            <div className="space-y-0.5">
              <span className="font-bold text-[11px] uppercase tracking-wider block text-indigo-950">
                Governance Principle: Approve ≠ Publish Everywhere
              </span>
              <p className="text-[11px] text-indigo-800 leading-relaxed">
                Approving this item marks it as <strong>Ready to Publish</strong> and routes it to the <strong>Publishing Center</strong>. Publication to the Public Portal or Social Media channels is performed as a separate final action.
              </p>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-medium text-slate-600 hover:bg-slate-200 transition"
          >
            Cancel
          </button>

          <button
            disabled={!allChecked || isSubmitting}
            onClick={handleApprove}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold text-white shadow-md transition ${
              allChecked && !isSubmitting
                ? 'bg-indigo-600 hover:bg-indigo-700 cursor-pointer'
                : 'bg-slate-400 cursor-not-allowed opacity-70'
            }`}
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>{isSubmitting ? 'Approving...' : 'Confirm Approval (Ready to Publish)'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
