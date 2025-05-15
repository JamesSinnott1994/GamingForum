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

  applyForm = new FormGroup({
    title: new FormControl(''),
    content: new FormControl('')
  });

  constructor(private forumService: ForumService) {}

  ngOnInit(): void {
    this.forumService.getPosts().subscribe((data) => {
      this.posts = data;
      console.log(this.posts);
    });
  }

  createPost() {
    console.log("createPost HomeComponent");
    this.forumService.createPost(
      this.applyForm.value.title ?? '',
      this.applyForm.value.content ?? '',
    ).subscribe({
      next: (res) => console.log('Success:', res),
      error: (err) => console.error('Error:', err)
  });;
}
}
