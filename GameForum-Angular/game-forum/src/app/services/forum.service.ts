import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Post } from '../models/post.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ForumService {

  private apiUrl = 'https://localhost:7251/api/GameForum';

  constructor(private http: HttpClient) {}

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(this.apiUrl);
  }

  getPostById(id: string) {
    return this.http.get<Post>(`${this.apiUrl}/${id}`);
  }

  getCommentsByPostId(postId: string) {
    return this.http.get<Comment[]>(`${this.apiUrl}/${postId}/comments`);
  }

  createPost(title: string, content: string): Observable<Object[]> {

    console.log("createPost ForumService");

    const postData: Object = {
      title: title,
      content: content,
    };
    console.log(postData);
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<Object[]>(this.apiUrl, postData, { headers });
}

}
