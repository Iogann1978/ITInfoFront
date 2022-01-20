import { Injectable } from '@angular/core';
import {Observable, of} from "rxjs";
import {map} from "rxjs/operators";
import {Tag} from "../model/tag";
import {HttpClient} from "@angular/common/http";
import {TagsService} from "../tags/tags.service";
import {CourseItem} from "../model/course-item";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  apiCourseEndpoint: string = '';

  constructor(private http: HttpClient, private tagsService: TagsService) {
    this.apiCourseEndpoint = environment.apiCourseEndpoint;
  }

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
      return this.http.get<CourseItem>(this.apiCourseEndpoint + courseId)
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
      return this.http.get<CourseItem>(this.apiCourseEndpoint + courseId);
    }
  }
}
