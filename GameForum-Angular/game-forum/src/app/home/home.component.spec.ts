import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { ForumService } from '../services/forum.service';
import { of, throwError } from 'rxjs';
import { ReactiveFormsModule } from '@angular/forms';
import { Post } from '../models/post.model';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let forumServiceSpy: jasmine.SpyObj<ForumService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('ForumService', ['getPosts', 'createPost']);

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, HomeComponent],
      providers: [{ provide: ForumService, useValue: spy }]
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    forumServiceSpy = TestBed.inject(ForumService) as jasmine.SpyObj<ForumService>;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch posts on init', () => {
    const mockPosts: Post[] = [{ id: '1', title: 'Test', content: 'Test content', createdAt: '2021-10-15 14:54:32' }];
    forumServiceSpy.getPosts.and.returnValue(of(mockPosts));

    component.ngOnInit();

    expect(forumServiceSpy.getPosts).toHaveBeenCalled();
    expect(component.posts).toEqual(mockPosts);
  });

  it('should successfully create a post', () => {
    forumServiceSpy.createPost.and.returnValue(of([{}]));

    component.applyForm.setValue({ title: 'New Post', content: 'Some content' });
    component.createPost();

    expect(forumServiceSpy.createPost).toHaveBeenCalledWith('New Post', 'Some content');
    expect(component.postResponseMessage).toBe('Post submitted successfully!');
    expect(component.isSuccess).toBeTrue();
    expect(component.applyForm.value.title).toBeNull();
    expect(component.applyForm.value.content).toBeNull();
  });

  it('should handle post creation error', () => {
    forumServiceSpy.createPost.and.returnValue(throwError(() => new Error('Error')));

    component.applyForm.setValue({ title: 'Fail Post', content: 'Error content' });
    component.createPost();

    expect(forumServiceSpy.createPost).toHaveBeenCalled();
    expect(component.postResponseMessage).toBe('Failed to submit post. Please try again.');
    expect(component.isSuccess).toBeFalse();
  });

  it('should clear message visibility after timeout', fakeAsync(() => {
    component.postResponseMessage = 'Test Message';
    component.messageVisible = true;

    component.clearMessage();
    expect(component.messageVisible).toBeTrue();

    tick(4000);
    expect(component.messageVisible).toBeFalse();

    tick(3000);
    expect(component.postResponseMessage).toBe('');
  }));
});
