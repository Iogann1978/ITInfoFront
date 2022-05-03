import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {Descript} from "../model/descript";
import {DeleteDialogComponent} from "../delete-dialog/delete-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {DescriptsService} from "./descripts.service";
import {Subscription} from "rxjs";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-descripts',
  templateUrl: './descripts.component.html',
  styleUrls: ['./descripts.component.css']
})
export class DescriptsComponent implements OnInit {
  displayedColumns: string[];
  dataSource: MatTableDataSource<Descript> = new MatTableDataSource<Descript>();
  paramMap: Subscription;
  title: string = '';

  constructor(
    private descriptsService: DescriptsService,
    private dialog: MatDialog,
    private activatedRoute: ActivatedRoute
  ) {
    this.displayedColumns = this.descriptsService.getDisplayedColumns();
  }

  ngOnInit(): void {
    this.paramMap = this.activatedRoute.paramMap.subscribe(params => {
      let id = +params.get('id');
      this.descriptsService.getDescripts(id).subscribe((data:Descript[]) => this.dataSource.data = data);
      this.descriptsService.getTitle(id).subscribe((title:string) => this.title = title);
    });
  }

  delete(id: number) {
    this.dialog.open(DeleteDialogComponent).afterClosed().subscribe(result => {
      if(result) {
        this.descriptsService.deleteDescript(id);
      }
    });
  }
}
