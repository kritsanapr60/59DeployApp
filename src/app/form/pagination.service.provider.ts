import { PaginationService } from './pagination.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../services/auth.service';

const pageViewFormServiceFactory = (
  afs: AngularFirestore,
  dialog: MatDialog,
  auth: AuthService) => {
  return new PaginationService<Array<object>>(afs, dialog, auth);
};
export let pageViewFormServiceProvider =
{
  provide: PaginationService,
  useFactory: pageViewFormServiceFactory,
  deps: [AngularFirestore]
};
export let pageViewImportFormServiceProvider =
{
  provide: PaginationService,
  useFactory: pageViewFormServiceFactory,
  deps: [AngularFirestore]
};
