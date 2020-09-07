import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignInComponent } from './sign-in/sign-in.component';
import { AddBookComponent } from './add-book/add-book.component';
import { BooksComponent } from './books/books.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import {DashboardComponent} from './dashboard/dashboard.component'
  

const routes: Routes = [
  {path: '', redirectTo: '/books',pathMatch:'full'},
  {path: 'books', component: BooksComponent},
  {path: 'add-book', component: AddBookComponent},
  {path: 'sign-in', component: SignInComponent},
  {path: 'sign-up', component: SignUpComponent},
  {path: 'dashboard', component: DashboardComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
