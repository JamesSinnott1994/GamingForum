import { HttpClient } from '@angular/common/http';
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
    console.log("HERE FORUM");
    return this.http.get<Post[]>(this.apiUrl);
  }

}
