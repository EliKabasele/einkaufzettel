import { Item } from './../shared/Item';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ItemListService {
  items: Item[] = [];
  itemsChangedSubject = new Subject<Item[]>();
  itemSelectedSubject = new Subject<number>();
  addItemMode = new Subject<boolean>();

  constructor() {}

  getItems() {
    return this.items.slice();
  }

  setItems(items: Item[]) {
    this.items = items != null ? items : [];
    this.itemsChangedSubject.next(this.getItems());
  }

  getItem(index: number) {
    return this.items[index];
  }

  addItem(newItem: Item) {
    this.items.push(newItem);
    this.itemsChangedSubject.next(this.getItems());
  }

  updateItem(index: number, newItem: Item) {
    this.items[index] = newItem;
    this.itemsChangedSubject.next(this.getItems());
  }

  deleteItem(index: number) {
    this.items.splice(index, 1);
    this.itemsChangedSubject.next(this.getItems());
  }
}
