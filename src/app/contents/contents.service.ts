import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable, of} from "rxjs";
import {Content} from "../model/content";

@Injectable({
  providedIn: 'root'
})
export class ContentsService {
  apiContentEndpoint: string = '';

  constructor(private http: HttpClient) {
    this.apiContentEndpoint = environment.apiContentEndpoint;
  }

  getContent(bookId: number): Observable<Content> {
    if (bookId < 0) {
      return of({id: null, text: null});
    } else {
      return this.http.get<Content>(this.apiContentEndpoint.replace(':id',`${bookId}`));
    }
  }

  postContent(id: number, file: File) {
    const formData = new FormData();
    formData.append("file", file);
    const upload = this.http.post(this.apiContentEndpoint.replace(':id',`${id}`), formData);
    upload.subscribe();
  }
}
