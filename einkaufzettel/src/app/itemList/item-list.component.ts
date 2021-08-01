import { ItemListService } from './item-list.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Item } from '../shared/Item';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss'],
})
export class ItemListComponent implements OnInit, OnDestroy {
  itemsList: Item[];
  selectedItem: Item;
  itemsListSubscription: Subscription;
  readyForShopSubscription: Subscription;
  addItemMode = true;

  constructor(private itemListService: ItemListService) {}

  ngOnInit(): void {
    this.itemsList = this.itemListService.getItems();
    this.itemsListSubscription =
      this.itemListService.itemsChangedSubject.subscribe((items: Item[]) => {
        this.itemsList = items;
        this.addItemMode = this.itemsList.length === 0 ? false : true;
      });

    this.readyForShopSubscription = this.itemListService.addItemMode.subscribe(
      (shopMode: boolean) => {
        this.addItemMode = shopMode;
      }
    );
  }

  onEditItem(index: number) {
    this.itemListService.itemSelectedSubject.next(index);
  }

  onCompletedItem(index: number) {
    this.itemListService.deleteItem(index);
  }

  ngOnDestroy(): void {
    this.itemsListSubscription.unsubscribe();
    this.readyForShopSubscription.unsubscribe();
  }
}
