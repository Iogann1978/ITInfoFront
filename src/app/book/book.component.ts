import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Rate} from "../model/rate";
import {State} from "../model/state";
import {COMMA, ENTER} from "@angular/cdk/keycodes";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Observable, Subscription} from "rxjs";
import {map, startWith, tap} from "rxjs/operators";
import {MatAutocompleteSelectedEvent} from "@angular/material/autocomplete";
import {MatChipInputEvent} from "@angular/material/chips";
import {BookService} from "./book.service";
import {InfoFile} from "../model/info-file";
import {BookItem} from "../model/book-item";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit, OnDestroy {
  rateKeys;
  rateValues: string[];
  stateKeys;
  stateValues: string[];

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

  paramMap: Subscription;

  bookFormGroup: FormGroup;
  @ViewChild('tagInput') tagInput: ElementRef<HTMLInputElement>;

  constructor(
    private bookService: BookService,
    private activatedRoute: ActivatedRoute
  ) {
    this.tags = [];
    this.rateKeys = Object.keys(Rate).filter(f => !isNaN(Number(f)));
    this.rateValues = Object.keys(Rate).filter(f => !isNaN(Number(f))).map(f => Rate[f]);
    this.stateKeys = Object.keys(State).filter(f => !isNaN(Number(f)));
    this.stateValues = Object.keys(State).filter(f => !isNaN(Number(f))).map(f => State[f]);

    bookService.getTags().subscribe(data => {
      this.allTags = data;
      this.filteredTags = this.bookFormGroup.get('tagCtrl').valueChanges.pipe(
        startWith(null),
        map((tag: string | null) => (tag ? this.filterTag(tag) : this.allTags.slice()))
      );
    });
    this.bookFile = {id: 0, filename: '', size: 0};
    this.contentFile = {id: 0, filename: '', size: 0};
    this.descriptFile = {id: 0, filename: '', size: 0};
    this.bookFormGroup = new FormGroup({
      'tagCtrl': new FormControl(null),
      'isbnCtrl': new FormControl(null),
      'titleCtrl': new FormControl(null, Validators.required),
      'publisherCtrl': new FormControl(null),
      'yearCtrl': new FormControl(null),
      'pagesCtrl': new FormControl(null),
      'bookFileCtrl': new FormControl(null),
      'contentFileCtrl': new FormControl(null),
      'descriptFileCtrl': new FormControl(null),
      'rateCtrl': new FormControl(null),
      'stateCtrl': new FormControl(null),
      'authorsCtrl': new FormControl(null)
    });
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value) {
      this.tags.push(value);
    }
    // Clear the input value
    event.chipInput!.clear();
    this.bookFormGroup.get('tagCtrl').setValue(null);
    this.allTags = this.allTags.filter(tag => tag === value);
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

  private filterTag(value: string): string[] {
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

  disableTag(tag: string): boolean {
    return this.tags.includes(tag);
  }

  ngOnInit(): void {
    this.paramMap = this.activatedRoute.paramMap.subscribe(params => {
      let id = +params.get('id');
      this.bookService.getBook(id).subscribe(bookItem => {
        this.book = bookItem;
        this.bookFormGroup.get('isbnCtrl').setValue(this.book.isbn);
        this.bookFormGroup.get('titleCtrl').setValue(this.book.title);
        this.bookFormGroup.get('publisherCtrl').setValue(this.book.publisher.name);
        this.bookFormGroup.get('yearCtrl').setValue(this.book.year);
        this.bookFormGroup.get('pagesCtrl').setValue(this.book.pages);
        this.bookFormGroup.get('bookFileCtrl').setValue(this.book.file.filename);
        this.bookFormGroup.get('rateCtrl').setValue(Rate[this.book.rate].toString());
        this.bookFormGroup.get('stateCtrl').setValue(State[this.book.state].toString());
        this.bookFormGroup.get('authorsCtrl').setValue(this.book.authors.map(a => a.name).join(', '));
      });
      this.bookService.getBookTags(id).subscribe(data => this.tags = data);
    });
  }

  ngOnDestroy(): void {
    this.paramMap.unsubscribe();
  }

}
