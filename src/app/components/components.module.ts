import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { SharedModule } from './../shared/shared.module';
import { GoogleBooksService } from './google-books/google-books-api.service';
import { GoogleBooksComponent } from './google-books/google-books.component';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule
  ],
  exports: [GoogleBooksComponent],
  declarations: [GoogleBooksComponent],
  providers: [
    GoogleBooksService
]
})
export class ComponentsModule { }
