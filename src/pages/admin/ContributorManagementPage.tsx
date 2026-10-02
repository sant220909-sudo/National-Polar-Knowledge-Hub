import React, { useState } from 'react';
import { store } from '../../services/storage';
import { User, UserRole } from '../../types';
import {
  Users,
  PlusCircle,
  CheckCircle2,
  XCircle,
  Mail,
  Shield,
  UserCheck,
  Search,
  X,
  Building
} from 'lucide-react';

interface ContributorManagementPageProps {
  onNavigate: (route: string) => void;
}

export const ContributorManagementPage: React.FC<ContributorManagementPageProps> = ({
  onNavigate
}) => {
  const [users, setUsers] = useState<User[]>(store.getUsers());
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  // New Contributor Form
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [department, setDepartment] = useState('Cryospheric Sciences Division');
  const [designation, setDesignation] = useState('Senior Research Scientist');
  const [role, setRole] = useState<UserRole>('CONTENT_CONTRIBUTOR');
  const [tempPassword, setTempPassword] = useState('Polar@2026');

  const handleToggleStatus = (userId: string) => {
    store.toggleUserStatus(userId);
    setUsers(store.getUsers());
  };

  const handleAddContributor = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;

    store.addContributor({
      name,
      email,
      department,
      designation,
      role,
      status: 'Active'
    });

    setUsers(store.getUsers());
    setShowAddModal(false);
    setName('');
    setEmail('');
  };

  const filteredUsers = users.filter((u) => {
    const q = searchTerm.toLowerCase();
    return (
      u.name.toLowerCase().includes(q) ||
      u.email.toLowerCase().includes(q) ||
      u.department.toLowerCase().includes(q)
    );
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-sky-700 uppercase tracking-wider mb-1">
            <Users className="w-4 h-4 text-sky-600" />
            <span>Personnel & Access Governance</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Contributor Management
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Authorize credentialed researchers, assign institutional divisions, and regulate scientific submission privileges.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-sky-950 text-white font-bold text-xs shadow-md transition shrink-0"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Add New Contributor</span>
        </button>
      </div>

      {/* Search Bar */}
      <div className="flex items-center justify-between gap-4 text-xs">
        <div className="relative w-full max-w-sm">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search contributor by name, email, or department..."
            className="w-full p-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 placeholder-slate-400 focus:border-sky-500"
          />
        </div>

        <div className="text-slate-500 font-medium">
          Total Registered: <strong className="text-slate-800">{users.length}</strong>
        </div>
      </div>

      {/* Contributor Directory Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 border-b border-slate-100 uppercase tracking-wider text-[10px] font-bold">
              <tr>
                <th className="px-6 py-4">Researcher Name</th>
                <th className="px-6 py-4">Email</th>
                <th className="px-6 py-4">Department / Division</th>
                <th className="px-6 py-4">System Role</th>
                <th className="px-6 py-4">Account Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredUsers.map((u) => (
                <tr key={u.id} className="hover:bg-slate-50/80 transition">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-sky-100 text-sky-800 font-bold flex items-center justify-center text-xs">
                        {u.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-bold text-slate-900">{u.name}</div>
                        <div className="text-[11px] text-slate-500">{u.designation || 'Scientific Contributor'}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-slate-600 font-mono text-[11px]">
                    {u.email}
                  </td>
                  <td className="px-6 py-4 max-w-xs text-slate-700">
                    {u.department}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      u.role === 'ADMINISTRATOR'
                        ? 'bg-purple-100 text-purple-900 border border-purple-200'
                        : 'bg-sky-100 text-sky-900 border border-sky-200'
                    }`}>
                      {u.role.replace(/_/g, ' ')}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      u.status === 'Active'
                        ? 'bg-emerald-50 text-emerald-700'
                        : 'bg-rose-50 text-rose-700'
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${u.status === 'Active' ? 'bg-emerald-500' : 'bg-rose-500'}`} />
                      {u.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <button
                      onClick={() => handleToggleStatus(u.id)}
                      className={`text-xs font-semibold px-3 py-1 rounded-lg border transition ${
                        u.status === 'Active'
                          ? 'border-slate-200 text-slate-600 hover:bg-slate-100'
                          : 'border-emerald-200 text-emerald-700 hover:bg-emerald-50'
                      }`}
                    >
                      {u.status === 'Active' ? 'Deactivate' : 'Reactivate'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal: Add Contributor */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-fadeIn">
          <div className="w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden">
            <div className="bg-slate-900 p-5 text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-sky-400" />
                <h3 className="font-bold text-base">Register Authorized Contributor</h3>
              </div>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-white p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddContributor} className="p-6 space-y-4 text-xs">
              <div>
                <label className="font-semibold text-slate-800 block mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Dr. Anand Verma"
                  className="w-full p-2.5 rounded-xl border border-slate-300 text-slate-900"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-800 block mb-1">Institutional Email *</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. anand.verma@polarknowledge.demo"
                  className="w-full p-2.5 rounded-xl border border-slate-300 text-slate-900"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-800 block mb-1">Department / Scientific Division</label>
                <input
                  type="text"
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-300 text-slate-900"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-800 block mb-1">System Role</label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value as UserRole)}
                  className="w-full p-2.5 rounded-xl border border-slate-300 text-slate-900 bg-white"
                >
                  <option value="CONTENT_CONTRIBUTOR">Content Contributor (Default)</option>
                  <option value="ADMINISTRATOR">Administrator Reviewer</option>
                </select>
              </div>

              <div>
                <label className="font-semibold text-slate-800 block mb-1">Temporary Initial Password</label>
                <input
                  type="text"
                  value={tempPassword}
                  onChange={(e) => setTempPassword(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-300 text-slate-900 font-mono"
                />
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-sky-950 text-white font-bold transition shadow-xs"
                >
                  Register Researcher
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
