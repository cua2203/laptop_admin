import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from "rxjs/operators";
import { baseUrl } from '../shared/enviroment/enviroment';

@Injectable({
  providedIn: 'root'
})
export class HttpRequestService {
  private baseUrl = baseUrl || 'http://localhost:3001/api'; // Thay bằng URL của bạn

  constructor(private http: HttpClient) {}

  // Hàm xử lý lỗi chung
  private handleError(error: HttpErrorResponse): Observable<never> {
    // Có thể log lỗi vào một service logging tại đây
    console.error('Đã xảy ra lỗi:', error);
    return throwError(() => new Error('Có lỗi xảy ra trong quá trình kết nối. Vui lòng thử lại.'));
  }

  get<T>(endpoint: string, params?: any): Observable<T> {
    return this.http
      .get<T>(`${this.baseUrl}/${endpoint}`, { params })
      .pipe(catchError(this.handleError)); // Gọi hàm handleError
  }

  post<T>(endpoint: string, body: any): Observable<T> {
    return this.http
      .post<T>(`${this.baseUrl}/${endpoint}`, body)
      .pipe(catchError(this.handleError));
  }

  put<T>(endpoint: string, body: any): Observable<T> {
    return this.http
      .put<T>(`${this.baseUrl}/${endpoint}`, body)
      .pipe(catchError(this.handleError));
  }

  delete<T>(endpoint: string): Observable<T> {
    return this.http
      .delete<T>(`${this.baseUrl}/${endpoint}`)
      .pipe(catchError(this.handleError));
  }
}
