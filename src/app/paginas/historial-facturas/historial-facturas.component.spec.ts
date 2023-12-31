import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistorialFacturasComponent } from './historial-facturas.component';

describe('HistorialFacturasComponent', () => {
  let component: HistorialFacturasComponent;
  let fixture: ComponentFixture<HistorialFacturasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistorialFacturasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistorialFacturasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
