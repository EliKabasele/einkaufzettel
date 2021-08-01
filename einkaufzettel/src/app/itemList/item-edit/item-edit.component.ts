import { ItemListService } from './../item-list.service';
import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Item } from 'src/app/shared/Item';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-item-edit',
  templateUrl: './item-edit.component.html',
  styleUrls: ['./item-edit.component.scss'],
})
export class ItemEditComponent implements OnInit, OnDestroy {
  @ViewChild('editForm', { static: false }) editForm: NgForm;
  @Input() itemsLisIpt: Item[];
  editedItemIndex: number;
  editMode = false;
  editedItemIndexSubscription: Subscription;
  editedItem: Item;

  constructor(private itemListService: ItemListService) {}

  ngOnInit(): void {
    this.editedItemIndexSubscription =
      this.itemListService.itemSelectedSubject.subscribe((index: number) => {
        this.editedItemIndex = index;
        this.editMode = true;
        this.editedItem = this.itemListService.getItem(index);
        this.editForm.setValue({
          itemName: this.editedItem.itemName,
          quantity: this.editedItem.quantity,
        });
      });
  }

  clearForm() {
    this.editForm.reset();
    this.editMode = false;
  }

  onSubmitForm(form: NgForm) {
    const newItem = {
      itemName: form.value.itemName,
      quantity: form.value.quantity,
    };

    if (this.editMode) {
      this.itemListService.updateItem(this.editedItemIndex, newItem);
    } else {
      this.itemListService.addItem(newItem);
    }

    this.clearForm();
  }

  goToShop() {
    this.itemListService.addItemMode.next(false);
  }

  ngOnDestroy() {
    this.editedItemIndexSubscription.unsubscribe();
  }
}
