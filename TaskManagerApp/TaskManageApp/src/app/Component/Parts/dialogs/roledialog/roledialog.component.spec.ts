import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoledialogComponent } from './roledialog.component';

describe('RoledialogComponent', () => {
  let component: RoledialogComponent;
  let fixture: ComponentFixture<RoledialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoledialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoledialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
