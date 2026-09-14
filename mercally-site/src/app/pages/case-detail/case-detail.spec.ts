import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CaseDetailComponent } from './case-detail';
import { LanguageService } from '../../services/language.service';

describe('CaseDetailComponent', () => {
  let component: CaseDetailComponent;
  let fixture: ComponentFixture<CaseDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CaseDetailComponent],
      providers: [{ provide: LanguageService, useValue: { lang: { get: () => 'en' } } }]
    }).compileComponents();

    fixture = TestBed.createComponent(CaseDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
