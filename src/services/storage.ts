import {
  ActivityLog,
  ContentDraft,
  Dataset,
  Expedition,
  ExpeditionMilestonePhase,
  ExpeditionReport,
  InstitutionalActivity,
  MediaItem,
  Publication,
  Resource,
  ResourceFile,
  ResourceStatus,
  ScientistMissionProgress,
  User,
  UserRole
} from '../types';

export const createDefaultScientistMission = (
  userId: string,
  userName: string,
  expeditionId: string = 'exp-isea-44'
): ScientistMissionProgress => {
  if (expeditionId === 'exp-arctic-2025') {
    return {
      id: `prog-${userId}`,
      userId,
      userName,
      expeditionId: 'exp-arctic-2025',
      expeditionName: 'Indian Arctic Scientific Campaign (2025)',
      expeditionNumber: 'IASC-2025',
      roleInMission: 'Arctic Campaign Lead & Marine Microbiologist',
      baseStation: 'Himadri Research Station, Ny-Ålesund (79°N)',
      season: '2025 Campaign',
      overallPercent: 83,
      currentPhase: 'Phase 5: Laboratory Analysis & Cryo-Archiving',
      showInPublicProfile: true,
      phases: [
        {
          phaseNumber: 1,
          phase: 'Planning & Clearances',
          title: 'Svalbard Science Forum & Ny-Ålesund Clearance',
          date: 'Mar 2025',
          status: 'completed',
          description: 'Environmental clearance and Kings Bay base reservations approved by Svalbard Governor.',
          location: 'NCPOR Goa & Oslo',
          completedAt: '2025-03-25T11:00:00Z'
        },
        {
          phaseNumber: 2,
          phase: 'Pre-Deployment Logistics',
          title: 'Polar Equipment Staging & Cryo-Gear Transit',
          date: 'May 2025',
          status: 'completed',
          description: 'Spectrometers and water samplers shipped via Tromsø port logistics.',
          location: 'Longyearbyen, Spitsbergen',
          completedAt: '2025-05-20T14:30:00Z'
        },
        {
          phaseNumber: 3,
          phase: 'Field Deployment',
          title: 'Himadri Base Occupation & Mooring Servicing',
          date: 'Jun 2025',
          status: 'completed',
          description: 'IndARC acoustic release serviced; CTD vertical profiles conducted in Kongsfjorden.',
          location: 'Himadri Station (79°N)',
          completedAt: '2025-06-30T16:00:00Z'
        },
        {
          phaseNumber: 4,
          phase: 'Data & Sample Acquisition',
          title: 'Continuous Midnight Sun Telemetry & Sampling',
          date: 'Aug 2025',
          status: 'completed',
          description: 'Aerosol optical depth logged at Gruvebadet atmospheric lab; fjord water filtration.',
          location: 'Gruvebadet Atmospheric Lab',
          completedAt: '2025-08-28T18:00:00Z'
        },
        {
          phaseNumber: 5,
          phase: 'Laboratory Analysis',
          title: 'Cold-Lab Chemical Fingerprinting & NPDC Archival',
          date: 'Nov 2025',
          status: 'in_progress',
          description: 'Ion chromatography and microbial DNA sequencing underway at NCPOR polar biology labs.',
          location: 'NCPOR Polar Laboratories, Goa',
          fieldNotes: 'DNA extraction yield: 94%. Aerosol filter mass spectrometry in 2nd run.'
        },
        {
          phaseNumber: 6,
          phase: 'Synthesis & Outreach',
          title: 'Scientific Publication & Public Polar Dispatches',
          date: 'Jan 2026',
          status: 'upcoming',
          description: 'Peer-reviewed research manuscript submission and public educational dispatches on Arctic warming.',
          location: 'Indian Polar Science Portal'
        }
      ],
      updatedAt: '2026-02-15T10:00:00Z'
    };
  }

  // Default: 44th Indian Antarctic Scientific Expedition (Dr. Rahul Mohan)
  return {
    id: `prog-${userId}`,
    userId,
    userName,
    expeditionId: 'exp-isea-44',
    expeditionName: '44th Indian Antarctic Scientific Expedition (2025–2026)',
    expeditionNumber: '44-IASE',
    roleInMission: 'Lead Glaciologist & Principal Paleoclimate Investigator',
    baseStation: 'Bharati Station (69°24′S) & Princess Elizabeth Land',
    season: '2025–2026 Summer & Wintering',
    overallPercent: 67,
    currentPhase: 'Phase 4: In-situ Sampling & Telemetry',
    showInPublicProfile: true,
    phases: [
      {
        phaseNumber: 1,
        phase: 'Project Proposal & Screening',
        title: 'MoES National Peer Review & Logistics Charter',
        date: 'Jul 2025',
        status: 'completed',
        description: 'Scientific proposal approved by National Steering Committee; field safety protocols finalized.',
        location: 'MoES New Delhi / NCPOR Goa',
        completedAt: '2025-07-20T10:00:00Z'
      },
      {
        phaseNumber: 2,
        phase: 'Medical Fitness & Staging',
        title: 'ITBP Auli Acclimatization & Cape Town Staging',
        date: 'Oct 2025',
        status: 'completed',
        description: 'High-altitude cold acclimatization certified by ITBP; heavy cargo loaded onto MV Vasiliy Golovnin.',
        location: 'ITBP Auli (Uttarakhand) & Cape Town',
        completedAt: '2025-10-28T14:00:00Z'
      },
      {
        phaseNumber: 3,
        phase: 'Field Deployment',
        title: 'Voyage to Larsemann Hills & Base Activation',
        date: 'Dec 2025',
        status: 'completed',
        description: 'Safe helicopter transit to Bharati Station; borehole drilling rig assembled on Princess Elizabeth Land ice cap.',
        location: 'Bharati Station (69°24′S, 76°11′E)',
        completedAt: '2025-12-22T09:30:00Z'
      },
      {
        phaseNumber: 4,
        phase: 'In-situ Sampling & Telemetry',
        title: '180m Ice Core Recovery & Real-time Sensor Logging',
        date: 'Feb 2026',
        status: 'in_progress',
        description: 'Electromechanical drill achieved 180m depth; continuous Katabatic wind and temperature telemetry active.',
        location: 'Princess Elizabeth Land Ice Dome',
        fieldNotes: 'Borehole core recovery rate: 98.4%. Core sections packaged in insulated dry-ice transport cases.'
      },
      {
        phaseNumber: 5,
        phase: 'Laboratory Analysis & Archiving',
        title: 'Picarro Spectrometry & -20°C Cryo-Vault Archival',
        date: 'May 2026',
        status: 'upcoming',
        description: 'Continuous water isotope (δ18O, δD) cavity ringdown spectrometry at NCPOR Goa cold facilities.',
        location: 'NCPOR Goa Cryo-Repository'
      },
      {
        phaseNumber: 6,
        phase: 'Scientific Synthesis & Outreach',
        title: 'Scientific Repository Release & Public Portal Outreach',
        date: 'Aug 2026',
        status: 'upcoming',
        description: 'Preparation of open datasets, peer-reviewed publications, and citizen-accessible educational articles.',
        location: 'Indian Polar Science Portal'
      }
    ],
    updatedAt: '2026-02-28T14:30:00Z'
  };
};

// Realistic NCPOR / MoES demo users - concise profiles without fake excessive personal bios
export const DEFAULT_USERS: User[] = [
  {
    id: 'usr-admin-01',
    name: 'Dr. Thamban Meloth',
    email: 'admin@ncpor.res.in',
    username: 'admin.meloth',
    role: 'ADMINISTRATOR',
    institution: 'National Centre for Polar and Ocean Research (NCPOR), MoES',
    department: 'Directorate & Editorial Board',
    designation: 'Director & Chief Institutional Reviewer',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200',
    status: 'Active',
    createdAt: '2024-01-15'
  },
  {
    id: 'usr-contributor-01',
    name: 'Dr. Rahul Mohan',
    email: 'rahulmohan@ncpor.res.in',
    username: 'scientist.rahul',
    role: 'CONTENT_CONTRIBUTOR',
    institution: 'National Centre for Polar and Ocean Research (NCPOR)',
    department: 'Polar Sciences Group (Antarctica & Arctic)',
    designation: 'Scientist-F & Lead Glaciologist',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
    status: 'Active',
    missionProgress: createDefaultScientistMission('usr-contributor-01', 'Dr. Rahul Mohan', 'exp-isea-44'),
    createdAt: '2024-03-10'
  },
  {
    id: 'usr-contributor-02',
    name: 'Dr. K. P. Krishnan',
    email: 'krishnan@ncpor.res.in',
    username: 'scientist.krishnan',
    role: 'CONTENT_CONTRIBUTOR',
    institution: 'National Centre for Polar and Ocean Research (NCPOR)',
    department: 'Arctic Operations & Marine Microbiology',
    designation: 'Scientist-E & Arctic Campaign Lead',
    avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=200',
    status: 'Active',
    missionProgress: createDefaultScientistMission('usr-contributor-02', 'Dr. K. P. Krishnan', 'exp-arctic-2025'),
    createdAt: '2024-04-20'
  },
  {
    id: 'usr-public-01',
    name: 'Public Visitor',
    email: 'visitor@public.demo',
    username: 'visitor',
    role: 'PUBLIC_USER',
    institution: 'General Public & Academic Community',
    department: 'Citizen Science & Public Outreach',
    designation: 'Science Reader',
    status: 'Active',
    createdAt: '2025-01-01'
  }
];

// Exactly 3 authentic, official NCPOR expeditions
export const DEFAULT_EXPEDITIONS: Expedition[] = [
  {
    id: 'exp-isea-44',
    name: '44th Indian Scientific Expedition to Antarctica (2025–2026)',
    expeditionNumber: 'ISEA-44',
    year: 2026,
    region: 'Antarctica',
    status: 'Ongoing',
    bannerImage: 'https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?auto=format&fit=crop&q=80&w=1200',
    leadStation: 'Bharati Station (Larsemann Hills) & Maitri Station (Schirmacher Oasis)',
    duration: 'November 2025 – April 2026',
    teamSize: 48,
    expeditionLeader: 'Dr. Shailendra Saini',
    overview: 'The 44th Indian Antarctic Expedition focuses on long-term climate monitoring, ice-shelf core recovery, high-resolution atmospheric boundary layer studies, and polar ecology monitoring under extreme environmental stewardship.',
    objectives: [
      'Drill 180m ice core samples across Princess Elizabeth Land to reconstruct 1,200 years of paleoclimate records.',
      'Deploy autonomous meteorological buoy clusters to quantify Katabatic wind stress and peripheral ice ablation.',
      'Maintain continuous GPS geodetic networks to measure post-glacial isostatic rebound of the Antarctic continent.',
      'Upgrade renewable wind-solar hybrid power generation modules at Bharati station towards net-zero operational goals.'
    ],
    researchActivities: [
      'Subglacial lake seismic profiling',
      'Atmospheric aerosol and greenhouse gas monitoring',
      'Marine benthic biodiversity sampling in Prydz Bay',
      'Human physiological and psychological adaptation tracking during prolonged isolation'
    ],
    timeline: [
      { phase: 'Planning', title: 'National Expedition Screening', date: 'Jul 2025', status: 'completed', description: 'Medical screening and polar conditioning at ITBP Auli.' },
      { phase: 'Departure', title: 'Voyage from Cape Town', date: 'Nov 2025', status: 'completed', description: 'Embarkation on chartered polar icebreaker MV Vasiliy Golovnin.' },
      { phase: 'Field Research', title: 'Larsemann Hills Field Camp', date: 'Dec 2025', status: 'completed', description: 'Borehole drilling and instrument deployment across ice shelves.' },
      { phase: 'Data Collection', title: 'Mid-Season Telemetry Relay', date: 'Feb 2026', status: 'in_progress', description: 'Continuous satellite transmission of cryospheric sensors to NCPOR HQ.' },
      { phase: 'Analysis', title: 'Post-Field Sample Processing', date: 'May 2026', status: 'upcoming', description: 'Cold laboratory isotopic analysis at -20°C clean room in Goa.' },
      { phase: 'Publication', title: 'National Repository Cataloging', date: 'Aug 2026', status: 'upcoming', description: 'AI-assisted synthesis, peer review, and public open-access release.' }
    ],
    relatedResourceIds: ['POL-RES-001', 'POL-RES-003']
  },
  {
    id: 'exp-arctic-2025',
    name: 'Indian Arctic Scientific Campaign (2025)',
    expeditionNumber: 'IASC-2025',
    year: 2025,
    region: 'Arctic',
    status: 'Completed',
    bannerImage: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=1200',
    leadStation: 'Himadri Research Station, Ny-Ålesund, Svalbard',
    duration: 'June 2025 – September 2025',
    teamSize: 24,
    expeditionLeader: 'Dr. K. P. Krishnan',
    overview: 'Atmospheric and fjord marine biogeochemistry investigations in Kongsfjorden. Focusing on Arctic haze radiative forcing and acoustic telemetry retrieval from the IndARC subsurface mooring.',
    objectives: [
      'Annual maintenance and acoustic data recovery from the IndARC subsurface marine observatory.',
      'Surface albedo and aerosol optical depth measurements during the Arctic midnight sun period.',
      'Glacial fjord water sampling for microplastics and anthropogenic organic pollutants.'
    ],
    researchActivities: [
      'Sun photometer and vertical lidar soundings',
      'Phytoplankton bloom succession monitoring',
      'Permafrost active layer temperature logging'
    ],
    timeline: [
      { phase: 'Planning', title: 'Svalbard Science Forum Registration', date: 'Mar 2025', status: 'completed', description: 'Environmental clearance and Kings Bay station booking.' },
      { phase: 'Departure', title: 'Transit via Oslo and Longyearbyen', date: 'Jun 2025', status: 'completed', description: 'Team arrival at Ny-Ålesund international research hub.' },
      { phase: 'Field Research', title: 'Kongsfjorden Oceanographic Cruises', date: 'Jul 2025', status: 'completed', description: 'Deployments aboard MS Teisten research launch.' },
      { phase: 'Data Collection', title: 'Aerosol Sampling at Gruvebadet Lab', date: 'Aug 2025', status: 'completed', description: 'Continuous optical and mass concentration readings.' },
      { phase: 'Analysis', title: 'Isotopic Fingerprinting in India', date: 'Nov 2025', status: 'completed', description: 'Cleanroom mass spectrometry of aerosol filters.' },
      { phase: 'Publication', title: 'Scientific Paper and Data Archive', date: 'Jan 2026', status: 'completed', description: 'Peer-reviewed publication and open repository release.' }
    ],
    relatedResourceIds: ['POL-RES-004', 'POL-RES-005']
  },
  {
    id: 'exp-southern-ocean',
    name: '13th Southern Ocean Scientific Expedition (2024–2025)',
    expeditionNumber: 'SOE-13',
    year: 2025,
    region: 'Southern Ocean',
    status: 'Completed',
    bannerImage: 'https://images.unsplash.com/photo-1505118380757-91f5f5632de0?auto=format&fit=crop&q=80&w=1200',
    leadStation: 'Oceanographic Research Vessel ORV Sagar Nidhi / Sagar Kanya',
    duration: 'December 2024 – March 2025',
    teamSize: 32,
    expeditionLeader: 'Dr. Anoop Kumar Tiwari',
    overview: 'High-resolution oceanographic transects across the Sub-Antarctic and Polar Fronts along 57°E. Quantifying biogeochemical carbon flux, hydroacoustic krill biomass (Euphausia superba), and trace metal micronutrient dynamics.',
    objectives: [
      'Conduct 28 deep-water CTD-Rosette casts measuring temperature, salinity, and dissolved oxygen down to 4,000m.',
      'Operate multi-frequency split-beam echosounders to map Southern Ocean Antarctic krill swarming densities.',
      'Deploy autonomous biogeochemical Argo profiling floats in the Antarctic Circumpolar Current.'
    ],
    researchActivities: [
      'Underway pCO2 seawater air-sea exchange tracking',
      'Phytoplankton primary productivity incubations',
      'Marine particulate organic carbon filtration'
    ],
    timeline: [
      { phase: 'Planning', title: 'Cruise Planning & Calibration', date: 'Oct 2024', status: 'completed', description: 'NCPOR and NIOT technical inspection at Port Louis, Mauritius.' },
      { phase: 'Departure', title: 'Sail to 40° South Convergence', date: 'Dec 2024', status: 'completed', description: 'ORV Sagar Nidhi departure into Roaring Forties.' },
      { phase: 'Field Research', title: 'Sub-Antarctic Front Profiling', date: 'Jan 2025', status: 'completed', description: 'Deep water rosette casts and plankton net trawls.' },
      { phase: 'Data Collection', title: 'Ice-Edge Sampling along 64°S', date: 'Feb 2025', status: 'completed', description: 'Marginal ice zone acoustic backscatter recording.' },
      { phase: 'Publication', title: 'Cruisetrack Dataset Archiving', date: 'May 2025', status: 'completed', description: 'Preserved in National Polar Oceanographic Data Centre.' }
    ],
    relatedResourceIds: ['POL-RES-002']
  }
];

// Preserved Original Scientific Resources (Internal Repository)
export const DEFAULT_RESOURCES: Resource[] = [
  {
    id: 'POL-RES-001',
    title: '44th Indian Antarctic Expedition Scientific Report: Ice Core Paleoclimate Analysis',
    description: 'Borehole core analysis revealing 1,200-year isotopic proxies (δ18O and δD) for Antarctic temperature variability, atmospheric dust provenance, and volcanic sulfate spikes from Princess Elizabeth Land.',
    type: 'DOCUMENT',
    region: 'Antarctica',
    year: 2026,
    topic: 'Glaciology',
    researchers: ['Dr. Rahul Mohan', 'Dr. Shailendra Saini', 'Er. Rajesh Varma'],
    uploadedBy: 'usr-contributor-01',
    uploaderName: 'Dr. Rahul Mohan',
    stationOrVessel: 'Bharati Station, Larsemann Hills',
    visibility: 'PUBLIC',
    status: 'STORED',
    keywords: ['Ice Core', 'Paleoclimate', 'Isotope Geochemistry', 'Antarctica', 'Larsemann Hills'],
    expeditionId: 'exp-isea-44',
    expeditionName: '44th Indian Antarctic Scientific Expedition',
    createdAt: '2026-01-10T08:30:00Z',
    updatedAt: '2026-02-01T14:20:00Z',
    additionalMetadata: {
      drillingDepth: '180 meters',
      sensorArray: 'Picarro L2140-i Cavity Ringdown Spectrometer',
      cleanroomStorage: 'NCPOR -20°C Cryo-Archive Facility'
    },
    files: [
      {
        id: 'file-01',
        filename: 'Antarctic_Ice_Core_Report_2026.pdf',
        fileType: 'pdf',
        mimeType: 'application/pdf',
        url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
        sizeMb: 14.8,
        uploadedAt: '2026-01-10T08:30:00Z',
        caption: 'Complete 68-page expedition technical report and borehole stratigraphy.'
      },
      {
        id: 'file-02',
        filename: 'Ice_Core_Drilling_Field_Rig.jpg',
        fileType: 'image',
        mimeType: 'image/jpeg',
        url: 'https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?auto=format&fit=crop&q=80&w=800',
        sizeMb: 4.2,
        uploadedAt: '2026-01-10T08:31:00Z',
        caption: 'Intermediate depth electromechanical drill in operation at -25°C.'
      },
      {
        id: 'file-03',
        filename: 'Bharati_Station_Field_Operations.jpg',
        fileType: 'image',
        mimeType: 'image/jpeg',
        url: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?auto=format&fit=crop&q=80&w=800',
        sizeMb: 5.1,
        uploadedAt: '2026-01-10T08:32:00Z',
        caption: 'Larsemann Hills field camp staging area with snowmobiles.'
      },
      {
        id: 'file-04',
        filename: 'Katabatic_Wind_Telemetry_Dataset.csv',
        fileType: 'data',
        mimeType: 'text/csv',
        url: 'https://raw.githubusercontent.com/datasets/gdp/master/data/gdp.csv',
        sizeMb: 8.4,
        uploadedAt: '2026-01-10T08:35:00Z',
        caption: '10-minute interval meteorological and ablation sensor readings.'
      },
      {
        id: 'file-05',
        filename: 'Antarctic_Field_Drilling_Log.mp4',
        fileType: 'video',
        mimeType: 'video/mp4',
        url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
        sizeMb: 42.0,
        uploadedAt: '2026-01-10T08:40:00Z',
        caption: 'Field documentation of core barrel recovery and thermal packaging.'
      }
    ]
  },
  {
    id: 'POL-RES-002',
    title: 'Southern Ocean Biogeochemical & Hydroacoustic Krill Survey Dataset (Cruise SOE-13)',
    description: 'Underway oceanographic measurements of chlorophyll-a, dissolved organic carbon, and acoustic volume backscatter (Sv) of Euphausia superba across the Sub-Antarctic and Polar Fronts along 57°E.',
    type: 'DATASET',
    region: 'Southern Ocean',
    year: 2025,
    topic: 'Oceanography',
    researchers: ['Dr. Anoop Kumar Tiwari', 'Dr. Rahul Mohan', 'Dr. S. K. Roy'],
    uploadedBy: 'usr-contributor-01',
    uploaderName: 'Dr. Rahul Mohan',
    stationOrVessel: 'ORV Sagar Nidhi',
    visibility: 'PUBLIC',
    status: 'STORED',
    keywords: ['Southern Ocean', 'Krill', 'Carbon Pump', 'Acoustics', 'Plankton', 'CTD'],
    expeditionId: 'exp-southern-ocean',
    expeditionName: 'Southern Ocean Expedition Cruise SOE-13',
    createdAt: '2025-11-14T10:15:00Z',
    updatedAt: '2026-01-22T09:40:00Z',
    additionalMetadata: {
      instrumentation: 'Simrad EK80 Split-beam Echosounder (38/70/120/200 kHz)',
      transectCoordinates: '48°S to 64°S along 57°E Meridian',
      sampleStations: '28 deep rosette casts'
    },
    files: [
      {
        id: 'file-06',
        filename: 'Southern_Ocean_Krill_Hydroacoustics.pdf',
        fileType: 'pdf',
        mimeType: 'application/pdf',
        url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
        sizeMb: 8.6,
        uploadedAt: '2025-11-14T10:15:00Z',
        caption: 'Acoustic survey calibration report for EK80 echosounder.'
      },
      {
        id: 'file-07',
        filename: 'CTD_Hydrography_Profiles_57E.csv',
        fileType: 'data',
        mimeType: 'text/csv',
        url: 'https://raw.githubusercontent.com/datasets/gdp/master/data/gdp.csv',
        sizeMb: 12.3,
        uploadedAt: '2025-11-14T10:20:00Z',
        caption: 'Downcast temperature, salinity, turbidity, and dissolved oxygen records.'
      }
    ]
  },
  {
    id: 'POL-RES-003',
    title: 'Maitri & Bharati Wintering Operations: Environmental Compliance & Energy Systems',
    description: 'Archival debriefs, environmental compliance records, and zero-waste operational protocols covering wintering survival, renewable power cogeneration, and psychological adaptation at Maitri and Bharati.',
    type: 'VIDEO',
    region: 'Antarctica',
    year: 2026,
    topic: 'Polar Technology & Logistics',
    researchers: ['Dr. Rahul Mohan', 'Dr. Shailendra Saini', 'Er. Rajesh Varma'],
    uploadedBy: 'usr-contributor-01',
    uploaderName: 'Dr. Rahul Mohan',
    stationOrVessel: 'Maitri & Bharati Stations',
    visibility: 'PROTECTED',
    status: 'STORED',
    keywords: ['Antarctica', 'Logistics', 'Zero Waste', 'Station Operations', 'Maitri', 'Bharati', 'Wintering'],
    expeditionId: 'exp-isea-44',
    expeditionName: '44th Indian Antarctic Scientific Expedition',
    createdAt: '2026-02-04T12:00:00Z',
    updatedAt: '2026-02-18T16:00:00Z',
    files: [
      {
        id: 'file-08',
        filename: 'Antarctic_Station_Life_Documentary.mp4',
        fileType: 'video',
        mimeType: 'video/mp4',
        url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
        sizeMb: 84.5,
        uploadedAt: '2026-02-04T12:00:00Z',
        caption: 'Full 18-minute institutional video record of wintering operations.'
      },
      {
        id: 'file-09',
        filename: 'Antarctic_Operations_Field_Debrief.pdf',
        fileType: 'pdf',
        mimeType: 'application/pdf',
        url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
        sizeMb: 11.2,
        uploadedAt: '2026-02-04T12:05:00Z',
        caption: 'Annual environmental compliance documentation and logistics logbook.'
      },
      {
        id: 'file-10',
        filename: 'Bharati_Station_Aurora_Night.jpg',
        fileType: 'image',
        mimeType: 'image/jpeg',
        url: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?auto=format&fit=crop&q=80&w=800',
        sizeMb: 6.3,
        uploadedAt: '2026-02-04T12:10:00Z',
        caption: 'Southern Aurora Australis illuminating Bharati research module.'
      }
    ]
  },
  {
    id: 'POL-RES-004',
    title: 'IndARC Subsurface Mooring: Decadal Oceanographic Time-Series in Kongsfjorden',
    description: 'Physical oceanographic dataset from IndARC—India\'s permanent multi-sensor underwater mooring anchored at 192m depth in Kongsfjorden, Svalbard. Captures seasonal Atlantic Water intrusions and fjord stratification.',
    type: 'DOCUMENT',
    region: 'Arctic',
    year: 2025,
    topic: 'Oceanography',
    researchers: ['Dr. K. P. Krishnan', 'Dr. Rahul Mohan', 'Dr. B. L. Redkar'],
    uploadedBy: 'usr-contributor-02',
    uploaderName: 'Dr. K. P. Krishnan',
    stationOrVessel: 'Himadri Research Station, Ny-Ålesund',
    visibility: 'PUBLIC',
    status: 'STORED',
    keywords: ['Arctic', 'IndARC', 'Kongsfjorden', 'Mooring', 'Atlantic Water', 'Fjord Oceanography'],
    expeditionId: 'exp-arctic-2025',
    expeditionName: 'Indian Arctic Scientific Campaign',
    createdAt: '2026-02-20T11:00:00Z',
    updatedAt: '2026-02-22T15:30:00Z',
    files: [
      {
        id: 'file-11',
        filename: 'IndARC_Kongsfjorden_Decadal_Report.pdf',
        fileType: 'pdf',
        mimeType: 'application/pdf',
        url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
        sizeMb: 18.4,
        uploadedAt: '2026-02-20T11:00:00Z',
        caption: '10-year physical oceanographic analysis and acoustic mooring logs.'
      },
      {
        id: 'file-12',
        filename: 'IndARC_Acoustic_Release_Deployment.jpg',
        fileType: 'image',
        mimeType: 'image/jpeg',
        url: 'https://images.unsplash.com/photo-1505118380757-91f5f5632de0?auto=format&fit=crop&q=80&w=800',
        sizeMb: 3.8,
        uploadedAt: '2026-02-20T11:05:00Z',
        caption: 'Deployment of syntactic foam float collar aboard MS Teisten.'
      }
    ]
  },
  {
    id: 'POL-RES-005',
    title: 'Arctic Haze & Aerosol Optical Depth Radiative Forcing Observations',
    description: 'Long-term optical depth and black carbon aerosol mass concentration measurements from Himadri station, examining seasonal solar absorption anomalies and teleconnections with the Indian Summer Monsoon.',
    type: 'DOCUMENT',
    region: 'Arctic',
    year: 2024,
    topic: 'Atmospheric Science',
    researchers: ['Dr. K. P. Krishnan', 'Dr. Manish Tiwari'],
    uploadedBy: 'usr-contributor-02',
    uploaderName: 'Dr. K. P. Krishnan',
    stationOrVessel: 'Himadri Station (79°N)',
    visibility: 'PRIVATE',
    status: 'STORED',
    keywords: ['Arctic Haze', 'Black Carbon', 'Atmosphere', 'Himadri', 'Monsoon', 'Aerosols'],
    expeditionId: 'exp-arctic-2025',
    createdAt: '2024-09-15T10:00:00Z',
    updatedAt: '2024-10-05T10:15:00Z',
    files: [
      {
        id: 'file-13',
        filename: 'Arctic_Aerosol_Radiative_Forcing_Study.pdf',
        fileType: 'pdf',
        mimeType: 'application/pdf',
        url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
        sizeMb: 9.7,
        uploadedAt: '2024-09-15T10:00:00Z',
        caption: 'Peer-reviewed research paper on albedo reduction at 79°N.'
      },
      {
        id: 'file-14',
        filename: 'Sun_Photometer_Midnight_Sun.jpg',
        fileType: 'image',
        mimeType: 'image/jpeg',
        url: 'https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?auto=format&fit=crop&q=80&w=800',
        sizeMb: 4.1,
        uploadedAt: '2024-09-15T10:05:00Z',
        caption: 'Automated CIMEL sun photometer tracking high-latitude aerosol optical depth.'
      }
    ]
  }
];

// Derived Outreach Content Pieces (Derived from Original Resources)
// Demonstrates exact governance lifecycle: Draft -> Scientist Review -> Admin Review -> Approved / Ready to Publish -> Destination Selected -> Published
export const DEFAULT_DRAFTS: ContentDraft[] = [
  // 1. PUBLISHED OUTREACH STORY 1 (Website Article on Public Portal)
  {
    id: 'draft-01',
    resourceId: 'POL-RES-001',
    resourceTitle: '44th Indian Antarctic Expedition Scientific Report: Ice Core Paleoclimate Analysis',
    contentType: 'Website Article',
    title: 'Unlocking 1,200 Years of Climate Memory: Deep Ice Core Recoveries at Bharati Station',
    summary: 'A deep-dive investigation into how Antarctic ice cores drilled during the 44th Indian Antarctic Scientific Expedition are illuminating historical temperature shifts and volcanic events across the Southern Hemisphere.',
    body: `### The Ancient Archives Beneath Our Boots
For centuries, polar ice sheets have acted as Earth's pristine climatic diary. Each winter snowfall traps air bubbles, atmospheric dust, and isotopic signatures—preserving an untouched timestamp of our planet's atmosphere.

During the ongoing 44th Indian Antarctic Scientific Expedition (ISEA-44), a dedicated glaciological team led by Dr. Rahul Mohan successfully drilled an intermediate-depth 180-meter ice core on Princess Elizabeth Land.

### Deciphering the Chemical Fingerprint
Using state-of-the-art Cavity Ringdown Spectrometry at NCPOR's cold laboratory facilities, researchers analyzed stable water isotopes (δ18O and δD).

Key scientific insights revealed:
1. **Medieval Warm Period & Little Ice Age Signals**: Well-defined isotopic fluctuations confirm distinct regional climatic shifts matching Southern Ocean atmospheric re-organizations.
2. **Volcanic Marker Horizons**: Sulfate concentration spikes correlate precisely with the 1815 Tambora and 1883 Krakatoa eruptions, providing chronological tie-points.
3. **Marine Aerosol Influx**: Sodium ion concentrations indicate variations in seasonal sea ice extent across Prydz Bay over the past millennium.

### Preserving Science for Future Generations
The recovered ice cores are sealed in special thermal insulated shuttles and maintained at -20°C aboard chartered polar research vessels. This invaluable archive allows Indian researchers to validate modern global climate models against long-term natural variability.`,
    keyFindings: [
      'Successfully extracted 180m continuous ice core spanning approximately 1,200 calendar years.',
      'Identified sulfate volcanic benchmark layers from major historical eruptions.',
      'Established high-resolution baseline for East Antarctic coastal accumulation rates.'
    ],
    keywords: ['Ice Core', 'Paleoclimate', 'Antarctica', 'Bharati', 'Climate Change', 'Glaciology'],
    imageCaption: 'Glaciology drill team logging core sections inside the ice trench at Princess Elizabeth Land.',
    socialMediaText: '❄️ Did you know Antarctica holds 1,200 years of climate memory? Learn how Indian scientists at Bharati station are reading the ancient ice! #PolarScience #Antarctica #NCPOR #ClimateHistory',
    targetAudience: 'General Public',
    readingTimeMin: 4,
    generatedByAi: true,
    aiModel: 'Gemini Polar Synthesis Pipeline v2',
    aiPromptSummary: 'Synthesized from 44th ISEA technical ice core report with emphasis on public understanding and historical context.',
    editedByContributor: true,
    contributorId: 'usr-contributor-01',
    contributorName: 'Dr. Rahul Mohan',
    status: 'PUBLISHED',
    version: 'v1',
    isScientistVerified: true,
    isAdminApproved: true,
    reviewerId: 'usr-admin-01',
    reviewerName: 'Dr. Thamban Meloth',
    approvedBy: 'Dr. Thamban Meloth',
    approvedAt: '2026-02-01T14:20:00Z',
    publicationDestination: 'Portal',
    publishedBy: 'Dr. Thamban Meloth',
    publicationId: 'PUB-WEB-001',
    reviewerComments: 'Accurate translation of isotopic geochemistry for public audiences. Excellent contextualization of volcanic horizons.',
    createdAt: '2026-01-20T10:00:00Z',
    updatedAt: '2026-02-01T14:20:00Z',
    publishedAt: '2026-02-01T14:20:00Z'
  },

  // 2. PUBLISHED OUTREACH STORY 2 (Website Article on Public Portal)
  {
    id: 'draft-02',
    resourceId: 'POL-RES-004',
    resourceTitle: 'IndARC Subsurface Mooring: Decadal Arctic Oceanographic Time-Series in Kongsfjorden',
    contentType: 'Website Article',
    title: 'Listening to the Arctic: A Decade of Mooring Observations in Kongsfjorden',
    summary: 'India\'s IndARC underwater observatory in Svalbard reveals how pulsing warm Atlantic waters are reshaping Arctic marine habitats, providing crucial indicators for global ocean circulation.',
    body: `### The Deep Sentinel of Kongsfjorden
Since 2014, moored 192 meters beneath the icy surface of Kongsfjorden in the Norwegian high-Arctic (79°N), India's IndARC observatory has stood sentinel. Collecting temperature, salinity, ocean currents, and acoustic ambient noise around the clock, IndARC represents India's first permanent multi-sensor underwater mooring in the Arctic.

### Unraveling "Atlantification"
Field data retrieved during the Arctic campaigns provides rare, unbroken insight into "Atlantification"—the increasing intrusion of warm, salty North Atlantic water into fragile Arctic fjords.

Highlights from the decadal data series:
1. **Winter Warming Pulses**: Sensors recorded an increasing frequency of late-winter Atlantic Water pulses, suppressing surface sea-ice formation.
2. **Freshwater Runoff Dynamics**: Glacial meltwater plumes from Kongsvegen glacier stratify the water column and alter nutrient pathways.
3. **Marine Acoustic Signatures**: Hydrophone sensors recorded vocalization rhythms of bearded seals (*Erignathus barbatus*) and beluga whales.`,
    keyFindings: [
      'Captured 10 continuous years of hydrographic and current velocity telemetry in high-Arctic fjord.',
      'Quantified seasonal heat flux transported into Kongsfjorden via the West Spitsbergen Current.',
      'Provided open-access baseline data for international Arctic Council climate assessments.'
    ],
    keywords: ['Arctic', 'IndARC', 'Kongsfjorden', 'Himadri', 'Oceanography', 'Mooring'],
    imageCaption: 'Acoustic release and float collar recovery of the IndARC mooring from research vessel Teisten.',
    socialMediaText: '🌊 A decade of listening beneath the Arctic sea: Discover what India\'s IndARC mooring in Kongsfjorden tells us about rapid polar ocean transformation! #ArcticScience #IndARC #MoES',
    targetAudience: 'General Public',
    readingTimeMin: 5,
    generatedByAi: true,
    aiModel: 'Gemini Polar Synthesis Pipeline v2',
    aiPromptSummary: 'Generated from IndARC decadal technical synthesis with emphasis on oceanographic implications.',
    editedByContributor: true,
    contributorId: 'usr-contributor-02',
    contributorName: 'Dr. K. P. Krishnan',
    status: 'PUBLISHED',
    version: 'v1',
    isScientistVerified: true,
    isAdminApproved: true,
    reviewerId: 'usr-admin-01',
    reviewerName: 'Dr. Thamban Meloth',
    approvedBy: 'Dr. Thamban Meloth',
    approvedAt: '2026-02-24T16:00:00Z',
    publicationDestination: 'Portal',
    publishedBy: 'Dr. Thamban Meloth',
    publicationId: 'PUB-WEB-002',
    reviewerComments: 'Exemplary public synthesis of physical oceanography telemetry. Approved for national portal dissemination.',
    createdAt: '2026-02-21T09:00:00Z',
    updatedAt: '2026-02-24T16:00:00Z',
    publishedAt: '2026-02-24T16:00:00Z'
  },

  // 3. PUBLISHED OUTREACH STORY 3 (Website Article on Public Portal)
  {
    id: 'draft-03',
    resourceId: 'POL-RES-003',
    resourceTitle: 'Maitri & Bharati Wintering Operations: Environmental Compliance & Energy Systems',
    contentType: 'Website Article',
    title: 'Wintering in White: Inside India\'s Maitri and Bharati Stations',
    summary: 'An evocative look at the human resilience, scientific devotion, and zero-waste environmental protocols sustaining Indian teams through months of polar isolation.',
    body: `### When the Last Ship Leaves
In early March, as sea ice freezes the coastline of Prydz Bay, the chartered icebreaker sounds its final horn and begins the long journey north. For the wintering team left behind at Bharati and Maitri stations, the polar year truly begins. Ahead lie months of isolation, sub-zero temperatures dropping to -45°C, and the deep, shimmering mystery of the polar night.

### A Day in the Life at 69° South
Daily life inside an Antarctic research station is a hive of synchronized activity:
- **06:00**: Technical engineers inspect the diesel cogeneration units, graywater bio-digesters, and backup life support systems.
- **09:00**: Glaciologists and atmospheric scientists begin their daily sensor walk, braving gusting snow to calibrate outdoor radiometers.
- **14:00**: Communication teams sync broadband telemetry packets with NCPOR headquarters in Goa.
- **19:00**: Communal dinner in the dining hall, celebrating birthdays and station traditions.

### Guardians of the Polar Protocol
India's presence in Antarctica strictly upholds the environmental protocol to the Antarctic Treaty (Madrid Protocol). All solid, chemical, and biological waste is compacted, categorized, and shipped back to the mainland for eco-friendly disposal.`,
    keyFindings: [
      'Documented 100% adherence to zero-ecological footprint Antarctic Madrid Protocol.',
      'Achieved uninterrupted satellite connectivity and sensor telemetry throughout winter season.',
      'Maintained peak mental well-being and operational readiness through structured station routines.'
    ],
    keywords: ['Antarctica', 'Station Life', 'Maitri', 'Bharati', 'Wintering', 'Expedition'],
    imageCaption: 'Wintering crew gathered on the exterior deck of Bharati Station during mid-winter celebrations.',
    socialMediaText: 'When the last ship departs, true polar resilience begins. Read "Wintering in White", our intimate look into life inside India\'s Antarctic stations! ❄️ #AntarcticaLife #Maitri #Bharati',
    targetAudience: 'General Public',
    readingTimeMin: 5,
    generatedByAi: true,
    aiModel: 'Gemini Polar Synthesis Pipeline v2',
    aiPromptSummary: 'Expedition narrative synthesized from station daily logs and environmental reports.',
    editedByContributor: true,
    contributorId: 'usr-contributor-01',
    contributorName: 'Dr. Rahul Mohan',
    status: 'PUBLISHED',
    version: 'v1',
    isScientistVerified: true,
    isAdminApproved: true,
    reviewerId: 'usr-admin-01',
    reviewerName: 'Dr. Thamban Meloth',
    approvedBy: 'Dr. Thamban Meloth',
    approvedAt: '2026-02-18T16:00:00Z',
    publicationDestination: 'Portal',
    publishedBy: 'Dr. Thamban Meloth',
    publicationId: 'PUB-WEB-003',
    reviewerComments: 'Inspiring, accurate portrayal of station operations and environmental standards. Approved for public outreach.',
    createdAt: '2026-02-05T14:00:00Z',
    updatedAt: '2026-02-18T16:00:00Z',
    publishedAt: '2026-02-18T16:00:00Z'
  },

  // 4. PUBLISHED OUTREACH STORY 4 (Website Article on Public Portal)
  {
    id: 'draft-04',
    resourceId: 'POL-RES-005',
    resourceTitle: 'Arctic Haze & Aerosol Optical Depth Radiative Forcing Observations',
    contentType: 'Website Article',
    title: 'The Sky Over Svalbard: How Arctic Haze Connects to Tropical Weather',
    summary: 'Examining how black carbon and aerosol particles trapped in Arctic skies alter seasonal solar absorption and influence atmospheric teleconnections to the Indian summer monsoon.',
    body: `### The Pristine Arctic Sky Under Scrutiny
Ny-Ålesund, situated in the Svalbard archipelago, boasts some of the cleanest air on the planet. Yet, every spring, atmospheric scientists at India's Himadri station observe a surprising phenomenon: episodic layers of reddish-brown haze drifting high overhead.

### What is Arctic Haze?
Arctic haze consists of microscopic sulfate aerosols, black carbon (soot), and organic particles transported from industrial centers thousands of miles away. Because the Arctic winter atmosphere is exceptionally dry and stable, these particles remain suspended for weeks without being washed away by rainfall.

### Key Discoveries from Himadri
Using ground-based sun photometers, nephelometers, and vertical lidar soundings, the research team discovered:
- **Surface Albedo Reduction**: When black carbon particles settle onto pure snow and sea ice, they darken the surface, absorbing more sunlight.
- **Monsoon Teleconnections**: Perturbations in high-latitude atmospheric pressure systems alter the circum-global wave trains, shifting the position of the subtropical westerly jet.`,
    keyFindings: [
      'Continuous 5-year optical depth records logged at Himadri Station (79°N).',
      'Demonstrated 2.4% surface albedo reduction during peak aerosol deposition events.',
      'Contributed in-situ verification data to the Arctic Monitoring and Assessment Programme (AMAP).'
    ],
    keywords: ['Arctic Haze', 'Black Carbon', 'Atmosphere', 'Himadri', 'Monsoon', 'Aerosols'],
    imageCaption: 'Sun photometer tracking aerosol optical depth against the Arctic midnight sun.',
    socialMediaText: 'How does soot in the high Arctic affect rain in India? Learn how scientists at Himadri Station are tracking Arctic Haze! #ClimateScience #Himadri #ArcticAerosols',
    targetAudience: 'General Public',
    readingTimeMin: 4,
    generatedByAi: true,
    aiModel: 'Gemini Polar Synthesis Pipeline v2',
    aiPromptSummary: 'Synthesized from aerosol radiative forcing research paper.',
    editedByContributor: true,
    contributorId: 'usr-contributor-02',
    contributorName: 'Dr. K. P. Krishnan',
    status: 'PUBLISHED',
    version: 'v1',
    isScientistVerified: true,
    isAdminApproved: true,
    reviewerId: 'usr-admin-01',
    reviewerName: 'Dr. Thamban Meloth',
    approvedBy: 'Dr. Thamban Meloth',
    approvedAt: '2024-10-05T10:15:00Z',
    publicationDestination: 'Portal',
    publishedBy: 'Dr. Thamban Meloth',
    publicationId: 'PUB-WEB-004',
    reviewerComments: 'Clear public explanation of complex aerosol physics. Approved.',
    createdAt: '2024-09-15T10:00:00Z',
    updatedAt: '2024-10-05T10:15:00Z',
    publishedAt: '2024-10-05T10:15:00Z'
  },

  // 5. UNDER REVIEW DRAFT (Submitted by Scientist Dr. Rahul Mohan, in Admin Review Queue)
  {
    id: 'draft-05',
    resourceId: 'POL-RES-002',
    resourceTitle: 'Southern Ocean Biogeochemical & Hydroacoustic Krill Survey Dataset (Cruise SOE-13)',
    contentType: 'Website Article',
    title: 'Southern Ocean Carbon Sinks: Hydroacoustic Krill Dynamics along 57°E',
    summary: 'A synthesis of deep CTD hydrography and acoustic backscatter measurements examining how Antarctic krill swarms accelerate the biological carbon pump across the Polar Front.',
    body: `### The Living Carbon Pump of the Southern Ocean
During the 13th Southern Ocean Expedition (SOE-13) aboard ORV Sagar Nidhi, researchers mapped acoustic volume backscattering strength (Sv) alongside 28 deep-water CTD-Rosette casts from 48°S down to 64°S along the 57°E meridian.

### Key Biogeochemical Findings
1. **Vertical Carbon Export**: High concentrations of Antarctic krill (*Euphausia superba*) produce dense, rapidly sinking fecal pellets, sequestering particulate organic carbon to depths below 2,000 meters.
2. **Sub-Antarctic Frontal Gradient**: Steep temperature and salinity gradients at 52°S coincide with peak chlorophyll-a maxima, fueling dense zooplankton foraging zones.
3. **Trace Metal Micronutrients**: Dissolved iron concentrations transported from island plateaus trigger localized diatom blooms, acting as natural climate mitigators.`,
    keyFindings: [
      'Documented high-density acoustic krill aggregations between 54°S and 60°S.',
      'Quantified dissolved oxygen minimum zones at intermediate depths along the 57°E transect.',
      'Demonstrated biological carbon export rates exceeding 140 mg C/m²/day during peak bloom periods.'
    ],
    keywords: ['Southern Ocean', 'Krill', 'Carbon Sink', 'Oceanography', 'Acoustics', 'CTD'],
    imageCaption: 'Acoustic volume backscatter echogram showing Euphausia superba daytime depth migration.',
    socialMediaText: 'How tiny Antarctic krill help cool the planet: Dive into newly retrieved deep-water data from ORV Sagar Nidhi! #OceanScience #Krill #CarbonPump #NCPOR',
    targetAudience: 'Researchers',
    readingTimeMin: 4,
    generatedByAi: true,
    aiModel: 'Gemini Polar Synthesis Pipeline v2',
    aiPromptSummary: 'Generated from Southern Ocean cruise technical logs and CTD hydrography data.',
    editedByContributor: true,
    contributorId: 'usr-contributor-01',
    contributorName: 'Dr. Rahul Mohan',
    status: 'UNDER_REVIEW',
    version: 'v1',
    isScientistVerified: true,
    isAdminApproved: false,
    revisionNotes: 'Cross-checked Simrad EK80 calibration coefficients and included depth transects.',
    createdAt: '2026-02-23T11:00:00Z',
    updatedAt: '2026-02-25T14:30:00Z'
  },

  // 6. READY TO PUBLISH: Social Media Content (Approved by Admin, Ready in Publishing Center)
  {
    id: 'draft-06',
    resourceId: 'POL-RES-001',
    resourceTitle: '44th Indian Antarctic Expedition Scientific Report: Ice Core Paleoclimate Analysis',
    contentType: 'Social Media Content',
    title: 'Indian Antarctic Expedition 2025–26: Ice Core Discoveries',
    summary: 'Concise social outreach post series on 1,200 years of climate history extracted from Princess Elizabeth Land ice cores.',
    body: `### 📱 Channel 1: X (Twitter) Thread
🧊 Deep ice, ancient atmosphere! Researchers on the 44th Indian Antarctic Expedition at Bharati Station have recovered a 180m ice core spanning 1,200 years.

Key Highlights:
1️⃣ Volcanic horizons from 1815 Tambora and 1883 Krakatoa identified.
2️⃣ High-precision baseline for East Antarctic coastal snow accumulation.
3️⃣ Zero-waste polar environmental protocol strictly maintained.

Read the verified article: [portal.ncpor.res.in/research]
#IndianAntarcticExpedition #PolarScience #NCPOR #ClimateChange #MoES

---
### 💼 Channel 2: LinkedIn
New paleoclimatic observations from the 44th Indian Antarctic Expedition published by the National Centre for Polar and Ocean Research. Lead researchers analyzed stable water isotopes to calibrate regional climate models against natural variability over 12 centuries.`,
    keyFindings: [
      'Tailored multi-platform social media dissemination pack.',
      'Includes verified hashtags and institutional attribution.'
    ],
    keywords: ['IndianAntarcticExpedition', 'PolarScience', 'NCPOR', 'ClimateChange', 'MoES'],
    targetAudience: 'General Public',
    readingTimeMin: 1,
    generatedByAi: true,
    aiModel: 'Gemini Polar Synthesis Pipeline v2',
    aiPromptSummary: 'Social media outreach pack derived from 44th ISEA ice core technical report.',
    editedByContributor: true,
    contributorId: 'usr-contributor-01',
    contributorName: 'Dr. Rahul Mohan',
    status: 'READY_TO_PUBLISH',
    version: 'v1',
    isScientistVerified: true,
    isAdminApproved: true,
    reviewerId: 'usr-admin-01',
    reviewerName: 'Dr. Thamban Meloth',
    approvedBy: 'Dr. Thamban Meloth',
    approvedAt: '2026-02-26T10:00:00Z',
    reviewerComments: 'Verified against expedition borehole logs. Approved for official social dissemination across institutional handles.',
    socialMediaText: '🧊 1,200 years of Earth’s climate history preserved in Antarctic ice! Scientists at Bharati Station completed deep borehole extraction to track historical temperature shifts. Read the verified report: #IndianAntarcticExpedition #PolarScience #NCPOR',
    imageCaption: 'Glaciology drill team logging core sections inside the ice trench at Princess Elizabeth Land.',
    attachedMediaUrls: [
      'https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?auto=format&fit=crop&q=80&w=800',
      'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
      'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?auto=format&fit=crop&q=80&w=800'
    ],
    attachedMediaItems: [
      {
        id: 'file-02',
        url: 'https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?auto=format&fit=crop&q=80&w=800',
        type: 'image',
        filename: 'Ice_Core_Drilling_Field_Rig.jpg',
        caption: 'Intermediate depth electromechanical drill in operation at -25°C at Princess Elizabeth Land.',
        sizeMb: 4.2
      },
      {
        id: 'file-05',
        url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
        type: 'video',
        filename: 'Antarctic_Field_Drilling_Log.mp4',
        caption: 'Field video documentation of core barrel recovery and thermal insulated shuttle packaging.',
        sizeMb: 42.0
      },
      {
        id: 'file-03',
        url: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?auto=format&fit=crop&q=80&w=800',
        type: 'image',
        filename: 'Bharati_Station_Field_Operations.jpg',
        caption: 'Larsemann Hills field camp staging area with snowmobiles and scientific logging gear.',
        sizeMb: 5.1
      }
    ],
    createdAt: '2026-02-15T09:30:00Z',
    updatedAt: '2026-02-26T10:00:00Z'
  },

  // 7. READY TO PUBLISH: Media Caption (Approved by Admin, Ready for Media Catalogue)
  {
    id: 'draft-07',
    resourceId: 'POL-RES-001',
    resourceTitle: '44th Indian Antarctic Expedition Scientific Report: Ice Core Paleoclimate Analysis',
    contentType: 'Media Caption',
    title: 'Archival Media Documentation: Ice Core Drilling at Princess Elizabeth Land',
    summary: 'Standardized institutional photograph caption, accessibility alt-text, and metadata for field drill operations.',
    body: `### Curated Public Display Caption
**Caption**: Glaciology drill team logging continuous ice-core sections inside the subterranean trench at Princess Elizabeth Land during the 44th Indian Antarctic Scientific Expedition (2025–2026). Core sections were sealed in insulated shuttles at -20°C for transport to NCPOR laboratories.

### Contextual Scientific Backstory
The intermediate electromechanical drill rig operated at ambient temperatures below -25°C, recovering 180 meters of core to reconstruct historical atmospheric composition and aerosol accumulation.

### Geospatial & Field Attribution
- **Location**: Princess Elizabeth Land, East Antarctica (near Bharati Station)
- **Season**: 44th ISEA (2025–2026)
- **Lead Personnel**: Dr. Rahul Mohan, Dr. Shailendra Saini
- **Attribution**: National Centre for Polar and Ocean Research (NCPOR), Ministry of Earth Sciences.

### Accessibility Alt-Text (WCAG 2.1 Compliant)
Two polar scientists in high-visibility red extreme-weather suits carefully examining a transparent cylindrical ice core segment inside an excavated snow trench, with drilling apparatus and measurement calipers visible on the work table.`,
    keyFindings: [
      'Standardized catalog caption with geospatial coordinates and expedition metadata.',
      'Accessibility alt-text formatted for public knowledge portal display.'
    ],
    keywords: ['Media Caption', 'Ice Core', 'Princess Elizabeth Land', 'Bharati', 'NCPOR'],
    targetAudience: 'General Public',
    readingTimeMin: 1,
    generatedByAi: true,
    aiModel: 'Gemini Polar Synthesis Pipeline v2',
    aiPromptSummary: 'Media caption generated for ice core field drill photography artifact.',
    editedByContributor: true,
    contributorId: 'usr-contributor-01',
    contributorName: 'Dr. Rahul Mohan',
    status: 'READY_TO_PUBLISH',
    version: 'v1',
    isScientistVerified: true,
    isAdminApproved: true,
    reviewerId: 'usr-admin-01',
    reviewerName: 'Dr. Thamban Meloth',
    approvedBy: 'Dr. Thamban Meloth',
    approvedAt: '2026-02-26T11:00:00Z',
    reviewerComments: 'Accurate technical caption and metadata. Approved for inclusion in public media catalogue.',
    imageCaption: 'Glaciology drill team logging continuous ice-core sections inside the subterranean trench at Princess Elizabeth Land.',
    mediaFileId: 'file-02',
    attachedMediaUrls: ['https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?auto=format&fit=crop&q=80&w=1200'],
    createdAt: '2026-02-25T16:00:00Z',
    updatedAt: '2026-02-26T11:00:00Z'
  },

  // 8. READY TO PUBLISH: Website Article (Approved by Admin, Ready to Publish to Portal)
  {
    id: 'draft-08',
    resourceId: 'POL-RES-003',
    resourceTitle: 'Maitri & Bharati Wintering Operations: Environmental Compliance & Energy Systems',
    contentType: 'Website Article',
    title: 'Zero-Footprint Science: Renewable Cogeneration and Environmental Safeguards at Bharati',
    summary: 'How innovative bio-digester integration and waste-heat recovery are transforming India\'s modern Antarctic research station into a global benchmark for Madrid Protocol adherence.',
    body: `### Engineering Sustainability on the Continental Edge
In the harsh polar desert of the Larsemann Hills, operating an advanced scientific research station requires extreme thermal self-sufficiency without disturbing fragile coastal moss beds and seal rookeries.

Bharati Station, commissioned as India's third Antarctic base, was designed from inception with ecological containment at its core.

### Waste Heat Recovery and Combined Heat & Power (CHP)
1. **Cogeneration Systems**: Rather than venting exhaust energy, heat exchangers capture waste thermal output from station generators, warming indoor air, potable water, and laboratory incubators.
2. **Graywater Recycling**: Membrane bioreactors purify graywater for technical wash cycles, drastically reducing total freshwater consumption from nearby melt-lakes.
3. **Madrid Protocol Compliance**: 100% of solid non-biodegradable waste is cataloged, compacted, and transported northward aboard chartered research ships.

### A Living Laboratory for Extreme Operations
As future polar expeditions address deeper environmental questions, Bharati stands as an operational testament: pioneering scientific discovery and ecological guardianship can progress in complete harmony.`,
    keyFindings: [
      'Over 60% of total station space-heating derived from generator waste-heat recovery.',
      'Zero untreated effluent discharged into the Antarctic marine or terrestrial ecosystem.',
      'Full compliance with the Committee for Environmental Protection (CEP) international audit.'
    ],
    keywords: ['Bharati', 'Station Logistics', 'Zero Waste', 'Madrid Protocol', 'Antarctica', 'Sustainability'],
    targetAudience: 'General Public',
    readingTimeMin: 4,
    generatedByAi: true,
    aiModel: 'Gemini Polar Synthesis Pipeline v2',
    aiPromptSummary: 'Synthesized from Bharati environmental compliance and cogeneration technical audit.',
    editedByContributor: true,
    contributorId: 'usr-contributor-01',
    contributorName: 'Dr. Rahul Mohan',
    status: 'READY_TO_PUBLISH',
    version: 'v1',
    isScientistVerified: true,
    isAdminApproved: true,
    reviewerId: 'usr-admin-01',
    reviewerName: 'Dr. Thamban Meloth',
    approvedBy: 'Dr. Thamban Meloth',
    approvedAt: '2026-02-26T14:00:00Z',
    reviewerComments: 'Verified against engineering debriefs. Approved for Portal publication.',
    imageCaption: 'Elevated Bharati research station modules with snow clearing corridors.',
    attachedMediaUrls: ['https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?auto=format&fit=crop&q=80&w=1200'],
    createdAt: '2026-02-24T09:00:00Z',
    updatedAt: '2026-02-26T14:00:00Z'
  },

  // 9. REQUIRES RE-APPROVAL (Scientist edited content after approval; triggered re-approval)
  {
    id: 'draft-09',
    resourceId: 'POL-RES-001',
    resourceTitle: '44th Indian Antarctic Expedition Scientific Report: Ice Core Paleoclimate Analysis',
    contentType: 'Website Article',
    title: 'Katabatic Wind Boundary Layer Profiles at Larsemann Hills (Revised Calibration)',
    summary: 'Revised analysis of gravity-driven high-velocity winds sweeping off the Antarctic ice sheet, incorporating newly synchronized AWS sensor records.',
    body: `### The Roar of the Polar Wind
Katabatic winds are among the fiercest atmospheric phenomena on Earth. Driven by gravity, dense cold air cascades down the steep slopes of the continental ice sheet towards the coast, frequently exceeding 150 km/h within minutes.

### Updated Telemetry Calibration (v2)
Following post-season calibration of the Young anemometer arrays at Bharati, wind shear coefficients have been refined to account for localized topographic acceleration over the Stornes Peninsula.`,
    keyFindings: [
      'Synchronized 10-minute automated surface meteorological measurements across Larsemann Hills.',
      'Observed correlation between katabatic gusts and coastal polynya formation.'
    ],
    keywords: ['Katabatic Wind', 'Antarctica', 'Atmosphere', 'Larsemann Hills', 'Bharati'],
    targetAudience: 'General Public',
    readingTimeMin: 3,
    generatedByAi: true,
    aiModel: 'Gemini Polar Synthesis Pipeline v2',
    aiPromptSummary: 'Initial draft updated with revised calibration constants.',
    editedByContributor: true,
    contributorId: 'usr-contributor-01',
    contributorName: 'Dr. Rahul Mohan',
    status: 'REQUIRES_REAPPROVAL',
    version: 'v2',
    lastEditedBy: 'Dr. Rahul Mohan',
    lastEditedAt: '2026-02-27T08:00:00Z',
    isScientistVerified: true,
    isAdminApproved: false,
    revisionNotes: 'Updated anemometer calibration data after initial approval; resubmitted for editorial re-approval.',
    createdAt: '2026-02-25T16:00:00Z',
    updatedAt: '2026-02-27T08:00:00Z'
  },

  // 10. READY TO PUBLISH: Social Media Content 2 (Arctic Decadal Telemetry)
  {
    id: 'draft-10',
    resourceId: 'POL-RES-004',
    resourceTitle: 'IndARC Subsurface Mooring: Decadal Arctic Oceanographic Time-Series in Kongsfjorden',
    contentType: 'Social Media Content',
    title: 'A Decade of Arctic Ocean Sentinel Observations (79°N)',
    summary: 'Multi-platform social campaign on India\'s 10-year IndARC underwater mooring telemetry in Kongsfjorden, Svalbard.',
    body: `### 📱 Multi-Platform Campaign: Decadal Arctic Telemetry
🌊 192 meters beneath the Arctic fjord surface, India's IndARC observatory has completed 10 unbroken years of oceanographic logging!

Key Scientific Takeaways:
🔹 Detected seasonal intrusion of warm North Atlantic water pulses ("Atlantification").
🔹 Monitored acoustic signatures of bearded seals and beluga pods across polar winters.
🔹 Real-time salinity and heat flux records validating international climate prediction models.

Official Portal: [portal.ncpor.res.in/research/indarc]
#IndARC #ArcticScience #Kongsfjorden #Svalbard #NCPOR #MoES #Oceanography`,
    keyFindings: [
      '10 years of unbroken continuous hydrographic sensor records at 79°N.',
      'Documented pulse frequency of warm Atlantic water intrusions.'
    ],
    keywords: ['IndARC', 'ArcticScience', 'Kongsfjorden', 'Svalbard', 'NCPOR', 'MoES'],
    targetAudience: 'General Public',
    readingTimeMin: 1,
    generatedByAi: true,
    aiModel: 'Gemini Polar Synthesis Pipeline v2',
    aiPromptSummary: 'Derived from IndARC 10-year decadal synthesis.',
    editedByContributor: true,
    contributorId: 'usr-contributor-02',
    contributorName: 'Dr. K. P. Krishnan',
    status: 'READY_TO_PUBLISH',
    version: 'v1',
    isScientistVerified: true,
    isAdminApproved: true,
    reviewerId: 'usr-admin-01',
    reviewerName: 'Dr. Thamban Meloth',
    approvedBy: 'Dr. Thamban Meloth',
    approvedAt: '2026-02-26T15:30:00Z',
    reviewerComments: 'Excellent social distillation of decadal physical oceanography telemetry. Approved.',
    socialMediaText: '🌊 A decade listening to the high-Arctic! India’s IndARC underwater observatory at 79°N in Svalbard reveals how pulsing warm Atlantic waters reshape fragile polar ecosystems. Read the 10-year findings: [portal.ncpor.res.in] #IndARC #ArcticScience #NCPOR',
    imageCaption: 'Acoustic release and float collar recovery of the IndARC mooring from research vessel Teisten.',
    attachedMediaUrls: [
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=800',
      'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4'
    ],
    attachedMediaItems: [
      {
        id: 'file-med-arctic-01',
        url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=800',
        type: 'image',
        filename: 'IndARC_Acoustic_Mooring_Float.jpg',
        caption: 'Acoustic release and subsurface float collar deployed in Kongsfjorden at 79°N.',
        sizeMb: 6.2
      },
      {
        id: 'file-med-arctic-02',
        url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
        type: 'video',
        filename: 'Kongsfjorden_Fjord_Acoustic_Survey.mp4',
        caption: 'High-definition oceanographic sonar deployment from polar research vessel Teisten.',
        sizeMb: 38.5
      }
    ],
    createdAt: '2026-02-22T10:00:00Z',
    updatedAt: '2026-02-26T15:30:00Z'
  },

  // 11. READY TO PUBLISH: Social Media Content 3 (Southern Ocean Krill Carbon Pump)
  {
    id: 'draft-11',
    resourceId: 'POL-RES-002',
    resourceTitle: 'Southern Ocean Biogeochemical & Hydroacoustic Krill Survey Dataset (Cruise SOE-13)',
    contentType: 'Social Media Content',
    title: 'Earth’s Deep Blue Climate Machine: Southern Ocean Krill Swarms',
    summary: 'Social media dispatch on how Antarctic krill swarms accelerate vertical carbon sequestration along 57°E.',
    body: `### 🦐 The Living Carbon Pump of the Southern Ocean
Did you know tiny Antarctic krill (*Euphausia superba*) are natural climate mitigators? 

During Cruise SOE-13 aboard ORV Sagar Nidhi, researchers recorded acoustic swarms exporting over 140 mg of carbon per square meter every day down into the deep sea abyssal plain!

Key Highlights:
1️⃣ High-frequency EK80 hydroacoustic mapping from 48°S to 64°S.
2️⃣ Sub-Antarctic Front nutrient plumes fueling massive biological blooms.
3️⃣ Data freely accessible via NCPOR Polar Repository.

Explore the dataset: [portal.ncpor.res.in/soe-13]
#SouthernOcean #KrillScience #CarbonPump #Oceanography #NCPOR #MoES`,
    keyFindings: [
      'Documented biological carbon export exceeding 140 mg C/m²/day.',
      'Quantified acoustic volume backscattering strength along 57°E.'
    ],
    keywords: ['SouthernOcean', 'KrillScience', 'CarbonPump', 'Oceanography', 'NCPOR', 'MoES'],
    targetAudience: 'General Public',
    readingTimeMin: 1,
    generatedByAi: true,
    aiModel: 'Gemini Polar Synthesis Pipeline v2',
    aiPromptSummary: 'Derived from SOE-13 hydroacoustic dataset.',
    editedByContributor: true,
    contributorId: 'usr-contributor-01',
    contributorName: 'Dr. Rahul Mohan',
    status: 'READY_TO_PUBLISH',
    version: 'v1',
    isScientistVerified: true,
    isAdminApproved: true,
    reviewerId: 'usr-admin-01',
    reviewerName: 'Dr. Thamban Meloth',
    approvedBy: 'Dr. Thamban Meloth',
    approvedAt: '2026-02-26T16:00:00Z',
    reviewerComments: 'Engaging, scientifically accurate social outreach. Approved.',
    socialMediaText: '🦐 How tiny Antarctic krill help cool planet Earth: Underway CTD & acoustic data from Cruise SOE-13 along 57°E shows krill swarms exporting over 140 mg C/m²/day into the deep ocean! #SouthernOcean #KrillCarbon #Oceanography #NCPOR #MoES',
    imageCaption: 'Acoustic volume backscatter echogram showing Euphausia superba daytime depth migration.',
    attachedMediaUrls: [
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&q=80&w=800',
      'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4'
    ],
    attachedMediaItems: [
      {
        id: 'file-med-krill-01',
        url: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&q=80&w=800',
        type: 'image',
        filename: 'Acoustic_Echogram_Krill_Swarm.jpg',
        caption: 'Simrad EK80 120 kHz split-beam volume backscatter showing diurnal krill migration layers.',
        sizeMb: 5.4
      },
      {
        id: 'file-med-krill-02',
        url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
        type: 'video',
        filename: 'CTD_Rosette_Casts_Southern_Ocean.mp4',
        caption: 'Deep CTD-Rosette water sampling deployment from ORV Sagar Nidhi at 58°S.',
        sizeMb: 45.0
      }
    ],
    createdAt: '2026-02-24T11:00:00Z',
    updatedAt: '2026-02-26T16:00:00Z'
  }
];

export const DEFAULT_ACTIVITY_LOGS: ActivityLog[] = [
  {
    id: 'act-01',
    userId: 'usr-contributor-01',
    userName: 'Dr. Rahul Mohan',
    userRole: 'CONTENT_CONTRIBUTOR',
    action: 'STORE_RESOURCE',
    targetId: 'POL-RES-001',
    targetTitle: '44th Indian Antarctic Expedition Scientific Report',
    timestamp: '2026-01-10T08:30:00Z',
    details: 'Preserved original source material (5 files: PDF report, photographs, CSV dataset, field video).'
  },
  {
    id: 'act-02',
    userId: 'usr-contributor-02',
    userName: 'Dr. K. P. Krishnan',
    userRole: 'CONTENT_CONTRIBUTOR',
    action: 'STORE_RESOURCE',
    targetId: 'POL-RES-004',
    targetTitle: 'IndARC Subsurface Mooring Decadal Report',
    timestamp: '2026-02-20T11:00:00Z',
    details: 'Archived 10-year oceanographic mooring telemetry and cruise calibration logs.'
  },
  {
    id: 'act-03',
    userId: 'usr-contributor-01',
    userName: 'Dr. Rahul Mohan',
    userRole: 'CONTENT_CONTRIBUTOR',
    action: 'CREATE_DRAFT',
    targetId: 'draft-05',
    targetTitle: 'Southern Ocean Carbon Sinks: Hydroacoustic Krill Dynamics',
    timestamp: '2026-02-23T11:00:00Z',
    details: 'Generated and submitted scientific summary from source resource POL-RES-002 for editorial review.'
  },
  {
    id: 'act-04',
    userId: 'usr-admin-01',
    userName: 'Dr. Thamban Meloth',
    userRole: 'ADMINISTRATOR',
    action: 'APPROVE_PUBLISH',
    targetId: 'draft-01',
    targetTitle: 'Unlocking 1,200 Years of Climate Memory',
    timestamp: '2026-02-01T14:20:00Z',
    details: 'Verified scientific accuracy against borehole stratigraphy; approved for public portal.'
  },
  {
    id: 'act-05',
    userId: 'usr-admin-01',
    userName: 'Dr. Thamban Meloth',
    userRole: 'ADMINISTRATOR',
    action: 'REQUEST_CHANGES',
    targetId: 'draft-06',
    targetTitle: 'Lake Sediment Paleolimnology Around Schirmacher Oasis',
    timestamp: '2026-02-20T17:15:00Z',
    details: 'Requested SHCal20 calibration and reservoir effect elaboration.'
  }
];

// Exactly 7 authentic media items
export const DEFAULT_MEDIA_ITEMS: MediaItem[] = [
  {
    id: 'med-01',
    type: 'image',
    title: 'Bharati Research Station Elevated Module',
    location: 'Larsemann Hills, East Antarctica',
    region: 'Antarctica',
    year: 2026,
    url: 'https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?auto=format&fit=crop&q=80&w=1200',
    thumbnail: 'https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?auto=format&fit=crop&q=80&w=600',
    caption: 'High-resolution exterior view of India\'s state-of-the-art Bharati station constructed on stilts to prevent snow drifting.',
    photographerOrCredit: 'Official NCPOR Expedition Archive / Dr. Rahul Mohan',
    date: '2026-01-15',
    tags: ['Bharati', 'Antarctica', 'Station', 'Expedition'],
    resourceId: 'POL-RES-001'
  },
  {
    id: 'med-02',
    type: 'image',
    title: 'Aurora Australis Dancing Over Maitri Station',
    location: 'Schirmacher Oasis, East Antarctica',
    region: 'Antarctica',
    year: 2025,
    url: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?auto=format&fit=crop&q=80&w=1200',
    thumbnail: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?auto=format&fit=crop&q=80&w=600',
    caption: 'Vibrant geomagnetic auroral ribbons captured above the Maitri weather mast during winter polar night.',
    photographerOrCredit: 'Indian Institute of Geomagnetism (IIG) & NCPOR',
    date: '2025-06-21',
    tags: ['Maitri', 'Aurora', 'Antarctica', 'Night Sky'],
    resourceId: 'POL-RES-003'
  },
  {
    id: 'med-03',
    type: 'video',
    title: 'Antarctic Wintering Operations Briefing',
    location: 'Bharati Research Station',
    region: 'Antarctica',
    year: 2026,
    url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?auto=format&fit=crop&q=80&w=600',
    duration: '03:45',
    caption: 'Expedition video report showing station engineers and scientists executing winter research schedules.',
    photographerOrCredit: '44th ISEA Media Cell',
    date: '2026-02-04',
    tags: ['Bharati', 'Video', 'Antarctica', 'Expedition'],
    resourceId: 'POL-RES-003'
  },
  {
    id: 'med-04',
    type: 'image',
    title: 'Himadri Research Station in Ny-Ålesund, Svalbard (79°N)',
    location: 'Ny-Ålesund, Svalbard',
    region: 'Arctic',
    year: 2025,
    url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=1200',
    thumbnail: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=600',
    caption: 'India\'s Arctic laboratory at 79° North supporting atmospheric, permafrost, and marine fjord studies.',
    photographerOrCredit: 'NCPOR Arctic Research Group',
    date: '2025-07-12',
    tags: ['Himadri', 'Arctic', 'Svalbard', 'Kongsfjorden'],
    resourceId: 'POL-RES-004'
  },
  {
    id: 'med-05',
    type: 'image',
    title: 'IndARC Subsurface Mooring Acoustic Float Staging',
    location: 'Kongsfjorden Fjord, Arctic',
    region: 'Arctic',
    year: 2025,
    url: 'https://images.unsplash.com/photo-1505118380757-91f5f5632de0?auto=format&fit=crop&q=80&w=1200',
    thumbnail: 'https://images.unsplash.com/photo-1505118380757-91f5f5632de0?auto=format&fit=crop&q=80&w=600',
    caption: 'Syntactic foam buoys and acoustic release transponders prepared for deep-water anchorage at 192m depth.',
    photographerOrCredit: 'NCPOR Oceanography Team',
    date: '2025-07-28',
    tags: ['IndARC', 'Oceanography', 'Arctic', 'Mooring'],
    resourceId: 'POL-RES-004'
  },
  {
    id: 'med-06',
    type: 'image',
    title: 'Electromechanical Ice Core Drill at Princess Elizabeth Land',
    location: 'Larsemann Hills Glacier Margin',
    region: 'Antarctica',
    year: 2026,
    url: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80&w=1200',
    thumbnail: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80&w=600',
    caption: 'Glaciology crew retrieving 1-meter ice core barrels from the 180m borehole at sub-zero temperatures.',
    photographerOrCredit: 'Dr. Rahul Mohan / 44th ISEA',
    date: '2026-01-20',
    tags: ['Ice Core', 'Glaciology', 'Antarctica', 'Drilling'],
    resourceId: 'POL-RES-001'
  },
  {
    id: 'med-07',
    type: 'image',
    title: 'Himansh High-Altitude Observatory at 4,080m (Spiti Valley)',
    location: 'Chandra Basin, Himachal Pradesh',
    region: 'Himalayas (Third Pole)',
    year: 2025,
    url: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&q=80&w=1200',
    thumbnail: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&q=80&w=600',
    caption: 'India\'s permanent high-altitude station Himansh dedicated to glaciological mass balance and hydro-meteorology.',
    photographerOrCredit: 'NCPOR Cryosphere Science Wing',
    date: '2025-09-02',
    tags: ['Himansh', 'Himalayas', 'Third Pole', 'Glaciers'],
    resourceId: 'POL-RES-001'
  }
];

// ==========================================
// 1. OFFICIAL REPOSITORY DATASETS (Sample Demonstration Datasets)
// ==========================================
export const DEFAULT_DATASETS: Dataset[] = [
  {
    id: 'DATA-001',
    title: 'Ice Core Geochemistry & Stable Isotope Profile Dataset',
    description: 'High-resolution borehole stable water isotopes (δ18O and δD), deuterium excess, major anion/cation concentrations, and volcanic sulfate spike chronologies extracted from a 180-meter intermediate ice core on Princess Elizabeth Land.',
    expeditionId: 'exp-isea-44',
    expeditionName: '44th Indian Scientific Expedition to Antarctica',
    region: 'Antarctica',
    platform: 'Bharati Station / Princess Elizabeth Land',
    researchDomain: 'Glaciology',
    parameters: ['Stable Isotopes (δ18O, δD)', 'Deuterium Excess', 'Sulfate Concentrations', 'Electrical Conductivity (ECM)'],
    year: 2026,
    authors: ['Dr. Rahul Mohan', 'Dr. Shailendra Saini', 'Er. Rajesh Varma'],
    leadInstitution: 'National Centre for Polar and Ocean Research (NCPOR)',
    fileFormat: 'CSV',
    fileSize: '8.4 MB',
    r2ObjectKey: 'scientific-resources/datasets/Antarctica_Ice_Core_Geochemistry_2026.csv',
    license: 'Open Access / Creative Commons Attribution 4.0 (CC BY 4.0)',
    accessStatus: 'Available',
    sourceResourceId: 'POL-RES-001',
    relatedExpeditionId: 'exp-isea-44',
    relatedPublicationIds: ['PUB-001'],
    downloadCount: 142,
    sampleColumns: ['Depth_m', 'Age_CE', 'Delta_18O_permil', 'Delta_D_permil', 'd_excess', 'SO4_ppb', 'Na_ppb'],
    sampleDataPreview: [
      { Depth_m: 1.2, Age_CE: 2025, Delta_18O_permil: -34.8, Delta_D_permil: -271.4, d_excess: 7.0, SO4_ppb: 84.2, Na_ppb: 12.1 },
      { Depth_m: 5.6, Age_CE: 2018, Delta_18O_permil: -35.2, Delta_D_permil: -274.1, d_excess: 7.5, SO4_ppb: 92.6, Na_ppb: 14.8 },
      { Depth_m: 12.4, Age_CE: 2004, Delta_18O_permil: -33.9, Delta_D_permil: -264.2, d_excess: 7.0, SO4_ppb: 78.4, Na_ppb: 11.2 },
      { Depth_m: 24.8, Age_CE: 1982, Delta_18O_permil: -36.1, Delta_D_permil: -281.0, d_excess: 7.8, SO4_ppb: 164.2, Na_ppb: 16.5 },
      { Depth_m: 52.0, Age_CE: 1912, Delta_18O_permil: -34.5, Delta_D_permil: -269.0, d_excess: 7.0, SO4_ppb: 81.3, Na_ppb: 10.9 }
    ],
    createdAt: '2026-01-15T09:00:00Z',
    updatedAt: '2026-02-05T12:00:00Z'
  },
  {
    id: 'DATA-002',
    title: 'CTD Oceanographic & Hydroacoustic Krill Survey Dataset (Cruise SOE-13)',
    description: 'Underway oceanographic CTD vertical profiles (temperature, practical salinity, density, dissolved oxygen) and continuous 38/120 kHz split-beam acoustic backscatter measurements across the Sub-Antarctic and Polar Fronts along 57°E.',
    expeditionId: 'exp-southern-ocean',
    expeditionName: '13th Southern Ocean Scientific Expedition',
    region: 'Southern Ocean',
    platform: 'Research Vessel ORV Sagar Nidhi',
    researchDomain: 'Oceanography',
    parameters: ['Temperature', 'Salinity', 'Pressure', 'Dissolved Oxygen', 'Acoustic Volume Backscatter (Sv)', 'Chlorophyll-a'],
    year: 2025,
    authors: ['Dr. Anoop Kumar Tiwari', 'Dr. Rahul Mohan', 'Dr. S. K. Roy'],
    leadInstitution: 'National Centre for Polar and Ocean Research (NCPOR)',
    fileFormat: 'NetCDF',
    fileSize: '42.8 MB',
    r2ObjectKey: 'scientific-resources/datasets/Southern_Ocean_CTD_Acoustic_SOE13.nc',
    license: 'MoES Data Policy 2020 / Open Access',
    accessStatus: 'Available',
    sourceResourceId: 'POL-RES-002',
    relatedExpeditionId: 'exp-southern-ocean',
    relatedPublicationIds: ['PUB-003'],
    downloadCount: 88,
    sampleColumns: ['Cast_ID', 'Latitude_S', 'Longitude_E', 'Depth_dbar', 'Temp_degC', 'Salinity_PSU', 'Oxygen_umol_kg'],
    sampleDataPreview: [
      { Cast_ID: 'CTD-01', Latitude_S: 42.50, Longitude_E: 57.01, Depth_dbar: 10, Temp_degC: 12.4, Salinity_PSU: 34.62, Oxygen_umol_kg: 268.4 },
      { Cast_ID: 'CTD-01', Latitude_S: 42.50, Longitude_E: 57.01, Depth_dbar: 100, Temp_degC: 9.8, Salinity_PSU: 34.45, Oxygen_umol_kg: 245.1 },
      { Cast_ID: 'CTD-05', Latitude_S: 48.00, Longitude_E: 56.98, Depth_dbar: 10, Temp_degC: 4.8, Salinity_PSU: 33.88, Oxygen_umol_kg: 312.0 },
      { Cast_ID: 'CTD-12', Latitude_S: 56.20, Longitude_E: 57.05, Depth_dbar: 10, Temp_degC: 1.1, Salinity_PSU: 33.74, Oxygen_umol_kg: 342.6 },
      { Cast_ID: 'CTD-20', Latitude_S: 64.00, Longitude_E: 57.02, Depth_dbar: 10, Temp_degC: -1.4, Salinity_PSU: 33.91, Oxygen_umol_kg: 358.9 }
    ],
    createdAt: '2025-05-10T11:00:00Z',
    updatedAt: '2025-06-01T15:30:00Z'
  },
  {
    id: 'DATA-003',
    title: 'Kongsfjorden IndARC Mooring Acoustic & Hydrographic Decadal Time-Series',
    description: 'Long-term decadal acoustic Doppler current profiler (ADCP) telemetry, seawater temperature, conductivity, and broadband hydroacoustic ambient noise records logged continuously at 192m depth inside Kongsfjorden fjord, Svalbard (79°N).',
    expeditionId: 'exp-arctic-2025',
    expeditionName: 'Indian Arctic Scientific Campaign (2025)',
    region: 'Arctic',
    platform: 'IndARC Subsurface Mooring (Kongsfjorden)',
    researchDomain: 'Oceanography',
    parameters: ['Water Temperature', 'Salinity', 'Ocean Current Velocity', 'Current Direction', 'Acoustic Sound Pressure Level'],
    year: 2025,
    authors: ['Dr. K. P. Krishnan', 'Dr. Avinash Kumar', 'Dr. N. Anilkumar'],
    leadInstitution: 'National Centre for Polar and Ocean Research (NCPOR)',
    fileFormat: 'NetCDF',
    fileSize: '34.2 MB',
    r2ObjectKey: 'scientific-resources/datasets/Kongsfjorden_IndARC_Decadal_2025.nc',
    license: 'Svalbard Science Forum / NCPOR Open Data Access',
    accessStatus: 'Available',
    sourceResourceId: 'POL-RES-004',
    relatedExpeditionId: 'exp-arctic-2025',
    relatedPublicationIds: ['PUB-002'],
    downloadCount: 167,
    sampleColumns: ['DateTime_UTC', 'Sensor_Depth_m', 'Seawater_Temp_C', 'Practical_Salinity', 'Current_Speed_ms', 'Flow_Direction_deg'],
    sampleDataPreview: [
      { DateTime_UTC: '2025-01-15T00:00:00Z', Sensor_Depth_m: 188.5, Seawater_Temp_C: 2.14, Practical_Salinity: 34.88, Current_Speed_ms: 0.18, Flow_Direction_deg: 142 },
      { DateTime_UTC: '2025-02-15T00:00:00Z', Sensor_Depth_m: 188.5, Seawater_Temp_C: 1.98, Practical_Salinity: 34.85, Current_Speed_ms: 0.22, Flow_Direction_deg: 138 },
      { DateTime_UTC: '2025-03-15T00:00:00Z', Sensor_Depth_m: 188.5, Seawater_Temp_C: 1.82, Practical_Salinity: 34.82, Current_Speed_ms: 0.16, Flow_Direction_deg: 145 },
      { DateTime_UTC: '2025-04-15T00:00:00Z', Sensor_Depth_m: 188.5, Seawater_Temp_C: 2.35, Practical_Salinity: 34.91, Current_Speed_ms: 0.25, Flow_Direction_deg: 135 },
      { DateTime_UTC: '2025-05-15T00:00:00Z', Sensor_Depth_m: 188.5, Seawater_Temp_C: 3.12, Practical_Salinity: 34.98, Current_Speed_ms: 0.31, Flow_Direction_deg: 130 }
    ],
    createdAt: '2025-08-20T10:00:00Z',
    updatedAt: '2025-10-12T14:00:00Z'
  },
  {
    id: 'DATA-004',
    title: 'High-Arctic Aerosol Optical Depth & Black Carbon Mass Concentration Dataset',
    description: 'Ground-based multi-wavelength sun photometer measurements (340–1020 nm) and continuous 7-wavelength aethalometer black carbon absorption spectra recorded at Gruvebadet Atmospheric Laboratory and Himadri Station in Ny-Ålesund, Svalbard.',
    expeditionId: 'exp-arctic-2025',
    expeditionName: 'Indian Arctic Scientific Campaign (2025)',
    region: 'Arctic',
    platform: 'Himadri Research Station / Gruvebadet Lab',
    researchDomain: 'Atmospheric Science',
    parameters: ['Aerosol Optical Depth (AOD)', 'Black Carbon Mass (eBC)', 'Angstrom Exponent', 'Solar Irradiance (Direct & Diffuse)'],
    year: 2024,
    authors: ['Dr. K. P. Krishnan', 'Dr. Shailesh Kumar', 'Dr. Thamban Meloth'],
    leadInstitution: 'NCPOR / Ministry of Earth Sciences',
    fileFormat: 'CSV',
    fileSize: '12.6 MB',
    r2ObjectKey: 'scientific-resources/datasets/Himadri_Aerosol_Optical_Depth_2024.csv',
    license: 'Open Access under WMO GAW Programme',
    accessStatus: 'Available',
    sourceResourceId: 'POL-RES-005',
    relatedExpeditionId: 'exp-arctic-2025',
    relatedPublicationIds: ['PUB-004'],
    downloadCount: 95,
    sampleColumns: ['Timestamp_UTC', 'AOD_500nm', 'Angstrom_440_870', 'BC_concentration_ng_m3', 'Relative_Humidity_pct'],
    sampleDataPreview: [
      { Timestamp_UTC: '2024-04-10T12:00:00Z', AOD_500nm: 0.142, Angstrom_440_870: 1.62, BC_concentration_ng_m3: 48.2, Relative_Humidity_pct: 68 },
      { Timestamp_UTC: '2024-04-18T12:00:00Z', AOD_500nm: 0.228, Angstrom_440_870: 1.74, BC_concentration_ng_m3: 112.5, Relative_Humidity_pct: 62 },
      { Timestamp_UTC: '2024-05-02T12:00:00Z', AOD_500nm: 0.089, Angstrom_440_870: 1.45, BC_concentration_ng_m3: 24.1, Relative_Humidity_pct: 74 },
      { Timestamp_UTC: '2024-06-15T12:00:00Z', AOD_500nm: 0.042, Angstrom_440_870: 1.38, BC_concentration_ng_m3: 8.6, Relative_Humidity_pct: 81 },
      { Timestamp_UTC: '2024-07-20T12:00:00Z', AOD_500nm: 0.038, Angstrom_440_870: 1.32, BC_concentration_ng_m3: 6.4, Relative_Humidity_pct: 85 }
    ],
    createdAt: '2024-10-01T08:00:00Z',
    updatedAt: '2024-11-15T16:00:00Z'
  },
  {
    id: 'DATA-005',
    title: 'Maitri Meteorological Tower & Boundary Layer Micro-Climate Dataset',
    description: 'Continuous 10-meter meteorological mast telemetry recording sonic anemometer 3D wind turbulence, sensible heat flux, air temperature, relative humidity, and barometric pressure at Schirmacher Oasis, East Antarctica.',
    expeditionId: 'exp-isea-44',
    expeditionName: '44th Indian Scientific Expedition to Antarctica',
    region: 'Antarctica',
    platform: 'Maitri Station (Schirmacher Oasis)',
    researchDomain: 'Atmospheric Science',
    parameters: ['Wind Speed', 'Wind Direction', 'Sonic Temperature', 'Sensible Heat Flux', 'Barometric Pressure', 'Solar Radiation'],
    year: 2025,
    authors: ['Dr. Rahul Mohan', 'Er. Rajesh Varma'],
    leadInstitution: 'NCPOR / India Meteorological Department (IMD)',
    fileFormat: 'CSV',
    fileSize: '18.4 MB',
    r2ObjectKey: 'scientific-resources/datasets/Maitri_MicroMet_Boundary_Layer_2025.csv',
    license: 'Restricted / Prior Institutional Approval Required',
    accessStatus: 'Restricted',
    sourceResourceId: 'POL-RES-003',
    relatedExpeditionId: 'exp-isea-44',
    downloadCount: 38,
    sampleColumns: ['DateTime_UTC', 'WindSpeed_ms', 'WindDir_deg', 'AirTemp_C', 'Pressure_hPa', 'RH_pct'],
    sampleDataPreview: [
      { DateTime_UTC: '2025-06-01T00:00:00Z', WindSpeed_ms: 14.2, WindDir_deg: 165, AirTemp_C: -24.8, Pressure_hPa: 984.2, RH_pct: 54 },
      { DateTime_UTC: '2025-06-01T06:00:00Z', WindSpeed_ms: 22.8, WindDir_deg: 172, AirTemp_C: -28.1, Pressure_hPa: 978.4, RH_pct: 48 },
      { DateTime_UTC: '2025-06-01T12:00:00Z', WindSpeed_ms: 31.4, WindDir_deg: 170, AirTemp_C: -31.6, Pressure_hPa: 971.0, RH_pct: 42 },
      { DateTime_UTC: '2025-06-01T18:00:00Z', WindSpeed_ms: 26.5, WindDir_deg: 168, AirTemp_C: -29.4, Pressure_hPa: 974.5, RH_pct: 46 },
      { DateTime_UTC: '2025-06-02T00:00:00Z', WindSpeed_ms: 16.0, WindDir_deg: 162, AirTemp_C: -25.2, Pressure_hPa: 982.1, RH_pct: 52 }
    ],
    createdAt: '2025-07-15T09:30:00Z',
    updatedAt: '2025-09-01T11:00:00Z'
  }
];

// ==========================================
// 2. OFFICIAL EXPEDITION REPORTS ARCHIVE
// ==========================================
export const DEFAULT_EXPEDITION_REPORTS: ExpeditionReport[] = [
  {
    id: 'EXP-REP-001',
    officialTitle: '44th Indian Scientific Expedition to Antarctica: Interim Glaciological & Environmental Report',
    expeditionId: 'exp-isea-44',
    expeditionName: '44th Indian Scientific Expedition to Antarctica',
    region: 'Antarctica',
    year: 2026,
    authors: ['Dr. Rahul Mohan', 'Dr. Shailendra Saini', 'Er. Rajesh Varma'],
    institution: 'National Centre for Polar and Ocean Research (NCPOR), MoES',
    summary: 'Comprehensive scientific documentation of the 44th ISEA field season, reporting on the successful 180m ice core drilling at Princess Elizabeth Land, autonomous AWS deployment, and environmental audit of Bharati Station under the Madrid Protocol.',
    researchDomain: 'Glaciology',
    platform: 'Bharati Station & Maitri Station',
    reportType: 'Glaciological Field Report',
    fileType: 'PDF',
    fileSize: '14.8 MB',
    r2ObjectKey: 'scientific-resources/reports/Antarctic_Ice_Core_Report_2026.pdf',
    availability: 'Available',
    sourceResourceId: 'POL-RES-001',
    relatedDatasetIds: ['DATA-001', 'DATA-005'],
    relatedPublicationIds: ['PUB-001'],
    relatedMediaIds: ['med-01', 'med-06'],
    downloadCount: 215,
    toc: [
      '1. Executive Summary & National Mandate',
      '2. Logistics, Passage, and Staging via Cape Town',
      '3. Ice Core Drilling Operations on Princess Elizabeth Land',
      '4. Stratigraphic Logging, Core Packaging & Cold-Chain Custody',
      '5. Station Life Support & Renewable Cogeneration Audit',
      '6. Environmental Protocol (Madrid Protocol) Compliance'
    ],
    createdAt: '2026-02-01T14:20:00Z'
  },
  {
    id: 'EXP-REP-002',
    officialTitle: '13th Southern Ocean Scientific Expedition (SOE-13): Physical Oceanography & Krill Survey Cruise Report',
    expeditionId: 'exp-southern-ocean',
    expeditionName: '13th Southern Ocean Scientific Expedition',
    region: 'Southern Ocean',
    year: 2025,
    authors: ['Dr. Anoop Kumar Tiwari', 'Dr. Rahul Mohan', 'Dr. S. K. Roy'],
    institution: 'National Centre for Polar and Ocean Research (NCPOR), MoES',
    summary: 'Technical and scientific cruise report describing 28 deep-water hydrographic stations occupied along 57°E from 40°S to 64°S aboard ORV Sagar Nidhi. Details hydroacoustic estimation of Antarctic krill biomass and biogeochemical carbon fluxes.',
    researchDomain: 'Oceanography',
    platform: 'Research Vessel ORV Sagar Nidhi',
    reportType: 'Cruise Technical Summary',
    fileType: 'PDF',
    fileSize: '18.2 MB',
    r2ObjectKey: 'scientific-resources/reports/Southern_Ocean_Cruise_Report_SOE13.pdf',
    availability: 'Available',
    sourceResourceId: 'POL-RES-002',
    relatedDatasetIds: ['DATA-002'],
    relatedPublicationIds: ['PUB-003'],
    relatedMediaIds: ['med-05'],
    downloadCount: 174,
    toc: [
      '1. Cruise Track, Personnel, and Vessel Specifications',
      '2. CTD Profiling & Deep Water Rosette Hydrochemistry',
      '3. Hydroacoustic Echosounder Calibration & Biomass Calculations',
      '4. Particulate Organic Carbon (POC) and Nutrient Fluxes',
      '5. Underway Meteorological Observations & Data Archival'
    ],
    createdAt: '2025-05-15T10:00:00Z'
  },
  {
    id: 'EXP-REP-003',
    officialTitle: 'Indian Arctic Scientific Campaign (2025): Kongsfjorden Marine Observatory & IndARC Servicing Dossier',
    expeditionId: 'exp-arctic-2025',
    expeditionName: 'Indian Arctic Scientific Campaign (2025)',
    region: 'Arctic',
    year: 2025,
    authors: ['Dr. K. P. Krishnan', 'Dr. Avinash Kumar', 'Dr. N. Anilkumar'],
    institution: 'National Centre for Polar and Ocean Research (NCPOR)',
    summary: 'Annual field campaign report detailing the retrieval, recalibration, and redeployment of India\'s IndARC subsurface mooring in Kongsfjorden at 79°N, alongside atmospheric optical depth sampling at Himadri Station in Ny-Ålesund.',
    researchDomain: 'Oceanography',
    platform: 'Himadri Research Station & IndARC Mooring',
    reportType: 'Seasonal Campaign Dossier',
    fileType: 'PDF',
    fileSize: '11.5 MB',
    r2ObjectKey: 'scientific-resources/reports/Arctic_Campaign_Report_2025.pdf',
    availability: 'Available',
    sourceResourceId: 'POL-RES-004',
    relatedDatasetIds: ['DATA-003', 'DATA-004'],
    relatedPublicationIds: ['PUB-002', 'PUB-004'],
    relatedMediaIds: ['med-04', 'med-05'],
    downloadCount: 198,
    toc: [
      '1. Introduction & Arctic Council Collaborative Framework',
      '2. IndARC Mooring Acoustic Recovery Aboard MS Teisten',
      '3. Decadal Physical Oceanographic Time-Series Highlights',
      '4. Gruvebadet Atmospheric Aerosol Measurements',
      '5. Environmental Health and Field Safety Procedures'
    ],
    createdAt: '2025-10-15T12:00:00Z'
  },
  {
    id: 'EXP-REP-004',
    officialTitle: 'Maitri and Bharati Wintering Stations: Annual Infrastructure & Environmental Audit (2024–2025)',
    expeditionId: 'exp-isea-44',
    expeditionName: '44th Indian Scientific Expedition to Antarctica',
    region: 'Antarctica',
    year: 2025,
    authors: ['Er. Rajesh Varma', 'Dr. Thamban Meloth', 'Lt. Col. Sanjeev Rawat'],
    institution: 'NCPOR / Indian Army Corps of Engineers',
    summary: 'Engineering dossier documenting winter life support operations, greywater bioreactor efficiency, combined heat and power (CHP) cogeneration, and waste repatriation metrics for India\'s year-round Antarctic stations.',
    researchDomain: 'Polar Technology & Logistics',
    platform: 'Maitri Station & Bharati Station',
    reportType: 'Annual Scientific Report',
    fileType: 'PDF',
    fileSize: '16.0 MB',
    r2ObjectKey: 'scientific-resources/reports/Antarctic_Infrastructure_Audit_2025.pdf',
    availability: 'Authorized Access',
    sourceResourceId: 'POL-RES-003',
    relatedDatasetIds: ['DATA-005'],
    relatedPublicationIds: [],
    relatedMediaIds: ['med-02', 'med-03'],
    downloadCount: 64,
    toc: [
      '1. Overview of Station Facilities and Habitation Modules',
      '2. Waste Heat Recovery & Diesel Cogeneration Efficiencies',
      '3. Water Production, Filtration, and Bio-Digestive Waste Systems',
      '4. Satellite Telemetry Network & Ground Station Operations',
      '5. Waste Repatriation Manifest under the Madrid Protocol'
    ],
    createdAt: '2025-08-01T09:00:00Z'
  }
];

// ==========================================
// 3. SCIENTIFIC PUBLICATIONS REPOSITORY
// ==========================================
export const DEFAULT_PUBLICATIONS: Publication[] = [
  {
    id: 'PUB-001',
    title: 'A 1,200-year high-resolution ice core isotopic proxy record from Princess Elizabeth Land, East Antarctica',
    authors: ['Dr. Rahul Mohan', 'Dr. Thamban Meloth', 'Dr. Shailendra Saini', 'Dr. M. M. Joshi'],
    year: 2026,
    journal: 'Journal of Glaciology (Cambridge University Press)',
    doi: '10.1017/jog.2026.14',
    abstract: 'We report continuous stable isotope measurements (δ18O and δD) along a 180-meter ice core recovered near Bharati Station, East Antarctica. Chronology established via volcanic sulfate horizons (1815 Tambora and 1883 Krakatoa) provides an unbroken 1,200-year paleoclimate time-series. Results highlight pronounced Medieval Warm Period and Little Ice Age expressions linked to Southern Ocean circumpolar pressure modes and tropical teleconnections.',
    keywords: ['Ice Core', 'Paleoclimate', 'Stable Isotopes', 'Antarctica', 'Princess Elizabeth Land', 'Glaciology'],
    researchDomain: 'Glaciology',
    region: 'Antarctica',
    relatedExpeditionId: 'exp-isea-44',
    relatedExpeditionName: '44th Indian Scientific Expedition to Antarctica',
    relatedDatasetIds: ['DATA-001'],
    sourceResourceId: 'POL-RES-001',
    r2ObjectKey: 'scientific-resources/publications/JGlaciol_2026_Mohan_IceCore.pdf',
    fileAvailable: true,
    fileFormat: 'PDF',
    citation: 'Mohan, R., Meloth, T., Saini, S., & Joshi, M. M. (2026). A 1,200-year high-resolution ice core isotopic proxy record from Princess Elizabeth Land, East Antarctica. Journal of Glaciology, 72(273), 112–126. https://doi.org/10.1017/jog.2026.14',
    accessStatus: 'Open Access',
    downloadCount: 340,
    createdAt: '2026-02-10T12:00:00Z'
  },
  {
    id: 'PUB-002',
    title: 'Decadal hydrographic variability and pulses of Atlantic Water ingress observed via the IndARC subsurface mooring in Kongsfjorden (79°N)',
    authors: ['Dr. K. P. Krishnan', 'Dr. N. Anilkumar', 'Dr. Avinash Kumar', 'Dr. J. P. Thomas'],
    year: 2025,
    journal: 'Frontiers in Marine Science',
    doi: '10.3389/fmars.2025.1092',
    abstract: 'Ten unbroken years of high-frequency hydrographic and acoustic Doppler current profiler telemetry collected by India\'s IndARC mooring at 192 m depth in Kongsfjorden are analyzed. We document a distinct decadal warming anomaly characterized by frequent late-winter pulses of modified Atlantic Water, resulting in sea-ice suppression and altered fjord biogeochemistry.',
    keywords: ['Arctic Ocean', 'IndARC', 'Kongsfjorden', 'Atlantification', 'Mooring', 'Hydrography'],
    researchDomain: 'Oceanography',
    region: 'Arctic',
    relatedExpeditionId: 'exp-arctic-2025',
    relatedExpeditionName: 'Indian Arctic Scientific Campaign (2025)',
    relatedDatasetIds: ['DATA-003'],
    sourceResourceId: 'POL-RES-004',
    r2ObjectKey: 'scientific-resources/publications/FrontMarSci_2025_Krishnan_IndARC.pdf',
    fileAvailable: true,
    fileFormat: 'PDF',
    citation: 'Krishnan, K. P., Anilkumar, N., Kumar, A., & Thomas, J. P. (2025). Decadal hydrographic variability and pulses of Atlantic Water ingress observed via the IndARC subsurface mooring in Kongsfjorden (79°N). Frontiers in Marine Science, 12, 1092. https://doi.org/10.3389/fmars.2025.1092',
    accessStatus: 'Open Access',
    downloadCount: 285,
    createdAt: '2025-09-12T14:30:00Z'
  },
  {
    id: 'PUB-003',
    title: 'Particulate organic carbon sequestration and acoustic backscatter signatures of Euphausia superba along 57°E in the Southern Ocean',
    authors: ['Dr. Anoop Kumar Tiwari', 'Dr. Rahul Mohan', 'Dr. P. Sabu', 'Dr. S. K. Roy'],
    year: 2025,
    journal: 'Deep Sea Research Part II: Topical Studies in Oceanography',
    doi: '10.1016/j.dsr2.2025.105432',
    abstract: 'This study presents multi-frequency (38/120 kHz) acoustic volume backscatter observations integrated with deep particulate organic carbon (POC) sediment trap fluxes collected during the 13th Southern Ocean Scientific Expedition along 57°E. We demonstrate that dense swarms of Antarctic krill markedly enhance biological carbon pump efficiency south of the Polar Front.',
    keywords: ['Southern Ocean', 'Krill', 'Carbon Pump', 'Acoustic Survey', 'Biological Oceanography'],
    researchDomain: 'Marine Biology',
    region: 'Southern Ocean',
    relatedExpeditionId: 'exp-southern-ocean',
    relatedExpeditionName: '13th Southern Ocean Scientific Expedition',
    relatedDatasetIds: ['DATA-002'],
    sourceResourceId: 'POL-RES-002',
    r2ObjectKey: 'scientific-resources/publications/DSR2_2025_Tiwari_KrillCarbon.pdf',
    fileAvailable: true,
    fileFormat: 'PDF',
    citation: 'Tiwari, A. K., Mohan, R., Sabu, P., & Roy, S. K. (2025). Particulate organic carbon sequestration and acoustic backscatter signatures of Euphausia superba along 57°E in the Southern Ocean. Deep Sea Research Part II, 218, 105432. https://doi.org/10.1016/j.dsr2.2025.105432',
    accessStatus: 'Open Access',
    downloadCount: 220,
    createdAt: '2025-07-22T08:15:00Z'
  },
  {
    id: 'PUB-004',
    title: 'Radiative forcing of light-absorbing carbonaceous aerosols during spring Arctic haze episodes at Ny-Ålesund, Svalbard',
    authors: ['Dr. K. P. Krishnan', 'Dr. Shailesh Kumar', 'Dr. Thamban Meloth'],
    year: 2024,
    journal: 'Atmospheric Chemistry and Physics',
    doi: '10.5194/acp-24-8901-2024',
    abstract: 'Multi-year measurements of aerosol optical depth (AOD) and equivalent black carbon (eBC) at Himadri Station and the Gruvebadet Observatory show notable springtime enhancement driven by long-range transport. We quantify surface albedo reductions on snow-covered tundra and evaluate localized warming implications for circum-Arctic atmospheric circulation.',
    keywords: ['Arctic Haze', 'Aerosol Optical Depth', 'Black Carbon', 'Radiative Forcing', 'Himadri'],
    researchDomain: 'Atmospheric Science',
    region: 'Arctic',
    relatedExpeditionId: 'exp-arctic-2025',
    relatedExpeditionName: 'Indian Arctic Scientific Campaign (2025)',
    relatedDatasetIds: ['DATA-004'],
    sourceResourceId: 'POL-RES-005',
    r2ObjectKey: 'scientific-resources/publications/ACP_2024_Krishnan_ArcticAerosols.pdf',
    fileAvailable: true,
    fileFormat: 'PDF',
    citation: 'Krishnan, K. P., Kumar, S., & Meloth, T. (2024). Radiative forcing of light-absorbing carbonaceous aerosols during spring Arctic haze episodes at Ny-Ålesund, Svalbard. Atmospheric Chemistry and Physics, 24(15), 8901–8918. https://doi.org/10.5194/acp-24-8901-2024',
    accessStatus: 'Institutional Access',
    downloadCount: 194,
    createdAt: '2024-11-20T16:00:00Z'
  }
];

// ==========================================
// 4. INSTITUTIONAL ACTIVITIES ARCHIVE
// ==========================================
export const DEFAULT_ACTIVITIES: InstitutionalActivity[] = [
  {
    id: 'ACT-001',
    title: 'National Workshop on Polar Cryospheric Science & Earth System Modeling',
    activityType: 'Workshop',
    date: '2026-02-12',
    location: 'NCPOR Auditorium, Vasco da Gama, Goa',
    shortDescription: 'National technical workshop assembling leading glaciologists, climate modelers, and university researchers to formulate high-resolution cryospheric assimilation modules for the Indian Monsoon prediction system.',
    description: 'Organized under the PACER scheme by the National Centre for Polar and Ocean Research (NCPOR), Ministry of Earth Sciences. The 3-day workshop engaged 85 scientists across 18 universities and IITs, addressing intermediate-depth ice core interpretation, Southern Ocean heat fluxes, and automated telemetry ingestion.',
    organizingInstitution: 'National Centre for Polar and Ocean Research (NCPOR)',
    participatingInstitutions: ['NCPOR', 'IIT Bombay', 'IIT Delhi', 'IISc Bengaluru', 'Wadia Institute of Himalayan Geology', 'IMD'],
    highlights: [
      'Released initial technical guidelines for open access to National Polar Data Center (NPDC) ice-core datasets.',
      'Formulated joint research proposals between NCPOR and Indian academic institutions for the 45th ISEA season.',
      'Demonstrated AI-assisted scientific synthesis workflows for public science outreach.'
    ],
    region: 'Antarctica',
    topic: 'Glaciology',
    year: 2026,
    images: [
      {
        url: 'https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?auto=format&fit=crop&q=80&w=800',
        caption: 'Plenary session on high-latitude cryospheric observations at NCPOR Goa.',
        credit: 'NCPOR Media Cell'
      }
    ],
    relatedResourceIds: ['POL-RES-001'],
    status: 'Approved',
    createdAt: '2026-02-15T10:00:00Z'
  },
  {
    id: 'ACT-002',
    title: 'Ceremonial Flag-Off & Send-Off for the 44th Indian Scientific Expedition to Antarctica',
    activityType: 'Outreach',
    date: '2025-11-18',
    location: 'Ministry of Earth Sciences, Prithvi Bhavan, New Delhi',
    shortDescription: 'Official government flag-off ceremony presided over by Union Minister of Earth Sciences, wishing godspeed to the 48-member Indian expedition contingent heading to Bharati and Maitri stations.',
    description: 'The ceremony marked the embarkation of the 44th ISEA team. Scientists, logistics personnel, and Indian Army engineers were presented with the national tricolour before their flight to Cape Town to board the chartered icebreaker MV Vasiliy Golovnin.',
    organizingInstitution: 'Ministry of Earth Sciences (MoES), Government of India',
    participatingInstitutions: ['MoES', 'NCPOR', 'Indian Army Corps of Engineers', 'Geological Survey of India', 'Survey of India'],
    highlights: [
      'Presentation of the Indian National Flag to Expedition Leader Dr. Shailendra Saini.',
      'Reaffirmation of zero-effluent environmental guidelines under the Indian Antarctic Act, 2022.',
      'Public live broadcast to over 40 schools and educational institutions across India.'
    ],
    region: 'Antarctica',
    topic: 'Polar Technology & Logistics',
    year: 2025,
    images: [
      {
        url: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?auto=format&fit=crop&q=80&w=800',
        caption: '44th ISEA expedition contingent at the ceremonial flag-off in Prithvi Bhavan.',
        credit: 'Press Information Bureau (PIB) / MoES'
      }
    ],
    relatedResourceIds: ['POL-RES-001', 'POL-RES-003'],
    status: 'Approved',
    createdAt: '2025-11-20T14:00:00Z'
  },
  {
    id: 'ACT-003',
    title: 'Indo-Norwegian Bilateral Symposium on High-Arctic Oceanography & Svalbard Research',
    activityType: 'Conference',
    date: '2025-09-08',
    location: 'Tromsø & Ny-Ålesund, Norway',
    shortDescription: 'Bilateral scientific summit commemorating 10 years of continuous IndARC underwater mooring observations and evaluating Atlantification trends in Kongsfjorden.',
    description: 'Jointly convened by NCPOR and the Norwegian Polar Institute (NPI). The conference evaluated continuous acoustic and CTD telemetry from Kongsfjorden, reviewing seasonal water mass exchange and microplastic deposition in high-latitude fjords.',
    organizingInstitution: 'National Centre for Polar and Ocean Research (NCPOR) & Norwegian Polar Institute',
    participatingInstitutions: ['NCPOR', 'Norwegian Polar Institute', 'Kings Bay AS', 'University of Tromsø (UiT)', 'NIO Goa'],
    highlights: [
      'Celebrated 10 years of unbroken deep-water data retrieval from India\'s IndARC mooring.',
      'Formulated joint 2026–2028 Arctic fjord ecological monitoring protocols.',
      'Conducted field visit to the Gruvebadet atmospheric laboratory in Ny-Ålesund.'
    ],
    region: 'Arctic',
    topic: 'Oceanography',
    year: 2025,
    images: [
      {
        url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=800',
        caption: 'Scientific delegates outside Himadri Station in Ny-Ålesund, Svalbard.',
        credit: 'NCPOR Arctic Operations'
      }
    ],
    relatedResourceIds: ['POL-RES-004'],
    status: 'Approved',
    createdAt: '2025-09-15T11:30:00Z'
  },
  {
    id: 'ACT-004',
    title: 'High-Altitude Glacier Acclimatization & Crevasse Rescue Training Camp',
    activityType: 'Training',
    date: '2025-08-22',
    location: 'Mountaineering & Skiing Institute, ITBP Auli, Uttarakhand',
    shortDescription: 'Rigorous 3-week physical conditioning, cold-weather survival, glacier navigation, and crevasse safety course mandatory for all Antarctic and Himalayan expedition members.',
    description: 'Conducted jointly by NCPOR and the Indo-Tibetan Border Police (ITBP). 32 expedition researchers underwent training on technical ice axe arrest, rope team travel, extreme low-temperature medical first response, and crevasse extraction.',
    organizingInstitution: 'Indo-Tibetan Border Police (ITBP) & NCPOR',
    participatingInstitutions: ['ITBP', 'NCPOR', 'AIIMS New Delhi', 'High Altitude Warfare School (HAWS)'],
    highlights: [
      '100% of participants cleared high-altitude fitness and technical glacier handling evaluation.',
      'Comprehensive hypoxia adaptation training up to 4,200m altitude.',
      'Practical drill on emergency bivouac and snow shelter fabrication.'
    ],
    region: 'Himalayas (Third Pole)',
    topic: 'Polar Technology & Logistics',
    year: 2025,
    images: [
      {
        url: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=800',
        caption: 'Scientists practicing rope team crevasse extraction at Auli glacier training area.',
        credit: 'ITBP / NCPOR Training Cell'
      }
    ],
    relatedResourceIds: ['POL-RES-001'],
    status: 'Approved',
    createdAt: '2025-08-28T09:00:00Z'
  },
  {
    id: 'ACT-005',
    title: 'MoES Polar Science Educational Outreach & Ice Core Cold-Vault Tour',
    activityType: 'Exhibition',
    date: '2025-07-14',
    location: 'NCPOR Ice Core Repository (-20°C Vault), Headland Sada, Goa',
    shortDescription: 'National public education initiative inviting top university scholars, high school students, and educators to tour the national cryo-preservation facility housing pristine Antarctic and Himalayan ice cores.',
    description: 'Over 240 students participated in guided laboratory demonstrations exploring cavity ringdown spectrometry, ancient air bubble extraction, and microscopical examination of diatoms from polar seas.',
    organizingInstitution: 'National Centre for Polar and Ocean Research (NCPOR)',
    participatingInstitutions: ['NCPOR', 'Goa University', 'Kendriya Vidyalaya Sangathan', 'BITS Pilani Goa'],
    highlights: [
      'Hands-on interactive workshops explaining ice core paleoclimatology and greenhouse gases.',
      'Guided virtual reality (VR) tour of Bharati Station and Himadri Station.',
      'Distribution of official MoES Polar Science educational kits and student dossiers.'
    ],
    region: 'Antarctica',
    topic: 'Glaciology',
    year: 2025,
    images: [
      {
        url: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80&w=800',
        caption: 'Students observing ice core sections inside the NCPOR analytical laboratory.',
        credit: 'NCPOR Outreach Cell'
      }
    ],
    relatedResourceIds: ['POL-RES-001'],
    status: 'Approved',
    createdAt: '2025-07-18T16:00:00Z'
  },
  {
    id: 'ACT-006',
    title: 'Memorandum of Understanding (MoU) Signing: NCPOR & ISRO Space Applications Centre',
    activityType: 'MoU',
    date: '2025-05-19',
    location: 'Space Applications Centre (ISRO), Ahmedabad',
    shortDescription: 'Strategic institutional agreement on calibrating satellite radar altimeters and synthetic aperture radar (SAR) against in-situ Antarctic sea-ice and Himalayan glacier mass balance measurements.',
    description: 'The MoU establishes an operational pipeline linking ISRO earth observation satellite telemetry with in-situ field instruments at Bharati, Maitri, and Himansh stations to improve cryospheric monitoring accuracy.',
    organizingInstitution: 'NCPOR & Space Applications Centre (ISRO)',
    participatingInstitutions: ['NCPOR', 'SAC-ISRO', 'National Remote Sensing Centre (NRSC)', 'MoES'],
    highlights: [
      'Integration of NISAR and EOS-04 satellite feeds with Himansh and Bharati ground data.',
      'Establishment of joint calibration-validation test sites across the Larsemann Hills.',
      'Dedicated data exchange protocol via the National Polar Data Center (NPDC).'
    ],
    region: 'Antarctica',
    topic: 'Climate Dynamics',
    year: 2025,
    images: [
      {
        url: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&q=80&w=800',
        caption: 'Leadership of NCPOR and SAC-ISRO exchanging the ratified bilateral polar agreement.',
        credit: 'ISRO / NCPOR Directorate'
      }
    ],
    relatedResourceIds: ['POL-RES-001', 'POL-RES-002'],
    status: 'Approved',
    createdAt: '2025-05-22T13:00:00Z'
  },
  {
    id: 'ACT-007',
    title: 'National Polar Science Day & Memorial Public Lecture: "From Poles to Monsoon"',
    activityType: 'Institutional Programme',
    date: '2024-12-05',
    location: 'India International Centre (IIC), New Delhi & Live Broadcast',
    shortDescription: 'Annual commemorative scientific event honouring India\'s pioneering polar researchers and unveiling the latest research linking polar cryospheric change to tropical monsoon security.',
    description: 'Keynote addresses delivered by the Secretary, Ministry of Earth Sciences, alongside veteran expedition leaders. The symposium recognized distinguished polar research contributions and released the annual peer-reviewed polar science brief.',
    organizingInstitution: 'Ministry of Earth Sciences (MoES) & NCPOR',
    participatingInstitutions: ['MoES', 'NCPOR', 'CSIR-NIO', 'Vigyan Prasar', 'Delhi University'],
    highlights: [
      'Presentation of the National Polar Science Lifetime Achievement Awards.',
      'Release of the 2024 National Polar Knowledge Dissemination Report.',
      'Nationwide screening of the documentary "4 Decades on the Frozen Frontier".'
    ],
    region: 'Antarctica',
    topic: 'Climate Dynamics',
    year: 2024,
    images: [
      {
        url: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&q=80&w=800',
        caption: 'Distinguished scientists and students gathered for National Polar Science Day.',
        credit: 'PIB New Delhi'
      }
    ],
    relatedResourceIds: ['POL-RES-001', 'POL-RES-004'],
    status: 'Approved',
    createdAt: '2024-12-08T10:00:00Z'
  }
];

const STORAGE_KEYS = {
  USERS: 'pkp_users_v7',
  CURRENT_USER: 'pkp_current_user_v7',
  RESOURCES: 'pkp_resources_v7',
  DRAFTS: 'pkp_drafts_v7',
  EXPEDITIONS: 'pkp_expeditions_v7',
  ACTIVITY: 'pkp_activity_v7',
  MEDIA: 'pkp_media_v7',
  BOOKMARKS: 'pkp_bookmarks_v7',
  DATASETS: 'pkp_datasets_v7',
  EXPEDITION_REPORTS: 'pkp_reports_v7',
  PUBLICATIONS: 'pkp_publications_v7',
  INSTITUTIONAL_ACTIVITIES: 'pkp_activities_v7',
  MISSION_PROGRESS: 'pkp_missions_v8'
};

type Listener = () => void;
const listeners = new Set<Listener>();

function notify() {
  listeners.forEach((cb) => {
    try {
      cb();
    } catch (e) {
      console.error(e);
    }
  });
}

export function subscribeToStore(cb: Listener): () => void {
  listeners.add(cb);
  return () => {
    listeners.delete(cb);
  };
}

function loadFromStorage<T>(key: string, fallback: T): T {
  try {
    const val = localStorage.getItem(key);
    if (!val) return fallback;
    return JSON.parse(val) as T;
  } catch (err) {
    console.warn(`Failed reading ${key} from storage:`, err);
    return fallback;
  }
}

function saveToStorage<T>(key: string, data: T) {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (err) {
    console.warn(`Failed writing ${key} to storage:`, err);
  }
}

class PolarStore {
  private users: User[];
  private currentUser: User;
  private resources: Resource[];
  private drafts: ContentDraft[];
  private expeditions: Expedition[];
  private activities: ActivityLog[];
  private media: MediaItem[];
  private bookmarks: string[];
  private datasets: Dataset[];
  private expeditionReports: ExpeditionReport[];
  private publications: Publication[];
  private institutionalActivities: InstitutionalActivity[];
  private missionProgresses: Record<string, ScientistMissionProgress>;

  constructor() {
    this.users = loadFromStorage(STORAGE_KEYS.USERS, DEFAULT_USERS);
    this.currentUser = loadFromStorage(STORAGE_KEYS.CURRENT_USER, DEFAULT_USERS[0]);
    this.resources = loadFromStorage(STORAGE_KEYS.RESOURCES, DEFAULT_RESOURCES);
    this.drafts = loadFromStorage(STORAGE_KEYS.DRAFTS, DEFAULT_DRAFTS);
    this.expeditions = loadFromStorage(STORAGE_KEYS.EXPEDITIONS, DEFAULT_EXPEDITIONS);
    this.activities = loadFromStorage(STORAGE_KEYS.ACTIVITY, DEFAULT_ACTIVITY_LOGS);
    this.media = loadFromStorage(STORAGE_KEYS.MEDIA, DEFAULT_MEDIA_ITEMS);
    this.bookmarks = loadFromStorage(STORAGE_KEYS.BOOKMARKS, ['draft-01', 'draft-03']);
    this.datasets = loadFromStorage(STORAGE_KEYS.DATASETS, DEFAULT_DATASETS);
    this.expeditionReports = loadFromStorage(STORAGE_KEYS.EXPEDITION_REPORTS, DEFAULT_EXPEDITION_REPORTS);
    this.publications = loadFromStorage(STORAGE_KEYS.PUBLICATIONS, DEFAULT_PUBLICATIONS);
    this.institutionalActivities = loadFromStorage(STORAGE_KEYS.INSTITUTIONAL_ACTIVITIES, DEFAULT_ACTIVITIES);

    const defaultMissions: Record<string, ScientistMissionProgress> = {
      'usr-contributor-01': createDefaultScientistMission('usr-contributor-01', 'Dr. Rahul Mohan', 'exp-isea-44'),
      'usr-contributor-02': createDefaultScientistMission('usr-contributor-02', 'Dr. K. P. Krishnan', 'exp-arctic-2025')
    };
    this.missionProgresses = loadFromStorage(STORAGE_KEYS.MISSION_PROGRESS, defaultMissions);
  }

  public subscribeToStore(cb: Listener): () => void {
    return subscribeToStore(cb);
  }

  public resetAllToDefault() {
    this.users = [...DEFAULT_USERS];
    this.currentUser = DEFAULT_USERS[0];
    this.resources = [...DEFAULT_RESOURCES];
    this.drafts = [...DEFAULT_DRAFTS];
    this.expeditions = [...DEFAULT_EXPEDITIONS];
    this.activities = [...DEFAULT_ACTIVITY_LOGS];
    this.media = [...DEFAULT_MEDIA_ITEMS];
    this.bookmarks = ['draft-01', 'draft-03'];
    this.datasets = [...DEFAULT_DATASETS];
    this.expeditionReports = [...DEFAULT_EXPEDITION_REPORTS];
    this.publications = [...DEFAULT_PUBLICATIONS];
    this.institutionalActivities = [...DEFAULT_ACTIVITIES];

    saveToStorage(STORAGE_KEYS.USERS, this.users);
    saveToStorage(STORAGE_KEYS.CURRENT_USER, this.currentUser);
    saveToStorage(STORAGE_KEYS.RESOURCES, this.resources);
    saveToStorage(STORAGE_KEYS.DRAFTS, this.drafts);
    saveToStorage(STORAGE_KEYS.EXPEDITIONS, this.expeditions);
    saveToStorage(STORAGE_KEYS.ACTIVITY, this.activities);
    saveToStorage(STORAGE_KEYS.MEDIA, this.media);
    saveToStorage(STORAGE_KEYS.BOOKMARKS, this.bookmarks);
    saveToStorage(STORAGE_KEYS.DATASETS, this.datasets);
    saveToStorage(STORAGE_KEYS.EXPEDITION_REPORTS, this.expeditionReports);
    saveToStorage(STORAGE_KEYS.PUBLICATIONS, this.publications);
    saveToStorage(STORAGE_KEYS.INSTITUTIONAL_ACTIVITIES, this.institutionalActivities);

    notify();
  }

  // Bookmarks
  public getBookmarks(): string[] {
    return [...this.bookmarks];
  }

  public isBookmarked(contentId: string): boolean {
    return this.bookmarks.includes(contentId);
  }

  public toggleBookmark(contentId: string): boolean {
    const idx = this.bookmarks.indexOf(contentId);
    let isNowBookmarked = false;
    if (idx !== -1) {
      this.bookmarks.splice(idx, 1);
      isNowBookmarked = false;
    } else {
      this.bookmarks.unshift(contentId);
      isNowBookmarked = true;
    }
    saveToStorage(STORAGE_KEYS.BOOKMARKS, this.bookmarks);
    notify();
    return isNowBookmarked;
  }

  // Users & Auth
  public getUsers(): User[] {
    return [...this.users];
  }

  public getCurrentUser(): User {
    return this.currentUser;
  }

  public setCurrentUser(user: User) {
    this.currentUser = user;
    saveToStorage(STORAGE_KEYS.CURRENT_USER, this.currentUser);
    notify();
  }

  public switchRole(role: UserRole) {
    const found = this.users.find((u) => u.role === role);
    if (found) {
      this.setCurrentUser(found);
    }
  }

  public addContributor(newContributor: Omit<User, 'id' | 'createdAt'>): User {
    const created: User = {
      ...newContributor,
      id: `usr-contrib-${Date.now()}`,
      createdAt: new Date().toISOString()
    };
    this.users.push(created);
    saveToStorage(STORAGE_KEYS.USERS, this.users);
    this.logActivity(
      'ADMINISTRATOR',
      'ADD_CONTRIBUTOR',
      created.id,
      created.name,
      `Registered contributor: ${created.name} (${created.department})`
    );
    notify();
    return created;
  }

  public toggleUserStatus(userId: string) {
    const idx = this.users.findIndex((u) => u.id === userId);
    if (idx !== -1) {
      this.users[idx].status = this.users[idx].status === 'Active' ? 'Inactive' : 'Active';
      saveToStorage(STORAGE_KEYS.USERS, this.users);
      this.logActivity(
        'ADMINISTRATOR',
        'UPDATE_USER_STATUS',
        this.users[idx].id,
        this.users[idx].name,
        `Status set to ${this.users[idx].status}`
      );
      notify();
    }
  }

  public updateUser(userId: string, updates: Partial<User>): User | undefined {
    const idx = this.users.findIndex((u) => u.id === userId);
    if (idx === -1) return undefined;
    this.users[idx] = {
      ...this.users[idx],
      ...updates
    };
    saveToStorage(STORAGE_KEYS.USERS, this.users);
    this.logActivity(
      'ADMINISTRATOR',
      'UPDATE_USER',
      this.users[idx].id,
      this.users[idx].name,
      `Updated user profile: ${this.users[idx].name}`
    );
    notify();
    return this.users[idx];
  }

  public deleteUser(userId: string): boolean {
    const idx = this.users.findIndex((u) => u.id === userId);
    if (idx === -1) return false;
    const removed = this.users.splice(idx, 1)[0];
    saveToStorage(STORAGE_KEYS.USERS, this.users);
    this.logActivity(
      'ADMINISTRATOR',
      'DELETE_USER',
      removed.id,
      removed.name,
      `De-registered user account: ${removed.name}`
    );
    notify();
    return true;
  }

  // ==========================================
  // SCIENTIST MISSION LIFECYCLE & PROGRESSION
  // ==========================================
  public getScientistMission(userId: string): ScientistMissionProgress {
    let mission = this.missionProgresses[userId];
    if (!mission) {
      const user = this.users.find((u) => u.id === userId);
      const name = user ? user.name : 'Polar Researcher';
      const expId = userId === 'usr-contributor-02' ? 'exp-arctic-2025' : 'exp-isea-44';
      mission = createDefaultScientistMission(userId, name, expId);
      this.missionProgresses[userId] = mission;
      saveToStorage(STORAGE_KEYS.MISSION_PROGRESS, this.missionProgresses);
    }
    return mission;
  }

  public updateScientistMission(
    userId: string,
    updates: Partial<ScientistMissionProgress>
  ): ScientistMissionProgress {
    const current = this.getScientistMission(userId);
    const updated: ScientistMissionProgress = {
      ...current,
      ...updates,
      updatedAt: new Date().toISOString()
    };

    // Auto-recalculate progress percentage based on phase statuses
    const completedCount = updated.phases.filter((p) => p.status === 'completed').length;
    const inProgressCount = updated.phases.filter((p) => p.status === 'in_progress').length;
    const totalPhases = updated.phases.length || 6;
    updated.overallPercent = Math.min(
      100,
      Math.round(((completedCount + inProgressCount * 0.5) / totalPhases) * 100)
    );

    // Current active phase
    const activePhase =
      updated.phases.find((p) => p.status === 'in_progress') ||
      updated.phases.find((p) => p.status === 'upcoming') ||
      updated.phases[updated.phases.length - 1];
    if (activePhase) {
      updated.currentPhase = `Phase ${activePhase.phaseNumber}: ${activePhase.phase}`;
    }

    this.missionProgresses[userId] = updated;
    saveToStorage(STORAGE_KEYS.MISSION_PROGRESS, this.missionProgresses);

    // Also sync to user object if found
    const uIdx = this.users.findIndex((u) => u.id === userId);
    if (uIdx !== -1) {
      this.users[uIdx].missionProgress = updated;
      saveToStorage(STORAGE_KEYS.USERS, this.users);
    }

    this.logActivity(
      'CONTENT_CONTRIBUTOR',
      'UPDATE_MISSION_PROGRESS',
      updated.id,
      updated.expeditionName,
      `Updated expedition phase progression for ${updated.userName} (${updated.overallPercent}% completed)`
    );

    notify();
    return updated;
  }

  public updateScientistPhaseStatus(
    userId: string,
    phaseNumber: number,
    status: 'completed' | 'in_progress' | 'upcoming',
    notes?: string,
    date?: string
  ): ScientistMissionProgress {
    const mission = this.getScientistMission(userId);
    const newPhases = mission.phases.map((p) => {
      if (p.phaseNumber === phaseNumber) {
        return {
          ...p,
          status,
          ...(notes !== undefined ? { fieldNotes: notes } : {}),
          ...(date !== undefined ? { date } : {}),
          ...(status === 'completed' && !p.completedAt ? { completedAt: new Date().toISOString() } : {})
        };
      }
      return p;
    });

    return this.updateScientistMission(userId, { phases: newPhases });
  }

  public advanceScientistMissionPhase(userId: string): ScientistMissionProgress {
    const mission = this.getScientistMission(userId);
    const inProgIdx = mission.phases.findIndex((p) => p.status === 'in_progress');

    if (inProgIdx !== -1) {
      const newPhases = [...mission.phases];
      newPhases[inProgIdx] = {
        ...newPhases[inProgIdx],
        status: 'completed',
        completedAt: new Date().toISOString()
      };
      if (inProgIdx + 1 < newPhases.length) {
        newPhases[inProgIdx + 1] = {
          ...newPhases[inProgIdx + 1],
          status: 'in_progress'
        };
      }
      return this.updateScientistMission(userId, { phases: newPhases });
    } else {
      // Find first upcoming phase
      const upcomingIdx = mission.phases.findIndex((p) => p.status === 'upcoming');
      if (upcomingIdx !== -1) {
        const newPhases = [...mission.phases];
        newPhases[upcomingIdx] = {
          ...newPhases[upcomingIdx],
          status: 'in_progress'
        };
        return this.updateScientistMission(userId, { phases: newPhases });
      }
    }
    return mission;
  }

  public setScientistActiveExpedition(
    userId: string,
    expeditionId: string,
    roleTitle?: string,
    stationName?: string
  ): ScientistMissionProgress {
    const exp = this.expeditions.find((e) => e.id === expeditionId);
    const expName = exp ? exp.name : 'Indian Polar Scientific Expedition';
    const user = this.users.find((u) => u.id === userId);
    const userName = user ? user.name : 'Polar Researcher';

    const newMission = createDefaultScientistMission(userId, userName, expeditionId);
    if (roleTitle) newMission.roleInMission = roleTitle;
    if (stationName) newMission.baseStation = stationName;

    return this.updateScientistMission(userId, newMission);
  }

  // ==========================================
  // SCIENTIFIC REPOSITORY (Resources)
  // ==========================================
  public getResources(): Resource[] {
    return [...this.resources];
  }

  public getResourceById(id: string): Resource | undefined {
    // Supports both POL-RES-001 and legacy res-01 IDs
    return this.resources.find(
      (r) =>
        r.id === id ||
        (id === 'res-01' && r.id === 'POL-RES-001') ||
        (id === 'res-02' && r.id === 'POL-RES-002') ||
        (id === 'res-03' && r.id === 'POL-RES-003') ||
        (id === 'res-04' && r.id === 'POL-RES-004') ||
        (id === 'res-05' && r.id === 'POL-RES-005') ||
        (id === 'res-06' && r.id === 'POL-RES-006')
    );
  }

  public getResourcesByContributor(contributorId: string): Resource[] {
    return this.resources.filter((r) => r.uploadedBy === contributorId);
  }

  public addResource(
    resourceData: Omit<Resource, 'id' | 'createdAt' | 'updatedAt' | 'status'> & {
      status?: ResourceStatus;
    }
  ): Resource {
    // Generate clean institutional repository ID, e.g. POL-RES-00124
    const seq = String(this.resources.length + 1).padStart(3, '0');
    const id = `POL-RES-${seq}`;
    const now = new Date().toISOString();

    const created: Resource = {
      ...resourceData,
      id,
      status: 'STORED', // Explicitly STORED as independent source resource
      createdAt: now,
      updatedAt: now
    };

    this.resources.unshift(created);
    saveToStorage(STORAGE_KEYS.RESOURCES, this.resources);

    this.logActivity(
      this.currentUser.role,
      'STORE_RESOURCE',
      created.id,
      created.title,
      `Preserved original scientific resource with ${created.files.length} attached file(s) in repository.`
    );

    notify();
    return created;
  }

  public updateResource(id: string, updates: Partial<Resource>): Resource | undefined {
    const idx = this.resources.findIndex((r) => r.id === id);
    if (idx === -1) return undefined;

    this.resources[idx] = {
      ...this.resources[idx],
      ...updates,
      updatedAt: new Date().toISOString()
    };

    saveToStorage(STORAGE_KEYS.RESOURCES, this.resources);
    notify();
    return this.resources[idx];
  }

  // ==========================================
  // OUTREACH CONTENT DRAFTS (Derived from Resources)
  // ==========================================
  public getDrafts(): ContentDraft[] {
    return [...this.drafts];
  }

  public getDraftById(id: string): ContentDraft | undefined {
    return this.drafts.find((d) => d.id === id);
  }

  public getDraftsByResourceId(resourceId: string): ContentDraft[] {
    return this.drafts.filter((d) => d.resourceId === resourceId);
  }

  public addDraft(draft: Omit<ContentDraft, 'id' | 'createdAt' | 'updatedAt'>): ContentDraft {
    const id = `CNT-${String(this.drafts.length + 1).padStart(3, '0')}`;
    const now = new Date().toISOString();

    const sourceRes = this.getResourceById(draft.resourceId);

    const created: ContentDraft = {
      ...draft,
      id,
      resourceTitle: sourceRes?.title || draft.resourceTitle,
      createdAt: now,
      updatedAt: now
    };

    this.drafts.unshift(created);
    saveToStorage(STORAGE_KEYS.DRAFTS, this.drafts);

    this.logActivity(
      this.currentUser.role,
      'CREATE_DRAFT',
      created.id,
      created.title,
      `Generated AI-assisted ${created.contentType} from source resource ${created.resourceId}.`
    );

    notify();
    return created;
  }

  public updateDraft(
    id: string,
    updates: Partial<ContentDraft>,
    editorName?: string
  ): ContentDraft | undefined {
    const idx = this.drafts.findIndex((d) => d.id === id);
    if (idx === -1) return undefined;

    const existing = this.drafts[idx];
    const isPostApprovalState =
      existing.status === 'APPROVED' ||
      existing.status === 'READY_TO_PUBLISH' ||
      existing.status === 'PUBLISHED';

    // Check if substantive content was edited
    const contentChanged =
      (updates.title !== undefined && updates.title !== existing.title) ||
      (updates.summary !== undefined && updates.summary !== existing.summary) ||
      (updates.body !== undefined && updates.body !== existing.body) ||
      (updates.socialMediaText !== undefined && updates.socialMediaText !== existing.socialMediaText) ||
      (updates.imageCaption !== undefined && updates.imageCaption !== existing.imageCaption);

    // If an approved or published item is edited without explicit admin status override:
    // Change status back to "REQUIRES_REAPPROVAL" and increment version (v1 -> v2)
    let nextStatus = updates.status || existing.status;
    let nextVersion = updates.version || existing.version || 'v1';

    if (isPostApprovalState && contentChanged && !updates.status) {
      nextStatus = 'REQUIRES_REAPPROVAL';
      const curNum = parseInt(nextVersion.replace('v', ''), 10) || 1;
      nextVersion = `v${curNum + 1}`;
      updates.isAdminApproved = false;

      this.logActivity(
        this.currentUser.role,
        'CONTENT_EDITED_AFTER_APPROVAL',
        existing.id,
        updates.title || existing.title,
        `Content edited after approval by ${editorName || this.currentUser.name}. Bumped version to ${nextVersion}.`
      );
      this.logActivity(
        this.currentUser.role,
        'REAPPROVAL_REQUIRED',
        existing.id,
        updates.title || existing.title,
        `Governance trigger: Content requires re-approval before it can be published.`
      );
    }

    this.drafts[idx] = {
      ...existing,
      ...updates,
      version: nextVersion,
      status: nextStatus,
      lastEditedBy: editorName || updates.lastEditedBy || this.currentUser.name,
      lastEditedAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    saveToStorage(STORAGE_KEYS.DRAFTS, this.drafts);
    notify();
    return this.drafts[idx];
  }

  // ==========================================
  // ADMIN REVIEW & GOVERNANCE ACTIONS
  // "Approve ≠ Publish Everywhere"
  // "Approve → Ready to Publish → Select Platform → Final Post"
  // ==========================================

  /**
   * Approves a draft after expert review.
   * State changes strictly to "READY_TO_PUBLISH".
   * Publication is a separate deliberate final action performed in the Publishing Center.
   */
  public approveDraft(
    draftId: string,
    reviewerId: string,
    reviewerName: string,
    comments?: string
  ): ContentDraft | undefined {
    const draft = this.getDraftById(draftId);
    if (!draft) return undefined;

    const now = new Date().toISOString();
    const updated = this.updateDraft(draftId, {
      status: 'READY_TO_PUBLISH',
      reviewerId,
      reviewerName,
      reviewerComments:
        comments || 'Approved for official institutional publication after expert verification.',
      approvedBy: reviewerName,
      approvedAt: now,
      isAdminApproved: true,
      isScientistVerified: true
    });

    if (updated) {
      this.logActivity(
        'ADMINISTRATOR',
        'CONTENT_APPROVED',
        updated.id,
        updated.title,
        `Scientist-verified draft approved by ${reviewerName}.`
      );
      this.logActivity(
        'ADMINISTRATOR',
        'CONTENT_READY_TO_PUBLISH',
        updated.id,
        updated.title,
        `State changed to Ready to Publish. Content moved to Publishing Center.`
      );
    }

    return updated;
  }

  /**
   * Backward compatibility alias for approveDraft
   */
  public approveAndPublishDraft(
    draftId: string,
    reviewerId: string,
    reviewerName: string,
    comments?: string
  ): ContentDraft | undefined {
    return this.approveDraft(draftId, reviewerId, reviewerName, comments);
  }

  /**
   * Final Publication Action from the Admin Publishing Center.
   * Directs content to Portal, Social Media platform, or Media Gallery.
   */
  public publishDraft(
    draftId: string,
    destination: 'Portal' | 'X / Twitter' | 'LinkedIn' | 'Facebook' | 'Instagram' | 'Media Catalogue',
    publisherId: string,
    publisherName: string,
    options?: {
      publicationId?: string;
      customRemarks?: string;
    }
  ): ContentDraft | undefined {
    const draft = this.getDraftById(draftId);
    if (!draft) return undefined;

    const now = new Date().toISOString();
    const pubId = options?.publicationId || `PUB-${Date.now().toString(36).toUpperCase()}`;

    const updated = this.updateDraft(draftId, {
      status: 'PUBLISHED',
      publicationDestination: destination,
      publishedAt: now,
      publishedBy: publisherName,
      publicationId: pubId
    });

    // If it's a Media Caption or has attached media, make that media item publicly visible in the public media catalogue
    if (draft.contentType === 'Media Caption' || draft.attachedMediaUrls?.length) {
      const mediaUrl =
        draft.attachedMediaUrls?.[0] ||
        'https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?auto=format&fit=crop&q=80&w=1200';

      const existingMediaIdx = this.media.findIndex(
        (m) => m.resourceId === draft.resourceId || m.title === draft.title
      );

      if (existingMediaIdx !== -1) {
        this.media[existingMediaIdx].caption = draft.imageCaption || draft.summary;
        this.media[existingMediaIdx].description = draft.body;
      } else {
        const sourceRes = this.getResourceById(draft.resourceId);
        this.media.unshift({
          id: `med-${Date.now()}`,
          title: draft.title,
          type: 'photo',
          url: mediaUrl,
          thumbnail: mediaUrl,
          caption: draft.imageCaption || draft.summary,
          description: draft.body,
          region: sourceRes?.region || 'Antarctica',
          year: sourceRes?.year || 2026,
          photographerOrCredit: `NCPOR / ${draft.contributorName}`,
          date: now.split('T')[0],
          tags: draft.keywords || ['PolarScience', 'NCPOR'],
          resourceId: draft.resourceId
        });
      }
      saveToStorage(STORAGE_KEYS.MEDIA, this.media);
    }

    if (updated) {
      this.logActivity(
        'ADMINISTRATOR',
        'CONTENT_PUBLISHED',
        updated.id,
        updated.title,
        `Published to ${destination} by ${publisherName}. [ID: ${updated.id}, Source: ${updated.resourceId}, Ver: ${updated.version || 'v1'}]`
      );
    }

    return updated;
  }

  public requestChangesOnDraft(
    draftId: string,
    reviewerId: string,
    reviewerName: string,
    comments: string
  ): ContentDraft | undefined {
    const draft = this.getDraftById(draftId);
    if (!draft) return undefined;

    const updated = this.updateDraft(draftId, {
      status: 'NEEDS_CHANGES',
      reviewerId,
      reviewerName,
      reviewerComments: comments
    });

    if (updated) {
      this.logActivity(
        'ADMINISTRATOR',
        'REQUEST_CHANGES',
        updated.id,
        updated.title,
        `Requested revision: "${comments}"`
      );
    }

    return updated;
  }

  public unpublishDraft(draftId: string): ContentDraft | undefined {
    const draft = this.getDraftById(draftId);
    if (!draft) return undefined;

    const updated = this.updateDraft(draftId, {
      status: 'UNDER_REVIEW'
    });

    if (updated) {
      this.logActivity(
        'ADMINISTRATOR',
        'UNPUBLISH',
        updated.id,
        updated.title,
        `Content reverted from Published to Under Review.`
      );
    }

    return updated;
  }

  public rejectDraft(
    draftId: string,
    reviewerId: string,
    reviewerName: string,
    reason: string
  ): ContentDraft | undefined {
    const draft = this.getDraftById(draftId);
    if (!draft) return undefined;

    const updated = this.updateDraft(draftId, {
      status: 'REJECTED',
      reviewerId,
      reviewerName,
      reviewerComments: reason
    });

    if (updated) {
      this.logActivity(
        'ADMINISTRATOR',
        'REJECT_DRAFT',
        updated.id,
        updated.title,
        `Rejected outreach submission: "${reason}"`
      );
    }

    return updated;
  }

  // Expeditions
  public getExpeditions(): Expedition[] {
    return [...this.expeditions];
  }

  public getExpeditionById(id: string): Expedition | undefined {
    return this.expeditions.find((e) => e.id === id);
  }

  public addExpedition(data: Omit<Expedition, 'id'> & { id?: string }): Expedition {
    const id = data.id || `exp-${Date.now().toString(36)}`;
    const newExpedition: Expedition = {
      ...data,
      id
    };

    this.expeditions.unshift(newExpedition);
    saveToStorage(STORAGE_KEYS.EXPEDITIONS, this.expeditions);

    this.logActivity(
      this.currentUser.role,
      'CREATE_EXPEDITION',
      newExpedition.id,
      newExpedition.name,
      `Registered polar expedition: ${newExpedition.name} (${newExpedition.region}, status: ${newExpedition.status})`
    );

    notify();
    return newExpedition;
  }

  public updateExpedition(id: string, updates: Partial<Expedition>): Expedition | undefined {
    const idx = this.expeditions.findIndex((e) => e.id === id);
    if (idx === -1) return undefined;

    this.expeditions[idx] = {
      ...this.expeditions[idx],
      ...updates
    };

    saveToStorage(STORAGE_KEYS.EXPEDITIONS, this.expeditions);

    this.logActivity(
      this.currentUser.role,
      'UPDATE_EXPEDITION',
      this.expeditions[idx].id,
      this.expeditions[idx].name,
      `Updated expedition parameters and timeline for ${this.expeditions[idx].name}`
    );

    notify();
    return this.expeditions[idx];
  }

  public deleteExpedition(id: string): boolean {
    const idx = this.expeditions.findIndex((e) => e.id === id);
    if (idx === -1) return false;

    const removed = this.expeditions.splice(idx, 1)[0];
    saveToStorage(STORAGE_KEYS.EXPEDITIONS, this.expeditions);

    this.logActivity(
      'ADMINISTRATOR',
      'DELETE_EXPEDITION',
      removed.id,
      removed.name,
      `Archived expedition record: ${removed.name}`
    );

    notify();
    return true;
  }

  // Media
  public getMedia(): MediaItem[] {
    return [...this.media];
  }

  // Activity Logs
  public getActivities(): ActivityLog[] {
    return [...this.activities];
  }

  private logActivity(
    userRole: UserRole,
    action: string,
    targetId: string,
    targetTitle: string,
    details?: string
  ) {
    const newLog: ActivityLog = {
      id: `act-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      userId: this.currentUser.id,
      userName: this.currentUser.name,
      userRole,
      action,
      targetId,
      targetTitle,
      timestamp: new Date().toISOString(),
      details
    };
    this.activities.unshift(newLog);
    if (this.activities.length > 50) {
      this.activities = this.activities.slice(0, 50);
    }
    saveToStorage(STORAGE_KEYS.ACTIVITY, this.activities);
  }

  // ==========================================
  // DATASETS METHODS
  // ==========================================
  public getDatasets(): Dataset[] {
    return [...this.datasets];
  }

  public getDatasetById(id: string): Dataset | undefined {
    return this.datasets.find((d) => d.id === id);
  }

  public downloadDataset(id: string): boolean {
    const dataset = this.getDatasetById(id);
    if (!dataset) return false;

    dataset.downloadCount = (dataset.downloadCount || 0) + 1;
    saveToStorage(STORAGE_KEYS.DATASETS, this.datasets);

    this.logActivity(
      this.currentUser.role,
      'DATASET_DOWNLOADED',
      dataset.id,
      dataset.title,
      `User downloaded public scientific dataset file [Format: ${dataset.fileFormat}, Size: ${dataset.fileSize}, Platform: ${dataset.platform}]`
    );

    notify();
    return true;
  }

  public requestDatasetAccess(
    id: string,
    requester: { name: string; email: string; institution: string; purpose: string }
  ): boolean {
    const dataset = this.getDatasetById(id);
    if (!dataset) return false;

    this.logActivity(
      this.currentUser.role,
      'DATASET_ACCESS_REQUESTED',
      dataset.id,
      dataset.title,
      `Formal access request submitted by ${requester.name} (${requester.institution}, ${requester.email}) for: "${requester.purpose.slice(0, 100)}..."`
    );

    notify();
    return true;
  }

  public addDataset(data: Omit<Dataset, 'id' | 'createdAt' | 'updatedAt' | 'downloadCount'>): Dataset {
    const newDataset: Dataset = {
      ...data,
      id: `DATA-${String(this.datasets.length + 1).padStart(3, '0')}`,
      downloadCount: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    this.datasets.unshift(newDataset);
    saveToStorage(STORAGE_KEYS.DATASETS, this.datasets);
    this.logActivity(
      this.currentUser.role,
      'DATASET_CREATED',
      newDataset.id,
      newDataset.title,
      `Cataloged new scientific dataset in National Polar Scientific Repository.`
    );
    notify();
    return newDataset;
  }

  // ==========================================
  // EXPEDITION REPORTS METHODS
  // ==========================================
  public getExpeditionReports(): ExpeditionReport[] {
    return [...this.expeditionReports];
  }

  public getExpeditionReportById(id: string): ExpeditionReport | undefined {
    return this.expeditionReports.find((r) => r.id === id);
  }

  public downloadReport(id: string): boolean {
    const report = this.getExpeditionReportById(id);
    if (!report) return false;

    report.downloadCount = (report.downloadCount || 0) + 1;
    saveToStorage(STORAGE_KEYS.EXPEDITION_REPORTS, this.expeditionReports);

    this.logActivity(
      this.currentUser.role,
      'REPORT_DOWNLOADED',
      report.id,
      report.officialTitle,
      `Downloaded expedition technical report [ID: ${report.id}, Expedition: ${report.expeditionName}, Size: ${report.fileSize}]`
    );

    notify();
    return true;
  }

  public addExpeditionReport(data: Omit<ExpeditionReport, 'id' | 'createdAt' | 'downloadCount'>): ExpeditionReport {
    const newReport: ExpeditionReport = {
      ...data,
      id: `EXP-REP-${String(this.expeditionReports.length + 1).padStart(3, '0')}`,
      downloadCount: 0,
      createdAt: new Date().toISOString()
    };
    this.expeditionReports.unshift(newReport);
    saveToStorage(STORAGE_KEYS.EXPEDITION_REPORTS, this.expeditionReports);
    this.logActivity(
      this.currentUser.role,
      'REPORT_ADDED',
      newReport.id,
      newReport.officialTitle,
      `Archived new expedition scientific report.`
    );
    notify();
    return newReport;
  }

  // ==========================================
  // PUBLICATIONS REPOSITORY METHODS
  // ==========================================
  public getPublications(): Publication[] {
    return [...this.publications];
  }

  public getPublicationById(id: string): Publication | undefined {
    return this.publications.find((p) => p.id === id);
  }

  public accessPublication(id: string): boolean {
    const pub = this.getPublicationById(id);
    if (!pub) return false;

    pub.downloadCount = (pub.downloadCount || 0) + 1;
    saveToStorage(STORAGE_KEYS.PUBLICATIONS, this.publications);

    this.logActivity(
      this.currentUser.role,
      'PUBLICATION_ACCESSED',
      pub.id,
      pub.title,
      `Accessed publication paper / citation [Journal: ${pub.journal}, DOI: ${pub.doi}]`
    );

    notify();
    return true;
  }

  public addPublication(data: Omit<Publication, 'id' | 'createdAt' | 'downloadCount'>): Publication {
    const newPub: Publication = {
      ...data,
      id: `PUB-${String(this.publications.length + 1).padStart(3, '0')}`,
      downloadCount: 0,
      createdAt: new Date().toISOString()
    };
    this.publications.unshift(newPub);
    saveToStorage(STORAGE_KEYS.PUBLICATIONS, this.publications);
    this.logActivity(
      this.currentUser.role,
      'PUBLICATION_ADDED',
      newPub.id,
      newPub.title,
      `Registered scientific publication in National Publications Repository.`
    );
    notify();
    return newPub;
  }

  // ==========================================
  // INSTITUTIONAL ACTIVITIES METHODS
  // ==========================================
  public getInstitutionalActivities(): InstitutionalActivity[] {
    return [...this.institutionalActivities];
  }

  public getInstitutionalActivityById(id: string): InstitutionalActivity | undefined {
    return this.institutionalActivities.find((a) => a.id === id);
  }

  public addInstitutionalActivity(data: Omit<InstitutionalActivity, 'id' | 'createdAt'>): InstitutionalActivity {
    const newAct: InstitutionalActivity = {
      ...data,
      id: `ACT-${String(this.institutionalActivities.length + 1).padStart(3, '0')}`,
      createdAt: new Date().toISOString()
    };
    this.institutionalActivities.unshift(newAct);
    saveToStorage(STORAGE_KEYS.INSTITUTIONAL_ACTIVITIES, this.institutionalActivities);
    this.logActivity(
      this.currentUser.role,
      'ACTIVITY_CREATED',
      newAct.id,
      newAct.title,
      `Archived new institutional event/activity [Type: ${newAct.activityType}, Location: ${newAct.location}]`
    );
    notify();
    return newAct;
  }
}

export const store = new PolarStore();
export type { MediaItem } from '../types';
