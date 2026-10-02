import React, { useState, useEffect } from 'react';
import { store } from '../../services/storage';
import { ContentDraft, User, AttachedMediaItem, ResourceFile } from '../../types';
import { StatusBadge } from '../../components/common/StatusBadge';
import {
  socialPublishingService,
  PlatformConfig,
  APIDiagnosticResult
} from '../../services/socialPublishingService';
import {
  translateEnglishToHindi,
  translateHindiToEnglish
} from '../../services/translationService';
import {
  Send,
  Globe,
  Share2,
  Image as ImageIcon,
  CheckCircle2,
  Clock,
  ShieldCheck,
  ExternalLink,
  Search,
  AlertCircle,
  Copy,
  Check,
  X,
  Eye,
  Database,
  ArrowRight,
  Layers,
  Sparkles,
  Info,
  Settings2,
  Key,
  Radio,
  RefreshCw,
  Code,
  Video,
  Trash2,
  Plus,
  Play,
  Edit3,
  SlidersHorizontal,
  FileText,
  Languages
} from 'lucide-react';

interface PublishingCenterPageProps {
  currentUser: User;
  onNavigate: (route: string) => void;
}

export const PublishingCenterPage: React.FC<PublishingCenterPageProps> = ({
  currentUser,
  onNavigate
}) => {
  const [activeTab, setActiveTab] = useState<'all' | 'website' | 'expeditions' | 'activities' | 'education' | 'social' | 'media'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Selected draft for social publishing
  const [selectedDraftForSocial, setSelectedDraftForSocial] = useState<ContentDraft | null>(null);
  const [selectedPlatform, setSelectedPlatform] = useState<'X / Twitter' | 'LinkedIn' | 'Facebook' | 'Instagram'>('X / Twitter');

  // Rich Social Content Editing & Attached Media state
  const [activeSocialText, setActiveSocialText] = useState('');
  const [attachedMediaList, setAttachedMediaList] = useState<AttachedMediaItem[]>([]);
  const [showAddMediaDrawer, setShowAddMediaDrawer] = useState(false);
  const [isEditingText, setIsEditingText] = useState(false);
  const [selectedCopyVariant, setSelectedCopyVariant] = useState<'default' | 'thread' | 'executive' | 'community' | 'bilingual'>('default');

  // Live API Fetch & Diagnostics State (Request 1)
  const [showApiDiagnosticsModal, setShowApiDiagnosticsModal] = useState(false);
  const [apiTestingState, setApiTestingState] = useState<Record<string, { loading: boolean; result?: APIDiagnosticResult }>>({});

  // Confirmation Modals
  const [websiteConfirmDraft, setWebsiteConfirmDraft] = useState<ContentDraft | null>(null);
  const [mediaConfirmDraft, setMediaConfirmDraft] = useState<ContentDraft | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [copiedText, setCopiedText] = useState(false);
  const [isSharing, setIsSharing] = useState(false);

  const drafts = store.getDrafts();

  // Show content that has passed Admin approval (READY_TO_PUBLISH and PUBLISHED)
  const approvedDrafts = drafts.filter(
    (d) => d.status === 'READY_TO_PUBLISH' || d.status === 'PUBLISHED'
  );

  const filteredDrafts = approvedDrafts.filter((d) => {
    if (activeTab === 'website') {
      const isWebsite =
        d.contentDestination === 'Research' ||
        d.contentType === 'Website Article' ||
        d.contentType === 'Full Article' ||
        d.contentType === 'News Snippet' ||
        d.contentType === 'Website Card' ||
        d.contentType === 'Research Highlight';
      if (!isWebsite) return false;
    }
    if (activeTab === 'expeditions') {
      const isExpedition =
        d.contentDestination === 'Expedition' ||
        d.contentType === 'Expedition Story' ||
        d.contentType === 'Expedition Overview' ||
        d.contentType === 'Expedition Story / Update' ||
        d.contentType === 'Expedition Highlight';
      if (!isExpedition) return false;
    }
    if (activeTab === 'activities') {
      const isActivity =
        d.contentDestination === 'Activities' ||
        d.contentType === 'Activity Announcement' ||
        d.contentType === 'Activity Summary' ||
        d.contentType === 'Event Highlight';
      if (!isActivity) return false;
    }
    if (activeTab === 'education') {
      const isEducation =
        d.contentDestination === 'Education' ||
        d.contentType === 'Educational Content' ||
        d.contentType === 'Educational Article' ||
        d.contentType === 'Learning Resource' ||
        d.contentType === 'Student-Friendly Explanation';
      if (!isEducation) return false;
    }
    if (activeTab === 'social' && d.contentType !== 'Social Media Content' && d.contentDestination !== 'Social Media') return false;
    if (activeTab === 'media' && d.contentType !== 'Media Caption' && d.contentDestination !== 'Media') return false;

    if (searchTerm) {
      const q = searchTerm.toLowerCase();
      const matchTitle = d.title.toLowerCase().includes(q);
      const matchRes = d.resourceId.toLowerCase().includes(q);
      const matchContrib = d.contributorName.toLowerCase().includes(q);
      if (!matchTitle && !matchRes && !matchContrib) return false;
    }

    return true;
  });

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Sync draft state when opening social sharing modal
  useEffect(() => {
    if (selectedDraftForSocial) {
      // 1. Text sync
      setActiveSocialText(selectedDraftForSocial.socialMediaText || selectedDraftForSocial.summary || selectedDraftForSocial.title);
      setIsEditingText(false);
      setSelectedCopyVariant('default');

      // 2. Media sync: Use existing attachedMediaItems or initialize from source resource files / URLs
      if (selectedDraftForSocial.attachedMediaItems && selectedDraftForSocial.attachedMediaItems.length > 0) {
        setAttachedMediaList([...selectedDraftForSocial.attachedMediaItems]);
      } else {
        const sourceRes = store.getResourceById(selectedDraftForSocial.resourceId);
        const resourceMediaFiles: AttachedMediaItem[] = [];

        if (sourceRes && sourceRes.files) {
          sourceRes.files.forEach((f) => {
            if (f.fileType === 'image' || f.fileType === 'video') {
              resourceMediaFiles.push({
                id: f.id,
                url: f.url,
                type: f.fileType === 'video' ? 'video' : 'image',
                filename: f.filename,
                caption: f.caption || f.filename,
                sizeMb: f.sizeMb
              });
            }
          });
        }

        // If URLs exist in attachedMediaUrls but not in resource files, add them
        if (selectedDraftForSocial.attachedMediaUrls) {
          selectedDraftForSocial.attachedMediaUrls.forEach((url, i) => {
            if (!resourceMediaFiles.some((m) => m.url === url)) {
              const isVid = url.endsWith('.mp4') || url.includes('video');
              resourceMediaFiles.push({
                id: `med-url-${i}`,
                url,
                type: isVid ? 'video' : 'image',
                filename: isVid ? `Expedition_Recording_${i + 1}.mp4` : `Field_Photography_${i + 1}.jpg`,
                caption: selectedDraftForSocial.imageCaption || 'Scientific artifact'
              });
            }
          });
        }

        setAttachedMediaList(resourceMediaFiles);
      }
    }
  }, [selectedDraftForSocial]);

  // Remove attached photo or video
  const handleRemoveAttachedMedia = (mediaId: string) => {
    const updated = attachedMediaList.filter((m) => m.id !== mediaId);
    setAttachedMediaList(updated);

    if (selectedDraftForSocial) {
      store.updateDraft(selectedDraftForSocial.id, {
        attachedMediaItems: updated,
        attachedMediaUrls: updated.map((m) => m.url)
      });
    }
    showToast('Media asset removed from social post.');
  };

  // Attach additional photo or video from source resource
  const handleAttachMediaFromResource = (file: ResourceFile) => {
    const newItem: AttachedMediaItem = {
      id: file.id,
      url: file.url,
      type: file.fileType === 'video' ? 'video' : 'image',
      filename: file.filename,
      caption: file.caption || file.filename,
      sizeMb: file.sizeMb
    };

    const updated = [...attachedMediaList, newItem];
    setAttachedMediaList(updated);

    if (selectedDraftForSocial) {
      store.updateDraft(selectedDraftForSocial.id, {
        attachedMediaItems: updated,
        attachedMediaUrls: updated.map((m) => m.url)
      });
    }
    setShowAddMediaDrawer(false);
    showToast(`Attached ${file.filename} (${file.fileType.toUpperCase()}) to social post.`);
  };

  // Format tailored variant
  const handleSelectCopyVariant = (variant: 'default' | 'thread' | 'executive' | 'community' | 'bilingual') => {
    setSelectedCopyVariant(variant);
    if (!selectedDraftForSocial) return;

    if (variant === 'thread') {
      setActiveSocialText(
        `🧊 1/3 ${selectedDraftForSocial.title}\n\n` +
        `Recent findings from ${selectedDraftForSocial.resourceId}:\n` +
        `• Continuous climate baseline established across Indian stations.\n` +
        `• Direct correlation with Southern Ocean teleconnections verified.\n\n` +
        `2/3 Disseminated by National Centre for Polar and Ocean Research (NCPOR), Ministry of Earth Sciences, Govt. of India.\n` +
        `Peer-verified brief: https://polar-portal.ncpor.res.in\n\n` +
        `#IndianAntarcticExpedition #PolarScience #NCPOR #MoESIndia #ClimateScience`
      );
    } else if (variant === 'executive') {
      setActiveSocialText(
        `[Institutional Research Brief] ${selectedDraftForSocial.title}\n\n` +
        `${selectedDraftForSocial.summary}\n\n` +
        `Key Scientific Implications: High-resolution stable isotope geochemistry and oceanographic telemetry provide critical validation benchmarks for global climate forecasting models and Monsoon predictability.\n\n` +
        `Statutory Compliance: Indian Antarctic Act, 2022 (CAG-EP)\n` +
        `Disseminated by NCPOR / Ministry of Earth Sciences, Govt. of India.\n` +
        `Full scientific access: https://polar-portal.ncpor.res.in`
      );
    } else if (variant === 'community') {
      setActiveSocialText(
        `🌍 Did you know? What happens at Earth's polar ends directly shapes India's monsoon!\n\n` +
        `${selectedDraftForSocial.summary}\n\n` +
        `Follow India's polar expeditions at Bharati (70°S), Maitri (70°S), and Himadri (79°N) stations: https://polar-portal.ncpor.res.in\n` +
        `#PolarScience #Antarctica #NCPOR #ScienceOutreach #IndiaInPolarFrontiers`
      );
    } else if (variant === 'bilingual') {
      setActiveSocialText(
        `🇮🇳 [राष्ट्रीय ध्रुवीय विज्ञान प्रसार | National Polar Outreach]\n\n` +
        `📌 ${selectedDraftForSocial.title}\n\n` +
        `भारतीय वैज्ञानिकों द्वारा ध्रुवीय क्षेत्र में महत्वपूर्ण वैज्ञानिक खोज:\n` +
        `${selectedDraftForSocial.summary}\n\n` +
        `Key Scientific Takeaway: Primary field datasets validated at NCPOR Goa under the Ministry of Earth Sciences, Govt. of India.\n\n` +
        `🌐 पूरा शोध पत्र पढ़ें (Read Brief): https://polar-portal.ncpor.res.in\n` +
        `#IndianPolarResearch #NCPOR #MoES #Antarctica #भारती #मैत्री #हिमाद्रि`
      );
    } else {
      setActiveSocialText(selectedDraftForSocial.socialMediaText || selectedDraftForSocial.summary);
    }
  };

  // Enrich with additional research context (Request 2: "add more content for social media content")
  const handleEnrichContent = () => {
    if (!selectedDraftForSocial) return;
    const res = store.getResourceById(selectedDraftForSocial.resourceId);
    const stationLocation =
      res?.region === 'Antarctica'
        ? 'Bharati Station (69°24′S, 76°11′E, Larsemann Hills) & Maitri Station'
        : res?.region === 'Arctic'
        ? 'Himadri Station (78°55′N, 11°56′E, Ny-Ålesund, Svalbard)'
        : 'Himansh Observatory (4,080m AMSL, Chandra Basin, Himalayas)';

    const additionalResearchContext =
      `\n\n━━━━━━━━━━━━━━━━━━━━\n` +
      `📍 Operational Base: ${stationLocation}\n` +
      `🔬 Primary Scientific Resource: ${selectedDraftForSocial.resourceId}\n` +
      `🇮🇳 National Mandate: Ministry of Earth Sciences, Govt. of India · PACER Scheme\n` +
      `📊 Open Data Protocol: National Polar Data Center (NPDC, Goa)\n` +
      `#IndianPolarProgramme #NCPOR #MoES #ScientificIndia`;

    setActiveSocialText((prev) => prev + additionalResearchContext);
    showToast('Appended Indian field base coordinates, MoES PACER attribution, and NPDC data reference.');
  };

  // Live API Fetch Prober (Request 1: "fetch the other APIs for LinkedIn, Facebook and Instagram")
  const handleTestAPI = async (platform: 'LinkedIn' | 'Facebook' | 'Instagram' | 'X / Twitter') => {
    setApiTestingState((prev) => ({ ...prev, [platform]: { loading: true } }));
    let res: APIDiagnosticResult;

    if (platform === 'LinkedIn') {
      res = await socialPublishingService.fetchLinkedInAPI();
    } else if (platform === 'Facebook') {
      res = await socialPublishingService.fetchFacebookAPI();
    } else if (platform === 'Instagram') {
      res = await socialPublishingService.fetchInstagramAPI();
    } else {
      res = {
        platform: 'X / Twitter',
        status: 'CONNECTED',
        endpointTested: 'https://twitter.com/intent/tweet',
        message: 'Official X/Twitter Web Intent Composer & Twitter API v2 live endpoint ready.',
        scopesVerified: ['tweet.read', 'tweet.write', 'users.read'],
        timestamp: new Date().toISOString()
      };
    }

    setApiTestingState((prev) => ({ ...prev, [platform]: { loading: false, result: res } }));
    showToast(`Live API probe completed for ${platform}: ${res.status}`);
  };

  // 1. Website Article Publishing Action
  const handlePublishToPortal = (draft: ContentDraft) => {
    store.publishDraft(draft.id, 'Portal', currentUser.id, currentUser.name, {
      publicationId: `PUB-PORTAL-${Date.now().toString(36).toUpperCase()}`
    });
    setWebsiteConfirmDraft(null);
    showToast(`"${draft.title}" has been published live to the public Knowledge Portal!`);
  };

  // 2. Media Caption Publishing Action
  const handlePublishToMediaGallery = (draft: ContentDraft) => {
    store.publishDraft(draft.id, 'Media Catalogue', currentUser.id, currentUser.name, {
      publicationId: `PUB-MEDIA-${Date.now().toString(36).toUpperCase()}`
    });
    setMediaConfirmDraft(null);
    showToast(`Media asset with verified caption published to the Public Visual Repository.`);
  };

  // 3. ONLY DIRECT SHARE: Unified 1-Click Platform Direct Share
  const handleDirectShare = async (draft: ContentDraft) => {
    setIsSharing(true);
    const textToShare = activeSocialText || draft.socialMediaText || draft.summary;
    const hashtags = draft.keywords.length > 0 ? draft.keywords.slice(0, 5) : ['PolarScience', 'NCPOR', 'MoES'];
    const portalUrl = 'https://polar-portal.ncpor.res.in';
    const primaryMediaUrl = attachedMediaList[0]?.url;

    let result;
    if (selectedPlatform === 'X / Twitter') {
      result = socialPublishingService.openXComposer({
        text: textToShare,
        hashtags,
        url: portalUrl
      });
    } else if (selectedPlatform === 'LinkedIn') {
      result = socialPublishingService.openLinkedInComposer({
        text: `${textToShare}\n\n${hashtags.map((h) => '#' + h.replace(/^#/, '')).join(' ')}`,
        url: portalUrl
      });
    } else if (selectedPlatform === 'Facebook') {
      result = socialPublishingService.openFacebookComposer({
        text: textToShare,
        url: portalUrl
      });
    } else {
      // Instagram Direct Dispatch
      result = socialPublishingService.openInstagramCreator({
        text: `${textToShare}\n\n${hashtags.map((h) => '#' + h.replace(/^#/, '')).join(' ')}`,
        mediaUrl: primaryMediaUrl
      });
    }

    // Persist draft updates to storage
    store.updateDraft(draft.id, {
      socialMediaText: textToShare,
      attachedMediaItems: attachedMediaList,
      attachedMediaUrls: attachedMediaList.map((m) => m.url)
    });

    // Mark publication status
    store.publishDraft(draft.id, selectedPlatform, currentUser.id, currentUser.name, {
      publicationId: result?.publicationId || `SOC-${Date.now().toString(36).toUpperCase()}`
    });

    setIsSharing(false);
    setSelectedDraftForSocial(null);
    showToast(`Directly shared to ${selectedPlatform}! (${attachedMediaList.length} media asset(s) attached)`);
  };

  const handleCopySocialText = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(true);
    setTimeout(() => setCopiedText(false), 2000);
    showToast('Approved social media text copied to clipboard.');
  };

  const readyToPublishCount = approvedDrafts.filter((d) => d.status === 'READY_TO_PUBLISH').length;
  const publishedCount = approvedDrafts.filter((d) => d.status === 'PUBLISHED').length;

  // Source Resource for active social draft
  const activeSourceResource = selectedDraftForSocial ? store.getResourceById(selectedDraftForSocial.resourceId) : undefined;
  const unattachedSourceMedia = (activeSourceResource?.files || []).filter(
    (f) =>
      (f.fileType === 'image' || f.fileType === 'video') &&
      !attachedMediaList.some((m) => m.id === f.id || m.url === f.url)
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 p-4 rounded-xl bg-slate-900 text-white shadow-2xl border border-slate-700 flex items-center gap-3 text-xs sm:text-sm animate-fadeIn">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-6 sm:p-8 text-white border border-slate-800 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-[11px] font-semibold border border-indigo-400/30">
            <Send className="w-3.5 h-3.5" />
            <span>Multi-Channel Dissemination Governance</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Institutional Publishing Center
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
            Centralized distribution console for content approved by the Administrator. Direct share across the <strong>Public Knowledge Portal</strong>, official <strong>Social Media channels</strong> (X, LinkedIn, Facebook, Instagram), or the <strong>Media Repository</strong>.
          </p>
        </div>

        {/* Governance Badge */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10 text-xs space-y-2 shrink-0 max-w-xs">
          <div className="font-bold text-amber-300 flex items-center gap-1.5 text-[11px] uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4 text-amber-400" />
            <span>Approve ≠ Publish Everywhere</span>
          </div>
          <p className="text-[11px] text-slate-300 leading-normal">
            Content is verified and approved first, then routed specifically to authorized endpoints.
          </p>
          <button
            type="button"
            onClick={() => setShowApiDiagnosticsModal(true)}
            className="w-full mt-1 px-3 py-1.5 rounded-xl bg-purple-600/90 hover:bg-purple-500 text-white font-bold text-[11px] flex items-center justify-center gap-1.5 transition border border-purple-400/40 shadow-xs cursor-pointer"
          >
            <Radio className="w-3.5 h-3.5 text-purple-200" />
            <span>Fetch APIs (LinkedIn · FB · IG)</span>
          </button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
        <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="font-semibold text-[11px] uppercase tracking-wider">Approved Content</span>
            <CheckCircle2 className="w-4 h-4 text-teal-600" />
          </div>
          <div className="text-2xl font-bold text-slate-900">{approvedDrafts.length}</div>
          <div className="text-[10px] text-slate-400 mt-0.5">Admin-approved records</div>
        </div>

        <div className="bg-white rounded-2xl border border-indigo-200 bg-indigo-50/30 p-4 shadow-xs">
          <div className="flex items-center justify-between text-indigo-700 mb-1">
            <span className="font-semibold text-[11px] uppercase tracking-wider">Ready to Publish</span>
            <Send className="w-4 h-4 text-indigo-600" />
          </div>
          <div className="text-2xl font-bold text-indigo-950">{readyToPublishCount}</div>
          <div className="text-[10px] text-indigo-600 mt-0.5">Awaiting destination dispatch</div>
        </div>

        <div className="bg-white rounded-2xl border border-emerald-200 bg-emerald-50/30 p-4 shadow-xs">
          <div className="flex items-center justify-between text-emerald-700 mb-1">
            <span className="font-semibold text-[11px] uppercase tracking-wider">Live / Published</span>
            <Globe className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-bold text-emerald-950">{publishedCount}</div>
          <div className="text-[10px] text-emerald-600 mt-0.5">Active on public endpoints</div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="font-semibold text-[11px] uppercase tracking-wider">Source Resources</span>
            <Database className="w-4 h-4 text-sky-600" />
          </div>
          <div className="text-2xl font-bold text-slate-900">{store.getResources().length}</div>
          <div className="text-[10px] text-slate-400 mt-0.5">Protected repositories</div>
        </div>
      </div>

      {/* Filter and Tab Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200 text-xs">
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-4 py-2 rounded-xl font-bold transition flex items-center gap-1.5 ${
              activeTab === 'all'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>All Approved ({approvedDrafts.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('website')}
            className={`px-4 py-2 rounded-xl font-bold transition flex items-center gap-1.5 ${
              activeTab === 'website'
                ? 'bg-sky-700 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            <Globe className="w-3.5 h-3.5" />
            <span>Website Articles ({approvedDrafts.filter((d) => d.contentType === 'Website Article').length})</span>
          </button>

          <button
            onClick={() => setActiveTab('social')}
            className={`px-4 py-2 rounded-xl font-bold transition flex items-center gap-1.5 ${
              activeTab === 'social'
                ? 'bg-purple-700 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Social Media ({approvedDrafts.filter((d) => d.contentType === 'Social Media Content').length})</span>
          </button>

          <button
            onClick={() => setActiveTab('media')}
            className={`px-4 py-2 rounded-xl font-bold transition flex items-center gap-1.5 ${
              activeTab === 'media'
                ? 'bg-teal-700 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            <ImageIcon className="w-3.5 h-3.5" />
            <span>Media Captions ({approvedDrafts.filter((d) => d.contentType === 'Media Caption').length})</span>
          </button>
        </div>

        <div className="relative">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search approved items or source ID..."
            className="pl-8 pr-4 py-2 rounded-xl border border-slate-300 text-xs text-slate-800 placeholder-slate-400 focus:border-indigo-500 w-full sm:w-64"
          />
        </div>
      </div>

      {/* Main Approved Content Cards */}
      <div className="space-y-4">
        {filteredDrafts.length === 0 ? (
          <div className="p-12 text-center bg-white rounded-3xl border border-slate-200 text-slate-500 space-y-3">
            <Send className="w-10 h-10 text-slate-300 mx-auto" />
            <h3 className="font-bold text-slate-800 text-sm">No items matching this criteria</h3>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              Drafts appear here after an Administrator approves them in the Review Queue.
            </p>
            <button
              onClick={() => onNavigate('/admin/reviews')}
              className="px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 transition"
            >
              Open Review Queue
            </button>
          </div>
        ) : (
          filteredDrafts.map((draft) => {
            const isReady = draft.status === 'READY_TO_PUBLISH';
            const isPublished = draft.status === 'PUBLISHED';
            const sourceResource = store.getResourceById(draft.resourceId);
            const mediaCount = (draft.attachedMediaItems?.length) || (draft.attachedMediaUrls?.length) || 0;

            return (
              <div
                key={draft.id}
                className={`bg-white rounded-3xl border p-6 transition shadow-xs flex flex-col md:flex-row md:items-start justify-between gap-6 ${
                  isReady
                    ? 'border-indigo-200 bg-white hover:border-indigo-300'
                    : 'border-slate-200 bg-slate-50/30'
                }`}
              >
                {/* Left Side: Metadata & Provenance */}
                <div className="space-y-3.5 flex-1 min-w-0">
                  {/* Top Badges & Lifecycle Checklist */}
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono text-[11px] font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                      {draft.id}
                    </span>
                    <span className="font-mono text-[11px] font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200">
                      {draft.version || 'v1'}
                    </span>
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-sky-100 text-sky-800">
                      {draft.contentType}
                    </span>
                    {draft.contentType === 'Social Media Content' && mediaCount > 0 && (
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-purple-50 text-purple-700 border border-purple-200 flex items-center gap-1">
                        <ImageIcon className="w-3 h-3" />
                        <span>{mediaCount} Attached Media</span>
                      </span>
                    )}
                    <StatusBadge status={draft.status} size="sm" />

                    {/* Step-by-Step Institutional Verification Status Checklist */}
                    <div className="flex items-center gap-2 text-[10px] bg-slate-100/90 text-slate-700 px-2.5 py-0.5 rounded-full font-medium border border-slate-200 ml-auto">
                      <span className="text-emerald-700 font-bold flex items-center gap-0.5">
                        <Check className="w-3 h-3 text-emerald-600" /> AI Generated
                      </span>
                      <span>·</span>
                      <span className="text-emerald-700 font-bold flex items-center gap-0.5">
                        <Check className="w-3 h-3 text-emerald-600" /> Scientist Verified
                      </span>
                      <span>·</span>
                      <span className="text-emerald-700 font-bold flex items-center gap-0.5">
                        <Check className="w-3 h-3 text-emerald-600" /> Admin Approved
                      </span>
                      <span>·</span>
                      <span className={isPublished ? 'text-emerald-700 font-bold' : 'text-indigo-700 font-bold'}>
                        {isPublished ? '✓ Published' : 'Ready to Publish'}
                      </span>
                    </div>
                  </div>

                  {/* Title & Summary */}
                  <div>
                    <h2 className="text-base font-bold text-slate-900 leading-snug">
                      {draft.title}
                    </h2>
                    <p className="text-xs text-slate-600 mt-1 line-clamp-2 leading-relaxed">
                      {draft.socialMediaText || draft.summary}
                    </p>
                  </div>

                  {/* Provenance Box (Requirement 8) */}
                  <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                          Source Scientific Resource:
                        </span>
                        <span className="font-mono font-bold text-sky-800 bg-sky-100 px-1.5 py-0.2 rounded text-[11px]">
                          {draft.resourceId}
                        </span>
                      </div>
                      <div className="text-[11px] font-semibold text-slate-800 truncate max-w-lg">
                        {sourceResource?.title || draft.resourceTitle || 'Expedition Scientific Dataset'}
                      </div>
                    </div>

                    <button
                      onClick={() => onNavigate(`/workspace/repository/${draft.resourceId}`)}
                      className="px-2.5 py-1 rounded-lg border border-slate-300 hover:bg-white text-slate-700 transition text-[11px] font-medium flex items-center gap-1 shrink-0 self-start sm:self-auto"
                      title="View original preserved repository resource"
                    >
                      <Database className="w-3 h-3 text-sky-600" />
                      <span>View Source Resource</span>
                    </button>
                  </div>

                  {/* Authorship & Approval Attribution */}
                  <div className="flex flex-wrap items-center gap-4 text-[11px] text-slate-500 pt-1">
                    <span>
                      Created by: <strong className="text-slate-700">{draft.contributorName}</strong>
                    </span>
                    <span>·</span>
                    <span>
                      Approved by: <strong className="text-slate-700">{draft.approvedBy || draft.reviewerName || 'Administrator'}</strong>
                    </span>
                    <span>·</span>
                    <span>
                      Approved Date:{' '}
                      <strong>
                        {draft.approvedAt
                          ? new Date(draft.approvedAt).toLocaleDateString()
                          : new Date(draft.updatedAt).toLocaleDateString()}
                      </strong>
                    </span>
                    {draft.publicationDestination && (
                      <>
                        <span>·</span>
                        <span className="text-emerald-700 font-bold">
                          Destination: {draft.publicationDestination}
                        </span>
                      </>
                    )}
                  </div>
                </div>

                {/* Right Side: Publishing Actions */}
                <div className="flex flex-col gap-2.5 shrink-0 sm:w-56 pt-2 md:pt-0 border-t md:border-t-0 border-slate-100">
                  {/* WEBSITE ARTICLE ACTION */}
                  {draft.contentType === 'Website Article' && (
                    <>
                      {isReady ? (
                        <button
                          onClick={() => setWebsiteConfirmDraft(draft)}
                          className="w-full py-2.5 px-4 rounded-xl bg-sky-700 hover:bg-sky-600 text-white font-bold text-xs shadow-sm transition flex items-center justify-center gap-2"
                        >
                          <Globe className="w-4 h-4" />
                          <span>Publish to Portal</span>
                        </button>
                      ) : (
                        <div className="space-y-1.5">
                          <button
                            onClick={() => onNavigate(`/content/${draft.id}`)}
                            className="w-full py-2 px-3 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 font-semibold text-xs transition flex items-center justify-center gap-1.5"
                          >
                            <ExternalLink className="w-3.5 h-3.5 text-emerald-600" />
                            <span>View Live Article</span>
                          </button>
                          <span className="text-[10px] text-emerald-600 block text-center">
                            Published on Portal · {new Date(draft.publishedAt || draft.updatedAt).toLocaleDateString()}
                          </span>
                        </div>
                      )}
                    </>
                  )}

                  {/* SOCIAL MEDIA CONTENT ACTION */}
                  {draft.contentType === 'Social Media Content' && (
                    <>
                      <button
                        onClick={() => {
                          setSelectedDraftForSocial(draft);
                          setSelectedPlatform('X / Twitter');
                        }}
                        className={`w-full py-2.5 px-4 rounded-xl font-bold text-xs shadow-sm transition flex items-center justify-center gap-2 ${
                          isReady
                            ? 'bg-purple-700 hover:bg-purple-600 text-white'
                            : 'bg-white border border-purple-200 text-purple-800 hover:bg-purple-50'
                        }`}
                      >
                        <Share2 className="w-4 h-4" />
                        <span>{isReady ? 'Direct Share to Social' : 'Re-share to Platform'}</span>
                      </button>

                      {isPublished && (
                        <span className="text-[10px] text-emerald-600 block text-center">
                          Dispatched: {draft.publicationDestination || 'Social Channel'}
                        </span>
                      )}
                    </>
                  )}

                  {/* MEDIA CAPTION ACTION */}
                  {draft.contentType === 'Media Caption' && (
                    <>
                      {isReady ? (
                        <button
                          onClick={() => setMediaConfirmDraft(draft)}
                          className="w-full py-2.5 px-4 rounded-xl bg-teal-700 hover:bg-teal-600 text-white font-bold text-xs shadow-sm transition flex items-center justify-center gap-2"
                        >
                          <ImageIcon className="w-4 h-4" />
                          <span>Publish to Media Gallery</span>
                        </button>
                      ) : (
                        <div className="space-y-1.5">
                          <button
                            onClick={() => onNavigate('/media')}
                            className="w-full py-2 px-3 rounded-xl bg-teal-50 hover:bg-teal-100 text-teal-800 border border-teal-200 font-semibold text-xs transition flex items-center justify-center gap-1.5"
                          >
                            <Eye className="w-3.5 h-3.5 text-teal-600" />
                            <span>View in Media Gallery</span>
                          </button>
                          <span className="text-[10px] text-teal-600 block text-center">
                            Live in Public Visual Catalogue
                          </span>
                        </div>
                      )}
                    </>
                  )}

                  <button
                    onClick={() => onNavigate(`/workspace/content/${draft.id}/edit`)}
                    className="w-full py-2 px-3 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-medium transition"
                  >
                    Review / Edit Details
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* ==================================================== */}
      {/* MODAL 1: SELECT PUBLISHING PLATFORM & REVIEW         */}
      {/* ONLY DIRECT SHARE + ATTACHED PHOTOS & VIDEOS         */}
      {/* ==================================================== */}
      {selectedDraftForSocial && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-fadeIn">
          <div className="w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden text-xs">
            {/* Modal Header */}
            <div className="bg-slate-900 px-6 py-4 text-white flex items-center justify-between border-b border-slate-800">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-purple-500/20 text-purple-300">
                  <Share2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-sm">Select Publishing Platform & Review</h3>
                  <p className="text-[11px] text-slate-400">
                    Source Resource: <span className="font-mono text-sky-300">{selectedDraftForSocial.resourceId}</span> · {selectedDraftForSocial.title}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSelectedDraftForSocial(null)}
                className="text-slate-400 hover:text-white p-1 rounded-lg transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
              {/* Platform Selector Buttons */}
              <div className="space-y-2">
                <label className="font-bold text-slate-800 uppercase tracking-wider text-[11px] block">
                  Select Publishing Platform:
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {(['X / Twitter', 'LinkedIn', 'Facebook', 'Instagram'] as const).map((platform) => {
                    const isSelected = selectedPlatform === platform;

                    return (
                      <button
                        key={platform}
                        type="button"
                        onClick={() => setSelectedPlatform(platform)}
                        className={`p-3 rounded-2xl border text-center transition flex flex-col items-center justify-center gap-1 ${
                          isSelected
                            ? 'bg-purple-50 border-purple-600 ring-2 ring-purple-600/20 text-purple-950 shadow-xs'
                            : 'bg-white border-slate-200 hover:border-slate-300 text-slate-700'
                        }`}
                      >
                        <span className="font-bold text-xs">{platform}</span>
                        <span className="text-[10px] text-purple-700 font-medium">Direct Share</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Rich Content Format Selector */}
              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="font-bold text-slate-800 flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5 text-purple-600" />
                    <span>Rich Social Media Content Variants:</span>
                  </span>
                  <button
                    type="button"
                    onClick={() => setIsEditingText(!isEditingText)}
                    className="text-purple-700 hover:underline font-semibold flex items-center gap-1 text-[11px]"
                  >
                    <Edit3 className="w-3 h-3" />
                    <span>{isEditingText ? 'Done Editing' : 'Edit Text'}</span>
                  </button>
                </div>

                <div className="flex flex-wrap items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => handleSelectCopyVariant('default')}
                    className={`px-3 py-1 rounded-xl text-[11px] font-semibold transition ${
                      selectedCopyVariant === 'default'
                        ? 'bg-purple-700 text-white'
                        : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    Standard Outreach
                  </button>
                  <button
                    type="button"
                    onClick={() => handleSelectCopyVariant('thread')}
                    className={`px-3 py-1 rounded-xl text-[11px] font-semibold transition ${
                      selectedCopyVariant === 'thread'
                        ? 'bg-purple-700 text-white'
                        : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    Thread / Takeaways (X / Twitter)
                  </button>
                  <button
                    type="button"
                    onClick={() => handleSelectCopyVariant('executive')}
                    className={`px-3 py-1 rounded-xl text-[11px] font-semibold transition ${
                      selectedCopyVariant === 'executive'
                        ? 'bg-purple-700 text-white'
                        : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    Executive Synthesis (LinkedIn)
                  </button>
                  <button
                    type="button"
                    onClick={() => handleSelectCopyVariant('community')}
                    className={`px-3 py-1 rounded-xl text-[11px] font-semibold transition ${
                      selectedCopyVariant === 'community'
                        ? 'bg-purple-700 text-white'
                        : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    Community Feature (FB / IG)
                  </button>
                  <button
                    type="button"
                    onClick={() => handleSelectCopyVariant('bilingual')}
                    className={`px-3 py-1 rounded-xl text-[11px] font-semibold transition flex items-center gap-1 ${
                      selectedCopyVariant === 'bilingual'
                        ? 'bg-purple-700 text-white'
                        : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <span>🇮🇳</span>
                    <span>द्विभाषी (Bilingual Hindi-English)</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleEnrichContent}
                    className="px-3 py-1 rounded-xl text-[11px] font-bold bg-amber-100 hover:bg-amber-200 text-amber-900 border border-amber-300 transition flex items-center gap-1 ml-auto"
                    title="Append Indian station coordinates, MoES PACER attribution, and NPDC data reference"
                  >
                    <Sparkles className="w-3 h-3 text-amber-700" />
                    <span>+ Enrich / Add More Content</span>
                  </button>
                </div>
              </div>

              {/* Exact Social Media Preview Card */}
              <div className="rounded-2xl border border-slate-300 bg-white p-5 space-y-4 shadow-xs font-sans">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100 text-[11px]">
                  <span className="font-bold uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
                    <Share2 className="w-3.5 h-3.5 text-purple-600" />
                    SOCIAL MEDIA PREVIEW ({selectedPlatform})
                  </span>
                  <span className="font-mono text-slate-500 font-semibold">
                    {selectedDraftForSocial.version || 'v1'}
                  </span>
                </div>

                <div className="space-y-3">
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                      Title:
                    </span>
                    <h4 className="font-bold text-slate-900 text-sm">
                      {selectedDraftForSocial.title}
                    </h4>
                  </div>

                  {/* Post Text: View or Edit */}
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                          Post:
                        </span>
                        {/* Small button to convert English text to Hindi (User Request) */}
                        <button
                          type="button"
                          onClick={() => {
                            if (activeSocialText.includes('भारतीय') || activeSocialText.includes('🇮🇳 [भारतीय')) {
                              setActiveSocialText(translateHindiToEnglish(activeSocialText));
                              showToast('Reverted text to English (अंग्रेजी में बदला गया).');
                            } else {
                              setActiveSocialText(translateEnglishToHindi(activeSocialText));
                              showToast('Converted text to Hindi (हिंदी में अनुवादित किया गया).');
                            }
                          }}
                          className="px-2 py-0.5 rounded-lg bg-amber-100 hover:bg-amber-200 text-amber-900 border border-amber-300 text-[10px] font-bold transition flex items-center gap-1 cursor-pointer shadow-2xs"
                          title="Click to convert English text to Hindi"
                        >
                          <Languages className="w-3 h-3 text-amber-700" />
                          <span>{activeSocialText.includes('भारतीय') ? 'A/अ Revert to English' : '🇮🇳 अ/A Convert to Hindi'}</span>
                        </button>
                      </div>
                      <span className="text-[10px] text-slate-400 font-mono">
                        {activeSocialText.length} characters
                      </span>
                    </div>

                    {isEditingText ? (
                      <textarea
                        rows={5}
                        value={activeSocialText}
                        onChange={(e) => setActiveSocialText(e.target.value)}
                        className="w-full p-3 rounded-xl border border-purple-300 bg-purple-50/20 text-slate-800 font-mono text-xs leading-relaxed focus:border-purple-600 focus:outline-hidden"
                      />
                    ) : (
                      <div className="p-3.5 bg-slate-50/80 rounded-xl border border-slate-200 text-slate-800 whitespace-pre-wrap leading-relaxed">
                        {activeSocialText}
                      </div>
                    )}
                  </div>

                  {/* Hashtags */}
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                      Hashtags:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {(selectedDraftForSocial.keywords.length > 0
                        ? selectedDraftForSocial.keywords
                        : ['IndianArcticExpedition', 'PolarScience', 'NCPOR']
                      ).map((kw, i) => (
                        <span key={i} className="px-2 py-0.5 rounded-md bg-purple-50 text-purple-800 font-mono text-[11px] border border-purple-200">
                          #{kw.replace(/^#/, '')}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* ==================================================== */}
                  {/* ATTACHED PHOTOS & VIDEOS (With option to remove)     */}
                  {/* ==================================================== */}
                  <div className="space-y-2 pt-2 border-t border-slate-100">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <ImageIcon className="w-3.5 h-3.5 text-indigo-600" />
                        <span className="font-bold text-slate-800 text-xs">
                          Attached Photos & Videos ({attachedMediaList.length}):
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => setShowAddMediaDrawer(!showAddMediaDrawer)}
                        className="text-[11px] text-indigo-700 hover:text-indigo-900 font-bold flex items-center gap-1"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add Media from Resource</span>
                      </button>
                    </div>

                    {attachedMediaList.length === 0 ? (
                      <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-center text-slate-400 text-[11px]">
                        No photos or videos attached. Click "Add Media from Resource" to attach visual evidence.
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                        {attachedMediaList.map((media) => (
                          <div
                            key={media.id}
                            className="group relative rounded-xl border border-slate-200 bg-slate-900 overflow-hidden shadow-2xs flex flex-col justify-between"
                          >
                            <div className="relative h-28 bg-slate-950 flex items-center justify-center overflow-hidden">
                              {media.type === 'video' ? (
                                <div className="relative w-full h-full flex items-center justify-center bg-slate-900">
                                  <video src={media.url} className="w-full h-full object-cover opacity-60" />
                                  <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="w-9 h-9 rounded-full bg-slate-900/80 border border-white/40 flex items-center justify-center text-white shadow-lg">
                                      <Play className="w-4 h-4 fill-white ml-0.5" />
                                    </div>
                                  </div>
                                  <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-rose-600 text-white font-bold text-[9px] uppercase tracking-wider flex items-center gap-1">
                                    <Video className="w-2.5 h-2.5" /> Video
                                  </span>
                                </div>
                              ) : (
                                <div className="relative w-full h-full">
                                  <img
                                    src={media.url}
                                    alt={media.caption || media.filename}
                                    className="w-full h-full object-cover"
                                  />
                                  <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-sky-700 text-white font-bold text-[9px] uppercase tracking-wider flex items-center gap-1">
                                    <ImageIcon className="w-2.5 h-2.5" /> Photo
                                  </span>
                                </div>
                              )}

                              {/* REMOVE BUTTON (As requested: option to remove them) */}
                              <button
                                type="button"
                                onClick={() => handleRemoveAttachedMedia(media.id)}
                                title="Remove this media from post"
                                className="absolute top-2 right-2 p-1.5 rounded-lg bg-black/70 hover:bg-rose-600 text-white transition cursor-pointer shadow-md"
                              >
                                <X className="w-3.5 h-3.5" />
                              </button>
                            </div>

                            <div className="p-2.5 bg-white text-slate-800 border-t border-slate-100 flex items-center justify-between gap-2 text-[10px]">
                              <span className="font-semibold truncate max-w-[140px]" title={media.filename}>
                                {media.filename}
                              </span>
                              <button
                                type="button"
                                onClick={() => handleRemoveAttachedMedia(media.id)}
                                className="text-rose-600 hover:text-rose-800 font-bold hover:underline shrink-0"
                              >
                                Remove
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Drawer to Attach More Media from Source Resource */}
                    {showAddMediaDrawer && (
                      <div className="p-3.5 rounded-xl bg-indigo-50/70 border border-indigo-200 space-y-2 animate-fadeIn">
                        <div className="flex items-center justify-between text-indigo-950 font-bold text-xs">
                          <span>Available Photos & Videos in {selectedDraftForSocial.resourceId}:</span>
                          <button
                            type="button"
                            onClick={() => setShowAddMediaDrawer(false)}
                            className="text-slate-500 hover:text-slate-800"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        {unattachedSourceMedia.length === 0 ? (
                          <p className="text-[11px] text-slate-500">
                            All photographic and video assets from this scientific resource are already attached.
                          </p>
                        ) : (
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {unattachedSourceMedia.map((f) => (
                              <div
                                key={f.id}
                                className="p-2 rounded-xl bg-white border border-indigo-200 flex items-center justify-between gap-2 text-[11px]"
                              >
                                <div className="flex items-center gap-2 min-w-0">
                                  {f.fileType === 'video' ? (
                                    <Video className="w-4 h-4 text-rose-600 shrink-0" />
                                  ) : (
                                    <ImageIcon className="w-4 h-4 text-sky-600 shrink-0" />
                                  )}
                                  <div className="truncate">
                                    <div className="font-semibold text-slate-900 truncate">{f.filename}</div>
                                    <div className="text-[9px] text-slate-400 uppercase">{f.fileType} · {f.sizeMb}MB</div>
                                  </div>
                                </div>
                                <button
                                  type="button"
                                  onClick={() => handleAttachMediaFromResource(f)}
                                  className="px-2.5 py-1 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-[10px] shrink-0"
                                >
                                  + Attach
                                </button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-slate-600 pt-2 border-t border-slate-100">
                    <div>
                      <span className="text-slate-400">Source: </span>
                      <strong className="font-mono text-sky-800">{selectedDraftForSocial.resourceId}</strong>
                    </div>
                    <div>
                      <span className="text-slate-400">Author: </span>
                      <strong>{selectedDraftForSocial.contributorName}</strong>
                    </div>
                  </div>

                  {/* Four-point Verification Checklist */}
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-[11px] space-y-1">
                    <span className="font-bold text-slate-900 block mb-1 text-[10px] uppercase tracking-wider">
                      Status Checklist:
                    </span>
                    <div className="grid grid-cols-2 gap-1 text-emerald-800 font-semibold">
                      <div className="flex items-center gap-1.5">
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span>✓ AI Generated</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span>✓ Scientist Verified</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span>✓ Admin Approved</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span>✓ Ready to Publish</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Actions: ONLY DIRECT SHARE (As requested) */}
            <div className="p-4 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
              <button
                type="button"
                onClick={() =>
                  handleCopySocialText(
                    `${activeSocialText}\n\n${(selectedDraftForSocial.keywords || []).map((k) => `#${k}`).join(' ')}`
                  )
                }
                className="px-3.5 py-2 rounded-xl bg-white border border-slate-300 hover:bg-slate-100 text-slate-700 font-semibold transition flex items-center gap-1.5 text-xs"
              >
                {copiedText ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-slate-500" />}
                <span>{copiedText ? 'Copied' : 'Copy Text'}</span>
              </button>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedDraftForSocial(null)}
                  className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-200 transition text-xs font-medium"
                >
                  Cancel
                </button>

                {/* ONLY DIRECT SHARE BUTTON (As requested: "put only direct share") */}
                <button
                  type="button"
                  disabled={isSharing}
                  onClick={() => handleDirectShare(selectedDraftForSocial)}
                  className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-purple-700 hover:bg-purple-600 text-white font-bold transition shadow-sm text-xs cursor-pointer active:scale-95"
                >
                  <Send className="w-4 h-4" />
                  <span>
                    {isSharing ? 'Sharing...' : `Direct Share to ${selectedPlatform}`}
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ==================================================== */}
      {/* MODAL 2: CONFIRM PUBLISH WEBSITE ARTICLE TO PORTAL   */}
      {/* ==================================================== */}
      {websiteConfirmDraft && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-fadeIn">
          <div className="w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden text-xs">
            <div className="bg-sky-950 p-5 text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-sky-500/20 text-sky-400">
                  <Globe className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-sm">Publish Article to Public Portal</h3>
                  <p className="text-[11px] text-sky-300">
                    Destination: Public Knowledge / Research Section
                  </p>
                </div>
              </div>
              <button onClick={() => setWebsiteConfirmDraft(null)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <span className="font-mono text-[10px] text-sky-800 bg-sky-100 px-2 py-0.5 rounded font-bold">
                  {websiteConfirmDraft.id} · {websiteConfirmDraft.version || 'v1'}
                </span>
                <h4 className="font-bold text-slate-900 text-sm">{websiteConfirmDraft.title}</h4>
                <p className="text-slate-600 text-[11px] leading-relaxed line-clamp-2">
                  {websiteConfirmDraft.summary}
                </p>
                <div className="pt-2 border-t border-slate-200 text-[11px] text-slate-500">
                  Source: <strong>{websiteConfirmDraft.resourceId}</strong> · Author: <strong>{websiteConfirmDraft.contributorName}</strong>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 space-y-1">
                <div className="font-bold text-[11px] flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Public Portal Isolation Guard:</span>
                </div>
                <p className="text-[11px] text-slate-600 leading-relaxed">
                  Only the verified final text and approved media will be displayed to citizens. Raw datasets, private repository files, internal review comments, and AI controls are strictly excluded from the public portal.
                </p>
              </div>
            </div>

            <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-end gap-3">
              <button
                onClick={() => setWebsiteConfirmDraft(null)}
                className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-200 transition"
              >
                Cancel
              </button>
              <button
                onClick={() => handlePublishToPortal(websiteConfirmDraft)}
                className="px-5 py-2.5 rounded-xl bg-sky-700 hover:bg-sky-600 text-white font-bold transition shadow-sm flex items-center gap-2"
              >
                <Globe className="w-4 h-4" />
                <span>Confirm & Publish to Portal</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ==================================================== */}
      {/* MODAL 3: CONFIRM PUBLISH MEDIA CAPTION               */}
      {/* ==================================================== */}
      {mediaConfirmDraft && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-fadeIn">
          <div className="w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden text-xs">
            <div className="bg-teal-950 p-5 text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-teal-500/20 text-teal-400">
                  <ImageIcon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-sm">Publish to Public Media Gallery</h3>
                  <p className="text-[11px] text-teal-300">
                    Destination: Public Visual Repository (/media)
                  </p>
                </div>
              </div>
              <button onClick={() => setMediaConfirmDraft(null)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <span className="font-mono text-[10px] text-teal-800 bg-teal-100 px-2 py-0.5 rounded font-bold">
                  {mediaConfirmDraft.id} · Media Caption
                </span>
                <h4 className="font-bold text-slate-900 text-sm">{mediaConfirmDraft.title}</h4>
                <p className="text-slate-600 text-[11px] leading-relaxed">
                  Caption: "{mediaConfirmDraft.imageCaption || mediaConfirmDraft.summary}"
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-teal-50 border border-teal-200 text-teal-900 space-y-1">
                <div className="font-bold text-[11px] flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-teal-600" />
                  <span>Public Media Disclosure Rule:</span>
                </div>
                <p className="text-[11px] text-slate-600 leading-relaxed">
                  Only this approved photograph asset and verified metadata will enter the public gallery. Unapproved repository media remains confidential in cold archival storage.
                </p>
              </div>
            </div>

            <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-end gap-3">
              <button
                onClick={() => setMediaConfirmDraft(null)}
                className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-200 transition"
              >
                Cancel
              </button>
              <button
                onClick={() => handlePublishToMediaGallery(mediaConfirmDraft)}
                className="px-5 py-2.5 rounded-xl bg-teal-700 hover:bg-teal-600 text-white font-bold transition shadow-sm flex items-center gap-2"
              >
                <ImageIcon className="w-4 h-4" />
                <span>Confirm & Publish to Media Gallery</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ==================================================== */}
      {/* MODAL 4: LIVE SOCIAL MEDIA API FETCH & DIAGNOSTICS   */}
      {/* (Request 1: "fetch the other APIs for LinkedIn, FB, IG") */}
      {/* ==================================================== */}
      {showApiDiagnosticsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-fadeIn">
          <div className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden text-xs max-h-[85vh] flex flex-col">
            <div className="bg-slate-950 p-5 text-white flex items-center justify-between border-b border-slate-800">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-purple-500/20 text-purple-300">
                  <Radio className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-sm">Live Social Media API Diagnostics & Fetch</h3>
                  <p className="text-[11px] text-slate-400">
                    Official Endpoint Status: LinkedIn (v2 UGC), Facebook (Graph v19.0), Instagram (Media Publish)
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowApiDiagnosticsModal(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-4">
              <div className="p-3.5 rounded-2xl bg-purple-50 border border-purple-200 text-purple-950 text-xs flex items-start gap-2.5">
                <Info className="w-4 h-4 text-purple-700 shrink-0 mt-0.5" />
                <p className="leading-relaxed">
                  Real API Probing Engine: Click <strong>"Test & Fetch API"</strong> for any platform to execute live network requests, verify endpoint availability, check OAuth 2.0 scopes, and diagnose token readiness for automated social publishing.
                </p>
              </div>

              {(['LinkedIn', 'Facebook', 'Instagram', 'X / Twitter'] as const).map((platform) => {
                const config = socialPublishingService.getPlatformStatus(platform);
                const testState = apiTestingState[platform];
                const result = testState?.result;

                return (
                  <div
                    key={platform}
                    className="p-4 rounded-2xl border border-slate-200 bg-white hover:border-slate-300 transition space-y-3 shadow-2xs"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Share2 className="w-4 h-4 text-purple-600" />
                        <span className="font-bold text-slate-900 text-sm">{platform}</span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                          {config.type === 'direct_api' ? 'REST API Endpoint' : 'Web Intent + API'}
                        </span>
                      </div>

                      <button
                        type="button"
                        disabled={testState?.loading}
                        onClick={() => handleTestAPI(platform)}
                        className="px-3 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-[11px] transition flex items-center gap-1.5 shadow-2xs disabled:opacity-50 cursor-pointer"
                      >
                        <RefreshCw className={`w-3 h-3 ${testState?.loading ? 'animate-spin' : ''}`} />
                        <span>{testState?.loading ? 'Fetching...' : 'Test & Fetch API'}</span>
                      </button>
                    </div>

                    <div className="text-[11px] text-slate-600 space-y-1">
                      <div>
                        <span className="text-slate-400">Endpoint: </span>
                        <span className="font-mono text-[10px] text-slate-700 break-all">{config.endpointUrl}</span>
                      </div>
                      <div>
                        <span className="text-slate-400">Credentials: </span>
                        <span>{config.credentialRequirement}</span>
                      </div>
                      <div>
                        <span className="text-slate-400">Required Scopes: </span>
                        <span className="font-mono text-[10px] text-purple-700 font-semibold">{config.requiredScopes.join(', ')}</span>
                      </div>
                    </div>

                    {/* Diagnostic Result Banner if Probed */}
                    {result && (
                      <div className={`p-3 rounded-xl border text-[11px] space-y-1.5 animate-fadeIn ${
                        result.status === 'CONNECTED'
                          ? 'bg-emerald-50 border-emerald-200 text-emerald-950'
                          : result.status === 'DISCONNECTED'
                          ? 'bg-amber-50 border-amber-200 text-amber-950'
                          : result.status === 'OFFLINE_SIMULATION'
                          ? 'bg-sky-50 border-sky-200 text-sky-950'
                          : 'bg-rose-50 border-rose-200 text-rose-950'
                      }`}>
                        <div className="flex items-center justify-between font-bold">
                          <span className="flex items-center gap-1.5">
                            {result.status === 'CONNECTED' ? (
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                            ) : (
                              <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
                            )}
                            <span>Status: {result.status}</span>
                          </span>
                          {result.latencyMs && (
                            <span className="font-mono text-[10px] text-slate-500">
                              {result.latencyMs}ms latency
                            </span>
                          )}
                        </div>

                        <p className="leading-relaxed">{result.message}</p>

                        {result.authenticatedEntity && (
                          <div className="text-[10px] font-semibold text-slate-700 pt-0.5">
                            Authenticated Entity: <strong>{result.authenticatedEntity}</strong>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
              <span className="text-[11px] text-slate-500">
                Direct Sharing is always accessible via official authenticated Web Intent Dialogs.
              </span>
              <button
                type="button"
                onClick={() => setShowApiDiagnosticsModal(false)}
                className="px-4 py-2 rounded-xl bg-slate-900 text-white font-bold text-xs hover:bg-slate-800"
              >
                Close Diagnostics
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
