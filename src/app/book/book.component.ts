import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Rate} from "../model/rate";
import {State} from "../model/state";
import {COMMA, ENTER} from "@angular/cdk/keycodes";
import {FormControl} from "@angular/forms";
import {Observable} from "rxjs";
import {map, startWith} from "rxjs/operators";
import {MatAutocompleteSelectedEvent} from "@angular/material/autocomplete";
import {MatChipInputEvent} from "@angular/material/chips";
import {BookService} from "./book.service";
import {InfoFile} from "../model/info-file";

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {
  rateKeys: string[];
  stateKeys: string[];

  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  tagCtrl = new FormControl();
  filteredTags: Observable<string[]>;
  tags: string[];
  allTags: string[];
  bookFile: InfoFile;
  contentFile: InfoFile;
  descriptFile: InfoFile;

  @ViewChild('tagInput') tagInput: ElementRef<HTMLInputElement>;

  constructor(private bookService: BookService) {
    this.rateKeys=Object.keys(Rate).filter(f => isNaN(Number(f)));
    this.stateKeys=Object.keys(State).filter(f => isNaN(Number(f)));

    bookService.getTags().subscribe(data => {
      this.allTags = data;
      this.filteredTags = this.tagCtrl.valueChanges.pipe(
        startWith(null),
        map((tag: string | null) => (tag ? this._filter(tag) : this.allTags.slice())),
      );
    });
    bookService.getBookTags1(1).subscribe(data => this.tags = data);
    this.bookFile = {id: 0, filename: '', size: 0};
    this.contentFile = {id: 0, filename: '', size: 0};
    this.descriptFile = {id: 0, filename: '', size: 0};
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.tags.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();

    this.tagCtrl.setValue(null);
  }

  remove(tag: string): void {
    const index = this.tags.indexOf(tag);

    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.tags.push(event.option.viewValue);
    this.tagInput.nativeElement.value = '';
    this.tagCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allTags.filter(tag => tag.toLowerCase().includes(filterValue));
  }

  selectBookFile(event) {
    this.bookFile.filename = event.target.files[0].name;
    this.bookFile.size = event.target.files[0].size;
  }

  selectContentFile(event) {
    this.contentFile.filename = event.target.files[0].name;
    this.contentFile.size = event.target.files[0].size;
  }

  selectDescriptFile(event) {
    this.descriptFile.filename = event.target.files[0].name;
    this.descriptFile.size = event.target.files[0].size;
  }

  ngOnInit(): void {
  }

}
