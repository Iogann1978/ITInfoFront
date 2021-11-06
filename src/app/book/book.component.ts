import { Component, OnInit } from '@angular/core';
import {Rate} from "../model/rate";
import {State} from "../model/state";

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {
  rateKeys: string[] = [];
  stateKeys: string[] = [];

  constructor() {
    this.rateKeys=Object.keys(Rate).filter(f => isNaN(Number(f)));
    this.stateKeys=Object.keys(State).filter(f => isNaN(Number(f)));
  }

  ngOnInit(): void {
  }

}
