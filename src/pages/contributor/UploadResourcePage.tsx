import React, { useState, useRef, useCallback } from 'react';
import { store } from '../../services/storage';
import {
  PolarRegion,
  ResearchTopic,
  Resource,
  ResourceFile,
  ResourceType,
  ResourceVisibility,
  User
} from '../../types';
import {
  Database,
  Upload,
  FileText,
  Image as ImageIcon,
  Video,
  BarChart3,
  X,
  Sparkles,
  CheckCircle2,
  ShieldCheck,
  Info,
  Plus
} from 'lucide-react';

interface UploadResourcePageProps {
  currentUser: User;
  onNavigate: (route: string) => void;
}

const categorizeFileType = (mimeType: string, filename: string): ResourceFile['fileType'] => {
  if (mimeType.startsWith('image/')) return 'image';
  if (mimeType.startsWith('video/')) return 'video';
  if (mimeType === 'application/pdf' || filename.toLowerCase().endsWith('.pdf')) return 'pdf';
  return 'data';
};

const readFileAsDataURL = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
};

export const UploadResourcePage: React.FC<UploadResourcePageProps> = ({
  currentUser,
  onNavigate
}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState<ResourceType>('DOCUMENT');
  const [region, setRegion] = useState<PolarRegion>('Antarctica');
  const [year, setYear] = useState<number>(2026);
  const [topic, setTopic] = useState<ResearchTopic>('Glaciology');
  const [researchers, setResearchers] = useState(currentUser.name);
  const [expeditionName, setExpeditionName] = useState('44th Indian Antarctic Scientific Expedition (ISEA-44)');
  const [stationOrVessel, setStationOrVessel] = useState('Bharati Station, Larsemann Hills');
  const [visibility, setVisibility] = useState<ResourceVisibility>('PUBLIC');
  const [keywordsInput, setKeywordsInput] = useState('Ice Core, Paleoclimate, Cryosphere, Larsemann Hills');
  const [additionalMetadata, setAdditionalMetadata] = useState('Cleanroom Cold Storage: -20°C Vault; SCAR Data compliant');
  const [uploadedFiles, setUploadedFiles] = useState<ResourceFile[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [savedResource, setSavedResource] = useState<Resource | null>(null);
  const [uploadProgress, setUploadProgress] = useState<{ current: number; total: number } | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleLoadDemoData = () => {
    setTitle('Antarctic Expedition 2026: Deep Ice Core & Atmospheric Boundary Layer Findings');
    setDescription('Field season borehole drilling report from Princess Elizabeth Land and automated telemetry logs measuring peripheral Katabatic wind stress and seasonal cryospheric ablation.');
    setType('DOCUMENT');
    setRegion('Antarctica');
    setYear(2026);
    setTopic('Glaciology');
    setResearchers(`${currentUser.name}, Dr. Shailendra Saini, Er. Rajesh Varma`);
    setExpeditionName('44th Indian Antarctic Scientific Expedition (2025–2026)');
    setStationOrVessel('Bharati Station, Larsemann Hills');
    setKeywordsInput('Antarctica, Ice Core, Katabatic Winds, Bharati Station, Cryosphere');
    setAdditionalMetadata('Drill depth: 180m; Instrument: Picarro L2140-i; Sample archiving: NCPOR Cryo-Vault');
    setUploadedFiles([
      {
        id: `f-${Date.now()}-1`,
        filename: 'Antarctic_Expedition_Report_2026.pdf',
        fileType: 'pdf',
        mimeType: 'application/pdf',
        url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
        sizeMb: 14.8,
        uploadedAt: new Date().toISOString(),
        resourceId: undefined,
        caption: 'Primary 68-page expedition technical report and borehole stratigraphy.'
      },
      {
        id: `f-${Date.now()}-2`,
        filename: 'Ice_Core_Research_Field_Drill.jpg',
        fileType: 'image',
        mimeType: 'image/jpeg',
        url: 'https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?auto=format&fit=crop&q=80&w=800',
        sizeMb: 4.2,
        uploadedAt: new Date().toISOString(),
        resourceId: undefined,
        caption: 'Electromechanical ice-core drill rig extracting 180m core at -25°C.'
      },
      {
        id: `f-${Date.now()}-3`,
        filename: 'Antarctic_Station_Larsemann.jpg',
        fileType: 'image',
        mimeType: 'image/jpeg',
        url: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?auto=format&fit=crop&q=80&w=800',
        sizeMb: 5.1,
        uploadedAt: new Date().toISOString(),
        resourceId: undefined,
        caption: 'Bharati Station operations and snow vehicle staging area.'
      },
      {
        id: `f-${Date.now()}-4`,
        filename: 'Field_Research_Drilling_Log.mp4',
        fileType: 'video',
        mimeType: 'video/mp4',
        url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
        sizeMb: 38.6,
        uploadedAt: new Date().toISOString(),
        resourceId: undefined,
        caption: 'Cinematic video log of core retrieval inside the ice trench.'
      },
      {
        id: `f-${Date.now()}-5`,
        filename: 'Expedition_Telemetry_Dataset.csv',
        fileType: 'data',
        mimeType: 'text/csv',
        url: 'https://raw.githubusercontent.com/datasets/gdp/master/data/gdp.csv',
        sizeMb: 8.4,
        uploadedAt: new Date().toISOString(),
        resourceId: undefined,
        caption: 'Sub-hourly weather buoy telemetry and ablation rate observations.'
      }
    ]);
  };

  const handleFileSelect = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    const fileList = Array.from(files);
    setUploadProgress({ current: 0, total: fileList.length });

    const processed: ResourceFile[] = [];

    for (let i = 0; i < fileList.length; i++) {
      const file = fileList[i];
      try {
        const dataUrl = await readFileAsDataURL(file);
        const sizeMb = parseFloat((file.size / (1024 * 1024)).toFixed(2));
        const fileType = categorizeFileType(file.type, file.name);

        processed.push({
          id: `f-${Date.now()}-${i}-${Math.random().toString(36).substr(2, 6)}`,
          filename: file.name,
          fileType,
          mimeType: file.type || 'application/octet-stream',
          url: dataUrl,
          sizeMb,
          uploadedAt: new Date().toISOString(),
          resourceId: undefined,
          caption: `Uploaded: ${file.name}`
        });
      } catch (err) {
        console.error(`Failed to read file ${file.name}:`, err);
      }
      setUploadProgress({ current: i + 1, total: fileList.length });
    }

    setUploadedFiles((prev) => [...prev, ...processed]);
    setUploadProgress(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }, []);

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handleRemoveFile = (fileId: string) => {
    setUploadedFiles((prev) => prev.filter((f) => f.id !== fileId));
  };

  const handleSaveToRepository = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      return;
    }

    setIsSubmitting(true);

    // If no files attached, add a default document
    const filesToStore =
      uploadedFiles.length > 0
        ? uploadedFiles
        : [
            {
              id: `f-${Date.now()}`,
              filename: `${title.replace(/\s+/g, '_')}_Report.pdf`,
              fileType: 'pdf' as const,
              mimeType: 'application/pdf',
              url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
              sizeMb: 11.4,
              uploadedAt: new Date().toISOString(),
              caption: 'Preserved scientific report document.'
            }
          ];

    setTimeout(() => {
      const researchersList = researchers
        .split(',')
        .map((r) => r.trim())
        .filter(Boolean);

      const keywordsList = keywordsInput
        .split(',')
        .map((k) => k.trim())
        .filter(Boolean);

      // Save to repository - status is strictly STORED (no automatic draft creation)
      const created = store.addResource({
        title,
        description,
        type,
        region,
        year,
        topic,
        researchers: researchersList.length > 0 ? researchersList : [currentUser.name],
        uploadedBy: currentUser.id,
        uploaderName: currentUser.name,
        stationOrVessel,
        expeditionName,
        visibility,
        keywords: keywordsList,
        files: filesToStore,
        additionalMetadata: {
          note: additionalMetadata
        }
      });

      setIsSubmitting(false);
      setSavedResource(created);
    }, 400);
  };

  const resourceTypes: { id: ResourceType; label: string; desc: string; icon: any }[] = [
    { id: 'DOCUMENT', label: 'Document', desc: 'PDF, research report, publication, monograph', icon: FileText },
    { id: 'DATASET', label: 'Dataset', desc: 'CSV, NetCDF, observations, sensor telemetry', icon: BarChart3 },
    { id: 'IMAGE', label: 'Image', desc: 'High-res photograph, geological map, satellite capture', icon: ImageIcon },
    { id: 'VIDEO', label: 'Video', desc: 'Expedition footage, underwater ROV, station documentary', icon: Video }
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* SUCCESS CONFIRMATION MODAL / VIEW */}
      {savedResource && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-fadeIn">
          <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden text-xs">
            <div className="bg-emerald-900 px-6 py-5 text-white flex items-center justify-between border-b border-emerald-800">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-300">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white tracking-tight">
                    Resource Successfully Stored
                  </h3>
                  <p className="text-emerald-200 text-xs">
                    Safely archived in National Polar Scientific Repository
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6 space-y-4">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-slate-500 uppercase tracking-wider text-[10px] font-semibold">
                    Repository Identifier
                  </span>
                  <span className="px-2 py-0.5 rounded font-mono font-bold bg-sky-100 text-sky-900 border border-sky-300 text-xs">
                    {savedResource.id}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-slate-500 uppercase tracking-wider text-[10px] font-semibold">
                    Resource Status
                  </span>
                  <span className="px-2 py-0.5 rounded font-semibold bg-emerald-100 text-emerald-800 border border-emerald-300 text-[11px]">
                    {savedResource.status}
                  </span>
                </div>

                <div className="pt-2 border-t border-slate-200">
                  <h4 className="font-semibold text-slate-900 text-sm">{savedResource.title}</h4>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    {savedResource.files.length} original file(s) permanently preserved with SHA-256 metadata.
                  </p>
                </div>
              </div>

              <div className="rounded-xl border border-sky-200 bg-sky-50/70 p-3.5 space-y-1.5 text-slate-700">
                <div className="font-semibold text-sky-950 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-sky-600" />
                  <span>Next Step: Optional Outreach Content</span>
                </div>
                <p className="text-[11px] leading-relaxed text-slate-600">
                  The original resource is now preserved. You can now view the resource in the repository or choose to generate audience-facing articles with AI assistance.
                </p>
              </div>

              <div className="space-y-2 pt-2">
                <button
                  onClick={() => onNavigate(`/repository/${savedResource.id}`)}
                  className="w-full py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold transition flex items-center justify-center gap-2"
                >
                  <Database className="w-4 h-4 text-sky-400" />
                  <span>Open Resource in Repository</span>
                </button>

                <button
                  onClick={() => onNavigate('/contributor/resources')}
                  className="w-full py-2 px-4 rounded-xl bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 font-medium transition"
                >
                  Go to My Stored Resources
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 text-xs text-sky-800 font-semibold tracking-wide uppercase">
            <Database className="w-3.5 h-3.5 text-sky-600" />
            <span>Scientific Knowledge Repository</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Upload Scientific Resource
          </h1>
          <p className="text-xs sm:text-sm text-slate-600">
            Deposit original research reports, field photography, video logs, and scientific observation datasets.
          </p>
        </div>

        {/* Quick Demo Pre-fill */}
        <button
          type="button"
          onClick={handleLoadDemoData}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-sky-50 border border-sky-200 hover:bg-sky-100/80 text-sky-800 text-xs font-medium transition self-start sm:self-center"
        >
          <Sparkles className="w-3.5 h-3.5 text-sky-600" />
          <span>Load Sample Scientific Resource (5 Files)</span>
        </button>
      </div>

      {/* Core Principle Notice */}
      <div className="rounded-xl border border-sky-200 bg-sky-50/60 p-4 text-xs text-slate-700 flex items-start gap-3">
        <Info className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <p className="font-semibold text-slate-900">
            Archival First Architecture:
          </p>
          <p className="text-slate-600 leading-relaxed">
            Uploading a resource saves the raw scientific material into the repository. Creating AI-assisted outreach articles is an optional next step and will never replace or overwrite the preserved source files.
          </p>
        </div>
      </div>

      {/* Main Upload Form */}
      <form onSubmit={handleSaveToRepository} className="space-y-8 text-xs">
        {/* SECTION 1: RESOURCE IDENTITY & TYPE */}
        <section aria-labelledby="type-heading" className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-5">
          <h2 id="type-heading" className="text-sm font-bold text-slate-900 uppercase tracking-wider">
            1. Resource Classification & Format
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {resourceTypes.map((item) => {
              const Icon = item.icon;
              const isSelected = type === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setType(item.id)}
                  className={`p-3.5 rounded-xl border text-left transition flex flex-col justify-between ${
                    isSelected
                      ? 'bg-sky-50 border-sky-500 ring-1 ring-sky-500 text-sky-950 font-semibold'
                      : 'bg-white border-slate-200 hover:border-slate-300 text-slate-700'
                  }`}
                >
                  <Icon className={`w-5 h-5 mb-2 ${isSelected ? 'text-sky-600' : 'text-slate-400'}`} />
                  <div>
                    <div className="text-xs font-semibold">{item.label}</div>
                    <div className="text-[10px] text-slate-500 font-normal mt-0.5 leading-tight">
                      {item.desc}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        {/* SECTION 2: RESOURCE VISIBILITY & ACCESS LEVEL */}
        <section aria-labelledby="visibility-heading" className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
          <div>
            <h2 id="visibility-heading" className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-sky-600" />
              <span>2. Resource Visibility & Access Level</span>
            </h2>
            <p className="text-[11px] text-slate-500 mt-0.5">
              Specify access authorization for this preserved scientific resource. Private and Protected resources will never be exposed on the public portal.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <button
              type="button"
              onClick={() => setVisibility('PUBLIC')}
              className={`p-4 rounded-xl border text-left transition flex flex-col justify-between space-y-2 ${
                visibility === 'PUBLIC'
                  ? 'border-emerald-500 bg-emerald-50/50 ring-2 ring-emerald-500/20 shadow-xs'
                  : 'border-slate-200 hover:border-slate-300 bg-white'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-900 text-xs flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  PUBLIC
                </span>
                {visibility === 'PUBLIC' && (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                )}
              </div>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                Eligible to be published and displayed on the Public Portal after editorial and administrative approval.
              </p>
              <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-100/70 px-2 py-0.5 rounded self-start">
                Open Access After Approval
              </span>
            </button>

            <button
              type="button"
              onClick={() => setVisibility('PROTECTED')}
              className={`p-4 rounded-xl border text-left transition flex flex-col justify-between space-y-2 ${
                visibility === 'PROTECTED'
                  ? 'border-amber-500 bg-amber-50/50 ring-2 ring-amber-500/20 shadow-xs'
                  : 'border-slate-200 hover:border-slate-300 bg-white'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-900 text-xs flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                  PROTECTED
                </span>
                {visibility === 'PROTECTED' && (
                  <CheckCircle2 className="w-4 h-4 text-amber-600" />
                )}
              </div>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                Exists in the repository for authorized scientists and controlled academic requests only. Not public.
              </p>
              <span className="text-[10px] font-semibold text-amber-700 bg-amber-100/70 px-2 py-0.5 rounded self-start">
                Controlled Authorized Access
              </span>
            </button>

            <button
              type="button"
              onClick={() => setVisibility('PRIVATE')}
              className={`p-4 rounded-xl border text-left transition flex flex-col justify-between space-y-2 ${
                visibility === 'PRIVATE'
                  ? 'border-slate-700 bg-slate-100 ring-2 ring-slate-700/20 shadow-xs'
                  : 'border-slate-200 hover:border-slate-300 bg-white'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-900 text-xs flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-slate-600"></span>
                  PRIVATE / INTERNAL
                </span>
                {visibility === 'PRIVATE' && (
                  <CheckCircle2 className="w-4 h-4 text-slate-700" />
                )}
              </div>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                Strictly internal repository material. Restricted to contributor and principal investigators.
              </p>
              <span className="text-[10px] font-semibold text-slate-700 bg-slate-200 px-2 py-0.5 rounded self-start">
                Strictly Internal Only
              </span>
            </button>
          </div>
        </section>

        {/* SECTION 3: METADATA */}
        <section aria-labelledby="metadata-heading" className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-5">
          <h2 id="metadata-heading" className="text-sm font-bold text-slate-900 uppercase tracking-wider">
            3. Scientific Metadata
          </h2>

          <div className="space-y-4">
            <div>
              <label className="font-semibold text-slate-800 block mb-1">
                Resource Title <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. 44th Indian Antarctic Expedition: Deep Ice Core Paleoclimate Analysis"
                className="w-full px-3 py-2.5 rounded-lg border border-slate-300 text-xs text-slate-900 placeholder-slate-400 focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
              />
            </div>

            <div>
              <label className="font-semibold text-slate-800 block mb-1">
                Scientific Abstract / Description <span className="text-rose-500">*</span>
              </label>
              <textarea
                required
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Provide a detailed description of the methodology, sensors, and key scientific significance..."
                className="w-full px-3 py-2.5 rounded-lg border border-slate-300 text-xs text-slate-900 placeholder-slate-400 focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="font-semibold text-slate-800 block mb-1">
                  Polar Region
                </label>
                <select
                  value={region}
                  onChange={(e: any) => setRegion(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs text-slate-900 bg-white"
                >
                  <option value="Antarctica">Antarctica</option>
                  <option value="Arctic">Arctic</option>
                  <option value="Southern Ocean">Southern Ocean</option>
                  <option value="Himalayas (Third Pole)">Himalayas (Third Pole)</option>
                </select>
              </div>

              <div>
                <label className="font-semibold text-slate-800 block mb-1">
                  Research Area / Domain
                </label>
                <select
                  value={topic}
                  onChange={(e: any) => setTopic(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs text-slate-900 bg-white"
                >
                  <option value="Glaciology">Glaciology</option>
                  <option value="Oceanography">Oceanography</option>
                  <option value="Climate Dynamics">Climate Dynamics</option>
                  <option value="Marine Biology">Marine Biology</option>
                  <option value="Atmospheric Science">Atmospheric Science</option>
                  <option value="Geology & Geophysics">Geology & Geophysics</option>
                  <option value="Polar Technology & Logistics">Polar Technology & Logistics</option>
                </select>
              </div>

              <div>
                <label className="font-semibold text-slate-800 block mb-1">
                  Observation Year
                </label>
                <input
                  type="number"
                  value={year}
                  onChange={(e) => setYear(parseInt(e.target.value) || 2026)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs text-slate-900"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="font-semibold text-slate-800 block mb-1">
                  Lead Researchers & Authors (Comma-separated)
                </label>
                <input
                  type="text"
                  value={researchers}
                  onChange={(e) => setResearchers(e.target.value)}
                  placeholder="Dr. Rahul Sharma, Dr. Shailendra Saini"
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs text-slate-900"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-800 block mb-1">
                  Associated Expedition / Project
                </label>
                <input
                  type="text"
                  value={expeditionName}
                  onChange={(e) => setExpeditionName(e.target.value)}
                  placeholder="44th Indian Antarctic Scientific Expedition (ISEA-44)"
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs text-slate-900"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="font-semibold text-slate-800 block mb-1">
                  Station, Vessel, or Field Site
                </label>
                <input
                  type="text"
                  value={stationOrVessel}
                  onChange={(e) => setStationOrVessel(e.target.value)}
                  placeholder="Bharati Station, Maitri Station, Himadri, ORV Sagar Nidhi"
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs text-slate-900"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-800 block mb-1">
                  Keywords (Comma-separated)
                </label>
                <input
                  type="text"
                  value={keywordsInput}
                  onChange={(e) => setKeywordsInput(e.target.value)}
                  placeholder="Ice Core, Paleoclimate, Cryosphere, Larsemann Hills"
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs text-slate-900"
                />
              </div>
            </div>

            <div>
              <label className="font-semibold text-slate-800 block mb-1">
                Additional Technical Metadata (Sensors, storage conditions, DOI)
              </label>
              <input
                type="text"
                value={additionalMetadata}
                onChange={(e) => setAdditionalMetadata(e.target.value)}
                placeholder="Drill depth: 180m; Instrument: Picarro L2140-i; Sample archiving: NCPOR Cryo-Vault"
                className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs text-slate-900"
              />
            </div>
          </div>
        </section>

        {/* SECTION 4: MULTI-FILE ATTACHMENTS */}
        <section aria-labelledby="files-heading" className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
          <input
            ref={fileInputRef}
            type="file"
            multiple
            onChange={handleFileSelect}
            accept="image/*,video/*,.pdf,.csv,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.json,.txt,.nc,.netcdf,application/pdf,text/csv,application/json,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
            className="hidden"
          />
          <div className="flex items-center justify-between border-b border-slate-100 pb-3 gap-3 flex-wrap">
            <div>
              <h2 id="files-heading" className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                4. Attached Scientific Files ({uploadedFiles.length})
              </h2>
              <p className="text-[11px] text-slate-500 mt-0.5">
                All attached documents, photographs, videos, and datasets belong to this single preserved repository resource.
              </p>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              <button
                type="button"
                onClick={triggerFileInput}
                className="px-3 py-1.5 rounded-md bg-slate-900 hover:bg-slate-800 text-white text-[11px] font-semibold flex items-center gap-1.5 shadow-sm transition active:scale-95"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Upload Files</span>
              </button>
            </div>
          </div>

          {uploadProgress && (
            <div className="p-3 rounded-lg border border-sky-200 bg-sky-50 space-y-1.5">
              <div className="flex items-center justify-between text-[11px] font-medium text-sky-800">
                <span>Reading files...</span>
                <span>{uploadProgress.current} / {uploadProgress.total}</span>
              </div>
              <div className="w-full h-2 bg-sky-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-sky-500 rounded-full transition-all duration-200"
                  style={{ width: `${(uploadProgress.current / uploadProgress.total) * 100}%` }}
                />
              </div>
            </div>
          )}

          {uploadedFiles.length === 0 ? (
            <button
              type="button"
              onClick={triggerFileInput}
              className="w-full p-8 border-2 border-dashed border-slate-300 hover:border-sky-400 rounded-xl bg-slate-50/60 hover:bg-sky-50/60 text-center space-y-3 transition group cursor-pointer"
            >
              <Upload className="w-8 h-8 text-slate-400 group-hover:text-sky-500 mx-auto transition" />
              <div>
                <p className="font-semibold text-slate-700 group-hover:text-sky-700 transition">No files attached yet</p>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Click here to attach reports, photos, videos, or datasets, or click <strong>Load Sample Scientific Resource</strong> above.
                </p>
              </div>
            </button>
          ) : (
            <div className="space-y-2">
              {uploadedFiles.map((file) => (
                <div
                  key={file.id}
                  className="flex items-center justify-between p-3 rounded-lg border border-slate-200 bg-slate-50 text-xs"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-10 h-10 rounded bg-white border border-slate-200 flex items-center justify-center shrink-0 overflow-hidden">
                      {file.fileType === 'image' ? (
                        <img src={file.url} alt={file.filename} className="w-full h-full object-cover" />
                      ) : file.fileType === 'pdf' ? (
                        <FileText className="w-4 h-4 text-rose-600" />
                      ) : file.fileType === 'video' ? (
                        <Video className="w-4 h-4 text-purple-600" />
                      ) : (
                        <BarChart3 className="w-4 h-4 text-emerald-600" />
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="font-medium text-slate-900 truncate">
                        {file.filename}
                      </div>
                      <div className="text-[11px] text-slate-500 flex flex-wrap items-center gap-x-2 gap-y-0.5">
                        <span>{file.sizeMb} MB</span>
                        <span className="text-slate-300">·</span>
                        <span className="uppercase text-[10px]">{file.fileType}</span>
                        {file.mimeType && (
                          <>
                            <span className="text-slate-300">·</span>
                            <span className="truncate max-w-[40%]">{file.mimeType}</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 shrink-0 ml-2">
                    {file.url && file.url.startsWith('data:') && (
                      <a
                        href={file.url}
                        download={file.filename}
                        target="_blank"
                        rel="noreferrer"
                        className="p-1.5 rounded text-slate-400 hover:text-sky-600 hover:bg-sky-50 transition"
                        title="Open / Download file"
                      >
                        <Upload className="w-3.5 h-3.5 rotate-180" />
                      </a>
                    )}
                    <button
                      type="button"
                      onClick={() => handleRemoveFile(file.id)}
                      className="p-1.5 rounded text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition"
                      title="Remove file"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
              <button
                type="button"
                onClick={triggerFileInput}
                className="w-full p-2 rounded-lg border border-dashed border-slate-300 hover:border-sky-400 bg-white hover:bg-sky-50/40 text-[11px] font-medium text-slate-500 hover:text-sky-700 transition flex items-center justify-center gap-1.5"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Attach more files</span>
              </button>
            </div>
          )}
        </section>

        {/* PRIMARY SUBMISSION ACTION: SAVE TO REPOSITORY */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-200">
          <button
            type="button"
            onClick={() => onNavigate('/contributor/resources')}
            className="px-4 py-2 rounded-lg text-slate-600 hover:bg-slate-100 transition"
          >
            Cancel & Return
          </button>

          <button
            type="submit"
            disabled={isSubmitting}
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-md transition active:scale-95"
          >
            <Database className="w-4 h-4 text-sky-400" />
            <span>{isSubmitting ? 'Preserving to Repository...' : 'Save to Repository'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};
