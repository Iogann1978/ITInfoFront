import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, of} from "rxjs";
import {Tag} from "../model/tag";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class TagService {
  apiTagEndpoint: string = '';

  constructor(private http: HttpClient) {
    this.apiTagEndpoint = environment.apiTagEndpoint;
  }

  getTag(tagId: number): Observable<Tag> {
    if (tagId < 0) {
      return of({id: null, tag: null});
    } else {
      return this.http.get<Tag>(this.apiTagEndpoint.replace(':id', `${tagId}`));
    }
  }
}
