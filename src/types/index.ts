export type UserRole = 'ADMINISTRATOR' | 'CONTENT_CONTRIBUTOR' | 'PUBLIC_USER';

export type ResourceType =
  | 'DOCUMENT'
  | 'IMAGE'
  | 'VIDEO'
  | 'DATASET'
  | 'REPORT'
  | 'PUBLICATION'
  | 'Document'
  | 'Image'
  | 'Video'
  | 'Dataset';

export type PolarRegion =
  | 'Antarctica'
  | 'Arctic'
  | 'Southern Ocean'
  | 'Himalayas (Third Pole)';

export type ResearchTopic =
  | 'Glaciology'
  | 'Climate Dynamics'
  | 'Oceanography'
  | 'Marine Biology'
  | 'Atmospheric Science'
  | 'Geology & Geophysics'
  | 'Polar Technology & Logistics';

export type ResourceStatus = 'STORED' | 'ARCHIVED';

export type ResourceVisibility = 'PUBLIC' | 'PROTECTED' | 'PRIVATE';

export type ContentDestination =
  | 'Research'
  | 'Expedition'
  | 'Media'
  | 'Activities'
  | 'Education'
  | 'Social Media';

export type ContentStatus =
  | 'DRAFT'
  | 'AI_PROCESSING'
  | 'READY_FOR_EDITING'
  | 'UNDER_REVIEW'
  | 'NEEDS_CHANGES'
  | 'APPROVED'
  | 'READY_TO_PUBLISH'
  | 'PUBLISHED'
  | 'REQUIRES_REAPPROVAL'
  | 'UNPUBLISHED'
  | 'REJECTED';

export type DraftContentType =
  | 'Website Article'
  | 'Social Media Content'
  | 'Media Caption'
  | 'Public Article'
  | 'Social Media Post'
  | 'Image Caption'
  | 'Scientific Summary'
  | 'Educational Content'
  | 'Expedition Story'
  // Research formats
  | 'Full Article'
  | 'News Snippet'
  | 'Website Card'
  | 'Research Highlight'
  // Expedition formats
  | 'Expedition Overview'
  | 'Expedition Story / Update'
  | 'Expedition Highlight'
  // Media formats
  | 'Gallery Description'
  | 'Media Highlight'
  // Activities formats
  | 'Activity Announcement'
  | 'Activity Summary'
  | 'Event Highlight'
  // Education formats
  | 'Educational Article'
  | 'Learning Resource'
  | 'Student-Friendly Explanation';

export type WebsiteContentFormat =
  | 'Full Article'
  | 'News Snippet'
  | 'Website Card'
  | 'Homepage Banner';

export interface ExpeditionMilestonePhase {
  phaseNumber: number;
  phase: string;
  title: string;
  date: string;
  status: 'completed' | 'in_progress' | 'upcoming';
  description: string;
  fieldNotes?: string;
  location?: string;
  completedAt?: string;
}

export interface ScientistMissionProgress {
  id: string;
  userId: string;
  userName: string;
  expeditionId: string;
  expeditionName: string;
  expeditionNumber?: string;
  roleInMission: string;
  baseStation: string;
  season: string;
  overallPercent: number;
  currentPhase: string;
  showInPublicProfile?: boolean;
  phases: ExpeditionMilestonePhase[];
  updatedAt: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  username?: string;
  role: UserRole;
  department: string;
  institution?: string;
  designation?: string;
  avatarUrl?: string;
  status: 'Active' | 'Inactive';
  tempPassword?: string;
  missionProgress?: ScientistMissionProgress;
  createdAt: string;
}

export interface ResourceFile {
  id: string;
  resourceId?: string;
  filename: string;
  fileType: 'pdf' | 'image' | 'video' | 'data';
  mimeType: string;
  url: string;
  sizeMb: number;
  uploadedAt: string;
  caption?: string;
}

export interface AttachedMediaItem {
  id: string;
  url: string;
  type: 'image' | 'video';
  filename: string;
  caption?: string;
  sizeMb?: number;
}

export interface ContentDraft {
  id: string;
  resourceId: string;
  resourceTitle?: string;
  contentType: DraftContentType;
  websiteFormat?: WebsiteContentFormat;
  title: string;
  summary: string;
  body: string;
  keyFindings: string[];
  keywords: string[];
  imageCaption?: string;
  socialMediaText?: string;
  targetAudience?: 'General Public' | 'Researchers' | 'Students' | 'Policy Makers' | string;
  readingTimeMin: number;
  generatedByAi: boolean;
  aiModel?: string;
  aiPromptSummary?: string;
  editedByContributor: boolean;
  contributorId: string;
  contributorName: string;
  status: ContentStatus;
  reviewerId?: string;
  reviewerName?: string;
  reviewerComments?: string;
  revisionNotes?: string;
  version?: string; // v1, v2, v3
  lastEditedBy?: string;
  lastEditedAt?: string;
  approvedAt?: string;
  approvedBy?: string;
  publicationDestination?: 'Portal' | 'X / Twitter' | 'LinkedIn' | 'Facebook' | 'Instagram' | 'Media Catalogue';
  publishedBy?: string;
  publicationId?: string;
  mediaFileId?: string;
  attachedMediaUrls?: string[];
  attachedMediaItems?: AttachedMediaItem[];
  isScientistVerified?: boolean;
  isAdminApproved?: boolean;
  // Destination routing
  contentDestination?: ContentDestination;
  destinationSpecificType?: string;
  // Specific Website format fields
  newsSnippet?: string;
  websiteCard?: {
    headline: string;
    shortDescription: string;
    category: string;
    ctaText: string;
  };
  homepageBanner?: {
    headline: string;
    supportingText: string;
    ctaText: string;
    suggestedMediaUrl?: string;
  };
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
}

export interface Resource {
  id: string; // e.g. POL-RES-001
  title: string;
  description: string;
  type: ResourceType;
  region: PolarRegion;
  year: number;
  topic: ResearchTopic;
  researchers: string[]; // Researchers / Authors
  uploadedBy: string;
  uploaderName: string;
  stationOrVessel?: string;
  files: ResourceFile[];
  keywords: string[];
  leadScientists?: string[];
  expeditionId?: string;
  expeditionName?: string;
  visibility?: ResourceVisibility; // 'PUBLIC' | 'PROTECTED' | 'PRIVATE'
  status: ResourceStatus; // 'STORED' | 'ARCHIVED'
  draftId?: string; // Optional reference to primary derived draft
  additionalMetadata?: Record<string, string>;
  createdAt: string;
  updatedAt: string;
}

export interface Expedition {
  id: string;
  name: string;
  expeditionNumber?: string;
  year: number;
  region: PolarRegion;
  status: 'Completed' | 'Ongoing' | 'Planned';
  bannerImage: string;
  leadStation: string;
  duration: string;
  teamSize: number;
  expeditionLeader: string;
  overview: string;
  objectives: string[];
  researchActivities: string[];
  timeline: {
    phase: string;
    title: string;
    date: string;
    status: 'completed' | 'in_progress' | 'upcoming';
    description: string;
  }[];
  relatedResourceIds: string[];
  relatedReportIds?: string[];
  relatedDatasetIds?: string[];
  relatedPublicationIds?: string[];
}

export interface MediaItem {
  id: string;
  title: string;
  type: 'image' | 'video' | 'photo';
  url: string;
  thumbnail: string;
  caption?: string;
  description?: string;
  region: PolarRegion;
  year: number;
  expeditionId?: string;
  expeditionName?: string;
  expedition?: string;
  location?: string;
  photographerOrCredit?: string;
  credit?: string;
  date: string;
  tags: string[];
  duration?: string;
  resourceId?: string;
  isApproved?: boolean;
}

export interface ActivityLog {
  id: string;
  userId: string;
  userName: string;
  userRole: UserRole;
  action: string;
  targetId: string;
  targetTitle: string;
  timestamp: string;
  details?: string;
}

// ==========================================
// 1. SCIENTIFIC DATASET ARCHIVE ENTITY
// ==========================================
export interface Dataset {
  id: string; // e.g. DATA-001
  title: string;
  description: string;
  expeditionId: string;
  expeditionName: string;
  region: PolarRegion;
  platform: string; // Station / Vessel / Mooring / Observatory
  researchDomain: ResearchTopic;
  parameters: string[]; // e.g. Stable Isotopes, Temperature, Salinity, Aerosols
  year: number;
  authors: string[];
  leadInstitution: string;
  fileFormat: 'CSV' | 'NetCDF' | 'ASCII' | 'GeoTIFF' | 'JSON' | string;
  fileSize: string;
  r2ObjectKey: string;
  license: string;
  accessStatus: 'Available' | 'Restricted' | 'Under Review';
  sourceResourceId: string;
  relatedExpeditionId: string;
  relatedPublicationIds?: string[];
  downloadCount: number;
  sampleColumns?: string[];
  sampleDataPreview?: Record<string, string | number>[];
  createdAt: string;
  updatedAt: string;
}

// ==========================================
// 2. EXPEDITION REPORT ARCHIVE ENTITY
// ==========================================
export interface ExpeditionReport {
  id: string; // e.g. EXP-REP-001
  officialTitle: string;
  expeditionId: string;
  expeditionName: string;
  region: PolarRegion;
  year: number;
  authors: string[];
  institution: string;
  summary: string;
  researchDomain: ResearchTopic;
  platform: string;
  reportType: 'Annual Scientific Report' | 'Cruise Technical Summary' | 'Glaciological Field Report' | 'Seasonal Campaign Dossier' | string;
  fileType: 'PDF';
  fileSize: string;
  r2ObjectKey: string;
  availability: 'Available' | 'Authorized Access';
  sourceResourceId: string;
  relatedDatasetIds: string[];
  relatedPublicationIds: string[];
  relatedMediaIds: string[];
  downloadCount: number;
  toc?: string[];
  createdAt: string;
}

// ==========================================
// 3. PUBLICATIONS REPOSITORY ENTITY
// ==========================================
export interface Publication {
  id: string; // e.g. PUB-001
  title: string;
  authors: string[];
  year: number;
  journal: string;
  doi: string;
  abstract: string;
  keywords: string[];
  researchDomain: ResearchTopic;
  region: PolarRegion;
  relatedExpeditionId: string;
  relatedExpeditionName: string;
  relatedDatasetIds: string[];
  sourceResourceId: string;
  r2ObjectKey: string;
  fileAvailable: boolean;
  fileFormat: string;
  citation: string;
  accessStatus: 'Open Access' | 'Institutional Access';
  downloadCount: number;
  createdAt: string;
}

// ==========================================
// 4. INSTITUTIONAL ACTIVITIES ARCHIVE ENTITY
// ==========================================
export type InstitutionalActivityType =
  | 'Workshop'
  | 'Conference'
  | 'Training'
  | 'Outreach'
  | 'MoU'
  | 'Exhibition'
  | 'Institutional Programme';

export interface InstitutionalActivity {
  id: string; // e.g. ACT-001
  title: string;
  activityType: InstitutionalActivityType;
  date: string;
  location: string;
  shortDescription: string;
  description: string;
  organizingInstitution: string;
  participatingInstitutions: string[];
  highlights: string[];
  region?: PolarRegion;
  topic?: ResearchTopic;
  year: number;
  images: {
    url: string;
    caption: string;
    credit?: string;
  }[];
  relatedResourceIds?: string[];
  status: 'Approved' | 'Draft';
  createdAt: string;
}
