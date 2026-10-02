import React, { useState } from 'react';
import { store } from '../../services/storage';
import { Expedition, PolarRegion, Resource } from '../../types';
import {
  Compass,
  X,
  Sparkles,
  Calendar,
  MapPin,
  Users,
  CheckCircle2,
  Clock,
  Circle,
  FileText,
  Upload,
  Database,
  ArrowRight,
  ShieldCheck,
  Plus,
  Trash2
} from 'lucide-react';

interface CreateExpeditionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (expedition: Expedition) => void;
}

export const CreateExpeditionModal: React.FC<CreateExpeditionModalProps> = ({
  isOpen,
  onClose,
  onSuccess
}) => {
  const allResources: Resource[] = store.getResources();

  // Mode: 'resource' (Synthesize from repository resource) | 'custom' (Manual config)
  const [creationMode, setCreationMode] = useState<'resource' | 'custom'>('resource');
  const [selectedResourceId, setSelectedResourceId] = useState<string>(allResources[0]?.id || '');

  // Expedition Fields
  const [name, setName] = useState('45th Indian Scientific Expedition to Antarctica (2026–2027)');
  const [expeditionNumber, setExpeditionNumber] = useState('45-IASE');
  const [region, setRegion] = useState<PolarRegion>('Antarctica');
  const [year, setYear] = useState<number>(2026);
  const [status, setStatus] = useState<'Ongoing' | 'Planned' | 'Completed'>('Ongoing');
  const [leadStation, setLeadStation] = useState('Bharati Station (Larsemann Hills)');
  const [duration, setDuration] = useState('November 2026 – April 2027');
  const [teamSize, setTeamSize] = useState<number>(42);
  const [expeditionLeader, setExpeditionLeader] = useState('Dr. Rahul Mohan');
  const [bannerImage, setBannerImage] = useState(
    'https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?auto=format&fit=crop&q=80&w=1200'
  );
  const [overview, setOverview] = useState(
    'Comprehensive multi-disciplinary polar field operations targeting deep cryospheric borehole extraction, katabatic boundary-layer meteorology, and automated satellite sensor telemetry.'
  );

  const [objectives, setObjectives] = useState<string[]>([
    'Recover continuous 180m ice core samples across the continental ice dome.',
    'Deploy autonomous meteorological buoy clusters to quantify peripheral ablation and wind stress.',
    'Maintain continuous GPS geodetic networks to measure post-glacial isostatic rebound.'
  ]);
  const [newObjective, setNewObjective] = useState('');

  const [activities, setActivities] = useState<string[]>([
    'Subglacial lake seismic profiling',
    'Atmospheric aerosol and greenhouse gas monitoring',
    'Intermediate depth electromechanical borehole drilling',
    'Human physiological and psychological adaptation tracking'
  ]);
  const [newActivity, setNewActivity] = useState('');

  // 6-Phase Timeline with Phase 4 marked IN PROGRESS by default
  const [timeline, setTimeline] = useState([
    {
      phase: 'Planning',
      title: 'National Expedition Screening & Approval',
      date: 'Jul 2026',
      status: 'completed' as const,
      description: 'MoES National Steering Committee logistics charter approval and technical inspection.'
    },
    {
      phase: 'Departure',
      title: 'Voyage Mobilization from Cape Town',
      date: 'Nov 2026',
      status: 'completed' as const,
      description: 'Embarkation of scientific contingent and cryogenic heavy cargo aboard chartered icebreaker.'
    },
    {
      phase: 'Field Research',
      title: 'Station Activation & Staging Operations',
      date: 'Dec 2026',
      status: 'completed' as const,
      description: 'Helicopter transfer of equipment and establishment of peripheral glaciological field camps.'
    },
    {
      phase: 'Data Collection',
      title: 'In-situ Sampling & Borehole Telemetry Logging',
      date: 'Feb 2027',
      status: 'in_progress' as const,
      description: 'Active drilling rig extraction, continuous sensor downlink, and cold-core logging at -25°C.'
    },
    {
      phase: 'Analysis',
      title: 'Post-Field Sample Processing & Cryo-Archival',
      date: 'May 2027',
      status: 'upcoming' as const,
      description: 'Cold laboratory isotopic analysis at -20°C clean room vault at NCPOR Goa.'
    },
    {
      phase: 'Publication',
      title: 'National Repository Cataloging & Public Dispatches',
      date: 'Aug 2027',
      status: 'upcoming' as const,
      description: 'Final technical report release, open dataset cataloging, and educational dispatches.'
    }
  ]);

  if (!isOpen) return null;

  // Auto-populate when selecting a repository resource
  const handleResourceSelect = (resId: string) => {
    setSelectedResourceId(resId);
    const res = allResources.find((r) => r.id === resId);
    if (!res) return;

    setName(`${res.region} Scientific Expedition: ${res.title}`);
    setExpeditionNumber(res.region === 'Antarctica' ? '45-IASE' : res.region === 'Arctic' ? 'IASC-2026' : 'SOE-14');
    setRegion(res.region);
    setYear(res.year || 2026);
    setStatus('Ongoing');
    setLeadStation(res.stationOrVessel || (res.region === 'Antarctica' ? 'Bharati Station' : 'Himadri Station'));
    setExpeditionLeader(res.researchers[0] || 'Dr. Rahul Mohan');
    setOverview(res.description);
    setTeamSize(res.researchers.length > 2 ? 36 : 24);

    // Set high-res banner based on region
    if (res.region === 'Arctic') {
      setBannerImage('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=1200');
    } else if (res.region === 'Southern Ocean') {
      setBannerImage('https://images.unsplash.com/photo-1505118380757-91f5f5632de0?auto=format&fit=crop&q=80&w=1200');
    } else {
      setBannerImage('https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?auto=format&fit=crop&q=80&w=1200');
    }

    // Auto-derive objectives and activities from resource keywords
    if (res.keywords && res.keywords.length > 0) {
      setObjectives(res.keywords.slice(0, 3).map((kw) => `Conduct high-resolution scientific investigations targeting ${kw}.`));
      setActivities(res.keywords.map((kw) => `In-situ measurement and observation of ${kw}`));
    }
  };

  const handleAddObjective = () => {
    if (!newObjective.trim()) return;
    setObjectives([...objectives, newObjective.trim()]);
    setNewObjective('');
  };

  const handleRemoveObjective = (idx: number) => {
    setObjectives(objectives.filter((_, i) => i !== idx));
  };

  const handleAddActivity = () => {
    if (!newActivity.trim()) return;
    setActivities([...activities, newActivity.trim()]);
    setNewActivity('');
  };

  const handleRemoveActivity = (idx: number) => {
    setActivities(activities.filter((_, i) => i !== idx));
  };

  const handleTimelineStatusChange = (idx: number, newStatus: 'completed' | 'in_progress' | 'upcoming') => {
    const updated = [...timeline];
    updated[idx] = { ...updated[idx], status: newStatus };
    setTimeline(updated);
  };

  const handleTimelineTextChange = (idx: number, field: 'title' | 'date' | 'description', value: string) => {
    const updated = [...timeline];
    updated[idx] = { ...updated[idx], [field]: value };
    setTimeline(updated);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Link the selected resource if synthesized from resource, plus any related ones
    const relatedResourceIds: string[] = [];
    if (creationMode === 'resource' && selectedResourceId) {
      relatedResourceIds.push(selectedResourceId);
    }

    const newExp = store.addExpedition({
      name: name.trim(),
      expeditionNumber: expeditionNumber.trim(),
      year: Number(year),
      region,
      status,
      bannerImage: bannerImage.trim(),
      leadStation: leadStation.trim(),
      duration: duration.trim(),
      teamSize: Number(teamSize),
      expeditionLeader: expeditionLeader.trim(),
      overview: overview.trim(),
      objectives: objectives.length > 0 ? objectives : ['Conduct systematic polar cryosphere monitoring.'],
      researchActivities: activities.length > 0 ? activities : ['Continuous sensor recording and telemetry logging.'],
      timeline,
      relatedResourceIds
    });

    onSuccess(newExp);
  };

  const selectedResource = allResources.find((r) => r.id === selectedResourceId);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/80 backdrop-blur-xs animate-fadeIn overflow-y-auto">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl w-full max-w-4xl overflow-hidden flex flex-col my-8 max-h-[92vh]">
        {/* Modal Header */}
        <div className="p-5 sm:p-6 bg-slate-900 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-400/30 flex items-center justify-center text-amber-400">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase font-bold tracking-wider text-amber-400">
                National Polar Mission Governance
              </span>
              <h2 className="text-lg sm:text-xl font-bold">Register / Create New Scientific Expedition</h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit} className="p-5 sm:p-6 overflow-y-auto space-y-6 text-xs flex-1">
          {/* Mode Selector */}
          <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-2xl space-y-3">
            <span className="font-bold text-slate-800 uppercase tracking-wider text-[11px] block">
              Expedition Configuration Method
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setCreationMode('resource')}
                className={`p-3 rounded-xl border text-left transition flex items-start gap-2.5 ${
                  creationMode === 'resource'
                    ? 'bg-sky-50 border-sky-400 ring-2 ring-sky-300 text-sky-950 font-bold'
                    : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}
              >
                <Sparkles className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs">Synthesize from Preserved Resource</div>
                  <div className="text-[10px] font-normal text-slate-500 mt-0.5">
                    Automatically pulls original files (PDFs, CSVs, video), station telemetry, and sets in-progress lifecycle.
                  </div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setCreationMode('custom')}
                className={`p-3 rounded-xl border text-left transition flex items-start gap-2.5 ${
                  creationMode === 'custom'
                    ? 'bg-sky-50 border-sky-400 ring-2 ring-sky-300 text-sky-950 font-bold'
                    : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}
              >
                <Database className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs">Configure Custom Expedition</div>
                  <div className="text-[10px] font-normal text-slate-500 mt-0.5">
                    Define manual mission parameters, custom station deployment, and milestone timelines from scratch.
                  </div>
                </div>
              </button>
            </div>

            {/* If Resource Mode: Resource Selector */}
            {creationMode === 'resource' && (
              <div className="pt-2 border-t border-slate-200 space-y-2">
                <label className="font-bold text-slate-800 block text-[11px]">
                  Select Source Repository Resource to Link:
                </label>
                <select
                  value={selectedResourceId}
                  onChange={(e) => handleResourceSelect(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-300 text-xs font-semibold focus:ring-2 focus:ring-sky-500 focus:outline-none"
                >
                  {allResources.map((res) => (
                    <option key={res.id} value={res.id}>
                      [{res.id}] {res.title} ({res.region} · {res.files.length} files attached)
                    </option>
                  ))}
                </select>

                {selectedResource && (
                  <div className="p-3 bg-white border border-sky-200 rounded-xl space-y-1.5 text-[11px]">
                    <div className="font-bold text-sky-900 flex items-center justify-between">
                      <span>Attached Files Imported into Expedition:</span>
                      <span className="font-mono text-slate-500">{selectedResource.files.length} file(s)</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 pt-1">
                      {selectedResource.files.map((f) => (
                        <div key={f.id} className="p-1.5 rounded bg-slate-50 border border-slate-200 flex items-center justify-between">
                          <span className="truncate max-w-[200px] font-mono text-[10px]">{f.filename}</span>
                          <span className="text-[9px] uppercase px-1 py-0.2 rounded bg-sky-100 text-sky-800 font-bold">{f.fileType}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Section 1: Core Parameters */}
          <div className="space-y-3">
            <h3 className="font-bold text-slate-900 text-sm border-b border-slate-100 pb-1.5 flex items-center gap-2">
              <Compass className="w-4 h-4 text-sky-600" />
              <span>1. Mission Identity & Core Coordinates</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Expedition Full Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. 45th Indian Scientific Expedition to Antarctica"
                  className="w-full p-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-sky-500"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Official Code / Number</label>
                <input
                  type="text"
                  required
                  value={expeditionNumber}
                  onChange={(e) => setExpeditionNumber(e.target.value)}
                  placeholder="e.g. 45-IASE"
                  className="w-full p-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-sky-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Region</label>
                <select
                  value={region}
                  onChange={(e) => setRegion(e.target.value as PolarRegion)}
                  className="w-full p-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-sky-500"
                >
                  <option value="Antarctica">Antarctica</option>
                  <option value="Arctic">Arctic</option>
                  <option value="Southern Ocean">Southern Ocean</option>
                  <option value="Himalayas (Third Pole)">Himalayas (Third Pole)</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Status</label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value as 'Ongoing' | 'Planned' | 'Completed')}
                  className="w-full p-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-sky-500 font-bold text-emerald-800"
                >
                  <option value="Ongoing">Ongoing (Active Field)</option>
                  <option value="Planned">Planned (Pre-departure)</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Year</label>
                <input
                  type="number"
                  required
                  value={year}
                  onChange={(e) => setYear(Number(e.target.value))}
                  className="w-full p-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-sky-500"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Team Size</label>
                <input
                  type="number"
                  required
                  value={teamSize}
                  onChange={(e) => setTeamSize(Number(e.target.value))}
                  className="w-full p-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-sky-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Lead Operating Base / Vessel</label>
                <input
                  type="text"
                  required
                  value={leadStation}
                  onChange={(e) => setLeadStation(e.target.value)}
                  placeholder="e.g. Bharati Station & Maitri"
                  className="w-full p-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-sky-500"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Expedition Leader</label>
                <input
                  type="text"
                  required
                  value={expeditionLeader}
                  onChange={(e) => setExpeditionLeader(e.target.value)}
                  placeholder="e.g. Dr. Rahul Mohan"
                  className="w-full p-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-sky-500"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Duration & Season</label>
                <input
                  type="text"
                  required
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  placeholder="e.g. Nov 2026 – Apr 2027"
                  className="w-full p-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-sky-500"
                />
              </div>
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Banner Image URL</label>
              <input
                type="text"
                required
                value={bannerImage}
                onChange={(e) => setBannerImage(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-sky-500"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Mission Operational Overview</label>
              <textarea
                rows={3}
                required
                value={overview}
                onChange={(e) => setOverview(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-sky-500"
              />
            </div>
          </div>

          {/* Section 2: Mission Lifecycle Progression & Milestones */}
          <div className="space-y-3 p-4 bg-sky-50/50 border border-sky-200 rounded-2xl">
            <div className="flex items-center justify-between pb-2 border-b border-sky-200">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-sky-800">
                  Mission Lifecycle
                </span>
                <h3 className="font-bold text-slate-900 text-sm">
                  Expedition Phase Progression & Milestones (Active Field Progression)
                </h3>
              </div>
              <span className="text-[10px] font-mono text-sky-800 bg-sky-100 px-2 py-0.5 rounded font-bold">
                6 Phases
              </span>
            </div>

            <div className="space-y-2.5">
              {timeline.map((step, idx) => (
                <div
                  key={idx}
                  className={`p-3 rounded-xl border text-xs transition ${
                    step.status === 'in_progress'
                      ? 'bg-sky-50 border-sky-400 ring-2 ring-sky-300/80 shadow-xs'
                      : step.status === 'completed'
                      ? 'bg-emerald-50/70 border-emerald-200 text-emerald-950'
                      : 'bg-white border-slate-200 text-slate-600'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[10px] font-bold px-1.5 py-0.5 rounded bg-slate-100 text-slate-700">
                        Phase {idx + 1}
                      </span>
                      <span className="font-bold text-slate-900">{step.phase}</span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => handleTimelineStatusChange(idx, 'completed')}
                        className={`px-2 py-1 rounded text-[10px] font-semibold border transition flex items-center gap-1 ${
                          step.status === 'completed'
                            ? 'bg-emerald-600 text-white border-emerald-700 font-bold'
                            : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        <CheckCircle2 className="w-3 h-3" />
                        <span>Completed</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleTimelineStatusChange(idx, 'in_progress')}
                        className={`px-2 py-1 rounded text-[10px] font-semibold border transition flex items-center gap-1 ${
                          step.status === 'in_progress'
                            ? 'bg-sky-600 text-white border-sky-700 font-bold'
                            : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        <Clock className="w-3 h-3 animate-spin" />
                        <span>In Progress</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleTimelineStatusChange(idx, 'upcoming')}
                        className={`px-2 py-1 rounded text-[10px] font-semibold border transition flex items-center gap-1 ${
                          step.status === 'upcoming'
                            ? 'bg-slate-700 text-white border-slate-800 font-bold'
                            : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        <Circle className="w-3 h-3" />
                        <span>Upcoming</span>
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    <input
                      type="text"
                      value={step.title}
                      onChange={(e) => handleTimelineTextChange(idx, 'title', e.target.value)}
                      placeholder="Milestone title"
                      className="p-1.5 rounded-lg border border-slate-300 text-xs"
                    />
                    <input
                      type="text"
                      value={step.date}
                      onChange={(e) => handleTimelineTextChange(idx, 'date', e.target.value)}
                      placeholder="Date (e.g. Feb 2027)"
                      className="p-1.5 rounded-lg border border-slate-300 text-xs"
                    />
                    <input
                      type="text"
                      value={step.description}
                      onChange={(e) => handleTimelineTextChange(idx, 'description', e.target.value)}
                      placeholder="Operational description & telemetry"
                      className="p-1.5 rounded-lg border border-slate-300 text-xs"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section 3: Objectives & Research Activities */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Objectives */}
            <div className="space-y-2 p-4 bg-slate-50 rounded-2xl border border-slate-200">
              <span className="font-bold text-slate-900 block text-xs">Scientific Objectives</span>
              <div className="space-y-1.5">
                {objectives.map((obj, i) => (
                  <div key={i} className="p-2 rounded-lg bg-white border border-slate-200 flex items-start justify-between gap-2 text-[11px]">
                    <span>{obj}</span>
                    <button type="button" onClick={() => handleRemoveObjective(i)} className="text-rose-500 hover:text-rose-700 shrink-0">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-1.5 pt-1">
                <input
                  type="text"
                  value={newObjective}
                  onChange={(e) => setNewObjective(e.target.value)}
                  placeholder="Add scientific objective..."
                  className="flex-1 p-1.5 rounded-lg border border-slate-300 text-xs"
                />
                <button type="button" onClick={handleAddObjective} className="p-1.5 rounded-lg bg-sky-700 text-white hover:bg-sky-800">
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Activities */}
            <div className="space-y-2 p-4 bg-slate-50 rounded-2xl border border-slate-200">
              <span className="font-bold text-slate-900 block text-xs">Key Field Research Activities</span>
              <div className="space-y-1.5">
                {activities.map((act, i) => (
                  <div key={i} className="p-2 rounded-lg bg-white border border-slate-200 flex items-start justify-between gap-2 text-[11px]">
                    <span>{act}</span>
                    <button type="button" onClick={() => handleRemoveActivity(i)} className="text-rose-500 hover:text-rose-700 shrink-0">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-1.5 pt-1">
                <input
                  type="text"
                  value={newActivity}
                  onChange={(e) => setNewActivity(e.target.value)}
                  placeholder="Add field research activity..."
                  className="flex-1 p-1.5 rounded-lg border border-slate-300 text-xs"
                />
                <button type="button" onClick={handleAddActivity} className="p-1.5 rounded-lg bg-sky-700 text-white hover:bg-sky-800">
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Footer Submit */}
          <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
            <span className="text-[11px] text-slate-500">
              Expedition will be registered with active in-progress timeline and linked files.
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 font-semibold hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-sky-800 hover:bg-sky-900 text-white font-bold shadow-md transition flex items-center gap-1.5"
              >
                <Compass className="w-4 h-4 text-amber-400" />
                <span>Save & Register Expedition</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
