import { Routes } from '@angular/router';
import { HubComponent } from './pages/hub/hub';
import { PatternDetailComponent } from './pages/pattern-detail/pattern-detail';
import { CaseStudiesComponent } from './pages/case-studies/case-studies';
import { CaseDetailComponent } from './pages/case-detail/case-detail';
import { ServicesComponent } from './pages/services/services';
import { AboutComponent } from './pages/about/about';
import { ContactComponent } from './pages/contact/contact';

export const routes: Routes = [
  {
    path: '',
    component: HubComponent,
    pathMatch: 'full',
    data: {
      title: 'Mercally - Architecture Showcase',
      description:
        'Real-world software architecture insights: projects, patterns, and services',
    },
  },
  {
    path: 'patterns/:slug',
    component: PatternDetailComponent,
    data: {
      title: 'Pattern Detail | Mercally',
      description:
        'Architecture pattern explored with real-world trade-offs',
    },
  },
  {
    path: 'case-studies',
    component: CaseStudiesComponent,
    data: {
      title: 'Projects | Mercally',
      description:
        'Anonymized architecture decisions from real projects',
    },
  },
  {
    path: 'case-studies/:slug',
    component: CaseDetailComponent,
    data: {
      title: 'Project | Mercally',
      description:
        'Architecture decision record with trade-offs and results',
    },
  },
  {
    path: 'services',
    component: ServicesComponent,
    data: {
      title: 'Services | Mercally',
      description:
        'Architecture analysis, technical leadership, and security analysis',
    },
  },
  {
    path: 'about',
    component: AboutComponent,
    data: {
      title: 'About | Mercally',
      description:
        'About the architect behind Mercally',
    },
  },
  {
    path: 'contact',
    component: ContactComponent,
    data: {
      title: 'Contact | Mercally',
      description:
        'Get in touch to discuss architecture, technology, or collaboration',
    },
  },
  { path: '**', redirectTo: '' },
];
