import { Component, Input } from '@angular/core';
import { Post } from '../models/post.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-post-list',
  imports: [CommonModule],
  templateUrl: './post-list.component.html',
  styleUrl: './post-list.component.scss'
})
export class PostListComponent {
  @Input() post!: Post;
}
