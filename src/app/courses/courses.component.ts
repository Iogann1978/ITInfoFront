import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {CourseItem} from "../model/course-item";
import {CoursesService} from "./courses.service";
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {MatDialog} from "@angular/material/dialog";
import {DeleteDialogComponent} from "../delete-dialog/delete-dialog.component";
import {Subject} from "rxjs";
import {takeUntil} from "rxjs/operators";

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css'],
  providers: [CoursesService]
})
export class CoursesComponent implements OnInit, OnDestroy {
  ngUnsubscribe = new Subject<void>();
  displayedColumns: string[];
  dataSource: MatTableDataSource<CourseItem> = new MatTableDataSource<CourseItem>();

  pageSizeOptions: number[] = [5, 10, 25, 100];
  @ViewChild('coursesPaginator') coursesPaginator: MatPaginator;

  constructor(
    private coursesService: CoursesService,
    private dialog: MatDialog
  ) {
    this.displayedColumns = this.coursesService.getDisplayedColumns();
    this.refreshData();
  }

  delete(courseId: number) {
    this.dialog.open(DeleteDialogComponent).afterClosed().pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(result => {
      if(result) {
        this.coursesService.deleteCourse(courseId).pipe(takeUntil(this.ngUnsubscribe))
          .subscribe(response => this.refreshData());
      }
    });
  }

  ngOnInit(): void {
  }

  refreshData() {
    this.coursesService.getCourseItems().pipe(takeUntil(this.ngUnsubscribe)).subscribe(data => {
      this.dataSource.data = data;
      this.dataSource.paginator = this.coursesPaginator;
    });
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
