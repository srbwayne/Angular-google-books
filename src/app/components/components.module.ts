import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from './../shared/shared.module';
import { GoogleBooksComponent } from './google-books/google-books.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [GoogleBooksComponent],
  declarations: [GoogleBooksComponent]
})
export class ComponentsModule { }
