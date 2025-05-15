import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ForumService } from '../services/forum.service';
import { CommonModule } from '@angular/common';
import { CommentComponent } from '../comment/comment.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-post-page',
  imports: [CommentComponent, CommonModule, RouterModule],
  templateUrl: './post-page.component.html',
  styleUrl: './post-page.component.scss'
})
export class PostPageComponent {
  post: any;
  comments: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private forumService: ForumService
  ) {}

  ngOnInit() {
    const postId = this.route.snapshot.paramMap.get('id');

    console.log(postId);

    if (postId) {
      this.forumService.getPostById(postId).subscribe(post => {
        console.log("getPostById");
        this.post = post;
        console.log(this.post);
      });

      this.forumService.getCommentsByPostId(postId).subscribe(comments => {
        console.log("getCommentsByPostId");
        this.comments = comments;
        console.log(this.comments);
      });
    }

    console.log("Down Here");
  }
}
