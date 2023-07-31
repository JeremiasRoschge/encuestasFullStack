import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoletaSeparadaComponent } from './presidente-seleccion.component';

describe('BoletaSeparadaComponent', () => {
  let component: BoletaSeparadaComponent;
  let fixture: ComponentFixture<BoletaSeparadaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BoletaSeparadaComponent]
    });
    fixture = TestBed.createComponent(BoletaSeparadaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
