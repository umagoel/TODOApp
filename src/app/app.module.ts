import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component'
import { TodoComponent } from './todo/todo.component';
import {Router, Routes, RouterModule} from '@angular/router';
import{FormsModule} from '@angular/forms';
import{HttpClientModule} from '@angular/common/http';

const appRoutes : Routes=[
  {
    path:'',
    component: TodoComponent
  },
  {
    path:'todo',
    component: TodoComponent
  }
]



@NgModule({
  declarations: [
    AppComponent,
    TodoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
