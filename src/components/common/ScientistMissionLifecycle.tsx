import React, { useState, useEffect } from 'react';
import { store } from '../../services/storage';
import { ScientistMissionProgress, ExpeditionMilestonePhase, Expedition } from '../../types';
import {
  Compass,
  CheckCircle2,
  Clock,
  Circle,
  Edit3,
  ChevronRight,
  MapPin,
  Calendar,
  Layers,
  ArrowRight,
  Sparkles,
  Shield,
  X,
  ExternalLink,
  Award,
  Globe,
  Radio,
  FileText
} from 'lucide-react';

interface ScientistMissionLifecycleProps {
  userId: string;
  isEditable?: boolean;
  onNavigateExpedition?: (expeditionId: string) => void;
  compact?: boolean;
  className?: string;
  titlePrefix?: string;
}

export const ScientistMissionLifecycle: React.FC<ScientistMissionLifecycleProps> = ({
  userId,
  isEditable = true,
  onNavigateExpedition,
  compact = false,
  className = '',
  titlePrefix
}) => {
  const [mission, setMission] = useState<ScientistMissionProgress>(store.getScientistMission(userId));
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedPhaseNum, setSelectedPhaseNum] = useState<number>(mission.phases[0]?.phaseNumber || 1);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Modal edit states
  const [editStatus, setEditStatus] = useState<'completed' | 'in_progress' | 'upcoming'>('in_progress');
  const [editNotes, setEditNotes] = useState<string>('');
  const [editDate, setEditDate] = useState<string>('');
  const [editLocation, setEditLocation] = useState<string>('');
  const [selectedExpId, setSelectedExpId] = useState<string>(mission.expeditionId);

  const expeditions: Expedition[] = store.getExpeditions();

  useEffect(() => {
    const unsub = store.subscribeToStore(() => {
      setMission(store.getScientistMission(userId));
    });
    return unsub;
  }, [userId]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleOpenEditModal = (phaseNum?: number) => {
    const pNum = phaseNum || mission.phases.find((p) => p.status === 'in_progress')?.phaseNumber || 1;
    setSelectedPhaseNum(pNum);
    const targetPhase = mission.phases.find((p) => p.phaseNumber === pNum);
    if (targetPhase) {
      setEditStatus(targetPhase.status);
      setEditNotes(targetPhase.fieldNotes || '');
      setEditDate(targetPhase.date || '');
      setEditLocation(targetPhase.location || '');
    }
    setSelectedExpId(mission.expeditionId);
    setShowEditModal(true);
  };

  const handleSelectPhaseInModal = (pNum: number) => {
    setSelectedPhaseNum(pNum);
    const targetPhase = mission.phases.find((p) => p.phaseNumber === pNum);
    if (targetPhase) {
      setEditStatus(targetPhase.status);
      setEditNotes(targetPhase.fieldNotes || '');
      setEditDate(targetPhase.date || '');
      setEditLocation(targetPhase.location || '');
    }
  };

  const handleSaveModal = (e: React.FormEvent) => {
    e.preventDefault();
    // If expedition changed, update active expedition first
    if (selectedExpId !== mission.expeditionId) {
      store.setScientistActiveExpedition(userId, selectedExpId);
    }

    const updated = store.updateScientistPhaseStatus(
      userId,
      selectedPhaseNum,
      editStatus,
      editNotes,
      editDate
    );
    setMission(updated);
    setShowEditModal(false);
    showToast(`Updated Phase ${selectedPhaseNum}: marked as ${editStatus.replace('_', ' ')}.`);
  };

  const handleQuickAdvance = () => {
    const updated = store.advanceScientistMissionPhase(userId);
    setMission(updated);
    showToast(`Mission advanced to next phase! Progress: ${updated.overallPercent}%`);
  };

  const handleTogglePublicVisibility = () => {
    const updated = store.updateScientistMission(userId, {
      showInPublicProfile: !mission.showInPublicProfile
    });
    setMission(updated);
    showToast(
      updated.showInPublicProfile
        ? 'Mission lifecycle is now visible on public researcher profile.'
        : 'Mission lifecycle hidden from public profile.'
    );
  };

  const activePhase =
    mission.phases.find((p) => p.status === 'in_progress') ||
    mission.phases.find((p) => p.status === 'upcoming') ||
    mission.phases[mission.phases.length - 1];

  return (
    <div className={`bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-5 relative ${className}`}>
      {/* Toast Feedback */}
      {toastMessage && (
        <div className="absolute top-4 right-4 z-30 px-3.5 py-2 rounded-xl bg-slate-900 text-white text-xs font-semibold shadow-lg border border-slate-700 flex items-center gap-2 animate-fadeIn">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header Bar matching Expedition Detail */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-100 gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] uppercase font-bold tracking-wider text-sky-700">
              {titlePrefix ? `${titlePrefix} · ` : ''}Mission Lifecycle
            </span>
            <span className="text-[10px] font-mono px-2 py-0.2 rounded font-bold bg-sky-50 text-sky-800 border border-sky-200">
              {mission.expeditionNumber || 'POLAR-EXP'}
            </span>
          </div>
          <h3 className="text-base sm:text-lg font-bold text-slate-900 mt-0.5">
            Expedition Phase Progression & Milestones
          </h3>
          <p className="text-xs text-slate-500 flex items-center gap-2 flex-wrap mt-0.5">
            <span className="font-semibold text-slate-700">{mission.expeditionName}</span>
            <span>·</span>
            <span className="text-sky-800 font-medium">{mission.roleInMission}</span>
            <span>·</span>
            <span className="text-slate-500 font-mono text-[11px]">{mission.baseStation}</span>
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          {/* Progress Percent Meter */}
          <div className="text-right">
            <div className="flex items-center gap-2 justify-end">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                Progress
              </span>
              <span className="text-sm font-extrabold text-sky-900">
                {mission.overallPercent}%
              </span>
            </div>
            <div className="w-28 sm:w-36 h-2 bg-slate-100 rounded-full overflow-hidden border border-slate-200 mt-1">
              <div
                className="h-full bg-gradient-to-r from-sky-500 to-emerald-500 transition-all duration-500"
                style={{ width: `${mission.overallPercent}%` }}
              />
            </div>
          </div>

          {/* Action Buttons */}
          {isEditable && (
            <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
              <button
                onClick={() => handleOpenEditModal()}
                className="px-3 py-1.5 rounded-lg bg-sky-50 hover:bg-sky-100 text-sky-900 text-xs font-bold border border-sky-300 transition flex items-center gap-1.5 shadow-2xs"
                title="Update Expedition Phase & Milestones"
              >
                <Edit3 className="w-3.5 h-3.5 text-sky-700" />
                <span className="hidden sm:inline">Update Progress</span>
              </button>

              <button
                onClick={handleQuickAdvance}
                className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition flex items-center gap-1 shadow-xs"
                title="Advance to next phase milestone"
              >
                <span>Advance Phase</span>
                <ChevronRight className="w-3.5 h-3.5 text-amber-400" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Visual Timeline Section matching ExpeditionDetailPage.tsx */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 pt-1">
        {mission.phases.map((step, idx) => (
          <div
            key={step.phaseNumber}
            onClick={() => isEditable && handleOpenEditModal(step.phaseNumber)}
            className={`p-3 rounded-xl border text-xs flex flex-col justify-between transition group select-none ${
              isEditable ? 'cursor-pointer hover:shadow-xs' : ''
            } ${
              step.status === 'completed'
                ? 'bg-emerald-50/70 border-emerald-200 text-emerald-950 hover:border-emerald-300'
                : step.status === 'in_progress'
                ? 'bg-sky-50 border-sky-300 text-sky-950 ring-2 ring-sky-400/60 shadow-xs'
                : 'bg-slate-50/80 border-slate-200 text-slate-500 hover:border-slate-300'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[10px] uppercase font-bold tracking-wider opacity-80">
                  Phase {step.phaseNumber}
                </span>
                {step.status === 'completed' ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                ) : step.status === 'in_progress' ? (
                  <Clock className="w-3.5 h-3.5 text-sky-600 animate-spin shrink-0" />
                ) : (
                  <Circle className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                )}
              </div>

              <h5 className="font-bold leading-tight group-hover:text-sky-950 transition">
                {step.phase}
              </h5>
              <p className="text-[11px] font-semibold opacity-90 mt-1 line-clamp-2 leading-snug">
                {step.title}
              </p>
            </div>

            <div className="mt-3 pt-1.5 border-t border-black/5 text-[10px] flex items-center justify-between opacity-85">
              <span className="font-mono">{step.date}</span>
              <span
                className={`font-semibold capitalize text-[9px] px-1.5 py-0.2 rounded ${
                  step.status === 'completed'
                    ? 'bg-emerald-100/70 text-emerald-800'
                    : step.status === 'in_progress'
                    ? 'bg-sky-100 text-sky-900 font-bold'
                    : 'bg-slate-200/60 text-slate-600'
                }`}
              >
                {step.status.replace('_', ' ')}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Active Phase Details & Telemetry Notes Callout */}
      {activePhase && (
        <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/90 text-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-sky-100 border border-sky-300 flex items-center justify-center text-sky-700 shrink-0 font-bold text-[11px]">
              {activePhase.phaseNumber}
            </div>
            <div>
              <div className="text-[11px] font-bold text-slate-900 flex items-center gap-1.5">
                <span className="text-sky-800 uppercase tracking-wider text-[10px]">
                  Active Milestone:
                </span>
                <span>{activePhase.title}</span>
                <span className="font-normal text-slate-400">({activePhase.date})</span>
              </div>
              <p className="text-slate-600 text-[11px] mt-0.5 line-clamp-1">
                {activePhase.fieldNotes || activePhase.description}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0 text-[11px] text-slate-500">
            {activePhase.location && (
              <span className="flex items-center gap-1 text-slate-600">
                <MapPin className="w-3.5 h-3.5 text-sky-600" />
                <span>{activePhase.location}</span>
              </span>
            )}

            {isEditable && (
              <button
                onClick={handleTogglePublicVisibility}
                className={`px-2 py-1 rounded text-[10px] font-semibold border transition flex items-center gap-1 cursor-pointer ${
                  mission.showInPublicProfile
                    ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                    : 'bg-slate-100 text-slate-600 border-slate-300'
                }`}
                title="Toggle visibility in public Indian Scientists Directory"
              >
                <Globe className="w-3 h-3" />
                <span>{mission.showInPublicProfile ? 'Public Profile: On' : 'Public Profile: Hidden'}</span>
              </button>
            )}

            {onNavigateExpedition && (
              <button
                onClick={() => onNavigateExpedition(mission.expeditionId)}
                className="text-sky-700 hover:text-sky-900 font-bold flex items-center gap-1 hover:underline"
              >
                <span>Expedition Archive →</span>
              </button>
            )}
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* UPDATE EXPEDITION PHASE & MILESTONES MODAL */}
      {/* ======================================================== */}
      {showEditModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl w-full max-w-xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="p-5 bg-slate-900 text-white flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-amber-400">
                  Mission Progress & Milestones
                </span>
                <h3 className="text-base font-bold text-white">
                  Update Expedition Phase Progression
                </h3>
                <p className="text-xs text-slate-300">
                  {mission.userName} · {mission.expeditionName}
                </p>
              </div>
              <button
                onClick={() => setShowEditModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveModal} className="p-5 space-y-4 overflow-y-auto text-xs">
              {/* Expedition Selector */}
              <div>
                <label className="block text-slate-700 font-bold mb-1">
                  Active Expedition / Campaign Assignment
                </label>
                <select
                  value={selectedExpId}
                  onChange={(e) => setSelectedExpId(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs font-semibold focus:ring-2 focus:ring-sky-500 focus:outline-none"
                >
                  {expeditions.map((exp) => (
                    <option key={exp.id} value={exp.id}>
                      {exp.name} ({exp.region} - {exp.duration})
                    </option>
                  ))}
                </select>
              </div>

              {/* Phase Selection Tabs */}
              <div>
                <label className="block text-slate-700 font-bold mb-1.5">
                  Select Phase to Update
                </label>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                  {mission.phases.map((p) => (
                    <button
                      type="button"
                      key={p.phaseNumber}
                      onClick={() => handleSelectPhaseInModal(p.phaseNumber)}
                      className={`p-2 rounded-lg border text-center transition ${
                        selectedPhaseNum === p.phaseNumber
                          ? 'bg-sky-600 text-white border-sky-700 font-bold ring-2 ring-sky-300'
                          : p.status === 'completed'
                          ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                          : p.status === 'in_progress'
                          ? 'bg-sky-50 text-sky-800 border-sky-300 font-semibold'
                          : 'bg-slate-50 text-slate-600 border-slate-200'
                      }`}
                    >
                      <div className="text-[10px] uppercase font-mono">Phase {p.phaseNumber}</div>
                      <div className="text-[10px] truncate">{p.phase}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Phase Status Radio / Buttons */}
              <div>
                <label className="block text-slate-700 font-bold mb-1.5">
                  Milestone Status for Phase {selectedPhaseNum}
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setEditStatus('completed')}
                    className={`py-2 px-3 rounded-lg border text-center font-bold text-xs transition flex items-center justify-center gap-1.5 ${
                      editStatus === 'completed'
                        ? 'bg-emerald-600 text-white border-emerald-700 ring-2 ring-emerald-300 shadow-xs'
                        : 'bg-emerald-50 text-emerald-800 border-emerald-200 hover:bg-emerald-100'
                    }`}
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Completed</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setEditStatus('in_progress')}
                    className={`py-2 px-3 rounded-lg border text-center font-bold text-xs transition flex items-center justify-center gap-1.5 ${
                      editStatus === 'in_progress'
                        ? 'bg-sky-600 text-white border-sky-700 ring-2 ring-sky-300 shadow-xs'
                        : 'bg-sky-50 text-sky-800 border-sky-200 hover:bg-sky-100'
                    }`}
                  >
                    <Clock className="w-3.5 h-3.5 animate-spin" />
                    <span>In Progress</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setEditStatus('upcoming')}
                    className={`py-2 px-3 rounded-lg border text-center font-bold text-xs transition flex items-center justify-center gap-1.5 ${
                      editStatus === 'upcoming'
                        ? 'bg-slate-700 text-white border-slate-800 ring-2 ring-slate-300 shadow-xs'
                        : 'bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200'
                    }`}
                  >
                    <Circle className="w-3.5 h-3.5" />
                    <span>Upcoming</span>
                  </button>
                </div>
              </div>

              {/* Date & Location */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">
                    Timeline / Milestone Date
                  </label>
                  <input
                    type="text"
                    value={editDate}
                    onChange={(e) => setEditDate(e.target.value)}
                    placeholder="e.g. Feb 2026"
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-sky-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-bold mb-1">
                    Station / Field Location
                  </label>
                  <input
                    type="text"
                    value={editLocation}
                    onChange={(e) => setEditLocation(e.target.value)}
                    placeholder="e.g. Bharati Station, Larsemann Hills"
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-sky-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Field Notes & Telemetry Observations */}
              <div>
                <label className="block text-slate-700 font-bold mb-1">
                  Field Notes & Milestone Observations
                </label>
                <textarea
                  rows={3}
                  value={editNotes}
                  onChange={(e) => setEditNotes(e.target.value)}
                  placeholder="Record drilling depth, telemetry readings, sample preservation temperatures, or lab deliverables..."
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-sky-500 focus:outline-none"
                />
              </div>

              <div className="pt-3 border-t border-slate-200 flex items-center justify-between">
                <span className="text-[11px] text-slate-500">
                  Updates synchronize across workspace and directory.
                </span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setShowEditModal(false)}
                    className="px-4 py-2 rounded-lg border border-slate-300 text-slate-700 font-semibold text-xs hover:bg-slate-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-lg bg-sky-800 hover:bg-sky-900 text-white font-bold text-xs shadow-xs transition"
                  >
                    Save Milestone Progress
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
