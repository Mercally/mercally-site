import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AboutComponent } from './about';
import { LanguageService } from '../../services/language.service';

describe('AboutComponent', () => {
  let component: AboutComponent;
  let fixture: ComponentFixture<AboutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AboutComponent],
      providers: [{ provide: LanguageService, useValue: { lang: { get: () => 'en' } } }]
    }).compileComponents();

    fixture = TestBed.createComponent(AboutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
