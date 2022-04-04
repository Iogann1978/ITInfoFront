import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Author} from "../model/author";
import {environment} from "../../environments/environment";
import {Tag} from "../model/tag";

@Injectable({
  providedIn: 'root'
})
export class AuthorService {
  apiAuthorEndpointId: string = '';
  apiAuthorEndpoint: string = '';

  constructor(private http: HttpClient) {
    this.apiAuthorEndpointId = environment.apiAuthorEndpointId;
    this.apiAuthorEndpoint = environment.apiAuthorEndpoint;
  }

  getAuthor(authorId: number): Observable<Author> {
    return this.http.get<Author>(this.apiAuthorEndpointId.replace(':id', `${authorId}`));
  }

  saveAuthor(author: Author) {
    this.http.post<Tag>(this.apiAuthorEndpoint, author).subscribe();
  }
}
