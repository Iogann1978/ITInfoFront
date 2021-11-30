import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {BookComponent} from "./book/book.component";
import {AppComponent} from "./app.component";
import {HomeComponent} from "./home/home.component";
import {CourseComponent} from "./course/course.component";
import {PublisherComponent} from "./publisher/publisher.component";

const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'book/:id', component: BookComponent},
  {path: 'course/:id', component: CourseComponent},
  {path: 'publisher/:id', component: PublisherComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
