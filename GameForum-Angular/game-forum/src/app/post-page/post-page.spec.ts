import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { PostPageComponent } from './post-page.component';
import { ForumService } from '../services/forum.service';
import { Post } from '../models/post.model';

describe('PostPageComponent', () => {
  let component: PostPageComponent;
  let fixture: ComponentFixture<PostPageComponent>;
  let forumServiceSpy: jasmine.SpyObj<ForumService>;

  beforeEach(waitForAsync(() => {
    const spy = jasmine.createSpyObj('ForumService', ['getPostById']);
    TestBed.configureTestingModule({
      declarations: [PostPageComponent],
      providers: [
        { provide: ForumService, useValue: spy },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: (key: string) => '1'
              }
            }
          }
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostPageComponent);
    component = fixture.componentInstance;
    forumServiceSpy = TestBed.inject(ForumService) as jasmine.SpyObj<ForumService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch and set post data in ngOnInit', () => {
    const mockPost: Post = {
      id: '1',
      title: 'Test Title',
      content: 'This is a test content',
      createdAt: '2021-01-01T00:00:00Z'
    };
    forumServiceSpy.getPostById.and.returnValue(of(mockPost));

    fixture.detectChanges();
    expect(component.post).toEqual(mockPost);
    expect(forumServiceSpy.getPostById).toHaveBeenCalledWith('1');
  });

  it('should display post title and content in template', () => {
    const mockPost: Post = {
      id: '1',
      title: 'Another Title',
      content: 'Different test content',
      createdAt: '2021-01-02T12:00:00Z'
    };
    forumServiceSpy.getPostById.and.returnValue(of(mockPost));

    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain(mockPost.title);
    expect(compiled.querySelector('p').textContent).toContain(mockPost.content);
  });
});