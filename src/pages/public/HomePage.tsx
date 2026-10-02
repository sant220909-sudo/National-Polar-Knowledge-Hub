import React from 'react';
import { store } from '../../services/storage';
import { useLanguage } from '../../context/LanguageContext';
import { ScrollReveal } from '../../components/common/ScrollReveal';
import {
  Compass,
  ArrowRight,
  BookOpen,
  Calendar,
  MapPin,
  Clock,
  ShieldCheck,
  ChevronRight,
  ExternalLink,
  Award,
  Globe,
  FileText,
  Sparkles,
  Layers,
  GraduationCap,
  CloudRain,
  Mountain,
  Anchor,
  Radio,
  Cpu,
  Waves,
  CheckCircle2,
  Users,
  Database
} from 'lucide-react';

interface HomePageProps {
  onNavigate: (route: string) => void;
  onOpenSearch: () => void;
  onOpenMedia: (mediaId: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onNavigate,
  onOpenSearch,
  onOpenMedia
}) => {
  const { isHindi } = useLanguage();
  const expeditions = store.getExpeditions().slice(0, 3);
  const publishedArticles = store.getDrafts().filter((d) => d.status === 'PUBLISHED').slice(0, 3);
  const mediaItems = store.getMedia().slice(0, 4);

  const indianStations = [
    {
      name: 'Bharati Station',
      code: 'IND-ANT-02',
      region: 'East Antarctica',
      location: 'Larsemann Hills (69°24′S, 76°11′E)',
      year: 'Est. 2012',
      image: 'https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?auto=format&fit=crop&q=80&w=800',
      description: 'India\'s state-of-the-art third Antarctic base, constructed on stilts with zero-effluent discharge technology, waste heat recovery cogeneration, and high-latitude optical sounding labs.',
      tags: ['Antarctica', 'Active Wintering', 'Madrid Protocol Compliant']
    },
    {
      name: 'Maitri Station',
      code: 'IND-ANT-01',
      region: 'East Antarctica',
      location: 'Schirmacher Oasis (70°45′S, 11°44′E)',
      year: 'Est. 1989',
      image: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?auto=format&fit=crop&q=80&w=800',
      description: 'India\'s historic second Antarctic station, supporting unbroken multi-decadal meteorological time-series, freshwater lake paleolimnology, and geomagnetic pulsation recording.',
      tags: ['Antarctica', 'Active Year-round', 'Prydz Bay Gateway']
    },
    {
      name: 'Himadri Station',
      code: 'IND-ARC-01',
      region: 'Arctic',
      location: 'Ny-Ålesund, Svalbard (78°55′N, 11°56′E)',
      year: 'Est. 2008',
      image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=800',
      description: 'India\'s permanent Arctic research station situated at 79° North, dedicated to aerosol optical depth, fjord hydrology, permafrost thaw, and Arctic Haze radiative forcing studies.',
      tags: ['Arctic (Svalbard)', 'International Research Village', 'Atmospheric Physics']
    },
    {
      name: 'IndARC Observatory',
      code: 'IND-ARC-MOORING',
      region: 'Arctic Ocean',
      location: 'Kongsfjorden Fjord (192m depth, 79°N)',
      year: 'Deployed 2014',
      image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&q=80&w=800',
      description: 'India\'s first underwater multi-sensor mooring in the Arctic, logging real-time temperature, salinity, ocean current velocity, and hydroacoustic soundings around the clock.',
      tags: ['Arctic Ocean', 'Subsurface Mooring', 'Atlantification Monitoring']
    },
    {
      name: 'Himansh Observatory',
      code: 'IND-HIM-01',
      region: 'Himalayas / Third Pole',
      location: 'Chandra Basin, Spiti Valley (4,080m AMSL)',
      year: 'Est. 2016',
      image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=800',
      description: 'High-altitude research facility monitoring the Himalayan Third Pole cryosphere, tracking glacier mass balance, snow accumulation, and hydrological run-off feeding northern India.',
      tags: ['Himalayan Third Pole', 'Spiti Valley', 'Glacier Mass Balance']
    },
    {
      name: 'ORV Sagar Nidhi',
      code: 'IND-VESSEL-01',
      region: 'Southern Ocean & Polar Seas',
      location: 'Ice-class Oceanographic Vessel',
      year: 'Commissioned 2008',
      image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&q=80&w=800',
      description: 'India\'s premier ice-class oceanographic research vessel operated by MoES, capable of navigating through sea-ice to deploy deep CTD rosettes and multi-beam sounders in the Southern Ocean.',
      tags: ['Oceanographic Fleet', 'Southern Ocean Cruise', 'Deep Sea Research']
    }
  ];

  const monsoonTeleconnections = [
    {
      title: 'Arctic Warming & Indian Monsoon Linkage',
      hindi: 'आर्कटिक उष्णता और भारतीय मानसून',
      icon: CloudRain,
      summary: 'Rapid reduction of Arctic sea ice alters the circum-global Rossby wave train and weakens the subtropical westerly jet stream, directly impacting the timing, spatial distribution, and intensity of India’s monsoon rainfall.'
    },
    {
      title: 'Himalayan Third Pole & Water Security',
      hindi: 'हिमालयी हिमनद एवं राष्ट्रीय जल सुरक्षा',
      icon: Mountain,
      summary: 'The Himalayan cryosphere, studied at Himansh station, forms the water tower of northern India. Tracking glacial retreat directly safeguards perennial flow in the Indus, Ganga, and Brahmaputra river basins.'
    },
    {
      title: 'Southern Ocean Carbon Sequestration',
      hindi: 'दक्षिण महासागर कार्बन प्रच्छादन',
      icon: Waves,
      summary: 'Indian researchers aboard ORV Sagar Nidhi measure the biological carbon pump along 57°E, where Antarctic krill swarms export massive quantities of carbon into the deep ocean abyss, mitigating global climate warming.'
    },
    {
      title: 'Sea Level Rise & Indian Coastal Resilience',
      hindi: 'समुद्री जलस्तर वृद्धि एवं तटीय सुरक्षा',
      icon: Anchor,
      summary: 'Accelerated calving of Antarctic ice shelves directly influences global mean sea level. Indian polar glaciology models provide critical risk assessments for India’s 7,516 km coastline and coastal megacities.'
    }
  ];

  return (
    <div className="space-y-16 sm:space-y-24 pb-20 bg-slate-50/40 text-slate-900">
      {/* 1. HERO SECTION WITH OFFICIAL INDIAN TRICOLOUR IDENTITY */}
      <section className="relative bg-slate-950 text-white overflow-hidden border-b border-slate-800">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?auto=format&fit=crop&q=80&w=1800"
            alt="Bharati Station, Indian Antarctic Programme"
            className="w-full h-full object-cover object-center opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900/95 to-slate-950/70"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
          <div className="max-w-3xl space-y-6">
            {/* National Sovereign Identity Strip */}
            <ScrollReveal variant="blurIn" delay={0.05}>
              <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-amber-500/40 text-amber-300 text-xs font-semibold shadow-xs">
                <span className="text-base leading-none">🇮🇳</span>
                <span className="text-amber-400 font-bold tracking-wide">India's National Polar Programme</span>
                <span className="text-slate-500">|</span>
                <span className="text-slate-300">National Centre for Polar and Ocean Research</span>
              </div>
            </ScrollReveal>

            <ScrollReveal variant="fadeDown" delay={0.18}>
              <div className="space-y-2">
                <span className="text-xs uppercase font-extrabold tracking-widest text-amber-500 block">
                  Ministry of Earth Sciences, Government of India
                </span>
                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight font-serif">
                  India's Scientific Leadership Across Antarctica, the Arctic, and the Himalayas
                </h1>
                <p className="text-lg sm:text-xl font-medium text-sky-200/90">
                  India's Sovereign Cryospheric Exploration & Polar Knowledge Gateway
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal variant="fadeUp" delay={0.32}>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-sans max-w-2xl">
                Preserving and disseminating sovereign scientific data, in-situ cryogenic telemetry, and verified research from Indian campaigns operating across <strong>Bharati</strong>, <strong>Maitri</strong>, <strong>Himadri</strong>, <strong>IndARC</strong>, and <strong>Himansh</strong>.
              </p>
            </ScrollReveal>

            <ScrollReveal variant="fadeUp" delay={0.46}>
              <div className="flex flex-wrap items-center gap-4 pt-3">
                <button
                  onClick={() => onNavigate('/expeditions')}
                  className="px-6 py-3.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-slate-950 font-bold text-xs tracking-wider uppercase shadow-md transition flex items-center gap-2"
                >
                  <span>Explore Indian Expeditions</span>
                  <ArrowRight className="w-4 h-4 text-slate-950" />
                </button>

                <button
                  onClick={() => onNavigate('/datasets')}
                  className="px-6 py-3.5 rounded-xl bg-sky-900/70 hover:bg-sky-800 text-sky-100 font-semibold text-xs tracking-wider uppercase border border-sky-600/50 transition flex items-center gap-2"
                >
                  <Database className="w-4 h-4 text-sky-400" />
                  <span>Datasets Archive</span>
                </button>

                <button
                  onClick={() => onNavigate('/research')}
                  className="px-6 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs tracking-wider uppercase border border-slate-700 transition"
                >
                  <span>Publications & Research</span>
                </button>
              </div>
            </ScrollReveal>

            <ScrollReveal variant="blurIn" delay={0.58}>
              {/* Permanent Stations Summary Strip */}
              <div className="pt-6 border-t border-slate-800 text-xs text-slate-300 flex items-center gap-3 flex-wrap">
                <span className="font-bold text-amber-400">India's Permanent Research Stations:</span>
                <span className="bg-slate-900 px-2 py-0.5 rounded border border-slate-800 text-slate-200">Bharati (70°S)</span>
                <span className="text-slate-600">·</span>
                <span className="bg-slate-900 px-2 py-0.5 rounded border border-slate-800 text-slate-200">Maitri (70°S)</span>
                <span className="text-slate-600">·</span>
                <span className="bg-slate-900 px-2 py-0.5 rounded border border-slate-800 text-slate-200">Himadri (79°N)</span>
                <span className="text-slate-600">·</span>
                <span className="bg-slate-900 px-2 py-0.5 rounded border border-slate-800 text-slate-200">IndARC (192m)</span>
                <span className="text-slate-600">·</span>
                <span className="bg-slate-900 px-2 py-0.5 rounded border border-slate-800 text-slate-200">Himansh (Himalayas)</span>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* 2. DEDICATED SECTION: INDIA'S 6 SOVEREIGN POLAR BASES & OBSERVATORIES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal variant="fadeRight">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 pb-4 border-b border-slate-200">
            <div>
              <div className="flex items-center gap-2 text-xs uppercase font-extrabold tracking-wider text-amber-700 mb-1">
                <span>🇮🇳</span>
                <span>Sovereign Research Infrastructure</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-serif">
                India's Polar Research Bases & Observatories
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                India's permanent scientific bases operating under the Antarctic Treaty and Arctic Council scientific guidelines.
              </p>
            </div>

            <div className="text-xs text-slate-500 font-mono">
              6 Operational Polar Platforms
            </div>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {indianStations.map((station, idx) => (
            <ScrollReveal
              key={station.code}
              variant="fadeUp"
              delay={0.06 * idx}
            >
              <div
                className="bg-white rounded-2xl border border-slate-200 hover:border-amber-400 overflow-hidden shadow-xs hover:shadow-md transition flex flex-col justify-between group h-full"
              >
                <div>
                  <div className="relative h-48 bg-slate-900 overflow-hidden">
                    <img
                      src={station.image}
                      alt={station.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 bg-slate-950/80 backdrop-blur-xs text-amber-400 text-[11px] font-bold px-2.5 py-0.5 rounded border border-amber-500/30">
                      {station.region}
                    </div>
                    <div className="absolute top-3 right-3 bg-slate-900/80 text-slate-300 text-[10px] font-mono px-2 py-0.5 rounded">
                      {station.year}
                    </div>
                    <div className="absolute bottom-3 left-3 right-3 text-white text-xs font-mono drop-shadow-md">
                      {station.location}
                    </div>
                  </div>

                  <div className="p-5 space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="text-base font-bold text-slate-900 group-hover:text-amber-700 transition">
                        {station.name}
                      </h3>
                      <span className="font-mono text-[10px] bg-slate-100 px-2 py-0.5 rounded font-bold text-slate-600">
                        {station.code}
                      </span>
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed">
                      {station.description}
                    </p>

                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {station.tags.map((tag, i) => (
                        <span key={i} className="text-[10px] font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="px-5 py-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-[11px] font-semibold text-slate-500">Ministry of Earth Sciences</span>
                  <button
                    onClick={() => onNavigate('/expeditions')}
                    className="font-bold text-amber-700 hover:text-amber-900 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform"
                  >
                    <span>Explore Mission</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* 3. DEDICATED SECTION: WHY POLAR SCIENCE MATTERS TO INDIA (MONSOON & CLIMATE) */}
      <section className="bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 text-white py-16 sm:py-20 border-y border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <ScrollReveal variant="fadeLeft">
            <div className="max-w-3xl space-y-3">
              <div className="inline-flex items-center gap-2 text-xs uppercase font-extrabold tracking-wider text-amber-400">
                <CloudRain className="w-4 h-4 text-amber-400" />
                <span>Climate Teleconnections & National Significance</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight font-serif">
                Deep Teleconnections: Polar Science & the Indian Monsoon
              </h2>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                Why Indian scientists travel to Earth's extremes: How changes in Arctic ice, Antarctic currents, and Himalayan glaciers directly impact Indian agriculture, coastal security, and weather patterns.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {monsoonTeleconnections.map((item, idx) => {
              const Icon = item.icon;
              const variantIdx = idx % 2 === 0 ? 'fadeUp' : 'zoomIn';
              return (
                <ScrollReveal
                  key={idx}
                  variant={variantIdx}
                  delay={0.08 * idx}
                >
                  <div
                    className="bg-white/5 border border-white/10 hover:border-amber-400/40 rounded-2xl p-6 transition backdrop-blur-xs space-y-3 h-full"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-bold text-white text-base leading-snug">
                          {item.title}
                        </h3>
                        <span className="text-[11px] text-amber-400 font-medium">
                          {item.hindi}
                        </span>
                      </div>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      {item.summary}
                    </p>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>

          <ScrollReveal variant="fadeUp">
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 text-xs text-slate-300 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <span className="font-bold text-white">National Polar Outreach Mandate:</span>
                <span className="text-slate-400">Translating complex cryospheric science into Hindi and English for researchers, students, and citizens.</span>
              </div>
              <button
                onClick={() => onNavigate('/research')}
                className="px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shrink-0 transition"
              >
                Read Polar Research Papers
              </button>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 4. FEATURED EXPEDITIONS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal variant="fadeRight">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 pb-4 border-b border-slate-200">
            <div>
              <div className="text-xs uppercase font-bold tracking-wider text-amber-800 mb-1">
                Field Operations & Annual Campaigns
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-serif">
                Key Indian Polar Scientific Expeditions
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                Official annual scientific expeditions operating from Antarctica to the High Arctic and Southern Ocean.
              </p>
            </div>

            <button
              onClick={() => onNavigate('/expeditions')}
              className="text-xs font-bold text-amber-800 hover:text-amber-950 flex items-center gap-1 shrink-0"
            >
              <span>View All Expeditions</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {expeditions.map((exp, idx) => (
            <ScrollReveal key={exp.id} variant="fadeUp" delay={0.1 * idx}>
              <div
                onClick={() => onNavigate(`/expeditions/${exp.id}`)}
                className="bg-white rounded-2xl border border-slate-200 hover:border-amber-400 overflow-hidden shadow-xs hover:shadow-md transition cursor-pointer group flex flex-col h-full"
              >
                <div className="relative h-48 bg-slate-900 overflow-hidden">
                  <img
                    src={exp.bannerImage}
                    alt={exp.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-xs text-white text-[11px] font-semibold px-2.5 py-0.5 rounded border border-slate-700">
                    {exp.region}
                  </div>
                  <div className="absolute bottom-3 left-3 right-3 text-white text-xs font-mono font-medium drop-shadow-md">
                    {exp.expeditionNumber || exp.year}
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                  <div className="space-y-1.5">
                    <h3 className="text-base font-bold text-slate-900 leading-snug group-hover:text-amber-800 transition">
                      {exp.name}
                    </h3>
                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                      {exp.overview}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 text-xs text-slate-500 flex items-center justify-between">
                    <span className="truncate max-w-[200px]">{exp.leadStation}</span>
                    <span className="font-semibold text-amber-800 text-[11px] flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                      <span>Briefing</span>
                      <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* 5. FEATURED SCIENTIFIC RESEARCH & OUTREACH */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal variant="fadeLeft">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 pb-4 border-b border-slate-200">
            <div>
              <div className="text-xs uppercase font-bold tracking-wider text-amber-800 mb-1">
                {isHindi ? 'सहकर्मी-सत्यापित ज्ञान' : 'Peer-Verified Knowledge'}
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight font-serif">
                {isHindi
                  ? 'नवीनतम वैज्ञानिक शोध एवं प्रकाशन'
                  : 'Latest Scientific Research & Publications'}
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                {isHindi
                  ? 'प्राथमिक भारतीय अभियान डेटासेट से सीधे प्राप्त सुलभ वैज्ञानिक सारांश एवं खोज रिपोर्ट।'
                  : 'Accessible scientific summaries and discovery reports derived directly from primary Indian expedition datasets.'}
              </p>
            </div>

            <button
              onClick={() => onNavigate('/research')}
              className="text-xs font-bold text-amber-800 hover:text-amber-950 flex items-center gap-1 shrink-0"
            >
              <span>{isHindi ? 'सभी अनुसंधान देखें' : 'View All Research'}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {publishedArticles.map((article, idx) => (
            <ScrollReveal key={article.id} variant="zoomIn" delay={0.1 * idx}>
              <article
                onClick={() => onNavigate(`/content/${article.id}`)}
                className="bg-white rounded-2xl border border-slate-200 hover:border-amber-300 p-6 shadow-xs hover:shadow-md transition cursor-pointer flex flex-col justify-between group space-y-4 h-full"
              >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-amber-900 bg-amber-50 px-2 py-0.5 rounded text-[11px] border border-amber-200">
                      {article.contentType}
                    </span>
                    <span className="text-[11px] text-slate-400 font-mono">
                      {new Date(article.publishedAt || article.updatedAt).toLocaleDateString()}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 leading-snug group-hover:text-amber-800 transition font-serif">
                    {article.title}
                  </h3>

                  <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                    {article.summary}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <span className="font-medium text-slate-700">{article.contributorName}</span>
                  <span className="text-amber-700 font-semibold text-[11px] flex items-center gap-1">
                    <span>Read Paper</span>
                    <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* 6. REPOSITORY MEDIA & VISUAL ARCHIVE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal variant="fadeRight">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 pb-4 border-b border-slate-200">
            <div>
              <div className="text-xs uppercase font-bold tracking-wider text-amber-800 mb-1">
                Photographic & Video Documentation
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight font-serif">
                Polar Media & Visual Gallery
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                Approved expedition photographs, station telemetry moments, and winter polar night captures by Indian scientists.
              </p>
            </div>

            <button
              onClick={() => onNavigate('/media')}
              className="text-xs font-bold text-amber-800 hover:text-amber-950 flex items-center gap-1 shrink-0"
            >
              <span>View Full Gallery</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {mediaItems.map((media, idx) => (
            <ScrollReveal key={media.id} variant={idx % 2 === 0 ? 'fadeUp' : 'blurIn'} delay={0.07 * idx}>
              <div
                onClick={() => onOpenMedia(media.id)}
                className="relative rounded-2xl overflow-hidden group cursor-pointer shadow-xs aspect-4/3 bg-slate-900"
              >
                <img
                  src={media.thumbnail}
                  alt={media.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-900/30 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />

                <div className="absolute bottom-3 inset-x-3 text-white space-y-1">
                  <span className="text-[10px] font-mono font-bold text-amber-400 bg-black/60 px-1.5 py-0.5 rounded">
                    {media.region}
                  </span>
                  <h4 className="text-xs font-bold line-clamp-1 group-hover:text-amber-200 transition">
                    {media.title}
                  </h4>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>
    </div>
  );
};
