import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {Tag} from "../model/tag";
import {map} from "rxjs/operators";
import {BookItem} from "../model/book-item";
import {TagsService} from "../tags/tags.service";

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private http: HttpClient, private tagsService: TagsService) { }

  getTags(): Observable<string[]> {
    return this.tagsService.getTags()
      .pipe(
        map((data: Tag[]) => data.map((tag: Tag) => tag.tag))
      );
  }

  getBookTags1(bookId: number): Observable<string[]> {
    let params = new HttpParams();
    params.append('id', bookId);
    return this.http.get<BookItem>('./assets/book.json', {params: params})
      .pipe(
        map((book: BookItem) => book.tags),
        map((data: Tag[]) => data.map((tag: Tag) => tag.tag))
      );
  }
}
