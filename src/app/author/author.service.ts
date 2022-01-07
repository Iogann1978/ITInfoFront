import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {Author} from "../model/author";

@Injectable({
  providedIn: 'root'
})
export class AuthorService {

  constructor(private http: HttpClient) { }

  getAuthor(authorId: number): Observable<Author> {
    let params = new HttpParams();
    params.append('id', authorId);
    return this.http.get<Author>('./assets/author.json', {params: params});
  }
}
