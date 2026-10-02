import React, { useState } from 'react';
import { store } from '../../services/storage';
import { ActivityLog } from '../../types';
import {
  Activity,
  Search,
  Filter,
  Calendar,
  UserCheck,
  Shield,
  Clock,
  Database,
  FileText,
  CheckCircle2,
  AlertTriangle,
  RotateCcw
} from 'lucide-react';

interface AdminActivityPageProps {
  onNavigate: (route: string) => void;
}

export const AdminActivityPage: React.FC<AdminActivityPageProps> = ({ onNavigate }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterAction, setFilterAction] = useState<string>('ALL');

  const activities = store.getActivities();

  const filtered = activities.filter((act) => {
    if (filterAction !== 'ALL' && act.action !== filterAction) return false;
    const q = searchTerm.toLowerCase();
    return (
      act.userName.toLowerCase().includes(q) ||
      act.targetTitle.toLowerCase().includes(q) ||
      act.action.toLowerCase().includes(q) ||
      (act.details && act.details.toLowerCase().includes(q))
    );
  });

  const getActionBadge = (action: string) => {
    switch (action) {
      case 'STORE_RESOURCE':
        return <span className="bg-sky-50 text-sky-800 border border-sky-200 px-2 py-0.5 rounded font-mono font-bold text-[10px]">STORE_RESOURCE</span>;
      case 'CREATE_DRAFT':
        return <span className="bg-indigo-50 text-indigo-800 border border-indigo-200 px-2 py-0.5 rounded font-mono font-bold text-[10px]">CREATE_DRAFT</span>;
      case 'APPROVE_PUBLISH':
        return <span className="bg-emerald-50 text-emerald-800 border border-emerald-200 px-2 py-0.5 rounded font-mono font-bold text-[10px]">APPROVE_PUBLISH</span>;
      case 'REQUEST_CHANGES':
        return <span className="bg-amber-50 text-amber-800 border border-amber-200 px-2 py-0.5 rounded font-mono font-bold text-[10px]">REQUEST_CHANGES</span>;
      case 'REJECT_DRAFT':
        return <span className="bg-rose-50 text-rose-800 border border-rose-200 px-2 py-0.5 rounded font-mono font-bold text-[10px]">REJECT_DRAFT</span>;
      case 'ADD_CONTRIBUTOR':
        return <span className="bg-purple-50 text-purple-800 border border-purple-200 px-2 py-0.5 rounded font-mono font-bold text-[10px]">ADD_SCIENTIST</span>;
      default:
        return <span className="bg-slate-100 text-slate-700 border border-slate-200 px-2 py-0.5 rounded font-mono font-bold text-[10px]">{action}</span>;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-sky-800 uppercase tracking-wider mb-1">
            <Activity className="w-4 h-4 text-sky-700" />
            <span>Audit Trail & Governance</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-serif">
            System Activity Log
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Immutable transaction record of all scientific resource deposits, AI transformations, reviews, and publication sign-offs.
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs bg-white p-3 rounded-xl border border-slate-200 shadow-xs">
        <div className="relative w-full max-w-sm">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by user, resource title, or details..."
            className="w-full pl-9 pr-3 py-1.5 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-sky-500 focus:outline-none"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2" />
        </div>

        <div className="flex items-center gap-2">
          <span className="text-slate-500 font-medium">Action:</span>
          <select
            value={filterAction}
            onChange={(e) => setFilterAction(e.target.value)}
            className="px-2.5 py-1.5 rounded-lg border border-slate-300 bg-white text-xs font-medium focus:ring-2 focus:ring-sky-500 focus:outline-none"
          >
            <option value="ALL">All Actions</option>
            <option value="STORE_RESOURCE">STORE_RESOURCE</option>
            <option value="CREATE_DRAFT">CREATE_DRAFT</option>
            <option value="APPROVE_PUBLISH">APPROVE_PUBLISH</option>
            <option value="REQUEST_CHANGES">REQUEST_CHANGES</option>
            <option value="REJECT_DRAFT">REJECT_DRAFT</option>
            <option value="ADD_CONTRIBUTOR">ADD_SCIENTIST</option>
          </select>
        </div>
      </div>

      {/* Activity Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 text-slate-700 font-bold border-b border-slate-200">
                <th className="py-3 px-4">Timestamp</th>
                <th className="py-3 px-4">Action</th>
                <th className="py-3 px-4">User</th>
                <th className="py-3 px-4">Target Resource / Draft</th>
                <th className="py-3 px-4">Operational Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((log) => (
                <tr key={log.id} className="hover:bg-slate-50/70 transition">
                  <td className="py-3 px-4 font-mono text-[11px] text-slate-500 whitespace-nowrap">
                    {new Date(log.timestamp).toLocaleString()}
                  </td>

                  <td className="py-3 px-4 whitespace-nowrap">
                    {getActionBadge(log.action)}
                  </td>

                  <td className="py-3 px-4">
                    <div className="font-semibold text-slate-900">{log.userName}</div>
                    <div className="text-[10px] text-slate-500">{log.userRole}</div>
                  </td>

                  <td className="py-3 px-4">
                    <div className="font-mono text-[10px] text-sky-800 font-bold">{log.targetId}</div>
                    <div className="text-slate-800 font-medium truncate max-w-[220px]">
                      {log.targetTitle}
                    </div>
                  </td>

                  <td className="py-3 px-4 text-slate-600 max-w-sm">
                    {log.details || '—'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
