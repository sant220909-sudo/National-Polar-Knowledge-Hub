import React, { useState, useEffect } from 'react';
import { store, DEFAULT_USERS } from '../../services/storage';
import { User, UserRole } from '../../types';
import {
  Compass,
  Shield,
  UserCheck,
  Lock,
  Mail,
  X,
  ArrowRight,
  AlertCircle,
  CheckCircle2,
  Key,
  Home
} from 'lucide-react';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate?: (route: string) => void;
  initialRole?: UserRole;
}

export const LoginModal: React.FC<LoginModalProps> = ({
  isOpen,
  onClose,
  onNavigate,
  initialRole
}) => {
  const [selectedRole, setSelectedRole] = useState<'SCIENTIST' | 'ADMINISTRATOR'>('SCIENTIST');
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setError('');
      setSuccessMsg('');
      if (initialRole === 'ADMINISTRATOR') {
        setSelectedRole('ADMINISTRATOR');
        setIdentifier('admin@ncpor.res.in');
        setPassword('Admin@2026!');
      } else {
        setSelectedRole('SCIENTIST');
        setIdentifier('rahulmohan@ncpor.res.in');
        setPassword('Polar@2026!');
      }
    }
  }, [isOpen, initialRole]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleRoleTabChange = (role: 'SCIENTIST' | 'ADMINISTRATOR') => {
    setSelectedRole(role);
    setError('');
    if (role === 'ADMINISTRATOR') {
      setIdentifier('admin@ncpor.res.in');
      setPassword('Admin@2026!');
    } else {
      setIdentifier('rahulmohan@ncpor.res.in');
      setPassword('Polar@2026!');
    }
  };

  const handleQuickFill = (role: 'SCIENTIST' | 'ADMINISTRATOR') => {
    handleRoleTabChange(role);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const cleanId = identifier.trim().toLowerCase();

    if (!cleanId) {
      setError('Please provide your institutional email or username.');
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      const allUsers = store.getUsers();

      let targetUser: User | undefined;

      if (selectedRole === 'ADMINISTRATOR') {
        targetUser =
          allUsers.find(
            (u) =>
              u.role === 'ADMINISTRATOR' &&
              (u.email.toLowerCase() === cleanId || (u.username && u.username.toLowerCase() === cleanId))
          ) || allUsers.find((u) => u.role === 'ADMINISTRATOR');
      } else {
        targetUser =
          allUsers.find(
            (u) =>
              u.role === 'CONTENT_CONTRIBUTOR' &&
              (u.email.toLowerCase() === cleanId || (u.username && u.username.toLowerCase() === cleanId))
          ) || allUsers.find((u) => u.role === 'CONTENT_CONTRIBUTOR');
      }

      if (targetUser) {
        store.setCurrentUser(targetUser);
        setSuccessMsg(`Authenticated as ${targetUser.name} (${targetUser.role === 'ADMINISTRATOR' ? 'Administrator' : 'Scientist'})`);

        setTimeout(() => {
          onClose();
          if (onNavigate) {
            if (targetUser.role === 'ADMINISTRATOR') {
              onNavigate('/admin');
            } else {
              onNavigate('/workspace');
            }
          }
        }, 500);
      } else {
        setError('Invalid credentials or unauthorized account.');
      }
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/75 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl w-full max-w-md overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-4 sm:p-5 bg-slate-900 text-white flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-9 h-9 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center shrink-0">
              <Compass className="w-5 h-5 text-amber-400" />
            </div>
            <div className="min-w-0">
              <h2 className="text-sm sm:text-base font-bold truncate">Staff Login — NPKH</h2>
              <p className="text-[11px] text-slate-400 truncate">
                National Polar Knowledge Hub · NCPOR
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1 shrink-0">
            <button
              onClick={() => onClose()}
              title="Browse public portal"
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
            >
              <Home className="w-4.5 h-4.5" />
            </button>
            <button
              onClick={onClose}
              title="Close"
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Role Selection Tabs */}
        <div className="grid grid-cols-2 p-1.5 bg-slate-100 border-b border-slate-200 text-xs font-semibold">
          <button
            type="button"
            onClick={() => handleRoleTabChange('SCIENTIST')}
            className={`py-2 px-3 rounded-lg flex items-center justify-center gap-1.5 transition ${
              selectedRole === 'SCIENTIST'
                ? 'bg-white text-slate-900 shadow-sm ring-1 ring-slate-200'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <UserCheck className="w-3.5 h-3.5 text-sky-600 shrink-0" />
            <span>Scientist</span>
          </button>

          <button
            type="button"
            onClick={() => handleRoleTabChange('ADMINISTRATOR')}
            className={`py-2 px-3 rounded-lg flex items-center justify-center gap-1.5 transition ${
              selectedRole === 'ADMINISTRATOR'
                ? 'bg-white text-slate-900 shadow-sm ring-1 ring-slate-200'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Shield className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
            <span>Administrator</span>
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-4 sm:p-5 space-y-4 text-xs">
          {error && (
            <div className="p-2.5 sm:p-3 bg-rose-50 border border-rose-200 rounded-lg text-rose-700 text-xs flex items-start gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {successMsg && (
            <div className="p-2.5 sm:p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-800 text-xs flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5 text-emerald-600" />
              <span>{successMsg}</span>
            </div>
          )}

          {/* Email */}
          <div className="space-y-1.5">
            <label className="block font-semibold text-slate-700">
              Institutional Email or Username
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                autoComplete="username"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                placeholder={
                  selectedRole === 'ADMINISTRATOR'
                    ? 'admin@ncpor.res.in'
                    : 'scientist@ncpor.res.in'
                }
                className="w-full pl-9 pr-3 py-2.5 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-sky-500 focus:outline-none focus:border-sky-500 transition"
              />
            </div>
          </div>

          {/* Password */}
          <div className="space-y-1.5">
            <label className="block font-semibold text-slate-700">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-9 pr-3 py-2.5 rounded-lg border border-slate-300 text-xs font-mono focus:ring-2 focus:ring-sky-500 focus:outline-none focus:border-sky-500 transition"
              />
            </div>
          </div>

          {/* Quick Demo Credential Selectors */}
          <div className="pt-3 border-t border-slate-100 space-y-2">
            <div className="flex items-center gap-2 text-[10px]">
              <Key className="w-3 h-3 text-slate-400" />
              <span className="font-bold text-slate-500 uppercase tracking-wider">
                Demo Quick-Fill
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => handleQuickFill('SCIENTIST')}
                className={`p-2 rounded-lg border text-left transition text-[11px] ${
                  selectedRole === 'SCIENTIST'
                    ? 'border-sky-300 bg-sky-50/70 text-sky-950 font-semibold ring-2 ring-sky-100'
                    : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                }`}
              >
                <div className="font-bold">Dr. Rahul Mohan</div>
                <div className="text-[10px] text-slate-500 leading-tight">
                  Scientist-F · Polar Sciences
                </div>
              </button>

              <button
                type="button"
                onClick={() => handleQuickFill('ADMINISTRATOR')}
                className={`p-2 rounded-lg border text-left transition text-[11px] ${
                  selectedRole === 'ADMINISTRATOR'
                    ? 'border-indigo-300 bg-indigo-50/70 text-indigo-950 font-semibold ring-2 ring-indigo-100'
                    : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                }`}
              >
                <div className="font-bold">Dr. Thamban Meloth</div>
                <div className="text-[10px] text-slate-500 leading-tight">
                  Director · Chief Reviewer
                </div>
              </button>
            </div>
          </div>

          {/* Institutional Disclaimer */}
          <div className="p-2.5 sm:p-3 rounded-lg bg-slate-50 border border-slate-200 text-slate-600 text-[11px] leading-relaxed">
            Scientist accounts are created by the Administrator. Public browsing is unrestricted and requires no login.
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2.5 px-4 rounded-lg bg-slate-900 hover:bg-slate-800 active:bg-slate-950 text-white font-bold text-xs shadow-md transition flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <span>Verifying Credentials...</span>
            ) : (
              <>
                <span>
                  {selectedRole === 'ADMINISTRATOR'
                    ? 'Sign In to Admin Console'
                    : 'Sign In to Scientist Workspace'}
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
