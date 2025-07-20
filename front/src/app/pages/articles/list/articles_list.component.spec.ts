import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Articles_listComponent } from './articles_list.component';

describe('ArticlesComponent', () => {
  let component: Articles_listComponent;
  let fixture: ComponentFixture<Articles_listComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Articles_listComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Articles_listComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
