import { Component } from '@angular/core';
import { PostListComponent } from '../post-list/post-list.component';
import { ForumService } from '../services/forum.service';
import { Post } from '../models/post.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [PostListComponent, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  posts: Post[] = [];

  constructor(private forumService: ForumService) {}

  ngOnInit(): void {
    this.forumService.getPosts().subscribe((data) => {
      this.posts = data;
      console.log(this.posts);
    });
  }
}
