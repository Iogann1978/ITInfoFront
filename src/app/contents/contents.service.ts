import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable, of} from "rxjs";
import {Content} from "../model/content";

@Injectable({
  providedIn: 'root'
})
export class ContentsService {
  apiContentEndpointId: string = '';

  constructor(private http: HttpClient) {
    this.apiContentEndpointId = environment.apiContentEndpointId;
  }

  getContent(bookId: number): Observable<Content> {
    if (bookId < 0) {
      return of({id: null, text: null});
    } else {
      return this.http.get<Content>(this.apiContentEndpointId.replace(':id',`${bookId}`));
    }
  }

  postContent(id: number, file: File) {
    const formData = new FormData();
    formData.append("file", file);
    const upload = this.http.post(this.apiContentEndpointId.replace(':id',`${id}`), formData);
    upload.subscribe();
  }
}
