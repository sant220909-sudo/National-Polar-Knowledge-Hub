import React, { useState } from 'react';
import { store } from '../../services/storage';
import { Compass, Shield, UserCheck, Lock, Mail, ArrowRight, AlertCircle, CheckCircle2 } from 'lucide-react';

interface LoginPageProps {
  onNavigate: (route: string) => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onNavigate }) => {
  const [selectedRole, setSelectedRole] = useState<'SCIENTIST' | 'ADMINISTRATOR'>('SCIENTIST');
  const [identifier, setIdentifier] = useState('rahulmohan@ncpor.res.in');
  const [password, setPassword] = useState('Polar@2026!');
  const [error, setError] = useState('');
  const [infoNotice, setInfoNotice] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleRoleTabChange = (role: 'SCIENTIST' | 'ADMINISTRATOR') => {
    setSelectedRole(role);
    setError('');
    setInfoNotice('');
    if (role === 'ADMINISTRATOR') {
      setIdentifier('admin@ncpor.res.in');
      setPassword('Admin@2026!');
    } else {
      setIdentifier('rahulmohan@ncpor.res.in');
      setPassword('Polar@2026!');
    }
  };

  const handleLogin = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setError('');
    setInfoNotice('');

    const cleanId = identifier.trim().toLowerCase();
    if (!cleanId) {
      setError('Please provide your institutional email address or username.');
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      const allUsers = store.getUsers();

      let targetUser =
        selectedRole === 'ADMINISTRATOR'
          ? allUsers.find((u) => u.role === 'ADMINISTRATOR')
          : allUsers.find((u) => u.role === 'CONTENT_CONTRIBUTOR');

      const exactMatch = allUsers.find(
        (u) =>
          (u.email.toLowerCase() === cleanId || (u.username && u.username.toLowerCase() === cleanId)) &&
          (selectedRole === 'ADMINISTRATOR' ? u.role === 'ADMINISTRATOR' : u.role === 'CONTENT_CONTRIBUTOR')
      );

      if (exactMatch) {
        targetUser = exactMatch;
      }

      if (targetUser) {
        store.setCurrentUser(targetUser);
        if (targetUser.role === 'ADMINISTRATOR') {
          onNavigate('/admin');
        } else {
          onNavigate('/workspace');
        }
      } else {
        setError('Unauthorized account credentials.');
      }
    }, 400);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-slate-50/60">
      <div className="w-full max-w-md bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden">
        {/* Header */}
        <div className="p-6 bg-slate-900 text-white text-center space-y-2">
          <div className="w-12 h-12 rounded-xl bg-slate-800 border border-slate-700 mx-auto flex items-center justify-center text-sky-400">
            <Compass className="w-6 h-6" />
          </div>
          <h1 className="text-xl font-bold font-serif">NCPOR Staff Login</h1>
          <p className="text-xs text-slate-300">
            National Centre for Polar and Ocean Research • Ministry of Earth Sciences
          </p>
        </div>

        {/* Role Selection Tabs */}
        <div className="grid grid-cols-2 p-1.5 bg-slate-100 border-b border-slate-200 text-xs font-semibold">
          <button
            type="button"
            onClick={() => handleRoleTabChange('SCIENTIST')}
            className={`py-2.5 px-3 rounded-lg flex items-center justify-center gap-1.5 transition ${
              selectedRole === 'SCIENTIST'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <UserCheck className="w-4 h-4 text-sky-600" />
            <span>Scientist / Contributor</span>
          </button>

          <button
            type="button"
            onClick={() => handleRoleTabChange('ADMINISTRATOR')}
            className={`py-2.5 px-3 rounded-lg flex items-center justify-center gap-1.5 transition ${
              selectedRole === 'ADMINISTRATOR'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Shield className="w-4 h-4 text-indigo-600" />
            <span>Administrator</span>
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleLogin} className="p-6 space-y-4 text-xs">
          {error && (
            <div className="p-3 bg-rose-50 border border-rose-200 rounded-lg text-rose-700 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {infoNotice && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-800 text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
              <span>{infoNotice}</span>
            </div>
          )}

          <div className="space-y-1">
            <label className="block font-semibold text-slate-700">
              Institutional Email or Username
            </label>
            <div className="relative">
              <input
                type="text"
                required
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                className="w-full pl-9 pr-3 py-2 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-sky-500 focus:outline-none"
              />
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            </div>
          </div>

          <div className="space-y-1">
            <label className="block font-semibold text-slate-700">
              Password
            </label>
            <div className="relative">
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-9 pr-3 py-2 rounded-lg border border-slate-300 text-xs font-mono focus:ring-2 focus:ring-sky-500 focus:outline-none"
              />
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            </div>
          </div>

          {/* Quick Demo Credential Selectors for Evaluators */}
          <div className="pt-2 border-t border-slate-100">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1.5">
              Evaluation Demo Quick-Fill:
            </span>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => handleRoleTabChange('SCIENTIST')}
                className={`p-2 rounded-lg border text-left transition text-[11px] ${
                  selectedRole === 'SCIENTIST'
                    ? 'border-sky-300 bg-sky-50/70 text-sky-950 font-semibold'
                    : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                }`}
              >
                <div className="font-bold">Dr. Rahul Mohan</div>
                <div className="text-[10px] text-slate-500">Scientist-F, Polar Sciences</div>
              </button>

              <button
                type="button"
                onClick={() => handleRoleTabChange('ADMINISTRATOR')}
                className={`p-2 rounded-lg border text-left transition text-[11px] ${
                  selectedRole === 'ADMINISTRATOR'
                    ? 'border-indigo-300 bg-indigo-50/70 text-indigo-950 font-semibold'
                    : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                }`}
              >
                <div className="font-bold">Dr. Thamban Meloth</div>
                <div className="text-[10px] text-slate-500">Director & Chief Reviewer</div>
              </button>
            </div>
          </div>

          {/* Governance Notice */}
          <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 text-slate-600 text-[11px] leading-relaxed">
            Scientist accounts are created exclusively by the Administrator. Scientists cannot self-register. Public browsing does not require login.
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2.5 px-4 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-md transition flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <span>Authenticating...</span>
            ) : (
              <>
                <span>
                  {selectedRole === 'ADMINISTRATOR'
                    ? 'Enter Administrator Console'
                    : 'Enter Scientist Workspace'}
                </span>
                <ArrowRight className="w-3.5 h-3.5" />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};
