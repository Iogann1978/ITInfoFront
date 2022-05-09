import {Injectable} from '@angular/core';
import {Observable, of} from "rxjs";
import {map} from "rxjs/operators";
import {Tag} from "../model/tag";
import {HttpClient} from "@angular/common/http";
import {TagsService} from "../tags/tags.service";
import {CourseItem} from "../model/course-item";
import {environment} from "../../environments/environment";
import {Rate} from "../model/rate";
import {State} from "../model/state";

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  apiCourseEndpointId: string = '';
  apiCourseEndpoint: string = '';

  constructor(private http: HttpClient, private tagsService: TagsService) {
    this.apiCourseEndpointId = environment.apiCourseEndpointId;
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
      return of();
    } else {
      return this.http.get<CourseItem>(this.apiCourseEndpointId.replace(':id', `${courseId}`))
        .pipe(
          map((course: CourseItem) => course.tags),
          map((data: Tag[]) => data.map((tag: Tag) => tag.tag))
        );
    }
  }

  getCourse(courseId: number): Observable<CourseItem> {
    if (courseId < 0) {
      return of({id: null, title: null, file: {id: null, filename: null, size: null}, year: null, tags: null, publisher: {id: null, name: null}, rate: Rate.UNKNOWN, state: State.PLANNED, duration: null, descripts: []});
    } else {
      return this.http.get<CourseItem>(this.apiCourseEndpointId.replace(':id', `${courseId}`));
    }
  }

  deleteCourse(courseId: number) {
    this.http.delete(this.apiCourseEndpointId.replace(':id', `${courseId}`)).subscribe();
  }

  saveCourse(course: CourseItem) {
    this.http.post<CourseItem>(this.apiCourseEndpoint, course).subscribe();
  }
}
