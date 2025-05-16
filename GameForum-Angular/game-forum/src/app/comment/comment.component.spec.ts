import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommentComponent } from './comment.component';
import { Comment } from '../models/comment.model';

describe('CommentComponent', () => {
  let component: CommentComponent;
  let fixture: ComponentFixture<CommentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommentComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CommentComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should accept a comment input', () => {
    const mockComment: Comment = {
      id: 123,
      postId: 1,
      text: 'This is a test comment',
      createdAt: '2023-01-01T12:00:00Z'
    };

    component.comment = mockComment;
    fixture.detectChanges();

    expect(component.comment).toEqual(mockComment);
  });
});
