import React, { useState } from 'react';
import { store } from '../../services/storage';
import { refineContent } from '../../services/aiService';
import { ContentDraft, User } from '../../types';
import { StatusBadge } from '../../components/common/StatusBadge';
import {
  FileText,
  Sparkles,
  Send,
  Save,
  CheckCircle2,
  Eye,
  ArrowLeft,
  Wand2,
  FileCheck,
  RefreshCw,
  Sliders,
  AlertCircle,
  HelpCircle,
  Download,
  Image as ImageIcon,
  Share2
} from 'lucide-react';

interface ContentEditorPageProps {
  draftId: string;
  currentUser: User;
  onNavigate: (route: string) => void;
}

export const ContentEditorPage: React.FC<ContentEditorPageProps> = ({
  draftId,
  currentUser,
  onNavigate
}) => {
  const draft = store.getDraftById(draftId) || store.getDrafts()[0];
  const resource = store.getResourceById(draft.resourceId);

  // Form Fields
  const [title, setTitle] = useState(draft.title);
  const [summary, setSummary] = useState(draft.summary);
  const [body, setBody] = useState(draft.body);
  const [keywords, setKeywords] = useState(draft.keywords.join(', '));
  const [imageCaption, setImageCaption] = useState(draft.imageCaption || '');
  const [socialMediaText, setSocialMediaText] = useState(draft.socialMediaText || '');
  const [revisionNotes, setRevisionNotes] = useState(draft.revisionNotes || '');

  // UI state
  const [activeTab, setActiveTab] = useState<'editor' | 'preview'>('editor');
  const [saveSuccessMsg, setSaveSuccessMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [refiningAction, setRefiningAction] = useState<string | null>(null);

  const handleRefine = (action: 'simplify' | 'expand' | 'shorten' | 'clarity') => {
    setRefiningAction(action);
    setTimeout(() => {
      const refined = refineContent(body, action);
      setBody(refined);
      setRefiningAction(null);
    }, 500);
  };

  const handleSaveDraft = () => {
    const updatedKeywords = keywords.split(',').map((k) => k.trim()).filter(Boolean);
    const wasApprovedOrPublished =
      draft.status === 'APPROVED' ||
      draft.status === 'READY_TO_PUBLISH' ||
      draft.status === 'PUBLISHED';

    const newStatus = wasApprovedOrPublished ? 'REQUIRES_REAPPROVAL' : 'READY_FOR_EDITING';

    store.updateDraft(
      draft.id,
      {
        title,
        summary,
        body,
        keywords: updatedKeywords,
        imageCaption,
        socialMediaText,
        revisionNotes,
        editedByContributor: true,
        status: newStatus
      },
      currentUser.name
    );

    if (wasApprovedOrPublished) {
      setSaveSuccessMsg('Modifications saved. Per governance protocol, this item now Requires Re-approval.');
    } else {
      setSaveSuccessMsg('Draft saved successfully.');
    }
    setTimeout(() => setSaveSuccessMsg(''), 4000);
  };

  const handleSubmitForReview = () => {
    setIsSubmitting(true);
    const updatedKeywords = keywords.split(',').map((k) => k.trim()).filter(Boolean);

    store.updateDraft(draft.id, {
      title,
      summary,
      body,
      keywords: updatedKeywords,
      imageCaption,
      socialMediaText,
      revisionNotes,
      editedByContributor: true,
      status: 'UNDER_REVIEW'
    });

    setTimeout(() => {
      setIsSubmitting(false);
      onNavigate('/workspace/reviews');
    }, 400);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Top Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate('/workspace')}
            className="p-2 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase font-bold tracking-wider text-purple-700 bg-purple-50 px-2.5 py-0.5 rounded-full border border-purple-200">
                AI-Assisted Draft
              </span>
              <StatusBadge status={draft.status} />
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight mt-1">
              Scientific Content Editor
            </h1>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2.5">
          {saveSuccessMsg && (
            <span className="text-xs text-emerald-600 font-medium flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4" /> {saveSuccessMsg}
            </span>
          )}

          <button
            onClick={handleSaveDraft}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 text-xs font-semibold shadow-2xs transition"
          >
            <Save className="w-4 h-4 text-slate-500" />
            <span>Save Draft</span>
          </button>

          <button
            disabled={isSubmitting}
            onClick={handleSubmitForReview}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-sky-950 text-white text-xs font-bold shadow-md transition transform active:scale-95"
          >
            <Send className="w-4 h-4 text-sky-400" />
            <span>{isSubmitting ? 'Submitting...' : 'Submit for Admin Review'}</span>
          </button>
        </div>
      </div>

      {/* Safety & Validation Indicator */}
      <div className="p-4 rounded-2xl bg-purple-50/80 border border-purple-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-purple-950">
        <div className="flex items-center gap-2.5">
          <Sparkles className="w-5 h-5 text-purple-600 shrink-0" />
          <div>
            <p className="font-bold">Human Verification Mandatory</p>
            <p className="text-purple-800 text-[11px]">
              “AI-assisted draft — requires human review before publication.” The AI does not publish directly. You have full editorial authority to verify technical metrics.
            </p>
          </div>
        </div>
        <span className="text-[11px] font-mono text-purple-700 bg-purple-100 px-2.5 py-1 rounded-md shrink-0">
          Model: {draft.aiModel || 'Gemini Polar Synthesis'}
        </span>
      </div>

      {/* Previous Review Feedback Callout if Needs Changes */}
      {draft.status === 'NEEDS_CHANGES' && draft.reviewerComments && (
        <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-950 text-xs space-y-1">
          <div className="flex items-center gap-2 font-bold text-rose-900">
            <AlertCircle className="w-4 h-4 text-rose-600" />
            <span>Feedback from Administrator ({draft.reviewerName || 'Dr. Sunita Rao'}):</span>
          </div>
          <p className="pl-6 text-rose-800 italic">
            "{draft.reviewerComments}"
          </p>
        </div>
      )}

      {/* Main 3-Column Layout (Desktop) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Source Material & Files (Col 3) */}
        <div className="lg:col-span-3 bg-white rounded-2xl border border-slate-200 p-5 space-y-4 text-xs shadow-xs">
          <div className="pb-2 border-b border-slate-100 flex items-center justify-between">
            <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-sky-600" />
              Source Material
            </h4>
            <span className="text-[10px] text-slate-400 font-mono">Resource</span>
          </div>

          <div className="space-y-3">
            <div>
              <span className="text-slate-400 block text-[10px] uppercase">Original Title</span>
              <p className="font-semibold text-slate-800 leading-snug">{resource?.title || 'Expedition Report'}</p>
            </div>

            <div>
              <span className="text-slate-400 block text-[10px] uppercase">Domain & Region</span>
              <p className="text-slate-700">{resource?.topic} • {resource?.region}</p>
            </div>

            <div>
              <span className="text-slate-400 block text-[10px] uppercase">Operating Station</span>
              <p className="text-slate-700">{resource?.stationOrVessel || 'Bharati Station'}</p>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 space-y-2">
            <span className="text-slate-400 block text-[10px] uppercase font-bold">Attached Artifacts</span>
            {resource?.files && resource.files.length > 0 ? (
              resource.files.map((file) => (
                <div
                  key={file.id}
                  className="p-2 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-2 text-[11px]"
                >
                  <div className="truncate">
                    <p className="font-medium text-slate-800 truncate">{file.filename}</p>
                    <p className="text-[10px] text-slate-500">{file.sizeMb} MB • {file.fileType.toUpperCase()}</p>
                  </div>
                  <a
                    href={file.url}
                    target="_blank"
                    rel="noreferrer"
                    className="p-1 text-slate-400 hover:text-sky-600"
                    title="View file"
                  >
                    <Eye className="w-3.5 h-3.5" />
                  </a>
                </div>
              ))
            ) : (
              <p className="text-slate-400 italic">Primary expedition PDF attached.</p>
            )}
          </div>
        </div>

        {/* Center Column: The Content Editor (Col 5) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-xs space-y-4 text-xs">
            {/* AI Refinement Toolbar */}
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="flex items-center justify-between text-slate-700">
                <span className="font-bold flex items-center gap-1.5 text-[11px] text-slate-800">
                  <Wand2 className="w-3.5 h-3.5 text-purple-600" />
                  AI Refinement Actions:
                </span>
                <span className="text-[10px] text-slate-400">Click to apply transformation</span>
              </div>
              <div className="flex items-center gap-1.5 flex-wrap">
                <button
                  type="button"
                  onClick={() => handleRefine('simplify')}
                  disabled={!!refiningAction}
                  className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-slate-700 hover:bg-purple-50 hover:text-purple-800 transition text-[11px] font-medium"
                >
                  Simplify for Public
                </button>
                <button
                  type="button"
                  onClick={() => handleRefine('expand')}
                  disabled={!!refiningAction}
                  className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-slate-700 hover:bg-purple-50 hover:text-purple-800 transition text-[11px] font-medium"
                >
                  Expand Scientific Detail
                </button>
                <button
                  type="button"
                  onClick={() => handleRefine('shorten')}
                  disabled={!!refiningAction}
                  className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-slate-700 hover:bg-purple-50 hover:text-purple-800 transition text-[11px] font-medium"
                >
                  Shorten Summary
                </button>
                <button
                  type="button"
                  onClick={() => handleRefine('clarity')}
                  disabled={!!refiningAction}
                  className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-slate-700 hover:bg-purple-50 hover:text-purple-800 transition text-[11px] font-medium"
                >
                  Improve Clarity
                </button>
              </div>
            </div>

            {/* Title Field */}
            <div className="space-y-1">
              <label className="font-bold text-slate-800 block">
                {draft.contentType === 'Social Media Content'
                  ? 'Social Outreach Title / Campaign'
                  : draft.contentType === 'Media Caption'
                  ? 'Archival Media Documentation Title'
                  : 'Website Article Title'}
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm font-semibold text-slate-900 focus:border-sky-500"
              />
            </div>

            {/* Summary Field */}
            <div className="space-y-1">
              <label className="font-bold text-slate-800 block">
                {draft.contentType === 'Social Media Content'
                  ? 'Social Media Lead / Synopsis'
                  : draft.contentType === 'Media Caption'
                  ? 'Primary Public Display Caption'
                  : 'Executive Scientific Summary'}
              </label>
              <textarea
                rows={3}
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 focus:border-sky-500 leading-relaxed font-serif"
              />
            </div>

            {/* Body Field */}
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <label className="font-bold text-slate-800 block">
                  {draft.contentType === 'Social Media Content'
                    ? 'Multi-Channel Social Copy (X / LinkedIn / Instagram)'
                    : draft.contentType === 'Media Caption'
                    ? 'Contextual Backstory & Attribution'
                    : 'Article Body (Markdown Supported)'}
                </label>
                <span className="text-[10px] text-slate-400">Editable by Contributor</span>
              </div>
              <textarea
                rows={12}
                value={body}
                onChange={(e) => setBody(e.target.value)}
                className="w-full p-3 rounded-xl border border-slate-300 text-xs text-slate-900 font-mono leading-relaxed focus:border-sky-500"
              />
            </div>

            {/* Image Caption & Social Copy */}
            <div className="space-y-3 pt-2 border-t border-slate-100">
              <div>
                <label className="font-bold text-slate-800 block mb-1">
                  Catalog Caption & Alt-Text
                </label>
                <input
                  type="text"
                  value={imageCaption}
                  onChange={(e) => setImageCaption(e.target.value)}
                  className="w-full p-2 rounded-xl border border-slate-300 text-xs text-slate-900"
                />
              </div>

              <div>
                <label className="font-bold text-slate-800 block mb-1">
                  Social Media Dissemination Text (X / LinkedIn)
                </label>
                <textarea
                  rows={2}
                  value={socialMediaText}
                  onChange={(e) => setSocialMediaText(e.target.value)}
                  className="w-full p-2 rounded-xl border border-slate-300 text-xs text-slate-900"
                />
              </div>

              <div>
                <label className="font-bold text-slate-800 block mb-1">
                  Taxonomy Keywords
                </label>
                <input
                  type="text"
                  value={keywords}
                  onChange={(e) => setKeywords(e.target.value)}
                  className="w-full p-2 rounded-xl border border-slate-300 text-xs text-slate-900"
                />
              </div>

              <div>
                <label className="font-bold text-slate-800 block mb-1">
                  Contributor Revision Notes for Administrator
                </label>
                <input
                  type="text"
                  value={revisionNotes}
                  onChange={(e) => setRevisionNotes(e.target.value)}
                  placeholder="e.g. Verified borehole isotopic metrics with Goa cold lab logs."
                  className="w-full p-2 rounded-xl border border-slate-300 text-xs text-slate-900"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Live Reader Preview (Col 4) */}
        <div className="lg:col-span-4 bg-slate-50 rounded-2xl border border-slate-200 p-5 space-y-4 text-xs shadow-xs sticky top-20 max-h-[85vh] overflow-y-auto">
          <div className="flex items-center justify-between pb-2 border-b border-slate-200">
            <span className="font-bold uppercase tracking-wider text-[11px] text-slate-700 flex items-center gap-1.5">
              <Eye className="w-3.5 h-3.5 text-sky-600" />
              Live Reader Preview
            </span>
            <span className="text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 font-semibold">
              Public Preview
            </span>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-4 space-y-3 shadow-2xs">
            <div className="flex items-center gap-2">
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-sky-100 text-sky-800">
                {draft.contentType}
              </span>
              <span className="text-[10px] text-slate-400 font-mono">4 min read</span>
            </div>

            <h3 className="text-sm font-bold text-slate-900 leading-snug">
              {title || 'Untitled Draft'}
            </h3>

            <p className="text-xs text-slate-700 font-serif leading-relaxed italic bg-slate-50 p-2.5 rounded-lg border border-slate-100">
              {summary || 'Summary placeholder...'}
            </p>

            <div className="text-xs text-slate-600 space-y-2 max-h-56 overflow-y-auto pr-1">
              {body ? (
                body.split('\n\n').slice(0, 3).map((p, i) => (
                  <p key={i} className="line-clamp-4 leading-relaxed">
                    {p.replace(/###/g, '')}
                  </p>
                ))
              ) : (
                <p className="text-slate-400 italic">Body preview will appear here...</p>
              )}
            </div>

            <div className="pt-2 border-t border-slate-100 text-[11px] text-slate-500">
              <span>Author: <strong>{currentUser.name}</strong></span>
            </div>
          </div>

          {/* Verification Badge Reminder */}
          <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-[11px] space-y-1">
            <p className="font-bold flex items-center gap-1">
              <FileCheck className="w-3.5 h-3.5 text-emerald-600" />
              Upon Administrator Approval:
            </p>
            <p className="text-slate-600">
              This article will be automatically awarded the <strong>Verified Institutional Content</strong> seal and published directly into the public knowledge portal.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
