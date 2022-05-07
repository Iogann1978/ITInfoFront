import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {Info} from "../model/info";

@Injectable({
  providedIn: 'root'
})
export class DescriptsService {
  apiDescriptsEndpointId: string = '';
  apiDescriptEndpointId: string = '';
  apiInfoEndpointId: string = '';
  apiInfoEndpoint: string = '';
  displayedColumns: string[] = ['name', 'actions'];

  constructor(private http: HttpClient) {
    this.apiDescriptEndpointId = environment.apiDescriptEndpointId;
    this.apiDescriptsEndpointId = environment.apiDescriptsEndpointId;
    this.apiInfoEndpointId = environment.apiInfoEndpointId;
    this.apiInfoEndpoint = environment.apiInfoEndpoint;
  }

  getDisplayedColumns(): string[] {
    return this.displayedColumns;
  }

  getInfo(id: number): Observable<Info> {
    return this.http.get<Info>(this.apiInfoEndpointId.replace(':id', `${id}`));
  }

  deleteDescript(id: number) {
    this.http.delete(this.apiDescriptEndpointId.replace(':id', `${id}`)).subscribe();
  }

  saveInfo(info: Info) {
    this.http.post<Info>(this.apiInfoEndpoint, info).subscribe();
  }
}
