import {Component, OnInit, ViewChild} from '@angular/core';
import {Publisher} from "../model/publisher";
import {PublishersService} from "./publishers.service";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";

@Component({
  selector: 'app-publishers',
  templateUrl: './publishers.component.html',
  styleUrls: ['./publishers.component.css'],
  providers: [PublishersService]
})
export class PublishersComponent implements OnInit {
  displayedColumns: string[];
  dataSource: MatTableDataSource<Publisher> = new MatTableDataSource<Publisher>();

  pageSizeOptions: number[] = [5, 10, 25, 100];
  @ViewChild('publishersPaginator') publishersPaginator: MatPaginator;

  constructor(private publishersService : PublishersService) {
    this.displayedColumns = publishersService.getDisplayedColumns();
  }

  ngOnInit(): void {
    this.publishersService.getPublishers().subscribe(data => {
      this.dataSource.data = data;
      this.dataSource.paginator = this.publishersPaginator;
    });
  }
}
