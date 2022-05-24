import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {Descript} from "../model/descript";
import {DeleteDialogComponent} from "../delete-dialog/delete-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {DescriptsService} from "./descripts.service";
import {Subscription} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {Info} from "../model/info";
import {DescriptDialogComponent} from "../descript-dialog/descript-dialog.component";
import {BookService} from "../book/book.service";
import {CourseService} from "../course/course.service";

@Component({
  selector: 'app-descripts',
  templateUrl: './descripts.component.html',
  styleUrls: ['./descripts.component.css']
})
export class DescriptsComponent implements OnInit {
  displayedColumns: string[];
  dataSource: MatTableDataSource<Descript> = new MatTableDataSource<Descript>();
  paramMap: Subscription;
  info: Info = {
    file: undefined,
    id: 0,
    publisher: undefined,
    rate: undefined,
    state: undefined,
    tags: [],
    title: "",
    year: 0
  };

  constructor(
    private descriptsService: DescriptsService,
    private bookService: BookService,
    private courseService: CourseService,
    private dialog: MatDialog,
    private activatedRoute: ActivatedRoute
  ) {
    this.displayedColumns = this.descriptsService.getDisplayedColumns();
  }

  ngOnInit(): void {
    this.paramMap = this.activatedRoute.paramMap.subscribe(params => {
      let id = +params.get('id');
      this.refreshData(id);
    });
  }

  delete(id: number) {
    this.dialog.open(DeleteDialogComponent).afterClosed().subscribe(result => {
      if(result) {
        this.descriptsService.deleteDescript(id).subscribe(response => this.refreshData(this.info.id));
      }
    });
  }

  addDescript() {
    this.dialog.open(DescriptDialogComponent).afterClosed().subscribe((descript: Descript) => {
      if(descript != null) {
        descript.infoId = this.info.id;
        this.descriptsService.saveDescript(descript).subscribe(response => this.refreshData(this.info.id));
      }
    });
  }

  refreshData(id: number) {
    this.descriptsService.getInfo(id).subscribe(info => {
      this.info = info;
      this.dataSource.data = info.descripts;
    });
  }

  export() {

  }
}
