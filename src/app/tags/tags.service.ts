import { Injectable } from '@angular/core';
import {Tag} from "../model/tag";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class TagsService {
  displayedColumns: string[] = ['tag', 'actions'];
  apiTagEndpoint: string = '';
  apiTagEndpointId: string = '';

  constructor(private http: HttpClient) {
    this.apiTagEndpoint = environment.apiTagEndpoint;
    this.apiTagEndpointId = environment.apiTagEndpointId;
  }

  getTags(): Observable<Tag[]> {
    return this.http.get<Tag[]>(this.apiTagEndpoint);
  }

  deleteTag(tagId: number) {
    this.http.delete(this.apiTagEndpointId.replace(':id', `${tagId}`)).subscribe();
  }

  getDisplayedColumns(): string[] {
    return this.displayedColumns;
  }
}
