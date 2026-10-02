/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { store } from './services/storage';
import { MediaItem, User, UserRole } from './types';

// Common Components
import { Navbar } from './components/common/Navbar';
import { StaffHeader } from './components/common/StaffHeader';
import { Footer } from './components/common/Footer';

// Modals
import { SearchModal } from './components/modals/SearchModal';
import { MediaModal } from './components/modals/MediaModal';
import { LoginModal } from './components/modals/LoginModal';

// Public Pages
import { HomePage } from './pages/public/HomePage';
import { ExplorePage } from './pages/public/ExplorePage';
import { ExpeditionsPage } from './pages/public/ExpeditionsPage';
import { ExpeditionDetailPage } from './pages/public/ExpeditionDetailPage';
import { ResearchPage } from './pages/public/ResearchPage';
import { MediaPage } from './pages/public/MediaPage';
import { EducationPage } from './pages/public/EducationPage';
import { IndianResearchersPage } from './pages/public/IndianResearchersPage';
import { ContentDetailPage } from './pages/public/ContentDetailPage';
import { AboutPage } from './pages/public/AboutPage';
import { DatasetsPage } from './pages/public/DatasetsPage';
import { DatasetDetailPage } from './pages/public/DatasetDetailPage';
import { ActivitiesPage } from './pages/public/ActivitiesPage';
import { ExpeditionReportsPage } from './pages/public/ExpeditionReportsPage';

// Repository & Knowledge Preservation
import { ScientificRepositoryPage } from './pages/admin/ScientificRepositoryPage';
import { ResourceDetailPage } from './pages/repository/ResourceDetailPage';

// Auth
import { LoginPage } from './pages/auth/LoginPage';

// Scientist / Contributor Pages
import { ContributorDashboard } from './pages/contributor/ContributorDashboard';
import { UploadResourcePage } from './pages/contributor/UploadResourcePage';
import { ContentEditorPage } from './pages/contributor/ContentEditorPage';
import { MySubmissionsPage } from './pages/contributor/MySubmissionsPage';

// Admin Pages
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { ScientistsManagementPage } from './pages/admin/ScientistsManagementPage';
import { ReviewQueuePage } from './pages/admin/ReviewQueuePage';
import { ReviewDetailPage } from './pages/admin/ReviewDetailPage';
import { PublishedContentPage } from './pages/admin/PublishedContentPage';
import { PublishingCenterPage } from './pages/admin/PublishingCenterPage';
import { AdminActivityPage } from './pages/admin/AdminActivityPage';
import { SettingsPage } from './pages/admin/SettingsPage';

export default function App() {
  const [currentUser, setCurrentUser] = useState<User>(store.getCurrentUser());
  const [currentRoute, setCurrentRoute] = useState<string>('/');
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [loginModalRole, setLoginModalRole] = useState<UserRole | undefined>(undefined);
  const [activeMediaItem, setActiveMediaItem] = useState<MediaItem | null>(null);

  // Subscribe to storage updates
  useEffect(() => {
    const unsubscribe = store.subscribeToStore(() => {
      setCurrentUser(store.getCurrentUser());
    });
    return unsubscribe;
  }, []);

  // Keyboard shortcut Cmd+K or Ctrl+K for search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchModalOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Scroll to top on navigation
  const handleNavigate = (route: string) => {
    setCurrentRoute(route);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenLogin = (role?: UserRole) => {
    setLoginModalRole(role);
    setLoginModalOpen(true);
  };

  const handleOpenMedia = (mediaId: string) => {
    const item = store.getMedia().find((m) => m.id === mediaId) || null;
    setActiveMediaItem(item);
  };

  const isStaffRoute =
    currentRoute.startsWith('/workspace') ||
    currentRoute.startsWith('/admin') ||
    currentRoute.startsWith('/contributor');

  // Route matching helper
  const renderRouteContent = () => {
    // 1. Expedition Detail: /expeditions/:id
    if (currentRoute.startsWith('/expeditions/')) {
      const expId = currentRoute.replace('/expeditions/', '');
      return (
        <ExpeditionDetailPage
          expeditionId={expId}
          onNavigate={handleNavigate}
          onOpenMedia={handleOpenMedia}
        />
      );
    }

    // 2. Public Content Detail / Article: /content/:id
    if (currentRoute.startsWith('/content/')) {
      const contentId = currentRoute.replace('/content/', '');
      return (
        <ContentDetailPage
          contentId={contentId}
          onNavigate={handleNavigate}
          onOpenLogin={() => handleOpenLogin()}
        />
      );
    }

    // 2b. Scientific Dataset Detail: /datasets/:id
    if (currentRoute.startsWith('/datasets/')) {
      const datasetId = currentRoute.replace('/datasets/', '');
      return (
        <DatasetDetailPage
          datasetId={datasetId}
          onNavigate={handleNavigate}
          currentUser={currentUser}
        />
      );
    }

    // 3. Scientist Editor: /workspace/content/:id/edit or /contributor/content/:id/edit
    if (
      (currentRoute.startsWith('/workspace/content/') ||
        currentRoute.startsWith('/contributor/content/')) &&
      currentRoute.endsWith('/edit')
    ) {
      const draftId = currentRoute
        .replace('/workspace/content/', '')
        .replace('/contributor/content/', '')
        .replace('/edit', '');
      return (
        <ContentEditorPage
          draftId={draftId}
          currentUser={currentUser}
          onNavigate={handleNavigate}
        />
      );
    }

    // 4. Admin Review Detail: /admin/reviews/:id
    if (currentRoute.startsWith('/admin/reviews/')) {
      const draftId = currentRoute.replace('/admin/reviews/', '');
      return (
        <ReviewDetailPage
          draftId={draftId}
          currentUser={currentUser}
          onNavigate={handleNavigate}
        />
      );
    }

    // 5. Scientific Repository Resource Detail: /repository/:id, /workspace/repository/:id, /admin/repository/:id
    if (
      currentRoute.startsWith('/repository/') ||
      currentRoute.startsWith('/workspace/repository/') ||
      currentRoute.startsWith('/admin/repository/')
    ) {
      const resourceId = currentRoute
        .replace('/workspace/repository/', '')
        .replace('/admin/repository/', '')
        .replace('/repository/', '');
      return (
        <ResourceDetailPage
          resourceId={resourceId}
          currentUser={currentUser}
          onNavigate={handleNavigate}
          onOpenMedia={handleOpenMedia}
        />
      );
    }

    // Exact route switches
    switch (currentRoute) {
      // Public Routes
      case '/':
        return (
          <HomePage
            onNavigate={handleNavigate}
            onOpenSearch={() => setSearchModalOpen(true)}
            onOpenMedia={handleOpenMedia}
          />
        );

      case '/expeditions':
        return <ExpeditionsPage onNavigate={handleNavigate} />;

      case '/reports':
      case '/expeditions/reports':
        return <ExpeditionReportsPage onNavigate={handleNavigate} />;

      case '/research':
        return <ResearchPage onNavigate={handleNavigate} mode="publications" />;

      case '/datasets':
        return (
          <DatasetsPage
            onNavigate={handleNavigate}
            currentUserRole={currentUser.role}
          />
        );

      case '/activities':
        return <ActivitiesPage onNavigate={handleNavigate} />;

      case '/researchers':
      case '/scientists':
        return (
          <IndianResearchersPage
            onNavigate={handleNavigate}
            onOpenLogin={() => handleOpenLogin()}
          />
        );

      case '/publications':
        return <ResearchPage onNavigate={handleNavigate} mode="publications" />;

      case '/media':
        return (
          <MediaPage
            onOpenMedia={handleOpenMedia}
            onNavigate={handleNavigate}
          />
        );

      case '/education':
        return <EducationPage onNavigate={handleNavigate} />;

      case '/about':
        return <AboutPage onNavigate={handleNavigate} />;

      case '/explore':
        return (
          <ExplorePage
            onNavigate={handleNavigate}
            onOpenMedia={handleOpenMedia}
          />
        );

      case '/login':
        return <LoginPage onNavigate={handleNavigate} />;

      // ==========================================
      // SCIENTIST WORKSPACE ROUTES
      // ==========================================
      case '/workspace':
      case '/workspace/dashboard':
      case '/contributor/dashboard':
        return (
          <ContributorDashboard
            currentUser={currentUser}
            onNavigate={handleNavigate}
          />
        );

      case '/workspace/repository':
        return (
          <ScientificRepositoryPage
            currentUser={currentUser}
            onNavigate={handleNavigate}
          />
        );

      case '/workspace/upload':
      case '/contributor/upload':
        return (
          <UploadResourcePage
            currentUser={currentUser}
            onNavigate={handleNavigate}
          />
        );

      case '/workspace/my-content':
      case '/contributor/resources':
        return (
          <MySubmissionsPage
            currentUser={currentUser}
            onNavigate={handleNavigate}
            mode="content"
          />
        );

      case '/workspace/reviews':
        return (
          <MySubmissionsPage
            currentUser={currentUser}
            onNavigate={handleNavigate}
            mode="reviews"
          />
        );

      // ==========================================
      // ADMINISTRATOR CONSOLE ROUTES
      // ==========================================
      case '/admin':
      case '/admin/dashboard':
        return (
          <AdminDashboard
            currentUser={currentUser}
            onNavigate={handleNavigate}
          />
        );

      case '/admin/scientists':
      case '/admin/contributors':
        return <ScientistsManagementPage onNavigate={handleNavigate} />;

      case '/admin/repository':
      case '/repository':
        return (
          <ScientificRepositoryPage
            currentUser={currentUser}
            onNavigate={handleNavigate}
          />
        );

      case '/admin/reviews':
        return (
          <ReviewQueuePage
            currentUser={currentUser}
            onNavigate={handleNavigate}
          />
        );

      case '/admin/published':
        return (
          <PublishedContentPage
            currentUser={currentUser}
            onNavigate={handleNavigate}
          />
        );

      case '/admin/publishing':
      case '/admin/publishing-center':
        return (
          <PublishingCenterPage
            currentUser={currentUser}
            onNavigate={handleNavigate}
          />
        );

      case '/admin/activity':
        return <AdminActivityPage onNavigate={handleNavigate} />;

      case '/admin/settings':
        return <SettingsPage onNavigate={handleNavigate} />;

      default:
        return (
          <HomePage
            onNavigate={handleNavigate}
            onOpenSearch={() => setSearchModalOpen(true)}
            onOpenMedia={handleOpenMedia}
          />
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans selection:bg-sky-500 selection:text-white">
      {/* Header Separation: StaffHeader in Workspaces, Clean Navbar on Public Site */}
      {isStaffRoute ? (
        <StaffHeader
          currentUser={currentUser}
          currentRoute={currentRoute}
          onNavigate={handleNavigate}
        />
      ) : (
        <Navbar
          currentUser={currentUser}
          currentRoute={currentRoute}
          onNavigate={handleNavigate}
          onOpenSearch={() => setSearchModalOpen(true)}
          onOpenLogin={() => handleOpenLogin()}
        />
      )}

      {/* Main Page Viewport */}
      <main className="flex-1 overflow-hidden">
        <AnimatePresence mode="wait">
          {isStaffRoute ? (
            <div key={currentRoute}>{renderRouteContent()}</div>
          ) : (
            <motion.div
              key={currentRoute}
              initial={{ opacity: 0, x: 60, y: 0 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              exit={{ opacity: 0, x: -60, y: 0 }}
              transition={{
                duration: 0.42,
                ease: [0.22, 1, 0.36, 1],
                x: { duration: 0.45 }
              }}
            >
              {renderRouteContent()}
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Institutional Footer */}
      <Footer onNavigate={handleNavigate} onOpenLogin={() => handleOpenLogin()} />

      {/* Global Interactive Modals */}
      <SearchModal
        isOpen={searchModalOpen}
        onClose={() => setSearchModalOpen(false)}
        onNavigate={handleNavigate}
      />

      <MediaModal
        item={activeMediaItem}
        onClose={() => setActiveMediaItem(null)}
        onNavigateExpedition={(name) => {
          setActiveMediaItem(null);
          handleNavigate('/expeditions');
        }}
      />

      <LoginModal
        isOpen={loginModalOpen}
        onClose={() => setLoginModalOpen(false)}
        onNavigate={handleNavigate}
        initialRole={loginModalRole}
      />
    </div>
  );
}
