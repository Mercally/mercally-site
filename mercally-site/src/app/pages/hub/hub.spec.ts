import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HubComponent } from './hub';
import { LanguageService } from '../../services/language.service';

describe('HubComponent', () => {
  let component: HubComponent;
  let fixture: ComponentFixture<HubComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HubComponent],
      providers: [{ provide: LanguageService, useValue: { lang: { get: () => 'en' } } }]
    }).compileComponents();

    fixture = TestBed.createComponent(HubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
