import React, { useState } from 'react';
import { store } from '../../services/storage';
import { User } from '../../types';
import { ScientistMissionLifecycle } from '../../components/common/ScientistMissionLifecycle';
import {
  Users,
  PlusCircle,
  CheckCircle2,
  Search,
  X,
  Database,
  FileText,
  Edit2,
  Eye,
  Key,
  Shield,
  Building,
  Compass
} from 'lucide-react';

interface ScientistsManagementPageProps {
  onNavigate: (route: string) => void;
}

export const ScientistsManagementPage: React.FC<ScientistsManagementPageProps> = ({
  onNavigate
}) => {
  const [users, setUsers] = useState<User[]>(store.getUsers());
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('ALL');

  // Modals
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingScientist, setEditingScientist] = useState<User | null>(null);
  const [viewingScientist, setViewingScientist] = useState<User | null>(null);

  // Add Scientist Form Fields (Specification requirement)
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [institution, setInstitution] = useState('National Centre for Polar and Ocean Research (NCPOR)');
  const [designation, setDesignation] = useState('Scientist-E, Cryospheric Sciences');
  const [accountStatus, setAccountStatus] = useState<'Active' | 'Inactive'>('Active');
  const [tempPassword, setTempPassword] = useState('Polar@2026!');

  // Toast
  const [notification, setNotification] = useState<string | null>(null);

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3500);
  };

  const handleGeneratePassword = () => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789!@#$';
    let pass = 'Polar-';
    for (let i = 0; i < 6; i++) {
      pass += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setTempPassword(pass);
  };

  const handleAddScientist = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email) return;

    const username = email.split('@')[0].toLowerCase();

    store.addContributor({
      name: fullName.trim(),
      email: email.trim().toLowerCase(),
      username,
      role: 'CONTENT_CONTRIBUTOR',
      institution: institution.trim(),
      designation: designation.trim(),
      department: 'Polar Science Wing',
      tempPassword,
      status: accountStatus
    });

    setUsers(store.getUsers());
    setShowAddModal(false);

    // Reset form
    setFullName('');
    setEmail('');
    setInstitution('National Centre for Polar and Ocean Research (NCPOR)');
    setDesignation('Scientist-E, Cryospheric Sciences');
    setTempPassword('Polar@2026!');

    showNotification(`Scientist credentials provisioned for ${fullName}. Account invitation generated.`);
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingScientist) return;

    store.updateUser(editingScientist.id, {
      name: editingScientist.name,
      email: editingScientist.email,
      institution: editingScientist.institution,
      designation: editingScientist.designation,
      status: editingScientist.status
    });

    setUsers(store.getUsers());
    setEditingScientist(null);
    showNotification(`Updated profile for ${editingScientist.name}`);
  };

  const handleToggleStatus = (userId: string) => {
    store.toggleUserStatus(userId);
    setUsers(store.getUsers());
    const user = store.getUsers().find((u) => u.id === userId);
    if (user) {
      showNotification(`${user.name} account is now ${user.status}.`);
    }
  };

  // Filter scientists (all users with role CONTENT_CONTRIBUTOR)
  const scientists = users.filter((u) => u.role === 'CONTENT_CONTRIBUTOR');

  const filteredScientists = scientists.filter((u) => {
    if (filterStatus !== 'ALL' && u.status !== filterStatus) return false;
    const q = searchTerm.toLowerCase();
    return (
      u.name.toLowerCase().includes(q) ||
      u.email.toLowerCase().includes(q) ||
      (u.institution && u.institution.toLowerCase().includes(q)) ||
      (u.designation && u.designation.toLowerCase().includes(q))
    );
  });

  const allResources = store.getResources();
  const allDrafts = store.getDrafts();

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Toast Notification */}
      {notification && (
        <div className="fixed top-20 right-6 z-50 p-4 rounded-xl bg-slate-900 text-white shadow-xl flex items-center gap-3 text-xs sm:text-sm border border-slate-700 animate-fadeIn">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span>{notification}</span>
        </div>
      )}

      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-sky-800 uppercase tracking-wider mb-1">
            <Users className="w-4 h-4 text-sky-700" />
            <span>Personnel & Access Governance</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-serif">
            Scientist Directory
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Authorize credentialed researchers, assign institutional designations, and manage repository deposit privileges.
          </p>
        </div>

        <button
          onClick={() => {
            handleGeneratePassword();
            setShowAddModal(true);
          }}
          className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-sky-800 hover:bg-sky-900 text-white font-bold text-xs shadow-xs transition shrink-0"
        >
          <PlusCircle className="w-4 h-4" />
          <span>+ Add Scientist</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs bg-white p-3 rounded-xl border border-slate-200 shadow-2xs">
        <div className="relative w-full max-w-sm">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by name, email, institution, designation..."
            className="w-full pl-9 pr-3 py-1.5 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-sky-500 focus:outline-none"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2" />
        </div>

        <div className="flex items-center gap-2">
          <span className="text-slate-500 font-medium">Status:</span>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-2.5 py-1.5 rounded-lg border border-slate-300 bg-white text-xs font-medium focus:ring-2 focus:ring-sky-500 focus:outline-none"
          >
            <option value="ALL">All Statuses</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>
      </div>

      {/* Concise Scientist Table: Name | Institution | Designation | Status | Resources | Content */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 text-slate-700 font-bold border-b border-slate-200">
                <th className="py-3 px-4">Name</th>
                <th className="py-3 px-4">Institution</th>
                <th className="py-3 px-4">Designation</th>
                <th className="py-3 px-4">Expedition Lifecycle</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-center">Resources</th>
                <th className="py-3 px-4 text-center">Content</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredScientists.map((sc) => {
                const scientistResources = allResources.filter((r) => r.uploadedBy === sc.id);
                const scientistDrafts = allDrafts.filter((d) => d.contributorId === sc.id);
                const mission = store.getScientistMission(sc.id);

                return (
                  <tr key={sc.id} className="hover:bg-slate-50/70 transition">
                    <td className="py-3 px-4">
                      <div className="font-bold text-slate-900">{sc.name}</div>
                      <div className="text-[11px] text-slate-500 font-mono">{sc.email}</div>
                    </td>

                    <td className="py-3 px-4 font-medium text-slate-800">
                      {sc.institution || 'NCPOR, Goa'}
                    </td>

                    <td className="py-3 px-4 text-slate-700">
                      {sc.designation || 'Polar Scientist'}
                    </td>

                    <td className="py-3 px-4">
                      <div className="flex items-center gap-1.5">
                        <span
                          className={`w-2 h-2 rounded-full ${
                            mission.overallPercent === 100
                              ? 'bg-emerald-500'
                              : 'bg-sky-500 animate-pulse'
                          }`}
                        />
                        <span className="font-semibold text-slate-800 text-[11px]">
                          {mission.currentPhase.split(':')[0]}
                        </span>
                        <span className="text-[10px] font-mono text-sky-800 font-bold bg-sky-50 px-1 py-0.2 rounded border border-sky-200">
                          {mission.overallPercent}%
                        </span>
                      </div>
                      <div className="text-[10px] text-slate-400 truncate max-w-[140px] mt-0.5">
                        {mission.expeditionName}
                      </div>
                    </td>

                    <td className="py-3 px-4">
                      <span
                        className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-semibold ${
                          sc.status === 'Active'
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : 'bg-slate-100 text-slate-600 border border-slate-200'
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            sc.status === 'Active' ? 'bg-emerald-500' : 'bg-slate-400'
                          }`}
                        ></span>
                        <span>{sc.status}</span>
                      </span>
                    </td>

                    <td className="py-3 px-4 text-center">
                      <span className="font-bold text-sky-900 bg-sky-50 px-2 py-0.5 rounded border border-sky-100">
                        {scientistResources.length}
                      </span>
                    </td>

                    <td className="py-3 px-4 text-center">
                      <span className="font-bold text-indigo-900 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-100">
                        {scientistDrafts.length}
                      </span>
                    </td>

                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => setViewingScientist(sc)}
                          className="p-1.5 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition"
                          title="View Profile & Submissions"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>

                        <button
                          onClick={() => setEditingScientist({ ...sc })}
                          className="p-1.5 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition"
                          title="Edit Scientist"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>

                        <button
                          onClick={() => handleToggleStatus(sc.id)}
                          className={`px-2 py-1 rounded text-[11px] font-semibold transition ${
                            sc.status === 'Active'
                              ? 'text-rose-700 hover:bg-rose-50'
                              : 'text-emerald-700 hover:bg-emerald-50'
                          }`}
                        >
                          {sc.status === 'Active' ? 'Deactivate' : 'Activate'}
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* ======================================================== */}
      {/* ADD SCIENTIST MODAL */}
      {/* ======================================================== */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl w-full max-w-lg overflow-hidden flex flex-col">
            <div className="p-4 sm:p-5 bg-slate-900 text-white flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold">Add Scientist / Content Contributor</h3>
                <p className="text-xs text-slate-300">
                  Provision institutional credentials. Scientists cannot self-register.
                </p>
              </div>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddScientist} className="p-5 space-y-4 text-xs">
              <div>
                <label className="block text-slate-700 font-bold mb-1">
                  Full Name <span className="text-rose-600">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Dr. K. P. Krishnan"
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-sky-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">
                  Institutional Email <span className="text-rose-600">*</span>
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. krishnan@ncpor.res.in"
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-sky-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">
                  Institution / Organization <span className="text-rose-600">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={institution}
                  onChange={(e) => setInstitution(e.target.value)}
                  placeholder="e.g. National Centre for Polar and Ocean Research (NCPOR)"
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-sky-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">
                  Designation / Role <span className="text-rose-600">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={designation}
                  onChange={(e) => setDesignation(e.target.value)}
                  placeholder="e.g. Scientist-E & Expedition Veteran"
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-sky-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3 items-end">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">
                    Temporary Password / Invitation Code
                  </label>
                  <input
                    type="text"
                    value={tempPassword}
                    onChange={(e) => setTempPassword(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs font-mono focus:ring-2 focus:ring-sky-500 focus:outline-none"
                  />
                </div>

                <div>
                  <button
                    type="button"
                    onClick={handleGeneratePassword}
                    className="w-full py-2 px-3 rounded-lg border border-slate-300 bg-slate-50 hover:bg-slate-100 text-slate-700 font-semibold text-xs transition"
                  >
                    Generate Code
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">
                  Account Status
                </label>
                <select
                  value={accountStatus}
                  onChange={(e) => setAccountStatus(e.target.value as 'Active' | 'Inactive')}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-sky-500 focus:outline-none"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-lg border border-slate-300 text-slate-700 font-semibold text-xs hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-sky-800 hover:bg-sky-900 text-white font-bold text-xs shadow-xs transition"
                >
                  Save & Provision Scientist
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* EDIT SCIENTIST MODAL */}
      {/* ======================================================== */}
      {editingScientist && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl w-full max-w-md overflow-hidden flex flex-col">
            <div className="p-4 bg-slate-900 text-white flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold">Edit Scientist</h3>
                <p className="text-xs text-slate-300">{editingScientist.name}</p>
              </div>
              <button
                onClick={() => setEditingScientist(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleEditSubmit} className="p-5 space-y-3.5 text-xs">
              <div>
                <label className="block text-slate-700 font-bold mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={editingScientist.name}
                  onChange={(e) =>
                    setEditingScientist({ ...editingScientist, name: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-sky-500"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Email</label>
                <input
                  type="email"
                  required
                  value={editingScientist.email}
                  onChange={(e) =>
                    setEditingScientist({ ...editingScientist, email: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-sky-500"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Institution</label>
                <input
                  type="text"
                  value={editingScientist.institution || ''}
                  onChange={(e) =>
                    setEditingScientist({ ...editingScientist, institution: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-sky-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Designation</label>
                  <input
                    type="text"
                    value={editingScientist.designation || ''}
                    onChange={(e) =>
                      setEditingScientist({ ...editingScientist, designation: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-sky-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">Status</label>
                  <select
                    value={editingScientist.status}
                    onChange={(e) =>
                      setEditingScientist({
                        ...editingScientist,
                        status: e.target.value as 'Active' | 'Inactive'
                      })
                    }
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-sky-500"
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditingScientist(null)}
                  className="px-4 py-2 rounded-lg border border-slate-300 text-slate-700 font-semibold text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-sky-800 hover:bg-sky-900 text-white font-bold text-xs"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* VIEW SCIENTIST PROFILE & SUBMISSIONS MODAL */}
      {/* ======================================================== */}
      {viewingScientist && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl w-full max-w-xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="p-5 bg-slate-900 text-white flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold">{viewingScientist.name}</h3>
                <p className="text-xs text-slate-300">
                  {viewingScientist.designation} · {viewingScientist.institution}
                </p>
              </div>
              <button
                onClick={() => setViewingScientist(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-5 space-y-4 overflow-y-auto text-xs">
              {/* Profile Overview */}
              <div className="grid grid-cols-2 gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Email</span>
                  <span className="font-semibold text-slate-800">{viewingScientist.email}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Status</span>
                  <span className={`font-semibold ${viewingScientist.status === 'Active' ? 'text-emerald-700' : 'text-slate-500'}`}>
                    {viewingScientist.status}
                  </span>
                </div>
              </div>

              {/* Mission Lifecycle: Expedition Phase Progression & Milestones */}
              <ScientistMissionLifecycle
                userId={viewingScientist.id}
                isEditable={true}
                compact={true}
              />

              {/* Uploaded Resources */}
              <div className="space-y-2">
                <div className="flex items-center justify-between font-bold text-slate-900 uppercase tracking-wider">
                  <span className="flex items-center gap-1.5">
                    <Database className="w-3.5 h-3.5 text-sky-700" />
                    <span>Preserved Scientific Resources</span>
                  </span>
                  <span className="text-slate-500 font-mono text-[11px]">
                    {allResources.filter((r) => r.uploadedBy === viewingScientist.id).length} deposited
                  </span>
                </div>

                <div className="space-y-1.5">
                  {allResources.filter((r) => r.uploadedBy === viewingScientist.id).map((res) => (
                    <div key={res.id} className="p-2.5 rounded-lg border border-slate-200 bg-white flex items-center justify-between">
                      <div>
                        <span className="font-mono text-[10px] font-bold text-sky-800 bg-sky-50 px-1.5 py-0.5 rounded mr-2">
                          {res.id}
                        </span>
                        <span className="font-semibold text-slate-800">{res.title}</span>
                      </div>
                      <span className="text-slate-500 text-[11px] shrink-0 font-mono">
                        {res.files.length} file(s)
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Submitted Outreach Content */}
              <div className="space-y-2">
                <div className="flex items-center justify-between font-bold text-slate-900 uppercase tracking-wider">
                  <span className="flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5 text-indigo-700" />
                    <span>Outreach Content Submitted</span>
                  </span>
                  <span className="text-slate-500 font-mono text-[11px]">
                    {allDrafts.filter((d) => d.contributorId === viewingScientist.id).length} pieces
                  </span>
                </div>

                <div className="space-y-1.5">
                  {allDrafts.filter((d) => d.contributorId === viewingScientist.id).map((dr) => (
                    <div key={dr.id} className="p-2.5 rounded-lg border border-slate-200 bg-white flex items-center justify-between">
                      <div>
                        <span className="font-mono text-[10px] text-slate-500 mr-2">{dr.id}</span>
                        <span className="font-semibold text-slate-800">{dr.title}</span>
                      </div>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                        dr.status === 'PUBLISHED' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'
                      }`}>
                        {dr.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
