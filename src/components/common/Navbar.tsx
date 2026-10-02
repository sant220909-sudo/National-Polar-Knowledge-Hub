import React, { useState, useEffect } from 'react';
import { User } from '../../types';
import { store } from '../../services/storage';
import { useLanguage } from '../../context/LanguageContext';
import {
  Compass,
  Search,
  LogIn,
  Menu,
  X,
  Shield,
  UserCheck,
  Languages
} from 'lucide-react';

interface NavbarProps {
  currentUser: User;
  currentRoute: string;
  onNavigate: (route: string) => void;
  onOpenSearch: () => void;
  onOpenLogin: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentUser,
  currentRoute,
  onNavigate,
  onOpenSearch,
  onOpenLogin
}) => {
  const { isHindi, toggleLanguage } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const publicNavLinks = [
    { label: 'Home', route: '/', hi: 'मुख्य पृष्ठ' },
    { label: 'Expeditions', route: '/expeditions', hi: 'भारतीय अभियान' },
    { label: 'Research', route: '/research', hi: 'अनुसंधान' },
    { label: 'Datasets', route: '/datasets', hi: 'डेटासेट' },
    { label: 'Media', route: '/media', hi: 'मीडिया' },
    { label: 'Activities', route: '/activities', hi: 'गतिविधियाँ' },
    { label: 'Education', route: '/education', hi: 'शिक्षा' }
  ];

  const searchLabel = isHindi ? 'खोजें' : 'Search';
  const staffLoginLabel = isHindi ? 'वैज्ञानिक लॉगिन' : 'Staff Login';
  const adminConsoleLabel = isHindi ? 'एडमिन कंसोल' : 'Admin Console';
  const scientistWorkspaceLabel = isHindi ? 'वैज्ञानिक कार्यक्षेत्र' : 'Scientist Workspace';
  const goToAdminLabel = isHindi ? 'एडमिन कंसोल पर जाएं' : 'Go to Admin Console';
  const goToScientistLabel = isHindi ? 'वैज्ञानिक कार्यक्षेत्र पर जाएं' : 'Go to Scientist Workspace';
  const languageSwitchLabel = isHindi ? 'English' : 'हिंदी';
  const titleBadge = isHindi ? 'भारतीय ध्रुवीय ज्ञान पोर्टल' : 'National Polar Knowledge Hub';
  const titleMain = isHindi ? 'भारतीय ध्रुवीय विज्ञान पोर्टल' : 'Indian Polar Science Portal';
  const titleSub = isHindi ? 'राष्ट्रीय ध्रुवीय एवं महासागर अनुसंधान केंद्र · पृथ्वी विज्ञान मंत्रालय, भारत सरकार' : 'National Centre for Polar and Ocean Research · Ministry of Earth Sciences, Govt. of India';

  const handleNav = (route: string) => {
    onNavigate(route);
    setMobileMenuOpen(false);
  };

  const isStaff = currentUser.role === 'ADMINISTRATOR' || currentUser.role === 'CONTENT_CONTRIBUTOR';

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="h-1.5 w-full bg-gradient-to-r from-[#FF9933] via-white to-[#138808]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18 lg:h-20 gap-2 sm:gap-3">
          <div
            onClick={() => handleNav('/')}
            className="flex items-center gap-2 sm:gap-3 cursor-pointer group select-none shrink-0"
          >
            <div className="w-10 h-10 sm:w-11 sm:h-11 lg:w-12 lg:h-12 rounded-xl bg-slate-900 border border-amber-500/40 flex flex-col items-center justify-center text-white shadow-xs group-hover:border-amber-400 transition relative overflow-hidden shrink-0">
              <div className="absolute top-0 inset-x-0 h-1 bg-[#FF9933]" />
              <div className="absolute bottom-0 inset-x-0 h-1 bg-[#138808]" />
              <Compass className="w-5 h-5 sm:w-5.5 sm:h-5.5 lg:w-6 lg:h-6 text-sky-400 group-hover:rotate-45 transition-transform duration-500" />
            </div>
            <div className="min-w-0 hidden sm:block">
              <div className="flex items-center gap-1.5" data-no-translate>
                <span className="text-[10px] sm:text-xs font-bold text-amber-600 tracking-wide font-sans">
                  {titleBadge}
                </span>
                <span className="text-[9px] sm:text-[10px] px-1.5 py-0.2 rounded font-bold bg-amber-100 text-amber-900 border border-amber-300 shrink-0">
                  NPKH
                </span>
              </div>
              <div className="text-sm sm:text-base lg:text-lg font-extrabold tracking-tight text-slate-900 leading-tight truncate" data-no-translate>
                {titleMain}
              </div>
              <p className="text-[9px] sm:text-[10px] lg:text-[11px] text-slate-500 tracking-tight truncate max-w-xs sm:max-w-none" data-no-translate>
                {titleSub}
              </p>
            </div>
            <div className="sm:hidden text-base font-extrabold text-slate-900">
              NPKH
            </div>
          </div>

          <nav className="hidden xl:flex items-center gap-0.5">
            {publicNavLinks.map((item) => {
              const isActive =
                currentRoute === item.route ||
                (item.route !== '/' && currentRoute.startsWith(item.route));
              const displayLabel = isHindi ? item.hi : item.label;

              return (
                <button
                  key={item.route}
                  onClick={() => handleNav(item.route)}
                  className={`px-2.5 lg:px-3 py-2 text-xs font-semibold transition-colors rounded-lg whitespace-nowrap ${
                    isActive
                      ? 'bg-sky-50 text-sky-950 font-bold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  {displayLabel}
                </button>
              );
            })}

            <button
              onClick={onOpenSearch}
              className="ml-1.5 px-2.5 lg:px-3 py-2 text-xs font-semibold tracking-wide text-slate-600 hover:text-slate-900 transition flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200 rounded-lg whitespace-nowrap"
              data-no-translate
            >
              <Search className="w-3.5 h-3.5 text-slate-500" />
              <span>{searchLabel}</span>
            </button>

            <button
              onClick={toggleLanguage}
              data-no-translate="true"
              className={`ml-1.5 px-2.5 lg:px-3 py-2 text-xs font-bold transition flex items-center gap-1.5 rounded-lg border shadow-2xs cursor-pointer whitespace-nowrap ${
                isHindi
                  ? 'bg-amber-100 hover:bg-amber-200 text-amber-950 border-amber-400 ring-2 ring-amber-400/20'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-800 border-slate-300'
              }`}
              title={isHindi ? 'Switch to English' : 'हिंदी में बदलें'}
            >
              <Languages className="w-3.5 h-3.5 text-amber-700" />
              <span>{languageSwitchLabel}</span>
            </button>
          </nav>

          {/* Search + Language: visible on md-lg (laptop) sizes, hidden on xl+ */}
          <div className="hidden md:flex xl:hidden items-center gap-1.5 sm:gap-2">
            <button
              onClick={onOpenSearch}
              className="px-2.5 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 transition flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200 rounded-lg whitespace-nowrap"
              data-no-translate
            >
              <Search className="w-3.5 h-3.5 text-slate-500" />
              <span className="hidden lg:inline">{searchLabel}</span>
            </button>

            <button
              onClick={toggleLanguage}
              data-no-translate="true"
              className={`px-2.5 py-2 text-xs font-bold transition flex items-center gap-1.5 rounded-lg border ${
                isHindi
                  ? 'bg-amber-100 hover:bg-amber-200 text-amber-950 border-amber-400'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-800 border-slate-300'
              }`}
            >
              <Languages className="w-3.5 h-3.5 text-amber-700" />
              <span>{languageSwitchLabel}</span>
            </button>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            {isStaff ? (
              <button
                onClick={() => onNavigate(currentUser.role === 'ADMINISTRATOR' ? '/admin' : '/workspace')}
                className="flex items-center gap-1.5 px-3 sm:px-3.5 py-2 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-lg shadow-xs transition whitespace-nowrap"
                data-no-translate
              >
                {currentUser.role === 'ADMINISTRATOR' ? (
                  <Shield className="w-3.5 h-3.5 text-indigo-400" />
                ) : (
                  <UserCheck className="w-3.5 h-3.5 text-sky-400" />
                )}
                <span className="hidden sm:inline">{currentUser.role === 'ADMINISTRATOR' ? adminConsoleLabel : scientistWorkspaceLabel}</span>
                <span className="sm:hidden">{currentUser.role === 'ADMINISTRATOR' ? 'Admin' : 'Workspace'}</span>
              </button>
            ) : (
              <button
                onClick={onOpenLogin}
                className="flex items-center gap-1.5 px-3 sm:px-3.5 py-2 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-lg shadow-xs transition whitespace-nowrap"
                data-no-translate
              >
                <LogIn className="w-3.5 h-3.5 text-sky-400" />
                <span className="hidden sm:inline">{staffLoginLabel}</span>
                <span className="sm:hidden">Login</span>
              </button>
            )}

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-sky-500"
              aria-label="Toggle menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-3 max-h-[85vh] overflow-y-auto" role="dialog" aria-modal="true">
          <nav className="space-y-1">
            {publicNavLinks.map((item) => {
              const isActive =
                currentRoute === item.route ||
                (item.route !== '/' && currentRoute.startsWith(item.route));
              const displayLabel = isHindi ? item.hi : item.label;

              return (
                <button
                  key={item.route}
                  onClick={() => handleNav(item.route)}
                  className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium ${
                    isActive
                      ? 'bg-sky-50 text-sky-950 font-bold'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                  data-no-translate
                >
                  {displayLabel}
                </button>
              );
            })}

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenSearch();
              }}
              className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 flex items-center gap-2"
              data-no-translate
            >
              <Search className="w-4 h-4 text-slate-500" />
              <span>{searchLabel}</span>
            </button>

            <button
              onClick={() => {
                toggleLanguage();
              }}
              data-no-translate="true"
              className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium flex items-center gap-2 ${
                isHindi
                  ? 'bg-amber-50 text-amber-950 hover:bg-amber-100'
                  : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
              }`}
            >
              <Languages className="w-4 h-4 text-amber-700" />
              <span>{isHindi ? 'Switch to English' : 'हिंदी में बदलें'}</span>
            </button>
          </nav>

          <div className="pt-3 border-t border-slate-100">
            {isStaff ? (
              <button
                onClick={() => handleNav(currentUser.role === 'ADMINISTRATOR' ? '/admin' : '/workspace')}
                className="w-full py-2.5 px-3 text-sm font-bold text-center text-white bg-slate-900 rounded-lg"
                data-no-translate
              >
                {currentUser.role === 'ADMINISTRATOR' ? goToAdminLabel : goToScientistLabel}
              </button>
            ) : (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenLogin();
                }}
                className="w-full py-2.5 px-3 text-sm font-bold text-center text-white bg-slate-900 rounded-lg flex items-center justify-center gap-2"
                data-no-translate
              >
                <LogIn className="w-4 h-4 text-sky-400" />
                <span>{staffLoginLabel}</span>
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
