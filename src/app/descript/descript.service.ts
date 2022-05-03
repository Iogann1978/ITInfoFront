import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable, of} from "rxjs";
import {Descript} from "../model/descript";

@Injectable({
  providedIn: 'root'
})
export class DescriptService {
  apiDescriptEndpointId: string = '';

  constructor(private http: HttpClient) {
    this.apiDescriptEndpointId = environment.apiDescriptEndpointId;
  }

  getDescript(id: number): Observable<Descript> {
    if (id < 0) {
      return of();
    } else {
      return this.http.get<Descript>(this.apiDescriptEndpointId.replace(':id',`${id}`));
    }
  }

  postDescript(id: number, file: File) {
    const formData = new FormData();
    formData.append("file", file);
    const upload = this.http.post(this.apiDescriptEndpointId.replace(':id',`${id}`), formData);
    upload.subscribe();
  }
}
