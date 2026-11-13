'use client';

import { useDesktop } from '@/components/os/DesktopContext';
import { DormiqCaseStudy } from '@/components/portfolio/DormiqCaseStudy';
import { ProjectDetailView } from '@/components/projects/ProjectDetailView';
import { ProjectsShowcase } from '@/components/projects/ProjectsShowcase';

/**
 * Window adapter reusing the shared Projects directory, preserved DormiQ case study, and project detail views.
 */
export function ProjectsAppView() {
  const { projectsSubView, setProjectsSubView } = useDesktop();

  if (projectsSubView === 'dormiq') {
    return (
      <DormiqCaseStudy
        embedded
        onBackToProjects={() => setProjectsSubView('directory')}
      />
    );
  }

  if (projectsSubView !== 'directory') {
    return (
      <ProjectDetailView
        slug={projectsSubView}
        embedded
        onBackToProjects={() => setProjectsSubView('directory')}
      />
    );
  }

  return (
    <ProjectsShowcase
      embedded
      onOpenProject={(slug) => setProjectsSubView(slug)}
    />
  );
}
