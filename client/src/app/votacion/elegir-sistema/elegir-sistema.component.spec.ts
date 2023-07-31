import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElegirSistemaComponent } from './elegir-sistema.component';

describe('ElegirSistemaComponent', () => {
  let component: ElegirSistemaComponent;
  let fixture: ComponentFixture<ElegirSistemaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ElegirSistemaComponent]
    });
    fixture = TestBed.createComponent(ElegirSistemaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
