import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Article_detailsComponent } from './article_details.component';

describe('DetailsComponent', () => {
  let component: Article_detailsComponent;
  let fixture: ComponentFixture<Article_detailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Article_detailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Article_detailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
