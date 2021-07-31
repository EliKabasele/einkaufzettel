import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ItemListComponent } from './itemList/item-list.component';
import { ItemEditComponent } from './itemList/item-edit/item-edit.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [AppComponent, ItemListComponent, ItemEditComponent],
  imports: [BrowserModule, FormsModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
