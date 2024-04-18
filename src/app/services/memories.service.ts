import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Memory } from '../interfaces/memory';
import { Response } from '../interfaces/response';

@Injectable({
  providedIn: 'root',
})
export class MemoriesService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.baseApiUrl}/moments`;

  createMemory(formData: FormData): Observable<FormData> {
    return this.http.post<FormData>(this.apiUrl, formData);
  }

  getAllMemories(): Observable<Response<Memory[]>> {
    return this.http.get<Response<Memory[]>>(this.apiUrl);
  }

  getMemoryById(id: number): Observable<Response<Memory>> {
    return this.http.get<Response<Memory>>(`${this.apiUrl}/${id}`);
  }

  updateMemory(id: number, formData: FormData): Observable<FormData> {
    return this.http.put<FormData>(`${this.apiUrl}/${id}`, formData);
  }

  removeMemory(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
