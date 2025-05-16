import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ForumService } from '../services/forum.service';
import { CommonModule } from '@angular/common';
import { CommentComponent } from '../comment/comment.component';
import { RouterModule } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-post-page',
  imports: [CommentComponent, CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './post-page.component.html',
  styleUrl: './post-page.component.scss'
})
export class PostPageComponent {
  post: any;
  postIdForComment: number = 0;
  comments: any[] = [];
  responseMessage: string = '';
  isSuccess: boolean = false;
  messageVisible: boolean = true;

  applyForm = new FormGroup({
    text: new FormControl(''),
  });

  constructor(
    private route: ActivatedRoute,
    private forumService: ForumService
  ) {}

  ngOnInit() {
    const postId = this.route.snapshot.paramMap.get('id');
    this.postIdForComment = Number(postId);

    if (postId) {
      this.forumService.getPostById(postId).subscribe(post => {
        this.post = post;
      });

      this.forumService.getCommentsByPostId(postId).subscribe(comments => {
        this.comments = comments;
      });
    }
  }

  createComment() {
      this.forumService.createComment(
        this.postIdForComment,
        this.applyForm.value.text ?? '',
      ).subscribe({
      next: (response) => {
        this.responseMessage = 'Comment submitted successfully!';
        this.isSuccess = true;
        this.applyForm.reset();
        this.clearMessage();
      },
      error: (error) => {
        this.responseMessage = 'Failed to submit comment. Please try again.';
        this.isSuccess = false;
        this.clearMessage();
      }
    });
  }

  clearMessage() {
    this.messageVisible = true;

    setTimeout(() => {
      this.messageVisible = false;
    }, 4000); // fade out after 8 seconds

    setTimeout(() => {
      this.responseMessage = '';
      this.ngOnInit();
    }, 7000); // fully clear after 10 seconds
  }
}
