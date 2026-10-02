import React, { useState } from 'react';
import { ContentDraft } from '../../types';
import { AlertTriangle, Send, X } from 'lucide-react';

interface RequestChangesModalProps {
  isOpen: boolean;
  draft?: ContentDraft;
  contributorName?: string;
  onClose: () => void;
  onSubmit?: (comments: string) => void;
  onConfirm?: (comments: string) => void;
}

export const RequestChangesModal: React.FC<RequestChangesModalProps> = ({
  isOpen,
  draft,
  contributorName,
  onClose,
  onSubmit,
  onConfirm
}) => {
  const [comment, setComment] = useState('');
  const [quickReason, setQuickReason] = useState<string>('');

  if (!isOpen) return null;

  const quickReasons = [
    'Clarify ice core drill depth and dating methodology.',
    'Add missing citations for satellite radar backscatter validation.',
    'Simplify technical jargon in the abstract for student readers.',
    'Include coordinates and station baseline instrument details.'
  ];

  const handleApplyQuickReason = (reason: string) => {
    setQuickReason(reason);
    setComment((prev) => (prev ? `${prev}\n• ${reason}` : reason));
  };

  const handleSubmit = () => {
    if (!comment.trim()) return;
    const cb = onSubmit || onConfirm;
    if (cb) {
      cb(comment);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-fadeIn">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="bg-rose-900 p-5 text-white flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-white/10 text-rose-200 border border-white/20">
              <AlertTriangle className="w-6 h-6 text-rose-300" />
            </div>
            <div>
              <h3 className="text-base font-bold">Request Content Revisions</h3>
              <p className="text-xs text-rose-200 mt-0.5">
                Send feedback to {contributorName || draft?.contributorName || 'contributor'} for modification
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-rose-300 hover:text-white hover:bg-rose-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <div className="p-5 space-y-4 text-xs">
          <div>
            <span className="text-slate-400 font-medium">Reviewing draft:</span>
            <h4 className="text-sm font-semibold text-slate-900 mt-0.5">{draft?.title || 'Outreach Content Draft'}</h4>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-800 block mb-1.5">
              Quick Feedback Prompts:
            </label>
            <div className="space-y-1.5">
              {quickReasons.map((qr) => (
                <button
                  key={qr}
                  type="button"
                  onClick={() => handleApplyQuickReason(qr)}
                  className="w-full text-left p-2 rounded-lg bg-slate-100 hover:bg-sky-50 hover:text-sky-900 text-slate-700 text-[11px] border border-slate-200 transition"
                >
                  + {qr}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-800 block mb-1">
              Detailed Revision Instructions for Contributor:
            </label>
            <textarea
              rows={4}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Describe the changes required (e.g. Please verify the borehole temperature readings on page 3 and reword the public conclusion)..."
              className="w-full rounded-xl border border-slate-300 p-3 text-xs text-slate-800 placeholder-slate-400 focus:border-rose-500 focus:ring-1 focus:ring-rose-500"
            />
          </div>

          <p className="text-[11px] text-slate-500">
            The contributor will be notified on their dashboard with the status <strong>Needs Changes</strong> and can resubmit after revising.
          </p>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-medium text-slate-600 hover:bg-slate-200 transition"
          >
            Cancel
          </button>
          <button
            disabled={!comment.trim()}
            onClick={handleSubmit}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-white transition ${
              comment.trim()
                ? 'bg-rose-600 hover:bg-rose-700'
                : 'bg-slate-400 cursor-not-allowed opacity-70'
            }`}
          >
            <Send className="w-3.5 h-3.5" />
            <span>Send Revision Request</span>
          </button>
        </div>
      </div>
    </div>
  );
};
