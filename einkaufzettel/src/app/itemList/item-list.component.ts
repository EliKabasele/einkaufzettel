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

  constructor(private itemListService: ItemListService) {}

  ngOnInit(): void {
    this.itemsList = this.itemListService.getItems();
    this.itemsListSubscription =
      this.itemListService.itemsChangedSubject.subscribe((items: Item[]) => {
        this.itemsList = items;
      });
  }

  onEditItem(index: number) {
    this.itemListService.itemSelectedSubject.next(index);
  }

  onCompletedItem(index: number) {
    this.itemListService.deleteItem(index);
  }

  ngOnDestroy(): void {
    this.itemsListSubscription.unsubscribe();
  }
}
