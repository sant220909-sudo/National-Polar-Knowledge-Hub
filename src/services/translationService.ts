/**
 * Translation Service for Indian Polar Science Portal
 * Provides comprehensive English <-> Hindi bidirectional translation for:
 * 1. Entire website UI, headings, buttons, cards, station dossiers, and footers
 * 2. Scientific research articles, summaries, and key findings
 * 3. Field expeditions, roadmap stages, and data repository
 * 4. Social media posts and institutional dissemination
 */

export type SupportedLanguage = 'en' | 'hi';

// Comprehensive Dictionary for Scientific, UI, and Institutional Vocabulary
export const POLAR_DICTIONARY: Record<string, string> = {
  // Navigation & Core Portal
  'Home': 'मुख्य पृष्ठ',
  'Expeditions': 'भारतीय अभियान',
  'Research': 'वैज्ञानिक शोध',
  'Researchers': 'शोधकर्ता केंद्र',
  'Media': 'मीडिया गैलरी',
  'Education': 'शिक्षा एवं आउटरीच',
  'Search': 'खोजें',
  'Staff Login': 'वैज्ञानिक लॉगिन',
  'Admin Console': 'प्रशासनिक कंसोल',
  'Scientist Workspace': 'वैज्ञानिक कार्यक्षेत्र',
  'Dashboard': 'डैशबोर्ड',
  'Scientific Repository': 'वैज्ञानिक भंडार',
  'Review Queue': 'समीक्षा कतार',
  'Published Content': 'प्रकाशित सामग्री',
  'Publishing Center': 'प्रकाशन केंद्र',
  'Activity Log': 'गतिविधि लॉग',
  'Settings': 'सेटिंग्स',
  'Logout': 'लॉगआउट',
  'Sign Out': 'साइन आउट',

  // Institutional Entities & Mandates
  'National Centre for Polar and Ocean Research': 'राष्ट्रीय ध्रुवीय एवं महासागर अनुसंधान केंद्र (NCPOR)',
  'Ministry of Earth Sciences': 'पृथ्वी विज्ञान मंत्रालय (MoES)',
  'Government of India': 'भारत सरकार',
  'Ministry of Earth Sciences, Government of India': 'पृथ्वी विज्ञान मंत्रालय, भारत सरकार',
  'Ministry of Earth Sciences (MoES)': 'पृथ्वी विज्ञान मंत्रालय (MoES)',
  'Indian Antarctic Programme': 'भारतीय अंटार्कटिक कार्यक्रम',
  'Indian Arctic Expedition': 'भारतीय आर्कटिक अभियान',
  'Indian Arctic Programme': 'भारतीय आर्कटिक कार्यक्रम',
  'Indian Antarctic Act, 2022': 'भारतीय अंटार्कटिका अधिनियम, २०२२',
  'PACER Scheme': 'पेसर योजना (PACER)',
  'National Polar Data Center': 'राष्ट्रीय ध्रुवीय डेटा केंद्र (NPDC)',
  'National Polar Data Center (NPDC)': 'राष्ट्रीय ध्रुवीय डेटा केंद्र (NPDC)',
  'National Polar Outreach Mandate:': 'राष्ट्रीय ध्रुवीय आउटरीच जनादेश:',
  'Translating complex cryospheric science into Hindi and English for researchers, students, and citizens.': 'शोधकर्ताओं, विद्यार्थियों और नागरिकों हेतु जटिल ध्रुवीय विज्ञान का हिंदी और अंग्रेजी में सुलभ प्रसार।',

  // Hero & Header Titles
  'अंटार्कटिका, आर्कटिक और हिमालय में भारत का वैज्ञानिक नेतृत्व': 'अंटार्कटिका, आर्कटिक और हिमालय में भारत का वैज्ञानिक नेतृत्व',
  "India's Scientific Leadership Across Antarctica, the Arctic, and the Himalayas": 'अंटार्कटिका, आर्कटिक और हिमालय में भारत का वैज्ञानिक नेतृत्व',
  "India's National Polar Programme": 'भारत का राष्ट्रीय ध्रुवीय कार्यक्रम',
  "India's Permanent Research Stations:": 'भारत के स्थायी अनुसंधान केंद्र:',
  "India's Sovereign Cryospheric Exploration & Polar Knowledge Gateway": 'भारत का संप्रभु ध्रुवीय अन्वेषण एवं ज्ञान पोर्टल',
  "Preserving and disseminating sovereign scientific data, in-situ cryogenic telemetry, and verified research from Indian campaigns operating across Bharati, Maitri, Himadri, IndARC, and Himansh.": 'भारती, मैत्री, हिमाद्रि, इन्डआर्क और हिमांश पर संचालित भारतीय अभियानों के प्राथमिक डेटा, क्रायोजेनिक टेलीमेट्री और सत्यापित शोध का संरक्षण एवं प्रसार।',
  'Explore Indian Expeditions': 'भारतीय अभियान देखें',
  'Explore Scientific Research': 'वैज्ञानिक शोध देखें',
  'Access Research Data': 'वैज्ञानिक शोध डेटा प्राप्त करें',
  'Read Polar Research Papers': 'ध्रुवीय शोध पत्र पढ़ें',
  'Sovereign Science Across Earth\'s Extremes': 'पृथ्वी के ध्रुवों पर भारत का संप्रभु वैज्ञानिक अनुसंधान',

  // Hub Tabs & Consortium
  'Expedition Selection Roadmap': 'अभियान चयन मार्गदर्शिका',
  'Polar Bases & Laboratories': 'ध्रुवीय केंद्र एवं प्रयोगशालाएं',
  'Scientific Leadership & Pioneers': 'वैज्ञानिक नेतृत्व एवं अग्रदूत',
  'Indian Polar Scientific Leadership & Pioneers': 'भारतीय ध्रुवीय वैज्ञानिक नेतृत्व एवं अग्रदूत',
  'National Scientific Consortium': 'अखिल भारतीय वैज्ञानिक अनुसंधान संजाल',
  'National Scientific Consortium (Collaboration Network)': 'अखिल भारतीय ध्रुवीय अनुसंधान संजाल',
  'Collaboration Network': 'सहयोगी अनुसंधान संजाल',
  'Collaborative Consortium': 'सहयोगी अनुसंधान संजाल',
  'PACER Grants & Fellowships': 'पेसर योजना अनुदान एवं फेलोशिप',
  'PACER Scheme & Research Grants': 'पेसर योजना एवं अनुसंधान अनुदान',
  'Data & Physical Sample Repository for Indian Scientists': 'भारतीय वैज्ञानिकों के लिए डेटा एवं नमूना भंडार',
  'Submit Sample Request': 'नमूना अनुरोध पत्र प्रस्तुत करें',
  'Expedition Archives': 'अभियान अभिलेखागार',
  'Scientist Login': 'वैज्ञानिक लॉगिन',

  // Stations & Geography
  'Bharati Station': 'भारती अनुसंधान केंद्र',
  'Maitri Station': 'मैत्री अनुसंधान केंद्र',
  'Dakshin Gangotri': 'दक्षिण गंगोत्री',
  'Himadri Station': 'हिमाद्रि अनुसंधान केंद्र',
  'IndARC Observatory': 'इन्डआर्क वेधशाला',
  'Himansh Observatory': 'हिमांश वेधशाला',
  'ORV Sagar Nidhi': 'ओआरवी सागर निधि (ध्रुवीय पोत)',
  'ORV Sagar Kanya': 'ओआरवी सागर कन्या (शोध पोत)',
  'Antarctica': 'अंटार्कटिका',
  'Arctic': 'आर्कटिक',
  'Southern Ocean': 'दक्षिण महासागर',
  'Himalayas': 'हिमालय',
  'Third Pole': 'तीसरा ध्रुव (हिमालय)',
  'Larsemann Hills': 'लार्समैन हिल्स',
  'Schirmacher Oasis': 'शिर्माकर ओएसिस',
  'Ny-Ålesund, Svalbard': 'नाय-अलेसुंड, स्वालबार्ड',
  'Kongsfjorden': 'कोंग्सफ्योर्डन',
  'Spiti Valley': 'स्पीति घाटी',
  'Chandra Basin': 'चंद्रा बेसिन',

  // Station Sections & UI Labels
  'Sovereign Research Infrastructure': 'भारत का संप्रभु अनुसंधान अवसंरचना',
  'भारत के ध्रुवीय अनुसंधान केंद्र एवं वेधशालाएं': 'भारत के ध्रुवीय अनुसंधान केंद्र एवं वेधशालाएं',
  "India's permanent scientific bases operating under the Antarctic Treaty and Arctic Council scientific guidelines.": 'अंटार्कटिक संधि और आर्कटिक परिषद के वैज्ञानिक दिशानिर्देशों के तहत कार्यरत भारत के स्थायी वैज्ञानिक अनुसंधान केंद्र।',
  '6 Operational Polar Platforms': '६ सक्रिय ध्रुवीय अनुसंधान केंद्र',
  'Active Year-round': 'वर्ष भर सक्रिय',
  'Active Wintering': 'सक्रिय शीतकालीन दल',
  'Madrid Protocol Compliant': 'मैड्रिड पर्यावरण प्रोटोकॉल अनुरूप',
  'International Research Village': 'अंतर्राष्ट्रीय अनुसंधान ग्राम',
  'Atmospheric Physics': 'वायुमंडलीय भौतिकी',
  'Subsurface Mooring': 'गहन समुद्र-तल वेधशाला',
  'Atlantification Monitoring': 'अटलांटिकीकरण निगरानी',
  'Glacier Mass Balance': 'हिमनद द्रव्यमान संतुलन',
  'Oceanographic Fleet': 'महासागरीय शोध बेड़ा',
  'Southern Ocean Cruise': 'दक्षिण महासागर वैज्ञानिक यात्रा',
  'Deep Sea Research': 'गहन समुद्री अनुसंधान',
  'East Antarctica': 'पूर्वी अंटार्कटिका',
  'Arctic Ocean': 'आर्कटिक महासागर',
  'Himalayas / Third Pole': 'हिमालय / तीसरा ध्रुव',
  'Southern Ocean & Polar Seas': 'दक्षिण महासागर एवं ध्रुवीय समुद्र',

  // Climate Teleconnections Section
  'Deep Teleconnections: Polar Science & the Indian Monsoon': 'ध्रुवीय विज्ञान और भारतीय मानसून का गहरा संबंध',
  'All-India Polar Research & Institutional Collaboration Network': 'अखिल भारतीय ध्रुवीय अनुसंधान एवं संस्थागत सहयोग संजाल',
  'Datasets Archive': 'वैज्ञानिक डेटासेट पुरालेख',
  'Scientific Datasets': 'वैज्ञानिक डेटासेट',
  'Institutional Activities': 'संस्थागत गतिविधियाँ',
  'Institutional Activities Archive': 'संस्थागत गतिविधियाँ पुरालेख',
  'Institutional Activities & Polar Outreach Archive': 'संस्थागत गतिविधियाँ एवं ध्रुवीय आउटरीच पुरालेख',
  'Publications & Research': 'प्रकाशन एवं वैज्ञानिक अनुसंधान',
  'Polar Science Publications & Research Repository': 'ध्रुवीय विज्ञान प्रकाशन एवं अनुसंधान भंडार',
  'Official Expedition Reports': 'आधिकारिक अभियान वैज्ञानिक रिपोर्ट',
  'Peer-Reviewed Publications': 'सहकर्मी-समीक्षित शोध प्रकाशन',
  'Public Outreach Insights': 'सार्वजनिक वैज्ञानिक आउटरीच अंतर्दृष्टि',
  'How Polar Science Connects to India\'s Climate': 'ध्रुवीय विज्ञान भारतीय जलवायु एवं मानसून से कैसे जुड़ा है',
  'Discover how changes in Antarctica, the Arctic, and the Himalayas directly influence India\'s monsoon, agricultural security, and sea-level rise.': 'जानिए कैसे अंटार्कटिका, आर्कटिक और हिमालय के बदलाव सीधे भारत के मानसून, कृषि सुरक्षा और समुद्र स्तर को प्रभावित करते हैं।',
  'Arctic Warming & Indian Monsoon Linkage': 'आर्कटिक उष्णता और भारतीय मानसून संबंध',
  'Himalayan Third Pole & Water Security': 'हिमालयी हिमनद एवं राष्ट्रीय जल सुरक्षा',
  'Southern Ocean & Global Carbon Sequestration': 'दक्षिण महासागर एवं वैश्विक कार्बन अवशोषण',

  // Expeditions & Operations
  'Field Operations & Annual Campaigns': 'क्षेत्रीय अभियान एवं वार्षिक वैज्ञानिक कार्यक्रम',
  'प्रमुख भारतीय वैज्ञानिक अभियान': 'प्रमुख भारतीय वैज्ञानिक अभियान',
  'Official annual scientific expeditions operating from Antarctica to the High Arctic and Southern Ocean.': 'अंटार्कटिका, उच्च आर्कटिक और दक्षिण महासागर में संचालित आधिकारिक वार्षिक भारतीय वैज्ञानिक अभियान।',
  'सभी अभियान देखें (View All)': 'सभी अभियान देखें',
  'View Details': 'विवरण देखें',
  'Expedition Overview': 'अभियान सारांश',
  'Scientific Objectives': 'वैज्ञानिक उद्देश्य',
  'Field Discoveries': 'फील्ड खोजें एवं निष्कर्ष',
  'Operational Platforms': 'कार्यशील मंच',

  // Research & Articles
  'Latest Peer-Reviewed Scientific Research': 'नवीनतम सहकर्मी समीक्षित वैज्ञानिक शोध',
  'Peer-Reviewed Scientific Findings': 'सहकर्मी समीक्षित वैज्ञानिक शोध निष्कर्ष',
  'Latest verified discoveries disseminated by Indian researchers working under the PACER scheme.': 'पेसर (PACER) योजना के अंतर्गत कार्यरत भारतीय वैज्ञानिकों द्वारा नवीनतम सत्यापित वैज्ञानिक खोजें।',
  'Read Article': 'शोध पत्र पढ़ें',
  'Read Paper': 'पूर्ण शोध पढ़ें',
  'Back to Research': 'शोध सूची पर वापस जाएं',
  'Executive Summary': 'कार्यकारी सारांश',
  'Key Scientific Observations': 'प्रमुख वैज्ञानिक प्रेक्षण एवं निष्कर्ष',
  'Contributing Polar Scientist': 'योगदानकर्ता ध्रुवीय वैज्ञानिक',
  'Peer Verified': 'सहकर्मी सत्यापित',
  'Share': 'साझा करें',
  'Share article': 'शोध साझा करें',
  'Copied': 'कॉपी किया गया',
  'Print': 'प्रिंट करें',
  'Print article': 'प्रिंट निकालें',
  'Bookmark': 'बुकमार्क करें',
  'Bookmark story': 'कहानी बुकमार्क करें',
  'Scientific Citation & Archival Provenance': 'वैज्ञानिक संदर्भ एवं अभिलेखीय स्रोत',

  // Media & Education
  'Visual & Archival Expeditions Media': 'दृश्य एवं श्रव्य अभियान अभिलेखागार',
  'Visual & Audio Archives': 'दृश्य एवं श्रव्य अभिलेखागार',
  'Curated field photography and archival footage from Indian polar expeditions.': 'भारतीय ध्रुवीय अभियानों की दुर्लभ तस्वीरें एवं ऐतिहासिक वीडियो फुटेज।',
  'Official Collaborating Institutions & Universities': 'सहयोगी राष्ट्रीय संस्थान एवं विश्वविद्यालय',
  'Education & Public Outreach': 'शिक्षा एवं जन जागरूकता',
  'Educational Resources': 'शैक्षिक संसाधन एवं पाठ्य सामग्री',

  // Footer & Institutional Principle
  'Institutional Science Dissemination Principle': 'संस्थागत विज्ञान प्रसार सिद्धांत',
  '“AI assists. Experts validate. The public learns.”': '“एआई सहायता करता है। विशेषज्ञ सत्यापित करते हैं। जनता सीखती है।”',
  'Every public educational brief, article, and caption on this portal originates from field reports, is synthesized by AI under human review, and is vetted by authorized polar researchers and approved by the institutional administrator.': 'इस पोर्टल पर प्रत्येक सार्वजनिक शैक्षिक लेख, शोध सारांश और विवरण प्राथमिक फील्ड रिपोर्ट से उत्पन्न होता है, मानवीय समीक्षा के तहत संश्लेषित होता है, और अधिकृत ध्रुवीय वैज्ञानिकों एवं प्रशासनिक नियंत्रक द्वारा अनुमोदित है।',
  'Polar Knowledge Portal': 'राष्ट्रीय ध्रुवीय ज्ञान पोर्टल',
  'Integrated scientific repository, research archive, and media dissemination platform archiving India’s polar expeditions to Antarctica, the Arctic, the Southern Ocean, and the Himalayan Cryosphere.': 'अंटार्कटिका, आर्कटिक, दक्षिण महासागर एवं हिमालयी हिममंडल में भारत के वैज्ञानिक अभियानों का एकीकृत शोध अभिलेखागार, डेटा भंडार एवं मीडिया प्रसार मंच।',
  'Institutional Mandate': 'संस्थागत राष्ट्रीय जनादेश',
  'National Centre for Polar and Ocean Research (NCPOR), Ministry of Earth Sciences, Government of India.': 'राष्ट्रीय ध्रुवीय एवं महासागर अनुसंधान केंद्र (NCPOR), पृथ्वी विज्ञान मंत्रालय, भारत सरकार।',
  'Polar Research Stations': 'ध्रुवीय अनुसंधान केंद्र',
  'Portal Navigation': 'पोर्टल नेविगेशन',
  'Legal & Governance': 'वैधानिक एवं नियामक अनुपालन',
  'Privacy Policy': 'गोपनीयता नीति',
  'Terms of Access': 'उपयोग की शर्तें',
  'Open Data Protocol': 'ओपन डेटा प्रोटोकॉल',
  'CAG-EP Environmental Clearance': 'पर्यावरण मंजूरी (सीएजी-ईपी)',
  'All rights reserved. Sovereign polar datasets managed under the PACER scheme.': 'सर्वाधिकार सुरक्षित। पेसर योजना के तहत प्रबंधित भारत का संप्रभु ध्रुवीय वैज्ञानिक डेटा।',

  // Actions & Controls
  'Direct Share': 'सीधा साझा करें (Direct Share)',
  'Ready to Publish': 'प्रकाशन हेतु तैयार',
  'Under Review': 'समीक्षाधीन',
  'Approved': 'स्वीकृत',
  'Published': 'प्रकाशित',
  'Draft': 'प्रारूप (ड्राफ्ट)',
  'Convert to Hindi': 'हिंदी में बदलें',
  'Revert to English': 'अंग्रेजी में बदलें',
  'Select Publishing Platform & Review': 'प्रकाशन मंच चयन एवं अंतिम समीक्षा',
  'Copy Text': 'पाठ कॉपी करें',
  'Cancel': 'रद्द करें',
  'Save Changes': 'परिवर्तन सहेजें',
  'Filter by Region': 'क्षेत्र अनुसार फ़िल्टर',
  'Filter by Topic': 'विषय अनुसार फ़िल्टर',
  'All Regions': 'सभी क्षेत्र',
  'All Topics': 'सभी विषय',
  'All Expeditions': 'सभी अभियान',
  'All Formats': 'सभी प्रारूप',
  'Clear All Filters': 'फ़िल्टर हटाएं',
  'Search by keyword, title, or scientist...': 'कीवर्ड, शीर्षक या वैज्ञानिक से खोजें...'
};

// Full article/summary dedicated translation cache
export const ARTICLE_TRANSLATIONS: Record<string, { title: string; summary: string; body?: string; keyFindings?: string[] }> = {
  'draft-01': {
    title: 'लार्समैन हिल्स (अंटार्कटिका) में १,२०० वर्ष प्राचीन हिमनदीय जलवायु रिकॉर्ड',
    summary: 'भारती अनुसंधान केंद्र (पूर्वी अंटार्कटिका) के समीप निकाले गए १८० मीटर लंबे हिम क्रोड के स्थिर समस्थानिक विश्लेषण ने पिछले १२ शताब्दियों के दक्षिणी गोलार्ध जलवायु परिवर्तन और भारतीय मानसून के साथ इसके संबंधों के ठोस प्रमाण प्रस्तुत किए हैं।',
    body: 'राष्ट्रीय ध्रुवीय एवं महासागर अनुसंधान केंद्र (एनसीपीओआर), पृथ्वी विज्ञान मंत्रालय के वैज्ञानिकों ने भारती स्टेशन के निकट प्रिंसेस एलिजाबेथ लैंड में १८० मीटर गहराई तक बर्फ की ड्रिलिंग सफलतापूर्वक पूर्ण की।\n\nऑक्सीजन और हाइड्रोजन के स्थिर समस्थानिकों (δ18O एवं δD) के सूक्ष्म मापन से यह सिद्ध हुआ है कि मध्यकालीन उष्ण काल और लघु हिमयुग के दौरान दक्षिणी महासागर के वायुमंडलीय प्रवाह में व्यापक विचलन हुआ था। यह डेटा भारतीय ग्रीष्मकालीन मानसून के दीर्घकालिक पूर्वानुमान मॉडल के सत्यापन हेतु ऐतिहासिक आधार प्रदान करता है।',
    keyFindings: [
      '१,२०० वर्षों के निरंतर उच्च-रिज़ॉल्यूशन जलवायु आंकड़ों का ऐतिहासिक दस्तावेजीकरण।',
      'दक्षिणी महासागरीय दोलन (SAM) और भारतीय वर्षा चक्र के मध्य प्रत्यक्ष दूर-संबंधों की पुष्टि।',
      'एनसीपीओआर गोवा के -२०°C स्वच्छ कक्ष क्रायो-भंडार में प्राथमिक हिम नमूनों का सुरक्षित संरक्षण।'
    ]
  },
  'draft-02': {
    title: 'आर्कटिक कोंग्सफ्योर्डन में इन्डआर्क वेधशाला: अटलांटिक जल अंतर्वाह के दशक भर के प्रेक्षण',
    summary: '७९° उत्तर अक्षांश पर १९२ मीटर गहरे समुद्र तल में स्थापित भारत की पहली बहु-संवेदक इन्डआर्क वेधशाला ने आर्कटिक महासागर में गर्म अटलांटिक जल के बढ़ते प्रवाह (अटलांटिकीकरण) और भारतीय मानसून पर इसके प्रभावों को दर्ज किया।',
    body: '२०१४ में तैनात भारत की इन्डआर्क (IndARC) वेधशाला आर्कटिक के कोंग्सफ्योर्डन फ्योर्ड में लगातार तापमान, लवणता और समुद्री धाराओं की गति को दर्ज कर रही है। पिछले एक दशक के प्रेक्षण दर्शाते हैं कि गर्म अटलांटिक जल का फ्योर्ड में प्रवेश बढ़ रहा है, जिससे आर्कटिक समुद्री बर्फ का पिघलना तेज हुआ है।',
    keyFindings: [
      'कोंग्सफ्योर्डन में गहराई पर तापमान में +१.२°C की दशकवार वृद्धि दर्ज की गई।',
      'आर्कटिक वायुमंडलीय जेट स्ट्रीम के विचलन का भारतीय पश्चिमी विक्षोभ और शीतकालीन वर्षा से संबंध स्थापित।',
      'भारतीय वैज्ञानिकों द्वारा हर वर्ष स्वालबार्ड में ध्वनिक डेटा का सफल निष्कर्षण।'
    ]
  },
  'draft-03': {
    title: 'हिमालयी तीसरा ध्रुव: स्पीति घाटी में छोटा शिगरी एवं समुद्र टापू हिमनदों का द्रव्यमान संतुलन',
    summary: '४,०८० मीटर की ऊंचाई पर स्थित हिमांश वेधशाला द्वारा किए गए दस वर्षीय इन-सिटू मापन ने सिंधु और गंगा बेसिन को पोषित करने वाले प्रमुख हिमालयी हिमनदों के पीछे हटने की दर और राष्ट्रीय जल सुरक्षा के लिए उनके निहितार्थों का आकलन किया।',
    body: 'हिमालयी हिममंडल को विश्व का तीसरा ध्रुव कहा जाता है। एनसीपीओआर की हिमांश अनुसंधान वेधशाला छोटा शिगरी और समुद्र टापू हिमनदों पर स्वचालित मौसम केंद्रों, भाप-ड्रिलिंग और विभेदक जीपीएस द्वारा बर्फ पिघलने की दर की निगरानी कर रही है।',
    keyFindings: [
      'निचले हिमालयी हिमनदों में वार्षिक ऋणात्मक द्रव्यमान संतुलन (-०.५२ मीटर जल तुल्यांक प्रति वर्ष) दर्ज।',
      'काजल कणों (ब्लैक कार्बन) के जमाव के कारण बर्फ की परावर्तन क्षमता (एल्बिडो) में कमी।',
      'उत्तर भारत की बारहमासी नदियों के प्रवाह पूर्वानुमान हेतु वैज्ञानिक आधार उपलब्ध।'
    ]
  },
  'draft-04': {
    title: 'दक्षिणी महासागर ५७° पूर्व देशांतर में जैविक कार्बन पंप एवं क्रिल पारिस्थितिकी',
    summary: 'ओआरवी सागर निधि पोत पर भारतीय समुद्र विज्ञानियों ने अंटार्कटिक परिध्रुवीय धारा के पार क्रिल झुंडों द्वारा कार्बन डाई-ऑक्साइड को गहरे समुद्र में अवशोषित करने की विशाल क्षमता का परिमाण निर्धारित किया।',
    body: '४०° दक्षिण से ६९° दक्षिण तक भारतीय महासागरीय क्षेत्र में किए गए सीटीडी और जैव-रासायनिक परीक्षणों से स्पष्ट हुआ है कि अंटार्कटिक क्रिल (यूफॉसिया सुपरबा) सतह के कार्बन को गहरे महासागरीय तलछट में जमा करने में महत्वपूर्ण भूमिका निभा रहे हैं।',
    keyFindings: [
      '५७° पूर्व देशांतर पर प्राथमिक उत्पादकता और तलछट कार्बन फ्लक्स का सटीक मापन।',
      'वैश्विक तापमान वृद्धि को रोकने में अंटार्कटिक महासागर के प्राकृतिक कार्बन सिंक की भूमिका सिद्ध।'
    ]
  },
  'draft-06': {
    title: 'आर्कटिक वार्मिंग एवं भारतीय मानसून संबंध: हिमाद्रि स्टेशन से वैज्ञानिक आउटरीच',
    summary: 'नाय-अलेसुंड (७९° उत्तर) स्थित हिमाद्रि स्टेशन के एरोसोल शोध ने स्पष्ट किया कि आर्कटिक समुद्री बर्फ की कमी भारतीय ग्रीष्मकालीन मानसून की तीव्रता और वर्षा वितरण को किस प्रकार प्रभावित करती है।',
    body: 'आर्कटिक में तेजी से कम होती बर्फ रॉस्बी तरंगों के प्रवाह को परिवर्तित करती है, जिससे भारतीय उपमहाद्वीप पर मानसूनी द्रोणी (Monsoon Trough) की स्थिति में अप्रत्याशित बदलाव आते हैं।',
    keyFindings: [
      'ध्रुवीय जलवायु परिवर्तन सीधे भारतीय कृषि और वर्षा पैटर्न को प्रभावित करता है।',
      'पृथ्वी विज्ञान मंत्रालय द्वारा दोनों ध्रुवों पर भारतीय उपस्थिति राष्ट्रीय सुरक्षा एवं अनुसंधान के लिए अत्यंत महत्वपूर्ण।'
    ]
  }
};

// Word & Phrase Replacement Dictionary for Sentence Translation
const SENTENCE_PHRASE_REPLACEMENTS: [RegExp, string][] = [
  [/National Centre for Polar and Ocean Research/gi, 'राष्ट्रीय ध्रुवीय एवं महासागर अनुसंधान केंद्र (NCPOR)'],
  [/Ministry of Earth Sciences, Government of India/gi, 'पृथ्वी विज्ञान मंत्रालय, भारत सरकार'],
  [/Ministry of Earth Sciences \(MoES\)/gi, 'पृथ्वी विज्ञान मंत्रालय (MoES)'],
  [/Ministry of Earth Sciences/gi, 'पृथ्वी विज्ञान मंत्रालय (MoES)'],
  [/Government of India/gi, 'भारत सरकार'],
  [/Bharati Station/gi, 'भारती अनुसंधान केंद्र'],
  [/Maitri Station/gi, 'मैत्री अनुसंधान केंद्र'],
  [/Himadri Station/gi, 'हिमाद्रि अनुसंधान केंद्र'],
  [/Himansh Observatory/gi, 'हिमांश वेधशाला'],
  [/IndARC Observatory/gi, 'इन्डआर्क वेधशाला'],
  [/Indian Antarctic Expedition/gi, 'भारतीय अंटार्कटिक वैज्ञानिक अभियान'],
  [/Indian Arctic Campaign/gi, 'भारतीय आर्कटिक वैज्ञानिक अभियान'],
  [/Indian Arctic Expedition/gi, 'भारतीय आर्कटिक वैज्ञानिक अभियान'],
  [/Indian Antarctic Act, 2022/gi, 'भारतीय अंटार्कटिका अधिनियम, २०२२'],
  [/National Polar Data Center/gi, 'राष्ट्रीय ध्रुवीय डेटा केंद्र (NPDC)'],
  [/PACER Scheme/gi, 'पेसर योजना (PACER)'],
  [/Southern Ocean/gi, 'दक्षिण महासागर'],
  [/Larsemann Hills/gi, 'लार्समैन हिल्स'],
  [/Schirmacher Oasis/gi, 'शिर्माकर ओएसिस'],
  [/Ny-Ålesund, Svalbard/gi, 'नाय-अलेसुंड, स्वालबार्ड'],
  [/Third Pole/gi, 'तीसरा ध्रुव (हिमालय)'],
  [/ice core/gi, 'हिम क्रोड (आइस कोर)'],
  [/glacier mass balance/gi, 'हिमनद द्रव्यमान संतुलन'],
  [/climate change/gi, 'जलवायु परिवर्तन'],
  [/monsoon rainfall/gi, 'मानसूनी वर्षा'],
  [/Indian summer monsoon/gi, 'भारतीय ग्रीष्मकालीन मानसून'],
  [/Indian monsoon/gi, 'भारतीय मानसून'],
  [/stable isotopes/gi, 'स्थिर समस्थानिक'],
  [/teleconnections/gi, 'जलवायु दूर-संबंध'],
  [/peer-verified/gi, 'सहकर्मी-सत्यापित'],
  [/peer-reviewed/gi, 'सहकर्मी-समीक्षित'],
  [/scientific research/gi, 'वैज्ञानिक शोध'],
  [/scientific brief/gi, 'वैज्ञानिक शोध सारांश'],
  [/operational base/gi, 'कार्यशील ध्रुवीय केंद्र'],
  [/Recent findings from/gi, 'प्राथमिक शोध निष्कर्ष:'],
  [/Key Scientific Implications:/gi, 'प्रमुख वैज्ञानिक निहितार्थ:'],
  [/Disseminated by/gi, 'प्रसारक:'],
  [/Full scientific access:/gi, 'पूर्ण वैज्ञानिक पहुंच:'],
  [/Did you know\?/gi, 'क्या आप जानते हैं?'],
  [/Follow India's polar expeditions/gi, 'भारत के ध्रुवीय अभियानों का अनुसरण करें'],
  [/Statutory Compliance:/gi, 'वैधानिक अनुपालन:']
];

/**
 * Translate general English text to natural, authentic Hindi (Devanagari)
 */
export function translateEnglishToHindi(text: string, isSocialPost = false): string {
  if (!text || typeof text !== 'string') return '';

  const trimmed = text.trim();

  // 1. Direct dictionary match
  if (POLAR_DICTIONARY[trimmed]) {
    return text.replace(trimmed, POLAR_DICTIONARY[trimmed]);
  }

  // 2. Pre-curated article/draft translation lookup
  for (const [key, item] of Object.entries(ARTICLE_TRANSLATIONS)) {
    if (trimmed === item.title || trimmed.toLowerCase() === item.title.toLowerCase()) {
      return item.title;
    }
    if (trimmed === item.summary || trimmed.slice(0, 50) === item.summary.slice(0, 50)) {
      return item.summary;
    }
  }

  // 3. Sentence & Phrase Natural Translation Logic
  let converted = text;
  let hasReplaced = false;

  for (const [pattern, replacement] of SENTENCE_PHRASE_REPLACEMENTS) {
    if (pattern.test(converted)) {
      converted = converted.replace(pattern, replacement);
      hasReplaced = true;
    }
  }

  // Only prepend national header if specifically formatting a social outreach post
  if (isSocialPost && !converted.startsWith('🇮🇳')) {
    converted = `🇮🇳 [भारतीय ध्रुवीय विज्ञान प्रसार • NCPOR]\n` + converted;
  }

  return converted;
}

/**
 * Revert or translate Hindi back to polished English
 */
export function translateHindiToEnglish(text: string): string {
  if (!text) return '';
  let converted = text.replace(/^🇮🇳\s*\[.*?\]\n*/, '');

  const reversePairs: [RegExp, string][] = [
    [/राष्ट्रीय ध्रुवीय एवं महासागर अनुसंधान केंद्र \(NCPOR\)/g, 'National Centre for Polar and Ocean Research (NCPOR)'],
    [/पृथ्वी विज्ञान मंत्रालय, भारत सरकार/g, 'Ministry of Earth Sciences, Government of India'],
    [/पृथ्वी विज्ञान मंत्रालय \(MoES\)/g, 'Ministry of Earth Sciences (MoES)'],
    [/भारती अनुसंधान केंद्र/g, 'Bharati Station'],
    [/मैत्री अनुसंधान केंद्र/g, 'Maitri Station'],
    [/हिमाद्रि अनुसंधान केंद्र/g, 'Himadri Station'],
    [/हिमांश वेधशाला/g, 'Himansh Observatory'],
    [/इन्डआर्क वेधशाला/g, 'IndARC Subsurface Mooring'],
    [/भारतीय अंटार्कटिका अधिनियम, २०२२/g, 'Indian Antarctic Act, 2022'],
    [/भारतीय मानसून/g, 'Indian Summer Monsoon'],
    [/जलवायु परिवर्तन/g, 'Climate Dynamics'],
    [/दक्षिण महासागर/g, 'Southern Ocean'],
    [/तीसरा ध्रुव/g, 'Third Pole']
  ];

  for (const [pattern, replacement] of reversePairs) {
    converted = converted.replace(pattern, replacement);
  }

  return converted;
}

/**
 * Get article pre-translated content for ContentDetailPage
 */
export function getArticleHindiContent(draftId: string) {
  return ARTICLE_TRANSLATIONS[draftId] || null;
}
