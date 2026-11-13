import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ProjectDetailView } from '@/components/projects/ProjectDetailView';
import { getProjectBySlug, PROJECT_RECORDS } from '@/data/portfolio';

interface ProjectDetailPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return PROJECT_RECORDS.filter((p) => p.slug !== 'dormiq').map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({
  params,
}: ProjectDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) {
    return { title: 'Project Not Found' };
  }

  return {
    title: project.title,
    alternates: { canonical: project.detailRoute },
    description: project.shortDescription,
    openGraph: {
      title: `${project.title} | RISHI OS`,
      description: project.shortDescription,
      type: 'article',
    },
  };
}

export default async function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project || project.slug === 'dormiq') {
    notFound();
  }

  return <ProjectDetailView slug={project.slug} />;
}

