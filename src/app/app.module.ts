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
import { FooterComponent } from './footer/footer.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatPaginatorModule} from "@angular/material/paginator";
import { ContentComponent } from './content/content.component';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from "@angular/material/select";
import {MatChipsModule} from "@angular/material/chips";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatGridListModule} from "@angular/material/grid-list";
import { FindComponent } from './find/find.component';
import { HomeComponent } from './home/home.component';
import { CourseComponent } from './course/course.component';
import { PublisherComponent } from './publisher/publisher.component';
import { TagComponent } from './tag/tag.component';
import { AuthorComponent } from './author/author.component';
import { FileComponent } from './file/file.component';
import { DescriptComponent } from './descript/descript.component';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';
import {MatDialogModule} from "@angular/material/dialog";
import { DescriptsComponent } from './descripts/descripts.component';
import { DescriptDialogComponent } from './descript-dialog/descript-dialog.component';
import {MatBadgeModule} from "@angular/material/badge";

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
    AuthorsComponent,
    FooterComponent,
    ContentComponent,
    FindComponent,
    HomeComponent,
    CourseComponent,
    PublisherComponent,
    TagComponent,
    AuthorComponent,
    FileComponent,
    DescriptComponent,
    DeleteDialogComponent,
    DescriptsComponent,
    DescriptDialogComponent
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
        HttpClientModule,
        FormsModule,
        MatPaginatorModule,
        MatButtonModule,
        MatSelectModule,
        MatChipsModule,
        ReactiveFormsModule,
        MatAutocompleteModule,
        MatGridListModule,
        MatDialogModule,
        MatBadgeModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
