import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Comment } from '../interfaces/comment';
import { Response } from '../interfaces/response';

@Injectable({
  providedIn: 'root',
})
export class CommentsService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.baseApiUrl}/moments`;

  createComment(comment: Comment): Observable<Response<Comment>> {
    return this.http.post<Response<Comment>>(
      `${this.apiUrl}/${comment.momentId}/comments`,
      comment,
    );
  }
}
