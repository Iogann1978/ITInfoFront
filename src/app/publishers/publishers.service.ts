import { Injectable } from '@angular/core';
import {Publisher} from "../model/publisher";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class PublishersService {
  private displayedColumns: string[] = ['name', 'actions'];
  apiPublisherEndpoint: string = '';
  apiPublisherEndpointId: string = '';

  constructor(private http: HttpClient) {
    this.apiPublisherEndpoint = environment.apiPublisherEndpoint;
    this.apiPublisherEndpointId = environment.apiPublisherEndpointId;
  }

  getPublishers(): Observable<Publisher[]> {
    return this.http.get<Publisher[]>(this.apiPublisherEndpoint);
  }

  getDisplayedColumns(): string[] {
    return this.displayedColumns;
  }

  deletePublisher(publisherId: number) {
    this.http.delete(this.apiPublisherEndpointId.replace(':id', `${publisherId}`)).subscribe();
  }
}
