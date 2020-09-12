import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SidenavlistComponent } from './sidenavlist.component';

describe('SidenavlistComponent', () => {
  let component: SidenavlistComponent;
  let fixture: ComponentFixture<SidenavlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SidenavlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidenavlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
