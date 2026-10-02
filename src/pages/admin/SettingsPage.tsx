import React, { useState } from 'react';
import { store } from '../../services/storage';
import { Settings, Shield, Sliders, CheckCircle2, RotateCcw, Sparkles } from 'lucide-react';

interface SettingsPageProps {
  onNavigate: (route: string) => void;
}

export const SettingsPage: React.FC<SettingsPageProps> = ({ onNavigate }) => {
  const [allowAiDrafts, setAllowAiDrafts] = useState(true);
  const [requireAdminApproval, setRequireAdminApproval] = useState(true);
  const [enforceTreatyChecklist, setEnforceTreatyChecklist] = useState(true);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = () => {
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  const handleResetData = () => {
    store.resetAllToDefault();
    setSavedSuccess(true);
    setTimeout(() => {
      onNavigate('/admin/dashboard');
    }, 500);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="pb-4 border-b border-slate-200">
        <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
          <Settings className="w-4 h-4 text-slate-600" />
          <span>Institutional Configuration</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Repository Governance & System Settings
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
          Configure workflow validation gates, AI prompt pipelines, and international treaty compliance flags.
        </p>
      </div>

      {savedSuccess && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-medium flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>Governance settings updated successfully.</span>
        </div>
      )}

      {/* Policy Settings Card */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-xs text-xs">
        <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
          <Shield className="w-4 h-4 text-sky-600" />
          <span>Publishing Integrity & Human Validation Gates</span>
        </h3>

        <div className="space-y-4 divide-y divide-slate-100">
          <div className="pt-3 flex items-start justify-between gap-4">
            <div>
              <h4 className="font-bold text-slate-900 text-sm">Enforce Mandatory Administrator Review</h4>
              <p className="text-slate-500 mt-0.5">
                Prohibit direct publication by contributors or AI assistants. All content requires certified administrator approval.
              </p>
            </div>
            <input
              type="checkbox"
              checked={requireAdminApproval}
              disabled
              className="mt-1 rounded text-sky-600 focus:ring-sky-500 h-4 w-4"
            />
          </div>

          <div className="pt-4 flex items-start justify-between gap-4">
            <div>
              <h4 className="font-bold text-slate-900 text-sm">Enable AI-Assisted Synthesis Pipeline</h4>
              <p className="text-slate-500 mt-0.5">
                Permit authorized contributors to auto-generate summaries, public articles, and educational briefs from uploaded raw PDF reports.
              </p>
            </div>
            <input
              type="checkbox"
              checked={allowAiDrafts}
              onChange={(e) => setAllowAiDrafts(e.target.checked)}
              className="mt-1 rounded text-sky-600 focus:ring-sky-500 h-4 w-4"
            />
          </div>

          <div className="pt-4 flex items-start justify-between gap-4">
            <div>
              <h4 className="font-bold text-slate-900 text-sm">Antarctic Treaty & Open Science Compliance Check</h4>
              <p className="text-slate-500 mt-0.5">
                Require reviewers to confirm SCAR (Scientific Committee on Antarctic Research) metadata standards prior to publishing.
              </p>
            </div>
            <input
              type="checkbox"
              checked={enforceTreatyChecklist}
              onChange={(e) => setEnforceTreatyChecklist(e.target.checked)}
              className="mt-1 rounded text-sky-600 focus:ring-sky-500 h-4 w-4"
            />
          </div>
        </div>

        <div className="pt-4 border-t border-slate-100 flex items-center justify-end">
          <button
            onClick={handleSave}
            className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-sky-950 text-white font-bold text-xs shadow-md transition"
          >
            Save Policy Configurations
          </button>
        </div>
      </div>

      {/* Prototype Reset Controls */}
      <div className="bg-rose-50/60 rounded-3xl border border-rose-200 p-6 space-y-3 text-xs">
        <h3 className="font-bold text-rose-900 text-sm flex items-center gap-1.5">
          <RotateCcw className="w-4 h-4 text-rose-600" />
          <span>Demo Data Maintenance</span>
        </h3>
        <p className="text-rose-700 leading-relaxed">
          Need to present from the beginning? Clicking reset will restore the database to its pristine demo state, restoring sample Antarctic ice core reports and Arctic IndARC records.
        </p>
        <button
          onClick={handleResetData}
          className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-semibold transition shadow-xs"
        >
          Reset Demo Data to Default
        </button>
      </div>
    </div>
  );
};
