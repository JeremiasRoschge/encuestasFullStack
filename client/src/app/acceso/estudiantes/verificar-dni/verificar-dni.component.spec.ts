import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerificarDniComponent } from './verificar-dni.component';

describe('VerificarDniComponent', () => {
  let component: VerificarDniComponent;
  let fixture: ComponentFixture<VerificarDniComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VerificarDniComponent]
    });
    fixture = TestBed.createComponent(VerificarDniComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
