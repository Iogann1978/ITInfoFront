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
import {BookItem} from "../model/book-item";
import {ActivatedRoute, Router} from "@angular/router";
import {Publisher} from "../model/publisher";
import {PublishersService} from "../publishers/publishers.service";
import {MatDialog} from "@angular/material/dialog";
import {DeleteDialogComponent} from "../delete-dialog/delete-dialog.component";

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
  publishers: Publisher[];

  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  filteredTags: Observable<string[]>;
  tags: string[];
  allTags: string[];
  book: BookItem = {
    authors: [],
    file: {id: 0, filename: '', size: 0},
    isbn: "",
    pages: 0,
    publisher: undefined,
    rate: Rate.UNKNOWN,
    state: State.PLANNED,
    tags: [],
    title: "",
    year: 0,
    id: null
  };

  paramMap: Subscription;

  bookFormGroup: FormGroup;
  @ViewChild('tagInput') tagInput: ElementRef<HTMLInputElement>;

  constructor(
    private bookService: BookService,
    private publishersService: PublishersService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog
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
    this.bookFormGroup = new FormGroup({
      'tagCtrl': new FormControl(null),
      'isbnCtrl': new FormControl(null),
      'titleCtrl': new FormControl(null, Validators.required),
      'publisherCtrl': new FormControl(null),
      'yearCtrl': new FormControl(null),
      'pagesCtrl': new FormControl(null),
      'bookFileCtrl': new FormControl(null),
      'rateCtrl': new FormControl(null, Validators.required),
      'stateCtrl': new FormControl(null, Validators.required),
      'authorsCtrl': new FormControl(null)
    });
    this.bookFormGroup.get('isbnCtrl').valueChanges.subscribe(isbn => this.book.isbn = isbn);
    this.bookFormGroup.get('titleCtrl').valueChanges.subscribe(title => this.book.title = title);
    this.bookFormGroup.get('publisherCtrl').valueChanges.subscribe(publisher => this.book.publisher.id = publisher);
    this.bookFormGroup.get('yearCtrl').valueChanges.subscribe(year => this.book.year = year);
    this.bookFormGroup.get('pagesCtrl').valueChanges.subscribe(pages => this.book.pages = pages);
    this.publishersService.getPublishers().subscribe(data => this.publishers = data);
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
    this.bookFormGroup.get('bookFileCtrl').setValue(this.book.file.filename);
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
        this.bookFormGroup.get('publisherCtrl').setValue(this.book.publisher.id);
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

  delete() {
    this.dialog.open(DeleteDialogComponent).afterClosed().subscribe(result => {
      if(result) {
        this.bookService.deleteBook(this.book.id);
      }
    });
  }

  save() {
    if (this.bookFormGroup.valid) {
      this.bookService.saveBook(this.book);
      this.router.navigate(['/home']);
    }
  }

  getGoogle(): void {
    this.bookService.getGoogle(this.bookFormGroup.get('isbnCtrl').value).subscribe(bookItem => {
      this.book = bookItem;
      this.publishersService.getPublishers().subscribe(pubs => {
        this.bookService.getTags().subscribe(tags => {
          this.publishers = pubs;
          this.bookFormGroup.get('isbnCtrl').setValue(this.book.isbn);
          this.bookFormGroup.get('titleCtrl').setValue(this.book.title);
          this.bookFormGroup.get('publisherCtrl').setValue(this.book.publisher.id);
          this.bookFormGroup.get('yearCtrl').setValue(this.book.year);
          this.bookFormGroup.get('pagesCtrl').setValue(this.book.pages);
          this.bookFormGroup.get('rateCtrl').setValue(Rate[this.book.rate].toString());
          this.bookFormGroup.get('stateCtrl').setValue(State[this.book.state].toString());
          this.bookFormGroup.get('authorsCtrl').setValue(this.book.authors.map(a => a.name).join(', '));
          this.tags = tags;
        });
      });
    });
  }

}
