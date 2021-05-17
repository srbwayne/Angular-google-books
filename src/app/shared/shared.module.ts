import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeaderComponent } from './components/heard/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { CardEmptyComponent } from './components/card-empty/card-empty.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    HeaderComponent,
    CardEmptyComponent,
    FooterComponent
  ],
  exports: [
    HeaderComponent,
    CardEmptyComponent,
    FooterComponent
  ],
  providers: []
})
export class SharedModule { }
