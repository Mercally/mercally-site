import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PatternDetailComponent } from './pattern-detail';
import { LanguageService } from '../../services/language.service';

describe('PatternDetailComponent', () => {
  let component: PatternDetailComponent;
  let fixture: ComponentFixture<PatternDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PatternDetailComponent],
      providers: [{ provide: LanguageService, useValue: { lang: { get: () => 'en' } } }]
    }).compileComponents();

    fixture = TestBed.createComponent(PatternDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
