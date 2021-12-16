import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable, of} from "rxjs";
import {Publisher} from "../model/publisher";

@Injectable({
  providedIn: 'root'
})
export class PublisherService {

  constructor(private http: HttpClient) { }

  getPublisher(publisherId: number): Observable<Publisher> {
    if (publisherId < 0) {
      return of({id: null, name: null});
    } else {
      let params = new HttpParams();
      params.append('id', publisherId);
      return this.http.get<Publisher>('./assets/publisher.json', {params: params});
    }
  }
}
