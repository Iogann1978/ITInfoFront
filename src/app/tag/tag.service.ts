import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Tag} from "../model/tag";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class TagService {
  apiTagEndpointId: string = '';
  apiTagEndpoint: string = '';

  constructor(private http: HttpClient) {
    this.apiTagEndpointId = environment.apiTagEndpointId;
    this.apiTagEndpoint = environment.apiTagEndpoint;
  }

  saveTag(tag: Tag): void {
    this.http.post<Tag>(this.apiTagEndpoint, tag).subscribe();
  }

  deleteTag(tag: string) {
    this.http.delete(this.apiTagEndpointId.replace(':tag', `${tag}`)).subscribe();
  }
}
