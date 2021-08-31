import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountdialogComponent } from './accountdialog.component';

describe('AccountdialogComponent', () => {
  let component: AccountdialogComponent;
  let fixture: ComponentFixture<AccountdialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountdialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountdialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
