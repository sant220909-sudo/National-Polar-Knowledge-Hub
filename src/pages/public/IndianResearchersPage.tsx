import React, { useState } from 'react';
import { store } from '../../services/storage';
import { ScientistMissionLifecycle } from '../../components/common/ScientistMissionLifecycle';
import {
  Compass,
  MapPin,
  Users,
  ShieldCheck,
  Award,
  BookOpen,
  ArrowRight,
  ExternalLink,
  Building,
  CheckCircle2,
  FileText,
  Calendar,
  Layers,
  Thermometer,
  Radio,
  Download,
  Search,
  Sparkles,
  ChevronRight,
  Database,
  Cpu,
  Waves,
  Heart,
  HelpCircle,
  X,
  Send
} from 'lucide-react';

interface IndianResearchersPageProps {
  onNavigate: (route: string) => void;
  onOpenLogin: () => void;
}

export const IndianResearchersPage: React.FC<IndianResearchersPageProps> = ({
  onNavigate,
  onOpenLogin
}) => {
  const [activeTab, setActiveTab] = useState<'stations' | 'roadmap' | 'npdc' | 'scientists' | 'institutes' | 'grants'>('roadmap');
  const [showSampleRequestModal, setShowSampleRequestModal] = useState(false);
  const [selectedStation, setSelectedStation] = useState<string | null>(null);
  const [viewingScientistMissionId, setViewingScientistMissionId] = useState<string | null>(null);

  // Sample request form state
  const [researcherName, setResearcherName] = useState('');
  const [institutionName, setInstitutionName] = useState('');
  const [sampleType, setSampleType] = useState('Ice Core Aliquots (-20°C)');
  const [proposalTitle, setProposalTitle] = useState('');
  const [requestSubmitted, setRequestSubmitted] = useState(false);

  const indianStations = [
    {
      id: 'bharati',
      name: 'Bharati Station',
      code: 'IND-ANT-02',
      region: 'East Antarctica',
      coordinates: '69°24′S, 76°11′E (Larsemann Hills)',
      commissioned: '18 March 2012',
      telemetry: 'Real-time ISRO GSAT-11 / Inmarsat BGAN High-Speed Link to NRSC Hyderabad & NCPOR Goa',
      elevation: '35 m AMSL',
      capacity: '47 Summer / 24 Wintering Personnel',
      temperature: '-12°C to -45°C (Extreme wind gusts: 180 km/h)',
      image: 'https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?auto=format&fit=crop&q=80&w=800',
      description: 'India\'s state-of-the-art third Antarctic base, constructed on stilts to prevent snow drift accumulation. Features zero-effluent discharge technology, gray-water recycling, cogeneration heating, and advanced optical sounding laboratories.',
      scientificDisciplines: ['Atmospheric Chemistry', 'Geomagnetism', 'Satellite Calibration', 'Ocean Acoustic Mooring', 'Human Physiology'],
      facilities: ['Clean room chemistry lab', 'ISRO Earth Station telemetry terminal', 'Medical surgery suite', 'Hydroponics greenhouse']
    },
    {
      id: 'maitri',
      name: 'Maitri Station',
      code: 'IND-ANT-01',
      region: 'East Antarctica',
      coordinates: '70°45′S, 11°44′E (Schirmacher Oasis)',
      commissioned: '1989 (Continuous multi-decadal operation)',
      telemetry: 'Satellite link to IMD New Delhi and IIG Mumbai for geomagnetic pulsations',
      elevation: '117 m AMSL (Ice-free rocky oasis)',
      capacity: '65 Summer / 25 Wintering Personnel',
      temperature: '-5°C to -40°C',
      image: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?auto=format&fit=crop&q=80&w=800',
      description: 'India\'s historic second Antarctic station, situated on the ice-free rocky oasis of Schirmacher Oasis beside Lake Priyadarshini. Holds unbroken 35-year meteorological time-series, paleolimnology records, and seismological telemetry.',
      scientificDisciplines: ['Meteorological Time Series', 'Seismology', 'Paleolimnology', 'Aerosol Dynamics', 'Solid Earth Geophysics'],
      facilities: ['Lake Priyadarshini water processing plant', 'IMD Upper-air radiosonde station', 'Geodetic GPS lab', 'Heavy workshop']
    },
    {
      id: 'himadri',
      name: 'Himadri Station',
      code: 'IND-ARC-01',
      region: 'High Arctic (Norway)',
      coordinates: '78°55′N, 11°56′E (Ny-Ålesund, Spitsbergen, Svalbard)',
      commissioned: '2 July 2008 (Year-round wintering since 2023)',
      telemetry: 'Kings Bay AS high-speed fiber connected to Svalbard Undersea Cable',
      elevation: '15 m AMSL',
      capacity: '8 Winter / 12 Summer Researchers',
      temperature: '-8°C to -35°C (Polar Night Nov–Feb)',
      image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=800',
      description: 'India\'s permanent Arctic research base in the international research village of Ny-Ålesund at 79° North. Investigates Arctic amplification, teleconnections with the Indian Summer Monsoon, glacial retreat, and long-range aerosol transport.',
      scientificDisciplines: ['Arctic Aerosol Radiative Forcing', 'Fjord Biogeochemistry', 'Monsoon-Arctic Teleconnections', 'Space Weather', 'Microbial Ecology'],
      facilities: ['Gruvebadet Atmospheric Laboratory access', 'Marine microbiology clean room', 'MS Teisten fjord research boat']
    },
    {
      id: 'indarc',
      name: 'IndARC Subsurface Mooring',
      code: 'IND-ARC-MOORING',
      region: 'Arctic Ocean',
      coordinates: 'Kongsfjorden Fjord (79°N, 192 m water depth)',
      commissioned: '2014 (Annual redeployment and servicing)',
      telemetry: 'Acoustic release data extraction and Argos satellite beacon',
      elevation: 'Subsurface 192 m seafloor anchor',
      capacity: 'Autonomous Multi-Sensor Array',
      temperature: '-1.8°C to +4.5°C (Seawater thermocline)',
      image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&q=80&w=800',
      description: 'India\'s first underwater multi-sensor moored observatory in the Arctic. Measures temperature, salinity, currents, and acoustic profiles 24/7/365 to record warm Atlantic water inflow (Atlantification) impacting global climate.',
      scientificDisciplines: ['Physical Oceanography', 'Atlantification Tracking', 'Acoustic Sounding', 'Halocline Profiling'],
      facilities: ['CTD profilers', 'ADCP ocean current meters', 'Oxygen optodes', 'Sediment traps']
    },
    {
      id: 'himansh',
      name: 'Himansh High-Altitude Observatory',
      code: 'IND-HIM-01',
      region: 'Himalayas / Third Pole',
      coordinates: 'Chandra Basin, Lahaul-Spiti, Himachal Pradesh',
      commissioned: '2016 (Established by NCPOR)',
      telemetry: 'VSAT satellite data transmitter connected to NCPOR Headquarters Goa',
      elevation: '4,080 m AMSL (13,500 ft high-altitude)',
      capacity: '12 Glaciologists & Field Technicians',
      temperature: '-5°C to -30°C in winter',
      image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=800',
      description: 'Dedicated high-altitude research base studying the Himalayan Cryosphere (the Third Pole). Monitored glaciers include Chhota Shigri, Samudra Tapu, Batal, and Sutri Dhaka, providing benchmark mass balance data vital for national water security.',
      scientificDisciplines: ['Himalayan Glaciology', 'Glacier Mass Balance', 'Discharge Runoff Modeling', 'Black Carbon Deposition', 'Permafrost Monitoring'],
      facilities: ['Automatic Weather Stations (AWS)', 'Steam ice drill rigs', 'Snow water equivalent radiometers', 'DGPS geodetic markers']
    },
    {
      id: 'orv-fleet',
      name: 'Polar Oceanographic Fleet (ORV Sagar Nidhi & Sagar Kanya)',
      code: 'IND-VESSEL-FLEET',
      region: 'Southern Ocean & Polar Seas',
      coordinates: 'Indian Ocean Sector of the Southern Ocean (40°S to 70°S)',
      commissioned: 'Active Fleet Operations',
      telemetry: 'Real-time Inmarsat C & FleetBroadband maritime telemetry',
      elevation: 'Surface to 6,000m abyssal plain depth',
      capacity: 'Up to 35 Scientists per Southern Ocean Cruise',
      temperature: 'Open water to sea ice edge (-2°C to +15°C)',
      image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&q=80&w=800',
      description: 'Ice-class oceanographic research vessels equipped for deep-sea sampling, multi-beam bathymetry, CTD rosettes, and biological plankton net trawling along the 57°E Meridian from Mauritius to the Antarctic coast.',
      scientificDisciplines: ['Southern Ocean Biogeochemistry', 'Biological Carbon Pump', 'Antarctic Circumpolar Current', 'Paleoceanography'],
      facilities: ['24-bottle CTD Rosette', 'Multi-beam echosounder', 'Gravity core winch', 'Underway pCO2 analyzer']
    }
  ];

  const expeditionRoadmapSteps = [
    {
      step: '01',
      title: 'Call for Proposals under PACER Scheme',
      hindi: 'प्रस्ताव आमंत्रण (पेसर योजना)',
      institution: 'NCPOR / MoES, New Delhi & Goa',
      duration: 'Annual Cycle: June – August',
      description: 'Indian university professors, research scholars, IIT/IISc faculty, and national laboratory scientists submit detailed polar research proposals under the Polar Science and Cryosphere Research (PACER) umbrella. Areas include Glaciology, Atmospheric Physics, Polar Marine Biology, Space Weather, and Solid Earth Geosciences.',
      documents: ['PACER Proposal Proforma', 'Institutional Endorsement Certificate', 'Equipment Weight & Power Specifications']
    },
    {
      step: '02',
      title: 'Expert Peer Review & Task Force Evaluation',
      hindi: 'विशेषज्ञ कार्यदल द्वारा मूल्यांकन',
      institution: 'National Committee on Polar Expeditions',
      duration: 'September',
      description: 'Proposals undergo strict peer review by eminent Indian scientists. Projects are evaluated on scientific merit, relevance to Indian weather and monsoon teleconnections, logistics feasibility in Antarctica/Arctic, and compliance with the Antarctic Treaty.',
      documents: ['Evaluation Scorecard', 'Field Logistics Feasibility Report', 'Co-investigator Approvals']
    },
    {
      step: '03',
      title: 'Comprehensive Polar Medical Screening',
      hindi: 'कठोर ध्रुवीय चिकित्सा परीक्षण',
      institution: 'AIIMS (All India Institute of Medical Sciences), New Delhi',
      duration: 'September – October',
      description: 'Every shortlisted Indian researcher undergoes exhaustive physiological and psychological tests: sub-zero cold chamber endurance, treadmill stress tests, pulmonary spirometry, audiometry, and psychiatric evaluation for prolonged winter isolation at Bharati/Maitri.',
      documents: ['AIIMS Medical Fitness Certificate', 'Blood Group & Serum Bank Card', 'Psychological Readiness Certificate']
    },
    {
      step: '04',
      title: 'Snowcraft & Polar Survival Training',
      hindi: 'हिमशिल्प एवं ध्रुवीय उत्तरजीविता प्रशिक्षण',
      institution: 'ITBP Mountaineering and Skiing Institute (Auli, Uttarakhand) & DRDO-DGRE Manali',
      duration: 'October (2 Weeks in Himalayas)',
      description: 'Intensive snowcraft conditioning conducted in high-altitude Himalayan snowfields: crevasse extraction, blizzard shelter construction, glacier rope team traversal, GPS navigation during whiteout conditions, and cold-weather clothing protocol.',
      documents: ['ITBP Snowcraft Certificate', 'Wilderness First Aid Qualification', 'Survival Gear Issue Slips']
    },
    {
      step: '05',
      title: 'Environmental Clearance under Indian Antarctic Act 2022',
      hindi: 'पर्यावरण मंजूरी (भारतीय अंटार्कटिका अधिनियम २०२२)',
      institution: 'Committee on Antarctic Governance and Environmental Protection (CAG-EP), MoES',
      duration: 'November',
      description: 'Enacted by the Parliament of India, the landmark Indian Antarctic Act, 2022 mandates statutory permits for every Indian expedition participant. Covers strict zero-waste protocol, non-native species prevention, and prohibition of mineral prospecting.',
      documents: ['Antarctic Activity Permit (Form I)', 'Waste Management Undertaking', 'Biosecurity Sanitization Certificate']
    },
    {
      step: '06',
      title: 'Departure & Antarctic Field Deployment',
      hindi: 'प्रस्थान एवं ध्रुवीय कार्यक्षेत्र परिनियोजन',
      institution: 'Transit via Cape Town (Antarctica) / Oslo & Longyearbyen (Arctic)',
      duration: 'November (Antarctica) / June (Arctic)',
      description: 'Final briefing at NCPOR Goa, followed by embarkation on chartered polar icebreaker from Cape Town to Bharati (Prydz Bay) and Maitri (Queen Maud Land), or flight to Svalbard for Himadri operations.',
      documents: ['Diplomatic Transit Visa', 'Expedition ID Card', 'Satellite Comm Authorization']
    }
  ];

  const prominentScientists = [
    {
      name: 'Dr. Syed Zahoor Qasim',
      hindi: 'डॉ. सैयद जहूर कासिम',
      title: 'Leader of India\'s 1st Antarctic Expedition (1981–82)',
      institution: 'Department of Ocean Development (Now MoES)',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300',
      contribution: 'Known as the "Father of Indian Polar Research". Led Operation Gangotri in 1981, landing India\'s first scientific team on Antarctica on January 9, 1982, establishing India\'s permanent presence in the southern continent.',
      badge: 'Expedition Pioneer (1981)'
    },
    {
      name: 'Dr. Aditi Pant & Dr. Sudipta Sengupta',
      hindi: 'डॉ. अदिति पंत एवं डॉ. सुदीप्ता सेनगुप्ता',
      title: 'First Indian Women Scientists on Antarctica (1983)',
      institution: 'NIO Goa / Jadavpur University',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=300',
      contribution: 'Pioneered marine biological and structural geological studies during the 3rd Indian Antarctic Expedition, becoming the first Indian women to conduct scientific research on Antarctic soil and establish Dakshin Gangotri.',
      badge: 'Antarctica Trailblazers'
    },
    {
      name: 'Dr. Thamban Meloth',
      hindi: 'डॉ. थम्बन मेलोथ',
      title: 'Director, NCPOR & Lead Paleoclimatologist',
      institution: 'National Centre for Polar and Ocean Research (NCPOR), MoES',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=300',
      contribution: 'Leading ice core paleoclimatologist of India. Has drilled deep ice cores across Dronning Maud Land and Princess Elizabeth Land, reconstructing centuries of Southern Ocean atmospheric teleconnections and Antarctic climate history.',
      badge: 'National Geoscience Awardee'
    },
    {
      name: 'Dr. Rahul Mohan',
      hindi: 'डॉ. राहुल मोहन',
      title: 'Scientist-F & Lead Micropaleontologist',
      institution: 'Polar Sciences Group, NCPOR, Goa',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=300',
      contribution: 'Specialist in Southern Ocean diatom taxonomy and polar paleoceanography. Veteran of over a dozen polar campaigns, leading environmental reconstructions bridging the Antarctic Polar Front with the Indian monsoon.',
      badge: 'Southern Ocean Lead'
    },
    {
      name: 'Dr. K. P. Krishnan',
      hindi: 'डॉ. के. पी. कृष्णन',
      title: 'Scientist-E & Arctic Operations In-Charge',
      institution: 'Arctic Research Wing, NCPOR',
      image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=300',
      contribution: 'Pioneered Indian marine microbiological and biogeochemical investigations in Kongsfjorden, Svalbard. Instrument in operating the IndARC subsurface mooring and establishing India\'s year-round Arctic research footprint.',
      badge: 'Arctic Campaign Lead'
    },
    {
      name: 'Dr. Parmanand Sharma',
      hindi: 'डॉ. परमानंद शर्मा',
      title: 'Lead Glaciologist, Himansh High-Altitude Station',
      institution: 'Himalayan Cryosphere Wing, NCPOR',
      image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=300',
      contribution: 'Spearheads high-altitude glaciological expeditions in Himachal Pradesh and Ladakh (the Third Pole), tracking mass balance and runoff of major Himalayan glaciers feeding the Indus and Ganga river systems.',
      badge: 'Third Pole Specialist'
    }
  ];

  const collaboratingInstitutes = [
    { name: 'NCPOR', fullName: 'National Centre for Polar and Ocean Research', city: 'Goa', role: 'Nodal Autonomous Institution under MoES', icon: Building },
    { name: 'IMD', fullName: 'India Meteorological Department', city: 'New Delhi', role: 'Continuous Weather Stations & Radiosonde Observations at Bharati & Maitri', icon: Thermometer },
    { name: 'IIG', fullName: 'Indian Institute of Geomagnetism', city: 'Mumbai', role: 'Geomagnetic Pulsation and Upper-Atmospheric Soundings', icon: Radio },
    { name: 'SAC-ISRO', fullName: 'Space Applications Centre, ISRO', city: 'Ahmedabad', role: 'Satellite Altimetry Calibration & Polar Ice Sheet Remote Sensing', icon: Cpu },
    { name: 'NRSC-ISRO', fullName: 'National Remote Sensing Centre', city: 'Hyderabad', role: 'Bharati Direct Satellite Ground Station Downlink Reception', icon: Radio },
    { name: 'CSIR-NIO', fullName: 'National Institute of Oceanography', city: 'Goa', role: 'Southern Ocean Biogeochemistry and Benthic Fauna Studies', icon: Waves },
    { name: 'CSIR-NGRI', fullName: 'National Geophysical Research Institute', city: 'Hyderabad', role: 'Seismic and Geodetic Studies of Antarctic Continental Crust', icon: Layers },
    { name: 'WIHG', fullName: 'Wadia Institute of Himalayan Geology', city: 'Dehradun', role: 'Cryospheric Evolution and Glacio-Hydrological Modeling', icon: MapPin },
    { name: 'IIT Bombay & Roorkee', fullName: 'Indian Institutes of Technology', city: 'Mumbai & Roorkee', role: 'Glacier Melt Runoff Modeling and Ice Core Stable Isotope Geochemistry', icon: Award },
    { name: 'IISc Bengaluru', fullName: 'Indian Institute of Science (Divecha Centre)', city: 'Bengaluru', role: 'Atmospheric Aerosols and Monsoon Teleconnection Theory', icon: BookOpen },
    { name: 'DRDO-DGRE', fullName: 'Defence Geoinformatics Research Establishment', city: 'Chandigarh', role: 'Snow Avalanche Dynamics, Glaciology & Survival Conditioning', icon: ShieldCheck },
    { name: 'ITBP', fullName: 'Indo-Tibetan Border Police (Auli)', city: 'Uttarakhand', role: 'Pre-Expedition Polar Survival, Crevasse Rescue & High Altitude Conditioning', icon: ShieldCheck }
  ];

  const handleSampleRequestSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!researcherName || !institutionName || !proposalTitle) return;
    setRequestSubmitted(true);
    setTimeout(() => {
      setRequestSubmitted(false);
      setShowSampleRequestModal(false);
      setResearcherName('');
      setInstitutionName('');
      setProposalTitle('');
    }, 3000);
  };

  return (
    <div className="space-y-12 pb-24 text-slate-900 bg-slate-50/50">
      {/* 1. HERO BANNER: PROUDLY INDIAN POLAR SCIENCE IDENTITY */}
      <section className="relative bg-slate-950 text-white overflow-hidden border-b border-slate-800">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?auto=format&fit=crop&q=80&w=1800"
            alt="Bharati Station, Indian Antarctic Programme"
            className="w-full h-full object-cover object-center opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900/95 to-slate-950/80" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="max-w-4xl space-y-5">
            {/* National Sovereign Strip */}
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-slate-900/90 border border-amber-500/50 text-amber-300 text-xs font-semibold shadow-md">
              <span className="text-base leading-none">🇮🇳</span>
              <span className="text-amber-400 font-bold tracking-wider uppercase font-sans">
                भारतीय ध्रुवीय अनुसंधान समुदाय एवं वैज्ञानिक पोर्टल
              </span>
              <span className="text-slate-500">|</span>
              <span className="text-slate-300">MoES · NCPOR</span>
            </div>

            <div className="space-y-2">
              <span className="text-xs uppercase font-extrabold tracking-widest text-amber-500 block">
                Ministry of Earth Sciences, Government of India
              </span>
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight font-serif">
                ध्रुवीय शोधकर्ताओं का राष्ट्रीय मंच
              </h1>
              <p className="text-lg sm:text-2xl font-bold text-sky-200">
                Indian Polar Researchers & Sovereign Cryospheric Science Gateway
              </p>
            </div>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-sans max-w-3xl">
              Dedicated operational portal for Indian scientists, university faculty, post-doctoral fellows, and research scholars conducting pioneering expeditions across <strong>Antarctica (Bharati, Maitri)</strong>, the <strong>High Arctic (Himadri, IndARC)</strong>, the <strong>Southern Ocean</strong>, and the <strong>Himalayan Third Pole (Himansh)</strong> under the <strong>Indian Antarctic Act, 2022</strong> and the <strong>PACER Scheme</strong>.
            </p>

            {/* Quick Action Badges */}
            <div className="flex flex-wrap items-center gap-3 pt-3">
              <button
                onClick={() => setShowSampleRequestModal(true)}
                className="px-5 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs tracking-wider uppercase shadow-md transition flex items-center gap-2"
              >
                <Database className="w-4 h-4 text-slate-950" />
                <span>नमूना एवं डेटा अनुरोध (Request Sample/Data)</span>
              </button>

              <button
                onClick={() => setActiveTab('roadmap')}
                className="px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs tracking-wider uppercase border border-slate-700 transition flex items-center gap-2"
              >
                <Compass className="w-4 h-4 text-sky-400" />
                <span>अभियान चयन प्रक्रिया (Selection Roadmap)</span>
              </button>

              <button
                onClick={onOpenLogin}
                className="px-4 py-3 rounded-xl bg-indigo-900/60 hover:bg-indigo-800 text-indigo-200 font-semibold text-xs tracking-wider uppercase border border-indigo-500/40 transition flex items-center gap-1.5"
              >
                <ShieldCheck className="w-4 h-4 text-indigo-400" />
                <span>Scientist Login</span>
              </button>
            </div>

            {/* Live Station Coordinates Micro-Ticker */}
            <div className="pt-6 border-t border-slate-800 text-xs text-slate-300 flex items-center gap-2 flex-wrap">
              <span className="font-bold text-amber-400 flex items-center gap-1">
                <span>🇮🇳 भारत के ६ ध्रुवीय केंद्र:</span>
              </span>
              <span className="bg-slate-900 px-2 py-0.5 rounded border border-slate-800 text-slate-300">भारती (69°S, 76°E)</span>
              <span className="text-slate-600">·</span>
              <span className="bg-slate-900 px-2 py-0.5 rounded border border-slate-800 text-slate-300">मैत्री (70°S, 11°E)</span>
              <span className="text-slate-600">·</span>
              <span className="bg-slate-900 px-2 py-0.5 rounded border border-slate-800 text-slate-300">हिमाद्रि (79°N, 12°E)</span>
              <span className="text-slate-600">·</span>
              <span className="bg-slate-900 px-2 py-0.5 rounded border border-slate-800 text-slate-300">इन्डआर्क (192m गहराई)</span>
              <span className="text-slate-600">·</span>
              <span className="bg-slate-900 px-2 py-0.5 rounded border border-slate-800 text-slate-300">हिमांश (4,080m हिमाचल)</span>
              <span className="text-slate-600">·</span>
              <span className="bg-slate-900 px-2 py-0.5 rounded border border-slate-800 text-slate-300">सागर निधि (पोत)</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. NAVIGATION TABS FOR RESEARCHER HUB */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl border border-slate-200 p-2 shadow-xs">
          <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
            <button
              onClick={() => setActiveTab('roadmap')}
              className={`px-4 py-2.5 rounded-xl font-bold transition flex items-center gap-2 shrink-0 ${
                activeTab === 'roadmap'
                  ? 'bg-amber-600 text-white shadow-xs'
                  : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
              }`}
            >
              <Compass className="w-4 h-4" />
              <span>Expedition Selection Roadmap</span>
            </button>

            <button
              onClick={() => setActiveTab('stations')}
              className={`px-4 py-2.5 rounded-xl font-bold transition flex items-center gap-2 shrink-0 ${
                activeTab === 'stations'
                  ? 'bg-amber-600 text-white shadow-xs'
                  : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
              }`}
            >
              <MapPin className="w-4 h-4" />
              <span>Polar Bases & Laboratories</span>
            </button>

            <button
              onClick={() => setActiveTab('npdc')}
              className={`px-4 py-2.5 rounded-xl font-bold transition flex items-center gap-2 shrink-0 ${
                activeTab === 'npdc'
                  ? 'bg-amber-600 text-white shadow-xs'
                  : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
              }`}
            >
              <Database className="w-4 h-4" />
              <span>National Polar Data Center (NPDC)</span>
            </button>

            <button
              onClick={() => setActiveTab('scientists')}
              className={`px-4 py-2.5 rounded-xl font-bold transition flex items-center gap-2 shrink-0 ${
                activeTab === 'scientists'
                  ? 'bg-amber-600 text-white shadow-xs'
                  : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
              }`}
            >
              <Users className="w-4 h-4" />
              <span>Scientific Leadership & Pioneers</span>
            </button>

            <button
              onClick={() => setActiveTab('institutes')}
              className={`px-4 py-2.5 rounded-xl font-bold transition flex items-center gap-2 shrink-0 ${
                activeTab === 'institutes'
                  ? 'bg-amber-600 text-white shadow-xs'
                  : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
              }`}
            >
              <Building className="w-4 h-4" />
              <span>National Scientific Consortium</span>
            </button>

            <button
              onClick={() => setActiveTab('grants')}
              className={`px-4 py-2.5 rounded-xl font-bold transition flex items-center gap-2 shrink-0 ${
                activeTab === 'grants'
                  ? 'bg-amber-600 text-white shadow-xs'
                  : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
              }`}
            >
              <Award className="w-4 h-4" />
              <span>PACER Grants & Fellowships</span>
            </button>
          </div>
        </div>
      </section>

      {/* 3. TAB CONTENT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* TAB 1: ROADMAP */}
        {activeTab === 'roadmap' && (
          <div className="space-y-8 animate-fadeIn">
            <div className="bg-gradient-to-r from-amber-900/10 via-slate-900/5 to-slate-900/10 rounded-3xl p-6 sm:p-8 border border-amber-500/30 space-y-3">
              <div className="flex items-center gap-2 text-xs uppercase font-extrabold tracking-wider text-amber-800">
                <ShieldCheck className="w-4 h-4 text-amber-700" />
                <span>Statutory Governance Under Indian Antarctic Act, 2022</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 font-serif">
                भारतीय ध्रुवीय अभियान चयन एवं प्रशिक्षण मार्गदर्शिका
              </h2>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed max-w-4xl">
                The National Centre for Polar and Ocean Research (NCPOR), Ministry of Earth Sciences, conducts an annual transparent, peer-reviewed national selection process for Indian researchers desirous of joining scientific expeditions to Antarctica (ISEA), the Arctic, or the Southern Ocean.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {expeditionRoadmapSteps.map((step) => (
                <div
                  key={step.step}
                  className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs hover:border-amber-400 transition flex flex-col justify-between space-y-4 relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-16 h-16 bg-amber-500/10 rounded-bl-3xl flex items-start justify-end p-2.5 font-mono font-black text-amber-700 text-lg">
                    {step.step}
                  </div>

                  <div className="space-y-2">
                    <span className="text-[10px] font-mono font-bold text-amber-800 uppercase tracking-widest block">
                      Phase {step.step} · {step.duration}
                    </span>
                    <h3 className="text-base font-bold text-slate-900 leading-snug">
                      {step.title}
                    </h3>
                    <div className="text-[11px] font-bold text-amber-700">{step.hindi}</div>
                    <div className="text-[11px] font-semibold text-slate-500 flex items-center gap-1 pt-0.5">
                      <Building className="w-3.5 h-3.5 text-slate-400" />
                      <span>{step.institution}</span>
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed pt-2">
                      {step.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 space-y-1.5 text-[11px]">
                    <span className="font-bold text-slate-800 block text-[10px] uppercase tracking-wider">
                      Mandatory Documentation:
                    </span>
                    {step.documents.map((doc, idx) => (
                      <div key={idx} className="flex items-center gap-1.5 text-slate-600">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>{doc}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Special Callout: AIIMS & ITBP Training Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
              <div className="p-6 rounded-2xl bg-white border border-slate-200 space-y-3 shadow-xs">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-rose-50 text-rose-700 border border-rose-200">
                    <Heart className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">AIIMS New Delhi Medical Protocol</h4>
                    <span className="text-[11px] text-slate-500">Comprehensive Pre-Deployment Physical & Psychological Clearance</span>
                  </div>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Indian polar expeditions experience continuous isolation, extreme cold down to -45°C, and 4-month polar nights. AIIMS New Delhi assesses bone density, cardiovascular reserves, dental integrity (dental emergencies cannot be evacuated mid-winter), cold-induced bronchospasm, and psychological resilience.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-white border border-slate-200 space-y-3 shadow-xs">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-amber-50 text-amber-700 border border-amber-200">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">ITBP Auli & DGRE Snowcraft School</h4>
                    <span className="text-[11px] text-slate-500">Himalayan Cold-Weather Survival Conditioning</span>
                  </div>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Conducted at 10,000 ft in Auli by Indo-Tibetan Border Police (ITBP) master mountaineers. Scientists master snowmobile handling, self-arrest with ice-axes, crevasse rope rescue, radio protocol during blizzards, and cold injury hypothermia first aid before deployment.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: RESEARCH STATIONS */}
        {activeTab === 'stations' && (
          <div className="space-y-8 animate-fadeIn">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-3 border-b border-slate-200">
              <div>
                <span className="text-xs font-bold text-amber-700 uppercase tracking-wider block">
                  Sovereign Infrastructure
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-serif">
                  भारत के ६ ध्रुवीय अनुसंधान केंद्र एवं वेधशालाएं
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 mt-1">
                  Permanent operational bases in Antarctica, the Arctic, the Himalayas, and oceanographic vessels operated by MoES.
                </p>
              </div>
              <div className="text-xs text-slate-500 font-mono">
                Full Technical Specifications
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {indianStations.map((station) => (
                <div
                  key={station.id}
                  className="bg-white rounded-2xl border border-slate-200 hover:border-amber-400 overflow-hidden shadow-xs hover:shadow-md transition flex flex-col justify-between group"
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
                        {station.code}
                      </div>
                      <div className="absolute bottom-3 left-3 right-3 text-white text-xs font-mono drop-shadow-md">
                        {station.coordinates}
                      </div>
                    </div>

                    <div className="p-5 space-y-3">
                      <div>
                        <h3 className="text-base font-bold text-slate-900 group-hover:text-amber-700 transition">
                          {station.name}
                        </h3>
                        <div className="text-[11px] text-slate-500 mt-0.5">
                          Commissioned: <strong>{station.commissioned}</strong> · Capacity: <strong>{station.capacity}</strong>
                        </div>
                      </div>

                      <p className="text-xs text-slate-600 leading-relaxed">
                        {station.description}
                      </p>

                      <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-[11px] space-y-1">
                        <span className="font-bold text-slate-800 block text-[10px] uppercase tracking-wider">
                          Key Research Laboratories:
                        </span>
                        <div className="flex flex-wrap gap-1">
                          {station.scientificDisciplines.map((d, idx) => (
                            <span key={idx} className="px-2 py-0.5 rounded-md bg-amber-50 text-amber-900 font-semibold text-[10px] border border-amber-200/60">
                              {d}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="text-[11px] text-slate-500">
                        <span className="font-semibold text-slate-700">Telemetry: </span>
                        <span>{station.telemetry}</span>
                      </div>
                    </div>
                  </div>

                  <div className="px-5 py-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="text-[11px] font-mono text-slate-500">NCPOR · MoES</span>
                    <button
                      onClick={() => onNavigate('/expeditions')}
                      className="font-bold text-amber-700 hover:text-amber-900 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform"
                    >
                      <span>Expedition Archives</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: NPDC DATA & SAMPLE REPOSITORY */}
        {activeTab === 'npdc' && (
          <div className="space-y-8 animate-fadeIn">
            <div className="bg-gradient-to-r from-sky-950 via-slate-900 to-indigo-950 rounded-3xl p-6 sm:p-8 text-white border border-sky-800 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="space-y-3 max-w-2xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/20 text-sky-300 text-xs font-semibold border border-sky-400/30">
                  <Database className="w-3.5 h-3.5" />
                  <span>National Polar Data Center (NPDC)</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight font-serif">
                  Data & Physical Sample Repository for Indian Scientists
                </h2>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  NCPOR operates the official National Polar Data Center (NPDC), maintaining primary physical samples and digital telemetry from 44+ Antarctic, 17 Arctic, and 14 Southern Ocean expeditions. Indian university researchers, IIT/IISc scholars, and government scientists can submit formal requests for aliquot sampling and open dataset access.
                </p>
              </div>

              <button
                onClick={() => setShowSampleRequestModal(true)}
                className="px-6 py-3.5 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider shadow-lg transition shrink-0 flex items-center gap-2"
              >
                <Database className="w-4 h-4 text-slate-950" />
                <span>Submit Sample Request</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-3 shadow-xs">
                <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-700 flex items-center justify-center font-bold">
                  ❄️
                </div>
                <h3 className="font-bold text-slate-900 text-base">Ice Core Cryo-Repository (-20°C)</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Preserved in sub-zero clean-room vaults at NCPOR Goa. Includes high-resolution ice cores from Coastal Dronning Maud Land (102m, IND-25), Central Dronning Maud Land (60m), and Princess Elizabeth Land (180m, ISEA-42).
                </p>
                <div className="text-[11px] font-semibold text-sky-800 pt-2">
                  Parameters: δ18O, δD, Sea-salt ions (Na+, Cl-, SO42-), MSA, dust micro-particles.
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-3 shadow-xs">
                <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center font-bold">
                  🌊
                </div>
                <h3 className="font-bold text-slate-900 text-base">Southern Ocean CTD & Hydrography</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Continuous conductivity-temperature-depth (CTD) hydrographic casts along the 57°E Meridian from 40°S (Subtropical Front) to 69°S (Antarctic Continental Shelf).
                </p>
                <div className="text-[11px] font-semibold text-teal-800 pt-2">
                  Parameters: Potential temperature, absolute salinity, dissolved oxygen, nutrients (nitrate, phosphate, silicate), pCO2.
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-3 shadow-xs">
                <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center font-bold">
                  🔬
                </div>
                <h3 className="font-bold text-slate-900 text-base">Polar Microfossil & Diatom Slide Archive</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Over 15,000 reference diatom slide mounts and lake sediment core archives from Schirmacher Oasis and Larsemann Hills freshwater bodies, cataloged with taxonomic classifications.
                </p>
                <div className="text-[11px] font-semibold text-purple-800 pt-2">
                  Parameters: Fragilariopsis kerguelensis, Chaetoceros resting spores, paleolimnology varves.
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: SCIENTISTS DIRECTORY */}
        {activeTab === 'scientists' && (
          <div className="space-y-8 animate-fadeIn">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-3 border-b border-slate-200">
              <div>
                <span className="text-xs font-bold text-amber-700 uppercase tracking-wider block">
                  National Scientific Leadership
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-serif">
                  Indian Polar Scientific Leadership & Pioneers
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 mt-1">
                  Profiles of pioneering and active Indian researchers who established and expanded India's sovereign footprint across Earth's cryosphere.
                </p>
              </div>
              <div className="text-xs text-slate-500 font-mono">
                Historical & Active Directors
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {prominentScientists.map((scientist, idx) => {
                const userMatch = store.getUsers().find((u) =>
                  u.name.toLowerCase().includes(scientist.name.toLowerCase().replace('dr. ', '')) ||
                  scientist.name.toLowerCase().includes(u.name.toLowerCase())
                );
                const mission = userMatch ? store.getScientistMission(userMatch.id) : null;

                return (
                  <div
                    key={idx}
                    className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs hover:border-amber-400 transition flex flex-col justify-between space-y-4 group"
                  >
                    <div className="flex items-start gap-4">
                      <img
                        src={scientist.image}
                        alt={scientist.name}
                        className="w-16 h-16 rounded-2xl object-cover border border-slate-200 shrink-0 shadow-xs"
                      />
                      <div className="space-y-1">
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200 font-bold">
                          {scientist.badge}
                        </span>
                        <h3 className="font-bold text-slate-900 text-base leading-snug group-hover:text-amber-800 transition">
                          {scientist.name}
                        </h3>
                        <div className="text-xs font-bold text-amber-700">{scientist.hindi}</div>
                        <div className="text-[11px] text-slate-500 font-medium">{scientist.title}</div>
                      </div>
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                      {scientist.contribution}
                    </p>

                    {/* Mission Lifecycle Progression & Milestones */}
                    {mission && mission.showInPublicProfile !== false && (
                      <div className="p-3 bg-sky-50/70 border border-sky-200 rounded-xl space-y-2">
                        <div className="flex items-center justify-between text-[10px]">
                          <span className="font-bold text-sky-900 uppercase tracking-wider flex items-center gap-1">
                            <Compass className="w-3.5 h-3.5 text-sky-600" />
                            <span>Mission Lifecycle</span>
                          </span>
                          <span className="font-mono font-bold text-sky-800 bg-white px-1.5 py-0.2 rounded border border-sky-300">
                            {mission.overallPercent}%
                          </span>
                        </div>

                        <div className="text-[11px] font-bold text-slate-800 truncate">
                          {mission.currentPhase}
                        </div>

                        <div className="w-full h-1.5 bg-sky-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-sky-500 to-emerald-500"
                            style={{ width: `${mission.overallPercent}%` }}
                          />
                        </div>

                        <div className="flex items-center justify-between pt-1 text-[10px]">
                          <span className="text-slate-500 truncate max-w-[130px] font-mono">
                            {mission.expeditionNumber || 'Active Expedition'}
                          </span>
                          <button
                            onClick={() => userMatch && setViewingScientistMissionId(userMatch.id)}
                            className="font-bold text-sky-700 hover:text-sky-900 underline flex items-center gap-0.5 cursor-pointer"
                          >
                            <span>View Milestones →</span>
                          </button>
                        </div>
                      </div>
                    )}

                    <div className="pt-2 text-[11px] text-slate-500 flex items-center justify-between">
                      <span className="truncate max-w-[200px]">{scientist.institution}</span>
                      <span className="font-mono text-amber-700 font-bold">MoES</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 5: INSTITUTES NETWORK */}
        {activeTab === 'institutes' && (
          <div className="space-y-8 animate-fadeIn">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-3 border-b border-slate-200">
              <div>
                <span className="text-xs font-bold text-amber-700 uppercase tracking-wider block">
                  Collaborative Consortium
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-serif">
                  National Scientific Consortium (Collaboration Network)
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 mt-1">
                  12+ premier Indian institutes and defense organizations actively participating in annual polar expeditions.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {collaboratingInstitutes.map((inst, idx) => {
                const Icon = inst.icon;
                return (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-amber-300 transition space-y-2 shadow-xs"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <div className="p-2 rounded-xl bg-amber-50 text-amber-800 border border-amber-200">
                          <Icon className="w-4 h-4" />
                        </div>
                        <span className="font-extrabold text-slate-900 text-sm">{inst.name}</span>
                      </div>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                        {inst.city}
                      </span>
                    </div>
                    <div className="text-xs font-semibold text-slate-800">{inst.fullName}</div>
                    <p className="text-xs text-slate-600 leading-relaxed pt-1 border-t border-slate-100">
                      {inst.role}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 6: GRANTS & PACER SCHEME */}
        {activeTab === 'grants' && (
          <div className="space-y-8 animate-fadeIn">
            <div className="bg-white rounded-3xl border border-slate-200 p-8 space-y-6 shadow-xs">
              <div className="space-y-2">
                <span className="text-xs font-bold text-amber-700 uppercase tracking-wider block">
                  Financial & Scientific Grants
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-serif">
                  PACER Scheme & Research Grants
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-3xl">
                  The Polar Science and Cryosphere Research (PACER) scheme is an umbrella programme approved by the Union Cabinet of India under the Ministry of Earth Sciences. It provides end-to-end funding for expedition logistics, instrumentation, travel, and research fellowships.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-slate-900 text-base">National Polar Post-Doctoral Fellowship</h3>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold">
                      Open Annually
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Designed for early-career PhD holders from Indian universities in disciplines such as Glaciology, Atmospheric Aerosols, Marine Microbiology, and Paleoclimate. Includes monthly stipend, annual contingency grant, and fully sponsored participation in an Antarctic or Arctic expedition.
                  </p>
                  <div className="text-[11px] font-semibold text-slate-700">
                    Tenure: 2 Years (Extendable to 3 Years) · Base: NCPOR Goa & Polar Field Stations
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-slate-900 text-base">University Research Collaboration Grants</h3>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-sky-100 text-sky-800 font-bold">
                      Project-Based
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Financial assistance for Indian colleges and state/central universities to purchase specialized polar sampling instrumentation, fund PhD scholar travel to ITBP Auli for snowcraft training, and cover analytical lab costs at national facilities.
                  </p>
                  <div className="text-[11px] font-semibold text-slate-700">
                    Eligibility: Regular Indian University Faculty with approved PACER projects
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* 4. MODAL: NPDC DATA & SAMPLE REQUEST */}
      {showSampleRequestModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-fadeIn">
          <div className="w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden text-xs">
            <div className="bg-slate-950 p-5 text-white flex items-center justify-between border-b border-slate-800">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400">
                  <Database className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-sm">National Polar Data Center (NPDC) Sample Request</h3>
                  <p className="text-[11px] text-amber-300">
                    राष्ट्रीय ध्रुवीय डेटा केंद्र • नमूना एवं डेटा साझाकरण प्रोटोकॉल
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowSampleRequestModal(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {requestSubmitted ? (
              <div className="p-8 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="font-bold text-slate-900 text-base">Request Submitted Successfully</h4>
                <p className="text-xs text-slate-600 max-w-md mx-auto leading-relaxed">
                  Your sample request proforma has been transmitted to the <strong>NPDC Data Curation Committee, NCPOR Goa</strong>. An official tracking reference has been generated and dispatched to your institutional email.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSampleRequestSubmit} className="p-6 space-y-4">
                <div className="space-y-1">
                  <label className="font-bold text-slate-800 text-[11px] block">
                    Researcher / Principal Investigator Name:
                  </label>
                  <input
                    type="text"
                    required
                    value={researcherName}
                    onChange={(e) => setResearcherName(e.target.value)}
                    placeholder="e.g. Prof. Rajesh Kumar Sharma"
                    className="w-full p-2.5 rounded-xl border border-slate-300 text-xs focus:border-amber-500 focus:outline-hidden"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-800 text-[11px] block">
                    Indian University / Research Institute:
                  </label>
                  <input
                    type="text"
                    required
                    value={institutionName}
                    onChange={(e) => setInstitutionName(e.target.value)}
                    placeholder="e.g. Department of Earth Sciences, IIT Roorkee"
                    className="w-full p-2.5 rounded-xl border border-slate-300 text-xs focus:border-amber-500 focus:outline-hidden"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-800 text-[11px] block">
                    Sample / Dataset Type Required:
                  </label>
                  <select
                    value={sampleType}
                    onChange={(e) => setSampleType(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-300 text-xs focus:border-amber-500 focus:outline-hidden"
                  >
                    <option value="Ice Core Aliquots (-20°C)">Antarctic Ice Core Aliquots (-20°C Clean Room, Goa)</option>
                    <option value="Southern Ocean CTD Hydrography">Southern Ocean 57°E CTD Hydrographic Profile Data</option>
                    <option value="Arctic IndARC Mooring Acoustic Data">Arctic Kongsfjorden IndARC Mooring Telemetry</option>
                    <option value="Himansh Himalayan Glacier Mass Balance">Himansh Third Pole Glacier Mass Balance Time Series</option>
                    <option value="Polar Diatom Reference Slides">Schirmacher Oasis Lake Sediment Diatom Mounts</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-800 text-[11px] block">
                    Research Proposal Title & MoES Alignment:
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={proposalTitle}
                    onChange={(e) => setProposalTitle(e.target.value)}
                    placeholder="Briefly state your scientific objective and how the requested sample aligns with Indian national climate or monsoon research..."
                    className="w-full p-2.5 rounded-xl border border-slate-300 text-xs focus:border-amber-500 focus:outline-hidden"
                  />
                </div>

                <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-[11px] text-amber-900 flex items-start gap-2">
                  <ShieldCheck className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                  <span>
                    Subject to adherence to the <strong>National Polar Data Policy</strong> and statutory compliance under the <strong>Indian Antarctic Act, 2022</strong>.
                  </span>
                </div>

                <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setShowSampleRequestModal(false)}
                    className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100"
                  >
                    रद्द करें (Cancel)
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold flex items-center gap-1.5 shadow-xs"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>अनुरोध भेजें (Submit Proforma)</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* SCIENTIST MISSION LIFECYCLE & MILESTONES MODAL */}
      {/* ======================================================== */}
      {viewingScientistMissionId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl w-full max-w-4xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="p-4 sm:p-5 bg-slate-900 text-white flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-amber-400">
                  National Polar Programme · Field Progression
                </span>
                <h3 className="text-base sm:text-lg font-bold">
                  Scientist Mission Lifecycle & Milestones
                </h3>
              </div>
              <button
                onClick={() => setViewingScientistMissionId(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-5 overflow-y-auto">
              <ScientistMissionLifecycle
                userId={viewingScientistMissionId}
                isEditable={false}
                onNavigateExpedition={(expId) => {
                  setViewingScientistMissionId(null);
                  onNavigate(`/expeditions/${expId}`);
                }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
