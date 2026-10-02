import React, { useState } from 'react';
import { store } from '../../services/storage';
import { ContentDraft, Resource, User } from '../../types';
import { StatusBadge } from '../../components/common/StatusBadge';
import { ApprovalModal } from '../../components/modals/ApprovalModal';
import { RequestChangesModal } from '../../components/modals/RequestChangesModal';
import {
  ArrowLeft,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  FileText,
  Sparkles,
  UserCheck,
  Save,
  Download,
  Eye,
  Database,
  Calendar,
  MapPin,
  ExternalLink,
  MessageSquare,
  XCircle,
  X
} from 'lucide-react';

interface ReviewDetailPageProps {
  draftId: string;
  currentUser: User;
  onNavigate: (route: string) => void;
}

export const ReviewDetailPage: React.FC<ReviewDetailPageProps> = ({
  draftId,
  currentUser,
  onNavigate
}) => {
  const draft =
    store.getDraftById(draftId) ||
    store.getDrafts().find((d) => d.status === 'UNDER_REVIEW') ||
    store.getDrafts()[0];
  const resource = store.getResourceById(draft.resourceId);

  // Editable admin fields
  const [editedTitle, setEditedTitle] = useState(draft.title);
  const [editedSummary, setEditedSummary] = useState(draft.summary);
  const [editedBody, setEditedBody] = useState(draft.body);
  const [adminNotes, setAdminNotes] = useState(draft.reviewerComments || '');

  // Modals
  const [showApprovalModal, setShowApprovalModal] = useState(false);
  const [showRequestChangesModal, setShowRequestChangesModal] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [rejectReason, setRejectReason] = useState('Does not comply with national polar science communications protocol or requires complete resynthesis.');
  const [feedbackToast, setFeedbackToast] = useState<{ message: string; type: 'success' | 'warning' } | null>(null);

  const handleSaveChanges = () => {
    store.updateDraft(draft.id, {
      title: editedTitle,
      summary: editedSummary,
      body: editedBody,
      reviewerComments: adminNotes
    });
    setFeedbackToast({ message: 'Editorial corrections saved successfully.', type: 'success' });
    setTimeout(() => setFeedbackToast(null), 3000);
  };

  const handleConfirmApproval = (endorsement?: string) => {
    store.approveDraft(
      draft.id,
      currentUser.id,
      currentUser.name,
      endorsement || adminNotes || 'Verified against primary field logs. Approved for dissemination.'
    );
    setShowApprovalModal(false);
    setFeedbackToast({
      message: 'Draft approved! Marked as "Ready to Publish" in the Publishing Center.',
      type: 'success'
    });

    setTimeout(() => {
      onNavigate('/admin/publishing');
    }, 1200);
  };

  const handleConfirmRequestChanges = (comment: string) => {
    store.requestChangesOnDraft(draft.id, currentUser.id, currentUser.name, comment);
    setShowRequestChangesModal(false);
    setFeedbackToast({ message: `Revision request sent to ${draft.contributorName}. Status: Needs Changes.`, type: 'warning' });

    setTimeout(() => {
      onNavigate('/admin/reviews');
    }, 1200);
  };

  const handleConfirmReject = () => {
    store.rejectDraft(draft.id, currentUser.id, currentUser.name, rejectReason);
    setShowRejectModal(false);
    setFeedbackToast({ message: `Draft has been rejected and archived.`, type: 'warning' });

    setTimeout(() => {
      onNavigate('/admin/reviews');
    }, 1200);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Toast Notification */}
      {feedbackToast && (
        <div
          className={`fixed top-20 right-6 z-50 p-4 rounded-xl text-white shadow-xl flex items-center gap-3 text-xs sm:text-sm animate-fadeIn ${
            feedbackToast.type === 'success' ? 'bg-emerald-600' : 'bg-amber-600'
          }`}
        >
          {feedbackToast.type === 'success' ? <CheckCircle2 className="w-5 h-5" /> : <AlertTriangle className="w-5 h-5" />}
          <span>{feedbackToast.message}</span>
        </div>
      )}

      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate('/admin/reviews')}
            className="p-2 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition"
            title="Return to Review Queue"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase font-bold tracking-wider text-sky-800">
                Editorial Review & Verification
              </span>
              <span className="text-slate-300">·</span>
              <StatusBadge status={draft.status} />
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight mt-0.5">
              Review Draft: {draft.title}
            </h1>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2.5 flex-wrap">
          <button
            onClick={handleSaveChanges}
            className="px-3.5 py-2 rounded-xl border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 text-xs font-semibold shadow-2xs transition flex items-center gap-1.5"
          >
            <Save className="w-3.5 h-3.5 text-slate-500" />
            <span>Save Edits</span>
          </button>

          <button
            onClick={() => setShowRequestChangesModal(true)}
            className="px-3.5 py-2 rounded-xl border border-amber-300 bg-amber-50 text-amber-800 hover:bg-amber-100 text-xs font-semibold transition flex items-center gap-1.5"
          >
            <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
            <span>Request Changes</span>
          </button>

          <button
            onClick={() => setShowRejectModal(true)}
            className="px-3.5 py-2 rounded-xl border border-rose-300 bg-rose-50 text-rose-700 hover:bg-rose-100 text-xs font-semibold transition flex items-center gap-1.5"
          >
            <XCircle className="w-3.5 h-3.5 text-rose-600" />
            <span>Reject</span>
          </button>

          <button
            onClick={() => setShowApprovalModal(true)}
            className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md transition active:scale-95 flex items-center gap-2"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Approve & Publish</span>
          </button>
        </div>
      </div>

      {/* 6-Point Review Verification Manifest */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 text-xs">
        <div>
          <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">Scientist / Author</span>
          <span className="font-bold text-slate-900 truncate block mt-0.5">{draft.contributorName}</span>
        </div>
        <div>
          <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">Source Resource</span>
          <span className="font-bold text-sky-900 truncate block mt-0.5">{resource?.id || draft.resourceId}</span>
        </div>
        <div>
          <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">Content Type</span>
          <span className="font-semibold text-slate-800 block mt-0.5">{draft.contentType}</span>
        </div>
        <div>
          <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">Submission Date</span>
          <span className="font-medium text-slate-800 block mt-0.5">
            {new Date(draft.updatedAt || draft.createdAt).toLocaleDateString()}
          </span>
        </div>
        <div>
          <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">Target Audience</span>
          <span className="font-medium text-slate-800 block mt-0.5">{draft.targetAudience}</span>
        </div>
        <div>
          <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">Review Status</span>
          <div className="mt-0.5"><StatusBadge status={draft.status} /></div>
        </div>
      </div>

      {/* Two Column Layout: SECTION 1 (Source Resource) + SECTION 2 (Derived Outreach Draft) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* SECTION 1: ORIGINAL SCIENTIFIC RESOURCE (Left 4 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <Database className="w-4 h-4 text-sky-600" />
                <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Original Source Resource
                </h2>
              </div>
              {resource && (
                <button
                  onClick={() => onNavigate(`/repository/${resource.id}`)}
                  className="text-[11px] font-semibold text-sky-700 hover:underline flex items-center gap-1"
                >
                  <span>Repository View</span>
                  <ExternalLink className="w-3 h-3" />
                </button>
              )}
            </div>

            {resource ? (
              <div className="space-y-3 text-xs">
                <div>
                  <span className="font-mono text-[10px] text-sky-800 bg-sky-50 px-2 py-0.5 rounded border border-sky-200 font-bold">
                    {resource.id}
                  </span>
                  <h3 className="font-bold text-slate-900 text-sm mt-1">{resource.title}</h3>
                  <p className="text-slate-600 text-[11px] mt-1 leading-relaxed">
                    {resource.description}
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-2 text-[11px]">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Domain / Type:</span>
                    <span className="font-semibold text-slate-800">{resource.topic} ({resource.type})</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Region:</span>
                    <span className="font-medium text-slate-800">{resource.region} ({resource.year})</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Researchers:</span>
                    <span className="font-medium text-slate-800 truncate max-w-[180px]">{resource.researchers.join(', ')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Repository Status:</span>
                    <span className="font-semibold text-emerald-700">{resource.status}</span>
                  </div>
                </div>

                {/* Attached Files List */}
                <div className="space-y-2 pt-2">
                  <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block">
                    Preserved Source Files ({resource.files.length}):
                  </span>
                  <div className="space-y-1.5">
                    {resource.files.map((f) => (
                      <div
                        key={f.id}
                        className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-200 text-[11px]"
                      >
                        <div className="flex items-center gap-2 min-w-0">
                          <FileText className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                          <span className="truncate font-medium text-slate-800">{f.filename}</span>
                        </div>
                        <span className="font-mono text-slate-400 shrink-0 ml-2">{f.sizeMb} MB</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-xs text-slate-500">Resource information not found.</p>
            )}
          </div>

          {/* AI Synthesis Traceability Card */}
          <div className="bg-sky-50/70 rounded-2xl border border-sky-200 p-5 text-xs text-slate-700 space-y-2">
            <div className="flex items-center gap-2 font-semibold text-sky-950">
              <Sparkles className="w-4 h-4 text-sky-600" />
              <span>AI Transformation Audit Log</span>
            </div>
            <p className="text-[11px] text-slate-600 leading-relaxed">
              {draft.aiPromptSummary || 'Synthesized from source resource under NCPOR scientific outreach guidelines.'}
            </p>
            <div className="pt-1 flex items-center justify-between text-[10px] text-slate-500 font-mono">
              <span>Model: {draft.aiModel || 'Gemini Polar Synthesis v2'}</span>
              <span>Audience: {draft.targetAudience}</span>
            </div>
          </div>
        </div>

        {/* SECTION 2: DERIVED OUTREACH CONTENT (Right 7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
            <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-indigo-600" />
                <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Derived Outreach Content Draft
                </h2>
              </div>
              <span className="text-[11px] text-slate-500">
                Author: <strong>{draft.contributorName}</strong>
              </span>
            </div>

            <div className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="font-semibold text-slate-700 block">
                  Public Headline / Title
                </label>
                <input
                  type="text"
                  value={editedTitle}
                  onChange={(e) => setEditedTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 font-bold text-sm text-slate-900"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-700 block">
                  Executive Scientific Summary
                </label>
                <textarea
                  rows={3}
                  value={editedSummary}
                  onChange={(e) => setEditedSummary(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs text-slate-900 leading-relaxed"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-700 block">
                  Article Body (Markdown Supported)
                </label>
                <textarea
                  rows={14}
                  value={editedBody}
                  onChange={(e) => setEditedBody(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-lg border border-slate-300 text-xs text-slate-900 font-mono leading-relaxed"
                />
              </div>

              <div className="space-y-1 pt-2 border-t border-slate-100">
                <label className="font-semibold text-slate-700 block flex items-center gap-1.5">
                  <MessageSquare className="w-3.5 h-3.5 text-slate-500" />
                  <span>Administrator Review Notes / Endorsement</span>
                </label>
                <textarea
                  rows={2}
                  value={adminNotes}
                  onChange={(e) => setAdminNotes(e.target.value)}
                  placeholder="Add editorial verification notes or specific revision requirements..."
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs text-slate-800"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Approval & Changes Modals */}
      <ApprovalModal
        isOpen={showApprovalModal}
        onClose={() => setShowApprovalModal(false)}
        onConfirm={handleConfirmApproval}
        draft={draft}
        resource={resource}
      />

      <RequestChangesModal
        isOpen={showRequestChangesModal}
        onClose={() => setShowRequestChangesModal(false)}
        onConfirm={handleConfirmRequestChanges}
        contributorName={draft.contributorName}
      />

      {/* Reject Submission Confirmation Modal */}
      {showRejectModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl w-full max-w-md overflow-hidden">
            <div className="p-4 bg-rose-900 text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <XCircle className="w-5 h-5 text-rose-300" />
                <h3 className="text-base font-bold">Reject Outreach Submission</h3>
              </div>
              <button
                onClick={() => setShowRejectModal(false)}
                className="p-1 rounded-lg text-rose-300 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-5 space-y-4 text-xs">
              <p className="text-slate-600 leading-relaxed">
                Are you sure you want to reject this derived outreach piece by{' '}
                <strong>{draft.contributorName}</strong>? The original scientific resource in the repository will remain safely preserved and unaffected.
              </p>

              <div>
                <label className="block text-slate-700 font-bold mb-1">
                  Reason for Rejection
                </label>
                <textarea
                  rows={3}
                  value={rejectReason}
                  onChange={(e) => setRejectReason(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-rose-500 focus:outline-none"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowRejectModal(false)}
                  className="px-4 py-2 rounded-lg border border-slate-300 text-slate-700 font-semibold text-xs hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleConfirmReject}
                  className="px-4 py-2 rounded-lg bg-rose-700 hover:bg-rose-800 text-white font-bold text-xs shadow-xs"
                >
                  Confirm Rejection
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
