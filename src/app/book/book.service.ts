import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private http: HttpClient) { }

  getTags(): Observable<string[]> {
    return this.http.get<string[]>('./assets/tags_str.json');
  }

  getBookTags(bookId: number): Observable<string[]> {
    return this.http.get<string[]>('./assets/book_tags_str.json');
  }
}
