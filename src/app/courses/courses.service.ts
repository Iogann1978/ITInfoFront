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
  apiCourseEndpoint: string = '';

  constructor(private http: HttpClient) {
    this.apiCourseEndpoint = environment.apiCourseEndpoint;
  }

  getCourseItems(): Observable<CourseItem[]> {
    return this.http.get<CourseItem[]>(this.apiCourseEndpoint);
  }

  getDisplayedColumns(): string[] {
    return this.displayedColumns;
  }
}
