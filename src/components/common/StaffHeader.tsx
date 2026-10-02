import React, { useState, useEffect } from 'react';
import { User } from '../../types';
import { store } from '../../services/storage';
import {
  Compass,
  LogOut,
  Shield,
  UserCheck,
  LayoutDashboard,
  Database,
  Upload,
  FileText,
  Clock,
  Users,
  CheckCircle2,
  Activity,
  Send,
  Menu,
  X,
  ChevronRight,
  Home
} from 'lucide-react';

interface StaffHeaderProps {
  currentUser: User;
  currentRoute: string;
  onNavigate: (route: string) => void;
}

export const StaffHeader: React.FC<StaffHeaderProps> = ({
  currentUser,
  currentRoute,
  onNavigate
}) => {
  const isScientist = currentUser.role === 'CONTENT_CONTRIBUTOR';
  const isAdmin = currentUser.role === 'ADMINISTRATOR';
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scientistNavLinks = [
    { label: 'Dashboard', route: '/workspace', icon: LayoutDashboard },
    { label: 'Scientific Repository', route: '/workspace/repository', icon: Database },
    { label: 'Upload Resource', route: '/workspace/upload', icon: Upload },
    { label: 'My Content', route: '/workspace/my-content', icon: FileText },
    { label: 'Review Status', route: '/workspace/reviews', icon: Clock }
  ];

  const adminNavLinks = [
    { label: 'Dashboard', route: '/admin', icon: LayoutDashboard },
    { label: 'Scientists', route: '/admin/scientists', icon: Users },
    { label: 'Scientific Repository', route: '/admin/repository', icon: Database },
    { label: 'Review Queue', route: '/admin/reviews', icon: Clock },
    { label: 'Published Content', route: '/admin/published', icon: CheckCircle2 },
    { label: 'Publishing Center', route: '/admin/publishing', icon: Send },
    { label: 'Activity', route: '/admin/activity', icon: Activity }
  ];

  const navLinks = isAdmin ? adminNavLinks : scientistNavLinks;

  const handleSignOut = () => {
    store.switchRole('PUBLIC_USER');
    setMobileMenuOpen(false);
    onNavigate('/');
  };

  const handleNav = (route: string) => {
    setMobileMenuOpen(false);
    onNavigate(route);
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileMenuOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  return (
    <header className="sticky top-0 z-40 bg-slate-900 border-b border-slate-800 text-white shadow-md">
      {/* Tricolour Micro-Strip */}
      <div className="h-1.5 w-full bg-gradient-to-r from-[#FF9933] via-white to-[#138808]" />

      {/* Main Staff Header */}
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
        <div className="flex items-center justify-between min-h-[56px] sm:min-h-[64px] py-1.5 sm:py-2 gap-2 sm:gap-3">
          {/* Left: Logo + Portal Title */}
          <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1 basis-0">
            {/* Hamburger (always visible — mobile through laptop/desktop) */}
            <button
              onClick={() => setMobileMenuOpen((v) => !v)}
              aria-expanded={mobileMenuOpen}
              aria-controls="staff-mobile-nav"
              className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition shrink-0"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            <div
              onClick={() => handleNav(isAdmin ? '/admin' : '/workspace')}
              className="flex items-center gap-2 sm:gap-2.5 cursor-pointer select-none min-w-0"
            >
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-white shrink-0">
                {isAdmin ? (
                  <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-400" />
                ) : (
                  <UserCheck className="w-4 h-4 sm:w-5 sm:h-5 text-sky-400" />
                )}
              </div>
              <div className="min-w-0 hidden sm:block">
                <div className="text-sm sm:text-base font-bold text-white tracking-tight flex items-center gap-1.5 min-w-0">
                  <span className="truncate">
                    {isAdmin ? 'Administrator Console' : 'Scientist Workspace'}
                  </span>
                  <span
                    className={`text-[9px] sm:text-[10px] font-semibold px-1.5 sm:px-2 py-0.5 rounded-full uppercase tracking-wider shrink-0 ${
                      isAdmin
                        ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-400/30'
                        : 'bg-sky-500/20 text-sky-300 border border-sky-400/30'
                    }`}
                  >
                    {isAdmin ? 'Admin' : 'Scientist'}
                  </span>
                </div>
                <p className="hidden 2xl:block text-[10px] sm:text-[11px] text-slate-400 truncate max-w-[280px]">
                  NPKH — National Polar Knowledge Hub
                </p>
              </div>
              <div className="sm:hidden text-sm font-bold text-white">
                {isAdmin ? 'Admin' : 'Scientist'}
              </div>
            </div>
          </div>

          {/* Right: Profile, View Public, Sign Out */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0 flex-1 basis-0 justify-end">
            {/* View Public Portal */}
            <button
              onClick={() => handleNav('/')}
              className="hidden sm:flex items-center gap-1 px-2 py-1.5 text-[11px] font-semibold text-amber-300 hover:text-white hover:bg-slate-800 rounded-lg border border-transparent hover:border-slate-700 transition shrink-0"
              title="View public portal"
            >
              <Home className="w-3.5 h-3.5 shrink-0" />
              <span className="hidden lg:inline">Public Portal</span>
            </button>

            {/* User name (sm+, compact until 2xl) */}
            <div className="hidden sm:block text-right leading-tight min-w-0 max-w-[120px] md:max-w-[150px] lg:max-w-[180px] 2xl:max-w-[240px]">
              <div className="text-[11px] sm:text-xs font-semibold text-white truncate">
                {currentUser.name}
              </div>
              <div className="hidden lg:block text-[10px] text-slate-400 truncate">
                {currentUser.designation || currentUser.department}
              </div>
            </div>

            {/* Avatar circle (always visible) */}
            <div
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gradient-to-br from-slate-600 to-slate-800 border border-slate-700 flex items-center justify-center text-[11px] sm:text-xs font-bold text-white uppercase tracking-wide shrink-0"
              title={currentUser.name}
            >
              {currentUser.name
                .split(' ')
                .filter((w) => w.length > 0)
                .slice(0, 2)
                .map((w) => w[0])
                .join('') || 'U'}
            </div>

            {/* Sign Out */}
            <button
              onClick={handleSignOut}
              className="flex items-center gap-1 px-2 sm:px-2.5 py-1.5 text-[11px] font-medium text-slate-200 hover:text-white bg-slate-800/80 hover:bg-slate-800 rounded-lg border border-slate-700 hover:border-slate-600 transition shrink-0"
              title="Sign out"
            >
              <LogOut className="w-3.5 h-3.5 shrink-0 text-slate-400" />
              <span className="hidden md:inline">Sign Out</span>
            </button>
          </div>
        </div>
      </div>

      {/* Hamburger Drawer — always available, every screen width */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-slate-950/70 backdrop-blur-xs"
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden
          />
          {/* Drawer */}
          <aside
            id="staff-mobile-nav"
            className="absolute left-0 top-0 bottom-0 w-[85%] max-w-[340px] bg-slate-900 border-r border-slate-800 shadow-2xl overflow-y-auto flex flex-col"
          >
            {/* Drawer Header */}
            <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-9 h-9 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center shrink-0">
                  {isAdmin ? (
                    <Shield className="w-5 h-5 text-indigo-400" />
                  ) : (
                    <UserCheck className="w-5 h-5 text-sky-400" />
                  )}
                </div>
                <div className="min-w-0">
                  <div className="text-sm font-bold text-white truncate">
                    {isAdmin ? 'Administrator Console' : 'Scientist Workspace'}
                  </div>
                  <div className="text-[10px] text-slate-400 truncate">
                    NPKH · National Polar Knowledge Hub
                  </div>
                </div>
              </div>
              <button
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close menu"
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition shrink-0"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* User Card */}
            <div className="p-4 border-b border-slate-800 space-y-2">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-gradient-to-br from-slate-600 to-slate-800 border border-slate-700 flex items-center justify-center text-sm font-bold text-white uppercase">
                  {currentUser.name
                    .split(' ')
                    .filter((w) => w.length > 0)
                    .slice(0, 2)
                    .map((w) => w[0])
                    .join('') || 'U'}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-sm font-semibold text-white truncate">
                    {currentUser.name}
                  </div>
                  <div className="text-[11px] text-slate-400 truncate">
                    {currentUser.designation || currentUser.department || currentUser.email}
                  </div>
                </div>
              </div>
              <div className="flex gap-2 pt-2">
                <button
                  onClick={() => handleNav('/')}
                  className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 text-[11px] font-semibold rounded-lg bg-slate-800 hover:bg-slate-700 text-amber-300 hover:text-white border border-slate-700 transition"
                >
                  <Home className="w-3.5 h-3.5" />
                  <span>View Public Portal</span>
                </button>
                <button
                  onClick={handleSignOut}
                  className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 text-[11px] font-semibold rounded-lg bg-rose-900/30 hover:bg-rose-800/50 text-rose-300 hover:text-white border border-rose-800/50 transition"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-3 space-y-1 pb-4">
              <div className="px-2 pb-2 text-[10px] font-bold uppercase tracking-wider text-slate-500">
                {isAdmin ? 'Administration' : 'Workspace'}
              </div>
              {navLinks.map((item) => {
                const isActive =
                  currentRoute === item.route ||
                  (item.route !== '/workspace' &&
                    item.route !== '/admin' &&
                    currentRoute.startsWith(item.route));
                return (
                  <button
                    key={item.route}
                    onClick={() => handleNav(item.route)}
                    className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm transition ${
                      isActive
                        ? 'bg-slate-800 text-white border border-slate-700 font-semibold'
                        : 'text-slate-300 hover:text-white hover:bg-slate-800/70'
                    }`}
                  >
                    <item.icon
                      className={`w-4 h-4 shrink-0 ${
                        isActive ? 'text-sky-400' : 'text-slate-400'
                      }`}
                    />
                    <span className="flex-1 text-left">{item.label}</span>
                    <ChevronRight className="w-4 h-4 text-slate-500" />
                  </button>
                );
              })}
            </nav>
          </aside>
        </div>
      )}
    </header>
  );
};
