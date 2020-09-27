


import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Item } from './item';

@Injectable({
  providedIn: 'root'
})
export class TestFirestoreService {
  items$: Observable<Item[]>;
  subscription: Subscription;
  constructor(firestore: AngularFirestore) {
    this.items$ = firestore.collection<Item>('items').valueChanges();
  }

  data$(): Observable<Item[]>{
    return this.items$.pipe(tap((items) => {
      items.forEach(item => { //console.log(item.value); });
    }));
  }
}
