import { Component, Input } from '@angular/core';
import { Comment } from '../models/comment.model';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-comment',
  imports: [CommonModule, RouterModule],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.scss'
})
export class CommentComponent {
  @Input() comment!: Comment;
}