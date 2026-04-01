import { lazy } from 'react'

const EducationContent = lazy(() => import('./EducationContent'))
const ExperienceContent = lazy(() => import('./ExperienceContent'))
const HomeContent = lazy(() => import('./HomeContent'))
const ProjectsContent = lazy(() => import('./ProjectsContent'))
const ContactContent = lazy(() => import('./ContactContent'))

/** Preload frequently accessed components */
export const preloadComponent = (componentName) => {
  switch (componentName) {
    case 'Education':
      import('./EducationContent')
      break
    case 'Experience':
      import('./ExperienceContent')
      break
    case 'Projects':
      import('./ProjectsContent')
      break
    case 'Contact':
      import('./ContactContent')
      break
    default:
      break
  }
}

/** Maps each `NAV_LINKS` label to its page component. */
export const NAV_VIEWS = {
  Home: HomeContent,
  Education: EducationContent,
  Experience: ExperienceContent,
  Projects: ProjectsContent,
  Contact: ContactContent,
}
