import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PostPageComponent } from './post-page.component';
import { ForumService } from '../services/forum.service';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

// Mock data matching your models
const mockPost = {
  id: '1',
  title: 'Test Post',
  content: 'Test content',
  createdAt: '2025-05-16T12:00:00Z',
};

const mockComments = [
  { id: 1, postId: 1, text: 'Comment 1', createdAt: '2025-05-16T13:00:00Z' },
  { id: 2, postId: 1, text: 'Comment 2', createdAt: '2025-05-16T14:00:00Z' },
];

describe('PostPageComponent', () => {
  let component: PostPageComponent;
  let fixture: ComponentFixture<PostPageComponent>;
  let forumServiceSpy: jasmine.SpyObj<ForumService>;

  beforeEach(async () => {
    // Create spy object with all the methods the component calls
    forumServiceSpy = jasmine.createSpyObj('ForumService', [
      'getPostById',
      'getCommentsByPostId',
      'createComment'
    ]);

    // Setup return values for each spy method
    forumServiceSpy.getPostById.and.returnValue(of(mockPost));
    forumServiceSpy.getCommentsByPostId.and.returnValue(of(mockComments as any));
    forumServiceSpy.createComment.and.returnValue(of([]));

    await TestBed.configureTestingModule({
      imports: [PostPageComponent], // Import standalone component here
      providers: [
        { 
          provide: ForumService, 
          useValue: forumServiceSpy 
        },
        { 
          provide: ActivatedRoute, 
          useValue: { snapshot: { paramMap: { get: () => '1' } } }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PostPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // triggers ngOnInit
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch and set post data and comments in ngOnInit', () => {
    expect(forumServiceSpy.getPostById).toHaveBeenCalledWith('1');
    expect(forumServiceSpy.getCommentsByPostId).toHaveBeenCalledWith('1');

    expect(component.post).toEqual(mockPost);
    expect(component.comments).toEqual(mockComments);
  });

  // You can add more tests here for createComment, clearMessage, etc.
});
