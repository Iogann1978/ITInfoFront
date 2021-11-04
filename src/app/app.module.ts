import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { LoginComponent } from './login/login.component';
import {MatCardModule} from "@angular/material/card";
import {MatInputModule} from "@angular/material/input";
import { BooksComponent } from './books/books.component';
import { HeaderComponent } from './header/header.component';
import {MatTabsModule} from "@angular/material/tabs";
import {MatTableModule} from "@angular/material/table";
import { CoursesComponent } from './courses/courses.component';
import { BookComponent } from './book/book.component';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MatMenuModule} from "@angular/material/menu";
import { PublishersComponent } from './publishers/publishers.component';
import { TagsComponent } from './tags/tags.component';
import { FilesComponent } from './files/files.component';
import { AuthorsComponent } from './authors/authors.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    BooksComponent,
    HeaderComponent,
    CoursesComponent,
    BookComponent,
    PublishersComponent,
    TagsComponent,
    FilesComponent,
    AuthorsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatInputModule,
    MatTabsModule,
    MatTableModule,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
