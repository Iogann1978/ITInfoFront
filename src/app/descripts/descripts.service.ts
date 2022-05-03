import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {Descript} from "../model/descript";

@Injectable({
  providedIn: 'root'
})
export class DescriptsService {
  apiDescriptsEndpointId: string = '';
  apiDescriptEndpointId: string = '';
  apiTitleEndpointId: string = '';
  displayedColumns: string[] = ['name', 'actions'];

  constructor(private http: HttpClient) {
    this.apiDescriptEndpointId = environment.apiDescriptEndpointId;
    this.apiDescriptsEndpointId = environment.apiDescriptsEndpointId;
    this.apiTitleEndpointId = environment.apiTitleEndpointId;
  }

  getDisplayedColumns(): string[] {
    return this.displayedColumns;
  }

  getDescripts(id: number): Observable<Descript[]> {
    return this.http.get<Descript[]>(this.apiDescriptsEndpointId.replace(':id', `${id}`));
  }

  getTitle(id: number): Observable<string> {
    return this.http.get<string>(this.apiTitleEndpointId.replace(':id', `${id}`));
  }

  deleteDescript(id: number) {
    this.http.delete(this.apiDescriptEndpointId.replace(':id', `${id}`)).subscribe();
  }
}
