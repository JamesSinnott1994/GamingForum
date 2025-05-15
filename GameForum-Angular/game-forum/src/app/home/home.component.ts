import { Component } from '@angular/core';
import { PostListComponent } from '../post-list/post-list.component';
import { ForumService } from '../services/forum.service';
import { Post } from '../models/post.model';

@Component({
  selector: 'app-home',
  imports: [PostListComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  posts: Post[] = [];

  constructor(private forumService: ForumService) {}

  ngOnInit(): void {
    this.forumService.getPosts().subscribe((data) => {
      console.log("HERE HOME 1");
      this.posts = data;
      console.log(this.posts);
      console.log("HERE HOME 2");
    });
  }
}
