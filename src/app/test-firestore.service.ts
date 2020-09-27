import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TestFirestoreService {
  items: Observable<any[]>;
  constructor(firestore: AngularFirestore) {
    try{
      this.items = firestore.collection('items').valueChanges();
    }catch (err){
      console.error(err);
    }
  }
}