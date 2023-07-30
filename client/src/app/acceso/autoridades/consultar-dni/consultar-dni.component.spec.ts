import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultarDniComponent } from './consultar-dni.component';

describe('ConsultarDniComponent', () => {
  let component: ConsultarDniComponent;
  let fixture: ComponentFixture<ConsultarDniComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConsultarDniComponent]
    });
    fixture = TestBed.createComponent(ConsultarDniComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
