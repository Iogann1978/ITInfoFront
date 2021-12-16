import { Injectable } from '@angular/core';
import {Observable, of} from "rxjs";
import {map} from "rxjs/operators";
import {Tag} from "../model/tag";
import {HttpClient, HttpParams} from "@angular/common/http";
import {TagsService} from "../tags/tags.service";
import {CourseItem} from "../model/course-item";

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor(private http: HttpClient, private tagsService: TagsService) { }

  getTags(): Observable<string[]> {
    return this.tagsService.getTags()
      .pipe(
        map((data: Tag[]) => data.map((tag: Tag) => tag.tag))
      );
  }

  getCourseTags(courseId: number): Observable<string[]> {
    if (courseId < 0) {
      return null;
    } else {
      let params = new HttpParams();
      params.append('id', courseId);
      return this.http.get<CourseItem>('./assets/course.json', {params: params})
        .pipe(
          map((course: CourseItem) => course.tags),
          map((data: Tag[]) => data.map((tag: Tag) => tag.tag))
        );
    }
  }

  getCourse(courseId: number): Observable<CourseItem> {
    if (courseId < 0) {
      return of({id: null, title: null, rate: null, file: null, year: null, tags: null, publisher: null, state: null, duration: null});
    } else {
      let params = new HttpParams();
      params.append('id', courseId);
      return this.http.get<CourseItem>('./assets/course.json', {params: params});
    }
  }
}
