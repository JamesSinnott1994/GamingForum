import { Component } from '@angular/core';
import { PostListComponent } from '../post-list/post-list.component';
import { ForumService } from '../services/forum.service';
import { Post } from '../models/post.model';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  imports: [PostListComponent, CommonModule, ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  posts: Post[] = [];
  postResponseMessage: string = '';
  isSuccess: boolean = false;
  messageVisible: boolean = true;

  applyForm = new FormGroup({
    title: new FormControl(''),
    content: new FormControl('')
  });

  constructor(private forumService: ForumService) {}

  ngOnInit(): void {
    this.forumService.getPosts().subscribe((data) => {
      this.posts = data;
    });
  }

  createPost() {
    console.log("createPost HomeComponent");
    this.forumService.createPost(
      this.applyForm.value.title ?? '',
      this.applyForm.value.content ?? '',
    ).subscribe({
    next: (response) => {
      this.postResponseMessage = 'Post submitted successfully!';
      this.isSuccess = true;
      this.applyForm.reset();
      this.clearMessage();
    },
    error: (error) => {
      this.postResponseMessage = 'Failed to submit post. Please try again.';
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
    this.postResponseMessage = '';
  }, 7000); // fully clear after 10 seconds
}

}
