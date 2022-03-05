import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Author} from "../model/author";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AuthorService {
  apiAuthorEndpointId: string = '';

  constructor(private http: HttpClient) {
    this.apiAuthorEndpointId = environment.apiAuthorEndpointId;
  }

  getAuthor(authorId: number): Observable<Author> {
    return this.http.get<Author>(this.apiAuthorEndpointId.replace(':id', `${authorId}`));
  }
}
