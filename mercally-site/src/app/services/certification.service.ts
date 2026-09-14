import { Injectable } from '@angular/core';
import { Certification } from '../models/certification';

const CERTIFICATIONS: Certification[] = [
  { slug: 'togaf-10', nameEs: 'TOGAF 10 Foundation', nameEn: 'TOGAF 10 Foundation', issuerEs: 'The Open Group', issuerEn: 'The Open Group', inProgress: true },
  { slug: 'az-305', nameEs: 'Azure Solutions Architect Expert (AZ-305)', nameEn: 'Azure Solutions Architect Expert (AZ-305)', issuerEs: 'Microsoft', issuerEn: 'Microsoft', inProgress: true },
  { slug: 'applied-skills-security', nameEs: 'Applied Skills: seguridad y monitoreo en la nube', nameEn: 'Applied Skills: Secure and Monitor Cloud Environments', issuerEs: 'Microsoft, mayo 2026', issuerEn: 'Microsoft, May 2026' },
  { slug: 'az-900', nameEs: 'Azure Fundamentals', nameEn: 'Azure Fundamentals', issuerEs: 'Microsoft, septiembre 2025', issuerEn: 'Microsoft, September 2025' },
  { slug: 'aspnet-solid-clean', nameEs: 'ASP.NET Core: SOLID y Clean Architecture', nameEn: 'ASP.NET Core: SOLID and Clean Architecture', issuerEs: 'Pluralsight', issuerEn: 'Pluralsight' },
  { slug: 'dotnet-microservices-cqrs', nameEs: '.NET Microservices: CQRS y Event Sourcing con Kafka', nameEn: '.NET Microservices: CQRS and Event Sourcing with Kafka', issuerEs: 'Udemy', issuerEn: 'Udemy' },
  { slug: 'devops-docker-k8s-terraform', nameEs: 'DevOps: Docker, Kubernetes, Terraform y Azure DevOps', nameEn: 'DevOps: Docker, Kubernetes, Terraform, and Azure DevOps', issuerEs: 'Udemy', issuerEn: 'Udemy' },
  { slug: 'azure-for-dotnet-devs', nameEs: 'Microsoft Azure para desarrolladores .NET', nameEn: 'Microsoft Azure for .NET Developers', issuerEs: 'Udemy', issuerEn: 'Udemy' },
  { slug: 'azure-devops-assessment', nameEs: 'Azure DevOps Assessment (18473)', nameEn: 'Azure DevOps Assessment (18473)', issuerEs: 'Microsoft Partner, Costa Rica', issuerEn: 'Microsoft Partner, Costa Rica' },
  { slug: 'mcsa-web-apps', nameEs: 'Web Applications Charter Member (MCSA)', nameEn: 'Web Applications Charter Member (MCSA)', issuerEs: 'Microsoft', issuerEn: 'Microsoft' },
  { slug: 'mta-software-dev', nameEs: 'Software Development Fundamentals (MTA)', nameEn: 'Software Development Fundamentals (MTA)', issuerEs: 'Microsoft', issuerEn: 'Microsoft' },
  { slug: 'scrum-fundamentals', nameEs: 'Scrum Fundamentals', nameEn: 'Scrum Fundamentals', issuerEs: 'ScrumStudy', issuerEn: 'ScrumStudy' },
  { slug: 'dale-carnegie-leadership', nameEs: 'Curso de Liderazgo', nameEn: 'Leadership Course', issuerEs: 'Dale Carnegie', issuerEn: 'Dale Carnegie' },
];

@Injectable({ providedIn: 'root' })
export class CertificationService {
  readonly all: Certification[] = CERTIFICATIONS;
}
