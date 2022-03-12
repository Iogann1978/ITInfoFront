import {Component, OnInit, ViewChild} from '@angular/core';
import {CourseItem} from "../model/course-item";
import {CoursesService} from "./courses.service";
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {MatDialog} from "@angular/material/dialog";
import {DeleteDialogComponent} from "../delete-dialog/delete-dialog.component";

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css'],
  providers: [CoursesService]
})
export class CoursesComponent implements OnInit {
  displayedColumns: string[];
  dataSource: MatTableDataSource<CourseItem> = new MatTableDataSource<CourseItem>();

  pageSizeOptions: number[] = [5, 10, 25, 100];
  @ViewChild('coursesPaginator') coursesPaginator: MatPaginator;

  constructor(
    private coursesService: CoursesService,
    private dialog: MatDialog
  ) {
    this.displayedColumns = this.coursesService.getDisplayedColumns();
    this.coursesService.getCourseItems().subscribe(data => {
      this.dataSource.data = data;
      this.dataSource.paginator = this.coursesPaginator;
    });
  }

  delete(tag: string) {
    this.dialog.open(DeleteDialogComponent).afterClosed().subscribe(result => {
      if(result) {
      }
    });
  }

  ngOnInit(): void {
  }
}
