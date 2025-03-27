import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormGramaticaComponent } from './form-gramatica.component';

describe('FormGramaticaComponent', () => {
  let component: FormGramaticaComponent;
  let fixture: ComponentFixture<FormGramaticaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormGramaticaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormGramaticaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
