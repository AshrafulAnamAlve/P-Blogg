import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogDetils } from './blog-detils';

describe('BlogDetils', () => {
  let component: BlogDetils;
  let fixture: ComponentFixture<BlogDetils>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlogDetils]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlogDetils);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
