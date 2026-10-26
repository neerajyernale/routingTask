import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetConformComponent } from './get-conform.component';

describe('GetConformComponent', () => {
  let component: GetConformComponent;
  let fixture: ComponentFixture<GetConformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetConformComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetConformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
