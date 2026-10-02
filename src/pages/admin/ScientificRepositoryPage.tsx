import React, { useState } from 'react';
import { store } from '../../services/storage';
import { PolarRegion, ResourceType, User } from '../../types';
import {
  Database,
  Search,
  Filter,
  FileText,
  BarChart3,
  Image as ImageIcon,
  Film,
  MapPin,
  Calendar,
  ExternalLink,
  ChevronRight,
  Sparkles,
  Layers,
  ArrowRight
} from 'lucide-react';

interface ScientificRepositoryPageProps {
  currentUser: User;
  onNavigate: (route: string) => void;
}

export const ScientificRepositoryPage: React.FC<ScientificRepositoryPageProps> = ({
  currentUser,
  onNavigate
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('ALL');
  const [regionFilter, setRegionFilter] = useState<string>('ALL');
  const [visibilityFilter, setVisibilityFilter] = useState<string>('ALL');

  const allResources = store.getResources();

  const filteredResources = allResources.filter((res) => {
    const matchesSearch =
      res.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      res.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      res.researchers.some((r) => r.toLowerCase().includes(searchTerm.toLowerCase())) ||
      res.topic.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesType = typeFilter === 'ALL' || res.type.toUpperCase() === typeFilter.toUpperCase();
    const matchesRegion = regionFilter === 'ALL' || res.region === regionFilter;
    const matchesVisibility = visibilityFilter === 'ALL' || (res.visibility || 'PUBLIC') === visibilityFilter;

    return matchesSearch && matchesType && matchesRegion && matchesVisibility;
  });

  const getFileIcon = (type: string) => {
    switch (type.toUpperCase()) {
      case 'DOCUMENT':
        return <FileText className="w-4 h-4 text-rose-600" />;
      case 'DATASET':
        return <BarChart3 className="w-4 h-4 text-emerald-600" />;
      case 'IMAGE':
        return <ImageIcon className="w-4 h-4 text-sky-600" />;
      case 'VIDEO':
        return <Film className="w-4 h-4 text-purple-600" />;
      default:
        return <FileText className="w-4 h-4 text-slate-600" />;
    }
  };

  const docCount = allResources.filter((r) => r.type === 'DOCUMENT' || r.type === 'Document').length;
  const datasetCount = allResources.filter((r) => r.type === 'DATASET' || r.type === 'Dataset').length;
  const mediaCount = allResources.filter((r) => r.type === 'IMAGE' || r.type === 'VIDEO' || r.type === 'Image' || r.type === 'Video').length;

  if (currentUser.role === 'PUBLIC_USER') {
    return (
      <div className="min-h-[70vh] flex items-center justify-center p-4 sm:p-6 bg-slate-50">
        <div className="max-w-xl w-full bg-white rounded-2xl border border-slate-200 shadow-xl p-8 text-center space-y-6">
          <div className="w-14 h-14 rounded-2xl bg-amber-50 border border-amber-200 text-amber-800 flex items-center justify-center mx-auto">
            <Database className="w-7 h-7 text-amber-700" />
          </div>

          <div className="space-y-2">
            <span className="text-[11px] font-mono uppercase tracking-wider text-amber-800 bg-amber-50 px-2.5 py-0.5 rounded border border-amber-200">
              Access Restricted · Internal Repository
            </span>
            <h1 className="text-2xl font-bold text-slate-900 font-serif">
              Scientific Knowledge Repository
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-md mx-auto">
              The Scientific Knowledge Repository is an internal repository reserved for accredited Scientists and Administrators. Public users can browse peer-verified outreach research articles and expedition documentation.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-left text-xs space-y-1 text-slate-600">
            <div className="font-semibold text-slate-900">National Polar Science Data Governance:</div>
            <div>• Raw datasets & sensor telemetry</div>
            <div>• Internal PDF cruise & borehole reports</div>
            <div>• AI outreach synthesis & draft editing</div>
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs text-sky-800 font-semibold tracking-wide uppercase">
            <Database className="w-4 h-4 text-sky-600" />
            <span>Institutional Repository Management</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Scientific Knowledge Repository
          </h1>
          <p className="text-xs sm:text-sm text-slate-600">
            Centrally cataloging all original expedition reports, research datasets, photographs, and institutional activity records.
          </p>
        </div>

        <button
          onClick={() => onNavigate('/contributor/upload')}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold shadow-xs transition self-start sm:self-center"
        >
          <Database className="w-3.5 h-3.5 text-sky-400" />
          <span>+ Deposit New Resource</span>
        </button>
      </div>

      {/* Repository Metrics Overview */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
            Total Preserved Resources
          </span>
          <div className="text-2xl font-bold text-slate-900 mt-1">{allResources.length}</div>
          <span className="text-[10px] text-emerald-600 font-medium">100% SHA-256 archived</span>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
            Documents & Reports
          </span>
          <div className="text-2xl font-bold text-slate-900 mt-1">{docCount}</div>
          <span className="text-[10px] text-slate-400">Expedition monographs</span>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
            Scientific Datasets
          </span>
          <div className="text-2xl font-bold text-slate-900 mt-1">{datasetCount}</div>
          <span className="text-[10px] text-slate-400">Sensor & CTD hydrography</span>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
            Media Collections
          </span>
          <div className="text-2xl font-bold text-slate-900 mt-1">{mediaCount}</div>
          <span className="text-[10px] text-slate-400">Field imagery & video logs</span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs flex flex-col md:flex-row items-center justify-between gap-3 text-xs">
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by ID, title, researchers, or topic..."
            className="w-full pl-9 pr-3 py-2 rounded-lg border border-slate-300 text-xs text-slate-900 placeholder-slate-400 focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
          />
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto flex-wrap">
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="px-3 py-2 rounded-lg border border-slate-300 text-xs text-slate-800 bg-white"
          >
            <option value="ALL">All Types</option>
            <option value="DOCUMENT">Documents</option>
            <option value="DATASET">Datasets</option>
            <option value="IMAGE">Images</option>
            <option value="VIDEO">Videos</option>
          </select>

          <select
            value={regionFilter}
            onChange={(e) => setRegionFilter(e.target.value)}
            className="px-3 py-2 rounded-lg border border-slate-300 text-xs text-slate-800 bg-white"
          >
            <option value="ALL">All Regions</option>
            <option value="Antarctica">Antarctica</option>
            <option value="Arctic">Arctic</option>
            <option value="Southern Ocean">Southern Ocean</option>
            <option value="Himalayas (Third Pole)">Himalayas</option>
          </select>

          <select
            value={visibilityFilter}
            onChange={(e) => setVisibilityFilter(e.target.value)}
            className="px-3 py-2 rounded-lg border border-slate-300 text-xs text-slate-800 bg-white"
          >
            <option value="ALL">All Visibilities</option>
            <option value="PUBLIC">Public (Dissemination OK)</option>
            <option value="PROTECTED">Protected (Restricted)</option>
            <option value="PRIVATE">Private (Internal Only)</option>
          </select>

          <span className="text-slate-400 text-xs pl-2">
            Showing {filteredResources.length} resource(s)
          </span>
        </div>
      </div>

      {/* Resources Table */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold uppercase tracking-wider text-[10px]">
              <tr>
                <th className="py-3.5 px-4">Resource ID</th>
                <th className="py-3.5 px-4">Title & Research Domain</th>
                <th className="py-3.5 px-4">Type</th>
                <th className="py-3.5 px-4">Region / Year</th>
                <th className="py-3.5 px-4">Preserved Files</th>
                <th className="py-3.5 px-4">Derived Outreach</th>
                <th className="py-3.5 px-4">Visibility</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredResources.map((res) => {
                const derivedCount = store.getDraftsByResourceId(res.id).length;
                return (
                  <tr key={res.id} className="hover:bg-slate-50/80 transition group">
                    <td className="py-3.5 px-4 font-mono font-bold text-sky-900 whitespace-nowrap">
                      {res.id}
                    </td>

                    <td className="py-3.5 px-4 max-w-sm">
                      <div className="font-semibold text-slate-900 group-hover:text-sky-900 transition line-clamp-1">
                        {res.title}
                      </div>
                      <div className="text-[11px] text-slate-500 mt-0.5 line-clamp-1">
                        {res.topic} · {res.researchers.join(', ')}
                      </div>
                    </td>

                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <div className="flex items-center gap-1.5 font-medium">
                        {getFileIcon(res.type)}
                        <span>{res.type}</span>
                      </div>
                    </td>

                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <div>{res.region}</div>
                      <div className="text-[10px] text-slate-400">{res.year}</div>
                    </td>

                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <span className="font-medium text-slate-800">{res.files.length} file(s)</span>
                      <div className="text-[10px] text-slate-400">
                        {res.files.reduce((acc, f) => acc + f.sizeMb, 0).toFixed(1)} MB total
                      </div>
                    </td>

                    <td className="py-3.5 px-4 whitespace-nowrap">
                      {derivedCount > 0 ? (
                        <span className="px-2 py-0.5 rounded bg-sky-50 text-sky-800 border border-sky-200 text-[11px] font-medium">
                          {derivedCount} content piece(s)
                        </span>
                      ) : (
                        <span className="text-slate-400 text-[11px] italic">
                          None (Original only)
                        </span>
                      )}
                    </td>

                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <span className={`inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded border ${
                        res.visibility === 'PUBLIC'
                          ? 'text-emerald-800 bg-emerald-50 border-emerald-200'
                          : res.visibility === 'PROTECTED'
                          ? 'text-amber-800 bg-amber-50 border-amber-200'
                          : 'text-slate-700 bg-slate-100 border-slate-200'
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${
                          res.visibility === 'PUBLIC'
                            ? 'bg-emerald-500'
                            : res.visibility === 'PROTECTED'
                            ? 'bg-amber-500'
                            : 'bg-slate-500'
                        }`}></span>
                        {res.visibility || 'PUBLIC'}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                        {res.status}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 text-right whitespace-nowrap">
                      <button
                        onClick={() => onNavigate(`/repository/${res.id}`)}
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-sky-50 text-slate-700 hover:text-sky-900 border border-slate-200 hover:border-sky-300 font-medium transition"
                      >
                        <span>View Resource</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
