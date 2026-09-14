import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CaseStudiesComponent } from './case-studies';
import { LanguageService } from '../../services/language.service';

describe('CaseStudiesComponent', () => {
  let component: CaseStudiesComponent;
  let fixture: ComponentFixture<CaseStudiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CaseStudiesComponent],
      providers: [{ provide: LanguageService, useValue: { lang: { get: () => 'en' } } }]
    }).compileComponents();

    fixture = TestBed.createComponent(CaseStudiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
