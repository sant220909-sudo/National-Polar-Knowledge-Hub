import {
  ContentDestination,
  DraftContentType,
  PolarRegion,
  ResearchTopic,
  WebsiteContentFormat
} from '../types';

export interface GenerationInput {
  title: string;
  description: string;
  topic: ResearchTopic;
  region: PolarRegion;
  year: number;
  leadScientists?: string;
  stationOrVessel?: string;
  contentType: DraftContentType;
  contentDestination?: ContentDestination;
  destinationSpecificType?: string;
  websiteFormat?: WebsiteContentFormat;
  filesSummary?: string;
  selectedFileName?: string;
  selectedFileCaption?: string;
  filesList?: { filename: string; fileType: string; sizeMb: number; caption?: string }[];
  activeStatus?: 'Ongoing' | 'Completed' | 'Planned';
}

export interface GeneratedContentOutput {
  title: string;
  summary: string;
  body: string;
  keyFindings: string[];
  keywords: string[];
  imageCaption: string;
  socialMediaText: string;
  readingTimeMin: number;
  aiPromptSummary: string;
  websiteFormat?: WebsiteContentFormat;
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
}

/**
 * Institutional AI Content Synthesizer.
 * Transforms selected scientific repository resources into verified website articles,
 * social media outreach, or media captions as specified by official PS.
 *
 * Core rule: Original repository resources remain untouched; generated content is a separate derived record.
 */
export async function generateContentFromResource(
  input: GenerationInput,
  simulatedDelayMs = 1000
): Promise<GeneratedContentOutput> {
  if (simulatedDelayMs > 0) {
    await new Promise((resolve) => setTimeout(resolve, simulatedDelayMs));
  }

  const {
    title,
    description,
    topic,
    region,
    year,
    stationOrVessel,
    contentType,
    websiteFormat = 'Full Article',
    leadScientists,
    selectedFileName,
    selectedFileCaption
  } = input;

  const stationName =
    stationOrVessel ||
    (region === 'Antarctica'
      ? 'Bharati Station, Larsemann Hills'
      : region === 'Arctic'
      ? 'Himadri Research Station, Ny-Ålesund'
      : region === 'Southern Ocean'
      ? 'ORV Sagar Nidhi'
      : 'Himalayan High-Altitude Station');

  const scientists = leadScientists || 'Expedition Scientific Contingent';

  let genTitle = title;
  let summary = '';
  let body = '';
  let keyFindings: string[] = [];
  let keywords: string[] = [];
  let imageCaption = '';
  let socialMediaText = '';
  let readingTimeMin = 4;
  let newsSnippet: string | undefined;
  let websiteCard: GeneratedContentOutput['websiteCard'];
  let homepageBanner: GeneratedContentOutput['homepageBanner'];

  // 1. WEBSITE ARTICLE (Supports 4 explicit formats: Full Article, News Snippet, Website Card, Homepage Banner)
  if (
    contentType === 'Website Article' ||
    contentType === 'Public Article' ||
    contentType === 'Scientific Summary' ||
    contentType === 'Educational Content' ||
    contentType === 'Expedition Story'
  ) {
    if (websiteFormat === 'News Snippet') {
      genTitle = `News: New ${topic} Findings from ${region} Released by NCPOR (${year})`;
      summary = `The National Centre for Polar and Ocean Research (NCPOR) has released findings from ${region} led by ${scientists}.`;
      newsSnippet = `NCPOR has officially cataloged verified scientific results regarding ${topic.toLowerCase()} derived from field operations at ${stationName}. Researchers recorded critical high-resolution baseline telemetry that informs regional and global Earth System models. The complete dataset and peer-reviewed report are preserved in the National Polar Scientific Repository under the PACER scheme.`;
      body = `### News Snippet (${new Date().toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })})
**${genTitle}**

${newsSnippet}

- **Category:** ${topic} · ${region}
- **Lead Station/Platform:** ${stationName}
- **Contributing Team:** ${scientists}
- **Source Resource:** ${title}

---
*Derived news summary prepared for national website newsfeed. Awaiting scientist sign-off.*`;
      keyFindings = [
        `High-resolution observations compiled by ${scientists}.`,
        `Baseline datasets validated and cataloged in the National Scientific Repository.`,
        `Direct implications for regional climate and monsoon modeling.`
      ];
      keywords = [region, topic, 'News', stationName, 'NCPOR'];
      imageCaption = `Field operations at ${stationName}, ${region}.`;
      socialMediaText = `📰 News Flash: NCPOR announces fresh ${topic.toLowerCase()} observations from ${stationName} (${region}). Read the brief: #PolarScience #NCPOR #MoES`;
      readingTimeMin = 1;
    } else if (websiteFormat === 'Website Card') {
      genTitle = `Card: ${topic} in ${region} (${year})`;
      summary = `Explore the latest scientific work from India's polar programme in ${region}.`;
      websiteCard = {
        headline: `${region} ${topic} Campaign (${year})`,
        shortDescription: `Explore ongoing scientific observations and cryogenic telemetry collected at ${stationName} by Indian researchers.`,
        category: topic,
        ctaText: 'Read More'
      };
      body = `### Website Card Preview
**Title:** ${websiteCard.headline}
**Category:** ${websiteCard.category}
**Description:** ${websiteCard.shortDescription}
**CTA:** ${websiteCard.ctaText}

---
*Derived website card element prepared for polar portal content grid. Source: "${title}".*`;
      keyFindings = [
        `Card-ready summary for portal homepage or domain listings.`,
        `Directly linked to source resource ${title}.`
      ];
      keywords = [region, topic, 'Card', 'Portal'];
      imageCaption = `Portal thumbnail view for ${topic} at ${stationName}.`;
      socialMediaText = `Explore India's sovereign science in ${region}: ${websiteCard.shortDescription} #NCPOR`;
      readingTimeMin = 1;
    } else if (websiteFormat === 'Homepage Banner') {
      genTitle = `Banner: Exploring India's Polar Frontiers in ${region}`;
      summary = `Headline and hero banner content highlighting ${topic} achievements at ${stationName}.`;
      homepageBanner = {
        headline: `Sovereign Science Across ${region}'s Frontiers`,
        supportingText: `Discover active expedition research, physical scientific datasets, and verified stories from ${stationName}.`,
        ctaText: 'Explore Research',
        suggestedMediaUrl: 'https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?auto=format&fit=crop&q=80&w=1600'
      };
      body = `### Homepage Banner Headline
**Headline:** ${homepageBanner.headline}

**Supporting Text:** ${homepageBanner.supportingText}

**Call to Action (CTA):** [ ${homepageBanner.ctaText} ]

**Suggested Media:** Polar field photograph from ${stationName}

---
*Derived homepage hero banner element linked to source resource: "${title}".*`;
      keyFindings = [
        `High-impact hero headline and supporting text.`,
        `Call-to-action directs citizens and researchers to peer-reviewed findings.`
      ];
      keywords = [region, topic, 'Hero Banner', 'Polar Knowledge Portal'];
      imageCaption = `Suggested banner asset: ${stationName} in ${region}.`;
      socialMediaText = `Explore India's sovereign polar frontier in ${region}. Discover verified research at the National Polar Portal! #NCPOR`;
      readingTimeMin = 1;
    } else {
      // Standard Full Article
      genTitle = `Unlocking the Polar Archives: New ${topic} Findings from ${region} (${year})`;
      summary = `Scientists deployed at ${stationName} have unveiled crucial observations regarding ${topic.toLowerCase()}, revealing how high-latitude cryospheric shifts communicate directly with global climate systems.`;
      body = `### Context & Scientific Motivation
The polar frontiers of our planet serve as sensitive, irreplaceable bellwethers for global planetary health. During the ${year} seasonal campaign in ${region}, Indian scientific contingents coordinated through ${stationName} led specialized field investigations into ${topic}.

${description}

### Field Operations & Observational Methods
Operating under the leadership of ${scientists}, the research contingent deployed calibrated borehole sensors, multi-frequency acoustic profilers, and autonomous meteorological logging arrays. All operations maintained strict compliance with the Environmental Protocol to the Antarctic Treaty (Madrid Protocol) and Arctic international conservation accords.

### Primary Discoveries
1. **Cryospheric Stability & Heat Exchange**: High-resolution empirical telemetry captured localized heat and turbulent momentum fluxes along the ice-ocean-atmosphere interface, yielding vital baseline constants for Earth System Models.
2. **Environmental & Biological Indicators**: Systematic sampling confirmed fine-scale chemical and physical stratigraphy, providing uncontaminated natural records of seasonal accumulation and atmospheric circulation patterns.
3. **Decadal Teleconnections**: Observational signatures recorded at ${stationName} directly correlate with mid-latitude climate oscillations and monsoon teleconnections impacting the Indian subcontinent.

### Societal Significance & Institutional Stewardship
These peer-reviewed findings reinforce India's four-decade commitment to polar science under the Ministry of Earth Sciences. The preserved raw data remains safeguarded in the National Polar Scientific Repository, while verified findings are shared openly to advance global scientific understanding and climate resilience.

---
*Notice: This public outreach draft was derived from preserved repository resource "${title}". It has been placed in the Scientist Workspace for verification before submission to the Administrator review queue.*`;

      keyFindings = [
        `High-temporal-resolution data acquired across ${region} during the ${year} field season.`,
        `Validated correlation between localized polar processes and broader global climate systems.`,
        `Baseline parameters archived in compliance with national and international polar standards.`
      ];

      keywords = [region, topic, 'Climate Dynamics', stationName, 'NCPOR', 'Polar Research'];
      imageCaption = `Scientific field deployment near ${stationName}, ${region} (${year}).`;
      socialMediaText = `❄️ New polar research alert: Scientists in ${region} report fresh insights on ${topic.toLowerCase()} from ${stationName}. Read how ongoing monitoring protects our shared climate future: #PolarScience #${region.replace(/\s+/g, '')} #NCPOR #EarthSciences`;
      readingTimeMin = 4;
    }
  }
  // 2. SOCIAL MEDIA CONTENT
  else if (contentType === 'Social Media Content' || contentType === 'Social Media Post') {
    genTitle = `Social Media Outreach: ${title} (${region})`;
    summary = `Concise multi-platform social media outreach copy synthesized from ${region} ${topic.toLowerCase()} observations for institutional dissemination across X (Twitter), LinkedIn, and Instagram.`;
    body = `### 📱 Channel 1: X (Twitter) Thread
🧊 From the frozen frontier of ${region}: Researchers at ${stationName} have logged pivotal ${topic.toLowerCase()} observations during the ${year} campaign!

Key Highlights:
1️⃣ Continuous real-time telemetry successfully captured across extreme sub-zero conditions.
2️⃣ Data provides baseline records for national climate projection models.
3️⃣ Zero-waste environmental compliance maintained throughout field operations.

Led by ${scientists} | Ministry of Earth Sciences
🔗 Read the verified science brief on the Polar Knowledge Portal: [portal.ncpor.res.in/research]
#PolarResearch #IndiaIn${region.replace(/\s+/g, '')} #NCPOR #ClimateScience #MoES

---

### 💼 Channel 2: LinkedIn (Professional & Institutional Update)
**New Research Milestone from the National Polar Knowledge Repository**

Researchers operating under the aegis of the National Centre for Polar and Ocean Research (NCPOR), Ministry of Earth Sciences, have concluded primary analyses of recent ${topic.toLowerCase()} observations in ${region}.

Conducted at ${stationName}, this work demonstrates how cryospheric changes govern atmospheric teleconnections. By integrating high-resolution observational data into predictive models, Indian scientists are bridging the gap between polar environmental shifts and tropical weather resilience.

Access the complete metadata, dataset provenance, and institutional report on the National Polar Knowledge Portal.

#MoES #EarthSciences #PolarResearch #Cryosphere #IndiaInScience`;

    keyFindings = [
      `Social media copy formatted for institutional X (Twitter) and LinkedIn releases.`,
      `Includes hashtags, character constraints, and provenance links back to source repository.`,
      `Approved under human-in-the-loop review pipeline.`
    ];
    keywords = ['Social Media', region, topic, 'Outreach', 'NCPOR'];
    imageCaption = `High-latitude polar field site at ${stationName}.`;
    socialMediaText = `🧊 New science release from ${region}: Researchers at ${stationName} conclude vital ${topic.toLowerCase()} analysis. Explore the findings on the Polar Knowledge Portal! #PolarScience #NCPOR`;
    readingTimeMin = 2;
  }
  // 3. MEDIA CAPTION & VISUAL DESCRIPTIONS
  else if (
    contentType === 'Media Caption' ||
    contentType === 'Image Caption' ||
    contentType === 'Gallery Description' ||
    contentType === 'Media Highlight'
  ) {
    const fileLabel = selectedFileName ? ` for "${selectedFileName}"` : '';
    genTitle = `Archival Caption${fileLabel}: ${stationName} (${region})`;
    summary = `Accredited institutional media caption and archival documentation contextualizing photographic/visual assets from ${region} for public dissemination.`;
    imageCaption =
      selectedFileCaption ||
      `Indian scientific personnel conducting ${topic.toLowerCase()} field sampling near ${stationName}, ${region} (${year}). Photo Credit: NCPOR / ${scientists}.`;

    body = `### Institutional Photographic & Media Caption
**Media Asset:** ${selectedFileName || 'Polar Field Photograph'}
**Caption:** ${imageCaption}

### Archival Context
This visual record captures ongoing field maneuvers led by ${scientists} during the ${year} expedition in ${region}. The photograph illustrates field safety protocols, sub-zero scientific instrumentation, and non-invasive sampling practices mandated by the Indian Antarctic Act, 2022, and Arctic conservation directives.

### Suggested Public Tagging
- **Credit:** National Centre for Polar and Ocean Research (NCPOR) / Ministry of Earth Sciences
- **Location:** ${stationName} (${region})
- **License:** Open Access Educational / Institutional Use (CC BY-NC-ND 4.0)`;

    keyFindings = [
      `Verified archival caption with standardized photographer and institutional credit.`,
      `Regulatory compliance verified under Indian Antarctic Act and Arctic Council norms.`
    ];
    keywords = ['Media Caption', 'Archival Photo', region, stationName, 'NCPOR'];
    socialMediaText = `📸 Polar Snapshot: ${imageCaption} #PolarPhotography #NCPOR #ScienceAtTheExtremes`;
    readingTimeMin = 1;
  }
  // 4. EXPEDITION CONTENT (Overview, Story / Update, Highlight)
  else if (
    contentType === 'Expedition Overview' ||
    contentType === 'Expedition Story / Update' ||
    contentType === 'Expedition Highlight'
  ) {
    const fileListText = input.filesList && input.filesList.length > 0
      ? input.filesList.map((f, i) => `${i + 1}. **${f.filename}** (${f.fileType.toUpperCase()} · ${f.sizeMb} MB)${f.caption ? ` — *${f.caption}*` : ''}`).join('\n')
      : `1. **${selectedFileName || 'Scientific_Field_Report.pdf'}** (Primary Dataset & Log)`;

    const expCode = region === 'Antarctica' ? `44-IASE (${year})` : region === 'Arctic' ? `IASC-${year}` : `SOE-${year}`;

    genTitle = `Expedition Chronicle: ${topic} Campaign in ${region} — Active Field Operations (${year})`;
    summary = `Official field chronicle and in-progress operational debrief for ${region}. Details borehole drilling, real-time sensor telemetry, and cryospheric data acquisition at ${stationName}.`;
    
    body = `### Indian Polar Scientific Expedition Operations
**Mission Identifier:** ${expCode}  
**Lead Station / Platform:** ${stationName}  
**Primary Field Focus:** ${topic} (${region})  
**Scientific Leadership:** ${scientists}  
**Current Mission Lifecycle Status:** 🔴 **IN PROGRESS — Phase 4: In-situ Sampling & Telemetry Logging**

---

### Primary Preserved Files & Telemetry Attachments
The following original scientific records and data files are active components of this expedition deployment:
${fileListText}

---

### Mission Lifecycle: Expedition Phase Progression & Milestones
- **Phase 1: Project Proposal & National Screening** [COMPLETED]
  *MoES National Steering Committee clearance; logistics charter approved.*
- **Phase 2: Medical Fitness & Pre-Deployment Staging** [COMPLETED]
  *High-altitude cold acclimatization at ITBP Auli; heavy cryogenic drill mobilization via Cape Town / Tromsø.*
- **Phase 3: Field Deployment & Station Activation** [COMPLETED]
  *Air/sea transit into ${region}; field camp established and environmental safety perimeter verified.*
- **Phase 4: In-situ Sampling & Telemetry Logging** [🔴 IN PROGRESS — Current Active Milestone]
  *Active borehole extraction, underway hydrographic transects, and high-frequency sensor downlink to NCPOR HQ.*
- **Phase 5: Laboratory Analysis & -20°C Cryo-Vault Archival** [UPCOMING — Target: Next Quarter]
  *Cold-room cavity ringdown spectrometry and physical core curation at NCPOR Goa.*
- **Phase 6: Scientific Synthesis & Open Repository Release** [UPCOMING]
  *Open-access dataset publication and public polar educational chronicles.*

---

### Strategic Scientific Objectives
1. **Core Retrieval & Stratigraphy:** Execute sub-zero sampling to reconstruct benchmark climatic proxies across ${region}.
2. **Autonomous Telemetry Array:** Maintain continuous meteorological and ablation sensor networks transmitting via GSAT/Inmarsat satellite relays.
3. **Environmental Stewardship:** Zero-effluent discharge protocol in full adherence to the Antarctic Treaty Madrid Protocol.

---
*Derived expedition dossier synthesized from repository resource "${title}". Original source files remain permanently preserved in the repository.*`;

    keyFindings = [
      `Active field phase 4 in progress with continuous telemetry transmission.`,
      `${input.filesList?.length || 1} original datasets, PDF reports, and telemetry files linked to mission record.`,
      `Full environmental treaty compliance maintained at ${stationName}.`
    ];
    keywords = ['Expedition', region, topic, stationName, 'NCPOR', 'In Progress'];
    imageCaption = `Active field operations and sampling camp at ${stationName}, ${region}.`;
    socialMediaText = `🧭 Expedition Update (${expCode}): Follow the active field research and sensor telemetry at ${stationName}! #PolarExpedition #NCPOR #MoES #FieldScience`;
    readingTimeMin = 4;
  }
  // 5. INSTITUTIONAL ACTIVITIES (Announcement, Summary, Event Highlight)
  else if (
    contentType === 'Activity Announcement' ||
    contentType === 'Activity Summary' ||
    contentType === 'Event Highlight'
  ) {
    genTitle = `Institutional Milestone: National Polar Outreach & Workshop on ${topic} (${year})`;
    summary = `Institutional program briefing summarizing multi-institutional collaboration, academic workshops, and national polar science dissemination led by NCPOR.`;
    body = `### Institutional Event Dossier
**Title:** National Scientific Briefing & Workshop on ${topic}
**Organizing Body:** National Centre for Polar and Ocean Research (NCPOR), Ministry of Earth Sciences, Govt. of India
**Host Platform/Station:** ${stationName} / NCPOR Goa
**Year/Period:** ${year}

### Program Objectives & Outcomes
1. **Academic Assimilation:** Convened researchers and universities to discuss recent ${topic.toLowerCase()} observations derived from ${region}.
2. **Open Access Guidelines:** Formulated protocols for standardized dataset release and peer-reviewed report preservation in the National Scientific Repository.
3. **Public Dissemination:** Converted primary technical data into accessible learning briefs for students and citizen scientists.

### Collaborative Network
Participating institutes include NCPOR, MoES autonomous bodies, IITs, IISc, and partner universities under the Indian Polar Programme.

---
*Institutional activity record formatted for the Public Activities Archive. Derived from scientific resource: "${title}".*`;
    keyFindings = [
      `Multi-agency scientific coordination meeting successfully organized.`,
      `Standardized open-access framework approved for ${topic} datasets.`,
      `Public outreach materials prepared for educational portal release.`
    ];
    keywords = ['Institutional Activity', 'Workshop', topic, 'NCPOR', 'MoES'];
    imageCaption = `Academic delegates and researchers reviewing ${topic.toLowerCase()} briefings.`;
    socialMediaText = `🏛️ Institutional Update: NCPOR convenes leading researchers to review polar ${topic.toLowerCase()} findings and open-access guidelines. #NCPOR #MoESIndia`;
    readingTimeMin = 2;
  }
  // 6. EDUCATION CONTENT (Educational Article, Learning Resource, Student-Friendly Explanation)
  else if (
    contentType === 'Educational Article' ||
    contentType === 'Learning Resource' ||
    contentType === 'Student-Friendly Explanation'
  ) {
    genTitle = `Polar Science for Students: Understanding ${topic} in ${region}`;
    summary = `A student-friendly, engaging exploration explaining how Indian scientists study ${topic.toLowerCase()} at ${stationName} and why polar science matters for India's weather and climate.`;
    body = `### 🌟 Welcome to the Ice World!
Did you know that the coldest, windiest places on our planet act like Earth's giant air conditioners? Indian scientists travel thousands of kilometers to Antarctica, the Arctic, and the Himalayas to unlock secrets frozen in ice!

### What Are Scientists Studying at ${stationName}?
In ${region}, researchers study **${topic}**. Here is what that means:
- **How it Works:** Just like detectives studying clues, scientists collect ice samples, ocean water, and air particles to understand Earth's past, present, and future.
- **Why It Matters for India:** What happens at the poles directly connects to the Indian monsoon rains that help our farmers grow crops!

### Fun Polar Science Facts!
1. **Extreme Chill:** Temperatures near ${stationName} can plunge below -40°C—colder than your home freezer!
2. **Pristine Archives:** Polar ice traps tiny ancient air bubbles from thousands of years ago, letting scientists breathe ancient atmosphere.
3. **Eco-Friendly Stations:** India's research stations run on clean energy and bring 100% of their waste back to India to keep the polar wilderness completely pure.

---
*Educational STEM resource prepared for students and curious citizens. Based on verified research: "${title}".*`;
    keyFindings = [
      `Engaging STEM explanation suitable for school and university students.`,
      `Directly connects polar scientific phenomena with everyday Indian climate.`,
      `Includes interactive fun facts and eco-friendly stewardship principles.`
    ];
    keywords = ['Education', 'STEM', 'Students', region, topic, 'NCPOR'];
    imageCaption = `Student learning illustration for ${topic} at ${stationName}.`;
    socialMediaText = `🎓 Did you know? Learn how what happens in ${region} shapes the air we breathe in India! Explore our new student polar science guide: #PolarEducation #STEMIndia #NCPOR`;
    readingTimeMin = 3;
  }

  const aiPromptSummary = `Synthesized via Gemini Polar Synthesis Engine from repository resource "${title}" (${region}, ${year}). Target output: ${contentType}${contentType === 'Website Article' ? ` [${websiteFormat}]` : ''}. Human-in-the-loop validation enforced.`;

  return {
    title: genTitle,
    summary,
    body,
    keyFindings,
    keywords,
    imageCaption,
    socialMediaText,
    readingTimeMin,
    aiPromptSummary,
    websiteFormat,
    newsSnippet,
    websiteCard,
    homepageBanner
  };
}

/**
 * Editorial content refinement assistant for scientists.
 */
export function refineContent(
  text: string,
  action: 'simplify' | 'expand' | 'shorten' | 'clarity'
): string {
  if (!text) return '';
  switch (action) {
    case 'simplify':
      return text
        .replace(/telemetry/gi, 'real-time sensor readings')
        .replace(/stratigraphy/gi, 'layer-by-layer structure')
        .replace(/subglacial/gi, 'under-ice')
        .replace(/cryospheric/gi, 'ice-and-snow')
        .replace(/paleoclimatology/gi, 'ancient climate history');
    case 'shorten': {
      const paragraphs = text.split('\n\n');
      return paragraphs.slice(0, Math.max(2, paragraphs.length - 1)).join('\n\n');
    }
    case 'expand':
      return (
        text +
        '\n\n### Observational Follow-up\nSubsequent campaigns will deploy synchronized autonomous sensor clusters to continuously correlate seasonal accumulation with satellite altimetry data collected under the PACER scheme.'
      );
    case 'clarity':
      return text
        .replace(/\bconsequently\b/gi, 'as a direct result')
        .replace(/\bmoreover\b/gi, 'in addition')
        .replace(/\bthus\b/gi, 'therefore');
    default:
      return text;
  }
}

