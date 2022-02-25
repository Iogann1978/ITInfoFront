import { Injectable } from '@angular/core';
import {CourseItem} from "../model/course-item";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  displayedColumns: string[] = ['title', 'duration', 'publisher', 'rate', 'state', 'year', 'actions'];
  apiCoursesEndpoint: string = '';

  constructor(private http: HttpClient) {
    this.apiCoursesEndpoint = environment.apiCoursesEndpoint;
  }

  getCourseItems(): Observable<CourseItem[]> {
    return this.http.get<CourseItem[]>(this.apiCoursesEndpoint);
  }

  getDisplayedColumns(): string[] {
    return this.displayedColumns;
  }
}
