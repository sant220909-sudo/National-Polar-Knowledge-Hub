import React, { useState } from 'react';
import { store } from '../../services/storage';
import { generateContentFromResource } from '../../services/aiService';
import { ContentDestination, ContentDraft, DraftContentType, Resource, User } from '../../types';
import { StatusBadge } from '../../components/common/StatusBadge';
import {
  ArrowLeft,
  Calendar,
  FileText,
  Download,
  Eye,
  Database,
  Shield,
  Sparkles,
  Layers,
  MapPin,
  Clock,
  UserCheck,
  CheckCircle2,
  ExternalLink,
  ChevronRight,
  AlertTriangle,
  Film,
  Image as ImageIcon,
  BarChart3,
  Share2,
  BookOpen,
  Info,
  Compass,
  GraduationCap,
  Building2,
  Globe
} from 'lucide-react';

interface ResourceDetailPageProps {
  resourceId: string;
  currentUser: User;
  onNavigate: (route: string) => void;
  onOpenMedia?: (mediaId: string) => void;
}

export const ResourceDetailPage: React.FC<ResourceDetailPageProps> = ({
  resourceId,
  currentUser,
  onNavigate,
  onOpenMedia
}) => {
  const resource = store.getResourceById(resourceId) || store.getResources()[0];
  const derivedDrafts = store.getDraftsByResourceId(resource.id);

  // AI Content Generation Modal state
  const [showAiModal, setShowAiModal] = useState(false);
  const [selectedDestination, setSelectedDestination] = useState<ContentDestination>('Research');
  const [selectedFormat, setSelectedFormat] = useState<string>('Full Article');
  const [selectedMediaFileId, setSelectedMediaFileId] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationStep, setGenerationStep] = useState('');
  const [previewFile, setPreviewFile] = useState<{ name: string; url: string; type: string } | null>(null);

  // Six explicit Content Destinations aligned with the Public Portal sections
  const destinationOptions: {
    destination: ContentDestination;
    title: string;
    description: string;
    portalRoute: string;
    icon: any;
    formats: { id: string; label: string; desc: string }[];
  }[] = [
    {
      destination: 'Research',
      title: 'Research / Website Article',
      description: 'Public scientific briefing, full article, or research card for the Research & Publications portal.',
      portalRoute: '/research',
      icon: BookOpen,
      formats: [
        { id: 'Full Article', label: 'Full Article', desc: 'Comprehensive deep-dive article with abstract and findings' },
        { id: 'News Snippet', label: 'News Snippet', desc: 'Concise newsflash for portal announcement feeds' },
        { id: 'Website Card', label: 'Website Card', desc: 'Headline, short summary, and CTA for portal content grids' },
        { id: 'Research Highlight', label: 'Research Highlight', desc: 'Curated technical takeaway with key statistics' }
      ]
    },
    {
      destination: 'Expedition',
      title: 'Expedition Archive',
      description: 'Field dossier, operational story, or campaign highlight for the Indian Polar Expeditions portal.',
      portalRoute: '/expeditions',
      icon: Compass,
      formats: [
        { id: 'Expedition Overview', label: 'Expedition Overview', desc: 'Mission objectives, platform, and timeline summary' },
        { id: 'Expedition Story / Update', label: 'Expedition Story / Update', desc: 'Field chronicle of scientific maneuvers and camp life' },
        { id: 'Expedition Highlight', label: 'Expedition Highlight', desc: 'High-impact milestone achieved during field season' }
      ]
    },
    {
      destination: 'Media',
      title: 'Media & Visual Repository',
      description: 'Verified photograph/video caption and contextual backstory for the Public Visual Catalogue.',
      portalRoute: '/media',
      icon: ImageIcon,
      formats: [
        { id: 'Media Caption', label: 'Media Caption', desc: 'Standardized institutional caption with credits and location' },
        { id: 'Gallery Description', label: 'Gallery Description', desc: 'Detailed photographic essay description with alt-text' },
        { id: 'Media Highlight', label: 'Media Highlight', desc: 'Visual spotlight for featured photo of the week' }
      ]
    },
    {
      destination: 'Activities',
      title: 'Institutional Activities Archive',
      description: 'Announcement, workshop debrief, or MoU summary for the Institutional Activities Archive.',
      portalRoute: '/activities',
      icon: Building2,
      formats: [
        { id: 'Activity Announcement', label: 'Activity Announcement', desc: 'Upcoming conference, training session, or exhibition notice' },
        { id: 'Activity Summary', label: 'Activity Summary', desc: 'Official debrief of proceedings, participants, and outcomes' },
        { id: 'Event Highlight', label: 'Event Highlight', desc: 'Key milestone or institutional MoU spotlight' }
      ]
    },
    {
      destination: 'Education',
      title: 'Education & STEM Outreach',
      description: 'Engaging, student-friendly learning material for the Student Knowledge & STEM portal.',
      portalRoute: '/education',
      icon: GraduationCap,
      formats: [
        { id: 'Educational Article', label: 'Educational Article', desc: 'Accessible science article with explanations and diagrams' },
        { id: 'Learning Resource', label: 'Learning Resource', desc: 'Study notes, glossary, and core curriculum concepts' },
        { id: 'Student-Friendly Explanation', label: 'Student-Friendly Explanation', desc: 'Fun facts, simple analogies, and questions' }
      ]
    },
    {
      destination: 'Social Media',
      title: 'Social Media Outreach',
      description: 'Platform-optimized threads and posts for official X (Twitter), LinkedIn, Facebook, and Instagram.',
      portalRoute: '/admin/publishing',
      icon: Share2,
      formats: [
        { id: 'Social Media Post', label: 'Multi-Channel Post Pack', desc: 'Ready-to-publish thread for X/Twitter and LinkedIn' }
      ]
    }
  ];

  const mediaFiles = resource.files.filter((f) => f.fileType === 'image' || f.fileType === 'video');

  const handleStartGeneration = async () => {
    setIsGenerating(true);
    setGenerationStep('Extracting scientific parameters and metadata from repository resource...');

    await new Promise((r) => setTimeout(r, 400));
    setGenerationStep(`AI synthesis: Auto-tailoring language and length for ${selectedDestination} (${selectedFormat})...`);

    await new Promise((r) => setTimeout(r, 500));

    try {
      const chosenFile = mediaFiles.find((f) => f.id === selectedMediaFileId) || mediaFiles[0];

      // Map selected destination and format to DraftContentType
      const contentTypeToUse: DraftContentType =
        selectedDestination === 'Social Media'
          ? 'Social Media Content'
          : selectedDestination === 'Media'
          ? 'Media Caption'
          : (selectedFormat as DraftContentType) || 'Website Article';

      const output = await generateContentFromResource({
        title: resource.title,
        description: resource.description,
        topic: resource.topic,
        region: resource.region,
        year: resource.year,
        leadScientists: resource.researchers.join(', '),
        stationOrVessel: resource.stationOrVessel,
        contentType: contentTypeToUse,
        contentDestination: selectedDestination,
        destinationSpecificType: selectedFormat,
        selectedFileName: chosenFile?.filename,
        selectedFileCaption: chosenFile?.caption,
        filesList: resource.files.map((f) => ({
          filename: f.filename,
          fileType: f.fileType,
          sizeMb: f.sizeMb,
          caption: f.caption
        })),
        filesSummary: `${resource.files.length} primary files attached (${resource.files.map((f) => f.filename).join(', ')})`,
        activeStatus: 'Ongoing'
      }, 500);

      // Create separate ContentDraft entity linked to this source resource
      // The original repository resource remains untouched
      const newDraft = store.addDraft({
        resourceId: resource.id,
        resourceTitle: resource.title,
        contentType: contentTypeToUse,
        contentDestination: selectedDestination,
        destinationSpecificType: selectedFormat,
        title: output.title,
        summary: output.summary,
        body: output.body,
        keyFindings: output.keyFindings,
        keywords: output.keywords,
        imageCaption: output.imageCaption,
        socialMediaText: output.socialMediaText,
        readingTimeMin: output.readingTimeMin,
        generatedByAi: true,
        aiModel: 'Gemini Polar Synthesis Pipeline v2',
        aiPromptSummary: output.aiPromptSummary,
        editedByContributor: false,
        contributorId: currentUser.id,
        contributorName: currentUser.name,
        status: 'READY_FOR_EDITING'
      });

      setIsGenerating(false);
      setShowAiModal(false);

      // Navigate to the editor for the scientist to review and refine the AI draft
      onNavigate(`/workspace/content/${newDraft.id}/edit`);
    } catch (err) {
      console.error(err);
      setIsGenerating(false);
    }
  };

  const getFileIcon = (fileType: string) => {
    switch (fileType) {
      case 'pdf':
        return <FileText className="w-4 h-4 text-rose-600" />;
      case 'image':
        return <ImageIcon className="w-4 h-4 text-sky-600" />;
      case 'video':
        return <Film className="w-4 h-4 text-purple-600" />;
      case 'data':
        return <BarChart3 className="w-4 h-4 text-emerald-600" />;
      default:
        return <FileText className="w-4 h-4 text-slate-600" />;
    }
  };

  if (currentUser.role === 'PUBLIC_USER') {
    return (
      <div className="min-h-[70vh] flex items-center justify-center p-4 sm:p-6 bg-slate-50">
        <div className="max-w-xl w-full bg-white rounded-2xl border border-slate-200 shadow-xl p-8 text-center space-y-6">
          <div className="w-14 h-14 rounded-2xl bg-amber-50 border border-amber-200 text-amber-800 flex items-center justify-center mx-auto">
            <Shield className="w-7 h-7 text-amber-700" />
          </div>

          <div className="space-y-2">
            <span className="text-[11px] font-mono uppercase tracking-wider text-amber-800 bg-amber-50 px-2.5 py-0.5 rounded border border-amber-200">
              Restricted Repository Resource #{resource.id}
            </span>
            <h1 className="text-2xl font-bold text-slate-900 font-serif">
              Internal Scientific Knowledge Repository
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-md mx-auto">
              In accordance with national polar data stewardship protocols, direct access to primary borehole stratigraphies, numerical datasets, raw attachments, and AI outreach workflows is restricted to authorized scientists and administrators.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-left text-xs space-y-1.5">
            <div className="font-semibold text-slate-800">{resource.title}</div>
            <div className="text-slate-500 text-[11px]">{resource.topic} · {resource.region} ({resource.year})</div>
            <div className="text-slate-500 text-[11px]">Preserved in NCPOR National Cryosphere Data Archive</div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button
              onClick={() => onNavigate('/login')}
              className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-xs transition"
            >
              Staff Login
            </button>
            <button
              onClick={() => onNavigate('/research')}
              className="w-full sm:w-auto px-6 py-2.5 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-700 font-semibold text-xs transition"
            >
              Explore Public Research Stories
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50/70 pb-20">
      {/* Top Header / Breadcrumb */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <button
                  onClick={() =>
                    currentUser.role === 'ADMINISTRATOR'
                      ? onNavigate('/admin/repository')
                      : onNavigate('/contributor/resources')
                  }
                  className="hover:text-slate-900 transition flex items-center gap-1 font-medium"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Scientific Knowledge Repository</span>
                </button>
                <span>/</span>
                <span className="font-mono text-slate-700 font-semibold">{resource.id}</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                {resource.title}
              </h1>
            </div>

            {/* Status, Visibility & Actions */}
            <div className="flex items-center gap-3 shrink-0 flex-wrap">
              <div className="flex items-center gap-2 px-3 py-1 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-semibold">
                <Database className="w-3.5 h-3.5 text-emerald-600" />
                <span>Status: {resource.status}</span>
              </div>

              <div className={`flex items-center gap-1.5 px-3 py-1 rounded-lg border text-xs font-semibold ${
                resource.visibility === 'PUBLIC'
                  ? 'bg-emerald-50 border-emerald-300 text-emerald-800'
                  : resource.visibility === 'PROTECTED'
                  ? 'bg-amber-50 border-amber-300 text-amber-800'
                  : 'bg-slate-100 border-slate-300 text-slate-800'
              }`}>
                <span className={`w-2 h-2 rounded-full ${
                  resource.visibility === 'PUBLIC'
                    ? 'bg-emerald-500'
                    : resource.visibility === 'PROTECTED'
                    ? 'bg-amber-500'
                    : 'bg-slate-500'
                }`}></span>
                <span>Access: {resource.visibility || 'PUBLIC'}</span>
              </div>

              <button
                onClick={() => setShowAiModal(true)}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-sky-600 hover:bg-sky-700 text-white text-xs font-medium shadow-xs transition"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Generate Content</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Prominent Architectural Distinction Notice */}
        <div className="rounded-xl border border-sky-200 bg-sky-50/60 p-4 sm:p-5 flex items-start gap-3.5">
          <div className="w-9 h-9 rounded-lg bg-sky-600 text-white flex items-center justify-center shrink-0">
            <Shield className="w-5 h-5" />
          </div>
          <div className="space-y-1 text-xs">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-slate-900 text-sm">
                Original Scientific Source Resource
              </span>
              <span className="font-mono text-[11px] text-sky-800 bg-white px-2 py-0.5 rounded border border-sky-300">
                {resource.id}
              </span>
            </div>
            <p className="text-slate-600 leading-relaxed">
              This raw scientific material is permanently preserved in the National Polar Repository. Generating AI outreach content is an optional derived layer that never alters or overwrites the original source files.
            </p>
          </div>
        </div>

        {/* SECTION 1: RESOURCE INFORMATION */}
        <section aria-labelledby="resource-info-heading" className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-6">
          <div className="border-b border-slate-100 pb-4 flex items-center justify-between">
            <h2 id="resource-info-heading" className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <Database className="w-4 h-4 text-sky-600" />
              <span>Section 1: Scientific Resource Metadata</span>
            </h2>
            <span className="text-xs text-slate-500 font-mono">
              Preserved on {new Date(resource.createdAt).toLocaleDateString()}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
            <div className="space-y-1">
              <span className="text-slate-500 text-[11px] uppercase tracking-wider">Resource Type</span>
              <div className="font-semibold text-slate-900 text-sm flex items-center gap-1.5">
                {getFileIcon(resource.type.toLowerCase())}
                <span>{resource.type}</span>
              </div>
            </div>

            <div className="space-y-1">
              <span className="text-slate-500 text-[11px] uppercase tracking-wider">Polar Region</span>
              <div className="font-semibold text-slate-900 text-sm flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-slate-400" />
                <span>{resource.region}</span>
              </div>
            </div>

            <div className="space-y-1">
              <span className="text-slate-500 text-[11px] uppercase tracking-wider">Research Domain</span>
              <div className="font-semibold text-slate-900 text-sm">
                {resource.topic} ({resource.year})
              </div>
            </div>

            <div className="space-y-1 md:col-span-2">
              <span className="text-slate-500 text-[11px] uppercase tracking-wider">Lead Researchers & Authors</span>
              <div className="font-medium text-slate-800">
                {resource.researchers.join(' · ')}
              </div>
            </div>

            <div className="space-y-1">
              <span className="text-slate-500 text-[11px] uppercase tracking-wider">Uploaded By</span>
              <div className="font-medium text-slate-800">
                {resource.uploaderName}
              </div>
            </div>

            {resource.expeditionName && (
              <div className="space-y-1 md:col-span-2">
                <span className="text-slate-500 text-[11px] uppercase tracking-wider">Expedition / Project</span>
                <div className="font-medium text-sky-900">
                  {resource.expeditionName}
                </div>
              </div>
            )}

            {resource.stationOrVessel && (
              <div className="space-y-1">
                <span className="text-slate-500 text-[11px] uppercase tracking-wider">Station / Vessel</span>
                <div className="font-medium text-slate-800">
                  {resource.stationOrVessel}
                </div>
              </div>
            )}
          </div>

          <div className="space-y-2 pt-2 border-t border-slate-100 text-xs">
            <span className="text-slate-500 text-[11px] uppercase tracking-wider block">
              Scientific Abstract / Description
            </span>
            <p className="text-slate-700 leading-relaxed font-sans text-sm">
              {resource.description}
            </p>
          </div>

          {resource.keywords && resource.keywords.length > 0 && (
            <div className="space-y-1.5 pt-2 border-t border-slate-100 text-xs">
              <span className="text-slate-500 text-[11px] uppercase tracking-wider block">Keywords</span>
              <div className="flex flex-wrap gap-1.5 text-slate-600">
                {resource.keywords.map((kw, i) => (
                  <span key={i} className="bg-slate-100 px-2 py-0.5 rounded text-[11px]">
                    #{kw}
                  </span>
                ))}
              </div>
            </div>
          )}
        </section>

        {/* SECTION 2: ORIGINAL SOURCE MATERIAL */}
        <section aria-labelledby="source-files-heading" className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
          <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
            <h2 id="source-files-heading" className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <FileText className="w-4 h-4 text-sky-600" />
              <span>Section 2: Original Preserved Source Material ({resource.files.length} Files)</span>
            </h2>
            <span className="text-xs text-slate-500">
              Read-only immutable archive
            </span>
          </div>

          <div className="space-y-2.5">
            {resource.files.map((file) => (
              <div
                key={file.id}
                className="flex flex-col sm:flex-row sm:items-center justify-between p-3.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-white hover:border-sky-300 transition text-xs gap-3"
              >
                <div className="flex items-start sm:items-center gap-3 min-w-0">
                  <div className="w-9 h-9 rounded-lg bg-white border border-slate-200 flex items-center justify-center shrink-0">
                    {getFileIcon(file.fileType)}
                  </div>
                  <div className="min-w-0">
                    <div className="font-semibold text-slate-900 truncate">
                      {file.filename}
                    </div>
                    <div className="text-[11px] text-slate-500 flex items-center gap-2 flex-wrap">
                      <span className="uppercase font-mono">{file.fileType}</span>
                      <span>·</span>
                      <span>{file.sizeMb} MB</span>
                      {file.caption && (
                        <>
                          <span>·</span>
                          <span className="truncate italic text-slate-600">{file.caption}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => setPreviewFile({ name: file.filename, url: file.url, type: file.fileType })}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 transition"
                  >
                    <Eye className="w-3.5 h-3.5 text-slate-500" />
                    <span>Inspect</span>
                  </button>
                  <a
                    href={file.url}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white transition"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 3: CREATE OUTREACH CONTENT (AI ASSISTED) */}
        <section aria-labelledby="ai-content-heading" className="bg-gradient-to-br from-slate-900 via-sky-950 to-slate-900 text-white rounded-2xl p-6 sm:p-8 shadow-md space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-sky-500/20 text-sky-300 text-[11px] font-semibold border border-sky-400/30">
                <Sparkles className="w-3 h-3 text-sky-300" />
                <span>AI-Assisted Knowledge Transformation</span>
              </div>
              <h2 id="ai-content-heading" className="text-xl sm:text-2xl font-bold tracking-tight text-white">
                Create Audience-Ready Outreach Content
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Use this scientific resource to create audience-ready content with AI assistance. The AI synthesizes drafts for public articles, classroom explainers, or expedition summaries without altering the preserved original files.
              </p>
            </div>

            <button
              onClick={() => setShowAiModal(true)}
              className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs shadow-lg transition active:scale-95 shrink-0"
            >
              <Sparkles className="w-4 h-4" />
              <span>Generate Content with AI</span>
            </button>
          </div>
        </section>

        {/* SECTION 4: DERIVED OUTREACH CONTENT */}
        <section aria-labelledby="derived-content-heading" className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
          <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
            <div>
              <h2 id="derived-content-heading" className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                <Layers className="w-4 h-4 text-sky-600" />
                <span>Section 4: Derived Outreach Content ({derivedDrafts.length} Pieces)</span>
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Audience-facing publications generated from this original source resource.
              </p>
            </div>

            <button
              onClick={() => setShowAiModal(true)}
              className="text-xs font-medium text-sky-700 hover:text-sky-900 transition flex items-center gap-1"
            >
              <span>+ Add another content type</span>
            </button>
          </div>

          {derivedDrafts.length === 0 ? (
            <div className="text-center py-10 px-4 border border-dashed border-slate-200 rounded-xl bg-slate-50/50 space-y-3">
              <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center mx-auto text-slate-500">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-semibold text-slate-900">
                  No public outreach content created yet
                </h4>
                <p className="text-xs text-slate-500 max-w-md mx-auto mt-1">
                  The original scientific material is safely preserved in the repository. Click <strong>Generate Content with AI</strong> above whenever you wish to translate this resource into a public-facing communication piece.
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              {derivedDrafts.map((draft) => (
                <div
                  key={draft.id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl border border-slate-200 hover:border-slate-300 bg-white transition gap-4 text-xs"
                >
                  <div className="space-y-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[11px] text-slate-500">{draft.id}</span>
                      <span className="text-slate-300">·</span>
                      <span className="font-semibold text-sky-800">{draft.contentType}</span>
                      <span className="text-slate-300">·</span>
                      <StatusBadge status={draft.status} size="sm" />
                    </div>
                    <h3 className="font-bold text-slate-900 text-sm truncate">
                      {draft.title}
                    </h3>
                    <p className="text-[11px] text-slate-500 line-clamp-1">
                      {draft.summary}
                    </p>
                    <div className="text-[11px] text-slate-400 flex items-center gap-3 pt-1">
                      <span>Author: {draft.contributorName}</span>
                      {draft.readingTimeMin && <span>· {draft.readingTimeMin} min read</span>}
                      {draft.publishedAt && (
                        <span>· Published: {new Date(draft.publishedAt).toLocaleDateString()}</span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    {draft.status === 'PUBLISHED' && (
                      <button
                        onClick={() => onNavigate(`/content/${draft.id}`)}
                        className="px-3 py-1.5 rounded-lg bg-sky-50 text-sky-700 hover:bg-sky-100 border border-sky-200 transition font-medium flex items-center gap-1"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>View Public Article</span>
                      </button>
                    )}

                    {(currentUser.role === 'CONTENT_CONTRIBUTOR' || currentUser.role === 'ADMINISTRATOR') && (
                      <button
                        onClick={() => onNavigate(`/contributor/content/${draft.id}/edit`)}
                        className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 transition font-medium flex items-center gap-1"
                      >
                        <span>Edit Draft</span>
                      </button>
                    )}

                    {currentUser.role === 'ADMINISTRATOR' && draft.status === 'UNDER_REVIEW' && (
                      <button
                        onClick={() => onNavigate(`/admin/reviews/${draft.id}`)}
                        className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white transition font-medium flex items-center gap-1"
                      >
                        <span>Review Queue</span>
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>

      {/* AI Content Generation Modal / Drawer */}
      {showAiModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-fadeIn">
          <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden relative">
            {/* Header */}
            <div className="bg-slate-900 px-6 py-4 text-white flex items-center justify-between border-b border-slate-800">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-sky-500/20 text-sky-300">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-sm">
                    Generate Outreach Content from Repository Resource
                  </h3>
                  <p className="text-[11px] text-slate-400">
                    Source: <span className="font-mono text-sky-300">{resource.id}</span> · {resource.title}
                  </p>
                </div>
              </div>
              <button
                onClick={() => !isGenerating && setShowAiModal(false)}
                disabled={isGenerating}
                className="text-slate-400 hover:text-white transition"
              >
                ✕
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-5 text-xs">
              {isGenerating ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-12 h-12 rounded-full border-3 border-sky-200 border-t-sky-600 animate-spin mx-auto"></div>
                  <div>
                    <h4 className="font-bold text-sm text-slate-900">
                      AI Synthesis in Progress...
                    </h4>
                    <p className="text-slate-500 font-mono text-[11px] mt-1">
                      {generationStep}
                    </p>
                  </div>
                  <p className="text-[11px] text-slate-400 max-w-md mx-auto">
                    Transforming dense polar data into peer-review-ready public draft without altering original repository files.
                  </p>
                </div>
              ) : (
                <>
                  {/* Step 1: Content Destination Selection */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <label className="font-bold text-slate-900 uppercase tracking-wider text-[11px] block">
                        1. Select Content Destination (Public Portal Section):
                      </label>
                      <span className="text-[10px] text-sky-800 font-semibold bg-sky-50 px-2 py-0.5 rounded border border-sky-200">
                        Public Portal Workflow
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                      {destinationOptions.map((item) => {
                        const Icon = item.icon;
                        const isSelected = selectedDestination === item.destination;
                        return (
                          <button
                            key={item.destination}
                            type="button"
                            onClick={() => {
                              setSelectedDestination(item.destination);
                              setSelectedFormat(item.formats[0].id);
                            }}
                            className={`p-3 rounded-xl border text-left transition flex flex-col justify-between space-y-2 ${
                              isSelected
                                ? 'bg-sky-50/90 border-sky-500 ring-2 ring-sky-500/20 text-sky-950 shadow-xs'
                                : 'bg-white border-slate-200 hover:border-slate-300 text-slate-700'
                            }`}
                          >
                            <div className="flex items-center justify-between gap-1">
                              <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                                isSelected ? 'bg-sky-600 text-white' : 'bg-slate-100 text-slate-500'
                              }`}>
                                <Icon className="w-3.5 h-3.5" />
                              </div>
                              <span className="text-[10px] font-mono text-slate-400 truncate">
                                {item.portalRoute}
                              </span>
                            </div>
                            <div>
                              <div className="font-bold text-xs text-slate-900">{item.title}</div>
                              <p className="text-[10px] text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                                {item.description}
                              </p>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Step 2: Specific Output Format for Chosen Destination */}
                  <div className="space-y-2 pt-2 border-t border-slate-100">
                    <label className="font-bold text-slate-900 uppercase tracking-wider text-[11px] block">
                      2. Select Specific Format for {selectedDestination}:
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {destinationOptions
                        .find((d) => d.destination === selectedDestination)
                        ?.formats.map((fmt) => {
                          const isFmtSelected = selectedFormat === fmt.id;
                          return (
                            <button
                              key={fmt.id}
                              type="button"
                              onClick={() => setSelectedFormat(fmt.id)}
                              className={`p-2.5 rounded-xl border text-left transition ${
                                isFmtSelected
                                  ? 'border-indigo-500 bg-indigo-50/70 text-indigo-950 ring-1 ring-indigo-500/30'
                                  : 'border-slate-200 bg-slate-50/50 hover:bg-slate-100/70 text-slate-700'
                              }`}
                            >
                              <div className="flex items-center justify-between">
                                <span className="font-bold text-xs">{fmt.label}</span>
                                {isFmtSelected && <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600" />}
                              </div>
                              <p className="text-[10px] text-slate-500 mt-0.5">{fmt.desc}</p>
                            </button>
                          );
                        })}
                    </div>
                  </div>

                  {/* Media file picker if Media destination is selected */}
                  {selectedDestination === 'Media' && mediaFiles.length > 0 && (
                    <div className="space-y-2 pt-2 border-t border-slate-100">
                      <label className="font-bold text-slate-800 uppercase tracking-wider text-[11px] block">
                        Associated Media File to Caption:
                      </label>
                      <select
                        value={selectedMediaFileId || mediaFiles[0]?.id}
                        onChange={(e) => setSelectedMediaFileId(e.target.value)}
                        className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs text-slate-800 bg-white"
                      >
                        {mediaFiles.map((file) => (
                          <option key={file.id} value={file.id}>
                            {file.filename} ({file.fileType.toUpperCase()}) — {file.caption || 'Scientific artifact'}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}

                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-[11px] text-slate-600 space-y-1.5">
                    <div className="font-semibold text-slate-800 flex items-center gap-1.5">
                      <Info className="w-3.5 h-3.5 text-sky-600 shrink-0" />
                      <span>Institutional Governance Workflow:</span>
                    </div>
                    <p className="leading-relaxed">
                      Scientific Repository Resource → Select Output Type → AI Generate Draft → Scientist Reviews/Edits → Submit for Admin Review → Admin Approves → Publish. The original repository resource remains safely preserved.
                    </p>
                  </div>

                  <div className="flex items-center justify-end gap-3 pt-2 border-t border-slate-100">
                    <button
                      type="button"
                      onClick={() => setShowAiModal(false)}
                      className="px-4 py-2 rounded-lg text-slate-600 hover:bg-slate-100 transition"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={handleStartGeneration}
                      className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-sky-600 hover:bg-sky-700 text-white font-medium transition shadow-xs"
                    >
                      <Sparkles className="w-4 h-4" />
                      <span>Generate {selectedFormat || selectedDestination}</span>
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* File Inspection Modal */}
      {previewFile && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs animate-fadeIn">
          <div className="w-full max-w-3xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
            <div className="bg-slate-900 px-6 py-3.5 text-white flex items-center justify-between">
              <span className="font-semibold text-xs truncate">{previewFile.name}</span>
              <button onClick={() => setPreviewFile(null)} className="text-slate-400 hover:text-white">✕</button>
            </div>
            <div className="p-6 text-center text-xs space-y-4">
              {previewFile.type === 'image' ? (
                <img src={previewFile.url} alt={previewFile.name} className="max-h-[60vh] mx-auto rounded-lg object-contain shadow-xs" />
              ) : previewFile.type === 'video' ? (
                <video controls className="w-full max-h-[60vh] rounded-lg bg-black">
                  <source src={previewFile.url} type="video/mp4" />
                </video>
              ) : (
                <div className="p-8 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
                  <FileText className="w-12 h-12 text-slate-400 mx-auto" />
                  <p className="font-semibold text-slate-800">{previewFile.name}</p>
                  <p className="text-slate-500 text-[11px]">
                    Preserved binary resource verified in NCPOR scientific digital vault.
                  </p>
                  <a
                    href={previewFile.url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-slate-900 text-white font-medium"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download Original File</span>
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
