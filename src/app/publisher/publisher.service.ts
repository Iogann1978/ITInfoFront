import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, of} from "rxjs";
import {Publisher} from "../model/publisher";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class PublisherService {
  apiPublisherEndpointId: string = '';

  constructor(private http: HttpClient) {
    this.apiPublisherEndpointId = environment.apiPublisherEndpointId;
  }

  getPublisher(publisherId: number): Observable<Publisher> {
    if (publisherId < 0) {
      return of({id: null, name: null});
    } else {
      return this.http.get<Publisher>(this.apiPublisherEndpointId.replace(':id', `${publisherId}`));
    }
  }
}
