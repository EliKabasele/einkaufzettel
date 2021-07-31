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

  constructor() {}

  getItems() {
    return this.items.slice();
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
