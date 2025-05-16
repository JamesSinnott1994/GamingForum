import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PostListComponent } from './post-list.component';
import { Post } from '../models/post.model';
import { RouterModule } from '@angular/router';

describe('PostListComponent', () => {
  let component: PostListComponent;
  let fixture: ComponentFixture<PostListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PostListComponent, RouterModule.forRoot([])]  // Standalone component
    }).compileComponents();

    fixture = TestBed.createComponent(PostListComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should accept a post input', () => {
    const mockPost: Post = {
        id: '1',
        title: 'Test Title',
        content: 'Test Content',
        createdAt: '2021-10-15 14:54:32'
    };

    component.post = mockPost;
    fixture.detectChanges();

    expect(component.post).toEqual(mockPost);
  });

  it('should render post title and content', () => {
    component.post = { id: '1', title: 'Hello', content: 'World', createdAt: '2021-10-15 14:54:32' };
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h2')?.textContent).toContain('Hello');
    expect(compiled.querySelector('p')?.textContent).toContain('Oct 15, 2021');
    });
});