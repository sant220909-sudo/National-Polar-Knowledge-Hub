import React, { useState, useMemo } from 'react';
import { store } from '../../services/storage';
import { InstitutionalActivity, InstitutionalActivityType, PolarRegion, ResearchTopic } from '../../types';
import {
  Calendar,
  MapPin,
  Building2,
  Users,
  Award,
  Search,
  Filter,
  Layers,
  ArrowRight,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  ChevronRight,
  X,
  Sparkles,
  BookOpen,
  Camera
} from 'lucide-react';

interface ActivitiesPageProps {
  onNavigate: (route: string) => void;
}

export const ActivitiesPage: React.FC<ActivitiesPageProps> = ({ onNavigate }) => {
  const activities = store.getInstitutionalActivities();
  const publishedActivityDrafts = store
    .getDrafts()
    .filter((d) => {
      if (d.status !== 'PUBLISHED') return false;
      const res = store.getResourceById(d.resourceId);
      if (res && res.visibility === 'PRIVATE') return false;
      return d.contentDestination === 'Activities';
    });

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string>('All');
  const [selectedYear, setSelectedYear] = useState<string>('All');
  const [selectedRegion, setSelectedRegion] = useState<string>('All');

  // Detail Modal State
  const [activeActivity, setActiveActivity] = useState<InstitutionalActivity | null>(null);

  // Available filter options
  const activityTypes = useMemo(() => {
    return ['All', ...Array.from(new Set(activities.map((a) => a.activityType)))];
  }, [activities]);

  const years = useMemo(() => {
    return ['All', ...Array.from(new Set(activities.map((a) => a.year.toString())))].sort().reverse();
  }, [activities]);

  const regions = useMemo(() => {
    const list = activities.map((a) => a.region).filter(Boolean) as string[];
    return ['All', ...Array.from(new Set(list))];
  }, [activities]);

  // Filtered Activities
  const filteredActivities = useMemo(() => {
    return activities.filter((act) => {
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = act.title.toLowerCase().includes(q);
        const matchesDesc = act.description.toLowerCase().includes(q);
        const matchesLoc = act.location.toLowerCase().includes(q);
        const matchesInst = act.participatingInstitutions.some((inst) => inst.toLowerCase().includes(q));
        const matchesHighlights = act.highlights.some((h) => h.toLowerCase().includes(q));
        if (!matchesTitle && !matchesDesc && !matchesLoc && !matchesInst && !matchesHighlights) {
          return false;
        }
      }

      if (selectedType !== 'All' && act.activityType !== selectedType) {
        return false;
      }

      if (selectedYear !== 'All' && act.year.toString() !== selectedYear) {
        return false;
      }

      if (selectedRegion !== 'All' && act.region !== selectedRegion) {
        return false;
      }

      return true;
    });
  }, [activities, searchQuery, selectedType, selectedYear, selectedRegion]);

  // Helper for activity type badge styles
  const getTypeBadgeStyle = (type: InstitutionalActivityType) => {
    switch (type) {
      case 'Workshop':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'Conference':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Outreach':
        return 'bg-amber-100 text-amber-900 border-amber-300';
      case 'Training':
        return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'MoU':
        return 'bg-rose-100 text-rose-800 border-rose-200';
      case 'Exhibition':
        return 'bg-indigo-100 text-indigo-800 border-indigo-200';
      default:
        return 'bg-slate-100 text-slate-800 border-slate-200';
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Institutional Breadcrumb & Header */}
        <div className="space-y-4 pb-6 border-b border-slate-200">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <button onClick={() => onNavigate('/')} className="hover:text-sky-700">Home</button>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="font-semibold text-slate-800">Institutional Activities Archive</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold border border-amber-300 mb-2">
                <Building2 className="w-3.5 h-3.5 text-amber-700" />
                <span>NCPOR & MoES Official Archive</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-serif">
                Institutional Activities & Polar Outreach Archive
              </h1>
              <p className="mt-2 text-sm sm:text-base text-slate-600 max-w-3xl leading-relaxed">
                Official institutional records of national workshops, bilateral science symposia, ceremonial expedition flag-offs, capacity-building training, and public science outreach initiatives conducted under India’s Polar Programme.
              </p>
            </div>

            {/* Quick Stats Pill Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-white p-3 rounded-2xl border border-slate-200 shadow-xs shrink-0 text-center">
              <div className="px-3 py-1 border-r border-slate-100">
                <div className="text-xl font-bold text-slate-900">{activities.length}</div>
                <div className="text-[10px] text-slate-500 uppercase font-semibold">Activities</div>
              </div>
              <div className="px-3 py-1 border-r border-slate-100">
                <div className="text-xl font-bold text-sky-700">18+</div>
                <div className="text-[10px] text-slate-500 uppercase font-semibold">Institutes</div>
              </div>
              <div className="px-3 py-1 border-r border-slate-100">
                <div className="text-xl font-bold text-emerald-700">100%</div>
                <div className="text-[10px] text-slate-500 uppercase font-semibold">Verified</div>
              </div>
              <div className="px-3 py-1">
                <div className="text-xl font-bold text-amber-700">4 Decades</div>
                <div className="text-[10px] text-slate-500 uppercase font-semibold">Legacy</div>
              </div>
            </div>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
          <div className="flex flex-col md:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search activities by title, location, institution, or keywords..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm bg-white placeholder-slate-400 focus:border-sky-500 focus:outline-hidden"
              />
            </div>

            <div className="flex flex-wrap items-center gap-3">
              {/* Type Filter */}
              <div className="flex items-center gap-1.5">
                <span className="text-xs text-slate-500 font-medium hidden sm:inline">Type:</span>
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="px-3 py-2 rounded-xl border border-slate-300 bg-white text-xs text-slate-800 focus:border-sky-500"
                >
                  {activityTypes.map((type) => (
                    <option key={type} value={type}>
                      {type === 'All' ? 'All Types' : type}
                    </option>
                  ))}
                </select>
              </div>

              {/* Year Filter */}
              <div className="flex items-center gap-1.5">
                <span className="text-xs text-slate-500 font-medium hidden sm:inline">Year:</span>
                <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                  className="px-3 py-2 rounded-xl border border-slate-300 bg-white text-xs text-slate-800 focus:border-sky-500"
                >
                  {years.map((yr) => (
                    <option key={yr} value={yr}>
                      {yr === 'All' ? 'All Years' : yr}
                    </option>
                  ))}
                </select>
              </div>

              {/* Region Filter */}
              <div className="flex items-center gap-1.5">
                <span className="text-xs text-slate-500 font-medium hidden sm:inline">Region:</span>
                <select
                  value={selectedRegion}
                  onChange={(e) => setSelectedRegion(e.target.value)}
                  className="px-3 py-2 rounded-xl border border-slate-300 bg-white text-xs text-slate-800 focus:border-sky-500"
                >
                  {regions.map((rg) => (
                    <option key={rg} value={rg}>
                      {rg === 'All' ? 'All Regions' : rg}
                    </option>
                  ))}
                </select>
              </div>

              {(searchQuery || selectedType !== 'All' || selectedYear !== 'All' || selectedRegion !== 'All') && (
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedType('All');
                    setSelectedYear('All');
                    setSelectedRegion('All');
                  }}
                  className="text-xs text-rose-600 hover:text-rose-800 font-semibold px-2 py-1"
                >
                  Clear Filters
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Activities Listing Grid */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-600 uppercase tracking-wider">
              Showing {filteredActivities.length} Archival {filteredActivities.length === 1 ? 'Activity' : 'Activities'}
            </span>
            <span className="text-xs text-slate-500">
              Source: National Centre for Polar and Ocean Research (NCPOR)
            </span>
          </div>

          {filteredActivities.length === 0 ? (
            <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-3">
              <Building2 className="w-12 h-12 text-slate-300 mx-auto" />
              <p className="text-base font-bold text-slate-800">No institutional activities found</p>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                No archived events matched your current search filters. Try resetting the filters above.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredActivities.map((act) => {
                const coverImage = act.images?.[0]?.url;

                return (
                  <div
                    key={act.id}
                    onClick={() => setActiveActivity(act)}
                    className="bg-white rounded-2xl border border-slate-200 hover:border-slate-300 hover:shadow-md transition cursor-pointer flex flex-col overflow-hidden group"
                  >
                    {/* Image Header if available */}
                    {coverImage && (
                      <div className="h-48 w-full overflow-hidden relative bg-slate-900">
                        <img
                          src={coverImage}
                          alt={act.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
                        <div className="absolute top-3 left-3 flex items-center gap-1.5">
                          <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border shadow-xs ${getTypeBadgeStyle(act.activityType)}`}>
                            {act.activityType}
                          </span>
                        </div>
                        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[11px] text-white/90">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5 text-amber-400" />
                            {new Date(act.date).toLocaleDateString('en-IN', {
                              day: 'numeric',
                              month: 'short',
                              year: 'numeric'
                            })}
                          </span>
                          <span className="flex items-center gap-1 truncate max-w-[150px]">
                            <MapPin className="w-3.5 h-3.5 text-sky-400" />
                            {act.location}
                          </span>
                        </div>
                      </div>
                    )}

                    {/* Content Section */}
                    <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                      <div className="space-y-2">
                        {!coverImage && (
                          <div className="flex items-center justify-between gap-2 mb-2">
                            <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${getTypeBadgeStyle(act.activityType)}`}>
                              {act.activityType}
                            </span>
                            <span className="text-xs text-slate-500 flex items-center gap-1">
                              <Calendar className="w-3.5 h-3.5" />
                              {act.date}
                            </span>
                          </div>
                        )}

                        <h3 className="text-base font-bold text-slate-900 group-hover:text-sky-800 transition line-clamp-2 leading-snug">
                          {act.title}
                        </h3>

                        <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                          {act.shortDescription}
                        </p>
                      </div>

                      <div className="space-y-3 pt-3 border-t border-slate-100">
                        {/* Participating Institutions */}
                        <div className="flex flex-wrap gap-1.5">
                          {act.participatingInstitutions.slice(0, 3).map((inst) => (
                            <span
                              key={inst}
                              className="text-[10px] px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 font-medium"
                            >
                              {inst}
                            </span>
                          ))}
                          {act.participatingInstitutions.length > 3 && (
                            <span className="text-[10px] px-1.5 py-0.5 text-slate-400 font-medium">
                              +{act.participatingInstitutions.length - 3} more
                            </span>
                          )}
                        </div>

                        {/* Card Footer */}
                        <div className="flex items-center justify-between text-xs pt-1">
                          <span className="text-[11px] font-mono text-slate-400">{act.id}</span>
                          <span className="text-sky-700 font-semibold flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                            <span>View Dossier</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Published Activity Outreach Dispatches */}
          {publishedActivityDrafts.length > 0 && (
            <div className="space-y-4 pt-6 border-t border-slate-200">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-900">
                <Building2 className="w-4 h-4 text-amber-600" />
                <span>Verified Activity Briefs & Dispatches ({publishedActivityDrafts.length})</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {publishedActivityDrafts.map((d) => (
                  <div
                    key={d.id}
                    onClick={() => onNavigate(`/content/${d.id}`)}
                    className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-amber-400 hover:shadow-md cursor-pointer transition flex flex-col justify-between space-y-3 group"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-50 text-amber-900 border border-amber-200">
                          {d.destinationSpecificType || d.contentType}
                        </span>
                        <span className="text-[11px] text-emerald-700 font-medium flex items-center gap-1">
                          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                          Institutional Dissemination
                        </span>
                      </div>
                      <h4 className="text-sm font-bold text-slate-900 group-hover:text-amber-900 leading-snug">
                        {d.title}
                      </h4>
                      <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                        {d.summary}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                      <span>Source: <strong>{d.resourceId}</strong></span>
                      <span className="text-amber-700 font-semibold flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                        <span>Read Dispatch</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Activity Detail Modal */}
      {activeActivity && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-3xl w-full border border-slate-200 shadow-2xl overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="p-6 bg-slate-900 text-white relative">
              <button
                onClick={() => setActiveActivity(null)}
                className="absolute top-5 right-5 p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-2 mb-2">
                <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${getTypeBadgeStyle(activeActivity.activityType)}`}>
                  {activeActivity.activityType}
                </span>
                <span className="text-xs text-slate-300 font-mono">
                  {activeActivity.id}
                </span>
                {activeActivity.region && (
                  <span className="text-xs px-2 py-0.5 rounded-md bg-slate-800 text-sky-300 border border-slate-700">
                    {activeActivity.region}
                  </span>
                )}
              </div>

              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white leading-snug font-serif pr-8">
                {activeActivity.title}
              </h2>

              <div className="flex flex-wrap items-center gap-4 text-xs text-slate-300 mt-3 pt-3 border-t border-slate-800">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-amber-400" />
                  {activeActivity.date}
                </span>
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-sky-400" />
                  {activeActivity.location}
                </span>
                <span className="flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5 text-emerald-400" />
                  {activeActivity.organizingInstitution}
                </span>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8 space-y-6 max-h-[75vh] overflow-y-auto">
              {/* Image Preview if present */}
              {activeActivity.images && activeActivity.images.length > 0 && (
                <div className="space-y-2">
                  <div className="rounded-2xl overflow-hidden bg-slate-900 border border-slate-200">
                    <img
                      src={activeActivity.images[0].url}
                      alt={activeActivity.title}
                      className="w-full max-h-72 object-cover"
                    />
                  </div>
                  {activeActivity.images[0].caption && (
                    <p className="text-[11px] text-slate-500 italic text-center">
                      {activeActivity.images[0].caption}
                      {activeActivity.images[0].credit && (
                        <span> — Credit: {activeActivity.images[0].credit}</span>
                      )}
                    </p>
                  )}
                </div>
              )}

              {/* Full Description */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Event Overview & Scope
                </h4>
                <p className="text-sm text-slate-700 leading-relaxed">
                  {activeActivity.description}
                </p>
              </div>

              {/* Key Highlights / Outcomes */}
              {activeActivity.highlights && activeActivity.highlights.length > 0 && (
                <div className="space-y-3 bg-amber-50/60 rounded-2xl border border-amber-200/80 p-5">
                  <h4 className="text-xs font-bold text-amber-900 uppercase tracking-wider flex items-center gap-1.5">
                    <Award className="w-4 h-4 text-amber-600" />
                    <span>Key Highlights & Outcomes</span>
                  </h4>
                  <ul className="space-y-2">
                    {activeActivity.highlights.map((hl, i) => (
                      <li key={i} className="text-xs sm:text-sm text-amber-950 flex items-start gap-2 leading-relaxed">
                        <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                        <span>{hl}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Participating Institutions */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                  <Users className="w-4 h-4 text-sky-600" />
                  <span>Participating Scientific Institutions & Universities</span>
                </h4>
                <div className="flex flex-wrap gap-2 pt-1">
                  {activeActivity.participatingInstitutions.map((inst) => (
                    <span
                      key={inst}
                      className="text-xs px-3 py-1 rounded-xl bg-slate-100 text-slate-800 font-medium border border-slate-200"
                    >
                      {inst}
                    </span>
                  ))}
                </div>
              </div>

              {/* Related Scientific Resources */}
              {activeActivity.relatedResourceIds && activeActivity.relatedResourceIds.length > 0 && (
                <div className="space-y-2 pt-4 border-t border-slate-100">
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                    Associated Scientific Repository Records
                  </h4>
                  <div className="space-y-2">
                    {activeActivity.relatedResourceIds.map((resId) => {
                      const res = store.getResourceById(resId);
                      return (
                        <div
                          key={resId}
                          onClick={() => {
                            setActiveActivity(null);
                            onNavigate(`/repository/${resId}`);
                          }}
                          className="p-3 rounded-xl bg-sky-50/60 border border-sky-200 hover:bg-sky-100/80 transition cursor-pointer flex items-center justify-between text-xs text-sky-900"
                        >
                          <div>
                            <span className="font-mono font-bold text-sky-700 mr-2">{resId}</span>
                            <span className="font-semibold">{res?.title || 'Scientific Resource Dossier'}</span>
                          </div>
                          <ArrowRight className="w-4 h-4 text-sky-600 shrink-0 ml-2" />
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
              <span className="flex items-center gap-1 text-emerald-700 font-semibold">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>NCPOR Institutional Verification Status: Verified</span>
              </span>
              <button
                onClick={() => setActiveActivity(null)}
                className="px-4 py-2 rounded-xl bg-slate-800 text-white font-semibold hover:bg-slate-700 transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
