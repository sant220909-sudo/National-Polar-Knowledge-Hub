import React, { useState, useMemo } from 'react';
import { store } from '../../services/storage';
import { PolarRegion, ResearchTopic, ResourceType } from '../../types';
import {
  Search,
  Filter,
  Compass,
  FileText,
  Image as ImageIcon,
  Video,
  Layers,
  GraduationCap,
  Calendar,
  MapPin,
  Tag,
  ArrowRight,
  ShieldCheck,
  RotateCcw,
  Sparkles
} from 'lucide-react';

interface ExplorePageProps {
  onNavigate: (route: string) => void;
  onOpenMedia?: (mediaId: string) => void;
}

export const ExplorePage: React.FC<ExplorePageProps> = ({ onNavigate, onOpenMedia }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<string>('All');
  const [selectedRegion, setSelectedRegion] = useState<string>('All');
  const [selectedYear, setSelectedYear] = useState<string>('All');
  const [selectedTopic, setSelectedTopic] = useState<string>('All');

  const currentUser = store.getCurrentUser();
  const isStaff = currentUser.role === 'ADMINISTRATOR' || currentUser.role === 'CONTENT_CONTRIBUTOR';

  // Pull resources and published drafts from store
  const allResources = store.getResources().filter((r) => r.status === 'STORED');
  const allDrafts = store.getDrafts().filter((d) => d.status === 'PUBLISHED');
  const allExpeditions = store.getExpeditions();

  // Combine unified searchable items
  const unifiedItems = useMemo(() => {
    const list: Array<{
      id: string;
      title: string;
      description: string;
      type: string;
      region: string;
      year: number;
      topic: string;
      authorOrStation: string;
      tags: string[];
      route: string;
      isDraftArticle?: boolean;
      thumbnail?: string;
    }> = [];

    // Drafts (Published Articles / Summaries)
    allDrafts.forEach((d) => {
      const res = store.getResourceById(d.resourceId);
      list.push({
        id: d.id,
        title: d.title,
        description: d.summary,
        type: d.contentType,
        region: res?.region || 'Antarctica',
        year: res?.year || 2026,
        topic: res?.topic || 'Glaciology',
        authorOrStation: `${d.contributorName} (${d.reviewerName ? 'Verified by ' + d.reviewerName : 'NCPOR'})`,
        tags: d.keywords,
        route: `/content/${d.id}`,
        isDraftArticle: true
      });
    });

    // Expeditions
    allExpeditions.forEach((e) => {
      list.push({
        id: e.id,
        title: e.name,
        description: e.overview,
        type: 'Expedition',
        region: e.region,
        year: e.year,
        topic: 'Polar Technology & Logistics',
        authorOrStation: e.leadStation,
        tags: [e.region, 'Expedition', e.expeditionNumber || 'Campaign'],
        route: `/expeditions/${e.id}`,
        thumbnail: e.bannerImage
      });
    });

    // Repository Source Resources: strictly restricted to Staff
    if (isStaff) {
      allResources.forEach((r) => {
        list.push({
          id: r.id,
          title: r.title,
          description: r.description,
          type: r.type,
          region: r.region,
          year: r.year,
          topic: r.topic,
          authorOrStation: r.stationOrVessel || r.uploaderName || r.researchers?.[0] || 'Scientific Contributor',
          tags: r.keywords,
          route: `/repository/${r.id}`
        });
      });
    }

    return list;
  }, [allDrafts, allExpeditions, allResources, isStaff]);

  // Filter items
  const filteredItems = useMemo(() => {
    return unifiedItems.filter((item) => {
      // Search
      const q = searchTerm.trim().toLowerCase();
      if (q) {
        const matchesTitle = item.title.toLowerCase().includes(q);
        const matchesDesc = item.description.toLowerCase().includes(q);
        const matchesTags = item.tags.some((t) => t.toLowerCase().includes(q));
        const matchesAuthor = item.authorOrStation.toLowerCase().includes(q);
        if (!matchesTitle && !matchesDesc && !matchesTags && !matchesAuthor) {
          return false;
        }
      }

      // Type filter
      if (selectedType !== 'All') {
        if (selectedType === 'Research' && !['Research', 'Scientific Summary'].includes(item.type)) return false;
        if (selectedType === 'Publication' && item.type !== 'Publication') return false;
        if (selectedType === 'Expedition' && item.type !== 'Expedition') return false;
        if (selectedType === 'Educational' && !['Educational', 'Educational Content'].includes(item.type)) return false;
        if (selectedType === 'Article' && !['Public Article', 'Expedition Story'].includes(item.type)) return false;
      }

      // Region filter
      if (selectedRegion !== 'All' && item.region !== selectedRegion) {
        return false;
      }

      // Year filter
      if (selectedYear !== 'All') {
        if (selectedYear === 'Older') {
          if (item.year >= 2024) return false;
        } else if (item.year.toString() !== selectedYear) {
          return false;
        }
      }

      // Topic filter
      if (selectedTopic !== 'All' && !item.topic.toLowerCase().includes(selectedTopic.toLowerCase())) {
        return false;
      }

      return true;
    });
  }, [unifiedItems, searchTerm, selectedType, selectedRegion, selectedYear, selectedTopic]);

  const handleResetFilters = () => {
    setSearchTerm('');
    setSelectedType('All');
    setSelectedRegion('All');
    setSelectedYear('All');
    setSelectedTopic('All');
  };

  const hasActiveFilters =
    searchTerm !== '' ||
    selectedType !== 'All' ||
    selectedRegion !== 'All' ||
    selectedYear !== 'All' ||
    selectedTopic !== 'All';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Top Header */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-xs font-semibold text-sky-700 uppercase tracking-wider">
          <Compass className="w-4 h-4 text-sky-600" />
          <span>Knowledge Discovery Engine</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Explore Polar Knowledge
        </h1>
        <p className="text-sm text-slate-600 max-w-3xl leading-relaxed">
          Search and discover verified polar resources including field expedition logs, scientific datasets, peer-reviewed articles, high-resolution imagery, and student explainers.
        </p>
      </div>

      {/* Main Search Input */}
      <div className="relative">
        <div className="relative flex items-center">
          <Search className="absolute left-4 w-5 h-5 text-sky-600" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search expeditions, research, publications, ice cores, or authors..."
            className="w-full pl-12 pr-10 py-3.5 rounded-2xl bg-white border border-slate-300 text-sm sm:text-base text-slate-900 placeholder-slate-400 shadow-sm focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 focus:outline-hidden"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-4 text-xs font-semibold text-slate-400 hover:text-slate-600"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Filter Matrix Card */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-700">
            <Filter className="w-4 h-4 text-sky-600" />
            <span>Filter Criteria</span>
          </div>

          {hasActiveFilters && (
            <button
              onClick={handleResetFilters}
              className="flex items-center gap-1 text-xs text-sky-700 hover:text-sky-900 font-semibold"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Filters</span>
            </button>
          )}
        </div>

        {/* Filter Rows */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          {/* Resource Type */}
          <div>
            <label className="font-semibold text-slate-700 block mb-1.5">Resource Type</label>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 focus:border-sky-500 focus:outline-hidden"
            >
              <option value="All">All Types</option>
              <option value="Expedition">Expeditions</option>
              <option value="Article">Public Articles & Stories</option>
              <option value="Research">Research & Summaries</option>
              <option value="Publication">Publications</option>
              <option value="Educational">Educational Resources</option>
            </select>
          </div>

          {/* Region */}
          <div>
            <label className="font-semibold text-slate-700 block mb-1.5">Polar Region</label>
            <select
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 focus:border-sky-500 focus:outline-hidden"
            >
              <option value="All">All Regions</option>
              <option value="Antarctica">Antarctica</option>
              <option value="Arctic">Arctic</option>
              <option value="Southern Ocean">Southern Ocean</option>
              <option value="Himalayas (Third Pole)">Himalayas (Third Pole)</option>
            </select>
          </div>

          {/* Year */}
          <div>
            <label className="font-semibold text-slate-700 block mb-1.5">Year</label>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 focus:border-sky-500 focus:outline-hidden"
            >
              <option value="All">All Years</option>
              <option value="2026">2026</option>
              <option value="2025">2025</option>
              <option value="2024">2024</option>
              <option value="Older">Older (2023 & Prior)</option>
            </select>
          </div>

          {/* Research Topic */}
          <div>
            <label className="font-semibold text-slate-700 block mb-1.5">Scientific Topic</label>
            <select
              value={selectedTopic}
              onChange={(e) => setSelectedTopic(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 focus:border-sky-500 focus:outline-hidden"
            >
              <option value="All">All Topics</option>
              <option value="Glaciology">Glaciology</option>
              <option value="Oceanography">Oceanography</option>
              <option value="Marine Biology">Marine Biology</option>
              <option value="Atmospheric Science">Atmospheric Science</option>
              <option value="Climate">Climate Dynamics</option>
              <option value="Technology">Polar Technology & Logistics</option>
            </select>
          </div>
        </div>
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between text-xs text-slate-500">
        <div>
          Showing <strong className="text-slate-800">{filteredItems.length}</strong> verified polar resource{filteredItems.length !== 1 ? 's' : ''}
        </div>
        <div className="flex items-center gap-1.5 text-emerald-700 font-medium">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>All cataloged entries peer-validated</span>
        </div>
      </div>

      {/* Results Cards Grid */}
      {filteredItems.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 p-8 space-y-3">
          <Search className="w-12 h-12 mx-auto text-slate-300" />
          <h3 className="text-base font-bold text-slate-800">No resources found</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Try adjusting your search query, or clear some filters to discover more polar science content.
          </p>
          <button
            onClick={handleResetFilters}
            className="mt-2 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-semibold text-slate-700 transition"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => onNavigate(item.route)}
              className="bg-white rounded-2xl border border-slate-200/90 hover:border-sky-300 hover:shadow-lg transition p-5 cursor-pointer flex flex-col justify-between group space-y-4"
            >
              <div className="space-y-3">
                {/* Type & Year badges */}
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-sky-100 text-sky-800">
                    {item.type}
                  </span>
                  <div className="flex items-center gap-1 text-[11px] text-slate-500 font-mono">
                    <Calendar className="w-3 h-3 text-slate-400" />
                    <span>{item.year}</span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-base font-bold text-slate-900 group-hover:text-sky-900 leading-snug">
                  {item.title}
                </h3>

                {/* Region & Topic Pills */}
                <div className="flex items-center gap-2 flex-wrap text-[11px]">
                  <span className="flex items-center gap-1 px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                    <MapPin className="w-3 h-3 text-slate-500" />
                    {item.region}
                  </span>
                  <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                    {item.topic}
                  </span>
                </div>

                {/* Description */}
                <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                  {item.description}
                </p>

                {/* Tags */}
                <div className="flex items-center gap-1.5 flex-wrap pt-1">
                  {item.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] text-slate-500 bg-slate-50 px-2 py-0.5 rounded border border-slate-200"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Card Footer */}
              <div className="pt-3 border-t border-slate-100 space-y-2">
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span className="truncate max-w-[170px] text-[11px]">
                    {item.authorOrStation}
                  </span>
                  <span className="font-semibold text-sky-700 group-hover:translate-x-1 transition flex items-center gap-1">
                    View Resource <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>

                <div className="flex items-center gap-1.5 text-[10px] text-emerald-700 font-medium">
                  <ShieldCheck className="w-3 h-3 text-emerald-600" />
                  <span>Verified Institutional Content</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
