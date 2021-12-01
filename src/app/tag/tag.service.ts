import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {Tag} from "../model/tag";

@Injectable({
  providedIn: 'root'
})
export class TagService {

  constructor(private http: HttpClient) { }

  getTag(tagId: number): Observable<Tag> {
    let params = new HttpParams();
    params.append('id', tagId);
    return this.http.get<Tag>('./assets/tag.json', {params: params});
  }
}
