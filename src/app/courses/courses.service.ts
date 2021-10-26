import { Injectable } from '@angular/core';
import {CourseItem} from "../model/course-item";
import {Rate} from "../model/rate";
import {State} from "../model/state";

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  ELEMENT_DATA: CourseItem[] = [
    {
      id: 0,
      title: 'ASDF',
      duration: 3,
      publisher: {
        id: 0,
        name: ''
      },
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
      duration: 3,
      publisher: {
        id: 0,
        name: ''
      },
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
      tags: [
        {
          id: 0,
          tag: ''
        }
      ]
    }
  ];
  displayedColumns: string[] = ['title', 'duration', 'publisher', 'rate', 'state', 'year'];

  constructor() { }

  getCourseItems(): CourseItem[] {
    return this.ELEMENT_DATA;
  }

  getDisplayedColumns(): string[] {
    return this.displayedColumns;
  }
}
