import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { PostPageComponent } from './post-page.component';
import { ActivatedRoute } from '@angular/router';
import { of, throwError } from 'rxjs';
import { ForumService } from '../services/forum.service';
import { RouterModule } from '@angular/router';

describe('PostPageComponent', () => {
  let component: PostPageComponent;
  let fixture: ComponentFixture<PostPageComponent>;
  let forumServiceSpy: jasmine.SpyObj<ForumService>;

  beforeEach(async () => {
    const forumSpy = jasmine.createSpyObj('ForumService', [
      'getPostById',
      'getCommentsByPostId',
      'createComment'
    ]);

    await TestBed.configureTestingModule({
      imports: [PostPageComponent, RouterModule.forRoot([])],
      providers: [
        { provide: ForumService, useValue: forumSpy },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: () => '1'  // simulate route param "id" = "1"
              }
            }
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PostPageComponent);
    component = fixture.componentInstance;
    forumServiceSpy = TestBed.inject(ForumService) as jasmine.SpyObj<ForumService>;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should load post and comments on init', () => {
    const mockPost = { id: 1, title: 'Test', content: 'Content', createdAt: '2021-10-15 14:54:32' };
    const mockComments = [{ id: 101, text: 'Great post!' }];

    forumServiceSpy.getPostById.and.returnValue(of(mockPost));
    forumServiceSpy.getCommentsByPostId.and.returnValue(of(mockComments));

    component.ngOnInit();

    expect(forumServiceSpy.getPostById).toHaveBeenCalledWith('1');
    expect(forumServiceSpy.getCommentsByPostId).toHaveBeenCalledWith('1');
    expect(component.post).toEqual(mockPost);
    expect(component.comments).toEqual(mockComments);
  });

  it('should submit comment successfully', () => {
    forumServiceSpy.createComment.and.returnValue(of([{ id: 201 }]));

    component.applyForm.setValue({ text: 'Nice article' });
    component.postIdForComment = 1;
    component.createComment();

    expect(forumServiceSpy.createComment).toHaveBeenCalledWith(1, 'Nice article');
    expect(component.responseMessage).toBe('Comment submitted successfully!');
    expect(component.isSuccess).toBeTrue();
  });

  it('should handle comment submission failure', () => {
    forumServiceSpy.createComment.and.returnValue(throwError(() => new Error('Server error')));

    component.applyForm.setValue({ text: 'Oops!' });
    component.postIdForComment = 1;
    component.createComment();

    expect(forumServiceSpy.createComment).toHaveBeenCalled();
    expect(component.responseMessage).toBe('Failed to submit comment. Please try again.');
    expect(component.isSuccess).toBeFalse();
  });

  it('should clear message and reload after timeouts', fakeAsync(() => {
    spyOn(component, 'ngOnInit');

    component.responseMessage = 'Test message';
    component.clearMessage();

    tick(4000);
    expect(component.messageVisible).toBeFalse();

    tick(3000); // now total 7000 ms
    expect(component.responseMessage).toBe('');
    expect(component.ngOnInit).toHaveBeenCalled();
  }));
});