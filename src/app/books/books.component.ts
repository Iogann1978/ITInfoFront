import {Component, OnInit} from '@angular/core';
import {BookItem} from "../model/book-item";
import {Rate} from "../model/rate";
import {State} from "../model/state";

const ELEMENT_DATA: BookItem[] = [
  {
    id: 0,
    title: 'ASDF',
    isbn: '',
    publisher: {
      id: 0,
      name: ''
    },
    pages: 0,
    rate: Rate.GOOD,
    state: State.STUDIED,
    year: 2020,
    descript: {
      id: 0
    },
    file: {
      id: 0,
      filename: '',
      size: 0
    },
    authors: [
      {
        id: 0,
        name: ''
      }
    ],
    tags: [
      {
        id: 0,
        tag: ''
      }
    ]
  },
  {
    id: 0,
    title: 'ASDF',
    isbn: '',
    publisher: {
      id: 0,
      name: ''
    },
    pages: 0,
    rate: Rate.GOOD,
    state: State.STUDIED,
    year: 2020,
    descript: {
      id: 0
    },
    file: {
      id: 0,
      filename: '',
      size: 0
    },
    authors: [
      {
        id: 0,
        name: ''
      }
    ],
    tags: [
      {
        id: 0,
        tag: ''
      }
    ]
  }
];

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {
  displayedColumns: string[] = ['title', 'isbn', 'publisher', 'pages', 'rate', 'state', 'year'];
  dataSource = ELEMENT_DATA;

  constructor() { }

  ngOnInit(): void {
  }
}
