import { Component, OnInit } from '@angular/core';
import {Publisher} from "../model/publisher";
import {PublishersService} from "./publishers.service";

@Component({
  selector: 'app-publishers',
  templateUrl: './publishers.component.html',
  styleUrls: ['./publishers.component.css'],
  providers: [PublishersService]
})
export class PublishersComponent implements OnInit {
  displayedColumns: string[];
  dataSource: Publisher[] = [];

  constructor(private publishersService : PublishersService) {
    this.displayedColumns = publishersService.getDisplayedColumns();
  }

  ngOnInit(): void {
    this.publishersService.getPublishers().subscribe(data => this.dataSource = data);
  }
}