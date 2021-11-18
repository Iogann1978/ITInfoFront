import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Rate} from "../model/rate";
import {State} from "../model/state";
import {COMMA, ENTER} from "@angular/cdk/keycodes";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Observable, Subscription} from "rxjs";
import {map, startWith} from "rxjs/operators";
import {MatAutocompleteSelectedEvent} from "@angular/material/autocomplete";
import {MatChipInputEvent} from "@angular/material/chips";
import {BookService} from "./book.service";
import {InfoFile} from "../model/info-file";
import {BookItem} from "../model/book-item";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit, OnDestroy {
  rateKeys: string[];
  stateKeys: string[];

  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  filteredTags: Observable<string[]>;
  tags: string[];
  allTags: string[];
  bookFile: InfoFile;
  contentFile: InfoFile;
  descriptFile: InfoFile;
  book: BookItem;
  rateSelected: string;

  paramMap: Subscription;

  bookFormGroup: FormGroup;
  @ViewChild('tagInput') tagInput: ElementRef<HTMLInputElement>;

  constructor(
    private bookService: BookService,
    private activatedRoute: ActivatedRoute
  ) {
    this.rateKeys=Object.keys(Rate).filter(f => isNaN(Number(f)));
    this.stateKeys=Object.keys(State).filter(f => isNaN(Number(f)));

    bookService.getTags().subscribe(data => {
      this.allTags = data;
      this.filteredTags = this.bookFormGroup.get('tagCtrl').valueChanges.pipe(
        startWith(null),
        map((tag: string | null) => (tag ? this._filter(tag) : this.allTags.slice())),
      );
    });
    this.bookFile = {id: 0, filename: '', size: 0};
    this.contentFile = {id: 0, filename: '', size: 0};
    this.descriptFile = {id: 0, filename: '', size: 0};
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    if (value) {
      this.tags.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();

    this.bookFormGroup.get('tagCtrl').setValue(null);
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
    this.bookFormGroup.get('tagCtrl').setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allTags.filter(tag => tag.toLowerCase().includes(filterValue));
  }

  selectBookFile(event) {
    this.book.file.filename = event.target.files[0].name;
    this.book.file.size = event.target.files[0].size;
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
    this.paramMap = this.activatedRoute.paramMap.subscribe(params => {
      let id = +params.get('id');
      this.bookService.getBook(id).subscribe(bookItem => {
        this.book = bookItem;
        this.rateSelected = 'GOOD';
        this.bookFormGroup = new FormGroup({
          'tagCtrl': new FormControl(null),
          'isbnCtrl': new FormControl(this.book.isbn),
          'titleCtrl': new FormControl(this.book.title, Validators.required),
          'publisherCtrl': new FormControl(this.book.publisher.name),
          'yearCtrl': new FormControl(this.book.year),
          'pagesCtrl': new FormControl(this.book.pages),
          'bookFileCtrl': new FormControl(this.book.file.filename),
          'contentFileCtrl': new FormControl(null),
          'descriptFileCtrl': new FormControl(null)
        });
      });
      this.bookService.getBookTags(id).subscribe(data => this.tags = data);
    });
  }

  ngOnDestroy(): void {
    this.paramMap.unsubscribe();
  }

}
