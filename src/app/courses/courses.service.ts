import { Injectable } from '@angular/core';
import {CourseItem} from "../model/course-item";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  private displayedColumns: string[] = ['title', 'duration', 'publisher', 'rate', 'state', 'year'];

  constructor(private http: HttpClient) { }

  getCourseItems(): Observable<CourseItem[]> {
    return this.http.get<CourseItem[]>('./assets/courses.json');
  }

  getDisplayedColumns(): string[] {
    return this.displayedColumns;
  }
}
