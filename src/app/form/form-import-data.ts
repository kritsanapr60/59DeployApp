import { Timestamp } from '@firebase/firestore';

export interface FormImportData {
  Name: string;
  FormShortedURL: string;
  DisplayNameData: string;
  NameShortURL: string;
  attributes: Array<Object>;
  version: number;
  createDate: Timestamp;
  NameCreator: string;
  UserID: string;
  docId: string;
}