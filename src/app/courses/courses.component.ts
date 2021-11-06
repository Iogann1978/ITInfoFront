import { Component, OnInit } from '@angular/core';
import {CourseItem} from "../model/course-item";
import {CoursesService} from "./courses.service";

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css'],
  providers: [CoursesService]
})
export class CoursesComponent implements OnInit {
  displayedColumns: string[];
  dataSource: CourseItem[] = [];

    constructor(private coursesService: CoursesService) {
      this.displayedColumns = this.coursesService.getDisplayedColumns();
    }

  ngOnInit(): void {
      this.coursesService.getCourseItems().subscribe(data => this.dataSource = data);
  }
}