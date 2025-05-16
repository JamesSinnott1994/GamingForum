import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ForumService } from './forum.service';
import { Comment } from '../models/comment.model';
import { Post } from '../models/post.model';

describe('ForumService', () => {
  let service: ForumService;
  let httpTestingController: HttpTestingController;

  const apiUrl = 'https://localhost:7251/api/GameForum';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ForumService]
    });

    service = TestBed.inject(ForumService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch posts (getPosts)', () => {
    const dummyPosts: Post[] = [
      { id: '1', title: 'Post 1', content: 'Content 1', createdAt: '2025-05-16T13:00:00Z' },
      { id: '2', title: 'Post 2', content: 'Content 2', createdAt: '2025-05-16T13:00:00Z' }
    ];

    service.getPosts().subscribe(posts => {
      expect(posts).toEqual(dummyPosts);
    });

    const req = httpTestingController.expectOne(apiUrl);
    expect(req.request.method).toEqual('GET');
    req.flush(dummyPosts);
  });

  it('should fetch a post by id (getPostById)', () => {
    const dummyPost: Post = { id: '1', title: 'Post 1', content: 'Content 1', createdAt: '2025-05-16T13:00:00Z' };

    service.getPostById('1').subscribe(post => {
      expect(post).toEqual(dummyPost);
    });

    const req = httpTestingController.expectOne(`${apiUrl}/1`);
    expect(req.request.method).toEqual('GET');
    req.flush(dummyPost);
  });

  it('should fetch comments by post id (getCommentsByPostId)', () => {
    const dummyComments: Comment[] = [
      { id: 1, postId: 1, text: 'Comment 1', createdAt: '2025-05-16T13:00:00Z' },
      { id: 2, postId: 1, text: 'Comment 2', createdAt: '2025-05-16T13:00:00Z' }
    ];

    service.getCommentsByPostId('1').subscribe(comments => {
      expect(comments).toEqual(dummyComments as any);
    });

    const req = httpTestingController.expectOne(`${apiUrl}/1/comments`);
    expect(req.request.method).toEqual('GET');
    req.flush(dummyComments);
  });

  it('should create a post (createPost)', () => {
    const newPost = { title: 'New Post', content: 'New Content' };
    const response = [{ id: '3', ...newPost }];

    service.createPost(newPost.title, newPost.content).subscribe(res => {
      expect(res).toEqual(response);
    });

    const req = httpTestingController.expectOne(apiUrl);
    expect(req.request.method).toEqual('POST');
    expect(req.request.headers.get('Content-Type')).toBe('application/json');
    expect(req.request.body).toEqual(newPost);
    req.flush(response);
  });

  it('should create a comment (createComment)', () => {
    const postId = 1;
    const newComment = { text: 'New comment' };
    const response = [{ id: 1, ...newComment }];

    service.createComment(postId, newComment.text).subscribe(res => {
      expect(res).toEqual(response);
    });

    const req = httpTestingController.expectOne(`${apiUrl}/${postId}/comments`);
    expect(req.request.method).toEqual('POST');
    expect(req.request.headers.get('Content-Type')).toBe('application/json');
    expect(req.request.body).toEqual(newComment);
    req.flush(response);
  });
});
