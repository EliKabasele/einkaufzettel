import { ItemListService } from './../itemList/item-list.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Item } from './Item';

@Injectable({
  providedIn: 'root',
})
export class DataStorageService {
  baseUrl =
    'https://einkaufzettel-958c0-default-rtdb.europe-west1.firebasedatabase.app/shoppinglist';

  constructor(
    private http: HttpClient,
    private itemListService: ItemListService
  ) {}

  saveShoppinglist() {
    const itemList = this.itemListService.getItems();
    this.http.put(this.baseUrl + '.json', itemList).subscribe();
  }

  fetchShoppingList() {
    this.http.get<Item[]>(this.baseUrl + '.json').subscribe((shoppingList) => {
      if (shoppingList != null) {
        this.itemListService.setItems(shoppingList);
      } else {
        this.itemListService.setItems([]);
      }
    });
  }

  deleteShoppingItem(index: number) {
    this.http.delete(this.baseUrl + `/${index}.json`).subscribe((result) => {
      console.log(result);
    });
  }

  updateShoppingItem(index: number, shoppingItem: Item) {}
}
